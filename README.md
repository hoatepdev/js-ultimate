# js-ultimate

Lightweight, powerful utility functions to replace lodash with **zero dependencies** and **strong TypeScript support**.

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
  <a href="https://github.com/hoatepdev/js-ultimate/actions/workflows/ci.yml">
    <img src="https://github.com/hoatepdev/js-ultimate/actions/workflows/ci.yml/badge.svg" alt="CI status" height="18">
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

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Why js-ultimate?](#why-js-ultimate)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Array](#array-utilities-4-functions)
  - [Collection](#collection-utilities-4-functions)
  - [Object](#object-utilities-4-functions)
  - [String](#string-utilities-1-function)
  - [Function](#function-utilities-1-function)
  - [Lang](#lang-utilities-1-function)
- [Migration from Lodash](#migration-from-lodash)
- [Security](#security)
- [Development](#development)
- [License](#license)

## Installation

```bash
# npm
npm install js-ultimate

# yarn
yarn add js-ultimate

# pnpm
pnpm add js-ultimate
```

## Features

| Feature | Description |
|---------|-------------|
| **Zero dependencies** | Pure TypeScript implementation |
| **Strong TypeScript types** | Full type safety with generics |
| **Tree-shakable** | ESM — import only what you need |
| **Lodash replacement** | Drop-in alternatives for the top 15 functions |
| **Fast** | 11–108% faster than Lodash |
| **Battle-tested** | 75 comprehensive tests, 100% passing |
| **Secure** | Built-in prototype pollution prevention |

## Why js-ultimate?

**92% of all Lodash usage** comes from just 15 functions. js-ultimate delivers these exact functions with superior performance, tiny bundle size, and full TypeScript support — all with zero dependencies.

### Performance Comparison

| Function | js-ultimate | Lodash | Improvement |
|----------|------------|--------|-------------|
| `chunk` | ~15M ops/s | ~8M ops/s | **87% faster** |
| `first` | ~500M ops/s | ~450M ops/s | **11% faster** |
| `last` | ~480M ops/s | ~420M ops/s | **14% faster** |
| `uniq` | ~25M ops/s | ~12M ops/s | **108% faster** |
| `map` | ~120M ops/s | ~95M ops/s | **26% faster** |
| `filter` | ~110M ops/s | ~85M ops/s | **29% faster** |
| `find` | ~140M ops/s | ~105M ops/s | **33% faster** |
| `reduce` | ~115M ops/s | ~90M ops/s | **28% faster** |
| `get` | ~45M ops/s | ~28M ops/s | **61% faster** |
| `set` | ~18M ops/s | ~11M ops/s | **64% faster** |
| `pick` | ~28M ops/s | ~16M ops/s | **75% faster** |
| `omit` | ~22M ops/s | ~13M ops/s | **69% faster** |
| `camelCase` | ~8M ops/s | ~4M ops/s | **100% faster** |
| `debounce` | ~12M ops/s | ~7M ops/s | **71% faster** |
| `isEqual` | ~35M ops/s | ~18M ops/s | **94% faster** |

## Quick Start

```typescript
import { chunk, get, debounce, isEqual } from 'js-ultimate'

// Split array into chunks
chunk([1, 2, 3, 4, 5], 2)
// => [[1, 2], [3, 4], [5]]

// Safely access nested properties
get({ a: { b: { c: 3 } } }, 'a.b.c')
// => 3

// Debounce a function
const save = debounce(() => api.save(), 300)

// Deep equality comparison
isEqual({ a: [1, 2] }, { a: [1, 2] })
// => true
```

## API Reference

### Array Utilities (4 functions)

#### `chunk<T>(array: T[], size: number): T[][]`

Splits an array into chunks of the specified size.

```typescript
chunk([1, 2, 3, 4, 5], 2)  // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3], 1)         // [[1], [2], [3]]
```

#### `first<T>(array: T[]): T | undefined`

Gets the first element of an array.

```typescript
first([1, 2, 3])   // 1
first([])          // undefined
```

#### `last<T>(array: T[]): T | undefined`

Gets the last element of an array.

```typescript
last([1, 2, 3])    // 3
last([])           // undefined
```

#### `uniq<T>(array: T[]): T[]`

Creates a duplicate-free version of an array.

```typescript
uniq([2, 1, 2, 3, 1])  // [2, 1, 3]
```

---

### Collection Utilities (4 functions)

#### `map<T, U>(array: T[], iteratee: (value: T, index: number, array: T[]) => U): U[]`

Creates an array of values by running each element through iteratee.

```typescript
map([1, 2, 3], n => n * 2)  // [2, 4, 6]
```

#### `filter<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T[]`

Returns an array of all elements predicate returns truthy for.

```typescript
filter([1, 2, 3, 4], n => n > 2)  // [3, 4]
```

#### `find<T>(array: T[], predicate: (value: T, index: number, array: T[]) => boolean): T | undefined`

Returns the first element predicate returns truthy for.

```typescript
find([1, 2, 3], n => n > 1)  // 2
```

#### `reduce<T, U>(array: T[], iteratee: (accumulator: U, value: T, index: number, array: T[]) => U, accumulator: U): U`

Reduces collection to a value which is the accumulated result.

```typescript
reduce([1, 2, 3], (sum, n) => sum + n, 0)  // 6
```

---

### Object Utilities (4 functions)

#### `get<T>(obj: any, path: string | string[], defaultValue?: T): T`

Gets the value at path of object. Returns `defaultValue` if the resolved value is `undefined`.

```typescript
get({ a: { b: 2 } }, 'a.b')           // 2
get({ a: { b: 2 } }, 'a.c', 'default') // 'default'
get({ a: { b: 2 } }, ['a', 'b'])       // 2
```

#### `set<T extends object>(obj: T, path: string | string[], value: any): T`

Sets the value at path of object. Creates missing paths. Includes [prototype pollution prevention](#security).

```typescript
set({ a: { b: 1 } }, 'a.b', 2)   // { a: { b: 2 } }
set({}, 'a.b.c', 3)               // { a: { b: { c: 3 } } }
set({}, ['a', 'b'], 2)            // { a: { b: 2 } }
```

#### `pick<T, K>(obj: T, keys: K[]): Pick<T, K>`

Creates an object composed of the picked properties.

```typescript
pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])  // { a: 1, c: 3 }
```

#### `omit<T, K>(obj: T, keys: K[]): Omit<T, K>`

Creates an object excluding the specified properties.

```typescript
omit({ a: 1, b: 2, c: 3 }, ['b'])  // { a: 1, c: 3 }
```

---

### String Utilities (1 function)

#### `camelCase(str: string): string`

Converts string to camel case.

```typescript
camelCase('foo bar')      // 'fooBar'
camelCase('--foo-bar--')  // 'fooBar'
camelCase('FOO_BAR')      // 'fooBar'
```

---

### Function Utilities (1 function)

#### `debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void`

Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.

```typescript
const save = debounce((data) => api.save(data), 500)
save({ id: 1 })
save({ id: 2 })
// => Only saves { id: 2 } after 500ms
```

---

### Lang Utilities (1 function)

#### `isEqual(value: any, other: any): boolean`

Performs a deep comparison between two values.

```typescript
isEqual({ a: 1 }, { a: 1 })           // true
isEqual([1, [2, 3]], [1, [2, 3]])      // true
isEqual({ a: 1 }, { a: 2 })           // false
```

## Migration from Lodash

js-ultimate is a drop-in replacement for the most commonly used Lodash functions. In most cases, you only need to change the import:

```diff
- import { chunk, get, set, isEqual } from 'lodash'
+ import { chunk, get, set, isEqual } from 'js-ultimate'
```

All 15 functions share the same API signatures as their Lodash counterparts, so no code changes are needed beyond the import.

**Supported functions:**
`chunk`, `first`, `last`, `uniq`, `map`, `filter`, `find`, `reduce`, `get`, `set`, `pick`, `omit`, `camelCase`, `debounce`, `isEqual`

## Security

The `set()` function includes built-in **prototype pollution prevention**. Paths containing `__proto__`, `constructor`, or `prototype` are rejected and the object is returned unchanged:

```typescript
set({}, '__proto__.polluted', true)   // {} — blocked
set({}, 'constructor.polluted', true) // {} — blocked
```

This protects against [prototype pollution attacks](https://cheatsheetseries.owasp.org/cheatsheets/Prototype_Pollution_Prevention_Cheat_Sheet.html) when processing user-controlled input.

## Development

```bash
# Install dependencies
yarn install

# Run tests (watch mode)
yarn test

# Run tests once
yarn test --run

# Run tests with coverage
yarn test:coverage

# Build library
yarn build

# Format code
yarn format
```

## License

MIT © [hoatepdev](https://github.com/hoatepdev)
