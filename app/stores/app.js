import Routes from './routes';
import assign from 'lodash.assign';
// import EngineCamera from './input/camera';
import Input from './input';
import Game from './game';
import FX from './game/fx';

import Notifications from './game/notifications';


export function get() {
  return Routes
    .get()
    .combineLatest(

      Game.get(),
      FX.get(),
      Input.get(),
      Notifications.get(),

      (route, game, fx, camera, notifications) => assign(
        {game},
        {route},
        {camera},
        {fx},
        {notifications}
      )
    );
}
