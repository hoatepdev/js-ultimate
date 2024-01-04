'use strict';

const isArray = Array.isArray;
const isObject = (value) => {
  return !!value && value.constructor === Object;
};
const isFunction = (value) => {
  return typeof value === "function";
};
const isString = (value) => {
  return typeof value === "string";
};
const isNumber = (value) => {
  return Number(value) === value;
};
const isDate = (value) => {
  return value instanceof Date;
};
const isSymbol = (value) => {
  return typeof value === "symbol";
};
const isNil = (value) => {
  return value === null || value === void 0;
};
const isEmpty = (value) => {
  if (value === true || value === false)
    return true;
  if (value === null || value === void 0)
    return true;
  if (isNumber(value))
    return value === 0;
  if (isDate(value))
    return isNaN(value.getTime());
  if (isFunction(value))
    return false;
  if (isNumber(value.length))
    return value.length === 0;
  if (isNumber(value.size))
    return value.size === 0;
  return Object.keys(value).length === 0;
};
const deepEqual = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
};
const isEqual = (x, y) => {
  if (Object.is(x, y))
    return true;
  if (x instanceof Date && y instanceof Date)
    return x.getDate() === y.getDate();
  if (typeof x === "object" && typeof y === "object" && x !== null && y !== null) {
    return deepEqual(x, y);
  }
  return false;
};

exports.isArray = isArray;
exports.isDate = isDate;
exports.isEmpty = isEmpty;
exports.isEqual = isEqual;
exports.isFunction = isFunction;
exports.isNil = isNil;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.isSymbol = isSymbol;
//# sourceMappingURL=typed.cjs.map
