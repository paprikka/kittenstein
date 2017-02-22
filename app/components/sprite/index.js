import React from 'react';
import getCSS from './get-css';

const defaultStyle = {
  position: 'absolute',
  zIndex: 1000
};

const {assign} = Object;

export default function Sprite(sprite) {
  const style = assign(
    {},
    defaultStyle,
    getCSS(sprite),
    {
      left: sprite.x,
      top: sprite.y,
      transform: `translate(-50%, -50%) scale(2)`
    }
  );
  
  return <div style={style}/>;
}