export const first = <T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) => {
  return array.length ? array[0] : defaultValue
}

export const group = <T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key
): Record<Key, T[]> => {
  return array.reduce(
    (acc, item) => {
      const groupId = getGroupId(item)
      if (!acc[groupId]) acc[groupId] = []
      acc[groupId].push(item)
      return acc
    },
    {} as Record<Key, T[]>
  )
}

/**
 * Creates a duplicate-free version of an array
 * @param array - The array to inspect
 * @returns Returns the new duplicate free array
 * @example
 * uniq([2, 1, 2]) // [2, 1]
 * uniq(['a', 'b', 'a']) // ['a', 'b']
 */
export const uniq = <T>(array: readonly T[]): T[] => {
  return Array.from(new Set(array))
}

/**
 * Flattens array a single level deep
 * @param array - The array to flatten
 * @returns Returns the new flattened array
 * @example
 * flatten([1, [2, [3, [4]], 5]]) // [1, 2, [3, [4]], 5]
 */
export const flatten = <T>(array: readonly (T | T[])[]): T[] => {
  return array.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...val)
    } else {
      acc.push(val)
    }
    return acc
  }, [])
}

/**
 * Creates an array of elements split into groups the length of size
 * @param array - The array to process
 * @param size - The length of each chunk
 * @returns Returns the new array of chunks
 * @example
 * chunk(['a', 'b', 'c', 'd'], 2) // [['a', 'b'], ['c', 'd']]
 * chunk(['a', 'b', 'c', 'd'], 3) // [['a', 'b', 'c'], ['d']]
 */
export const chunk = <T>(array: readonly T[], size: number): T[][] => {
  if (size <= 0) return []
  const result: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

/**
 * Creates an array of numbers progressing from start up to, but not including, end
 * @param start - The start of the range
 * @param end - The end of the range
 * @param step - The value to increment or decrement by
 * @returns Returns the range of numbers
 * @example
 * range(0, 4) // [0, 1, 2, 3]
 * range(1, 5, 2) // [1, 3]
 * range(0, -4, -1) // [0, -1, -2, -3]
 */
export const range = (start: number, end?: number, step: number = 1): number[] => {
  if (end === undefined) {
    end = start
    start = 0
  }
  
  const result: number[] = []
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i)
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i)
    }
  }
  return result
}

/**
 * Creates an array with all falsy values removed
 * @param array - The array to compact
 * @returns Returns the new array of filtered values
 * @example
 * compact([0, 1, false, 2, '', 3]) // [1, 2, 3]
 */
export const compact = <T>(array: readonly (T | null | undefined | false | 0 | '')[]): T[] => {
  return array.filter(Boolean) as T[]
}

/**
 * Creates an array of shuffled values, using a version of the Fisher-Yates shuffle
 * @param array - The array to shuffle
 * @returns Returns the new shuffled array
 * @example
 * shuffle([1, 2, 3, 4]) // [4, 1, 3, 2] (random order)
 */
export const shuffle = <T>(array: readonly T[]): T[] => {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
