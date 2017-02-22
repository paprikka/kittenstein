import React from 'react';

import Styles from './index.css';

export default function OverlayLabel({text}) {
  return (
    <div className={Styles.container}>
      <span className={Styles.label}>{text}</span>
    </div>
  );
}