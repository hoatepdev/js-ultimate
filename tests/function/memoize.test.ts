import { describe, it, expect } from 'vitest'
import { memoize } from '../../src/function/memoize'

describe('memoize', () => {
  it('should memoize function results', () => {
    let callCount = 0
    const fn = memoize((x: number) => {
      callCount++
      return x * 2
    })
    expect(fn(5)).toBe(10)
    expect(fn(5)).toBe(10)
    expect(callCount).toBe(1)
  })

  it('should use first argument as default key', () => {
    let callCount = 0
    const fn = memoize((a: number, _b: number) => {
      callCount++
      return a
    })
    fn(1, 2)
    fn(1, 3)
    expect(callCount).toBe(1)
  })

  it('should support custom resolver', () => {
    let callCount = 0
    const fn = memoize(
      (a: number, b: number) => {
        callCount++
        return a + b
      },
      (a, b) => `${a}:${b}`
    )
    expect(fn(1, 2)).toBe(3)
    expect(fn(1, 2)).toBe(3)
    expect(fn(1, 3)).toBe(4)
    expect(callCount).toBe(2)
  })

  it('should expose cache as Map', () => {
    const fn = memoize((x: number) => x * 2)
    fn(5)
    expect(fn.cache).toBeInstanceOf(Map)
    expect(fn.cache.size).toBe(1)
    expect(fn.cache.get(5)).toBe(10)
  })

  it('should allow cache to be cleared', () => {
    let callCount = 0
    const fn = memoize((x: number) => {
      callCount++
      return x * 2
    })
    fn(5)
    fn.cache.clear()
    fn(5)
    expect(callCount).toBe(2)
  })

  it('should handle string keys', () => {
    const fn = memoize((s: string) => s.toUpperCase())
    expect(fn('hello')).toBe('HELLO')
    expect(fn('hello')).toBe('HELLO')
    expect(fn.cache.size).toBe(1)
  })

  it('should handle different argument types as keys', () => {
    const fn = memoize((x: unknown) => String(x))
    fn(1)
    fn('1')
    fn(null)
    expect(fn.cache.size).toBe(3)
  })

  it('should preserve this context', () => {
    const obj = {
      multiplier: 3,
      compute: memoize(function (this: any, x: number) {
        return x * this.multiplier
      })
    }
    expect(obj.compute(5)).toBe(15)
  })

  it('should handle recursive memoization', () => {
    const factorial: (n: number) => number = memoize((n: number): number =>
      n <= 1 ? 1 : n * factorial(n - 1)
    )
    expect(factorial(5)).toBe(120)
    expect(factorial.cache.size).toBe(5)
  })
})
