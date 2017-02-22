import {
  Composite,
} from 'matter-js';

import Intents from '../../../intents';
import getTargetedBodies from './get-targeted-bodies';

export default function removeKills(cameraPos, bodies, engine) {
  const targetedBodies = getTargetedBodies(bodies, cameraPos);

  targetedBodies.forEach(
      body => {
        Composite.remove(engine.world, body);
        Intents.addParticle({
          type: 'explosion4',
          x: body.position.x,
          y: body.position.y
        });
        Intents.killMonster({id: body.label});
      }
    );
}