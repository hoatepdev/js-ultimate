/**
 * Checks if a value is empty. A value is considered empty if it's null, undefined,
 * a boolean, a number, an empty string, an empty array, an empty Map/Set,
 * or an object with no own enumerable properties.
 *
 * @param value - The value to check
 * @returns Returns true if the value is empty, else false
 *
 * @example
 * isEmpty(null)
 * // => true
 *
 * @example
 * isEmpty([])
 * // => true
 *
 * @example
 * isEmpty({})
 * // => true
 *
 * @example
 * isEmpty([1, 2, 3])
 * // => false
 *
 * @example
 * isEmpty('hello')
 * // => false
 */
export function isEmpty(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'boolean' || typeof value === 'number') return true
  if (typeof value === 'string') return value.length === 0
  if (Array.isArray(value)) return value.length === 0
  if (value instanceof Map || value instanceof Set) return value.size === 0
  return Object.keys(value as object).length === 0
}
