import MouseInput from './mouse';
import Keys from '../../keys';
import {Subject} from 'rx';

describe('input/mouse', () => {
  let Intents, cursorSubject, intentSubscriptionStub;
 
  beforeEach(()=>{
    cursorSubject = new Subject;
    Intents = MouseInput.__GetDependency__('Intents');
    intentSubscriptionStub = sinon.stub(Intents, 'by')
       .withArgs(Keys.MOVE_CURSOR)
       .returns(cursorSubject);
  });
  
  afterEach(()=>{
    sinon.restore(Intents.by);
  });
  
  
  it('should return coordinates from MOVE_CURSOR intent', () => {
    expect(intentSubscriptionStub).to.not.have.been.called;
    const results = [];
    MouseInput.get()
          .subscribe(results.push.bind(results));
          
    expect(intentSubscriptionStub).to.have.been.calledOnce;
    cursorSubject.onNext({
      data: {x: 1, y:1}
    });
    
    const events = [
      {x: 1, y:1}
    ] 
    const expectedResults = events;
    expect(results).to.deep.equal(expectedResults);    
    
  });
  
  it('should continue receiving events', () => {
    const results = [];
    MouseInput.get()
          .subscribe(results.push.bind(results));
          
    cursorSubject.onNext({
      data: {x: 1, y:1, source: {foo: 'bar'}}
    });
    
    cursorSubject.onNext({
      data: {x: 2, y:2, source: {foo: 'baz'}}
    });
    
    const events = [
      {x: 1, y:1, source: {foo: 'bar'}},
      {x: 2, y:2, source: {foo: 'baz'}}
    ] 
    const expectedResults = events;
    expect(results).to.deep.equal(expectedResults);    
  });
  
});