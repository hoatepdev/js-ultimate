import { describe, it, expect } from 'vitest'
import { every } from '../../src/collection/every'

describe('every', () => {
  it('should return true if all elements pass', () => {
    expect(every([2, 4, 6], x => x % 2 === 0)).toBe(true)
  })

  it('should return false if any element fails', () => {
    expect(every([1, 2, 3], x => x > 2)).toBe(false)
  })

  it('should return true for empty array', () => {
    expect(every([], (x: number) => x > 0)).toBe(true)
  })

  it('should provide index to predicate', () => {
    const indices: number[] = []
    every([10, 20, 30], (_v, i) => {
      indices.push(i)
      return true
    })
    expect(indices).toEqual([0, 1, 2])
  })

  it('should short-circuit on first failure', () => {
    let count = 0
    every([1, 2, 3, 4, 5], x => {
      count++
      return x < 3
    })
    expect(count).toBe(3)
  })

  it('should handle all positive numbers', () => {
    expect(every([1, 2, 3], x => x > 0)).toBe(true)
  })

  it('should handle mixed truthy/falsy', () => {
    expect(every([1, 'hello', true, []], x => x)).toBe(true)
    expect(every([1, 'hello', 0, true], x => x)).toBe(false)
  })

  it('should provide array reference to predicate', () => {
    const arr = [1, 2, 3]
    every(arr, (_v, _i, a) => {
      expect(a).toBe(arr)
      return true
    })
  })
})
