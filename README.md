# js-ultimate

🚀 Lightweight, powerful utility functions to replace lodash with **zero dependencies** and **strong TypeScript support**.

<p align="center">
  <a href="https://bundlephobia.com/package/js-ultimate">
    <img src="https://img.shields.io/bundlephobia/minzip/js-ultimate?label=minzipped" alt="bundle size" height="18">
  </a>
  <a href="https://www.npmjs.com/package/js-ultimate">
    <img src="https://img.shields.io/npm/dm/js-ultimate.svg" alt="npm downloads" height="18">
  </a>
  <a href="https://www.npmjs.com/package/js-ultimate">
    <img src="https://img.shields.io/npm/v/js-ultimate.svg" alt="npm version" height="18">
  </a>
  <a href="https://github.com/hoatepdev/js-ultimate">
    <img src="https://img.shields.io/npm/l/js-ultimate.svg" alt="MIT license" height="18">
  </a>
</p>

<div align="center">
  <p align="center">
    <img src="https://github.com/hoatepdev/js-ultimate/raw/main/banner.png" alt="js-ultimate" width="100%" style="border-radius:4px" />
  </p>
</div>

## Installation

```bash
yarn add js-ultimate
```

## Features

- ✅ **Zero dependencies** - Pure TypeScript implementation
- ✅ **Strong TypeScript types** - Full type safety
- ✅ **Tree-shakable** - Import only what you need
- ✅ **Lodash replacement** - Drop-in alternatives
- ✅ **Comprehensive** - 25+ utility functions
- ✅ **Well tested** - 98%+ test coverage

## Usage

```typescript
import {
  // Array utilities
  uniq,
  flatten,
  chunk,
  shuffle,
  // Object utilities
  merge,
  pick,
  omit,
  cloneDeep,
  // Function utilities
  debounce,
  throttle,
  once,
  memoize,
  // String utilities
  camelCase,
  kebabCase,
  capitalize,
  // General utilities
  clamp,
  randomInt,
  sleep,
  get
} from 'js-ultimate'

// Array operations
const numbers = [1, 2, 2, 3, 4, 4, 5]
const unique = uniq(numbers) // [1, 2, 3, 4, 5]
const chunks = chunk(numbers, 2) // [[1, 2], [2, 3], [4, 4], [5]]

// Object operations
const user = { name: 'John', age: 30, email: 'john@example.com' }
const publicData = pick(user, ['name', 'age']) // { name: 'John', age: 30 }
const merged = merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }

// Function utilities
const debouncedSave = debounce(() => console.log('Saving...'), 300)
const throttledScroll = throttle(() => console.log('Scrolling...'), 100)

// String utilities
const title = camelCase('hello world') // 'helloWorld'
const slug = kebabCase('Hello World') // 'hello-world'

// General utilities
const randomNum = randomInt(1, 100) // Random integer between 1-100
const clamped = clamp(150, 0, 100) // 100
await sleep(1000) // Wait 1 second
```

## API Reference

### Array Utilities

- `first(array, defaultValue?)` - Get first element
- `uniq(array)` - Remove duplicates
- `flatten(array)` - Flatten one level deep
- `chunk(array, size)` - Split into chunks
- `range(start, end?, step?)` - Generate number range
- `compact(array)` - Remove falsy values
- `shuffle(array)` - Randomly shuffle array
- `group(array, keyFn)` - Group by key function

### Object Utilities

- `merge(target, ...sources)` - Deep merge objects
- `pick(object, keys)` - Pick specific properties
- `omit(object, keys)` - Omit specific properties
- `cloneDeep(object)` - Deep clone object
- `invert(object)` - Swap keys and values

### Function Utilities

- `debounce(fn, delay)` - Debounce function calls
- `throttle(fn, delay)` - Throttle function calls
- `once(fn)` - Execute function only once
- `memoize(fn)` - Cache function results

### String Utilities

- `capitalize(string)` - Capitalize first letter
- `camelCase(string)` - Convert to camelCase
- `kebabCase(string)` - Convert to kebab-case
- `trim(string, chars?)` - Trim characters

### Type Utilities

- `isNil(value)` - Check if null or undefined
- `isArray(value)` - Check if array
- `isObject(value)` - Check if plain object
- `isFunction(value)` - Check if function
- `isString(value)` - Check if string
- `isNumber(value)` - Check if number
- `isDate(value)` - Check if date
- `isSymbol(value)` - Check if symbol
- `isEmpty(value)` - Check if empty
- `isEqual(a, b)` - Deep equality check

### General Utilities

- `randomInt(min, max)` - Random integer in range
- `clamp(number, min, max)` - Clamp number to range
- `sleep(ms)` - Promise-based delay
- `deepFreeze(object)` - Recursively freeze object
- `get(object, path, defaultValue?)` - Get nested property

## Development

```bash
# Install dependencies
yarn install

# Run tests
yarn test

# Run tests with coverage
yarn test:coverage

# Build library
yarn build

# Format code
yarn format
```

## License

MIT © [hoatepdev](https://github.com/hoatepdev)
