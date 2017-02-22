import React from 'react';
import {Observable} from 'rx';
require('tracking/build/tracking');
const tracking = window.tracking; // ugh....

import groupMatches from './group-matches';

const getCenterCoords = rect => (
  {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2
  }
);

export default class ImageTracking extends React.Component {
  componentWillMount() {

    const trackerCam = document.createElement('video');
    trackerCam.style.cssText = 'cursor: none !important';
    trackerCam.id = 'sonnet-tracker-cam';
    trackerCam.width = 400;
    const {style} = trackerCam;
    style.zIndex = 1000;
    style.position = 'fixed';
    style.transform = 'scaleX(-1) scaleY(1)';
    style.transformOrigin = '0 0';
    style.left = trackerCam.width + 10 + 'px';
    style.top = '10px';
    style.opacity = 0.01;

    if (/debugCamera/.test(location.hash)) style.opacity = 1;

    [
      'preload',
      'autoplay',
      'loop',
      'muted'
    ].forEach( attr => trackerCam[attr] = true );

    this.trackerCam = trackerCam;
    document.body.appendChild(trackerCam);
  }

  componentDidMount() {
    const viewportSize = document.body.getBoundingClientRect();
    this.sub = Observable.create( obs => {
      const colours = new tracking.ColorTracker(this.props.coloursToTrack);

      colours.on( 'track', obs.onNext.bind(obs) );

      tracking.track('#sonnet-tracker-cam', colours, {
        camera: true
      });
      this.colourTracker = colours;
    })
    .filter( event => event.data && event.data.length )
    .map( event => event.data )
    .map( groupMatches )
    .map( matches => {
      const {
        width,
        height
      } = this.trackerCam.getBoundingClientRect();
      const scaleX = width / viewportSize.width;
      const scaleY = height / viewportSize.height;
      return matches.map( match => {
        const {x, y} = getCenterCoords(match);
        return {
          x: (width - x) / scaleX,
          y: y / scaleY,
          source: { width, height },
          colour: match.color
        };
      });
    } )
    .subscribe(this.props.onChange);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.sub.dispose();
    this.trackerCam.remove();
  }

  render() {
    return null;
  }
}