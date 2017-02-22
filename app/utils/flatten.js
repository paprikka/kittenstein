export default (arr = []) => (
  arr.reduce( (acc, val) => acc.concat(val), [])
);