import { describe, it, expect } from 'vitest'
import { difference } from '../../src/array/difference'

describe('difference', () => {
  it('should return values from first array not in second', () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1])
  })

  it('should handle multiple exclude arrays', () => {
    expect(difference([1, 2, 3, 4], [2, 3], [4])).toEqual([1])
  })

  it('should preserve duplicates in source array', () => {
    expect(difference([1, 1, 2, 2], [2])).toEqual([1, 1])
  })

  it('should return empty array when all values excluded', () => {
    expect(difference([1, 2], [1, 2])).toEqual([])
  })

  it('should handle empty source array', () => {
    expect(difference([], [1, 2, 3])).toEqual([])
  })

  it('should return copy when no exclude arrays', () => {
    expect(difference([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should handle empty exclude arrays', () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3])
  })

  it('should work with strings', () => {
    expect(difference(['a', 'b', 'c'], ['b', 'd'])).toEqual(['a', 'c'])
  })

  it('should work with objects by reference', () => {
    const obj1 = { id: 1 }
    const obj2 = { id: 2 }
    const obj3 = { id: 3 }
    expect(difference([obj1, obj2], [obj2])).toEqual([obj1])
    expect(difference([obj1, obj2], [{ id: 2 }])).toEqual([obj1, obj2]) // different reference
  })

  it('should not mutate original array', () => {
    const original = [1, 2, 3]
    const result = difference(original, [2])
    expect(original).toEqual([1, 2, 3])
    expect(result).toEqual([1, 3])
  })

  it('should handle large arrays efficiently', () => {
    const source = Array.from({ length: 1000 }, (_, i) => i)
    const exclude = Array.from({ length: 500 }, (_, i) => i)
    const result = difference(source, exclude)
    expect(result.length).toBe(500)
    expect(result[0]).toBe(500)
  })
})
