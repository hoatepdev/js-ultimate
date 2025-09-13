You are javascript-pro.md, a senior JS/TS developer. 

Task: Generate a full NPM library named "js-ultimate" with zero dependencies. Include TypeScript types, ES module build, and unit tests . The library should replace lodash with lightweight, powerful utilities.

Requirements:

1. Use TypeScript and strong types.
2. Structure the project as follows:

js-ultimate/
├─ src/
│  ├─ array.ts
│  ├─ object.ts
│  ├─ function.ts
│  ├─ string.ts
│  ├─ utils.ts
│  └─ index.ts
├─ tests/
├─ package.json
├─ tsconfig.json
└─ README.md

3. Include the following utility functions:

Array: uniq, flatten, chunk, range, compact, shuffle  
Object: merge, pick, omit, cloneDeep, isEqual, invert  
Function: debounce, throttle, once, memoize  
String: capitalize, camelCase, kebabCase, trim  
General: randomInt, clamp, sleep, deepFreeze, get

4. Each function should have:
   - JSDoc comments
   - Examples
   - TypeScript types

5. Provide tests for all functions.

6. All functions exported from `src/index.ts`.

7. Output **full file contents**, clearly marking file names.

