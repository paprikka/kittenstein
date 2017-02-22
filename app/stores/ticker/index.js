import {Observable, Scheduler} from 'rx';

// TODO convert to immutable.js
export default {
  get(
    tickerInterval = 1000 / 30,
    scheduler = Scheduler.requestAnimationFrame
  ) {
    return Observable.interval(tickerInterval, scheduler)
      .map(()=>({
        time: Date.now(),
        deltaTime: null
      }))
      .scan(
        (prev, curr) => ({
          time: curr.time,
          deltaTime: (curr.time - prev.time) / 1000
        })
      );
  }
};