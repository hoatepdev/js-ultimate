import { describe, it, expect } from 'vitest'
import { intersection } from '../../src/array/intersection'

describe('intersection', () => {
  it('should return intersection of two arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3])
  })

  it('should return intersection of three arrays', () => {
    expect(intersection([1, 2, 3], [2, 3, 4], [3, 4, 5])).toEqual([3])
  })

  it('should handle arrays with duplicates', () => {
    expect(intersection([1, 2, 2, 3], [2, 3, 4])).toEqual([2, 3])
  })

  it('should return empty array when no common elements', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([])
  })

  it('should handle empty arrays', () => {
    expect(intersection([], [1, 2, 3])).toEqual([])
    expect(intersection([1, 2, 3], [])).toEqual([])
  })

  it('should handle no arguments', () => {
    expect(intersection()).toEqual([])
  })

  it('should handle single array', () => {
    expect(intersection([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should work with strings', () => {
    expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['b', 'c'])
  })

  it('should work with objects by reference', () => {
    const obj1 = { id: 1 }
    const obj2 = { id: 2 }
    expect(intersection([obj1, obj2], [obj2, obj1])).toEqual([obj1, obj2])
  })

  it('should preserve uniqueness in result', () => {
    expect(intersection([1, 1, 2, 2], [1, 2, 2])).toEqual([1, 2])
  })

  it('should handle large arrays efficiently', () => {
    const arr1 = Array.from({ length: 1000 }, (_, i) => i)
    const arr2 = Array.from({ length: 1000 }, (_, i) => i + 500)
    const result = intersection(arr1, arr2)
    expect(result.length).toBe(500)
    expect(result[0]).toBe(500)
  })
})
