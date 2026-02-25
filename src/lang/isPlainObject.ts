import { isPlainObjectCheck } from '../_internal/typeChecks.js'

/**
 * Checks if a value is a plain object (created by the Object constructor, Object.create(null), or {}).
 *
 * @param value - The value to check
 * @returns Returns true if value is a plain object, else false
 *
 * @example
 * isPlainObject({})
 * // => true
 *
 * @example
 * isPlainObject(Object.create(null))
 * // => true
 *
 * @example
 * isPlainObject(new Date())
 * // => false
 *
 * @example
 * isPlainObject([1, 2, 3])
 * // => false
 */
export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  return isPlainObjectCheck(value)
}
