import { describe, it, expect } from 'vitest'
import { flattenDeep } from '../../src/array/flattenDeep'

describe('flattenDeep', () => {
  it('should flatten deeply nested array', () => {
    expect(flattenDeep([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4])
  })

  it('should flatten very deep nesting', () => {
    expect(flattenDeep([[[[[1]]]]])).toEqual([1])
  })

  it('should handle already flat array', () => {
    expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should handle empty array', () => {
    expect(flattenDeep([])).toEqual([])
  })

  it('should handle single-level nested array', () => {
    expect(flattenDeep([[1], [2], [3]])).toEqual([1, 2, 3])
  })

  it('should handle mixed types', () => {
    expect(flattenDeep([1, 'a', [true, [null, [undefined]]]])).toEqual([
      1,
      'a',
      true,
      null,
      undefined
    ])
  })

  it('should preserve null and undefined values', () => {
    expect(flattenDeep([null, [undefined, [0, ['']]]])).toEqual([
      null,
      undefined,
      0,
      ''
    ])
  })

  it('should handle sparse arrays', () => {
    expect(flattenDeep([1, , [3, , [5]]])).toEqual([
      1,
      undefined,
      3,
      undefined,
      5
    ])
  })

  it('should handle empty nested arrays', () => {
    expect(flattenDeep([[], [[], [[]]]])).toEqual([])
  })

  it('should handle single element nested', () => {
    expect(flattenDeep([[[[[1]]]]])).toEqual([1])
  })

  it('should handle large arrays', () => {
    const input = Array.from({ length: 1000 }, (_, i) => [i])
    const expected = Array.from({ length: 1000 }, (_, i) => i)
    expect(flattenDeep(input)).toEqual(expected)
  })

  it('should handle deeply nested large arrays without stack overflow', () => {
    let nested: any = 1
    for (let i = 0; i < 100; i++) {
      nested = [nested]
    }
    expect(flattenDeep([nested, 2])).toEqual([1, 2])
  })

  it('should not mutate original array', () => {
    const original = [1, [2, [3]]]
    const originalCopy = JSON.stringify(original)
    flattenDeep(original)
    expect(JSON.stringify(original)).toBe(originalCopy)
  })
})
