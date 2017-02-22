import React from 'react';



const vBarStyle = {
  position: 'absolute',
  left: -1,
  height: 10000,
  top: -5000,
  width: 2,
  background: 'magenta'
}

const hBarStyle = {
  position: 'absolute',
  top: -1,
  width: 10000,
  left: -5000,
  height: 2,
  background: 'magenta'
}

const w = 100;
const circleStyle = {
  position: 'absolute',
  top: -.5 * w,
  width: w,
  left: -.5 * w,
  height: w,
  borderRadius: w,
  border: 'magenta 2px solid'
}

export default function PositionTracker({x, y}) {
  const style = {
    opacity: .2,
    left: 0,
    top:0,
    position: 'absolute',
    transform: `translate(${x}px, ${y}px)`,
    transition: '.1s'
  };
  
  return (
    <div style={style}>
      <div style={vBarStyle}/>
      <div style={circleStyle}/>
      <div style={hBarStyle}/>
    </div>
  );
}