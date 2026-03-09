# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.4.1](https://github.com/hoatepdev/js-ultimate/compare/v2.4.0...v2.4.1) — 2026-03-04

### Changed

- Rewrite README.md to be more concise, feature-focused, and modern

## [2.4.0](https://github.com/hoatepdev/js-ultimate/compare/v2.3.0...v2.4.0) — 2026-03-04

### Added

- `range(start, end?, step?)` — create arrays of numbers
- `uniqBy(array, iteratee)` — deduplicate by key or function
- `pickBy(object, predicate)` — pick properties by predicate
- `omitBy(object, predicate)` — omit properties by predicate
- `startCase(string)` — convert to Start Case
- `capitalize(string)` — capitalize first character
- `upperFirst(string)` — uppercase first character
- `truncate(string, options?)` — truncate with configurable separator and omission

## [2.3.0](https://github.com/hoatepdev/js-ultimate/compare/v2.2.0...v2.3.0) — 2026-02-28

### Added

- `once(func)` — restrict a function to a single invocation

## [2.2.0](https://github.com/hoatepdev/js-ultimate/compare/v2.1.3...v2.2.0) — 2026-02-28

### Added

- `compact(array)` — remove falsy values from arrays
- `difference(array, values)` — array difference
- `intersection(...arrays)` — array intersection
- `flattenDeep(array)` — recursive flatten
- `kebabCase(string)` — convert to kebab-case
- `snakeCase(string)` — convert to snake_case
- `setImmutable(object, path, value)` — immutable set
- `cloneDeep(value)` — recursive deep clone
- `mergeDeep(target, source)` — recursive deep merge
- `groupBy(collection, iteratee)` — group by key
- `keyBy(collection, iteratee)` — index by key
- `isEmpty(value)` — check for empty values
- `isPlainObject(value)` — plain object check
- `clamp(number, lower, upper)` — clamp number to range
- `throttle(func, wait)` — throttle function invocations
- Benchmark suite with tinybench (`yarn bench`)
- Benchmark CI workflow for pull requests
- Bundle size check CI workflow

## [2.1.3](https://github.com/hoatepdev/js-ultimate/compare/v2.1.0...v2.1.3) — 2025-11-03

### Security

- Enhance prototype pollution prevention in `set()` — rejects `__proto__`, `constructor`, and `prototype` paths

### Changed

- Add Husky and lint-staged for pre-commit hooks
- Update tsconfig.json to include DOM library and Node types
- Remove semicolons for consistent code style

## [2.1.0](https://github.com/hoatepdev/js-ultimate/compare/v2.0.4...v2.1.0) — 2025-11-03

### Changed

- Restructure utility exports and modularize functions into separate files per category (`src/array/`, `src/collection/`, `src/object/`, `src/string/`, `src/function/`, `src/lang/`)

## [2.0.2](https://github.com/hoatepdev/js-ultimate/compare/v2.0.1...v2.0.2) — 2025-11-02

### Changed

- Update module resolution and import paths for ES module compatibility
- Enhance CI/CD setup with detailed workflows
- Switch build system to tsup (ESM + CJS dual output)

### Security

- Add prototype pollution prevention to `mergeDeep()`

## [2.0.1](https://github.com/hoatepdev/js-ultimate/releases/tag/v2.0.1) — 2025-09-13

### Added

- `camelCase(string)` — convert to camelCase
- `debounce(func, wait)` — debounce function calls
- `isEqual(a, b)` — deep equality comparison
- `get(object, path, defaultValue?)` — safe nested property access
- `set(object, path, value)` — safe nested property set
- `pick(object, keys)` — pick properties from object
- `omit(object, keys)` — omit properties from object
- `chunk(array, size)` — split arrays into chunks
- `first(array)` / `last(array)` — array accessors
- `uniq(array)` — remove duplicates
- `map()`, `filter()`, `find()`, `reduce()` — collection utilities
- Full TypeScript support with strict mode
- ESM-first architecture with CJS fallback
- CI/CD with GitHub Actions
- CodeQL security scanning
