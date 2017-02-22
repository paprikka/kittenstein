import Mouse from './mouse';
import Camera from './camera';

import {Observable} from 'rx';

const {assign} = Object;

const assignType = (obj, type) => assign({}, obj, {type});

const noMouse = ({type}) => type !== 'mouse'; 
const noCamera = ({type}) => type !== 'camera'; 

export default {
  get() {
    const mouseEvents = Mouse
                          .get()
                          .map( coords => assignType(coords, 'mouse'))
                          .map( coords => allCoords => 
                            allCoords
                                  .filter(noMouse)
                                  .concat(coords)
                          );
    
    
    const cameraEvents = Camera
                          .get()
                          .map( coords => coords.map( c => assignType(c, 'camera')))
                          .map( coords => allCoords => (
                            allCoords
                                .filter(noCamera)
                                .concat(coords)
                          ));
                          
                          
    return mouseEvents
      .merge(cameraEvents)
      .scan( (allCoords, reducer) => reducer(allCoords), [])
      .startWith([]);
  }
}