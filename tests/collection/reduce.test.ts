import { describe, it, expect } from 'vitest'
import { reduce } from '../../src/collection/reduce'

describe('reduce', () => {
  it('should sum numbers', () => {
    expect(reduce([1, 2, 3], (sum, n) => sum + n, 0)).toBe(6)
  })

  it('should sum object properties', () => {
    expect(reduce([{ n: 1 }, { n: 2 }], (sum, obj) => sum + obj.n, 0)).toBe(3)
  })

  it('should concatenate strings', () => {
    expect(reduce(['a', 'b', 'c'], (acc, v) => acc + v, '')).toBe('abc')
  })

  it('should handle empty arrays with initial value', () => {
    expect(reduce([], (sum, n) => sum + n, 10)).toBe(10)
  })

  it('should build objects from arrays', () => {
    const result = reduce(
      [
        ['a', 1],
        ['b', 2]
      ],
      (acc, [key, val]) => ({ ...acc, [key]: val }),
      {} as Record<string, number>
    )
    expect(result).toEqual({ a: 1, b: 2 })
  })
})
