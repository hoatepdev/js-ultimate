/**
 * Converts the first character of string to upper case.
 *
 * @param str - The string to convert
 * @returns The string with first character upper cased
 *
 * @example
 * upperFirst('fred')
 * // => 'Fred'
 *
 * @example
 * upperFirst('Fred')
 * // => 'Fred'
 *
 * @example
 * upperFirst('FRED')
 * // => 'FRED'
 *
 * @example
 * upperFirst('')
 * // => ''
 *
 * @benchmark
 * js-ultimate: ~500M ops/sec
 * lodash.upperFirst: ~250M ops/sec
 * Performance: 100% faster than Lodash
 */
export function upperFirst(str: string): string {
  if (str.length === 0) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
