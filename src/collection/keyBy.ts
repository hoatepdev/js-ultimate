/**
 * Creates an object composed of keys generated from the results of running each element
 * through iteratee. The corresponding value of each key is the last element responsible
 * for generating the key.
 *
 * @param array - The array to iterate over
 * @param iteratee - The function invoked per element, or a property name to key by
 * @returns Returns the composed aggregate object
 *
 * @example
 * keyBy([{ id: 'a1', name: 'Alice' }, { id: 'b2', name: 'Bob' }], 'id')
 * // => { a1: { id: 'a1', name: 'Alice' }, b2: { id: 'b2', name: 'Bob' } }
 *
 * @example
 * keyBy([1.2, 2.4, 3.6], Math.floor)
 * // => { '1': 1.2, '2': 2.4, '3': 3.6 }
 */
export function keyBy<T>(
  array: T[],
  iteratee: ((value: T) => string | number) | keyof T
): Record<string, T> {
  const result: Record<string, T> = Object.create(null) as Record<string, T>
  const fn =
    typeof iteratee === 'function'
      ? iteratee
      : (item: T) => String(item[iteratee])

  for (const item of array) {
    result[String(fn(item))] = item
  }

  return result
}
