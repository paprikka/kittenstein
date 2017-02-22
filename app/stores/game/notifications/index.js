// flow
import {Observable} from 'rx';
import {} from 'immutable';
import Intents from '../../../intents';
import Keys from '../../../keys';
import Ticker from '../../ticker';
import uuid from '../../../utils/uuid';

window.ti = Ticker;
const {assign} = Object;
export default {
  get() {
    const initialValue = {notifications: []};

    const ticker = Ticker.get()
                        .pluck('time')
                        .map( time => state => {
                          return assign(
                            {},
                            state,
                            {time}
                          );
                        });

    const add = Intents
      .by(Keys.NOTIFY)
      .pluck('data')
      .map( notification => state => {
        notification.startTime = state.time;
        notification.id = uuid();
        return assign(
          {},
          state,
          {notifications: state.notifications.concat(notification)}
        );
      });

    return add.merge(ticker).scan(
      (state, reducer) => reducer(state),
      initialValue
    )
    .map( state => {
      const notifications = state.notifications.filter( n => {
        return (state.time - n.startTime) < 2000;
      }).map( ({message, id}) => ({message, id}));

      return assign(
        {},
        state,
        {notifications}
      );
    })
    .pluck('notifications');

  }
};
