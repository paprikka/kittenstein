import React from 'react';
import Styles from './index.css';

import banana from './banana.png';
import kiwi from './kiwi.png';
import blueberry from './blueberry.png';
import pomegranate from './pomegranate.png';
import mouse from './mouse.png';

function getItemClass(id, values) {
  if (values.indexOf(id) >= 0) return [Styles.item, Styles.selected].join(' ');
  return Styles.item;
}
export default function InputPicker({onSelect, selectedInputs}) {
  return (
    <div>
      <div className={Styles.annotation}>Click to select weapons:</div>
      <div className={Styles.default}>
        <div
          onClick={() => onSelect('yellow')}
          className={getItemClass('yellow', selectedInputs)}>
          <img src={banana}/>
          <span className={Styles.itemName}>Yellow</span>
        </div>
        <div
          onClick={() => onSelect('cyan')}
          className={getItemClass('cyan', selectedInputs)}>
          <img src={blueberry}/>
          <span className={Styles.itemName}>Cyan</span>
        </div>
        <div
          onClick={() => onSelect('magenta')}
          className={getItemClass('magenta', selectedInputs)}>
          <img src={pomegranate}/>
          <span className={Styles.itemName}>Magenta</span>
        </div>
        <div
          className={Styles.item}>
          <img src={mouse}/>
          <span className={Styles.itemName}>Mouse</span>
        </div>
      </div>

    </div>
  );
}