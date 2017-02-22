import isArray from 'lodash.isArray';
import assign from 'lodash.assign';

export default function StyleSheet(rules): any {
  if (!rules) return {};
  const input = isArray(rules) ? rules : [rules];
  return assign({}, ...input);
}
