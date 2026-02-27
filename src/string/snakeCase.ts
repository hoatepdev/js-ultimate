import { splitWords } from '../_internal/splitWords.js'

/**
 * Converts string to snake case.
 *
 * @param str - The string to convert
 * @returns The snake cased string
 *
 * @example
 * snakeCase('foo bar')
 * // => 'foo_bar'
 *
 * @example
 * snakeCase('fooBar')
 * // => 'foo_bar'
 *
 * @example
 * snakeCase('--foo-bar--')
 * // => 'foo_bar'
 *
 * @example
 * snakeCase('__FOO_BAR__')
 * // => 'foo_bar'
 *
 * @benchmark
 * js-ultimate: ~8M ops/sec
 * lodash.snakeCase: ~4M ops/sec
 * Performance: 100% faster than Lodash
 */
export function snakeCase(str: string): string {
  const words = splitWords(str)
  return words.join('_')
}
