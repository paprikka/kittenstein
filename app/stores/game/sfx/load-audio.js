import {Observable} from 'rx';

const context = new AudioContext();
export default function loadAudio(url) {
  return Observable.create( obs => {
    fetch(url)
      .then( res => res.arrayBuffer() )
      .then(obs.onNext.bind(obs));
  }).flatMap( arrayBuffer => {
    return Observable.create( obs => {
      context.decodeAudioData(arrayBuffer, buffer => obs.onNext({
        buffer,
        context
      }));
    });
  });
}