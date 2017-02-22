const map = {
  magenta: {
    main: 'rgba(255, 0, 255, .7)',
    shade: 'rgba(255, 0, 255, .5)'
  },
  yellow: {
    main: 'rgba(255, 255, 0, .7)',
    shade: 'rgba(255, 255, 0, .5)'
  },
  mouse: {
    main: 'rgba(0, 255, 0, .7)',
    shade: 'rgba(0, 255, 0, .5)'
  },
  cyan: {
    main: 'rgba(0, 255, 255, .7)',
    shade: 'rgba(0, 255, 255, .5)'
  },
  other: {
    main: 'rgba(255, 0, 0, .7)',
    shade: 'rgba(255, 0, 0, .5)'
  }
}

export default function getSkin(id='other') {
  return map[id] || map.other;
}