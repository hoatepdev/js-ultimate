/**
 * Creates an object composed of keys generated from the results of running each element
 * through iteratee. The corresponding value of each key is an array of elements
 * responsible for generating the key.
 *
 * @param array - The array to iterate over
 * @param iteratee - The function invoked per element, or a property name to group by
 * @returns Returns the composed aggregate object
 *
 * @example
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 *
 * @example
 * groupBy(['one', 'two', 'three'], v => v.length)
 * // => { '3': ['one', 'two'], '5': ['three'] }
 *
 * @example
 * groupBy([{ age: 20 }, { age: 30 }, { age: 20 }], 'age')
 * // => { '20': [{ age: 20 }, { age: 20 }], '30': [{ age: 30 }] }
 */
export function groupBy<T>(
  array: T[],
  iteratee: ((value: T) => string | number) | keyof T
): Record<string, T[]> {
  const result: Record<string, T[]> = Object.create(null) as Record<string, T[]>
  const fn =
    typeof iteratee === 'function'
      ? iteratee
      : (item: T) => String(item[iteratee])

  for (const item of array) {
    const key = String(fn(item))
    if (result[key] === undefined) result[key] = []
    result[key].push(item)
  }

  return result
}
