import getTargetedBodies from './get-targeted-bodies';
import {
  Bodies,
  Query
} from 'matter-js';

describe('physics/get-targeted-bodies', () => {
  it('should return an array', () => {
    expect(getTargetedBodies()).to.deep.equal([]);    
  });
  
  it('should Matter.query on each vector passed', () => {
    const bodies = [
      Bodies.rectangle(0, 0, 100, 100),
      Bodies.rectangle(200, 200, 100, 100),
      Bodies.rectangle(400, 400, 100, 100)
    ];
    
    const points = [
      {x: 50, y: 50},
      {x: 250, y: 250},
      {x: 450, y: 450}
    ];

    const result = getTargetedBodies(
      bodies,
      points
    );
    
    expect(result).to.deep.equal(bodies);
  }); 
  
  // it('should Matter.query on each vector passed', () => {
  //   const bodies = [
  //     'body1',
  //     'body2',
  //     'body3'
  //   ];
    
  //   const points = [
  //     'point1',
  //     'point2',
  //     'point3'
  //   ];
  //   const mockQuery = {
  //     point: val =>  ['match:' + val] 
  //   };
    
  //   sinon.spy(mockQuery, 'point');
    
  //   const mockVector = {
  //     create: str => 'vector:' + str
  //   };
    
  //   sinon.spy(mockVector, 'create');
    
  //   getTargetedBodies.__Rewire__('Query', mockQuery);
  //   getTargetedBodies.__Rewire__('Vector', mockVector);
  //   const result = getTargetedBodies(
  //     bodies,
  //     points
  //   );
    
  //   points.forEach(
  //     p => expect(mockVector.create).to.have.been.calledWith(p)
  //   );
    
  //   points.map(mockVector.create).forEach(
  //     v => expect(mockQuery.point).to.have.been.calledWith(v)
  //   );
    
  //   expect(result).to.deep.equal(
  //     [
  //       'match:vector:point1',
  //       'match:vector:point2',
  //       'match:vector:point3'
  //     ]
  //   );
  // }); 
});