import {Observable} from 'rx';

export default function spriteImage (id, url) {
  return Observable.create( obs => {
    const imgElement = document.createElement('img');
    
    imgElement.onload = () => {
      obs.onNext({ id, imgElement });
    };
    
    imgElement.onerror = () => obs.onError( new Error(`Image ${url} could not be loaded.`) );
    
    imgElement.src = url;
  });
  
}