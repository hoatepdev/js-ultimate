/**
 * Creates a deep clone of a value. Handles primitives, Date, RegExp, Map, Set,
 * arrays, and plain objects. Detects circular references to prevent infinite loops.
 *
 * @param value - The value to deep clone
 * @returns Returns the deep cloned value
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } }
 * const cloned = cloneDeep(obj)
 * cloned.b.c = 99
 * obj.b.c // => 2
 *
 * @example
 * cloneDeep(new Date('2024-01-01'))
 * // => new Date('2024-01-01') (different reference)
 *
 * @example
 * cloneDeep(new Map([['key', { nested: true }]]))
 * // => new Map with deep cloned entries
 */
export function cloneDeep<T>(value: T, seen?: WeakSet<object>): T {
  if (value === null || typeof value !== 'object') return value

  if (!seen) seen = new WeakSet<object>()

  if (seen.has(value as object)) return value as T
  seen.add(value as object)

  if (value instanceof Date) return new Date(value.getTime()) as T

  if (value instanceof RegExp) return new RegExp(value.source, value.flags) as T

  if (value instanceof Map) {
    const result = new Map()
    value.forEach((v, k) => result.set(cloneDeep(k, seen), cloneDeep(v, seen)))
    return result as T
  }

  if (value instanceof Set) {
    const result = new Set()
    value.forEach(v => result.add(cloneDeep(v, seen)))
    return result as T
  }

  if (Array.isArray(value)) {
    return value.map(item => cloneDeep(item, seen)) as T
  }

  const result: Record<string, unknown> = {}
  for (const key of Object.keys(value)) {
    result[key] = cloneDeep((value as Record<string, unknown>)[key], seen)
  }
  return result as T
}
