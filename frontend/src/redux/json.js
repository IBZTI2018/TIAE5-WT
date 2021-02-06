// Empty data agnostic toJSONTree
export const toJSONTree = (input) => {
  if (input === null) return {};
  if (input === undefined) return {};
  if (typeof(input) !== 'object') return {};

  return input.toJSONTree();
}
