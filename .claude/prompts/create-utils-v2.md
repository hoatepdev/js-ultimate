You are javascript-pro, a senior JavaScript/TypeScript developer.

Task: Generate a full NPM library named "js-ultimate" with **Yarn** as the package manager. The library should provide lightweight, powerful utility functions to replace lodash, with **strong TypeScript types** and **zero dependencies**, including unit tests using Vitest.

Requirements:

1. **Project Setup with Yarn**

   - Initialize with `yarn init -y`
   - Include `package.json` configured for Yarn
   - Scripts:
     - `build`: build TypeScript (`tsc`)
     - `test`: run Vitest
     - `prepare`: build before publish

2. **Language & Build**

   - TypeScript
   - ES Modules output
   - Generate `.d.ts` types
   - `tsconfig.json` ready for build

3. **Project Structure**
   js-ultimate/
   ├─ src/
   │ ├─ array.ts
   │ ├─ object.ts
   │ ├─ function.ts
   │ ├─ string.ts
   │ ├─ utils.ts
   │ └─ index.ts
   ├─ tests/
   │ ├─ array.test.ts
   │ ├─ object.test.ts
   │ ├─ function.test.ts
   │ └─ utils.test.ts
   ├─ package.json
   ├─ tsconfig.json
   └─ README.md

markdown
Copy code

4. **Functions to Implement**

- **Array utils:** `uniq`, `flatten`, `chunk`, `range`, `compact`, `shuffle`
- **Object utils:** `merge`, `pick`, `omit`, `cloneDeep`, `isEqual`, `invert`
- **Function utils:** `debounce`, `throttle`, `once`, `memoize`
- **String utils:** `capitalize`, `camelCase`, `kebabCase`, `trim`
- **General utils:** `randomInt`, `clamp`, `sleep`, `deepFreeze`, `get`

5. **Requirements for Each Function**

   - Strong TypeScript types
   - JSDoc comments
   - Examples of usage
   - Clean, readable code
   - No external dependencies

6. **Unit Tests**

   - Use Vitest
   - Cover typical and edge cases

7. **Exports**

   - Export all functions from `src/index.ts`

8. **README**

   - Installation instructions (`yarn add js-ultimate`)
   - Usage examples

9. **Output**
   - Generate **all code in one response**
   - Clearly mark file names and folder structure
   - Ready to copy and run `yarn build` / `yarn test`

Goal: The user should be able to copy all files, run `yarn install`, `yarn build`, `yarn test`, and have a fully working, type-safe utility library ready to publish on NPM.
