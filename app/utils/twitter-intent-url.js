import keys from 'lodash.keys';

export default function twitterIntentURL(params) {
  const baseURL = 'https://twitter.com/intent/tweet';
  if (!params) return baseURL;
  const queryString = keys(params).map( key => `${key}=${encodeURIComponent(params[key])}`).join('&');
  return `${baseURL}?${queryString}`;
}
