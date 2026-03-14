# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

js-ultimate is a zero-dependency TypeScript utility library designed as a lightweight Lodash replacement. It provides 49 utility functions organized into 6 categories: array, collection, object, string, function, and lang.

## Commands

```bash
yarn build            # Compile TypeScript (tsc) to dist/
yarn test             # Run tests in watch mode (vitest)
yarn test --run       # Run all tests once
yarn test:coverage    # Run tests with coverage report
yarn dev              # Watch mode alias
yarn format           # Format src/ and tests/ with Prettier
yarn format:check     # Check formatting without writing
```

Run a single test file:
```bash
yarn vitest run tests/array/chunk.test.ts
```

## Architecture

All source code lives in `src/`, with one function per file, organized by category:

- `src/array/` - chunk, compact, difference, first, flatten, flattenDeep, intersection, last, range, sortBy, uniq, uniqBy, zip
- `src/collection/` - every, filter, find, flatMap, groupBy, keyBy, map, reduce, some
- `src/object/` - cloneDeep, defaults, get, has, mapValues, mergeDeep, omit, omitBy, pick, pickBy, set, setImmutable
- `src/string/` - camelCase, capitalize, kebabCase, snakeCase, startCase, truncate, upperFirst
- `src/function/` - debounce, memoize, once, throttle
- `src/lang/` - clamp, isEmpty, isEqual, isPlainObject

`src/index.ts` re-exports all 49 functions as the public API.

Tests mirror the source structure in `tests/` (e.g., `src/array/chunk.ts` → `tests/array/chunk.test.ts`). Vitest globals are enabled — no need to import `describe`, `it`, `expect`.

## Code Style

- No semicolons, single quotes, 2-space indent, no trailing commas (Prettier enforced)
- Arrow parens: avoid when possible (`x => x` not `(x) => x`)
- ESM modules (`import`/`export`), `.js` extensions in import paths
- Each function has JSDoc with `@param`, `@returns`, `@example`, and `@benchmark` tags
- TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`

## Security

`set()` in `src/object/set.ts` includes prototype pollution prevention — it rejects paths containing `__proto__`, `constructor`, or `prototype`. This is security-critical and must be preserved.

## Pre-commit

Husky runs lint-staged on commit: formats changed `.ts` files with Prettier and runs related tests via `vitest related --run`.
