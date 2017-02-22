import Intents from '../../../intents';
import Keys from '../../../keys';

function requestSound(id) {
  Intents.playSound({id});
}
export default function soundManager() {
  const killMonster = Intents.by(Keys.KILL_MONSTER)
                .pluck('data')
                .map(kill => {
                  if (kill.id === 'cher') return 'cher';
                  return 'explosion';
                });
  const toggleTrackingColour = Intents.by(Keys.TOGGLE_TRACKING_COLOUR)
                                      .map(()=>'mouseClick');

  killMonster
    .merge(toggleTrackingColour)
    .subscribe(requestSound);
}