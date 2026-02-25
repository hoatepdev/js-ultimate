import { hasDangerousKey } from '../_internal/path.js'
import { isPlainObjectCheck } from '../_internal/typeChecks.js'

const MAX_DEPTH = 50

/**
 * Deeply merges properties of source objects into the target object.
 * Properties that are plain objects are recursively merged.
 * Other values (including arrays) are overwritten by source.
 * Includes prototype pollution prevention and depth limiting.
 *
 * @param target - The target object
 * @param sources - The source objects
 * @returns Returns the merged object (new object, target is not mutated)
 *
 * @example
 * mergeDeep({ a: { b: 1 } }, { a: { c: 2 } })
 * // => { a: { b: 1, c: 2 } }
 *
 * @example
 * mergeDeep({ a: 1 }, { b: 2 }, { c: 3 })
 * // => { a: 1, b: 2, c: 3 }
 *
 * @example
 * mergeDeep({ a: { x: 1 } }, { a: { x: 2, y: 3 } })
 * // => { a: { x: 2, y: 3 } }
 */
export function mergeDeep<T extends object>(
  target: T,
  ...sources: Partial<T>[]
): T {
  return mergeInternal(target, sources, 0)
}

function mergeInternal<T extends object>(
  target: T,
  sources: Partial<T>[],
  depth: number
): T {
  if (depth > MAX_DEPTH) return target

  const result = { ...target }

  for (const source of sources) {
    if (!isPlainObjectCheck(source)) continue

    for (const key of Object.keys(source)) {
      if (hasDangerousKey([key])) continue

      const targetVal = (result as Record<string, unknown>)[key]
      const sourceVal = (source as Record<string, unknown>)[key]

      if (isPlainObjectCheck(targetVal) && isPlainObjectCheck(sourceVal)) {
        ;(result as Record<string, unknown>)[key] = mergeInternal(
          targetVal as object,
          [sourceVal as object],
          depth + 1
        )
      } else {
        ;(result as Record<string, unknown>)[key] = sourceVal
      }
    }
  }

  return result
}
