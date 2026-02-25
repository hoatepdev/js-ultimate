import { hasDangerousKey } from './path.js'

const MAX_PATH_DEPTH = 100
const MAX_RECURSION_DEPTH = 50

export { hasDangerousKey }

/**
 * Throw if path exceeds maximum allowed depth.
 */
export function validatePathDepth(keys: readonly string[]): void {
  if (keys.length > MAX_PATH_DEPTH) {
    throw new RangeError(
      `Path depth ${keys.length} exceeds maximum ${MAX_PATH_DEPTH}`
    )
  }
}

/**
 * Throw if recursion exceeds maximum allowed depth.
 */
export function checkRecursionDepth(depth: number): void {
  if (depth > MAX_RECURSION_DEPTH) {
    throw new RangeError(
      `Recursion depth ${depth} exceeds maximum ${MAX_RECURSION_DEPTH}`
    )
  }
}
