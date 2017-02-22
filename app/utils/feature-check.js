import win from './window';

const isIOS = ua => (/iphone|ipad|ipod/gi).test(ua);

export function needsRubberBandPolyfill() {
  return isIOS(win.navigator.userAgent);
}

export function hasFastClick() {
  return !isIOS(win.navigator.userAgent);
}
