import { parsePath, hasDangerousKey } from '../_internal/path.js'
import type { Paths } from '../_internal/types.js'

/**
 * Sets the value at path of object without mutating the original.
 * Returns a new object with structural sharing — only the path spine is cloned,
 * sibling branches keep their original references.
 *
 * Provides type-safe overloads:
 * - When a typed object and valid path are provided, the path is validated at compile time.
 * - Falls back to a loose signature for dynamic paths.
 *
 * @param obj - The source object (not mutated)
 * @param path - The path of the property to set (string or array)
 * @param value - The value to set
 * @returns A new object with the value set at the given path
 *
 * @example
 * const obj = { a: { b: 1, c: 2 }, x: 3 }
 * const result = setImmutable(obj, 'a.b', 99)
 * // result => { a: { b: 99, c: 2 }, x: 3 }
 * // obj.a.b => 1 (unchanged)
 * // result.x === obj.x (structural sharing)
 *
 * @example
 * setImmutable({}, 'a.b.c', 1)
 * // => { a: { b: { c: 1 } } }
 */
export function setImmutable<
  T extends Record<string, any>,
  P extends Paths<T> & string
>(obj: T, path: P, value: unknown): T
export function setImmutable<T extends object>(
  obj: T,
  path: string | string[],
  value: unknown
): T
export function setImmutable(
  obj: any,
  path: string | string[],
  value: unknown
): any {
  const keys = parsePath(path)

  if (hasDangerousKey(keys)) return obj

  return setAtDepth(obj, keys, 0, value)
}

function setAtDepth(
  current: unknown,
  keys: string[],
  index: number,
  value: unknown
): unknown {
  if (index === keys.length) return value

  const key = keys[index]
  const currentObj = (
    typeof current === 'object' && current !== null ? current : {}
  ) as Record<string, unknown>

  const clone = { ...currentObj }
  clone[key] = setAtDepth(currentObj[key], keys, index + 1, value)
  return clone
}
