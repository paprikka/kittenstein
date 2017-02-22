import getCSS from './get-css';

describe('components/sprite/getCSS', () => {
  it('should return calculate target image size', () => {
    const sprite = {
      sourceIMG: 'EXPLOSION_SOURCE_IMG',
      frameCount: 16,
      rows: 4,
      cols: 2,
      width: 800,
      height: 600,
      frameIndex: 0
    };
    
    const result = getCSS(sprite);
    expect(result.width).to.equal(400);
    expect(result.height).to.equal(150);
    
  });
  
  it('should return the initial background pos if frameIndex is 0', () => {
    const sprite = {
      sourceIMG: 'EXPLOSION_SOURCE_IMG',
      frameCount: 16,
      rows: 4,
      cols: 2,
      width: 800,
      height: 600,
      frameIndex: 0
    };
    
    const result = getCSS(sprite);
    expect(result.backgroundImage).to.equal('url(EXPLOSION_SOURCE_IMG)');
  });
  
  it('should return the initial background pos if frameIndex is 0', () => {
    const sprite = {
      sourceIMG: 'EXPLOSION_SOURCE_IMG',
      frameCount: 16,
      rows: 4,
      cols: 2,
      width: 800,
      height: 600,
      frameIndex: 0
    };
    
    const result = getCSS(sprite);
    expect(result.backgroundPositionX).to.equal(0);
    expect(result.backgroundPositionY).to.equal(0);
  });
  
  it('should calculate background position based on the current frameIndex', () => {
    const sprite1 = {
      sourceIMG: 'EXPLOSION_SOURCE_IMG',
      frameCount: 16,
      rows: 4,
      cols: 2,
      width: 800,
      height: 600,
      frameIndex: 1
    };
    
    const sprite2 = {
      sourceIMG: 'EXPLOSION_SOURCE_IMG',
      frameCount: 16,
      rows: 4,
      cols: 2,
      width: 800,
      height: 600,
      frameIndex: 3
    };
    
    const sprite3 = {
      sourceIMG: 'EXPLOSION_SOURCE_IMG',
      frameCount: 12,
      rows: 3,
      cols: 4,
      width: 400,
      height: 300,
      frameIndex: 6
    };
    
    const result1 = getCSS(sprite1);
    expect(result1.backgroundPositionX).to.equal(-400);
    expect(result1.backgroundPositionY).to.equal(0);
    
    const result2 = getCSS(sprite2);
    expect(result2.backgroundPositionX).to.equal(-400);
    expect(result2.backgroundPositionY).to.equal(-150);
    
    const result3 = getCSS(sprite3);
    expect(result3.backgroundPositionX).to.equal(-200);
    expect(result3.backgroundPositionY).to.equal(-100);
  });
  
  
});