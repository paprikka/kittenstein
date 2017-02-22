import {
  World,
  Bodies
} from 'matter-js';

import hoffPic from './hoff.png'
const {random} = Math;
export default function renderHoff(composite, dimensions) {
  const width = 240;
  const radius = width / 2;
  World.add(
    composite,
    Bodies.circle(dimensions.width / 2 , 300 + (random() - .5) * 200, radius, {
      isStatic: true,
      render: {
        sprite: {
          texture: hoffPic
        }
      }
    })
  );
}