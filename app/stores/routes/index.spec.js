import routes from './index';
import Keys from '../../keys';
import {Subject} from 'rx';

describe.skip('routes', ()=>{
  let mockIntents;
  
  beforeEach(()=>{
    mockIntents = { subject: new Subject() };
    routes.__Rewire__('Intents', mockIntents);
  });
  
  it('should return initialised by default', () => {
    routes.get().subscribe( result => {
      expect(result.route).to.equal('initialised');
    })
  });
  
  it('should change route', () => {
    const results = [];
    const sub = routes.get();
    sub
      .pluck('route')
      .subscribe(results.push.bind(results));
      
    mockIntents.subject.onNext({key: Keys.CHANGE_ROUTE, data: 'one'});
    mockIntents.subject.onNext({key: Keys.CHANGE_ROUTE, data: 'two'});
    
    expect(results).to.deep.equal(['initialised', 'one', 'two']);
  });
  
  it('should not refire change if the same route is requested', () => {
    const results = [];
    const sub = routes.get();
    sub
      .pluck('route')
      .subscribe(results.push.bind(results));
      
    mockIntents.subject.onNext({key: Keys.CHANGE_ROUTE, data: 'one'});
    mockIntents.subject.onNext({key: Keys.CHANGE_ROUTE, data: 'one'});
    mockIntents.subject.onNext({key: Keys.CHANGE_ROUTE, data: 'two'});
    
    expect(results).to.deep.equal(['initialised', 'one', 'two']);
  });
});