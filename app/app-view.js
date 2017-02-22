/* @flow weak */
import React from 'react';
import styles from './main.css';
import Intents from './intents';

import GameView from './views/game';
import IntroView from './views/intro';
import GameOverView from './views/game-over';

export default function App(props) {
  const {
    route
  } = props;

  let view;
  if (route === 'game') {
    view = <GameView {...props} />;
  } else if (route === 'game-over') {
    view = <GameOverView {...props}/>;
  } else {
    view = <IntroView {...props} />;
  }

  return (
    <div>
      {view}
    </div>
  );
}
