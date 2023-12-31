const first = (array, defaultValue = void 0) => {
  return array.length ? array[0] : defaultValue;
};
const group = (array, getGroupId) => {
  return array.reduce((acc, item) => {
    const groupId = getGroupId(item);
    if (!acc[groupId])
      acc[groupId] = [];
    acc[groupId].push(item);
    return acc;
  }, {});
};

export { first, group };
//# sourceMappingURL=array.mjs.map
