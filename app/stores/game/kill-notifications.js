import Intents from '../../intents';
import Keys from '../../keys';
import {Observable} from 'rx';

const killsToNotifications = {
  2: {
    message: 'Double Kill',
    soundID: 'doublekill'
  },
  3: {
    message: 'Triple Kill',
    soundID: 'triplekill'
  },
  4: {
    message: 'Multi Kill',
    soundID: 'multikill'
  },
  5: {
    message: 'Ultra Kill',
    soundID: 'ultrakill'
  },
  6: {
    message: 'Mega Kill',
    soundID: 'megakill'
  },
  7: {
    message: 'Monster Kill',
    soundID: 'monsterkill'
  },
  8: {
    message: 'Aaaaargh!!1',
    soundID: 'godlike'
  }
};

export default function killNotificatons() {
  const killStreaks = Intents
    .by(Keys.KILL_MONSTER)
    .map( () => Date.now() )
    .scan( (all, curr)=> [curr].concat(all), [] )
    .map( all => {
      let killCount = 1;
      let ind = 0;
      while (all[ind] && all[ind + 1]) {
        if (all[ind] - all[ind + 1] < 1200) {
          killCount++;
          ind++;
        } else {
          break;
        }
      }

      return killCount;
    })
    .filter( killCount => killCount > 1);

  killStreaks.subscribe( Intents.killStreak );

  return killStreaks.flatMap( killCount => {
    const notification = killsToNotifications[killCount];
    if (notification) return Observable.just(notification);
    return Observable.empty();
  }).subscribe(({message, soundID})=>{
    Intents.notify({message});
    Intents.playSound({id: soundID});
  });
}