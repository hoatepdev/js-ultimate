import { describe, it, expect } from 'vitest'
import { some } from '../../src/collection/some'

describe('some', () => {
  it('should return true if any element passes', () => {
    expect(some([1, 2, 3, 4], x => x > 3)).toBe(true)
  })

  it('should return false if no element passes', () => {
    expect(some([1, 2, 3], x => x > 5)).toBe(false)
  })

  it('should return false for empty array', () => {
    expect(some([], (x: number) => x > 0)).toBe(false)
  })

  it('should provide index to predicate', () => {
    const indices: number[] = []
    some([10, 20, 30], (_v, i) => {
      indices.push(i)
      return false
    })
    expect(indices).toEqual([0, 1, 2])
  })

  it('should short-circuit on first match', () => {
    let count = 0
    some([1, 2, 3, 4, 5], x => {
      count++
      return x === 2
    })
    expect(count).toBe(2)
  })

  it('should handle truthy/falsy values', () => {
    expect(some([0, '', null, 'hello'], x => x)).toBe(true)
    expect(some([0, '', null, undefined], x => x)).toBe(false)
  })

  it('should handle boolean predicates', () => {
    expect(some([false, false, true], x => x)).toBe(true)
    expect(some([false, false, false], x => x)).toBe(false)
  })

  it('should provide array reference to predicate', () => {
    const arr = [1, 2, 3]
    some(arr, (_v, _i, a) => {
      expect(a).toBe(arr)
      return true
    })
  })
})
