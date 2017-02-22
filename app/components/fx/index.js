import React from 'react';
import ReactDOM from 'react-dom';

let canvas;
import Style from './index.css';
import renderers from './renderers';

export default class Viewport extends React.Component {
  componentWillMount() {
    const {width, height} = document.body.getBoundingClientRect();
    canvas = document.createElement('canvas');
    Object.assign(canvas.style, {
      pointerEvents: 'none',
      width,
      height,
      padding: 0,
      margin: 0,
      position: 'absolute',
      left: 0,
      top: 0
    });

    canvas.className = Style.canvas;
    canvas.width = width;
    canvas.height = height;
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    node.appendChild(canvas);
  }

  componentWillUnmount() {
    canvas.remove();
  }

  render() {
    const ctx = canvas.getContext('2d', {
      alpha: true
    });

    const {camera, fx} = this.props;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    camera.forEach(
      c => {
        const type = c.type === 'camera' ? c.colour : c.type;
        renderers.crossHair(c.x, c.y, ctx, canvas, type, 2000, 4, 20);
      }
    );

    fx.forEach( f => renderers.sprite(f, ctx) );

    return <div className='viewport'></div>;
  }
}