import {Observable} from 'rx';

import Intents from '../../intents';
import Keys from '../../keys';

import SFX from './sfx';
import killNotifications from './kill-notifications';
killNotifications();

import soundManager from './sound-manager';
soundManager();

import coloursToTrack from './colours-to-track';

const initialState = {
  coloursToTrack: [],
  isSlowMotion: false,
  status: {
    killCount: 0,
    lostCount: 0,
    killStreakBonus: 0
  }
};

Observable.fromEvent(document.body, 'keydown')
          .filter( e => e.keyCode === 32)
          .subscribe(Intents.togglePause);

const {assign} = Object;
export default {
  get() {
    const togglePause = Intents.by(Keys.TOGGLE_PAUSE)
                          .map( () => state => (
                            assign({}, state, {isPaused: !state.isPaused})
                          ));

    const pause = Intents.by(Keys.PAUSE)
                          .map( () => state => (
                            assign({}, state, {isPaused: true})
                          ));


    const lost = Intents.by(Keys.INCREASE_LOST_COUNT)
                  .map( ()=> state => {
                    state.status.lostCount = state.status.lostCount + 1;
                    return state;
                  });

    const killedMonsterIntents = Intents.by(Keys.KILL_MONSTER).pluck('data');
    const killed = killedMonsterIntents
                    .map( () => state => {
                      state.status.killCount = state.status.killCount + 1;
                      return state;
                    });

    const slowMotion = killedMonsterIntents
                          .filter( ({id}) => id === 'cher' )
                          .flatMapLatest( () => {
                            return Observable.create( obs => {
                              obs.onNext(true);
                              setTimeout( obs.onNext.bind(obs, false), 4000);
                            });
                          })
                          .map( isSlowMotion => state => assign({}, state, {isSlowMotion}));

    const killStreaks = Intents.by(Keys.KILL_STREAK)
                              .pluck('data')
                              .map(
                                killCount => state => {
                                  state.status.killStreakBonus += Math.pow(killCount, 2);
                                  return state;
                                }
                              );

    return lost
            .merge(coloursToTrack())
            .merge(killStreaks)
            .merge(killed)
            .merge(slowMotion)
            .merge(togglePause)
            .merge(pause)
            .scan( (acc, reducer) => reducer(acc), initialState )
            .startWith(initialState);
  }
};