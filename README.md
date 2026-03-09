# js-ultimate

[![CI](https://github.com/hoatepdev/js-ultimate/actions/workflows/ci.yml/badge.svg)](https://github.com/hoatepdev/js-ultimate/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/js-ultimate.svg)](https://www.npmjs.com/package/js-ultimate)
[![npm downloads](https://img.shields.io/npm/dm/js-ultimate.svg)](https://www.npmjs.com/package/js-ultimate)
[![bundle size](https://img.shields.io/bundlephobia/minzip/js-ultimate)](https://bundlephobia.com/package/js-ultimate)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/js-ultimate)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/npm/l/js-ultimate.svg)](https://github.com/hoatepdev/js-ultimate/blob/main/LICENSE)

> A lightweight, zero-dependency TypeScript utility library designed as a modern Lodash replacement.

## ✨ Features

- **Zero dependencies** — Tiny footprint, no supply chain risk
- **Fully tree-shakable** — Bundle only what you use
- **TypeScript-first** — Full type safety and excellent IDE support
- **High performance** — Faster than Lodash in core operations
- **Modern ES modules** — Built for today's bundlers and runtimes
- **Security-conscious** — Built-in protections against prototype pollution

## 📦 Installation

```bash
# npm
npm install js-ultimate

# yarn
yarn add js-ultimate

# pnpm
pnpm add js-ultimate

# bun
bun add js-ultimate
```

## 🚀 Quick Start

```typescript
import { chunk, get, uniq, debounce } from 'js-ultimate'

// Array utilities
chunk([1, 2, 3, 4, 5], 2)  // => [[1, 2], [3, 4], [5]]

// Object utilities
const obj = { user: { name: 'Alice', age: 30 } }
get(obj, 'user.name')       // => 'Alice'

// Collection utilities
uniq([1, 2, 1, 3, 2])       // => [1, 2, 3]

// Function utilities
const save = debounce(() => saveToServer(), 300)
```

## 📘 API

### Array

#### `chunk(array, size)`

Splits an array into chunks of the specified size.

```typescript
chunk([1, 2, 3, 4, 5], 2)  // => [[1, 2], [3, 4], [5]]
chunk([1, 2, 3], 5)        // => [[1, 2, 3]]
```

#### `compact(array)`

Removes falsy values from an array.

```typescript
compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5])
// => [1, 2, 3, 4, 5]
```

#### `difference(array, values)`

Returns values in array not present in values.

```typescript
difference([1, 2, 3, 4], [2, 4])  // => [1, 3]
```

#### `first(array)`

Gets the first element of an array.

```typescript
first([1, 2, 3])  // => 1
first([])         // => undefined
```

#### `flattenDeep(array)`

Recursively flattens a nested array.

```typescript
flattenDeep([1, [2, [3, [4, [5]]]]])  // => [1, 2, 3, 4, 5]
```

#### `intersection(arrays)`

Returns the intersection of multiple arrays.

```typescript
intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])  // => [3]
```

#### `last(array)`

Gets the last element of an array.

```typescript
last([1, 2, 3])  // => 3
last([])         // => undefined
```

#### `range(start, end?, step?)`

Creates an array of numbers from start to end.

```typescript
range(4)        // => [0, 1, 2, 3]
range(0, 10)    // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
range(0, 10, 2) // => [0, 2, 4, 6, 8]
```

#### `uniq(array)`

Removes duplicate values from an array.

```typescript
uniq([1, 2, 1, 3, 2])  // => [1, 2, 3]
```

#### `uniqBy(array, iteratee)`

Removes duplicates based on a key or function.

```typescript
uniqBy([{ id: 1 }, { id: 2 }, { id: 1 }], 'id')
// => [{ id: 1 }, { id: 2 }]

uniqBy([2.1, 1.2, 2.3], Math.floor)
// => [2.1, 1.2]
```

### Collection

#### `filter(collection, predicate)`

Iterates over elements of collection, returning an array of all elements predicate returns truthy for.

```typescript
filter([1, 2, 3, 4], n => n % 2 === 0)  // => [2, 4]
filter({ a: 1, b: 2, c: 3 }, n => n > 1)  // => [2, 3]
```

#### `find(collection, predicate)`

Returns the first element predicate returns truthy for.

```typescript
find([{ id: 1 }, { id: 2 }], { id: 2 })  // => { id: 2 }
find([1, 2, 3], n => n > 1)             // => 2
```

#### `groupBy(collection, iteratee)`

Creates an object composed of keys generated from the results of running each element through iteratee.

```typescript
groupBy([{ type: 'a' }, { type: 'b' }, { type: 'a' }], 'type')
// => { a: [{ type: 'a' }, { type: 'a' }], b: [{ type: 'b' }] }
```

#### `keyBy(collection, iteratee)`

Creates an object composed of keys generated from the results of running each element through iteratee.

```typescript
keyBy([{ id: 'a' }, { id: 'b' }], 'id')
// => { a: { id: 'a' }, b: { id: 'b' } }
```

#### `map(collection, iteratee)`

Creates an array of values by running each element in collection through iteratee.

```typescript
map([1, 2, 3], n => n * 2)  // => [2, 4, 6]
map({ a: 1, b: 2 }, (n, k) => k)  // => ['a', 'b']
```

#### `reduce(collection, iteratee, accumulator)`

Reduces collection to a single value.

```typescript
reduce([1, 2, 3], (sum, n) => sum + n, 0)  // => 6
reduce({ a: 1, b: 2 }, (acc, n) => acc + n, 0)  // => 3
```

### Object

#### `cloneDeep(value)`

Recursively clones a value.

```typescript
const original = { a: 1, b: { c: 2 } }
const cloned = cloneDeep(original)
cloned.b.c = 3
console.log(original.b.c)  // => 2 (unchanged)
```

#### `get(object, path, defaultValue?)`

Gets the value at path of object.

```typescript
const obj = { a: { b: { c: 42 } } }
get(obj, 'a.b.c')      // => 42
get(obj, 'a.x.y', 'default')  // => 'default'
```

#### `mergeDeep(target, source)`

Recursively merges source into target.

```typescript
mergeDeep({ a: { b: 1, c: 2 } }, { a: { b: 3, d: 4 } })
// => { a: { b: 3, c: 2, d: 4 } }
```

#### `omit(object, paths)`

Creates an object composed of the own and inherited enumerable property paths of object that are not omitted.

```typescript
omit({ a: 1, b: 2, c: 3 }, ['b', 'c'])  // => { a: 1 }
```

#### `omitBy(object, predicate)`

Creates an object composed of the own and inherited enumerable string keyed properties of object that predicate doesn't return truthy for.

```typescript
omitBy({ a: 1, b: 2, c: 3 }, v => v === 2)  // => { a: 1, c: 3 }
```

#### `pick(object, paths)`

Creates an object composed of the picked object properties.

```typescript
pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])  // => { a: 1, c: 3 }
```

#### `pickBy(object, predicate)`

Creates an object composed of the own and inherited enumerable string keyed properties of object that predicate returns truthy for.

```typescript
pickBy({ a: 1, b: 2, c: 3 }, v => v > 1)  // => { b: 2, c: 3 }
```

#### `set(object, path, value)`

Sets the value at path of object.

```typescript
const obj = {}
set(obj, 'a.b.c', 42)
// => { a: { b: { c: 42 } } }
```

> **Security Note:** `set()` includes built-in protection against prototype pollution by rejecting paths containing `__proto__`, `constructor`, or `prototype`.

#### `setImmutable(object, path, value)`

Returns a new object with the value set at path, without mutating the original.

```typescript
const original = { a: { b: { c: 1 } }, d: 2 }
const updated = setImmutable(original, 'a.b.c', 99)
// original => { a: { b: { c: 1 } }, d: 2 }
// updated  => { a: { b: { c: 99 } }, d: 2 }
```

### String

#### `camelCase(string)`

Converts string to camel case.

```typescript
camelCase('foo Bar')     // => 'fooBar'
camelCase('--foo-bar--') // => 'fooBar'
camelCase('__FOO_BAR__') // => 'fooBar'
```

#### `capitalize(string)`

Capitalizes the first character of string.

```typescript
capitalize('fred')  // => 'Fred'
capitalize('FRED')  // => 'FRED'
```

#### `kebabCase(string)`

Converts string to kebab case.

```typescript
kebabCase('foo Bar')  // => 'foo-bar'
kebabCase('fooBar')   // => 'foo-bar'
kebabCase('__FOO_BAR__')  // => 'foo-bar'
```

#### `snakeCase(string)`

Converts string to snake case.

```typescript
snakeCase('foo Bar')  // => 'foo_bar'
snakeCase('fooBar')   // => 'foo_bar'
snakeCase('--foo-bar--')  // => 'foo_bar'
```

#### `startCase(string)`

Converts string to start case.

```typescript
startCase('--foo-bar--')  // => 'Foo Bar'
startCase('fooBar')       // => 'Foo Bar'
```

#### `truncate(string, options?)`

Truncates string if it's longer than the given maximum length.

```typescript
truncate('hi-diddly-ho there, neighborino')
// => 'hi-diddly-ho there, neighbo...'

truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' })
// => 'hi-diddly-ho there,...'
```

#### `upperFirst(string)`

Capitalizes the first character of string.

```typescript
upperFirst('fred')  // => 'Fred'
upperFirst('FRED')  // => 'FRED'
```

### Function

#### `debounce(func, wait)`

Creates a debounced function that delays invoking func until after wait milliseconds have elapsed.

```typescript
const save = debounce(() => saveToServer(), 300)
// save() will only invoke saveToServer 300ms after the last call
```

#### `once(func)`

Creates a function that is restricted to invoking func once.

```typescript
const initialize = once(() => setupDatabase())
initialize() // runs setupDatabase
initialize() // does nothing
```

#### `throttle(func, wait)`

Creates a throttled function that only invokes func at most once per every wait milliseconds.

```typescript
const scrollHandler = throttle(() => updatePosition(), 100)
window.addEventListener('scroll', scrollHandler)
```

### Lang

#### `clamp(number, lower, upper)`

Clamps number within the inclusive lower and upper bounds.

```typescript
clamp(-10, -5, 5)   // => -5
clamp(10, -5, 5)    // => 5
clamp(0, -5, 5)     // => 0
```

#### `isEmpty(value)`

Checks if value is an empty object, collection, map, or set.

```typescript
isEmpty([])           // => true
isEmpty({})           // => true
isEmpty('')           // => true
isEmpty(null)         // => true
isEmpty([1, 2, 3])    // => false
isEmpty({ a: 1 })     // => false
```

#### `isEqual(value, other)`

Performs a deep comparison between two values.

```typescript
isEqual({ a: 1 }, { a: 1 })  // => true
isEqual([1, 2], [1, 2])      // => true
isEqual({ a: { b: 2 } }, { a: { b: 2 } })  // => true
```

#### `isPlainObject(value)`

Checks if value is a plain object (created by object literals or `Object.create(null)`).

```typescript
isPlainObject({})                     // => true
isPlainObject(Object.create(null))    // => true
isPlainObject(new Date())             // => false
isPlainObject([1, 2, 3])              // => false
```

## ⚡ Performance

js-ultimate is optimized for raw throughput. Real benchmark results:

| Operation | ops/sec | ± |
|-----------|--------:|--:|
| `isEmpty({})` | 23,563,596 | ±0.24% |
| `isEmpty([1,2,3])` | 25,293,114 | ±0.27% |
| `compact(mixed)` | 19,045,362 | ±1.15% |
| `throttle(fn, 100)` | 14,256,840 | ±1.31% |
| `get(obj, 'a.b.c.d')` | 12,639,369 | ±0.93% |
| `flattenDeep(nested)` | 8,074,948 | ±0.77% |
| `setImmutable(obj, 'a.b.c', 99)` | 7,838,450 | ±0.88% |
| `set(obj, 'a.b.c', 1)` | 7,700,309 | ±0.71% |
| `isEqual(nested)` | 6,802,542 | ±0.84% |
| `mergeDeep(2 objects)` | 5,097,969 | ±0.79% |
| `cloneDeep(nested)` | 2,800,180 | ±0.74% |
| `kebabCase('fooBar')` | 2,284,691 | ±0.73% |
| `chunk(1000, 10)` | 543,365 | ±2.30% |
| `groupBy(1000, prop)` | 64,507 | ±4.69% |

Run benchmarks yourself:

```bash
yarn bench
```

*Measured with [tinybench](https://github.com/tinylibs/tinybench). Results vary by hardware and runtime.*

## 🌲 Tree Shaking

js-ultimate is fully tree-shakable. Import only what you need and your bundler will eliminate the rest.

```typescript
// Bundle only includes chunk and uniq
import { chunk, uniq } from 'js-ultimate'

// Same as above — tree-shaking works with named exports
import { chunk } from 'js-ultimate/dist/array/chunk.js'
import { uniq } from 'js-ultimate/dist/array/uniq.js'
```

```json
// package.json
{
  "sideEffects": false
}
```

## 🧠 TypeScript Support

Built with TypeScript from the ground up. Full type definitions included.

```typescript
import { get, type GetType, type Paths } from 'js-ultimate'

interface User {
  profile: {
    name: string
    email: string
  }
}

const user: User = { profile: { name: 'Alice', email: 'alice@example.com' } }

// Type-safe paths
const name = get(user, 'profile.name')  // Type is string

// Utility types for working with paths
type ProfileKeys = Paths<User>  // 'profile' | 'profile.name' | 'profile.email'
type NameType = GetType<User, 'profile.name'>  // string
```

## 📊 Bundle Size

| Variant | Size (gzipped) |
|---------|----------------|
| Full build (all 40+ functions) | ~3.5 KB |
| Single function import | ~150-300 B each |

Importing individual functions results in minimal bundle impact — typically 150-300 bytes per function after gzip.

## 🛣 Roadmap

- [ ] Additional collection utilities (flatMap, sample, shuffle)
- [ ] Math utilities (round, ceil, floor with precision)
- [ ] Number utilities (random in range, clamps)
- [ ] Date utilities (format, difference)
- [ ] Promise utilities (delay, retry)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create a branch** for your feature or bugfix
3. **Write tests** for your changes using Vitest
4. **Ensure all tests pass** with `yarn test`
5. **Format code** with `yarn format`
6. **Submit a pull request** with a clear description of changes

### Development

```bash
# Install dependencies
yarn install

# Run tests in watch mode
yarn test

# Run tests once
yarn test --run

# Run benchmarks
yarn bench

# Build the project
yarn build

# Format code
yarn format
```

## 📄 License

MIT © [hoatepdev](https://github.com/hoatepdev)

---

Made with ❤️ for modern JavaScript applications
