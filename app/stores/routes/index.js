/* @flow */

import {
  Observable
} from 'rx';

import Intents from '../../intents';
import Keys from '../../keys';

function getInitialRoute() {
  const pathname = window.location.pathname.slice(1);
  if (pathname.length) return pathname;
  return 'intro';
}

export default {
  get() {
    const changeRouteIntents = Intents
        .subject
        .filter( ({key}) => key === Keys.CHANGE_ROUTE );

    return Observable
      .just( getInitialRoute() )
      .concat( changeRouteIntents.pluck('data') )
      .distinctUntilChanged( x => x )
      .do( route => history.pushState({}, 'Catpocalypse', route + window.location.hash));
  }
};
