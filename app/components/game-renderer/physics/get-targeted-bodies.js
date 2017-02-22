import {
  Query,
  Vector
} from 'matter-js';

import flatten from '../../../utils/flatten';

export default function targetedBodies(bodies, points = []) {
  const vectors = points.map( ({x, y}) => Vector.create(x, y) );
  const matches = flatten(
    vectors.map( v => Query.point(bodies, v) )
  );
  return matches;
}
