// @flow weak
import React from 'react';
import Styles from './index.css';

const pad = (val: number | string, len: number): string => {
  let valStr = val.toString();
  while (valStr.length < len) valStr = '0' + valStr;
  return valStr;
};

export default function PointCounter({game}) {
  const maxLength = 3;
  return (
    <div className={Styles.default}>
      <div className={Styles.leftCol}>
        <div className={Styles.label}>kills</div>
        {pad(game.status.killCount + game.status.killStreakBonus, maxLength)}
      </div>
      <div className={Styles.col}>:</div>
      <div className={Styles.rightCol}>
        <div className={Styles.label}>deaths</div>
        {pad(game.status.lostCount, maxLength)}
      </div>
    </div>
  );
}