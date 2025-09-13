const first = (array, defaultValue = void 0) => {
  return array.length ? array[0] : defaultValue;
};
const group = (array, getGroupId) => {
  return array.reduce(
    (acc, item) => {
      const groupId = getGroupId(item);
      if (!acc[groupId])
        acc[groupId] = [];
      acc[groupId].push(item);
      return acc;
    },
    {}
  );
};
const uniq = (array) => {
  return Array.from(new Set(array));
};
const flatten = (array) => {
  return array.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...val);
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
};
const chunk = (array, size) => {
  if (size <= 0)
    return [];
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
const range = (start, end, step = 1) => {
  if (end === void 0) {
    end = start;
    start = 0;
  }
  const result = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
};
const compact = (array) => {
  return array.filter(Boolean);
};
const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export { chunk, compact, first, flatten, group, range, shuffle, uniq };
//# sourceMappingURL=array.mjs.map
