import React from 'react';
import Styles from './index.css';
import Intents from '../../intents';
import MouseTracking from '../../components/mouse-tracking';
import FX from '../../components/fx';
import InputPicker from '../../components/input-picker';

import logoImg from './logo.png';
import bgSound from './eye.ogg';

function goToGame() {
  Intents.playSound({id: 'mouseClick'});
  Intents.changeRoute('game');
}

function onEnter() {
  Intents.playSound({id: 'mouseOver'});
}
const toTextChunk = (char, i) => (
  <span
    style={ {animationDelay: `${i * .23}s`} }
    key={i}
    className={Styles.textChunk}>{char}</span>
);

const isSoundEnabled = !/.*noSound.*/.test(window.location.hash);

export default function IntroView({fx, camera, game}) {
  const audioEl = isSoundEnabled ? <audio src={bgSound} autoPlay loop/> : null;
  return (
    <div className={Styles.default}>
      {audioEl}
      <div className={Styles.modalContainer}>
        <img className={Styles.logo} src={logoImg}/>
        <h2 className={Styles.subheader}>Return to Castle</h2>
        <h1 className={Styles.header}>{'Kittenstein'.split('').map(toTextChunk)}</h1>
        <InputPicker selectedInputs={game.coloursToTrack} onSelect={Intents.toggleTrackingColour}/>
        <br/>
        <button
          className={Styles.introButton}
          onMouseEnter={onEnter}
          onClick={goToGame}
        >Start</button>
      </div>
      <MouseTracking onChange={ Intents.moveCursor }/>
      <FX fx={fx} camera={camera} />
    </div>
  );
}