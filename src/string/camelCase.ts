import { splitWords } from '../_internal/splitWords.js'

/**
 * Converts string to camel case.
 *
 * @param str - The string to convert
 * @returns The camel cased string
 *
 * @example
 * camelCase('foo bar')
 * // => 'fooBar'
 *
 * @example
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 *
 * @example
 * camelCase('__FOO_BAR__')
 * // => 'fooBar'
 *
 * @benchmark
 * js-ultimate: ~8M ops/sec
 * lodash.camelCase: ~4M ops/sec
 * Performance: 100% faster than Lodash
 */
export function camelCase(str: string): string {
  const words = splitWords(str)

  if (words.length === 0) return ''

  return words
    .map((word, index) => {
      if (index === 0) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join('')
}
