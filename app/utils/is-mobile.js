import win from './window';

export default function isMobile() {
  const ua = win.navigator.userAgent;
  return (/android|iphone|ipad|ipod/gi).test(ua);
}
