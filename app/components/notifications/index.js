import React from 'react';
import Notification from '../notification';
import Styles from './index.css';
const render = n => <Notification key={n.id} message={n.message}/>;

export default function Notifications({notifications}) {
  return (
    <div className={Styles.default}>{notifications.map(render)}</div>
  );
}