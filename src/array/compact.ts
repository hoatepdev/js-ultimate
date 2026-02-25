/**
 * Creates an array with all falsy values removed.
 * The values false, null, 0, "", undefined, and NaN are falsy.
 *
 * @param array - The array to compact
 * @returns Returns the new array of filtered values
 *
 * @example
 * compact([0, 1, false, 2, '', 3])
 * // => [1, 2, 3]
 *
 * @example
 * compact([null, undefined, NaN, 'hello', 0])
 * // => ['hello']
 */
export function compact<T>(
  array: T[]
): Exclude<T, null | undefined | false | '' | 0>[] {
  return array.filter(Boolean) as Exclude<
    T,
    null | undefined | false | '' | 0
  >[]
}
