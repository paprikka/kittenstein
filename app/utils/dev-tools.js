import win from './window';
export function isDevMode(): bool {
  return win.location.hash === '#development';
}
export default function devTools(appStateUpdates) {
  if (isDevMode()) {
    appStateUpdates.subscribe( appState => win.__appState = appState );
  }
}
