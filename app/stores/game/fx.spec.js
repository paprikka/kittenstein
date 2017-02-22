import FX from './fx';

import {Subject, Observable} from 'rx';
import Keys from '../../keys';

describe('stores/fx', () => {
  it('should return an empty array on subscription', () => {
    FX.get().subscribe(
      result => expect(result).to.deep.equal([])
    );
  });
  
  let mockIntents,
      mockIntentSubject,
      mockSprites,
      mockTicker,
      mockTickerSubject,
      mockGetUUID,
      mockSpriteImages;
  
  beforeEach(()=>{
    let uuidCache = 0;
    mockGetUUID = () => uuidCache++;
    mockTickerSubject = new Subject();
    mockTicker = {
      get: ()=> mockTickerSubject
    };
    
    mockIntentSubject = new Subject();
    mockIntents = {
      by: () => mockIntentSubject
    };
    
    mockSprites = {
      explosion : {
        frameCount: 8,
        sourceIMG: 'EXPLOSION_SOURCE_IMG'
      },
      rain : {
        frameCount: 5,
        sourceIMG: 'RAIN_SOURCE_IMG'
      }
    };
    
    mockSpriteImages = {
      get(sprites) {
        return Observable.just(sprites);
      }
    };
    
    FX.__Rewire__('Intents', mockIntents);
    FX.__Rewire__('getUUID', mockGetUUID);
    FX.__Rewire__('Sprites', mockSprites);
    FX.__Rewire__('Ticker', mockTicker);
    FX.__Rewire__('SpriteImages', mockSpriteImages);
  });
  
  afterEach(()=>{
    [
      'Intents',
      'getUUID',
      'Sprites',
      'Ticker',
      'SpriteImages'
    ].forEach(
      dep => FX.__ResetDependency__(dep)
    );
  });
  
  it('should add particles with their initial coords and type on ADD_PARTICLE intent', () => {
    const expectedResults = [
      [],
      [ 
        {
          id: 0,
          x: 100,
          y: 100,
          frameCount: 8,
          frameIndex: 0,
          startTime: 0,
          elapsedTime: 0,
          sourceIMG: 'EXPLOSION_SOURCE_IMG',        
          type: 'explosion'
        }
      ],
      [ 
        {
          id: 0,
          x: 100,
          y: 100,
          frameCount: 8,
          frameIndex: 0,
          startTime: 0,
          elapsedTime: 0,
          sourceIMG: 'EXPLOSION_SOURCE_IMG',        
          type: 'explosion'
        },
        {
          id: 1,
          x: 200,
          y: 300,
          frameCount: 5,
          frameIndex: 0,
          startTime: 0,
          elapsedTime: 0,
          sourceIMG: 'RAIN_SOURCE_IMG',        
          type: 'rain'
        }
      ]
      
    ];
    
    let results = [];
    
    sinon.spy(mockIntents, 'by');
    expect(mockIntents.by).to.not.have.been.called;
    
    FX.get().subscribe(val => results.push(val));
    mockTickerSubject.onNext({
      time: 0,
      deltaTime: 0
    });
    
    expect(results).to.deep.equal([[]]);
    
    expect(mockIntents.by).to.have.been.calledWith(Keys.ADD_PARTICLE);
    
    mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 100,
        y: 100,
        type: 'explosion'
      }
    });
    
    expect(results).to.deep.equal(expectedResults.slice(0,2));
    
    mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 200,
        y: 300,
        type: 'rain'
      }
    });
    expect(results).to.deep.equal(expectedResults);
  });
  
   
  it('should contain references to sprite image elements', () => {
    const expectedResults = [
      [],
      [ 
        {
          id: 0,
          x: 100,
          y: 100,
          frameCount: 8,
          frameIndex: 0,
          startTime: 0,
          elapsedTime: 0,
          sourceIMG: 'EXPLOSION_SOURCE_IMG',        
          imgElement: 'imageElement:EXPLOSION_SOURCE_IMG',        
          type: 'explosion'
        }
      ],
      [ 
        {
          id: 0,
          x: 100,
          y: 100,
          frameCount: 8,
          frameIndex: 0,
          startTime: 0,
          elapsedTime: 0,
          sourceIMG: 'EXPLOSION_SOURCE_IMG',        
          imgElement: 'imageElement:EXPLOSION_SOURCE_IMG',        
          type: 'explosion'
        },
        {
          id: 1,
          x: 200,
          y: 300,
          frameCount: 5,
          frameIndex: 0,
          startTime: 0,
          elapsedTime: 0,
          sourceIMG: 'RAIN_SOURCE_IMG',        
          imgElement: 'imageElement:RAIN_SOURCE_IMG',        
          type: 'rain'
        }
      ]
      
    ];
    
    let results = [];
    
    mockSpriteImages.get = sprites => {
      const val = Object.keys(sprites).reduce( (acc, key) => {
        acc[key] = Object.assign({}, sprites[key], {imgElement: 'imageElement:' + sprites[key].sourceIMG})
        return acc;
      }, {});
      return Observable.just(val);
    }
    
    FX.get().subscribe(val => results.push(val));
    mockTickerSubject.onNext({
      time: 0,
      deltaTime: 0
    });
    
    mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 100,
        y: 100,
        type: 'explosion'
      }
    });
    
    mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 200,
        y: 300,
        type: 'rain'
      }
    });
    
    expect(results).to.deep.equal(expectedResults);
  });
  
  it('should not add sprites that are not included in the spec', () => {
    const expectedResults = [
      [],
      [ 
        {
          x: 100,
          y: 100,
          frameIndex: 0,
          frameCount: 8,
          startTime: 0,
          elapsedTime: 0,
          id: 0,
          sourceIMG: 'EXPLOSION_SOURCE_IMG',        
          type: 'explosion'
        }
      ]
    ];
    
    const results = [];
    
    FX.get().subscribe( val => results.push(val) );
    mockTickerSubject.onNext({
      time: 0,
      deltaTime: 0
    });
    
    expect(results).to.deep.equal([ [] ]);
    
    mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 100,
        y: 100,
        type: 'explosion'
      }
    });
    
    expect(results).to.deep.equal(expectedResults);
    
    mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 100,
        y: 100,
        type: 'I do not exist!'
      }
    });
    
     mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 100,
        y: 100,
        type: 'me neither'
      }
    });
    
    expect(results).to.deep.equal(expectedResults);
  });
  
  it('should update sprite state with time', () => {
    let result;
    
    FX.get(10).subscribe(val => result = val);
    mockTickerSubject.onNext({
      time: 0,
      deltaTime: 0
    });
    
    expect(result).to.deep.equal([]);
    mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 100,
        y: 100,
        type: 'explosion'
      }
    });
    
    expect(result).to.deep.equal([
      {
        id: 0,
        x: 100,
        y: 100,
        frameCount: 8,
        frameIndex: 0,
        sourceIMG: 'EXPLOSION_SOURCE_IMG',        
        type: 'explosion',
        startTime: 0,
        elapsedTime: 0
      }
    ]);
    
    mockTickerSubject.onNext({
      time: 150,
      deltaTime: 150 
    });

    expect(result).to.deep.equal([
      {
        id: 0,
        x: 100,
        y: 100,
        sourceIMG: 'EXPLOSION_SOURCE_IMG',        
        type: 'explosion',
        frameCount: 8,
        frameIndex: 1,
        startTime: 0,
        elapsedTime: 150
      }
    ]);
    
    mockTickerSubject.onNext({
      time: 300,
      deltaTime: 150 
    });
    
    expect(result).to.deep.equal([
      {
        id: 0,
        x: 100,
        y: 100,
        sourceIMG: 'EXPLOSION_SOURCE_IMG',        
        type: 'explosion',
        frameCount: 8,
        frameIndex: 3,
        startTime: 0,
        elapsedTime: 300
      }
    ]);
    
    mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 333,
        y: 444,
        type: 'rain'
      }
    });
    
    expect(result).to.deep.equal([
      {
        id: 0,
        x: 100,
        y: 100,
        sourceIMG: 'EXPLOSION_SOURCE_IMG',        
        type: 'explosion',
        frameCount: 8,
        frameIndex: 3,
        startTime: 0,
        elapsedTime: 300
      },
      {
        id: 1,
        x: 333,
        y: 444,
        sourceIMG: 'RAIN_SOURCE_IMG',        
        type: 'rain',
        frameCount: 5,
        frameIndex: 0,
        startTime: 300,
        elapsedTime: 0
      }
    ]);
    
  });
  
  it('should remove sprite once the animation has finished', () => {
        let result;
    
    FX.get(10).subscribe(val => result = val);
    mockTickerSubject.onNext({
      time: 0,
      deltaTime: 0
    });
    
    expect(result).to.deep.equal([]);
    mockIntentSubject.onNext({
      key: Keys.ADD_PARTICLE,
      data: {
        x: 100,
        y: 100,
        type: 'explosion'
      }
    });

    expect(result).to.deep.equal([
      {
        id: 0,
        x: 100,
        y: 100,
        frameCount: 8,
        frameIndex: 0,
        sourceIMG: 'EXPLOSION_SOURCE_IMG',        
        type: 'explosion',
        startTime: 0,
        elapsedTime: 0
      }
    ]);
    
    mockTickerSubject.onNext({
      time: 150,
      deltaTime: 150 
    });
    
    expect(result).to.deep.equal([
      {
        id: 0,
        x: 100,
        y: 100,
        sourceIMG: 'EXPLOSION_SOURCE_IMG',        
        type: 'explosion',
        frameCount: 8,
        frameIndex: 1,
        startTime: 0,
        elapsedTime: 150
      }
    ]);
    
    mockTickerSubject.onNext({
      time: 1000,
      deltaTime: 850 
    });
    
    // console.info(result);
    expect(result).to.deep.equal([]);
  });
});