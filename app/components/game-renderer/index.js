import React from 'react';
import ReactDOM from 'react-dom';

let canvas;

import Style from './index.css';
import Physics from './physics';

export default class GameRenderer extends React.Component {
  componentWillMount() {
    const {width, height} = document.body.getBoundingClientRect();
    canvas = document.createElement('div');
    Object.assign(canvas.style, {
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
    this.physics = Physics.run(canvas);
  }

  componentWillUnmount() {
    canvas.remove();
  }

  render() {
    if (this.physics) this.physics.updateState(this.props);
    return <div className={Style.default}></div>;
  }
}