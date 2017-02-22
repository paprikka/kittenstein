import React from 'react';

import Tracking from '../../components/tracking';
import MouseTracking from '../../components/mouse-tracking';
import FX from '../../components/fx';
import GameRenderer from '../../components/game-renderer';
import GameStatus from '../../components/game-status';
import Notifications from '../../components/notifications';

import Intents from '../../intents';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  cursor: 'none'
};

import Styles from './index.css';

const noCursorStyle = {
  cursor: 'none'
};

export default function GameView(props) {
  const {
    camera,
    game,
    fx,
    notifications
  } = props;

  const canTrack = !(
    /noTracking/i.test(window.location.hash) ||
    game.coloursToTrack.length === 0
  );

  let trackingElement;
  if (canTrack) {
    trackingElement = <Tracking coloursToTrack={game.coloursToTrack} onChange={ Intents.moveCameraCursor }/>;
  }

  return (
    <div style={style} className={Styles.default}>
      <MouseTracking onChange={ Intents.moveCursor }/>
      {trackingElement}
      <GameRenderer style={ noCursorStyle } {...props} />
      <FX fx={fx} camera={camera} style={ noCursorStyle } />
      <GameStatus game={game}/>
      <Notifications notifications={notifications}/>
    </div>
  );
}