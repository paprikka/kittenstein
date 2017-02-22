const area = (obj) => obj.width * obj.height;
const {assign, keys} = Object;

export default function groupMatches(matches = []) {
  const group = matches.reduce( (all, newMatch) => {
    const currMatch = all[newMatch.color];
    
    if (!currMatch) return assign({}, all, {[newMatch.color]: newMatch});
    
    const currMatchArea = area(currMatch);
    const newMatchArea = area(newMatch);
    
    if (newMatchArea > currMatchArea) return assign({}, all, {[newMatch.color]: newMatch});
    return all;
  }, {});
  
  return keys(group).map( key => group[key] );
}