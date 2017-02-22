/* flow */
import {Observable} from 'rx';

import Intents from '../../intents';
import Keys from '../../keys';

export default {
  get(){
    
    return Observable.create( obs => {
      const cameraCoords = Intents.by(Keys.MOVE_CAMERA_CURSOR)
        .pluck('data')
        .startWith([])
        .subscribe( val => obs.onNext(val) );
    });
  }
}