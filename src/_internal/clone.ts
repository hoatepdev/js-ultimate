/**
 * Shallow clone an object or array, preserving type.
 */
export function shallowClone<T>(value: T): T {
  if (Array.isArray(value)) return [...value] as T
  if (value !== null && typeof value === 'object') {
    return { ...value }
  }
  return value
}
