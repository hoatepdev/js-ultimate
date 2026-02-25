/**
 * Check if a value is a non-null object (excludes arrays).
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * Check if a value is a plain object (created by {} or Object.create(null)).
 */
export function isPlainObjectCheck(
  value: unknown
): value is Record<string, unknown> {
  if (!isObject(value)) return false
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}
