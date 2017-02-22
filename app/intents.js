/* @flow */

import {ReplaySubject, Observable} from 'rx';
import Keys from './keys';

const intentSubject = new ReplaySubject(1);

function actionWithKey(key: string) {
  return function toIntentSubject(data: any) {
    intentSubject.onNext({key, data});
  };
}

export default {
  subject: intentSubject,
  by: (expectedKey: any): Observable => intentSubject.filter( ({key}) => expectedKey === key ),


  changeRoute: actionWithKey(Keys.CHANGE_ROUTE),
  togglePause: actionWithKey(Keys.TOGGLE_PAUSE),
  pause: actionWithKey(Keys.PAUSE),
  resume: actionWithKey(Keys.RESUME),
  keyDown: actionWithKey(Keys.KEY_DOWN),
  movePlayer: actionWithKey(Keys.MOVE_PLAYER),
  movePlayerToPos: actionWithKey(Keys.MOVE_PLAYER_TO_POS),
  moveCursor: actionWithKey(Keys.MOVE_CURSOR),
  moveCameraCursor: actionWithKey(Keys.MOVE_CAMERA_CURSOR),

  playSound: actionWithKey(Keys.PLAY_SOUND),

  increaseLostCount: actionWithKey(Keys.INCREASE_LOST_COUNT),
  killMonster: actionWithKey(Keys.KILL_MONSTER),
  killStreak: actionWithKey(Keys.KILL_STREAK),
  toggleTrackingColour: actionWithKey(Keys.TOGGLE_TRACKING_COLOUR),
  notify: actionWithKey(Keys.NOTIFY),
  addParticle: actionWithKey(Keys.ADD_PARTICLE)

};
