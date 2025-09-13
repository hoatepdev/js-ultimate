'use strict';

const array = require('./array.cjs');
const object = require('./object.cjs');
const _function = require('./function.cjs');
const string = require('./string.cjs');
const typed = require('./typed.cjs');
const utils = require('./utils.cjs');



exports.chunk = array.chunk;
exports.compact = array.compact;
exports.first = array.first;
exports.flatten = array.flatten;
exports.group = array.group;
exports.range = array.range;
exports.shuffle = array.shuffle;
exports.uniq = array.uniq;
exports.cloneDeep = object.cloneDeep;
exports.invert = object.invert;
exports.merge = object.merge;
exports.omit = object.omit;
exports.pick = object.pick;
exports.debounce = _function.debounce;
exports.memoize = _function.memoize;
exports.once = _function.once;
exports.throttle = _function.throttle;
exports.camelCase = string.camelCase;
exports.capitalize = string.capitalize;
exports.kebabCase = string.kebabCase;
exports.trim = string.trim;
exports.isArray = typed.isArray;
exports.isDate = typed.isDate;
exports.isEmpty = typed.isEmpty;
exports.isEqual = typed.isEqual;
exports.isFunction = typed.isFunction;
exports.isNil = typed.isNil;
exports.isNumber = typed.isNumber;
exports.isObject = typed.isObject;
exports.isString = typed.isString;
exports.isSymbol = typed.isSymbol;
exports.clamp = utils.clamp;
exports.deepFreeze = utils.deepFreeze;
exports.get = utils.get;
exports.randomInt = utils.randomInt;
exports.sleep = utils.sleep;
//# sourceMappingURL=index.cjs.map
