import SpriteImages from './sprite-images';
import {Observable} from 'rx';

describe('game/fx/sprite-images', () => {
  let mockSpriteImage;
  
  beforeEach(()=>{
    mockSpriteImage = sinon.stub();
    SpriteImages.__Rewire__('spriteImage', mockSpriteImage);
  });
  
  it('preload images using ./sprite-image', () => {
    const sprites = {
      one: {
        sourceIMG: 'one.png',
        someOtherProp: 'hey'
      },
      two: {
        sourceIMG: 'two.png'
      }
    };
    
    mockSpriteImage.withArgs('one', 'one.png').returns(Observable.just({
      id: 'one',
      imgElement: 'image:one.png'
    }));
    
    mockSpriteImage.withArgs('two', 'two.png').returns(Observable.just({
      id: 'two',
      imgElement: 'image:two.png'
    }));
    
    const expectedResult = {
      one: {
        sourceIMG: 'one.png',
        imgElement: 'image:one.png',
        someOtherProp: 'hey'
      },
      two: {
        imgElement: 'image:two.png',
        sourceIMG: 'two.png'
      }
    };
    
    let result;
    SpriteImages
      .get(sprites)
      .subscribe( val => result = val );
    console.log(JSON.stringify(result, null, 2));
    expect(result).to.deep.equal(expectedResult);
    
  });
});