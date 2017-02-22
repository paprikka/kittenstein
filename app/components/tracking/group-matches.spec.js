import groupMatches from './group-matches';

describe('components/tracking/group-matches', () => {
  it('returns an array', () => {
    expect(groupMatches([])).to.deep.equal([]);
  });
  
  it('returns an array with matches grouped by colour and pick ones with the highest area', ()=>{
    const matches = [
      {x: 1, y: 2, width: 1, height: 900, color: 'magenta'},
      {x: 1, y: 2, width: 100, height: 100, color: 'magenta'},
      {x: 1, y: 2, width: 200, height: 200, color: 'yellow'},
      {x: 1, y: 2, width: 1, height: 2, color: 'magenta'}
    ];
    const expectedResult = [
      {x: 1, y: 2, width: 100, height: 100, color: 'magenta'},
      {x: 1, y: 2, width: 200, height: 200, color: 'yellow'}
    ];
    
    const sortByColour = (a, b) => {
      if(a.color > b.color) return 1;
      if(a.color < b.color) return -1;
      return 0;
    };
    expect(groupMatches(matches)).to.deep.equal(expectedResult);
  })
});