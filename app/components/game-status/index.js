import React from 'react';
import Styles from './index.css';

import PointCounter from '../point-counter';
import Timer from '../timer';
import OverlayLabel from '../overlay-label';

export default function GameStatus({game}) {
  return (
    <div className={Styles.default}>
      <PointCounter game={game}/>
      <Timer/>
      {
        game.isPaused ? <OverlayLabel text="paused"/> : null
      }
    </div>
  );
}