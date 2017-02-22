import Intents from '../../intents';
import Keys from '../../keys';

import Sprites from './fx/sprites';
import SpriteImages from './fx/sprite-images';

const spriteDefaults = {
  frameIndex: 0
};

const {assign} = Object;

import Ticker from '../ticker';

import getUUID from '../../utils/uuid';
const getSprite = (spriteSettings, allSprites) => {
  const spriteDefinition = allSprites[spriteSettings.type];
  if (!spriteDefinition) return;

  return assign(
    {},
    spriteSettings,
    spriteDefinition,
    spriteDefaults,
    {id: getUUID()}
  );
};

const isInProgress = sprite => sprite.frameIndex <= sprite.frameCount;

const {floor} = Math;

const getFrameIndex = (elapsedTime, fps) => floor(elapsedTime / (1000 / fps));
const calculateSpriteState = (ticker, fps) => sprite => {
  const startTime = sprite.startTime >= 0 ? sprite.startTime : ticker.time;
  const elapsedTime = ticker.time - startTime;
  const frameIndex = getFrameIndex(elapsedTime, fps);

  return assign( {}, sprite, { startTime, elapsedTime, frameIndex } );
};

export default {
  get(fps = 30) {
    return SpriteImages.get(Sprites).flatMap( sprites => {
      const ticker = Ticker.get()
                    .map( tick => state => assign(
                      {}, state, {tick}
                    ));

      const spriteRequests = Intents.by(Keys.ADD_PARTICLE)
                      .pluck('data')
                      .map( spriteSettings => getSprite(spriteSettings, sprites))
                      .filter( x => x )
                      .map( sprite => state => {
                        return assign({}, state, {
                          sprites: state.sprites.concat([sprite])
                        });
                      });

      const result = ticker
                      .merge( spriteRequests )
                      .scan(
                        (sprites, reducer) => reducer(sprites),
                        { sprites: [], tick: { time: 0, deltaTime: 0}, fps }
                      )
                      .map( (state) => {
                        state.sprites = state.sprites.map(
                          calculateSpriteState(state.tick, fps)
                        ).filter(isInProgress);
                        return state;
                      })
                      .map( ({sprites})=> sprites );

      return result;
    });
  }
};