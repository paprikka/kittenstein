import React from 'react';
import ReactDOM from 'react-dom';
import devTools, {isDevMode} from './utils/dev-tools';


import App from './app-view';
import {get} from './stores/app';


function renderApp(appState) {
  ReactDOM
    .render(
      <App {...appState} />,
      document.getElementById('root')
    );
}

const appStateUpdates = get().publish();
appStateUpdates.subscribe(renderApp);
appStateUpdates.connect();

devTools(appStateUpdates);
