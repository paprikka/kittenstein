import getSkin from './get-skin';

const {floor} = Math;
 
export default {
  crossHair: (x, y, ctx, viewport, id, length, strokeWidth, gap) => {
    const skin = getSkin(id);
    ctx.fillStyle = skin.main;
    
    const cursor = new Path2D();
    
    const floorX = floor(x);
    const floorY = floor(y);
    
    cursor.rect(floorX - gap - length, floorY - strokeWidth * .5, length, strokeWidth);
    cursor.rect(floorX + gap, floorY - strokeWidth * .5, length, strokeWidth);
    cursor.rect(floorX - strokeWidth * .5, floorY - gap - length, strokeWidth, length);
    cursor.rect(floorX - strokeWidth * .5, floorY + gap, strokeWidth, length);
    
    ctx.fill(cursor);
    
    ctx.beginPath();
    ctx.lineWidth = strokeWidth * 4;
    ctx.strokeStyle = skin.shade;
    ctx.arc(floorX, floorY, 28, 0, Math.PI*2, true);
    ctx.stroke();
    
  },
  sprite: (sprite, ctx) => {
    const {
      x,
      y,
      width: naturalWidth,
      height: naturalHeight,
      cols,
      rows,
      imgElement
    } = sprite;
    
    const width = floor(naturalWidth / cols);
    const height = floor(naturalHeight / rows);
    const offsetX = floor(width * (sprite.frameIndex % sprite.cols));
    const offsetY = floor(height * floor(sprite.frameIndex / sprite.cols));
      
    ctx.drawImage(
      imgElement,
      offsetX,
      offsetY,
      width,
      height,
      floor(x - .5 * width),
      floor(y - .5 * height),
      width,
      height
    );
    
  }
}