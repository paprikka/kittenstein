import React from 'react';
import Intents from '../../intents';
import FX from '../../components/fx';
import MouseTracking from '../../components/mouse-tracking';

function killAllYay() {
  window.location.pathname = '/';
}

import Styles from './index.css';
export default function GameOverView({game, camera, fx}) {
  return (
    <div className={Styles.default}>
      <div className={Styles.modalContainer}>
          <h1 className={Styles.header}>
            Your result:
          </h1>
          <div className={Styles.result}>
            {game.status.killCount + game.status.killStreakBonus}
          </div>
          <button className={Styles.button} onClick={killAllYay}>Restart</button>
      </div>
      <MouseTracking onChange={ Intents.moveCursor }/>
      <FX fx={fx} camera={camera} />
    </div>
  );
}