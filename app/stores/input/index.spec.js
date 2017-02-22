import Input from './index';
import {Subject} from 'rx';

describe('input/index', () => {
  const initialValue = [];
  
  it('should start with a default value', () => {
    Input
      .get()
      .take(1)
      .subscribe( val => {
      expect(val).to.deep.equal(initialValue);
    })  
  });

  let mockCamera, mockMouse
  beforeEach(()=>{
    mockCamera = new Subject();
    
    Input.__Rewire__('Camera', {get: ()=> mockCamera});
    
    mockMouse = new Subject();
    Input.__Rewire__('Mouse', {get: ()=> mockMouse});
  });
  
  afterEach(()=>{
    Input.__ResetDependency__('Camera');
    Input.__ResetDependency__('Mouse');
  });

  it('should handle camera events', () => {
    const results = [];
    
    Input
      .get()
      .subscribe(results.push.bind(results));
    
    mockCamera.onNext([{x: 0, y: 0}]);
    mockCamera.onNext([{x: 1, y: 2}, {x: 3, y: 3}]);

    expect(results).to.deep.equal(
      [
        initialValue,
        [
          {x: 0, y: 0, type: 'camera'}
        ],
        [
          {x: 1, y: 2, type: 'camera'},
          {x: 3, y: 3, type: 'camera'}  
        ]
      ]
    );
  });
  
  it('should handle mouse events', () => {
    const results = [];
    
    Input
      .get()
      .subscribe(results.push.bind(results));
    
    mockMouse.onNext({x: 0, y: 0});
    mockMouse.onNext({x: 1, y: 2});
    mockMouse.onNext({x: 3, y: 3});
    
    expect(results).to.deep.equal(
      [
        initialValue,
        [{x: 0, y: 0, type: 'mouse'}],
        [{x: 1, y: 2, type: 'mouse'}],
        [{x: 3, y: 3, type: 'mouse'}]
      ]
    );
  });
  
  it('should merge camera and mouse events', () => {
    const results = [];
    
    Input
      .get()
      .subscribe(results.push.bind(results));
    
    mockCamera.onNext([{x: 0, y: 0}]);
    mockMouse.onNext({x: 100, y: 200});
    mockCamera.onNext([{x: 1, y: 2}, {x: 3, y: 3}]);
    mockMouse.onNext({x: 101, y: 201});
    
    const expectedResult = [
      initialValue,
      [
        {x: 0, y: 0, type: 'camera'}
      ],
      [
        {x: 0, y: 0, type: 'camera'},
        {x: 100, y: 200, type: 'mouse'}
      ],
      [
        {x: 100, y: 200, type: 'mouse'},
        {x: 1, y: 2, type: 'camera'},
        {x: 3, y: 3, type: 'camera'}  
      ],
      [
        {x: 101, y: 201, type: 'mouse'},
        {x: 1, y: 2, type: 'camera'},
        {x: 3, y: 3, type: 'camera'}  
      ]
    ];

    const sortByX = (a, b) => {
      if(a.x > b.x) return 1;
      if(a.x < b.x) return -1;
      return 0;
    };
    
    results.forEach( (result, i) => {
      expect(result.sort(sortByX)).to.deep.equal(expectedResult[i].sort(sortByX))
    })
  });
});