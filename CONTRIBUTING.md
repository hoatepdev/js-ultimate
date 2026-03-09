# Contributing to js-ultimate

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally

```bash
git clone https://github.com/<your-username>/js-ultimate.git
cd js-ultimate
```

3. **Install** dependencies

```bash
yarn install
```

4. **Create a branch** for your work

```bash
git checkout -b feat/my-feature
```

## Development Workflow

### Project Structure

```
src/
  array/         # Array utilities (chunk, uniq, compact, etc.)
  collection/    # Collection utilities (map, filter, groupBy, etc.)
  object/        # Object utilities (get, set, pick, omit, etc.)
  string/        # String utilities (camelCase, kebabCase, etc.)
  function/      # Function utilities (debounce, throttle, once)
  lang/          # Type checks and comparisons (isEqual, isEmpty, etc.)
  _internal/     # Shared internal helpers (not exported)
  index.ts       # Public API — re-exports all functions
tests/           # Mirrors src/ structure
bench/           # Benchmark suite
```

### Commands

```bash
yarn test             # Run tests in watch mode
yarn test --run       # Run all tests once
yarn test:coverage    # Run tests with coverage report
yarn build            # Compile to dist/
yarn format           # Format code with Prettier
yarn format:check     # Check formatting
yarn bench            # Run benchmark suite
```

### Run a single test file

```bash
yarn vitest run tests/array/chunk.test.ts
```

## Adding a New Function

1. **Create the source file** in the appropriate category folder:

```
src/array/myFunction.ts
```

2. **Follow the code style**:
   - No semicolons, single quotes, 2-space indent
   - Arrow parens: avoid when possible (`x => x`)
   - ESM imports with `.js` extensions in import paths
   - Add JSDoc with `@param`, `@returns`, `@example`, and `@benchmark` tags

3. **Export from `src/index.ts`**:

```typescript
export { myFunction } from './array/myFunction.js'
```

4. **Write tests** in `tests/array/myFunction.test.ts`:
   - Vitest globals are enabled — no need to import `describe`, `it`, `expect`
   - Cover edge cases: empty inputs, invalid types, boundary values

5. **Run tests and format**:

```bash
yarn test --run
yarn format
```

## Code Style

This project uses Prettier with the following config:

- No semicolons
- Single quotes
- 2-space indent
- No trailing commas
- Arrow parens: avoid

Husky runs lint-staged on commit automatically — it formats changed `.ts` files and runs related tests.

## Security

If your function handles object paths or dynamic property access, you **must** include prototype pollution prevention. Reject paths containing `__proto__`, `constructor`, or `prototype`. See `src/object/set.ts` for reference.

## Commit Messages

Use conventional commit prefixes:

- `feat:` — new function or feature
- `fix:` — bug fix
- `refactor:` — code restructuring without behavior change
- `chore:` — tooling, config, dependency updates
- `docs:` — documentation changes
- `test:` — adding or updating tests

Examples:

```
feat: add shuffle() array utility
fix: handle empty string edge case in camelCase
docs: update API section in README
```

## Pull Request Guidelines

1. **Keep PRs focused** — one function or one fix per PR
2. **Include tests** — PRs without tests will not be merged
3. **Update `src/index.ts`** if adding a new function
4. **Ensure CI passes** — tests, formatting, type checking, and bundle size check
5. **Write a clear PR description** explaining what and why

## Reporting Issues

- Use [GitHub Issues](https://github.com/hoatepdev/js-ultimate/issues)
- Include a minimal reproduction example
- Specify your Node.js version and runtime environment

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
