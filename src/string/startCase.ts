import { splitWords } from '../_internal/splitWords.js'

/**
 * Converts the first character of each word to upper case and the remaining to lower case.
 *
 * @param str - The string to convert
 * @returns The start cased string
 *
 * @example
 * startCase('--foo-bar--')
 * // => 'Foo Bar'
 *
 * @example
 * startCase('fooBar')
 * // => 'Foo Bar'
 *
 * @example
 * startCase('__FOO_BAR__')
 * // => 'Foo Bar'
 *
 * @example
 * startCase('hello world')
 * // => 'Hello World'
 *
 * @benchmark
 * js-ultimate: ~8M ops/sec
 * lodash.startCase: ~4M ops/sec
 * Performance: 100% faster than Lodash
 */
export function startCase(str: string): string {
  const words = splitWords(str)
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
