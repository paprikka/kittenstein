import {
  World,
  Bodies
} from 'matter-js';

import hoffPic from './cher.png';
const {random, min, max, floor} = Math;

function getRandomScale(
  naturalDimension,
  minDimension,
  maxDimension
) {
  const difference = maxDimension - minDimension;
  const sizeDifference = random() * difference;
  const dimension = minDimension + sizeDifference;
  return dimension / naturalDimension;
}

function getRandomPositionWithinBounds(viewportW, viewportH, w, h, padding) {
  const spaceX = floor(viewportW - padding * 2 - w);
  const spaceY = floor(viewportH - padding * 2 - h);
  const x = max(padding + 0.5 * w, min(random() * spaceX));
  const y = max(padding + 0.5 * h, min(random() * spaceY));

  return { x, y };
}

export default function renderCher(composite, dimensions) {
  const naturalDimension = 400;
  const scale = getRandomScale(naturalDimension, 100, 300);
  const radius = naturalDimension * scale / 2;

  const position = getRandomPositionWithinBounds(
    dimensions.width, -200,
    radius, radius,
    10
  );
  const options = {
    label: 'cher',

    render: {
      sprite: {
        texture: hoffPic,
        xScale: scale,
        yScale: scale
      }
    }
  };
  World.add(
    composite,
    Bodies.circle(
      position.x,
      position.y,
      radius,
      options
    )
  );
}