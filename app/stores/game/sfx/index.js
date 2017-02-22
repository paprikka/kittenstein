import Sounds from './sounds';
import loadAudio from './load-audio';

import Intents from '../../../intents';
import Keys from '../../../keys';

const playSoundIntents = Intents.by(Keys.PLAY_SOUND).pluck('data', 'id');

function playSound(audio) {
  const source = audio.context.createBufferSource();
  source.buffer = audio.buffer;
  source.connect(audio.context.destination);
  source.start(0);
}

const {
  keys,
  assign
} = Object;
import {Observable} from 'rx';

function loadAllAudio() {
  const soundIDs = keys(Sounds);
  return Observable
    .fromArray( soundIDs )
    .flatMap( id => loadAudio(Sounds[id]).map(audio => ({audio, id})) )
    .scan( (all, curr) => (
      assign( {}, all, {[curr.id]: curr.audio} )
    ), {})
    .filter( sounds => keys(sounds).length === soundIDs.length);
}

const audioByID = (sounds, id) => {
  const audio = sounds[id];
  if (audio) return Observable.just(audio);
  return Observable.empty();
};

loadAllAudio()
  .catch(console.error.bind(console))
  .flatMapLatest( sounds => {
    return playSoundIntents.flatMap( id => audioByID(sounds, id) );
  } )
  .subscribe(playSound);

export default {};
