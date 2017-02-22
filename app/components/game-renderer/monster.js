import {
  Body, 
  Bodies 
} from 'matter-js';

const monsters = [
  {
    w: 150,
    h: 130,
    src: require('./assets/1_400_350.png')
  },
  {
    w: 248,
    h: 269,
    src: require('./assets/1_248_269.png')
  },
  
  {
    w: 269,
    h: 279,
    src: require('./assets/1_269_279.png')
  },
  
  {
    w: 276,
    h: 453,
    src: require('./assets/1_276_453.png')
  },
  
  {
    w: 300,
    h: 212,
    src: require('./assets/1_300_212.png')
  },
  
  {
    w: 300,
    h: 300,
    src: require('./assets/1_300_300.png')
  },
  
  {
    w: 333,
    h: 500,
    src: require('./assets/1_333_500.png')
  },
  
  {
    w: 415,
    h: 459,
    src: require('./assets/1_415_459.png')
  },
  
]

const {floor, random, min, max} = Math;
const getRandomItem = (arr) => arr[floor(random() * arr.length)]

export default function monster({x, y, width, height}) {
  const {w, h, src} = getRandomItem(monsters);
  
  const minDimension = 80;
  const minScale = 150 / max(1, min(w, h));
  const scale = max(minScale, random() * .5 + .1);
 
  const monsterBody = Bodies.rectangle(
    x,
    y,
    w * scale,
    h * scale,
    {
      render: {
        sprite: {
          texture: src,
          xScale: scale,
          yScale: scale
        }
      }
    }
  );
  Body.setAngularVelocity(monsterBody, (random() -.5) * .2);

  return monsterBody;
}
