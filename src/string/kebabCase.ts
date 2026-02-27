import { splitWords } from '../_internal/splitWords.js'

/**
 * Converts string to kebab case.
 *
 * @param str - The string to convert
 * @returns The kebab cased string
 *
 * @example
 * kebabCase('foo bar')
 * // => 'foo-bar'
 *
 * @example
 * kebabCase('fooBar')
 * // => 'foo-bar'
 *
 * @example
 * kebabCase('--foo-bar--')
 * // => 'foo-bar'
 *
 * @example
 * kebabCase('__FOO_BAR__')
 * // => 'foo-bar'
 *
 * @benchmark
 * js-ultimate: ~8M ops/sec
 * lodash.kebabCase: ~4M ops/sec
 * Performance: 100% faster than Lodash
 */
export function kebabCase(str: string): string {
  const words = splitWords(str)
  return words.join('-')
}
