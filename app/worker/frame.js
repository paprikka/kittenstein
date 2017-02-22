console.log('worker code');


// require('tracking/build/tracking');
// import {Observable} from 'rx';

// const tracking = window.tracking; // ugh....

// import groupMatches from '../components/tracking/group-matches';

// function init() {
//   const trackerCam = document.createElement('video');
//   trackerCam.style.cssText = 'cursor: none !important';
//   trackerCam.id = 'sonnet-tracker-cam';
//   trackerCam.width = 280;
//   const {style} = trackerCam;
//   style.zIndex = 1000;
//   style.position = 'fixed';
//   style.transform = 'scaleX(-1) scaleY(1)';
//   style.transformOrigin = '0 0';
//   style.left = '290px';
//   style.top = '10px';
//   style.opacity = 0.01;

//   [
//     'preload',
//     'autoplay',
//     'loop',
//     'muted'
//   ].forEach( attr => trackerCam[attr] = true );

//   document.body.appendChild(trackerCam);

//   const viewportSize = document.body.getBoundingClientRect();
//   Observable.create( obs => {
//     const colours = new tracking.ColorTracker(['magenta', 'yellow']);
//     colours.on( 'track', obs.onNext.bind(obs) );

//     tracking.track('#sonnet-tracker-cam', colours, {
//       camera: true
//     });
//   })
//     .filter( event => event.data && event.data.length )
//     .map( event => event.data )
//     .map( groupMatches )
//     .map( matches => {
//       const {
//         width,
//         height
//       } = trackerCam.getBoundingClientRect();
//       const scaleX = width / viewportSize.width;
//       const scaleY = height / viewportSize.height;
//       return matches.map( match => {
//         return {
//           x: (width - match.x) / scaleX,
//           y: match.y / scaleY,
//           source: { width, height },
//           colour: match.color
//         };
//       });
//     } )
//     // .do( val => console.log(JSON.stringify(val, null, 2)))
//     .subscribe(console.log.bind(console));
// }


// // init();