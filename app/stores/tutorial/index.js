import {
  Observable
} from 'rx';

import Tracking from '../../tracking';
import Intents from '../../intents';
import Keys from '../../keys';
import slides from '../../components/pages/slides';


function getIntent(intents, id) {
  return intents.filter(intent => intent.key === id);
}

const {max, min} = Math;
const cap = (minVal, maxVal, val) => min(maxVal, max(minVal, val));
export default {
  get() {
    const prevIntents = getIntent(Intents.subject, Keys.TUTORIAL_PREV).map(-1);
    const nextIntents = getIntent(Intents.subject, Keys.TUTORIAL_NEXT).map(1);
    const resetIntents = getIntent(Intents.subject, Keys.CLOSE_MODAL_BY_ID)
      .filter( intent => intent.data === 'share')
      .map(-Infinity);

    const currentIndObservable = nextIntents
      .merge(prevIntents)
      .merge(resetIntents)
      .scan(
        (curr, dir) => cap(0, slides.length - 1, curr + dir),
        0
      );

    const store = Observable.just(0)
      .concat(currentIndObservable)
      .map( currentInd => ({currentInd, slides}));
    // TODO extract
    store
      .pluck('currentInd')
      .filter( currentInd => currentInd === slides.length - 1)
      .take(1)
      .subscribe(()=>{
        Tracking.push('tutorial:finished', {
          ua: navigator.userAgent,
          touch: ('ontouchstart' in window) ? 1 : 0
        });
      });

    return store;
  }
};
