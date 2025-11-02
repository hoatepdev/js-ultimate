import { describe, it, expect } from 'vitest'
import { map } from '../../src/collection/map'

describe('map', () => {
  it('should map values with transformation', () => {
    expect(map([1, 2, 3], n => n * 2)).toEqual([2, 4, 6])
  })

  it('should provide index to iteratee', () => {
    expect(map(['a', 'b', 'c'], (v, i) => `${i}-${v}`)).toEqual([
      '0-a',
      '1-b',
      '2-c'
    ])
  })

  it('should map object properties', () => {
    expect(map([{ id: 1 }, { id: 2 }], obj => obj.id)).toEqual([1, 2])
  })

  it('should handle empty arrays', () => {
    expect(map([], n => n * 2)).toEqual([])
  })

  it('should preserve array reference context', () => {
    const result = map([1, 2, 3], (v, i, arr) => arr.length)
    expect(result).toEqual([3, 3, 3])
  })
})
