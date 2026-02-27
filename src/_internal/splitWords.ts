/**
 * Internal utility to split a string into words.
 * Handles camelCase, PascalCase, snake_case, kebab-case, and spaces.
 *
 * @param str - The string to split
 * @returns Array of words in lowercase
 *
 * @example
 * splitWords('fooBar')
 * // => ['foo', 'bar']
 *
 * @example
 * splitWords('foo_bar')
 * // => ['foo', 'bar']
 *
 * @example
 * splitWords('foo-bar')
 * // => ['foo', 'bar']
 */
export function splitWords(str: string): string[] {
  // Process in order:
  // 1. Replace separators with spaces
  // 2. Split camelCase/PascalCase
  // 3. Lowercase everything
  // 4. Split by spaces and filter empty
  const processed = str
    .replace(/[_-\s]+/g, ' ')
    .replace(/([^A-Z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .toLowerCase()
    .trim()

  return processed.split(/\s+/).filter(word => word.length > 0)
}
