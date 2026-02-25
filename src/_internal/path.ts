const DANGEROUS_KEYS = new Set(['__proto__', 'constructor', 'prototype'])

/**
 * Parse a path into an array of keys.
 * Accepts both string ('a.b.c') and array (['a', 'b', 'c']) notation.
 */
export function parsePath(path: string | readonly string[]): string[] {
  if (Array.isArray(path)) return path as string[]
  return (path as string).split('.')
}

/**
 * Check if any key in the path is a dangerous prototype pollution vector.
 */
export function hasDangerousKey(keys: readonly string[]): boolean {
  return keys.some(k => DANGEROUS_KEYS.has(k))
}
