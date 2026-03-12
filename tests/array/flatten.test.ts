import { describe, it, expect } from 'vitest'
import { flatten } from '../../src/array/flatten'

describe('flatten', () => {
  it('should flatten one level deep', () => {
    expect(flatten([1, [2, [3, [4]], 5]])).toEqual([1, 2, [3, [4]], 5])
  })

  it('should flatten array of arrays', () => {
    expect(flatten([[1, 2], [3, 4], [5]])).toEqual([1, 2, 3, 4, 5])
  })

  it('should handle already flat array', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3])
  })

  it('should handle empty array', () => {
    expect(flatten([])).toEqual([])
  })

  it('should handle mixed nested and flat elements', () => {
    expect(flatten([1, [2, 3], 4, [5, 6]])).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('should handle array of empty arrays', () => {
    expect(flatten([[], [], []])).toEqual([])
  })

  it('should handle string arrays', () => {
    expect(flatten([['a', 'b'], ['c']])).toEqual(['a', 'b', 'c'])
  })

  it('should not flatten deeper than one level', () => {
    expect(
      flatten([
        [1, [2, 3]],
        [4, [5]]
      ])
    ).toEqual([1, [2, 3], 4, [5]])
  })
})
