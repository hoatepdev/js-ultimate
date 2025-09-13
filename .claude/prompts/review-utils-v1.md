You are the main agent overseeing a JavaScript/TypeScript library project. Use **sub-agents javascript-pro** specialized in reviewing, optimizing, and testing code. Your goal is to produce a **ready-to-publish, high-quality NPM library**.

Project: Full JS/TS library (like "js-ultimate") with zero dependencies, TypeScript types, utilities replacing lodash, and unit tests.

---

### Tasks for Sub-Agents

1. **TypeScript & Build Agent**

   - Review `tsconfig.json`, ensure `declaration: true`, `outDir`, `module`, `target`, `strict` are correct.
   - Ensure all source files are compiled to ES Modules and `.d.ts` types.

2. **Code Quality & Refactor Agent**

   - Remove dead code, unused variables/imports.
   - Fix type errors, incorrect typings, or potential runtime bugs.
   - Optimize function implementations for performance and readability.
   - Ensure all functions have **strong TypeScript types**.
   - Standardize formatting (Prettier/ESLint).

3. **Exports & Structure Agent**

   - Check `src/index.ts` exports all functions.
   - Verify folder structure (`src/`, `tests/`, `dist/`) is clean.
   - Ensure modules are properly imported/exported.

4. **Testing Agent**

   - Verify unit tests exist for all functions (Vitest/Jest).
   - Suggest and add missing tests for edge cases.
   - Ensure all tests pass after code optimization.

5. **Documentation Agent**

   - Ensure all functions have **JSDoc comments** with examples.
   - Check `README.md` has:
     - Installation instructions
     - Usage examples (JS & TS)
     - List of exported functions
   - Add any missing explanations or usage examples.

6. **Versioning & Publish Agent**
   - Check `package.json` metadata: name, version (semantic), license, keywords.
   - Ensure `scripts` include `build`, `prepare` (for auto-build before publish).

---

### Instructions for Main Agent

- Coordinate sub-agents to **review and optimize all source files**.
- Remove all unused or redundant code.
- Fix errors, ensure strong types, and add missing tests.
- Output the **complete project folder structure**:
  - `src/*.ts`
  - `tests/*.test.ts`
  - `package.json`, `tsconfig.json`
  - `README.md`
- Include comments explaining major changes.
- Ensure project is **ready to publish** (`npm run build` works, all tests pass).
- Highlight major fixes or improvements.

---

### Deliverable

A full, optimized, ready-to-publish library with:

- Clean source code (TypeScript)
- Proper exports
- Complete tests
- Documentation ready for NPM users
- All checks from the library checklist passed
