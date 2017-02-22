import {
  Events,
  Engine,
  World,
  Runner,
  Composite
} from 'matter-js';

import {Observable} from 'rx';
import Intents from '../../../intents';

import monster from '../monster';

import cap from '../../../utils/cap';
const {
  random,
  floor
} = Math;

const dimensions = document.body.getBoundingClientRect();

const addMonsterStream = Observable
  .interval(1000)
  .map( ()=>{
    const newMonster = {
      x: cap(0, dimensions.width, floor(random() * dimensions.width)),
      y: random() * -500,
      width: 20 + random() * 50,
      height: 20 + random() * 50
    };
    return newMonster;
  } );

import renderHoff from './render-hoff';
import renderCher from './render-cher';
import removeKills from './remove-kills';
export function run(
  domElement,
  dimensions = document.body.getBoundingClientRect()
  ) {

  let state = {
    game: {
      isSlowMotion: false,
      isPaused: false,
    },
    camera: []
  };

  // create a Matter.js engine
  const engine = Engine.create(domElement, {
    render: {
      options: {
        background: 'transparent',
        wireframes: false,
        enableSleeping: true,
        showSleeping: true,
        width: dimensions.width,
        height: dimensions.height
      }
    }
  });

  const maxBodies = 25;
  const bodies = {};
  addMonsterStream.subscribe(
    (coords) => {
      const monsterBody = monster(coords);
      const tooManyBodies = Object.keys(bodies).length >= maxBodies;
      if ( tooManyBodies && state.game.isPaused ) return;
      bodies[monsterBody.id] = monsterBody;
      World.add(engine.world, monsterBody);
    }
  );

  // add the stack to the world

  const {keys} = Object;
  function removeUselessBodies() {
    const bodiesToRemove = keys(bodies).filter(
      k => bodies[k].position.y > dimensions.height + 1000
    );

    bodiesToRemove.forEach( k => {
      Composite.remove(engine.world, bodies[k]);
      delete bodies[k];
      Intents.increaseLostCount();
    });
  }

  renderHoff(engine.world, dimensions);
  Observable.interval(6000)
            .map( ()=> random() > 0.75 )
            .filter( x => x )
            .subscribe( () => {
              renderCher(engine.world, dimensions);
            });


  const onAfterUpdate = () => {
    const allBodies = Composite.allBodies(engine.world);
    removeUselessBodies();
    removeKills(state.camera, allBodies, engine);
  };

  Events.on(engine, 'afterUpdate', onAfterUpdate );

  const fps = 60;
  const runner = Runner.create({fps, deltaSampleSize: fps});

  let loopEnabled = true;
  let loopID;
  function loop() {
    loopID = window.requestAnimationFrame(loop);
    if (!loopEnabled) return;
    Runner.tick(runner, engine, Date.now());
  }

  loop();

  function pause() { loopEnabled = false; }

  function play() { loopEnabled = true; }

  function stop() {
    window.cancelAnimationFrame(loopID);
    Runner.stop(runner);
  }

  function updateSlowMotion(isSlowMotion) {
    engine.timing.timeScale = isSlowMotion ? 0.1 : 1;
  }

  function updatePaused(isPaused) {
    if (isPaused) return pause();
    play();
  }

  function updateState(newState) {
    if (state.game.isSlowMotion !== newState.game.isSlowMotion) {
      updateSlowMotion(newState.game.isSlowMotion);
    }

    if (state.game.isPaused !== newState.game.isPaused) {
      updatePaused(newState.game.isPaused);
    }

    state = newState;
  }

  return {
    play,
    pause,
    stop,
    updateState
  };
}

export default {
  run
};