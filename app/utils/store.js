import win from './window';

export function setItem(key, val) {
  win.localStorage.setItem.bind(win.localStorage)(key, val);
}
export function getItem(key) {
  win.localStorage.getItem.bind(win.localStorage)(key);
}
