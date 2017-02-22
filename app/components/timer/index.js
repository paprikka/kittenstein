// @flow weak
import React from 'react';
import Styles from './index.css';

const pad = (val, len) => {
  let valStr = val.toString();
  while (valStr.length < len) valStr = '0' + valStr;
  return valStr;
};

const {floor} = Math;
const parseTime = mSeconds => {
  const seconds = floor(mSeconds / 1000);
  return `${pad(floor(seconds / 60), 2)}:${pad(seconds % 60, 2)}`;
};

import Intents from '../../intents';

export default class Timer extends React.Component {
  constructor(){
    super();
    this.state = {initial: Date.now(), elapsed: 0}
  }
  componentDidMount() {
    const tick = () => {
      this.timer = window.setTimeout(
        () => {
          if (this.state.elapsed >= 60 * 1000) {
            Intents.pause();
            Intents.changeRoute('game-over');
            return;
          }
          this.setState({elapsed: Date.now() - this.state.initial});
          tick();
        },
        1000
      );
    };
    tick();
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
  }

  render() {
    const {elapsed} = this.state;
    return (
      <div className={Styles.default}>
        <span className={Styles.value}>{parseTime(elapsed)}</span>
        <span className={Styles.unit}>s</span>
      </div>
    );
  }
}
