const {floor} = Math;
export default function getCSS(sprite) {
  const width = sprite.width / sprite.cols;
  const height = sprite.height / sprite.rows;
  const backgroundPositionX = -width * (sprite.frameIndex % sprite.cols)
  const backgroundPositionY = -height * floor(sprite.frameIndex / sprite.cols);
  
  return {
    width,
    height,
    backgroundImage: `url(${sprite.sourceIMG})`,
    backgroundPositionX,
    backgroundPositionY
  };
}