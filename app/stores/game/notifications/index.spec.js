import Notifications from './index';
import {Subject, BehaviorSubject} from 'rx';
import Keys from '../../../keys';

describe('game/notifications', () => {
  let mockIntents;
  let mockIntentsSubject;

  let mockTickerSubject;

  beforeEach(()=>{
    mockIntentsSubject = new Subject();
    mockIntents = {
      by: sinon.stub().withArgs(Keys.NOTIFY).returns(mockIntentsSubject)
    };

    Notifications.__Rewire__('Intents', mockIntents);

    mockTickerSubject = new BehaviorSubject({
      time: 0,
      deltaTime: 0
    });
    Notifications.__Rewire__('Ticker', {
      get() { return mockTickerSubject; }
    });
  });

  afterEach(()=>{
    Notifications.__ResetDependency__('Intents');
  });

  it('should return an empty array upon subscription', () => {
    Notifications.get().subscribe( val => {
      expect(val).to.deep.equal([]);
    });
  });

  it('should push a new notification to the array on NOTIFY intent', ()=>{
    const results = [];
    Notifications.get().subscribe(results.push.bind(results));
    mockIntentsSubject.onNext({
      data: {
        message: 'hello'
      }
    });
    expect(results[1]).to.deep.equal([{message: 'hello'}]);

    mockIntentsSubject.onNext({
      data: {
        message: 'hello2'
      }
    });
    expect(results[2]).to.deep.equal([
      {message: 'hello'},
      {message: 'hello2'}
    ]);
  });

  it('should remove expired notifications after 2 sec', () => {
    let result = [];

    Notifications.get().subscribe(val => result = val);
    mockIntentsSubject.onNext({
      data: {
        message: 'hello'
      }
    });
    expect(result).to.deep.equal([{message: 'hello'}]);

    mockTickerSubject.onNext({
      time: 1000
    });

    expect(result).to.deep.equal([{message: 'hello'}]);

    mockIntentsSubject.onNext({
      data: {
        message: 'hello2'
      }
    });

    expect(result).to.deep.equal([
      {message: 'hello'},
      {message: 'hello2'}
    ]);

    mockTickerSubject.onNext({
      time: 2000
    });

    expect(result).to.deep.equal([{message: 'hello2'}]);

    mockTickerSubject.onNext({
      time: 3000
    });

    expect(result).to.deep.equal([]);
  });
});