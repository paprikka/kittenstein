import Keys from '../../keys';
import Intents from '../../intents';

const {assign} = Object;
function has(arr, item) { return arr.indexOf(item) >= 0; }

export default function coloursToTrack() {
  const initialValue = ['yellow'];
  return Intents
    .by(Keys.TOGGLE_TRACKING_COLOUR)
    .pluck('data')
    .scan( (currColours, colour) => {
      if (has(currColours, colour)) return currColours.filter( c => c !== colour );
      return currColours.concat([colour]);
    }, initialValue )
    .startWith(initialValue)
    .map(updatedColours => state => (
      assign({}, state, {coloursToTrack: updatedColours})
    ));
}