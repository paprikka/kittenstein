import {Observable} from 'rx';
import spriteImage from './sprite-image';
import Immutable from 'immutable';

const {keys, assign} = Object;

function getImageElements(sprites) {
  return Observable
            .fromArray(keys(sprites))
            .flatMap( id => spriteImage(id, sprites[id].sourceIMG))
            .scan( (all, curr) => all.concat(curr), [])
            .filter( loadedSprites => loadedSprites.length === keys(sprites).length);
}

export default {
  get(sprites = {}) {
    return getImageElements(sprites)
              .map( loadedImages => {
                const loadedImagesMap = Immutable.fromJS(
                    loadedImages.reduce( (all, curr) => {
                      const change = {
                        [curr.id]: { imgElement: curr.imgElement }
                      };
                      return assign({}, all, change);
                    }, {})
                  );

                const mergedWithIMGs = Immutable
                                          .fromJS(sprites)
                                          .mergeDeep(loadedImagesMap);
                return mergedWithIMGs;
              })
              .map( spritesMap => spritesMap.toJS() );

  }
};