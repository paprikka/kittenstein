import Camera from './camera';
import Keys from '../../keys';
import {Subject} from 'rx';

describe('input/camera', () => {
  const initialResult = [];
  
  let Intents, cursorSubject, intentSubscriptionStub;
 
  beforeEach(()=>{
    cursorSubject = new Subject;
    Intents = Camera.__GetDependency__('Intents');
    intentSubscriptionStub = sinon.stub(Intents, 'by')
       .withArgs(Keys.MOVE_CAMERA_CURSOR)
       .returns(cursorSubject);
  });
  
  afterEach(()=>{
    sinon.restore(Intents.by);
  });
  
  it('should return some default values upon subscription', () => {
     Camera.get()
          .take(1)
          .subscribe( result => {
            expect(result).to.deep.equal(initialResult);
          }); 
  });
  
  it('should return coordinates from MOVE_CAMERA_CURSOR intent', () => {
    expect(intentSubscriptionStub).to.not.have.been.called;
    const results = [];
    Camera.get()
          .subscribe(results.push.bind(results));
          
    expect(intentSubscriptionStub).to.have.been.calledOnce;
    cursorSubject.onNext({
      data: [
        {x: 1, y:1, source: {foo: 'bar'}}
      ]
    });
    
    const events = [
      initialResult,
      [
        {x: 1, y:1, source: {foo: 'bar'}}
      ]
    ] 
    const expectedResults = events;
    expect(results).to.deep.equal(expectedResults);    
    
  });
  
  it('should continue receiving events', () => {
    expect(intentSubscriptionStub).to.not.have.been.called;
    const results = [];
    Camera.get()
          .subscribe(results.push.bind(results));
          
    expect(intentSubscriptionStub).to.have.been.calledOnce;
    cursorSubject.onNext({
      data: [
        {x: 1, y:1, source: {foo: 'bar'}}
      ]
    });
    
    cursorSubject.onNext({
      data: [
        {x: 2, y:2, source: {foo: 'baz'}}
      ]
    });
    
    const events = [
      initialResult,
      [
        {x: 1, y:1, source: {foo: 'bar'}}
      ],
      [
        {x: 2, y:2, source: {foo: 'baz'}}
      ]
    ] 
    const expectedResults = events;
    expect(results).to.deep.equal(expectedResults);    
  });
  
});