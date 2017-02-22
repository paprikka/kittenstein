import React from 'react';

import Styles from './index.css';

export default function Notification({message}) {
  return <div className={Styles.default}>{message}</div>;
}