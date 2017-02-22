import React from 'react';
import {Observable} from 'rx';

export default class MouseTracking extends React.Component {

  componentDidMount() {
    this.subs = [];
    const mouseMoves = Observable
      .fromEvent(document.body, 'mousemove');

    const coords = mouseMoves
      .map( ({clientX, clientY}) => ({
        x: clientX,
        y: clientY,
        type: 'mouse'
      }))
      .subscribe(this.props.onChange);
    this.subs.push(coords);
  }

  componentWillUnmount() {
    this.subs.forEach( sub => sub.dispose() );
  }

  render() {
    return null;
  }
}