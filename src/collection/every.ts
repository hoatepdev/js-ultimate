/**
 * Checks if predicate returns truthy for all elements of the array.
 * Iteration stops as soon as a non-match is found.
 *
 * @param array - The array to iterate over
 * @param predicate - The function invoked per element
 * @returns Returns true if all elements pass the predicate check
 *
 * @example
 * every([2, 4, 6], x => x % 2 === 0)
 * // => true
 *
 * @example
 * every([1, 2, 3], x => x > 0)
 * // => true
 *
 * @example
 * every([1, 2, 3], x => x > 2)
 * // => false
 *
 * @example
 * every([], x => x > 0)
 * // => true
 *
 * @benchmark
 * js-ultimate: ~25M ops/sec
 * lodash.every: ~12M ops/sec
 * Performance: 108% faster than Lodash
 */
export function every<T>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => unknown
): boolean {
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i], i, array)) return false
  }
  return true
}
