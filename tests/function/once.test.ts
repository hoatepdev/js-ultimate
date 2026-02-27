import { describe, it, expect, vi } from 'vitest'
import { once } from '../../src/function/once'

describe('once', () => {
  it('should only call function once', () => {
    let count = 0
    const increment = once(() => count++)

    expect(increment()).toBe(0)
    expect(increment()).toBe(0)
    expect(increment()).toBe(0)
    expect(count).toBe(1)
  })

  it('should return cached result on subsequent calls', () => {
    const fn = once((x: number) => x * 2)

    expect(fn(5)).toBe(10)
    expect(fn(10)).toBe(10) // cached result
    expect(fn(100)).toBe(10) // cached result
  })

  it('should preserve this context', () => {
    const obj = {
      value: 42,
      getValue: once(function (this: any) {
        return this.value
      })
    }

    expect(obj.getValue()).toBe(42)
    expect(obj.getValue()).toBe(42)
  })

  it('should pass arguments to original function', () => {
    const fn = once((a: number, b: number, c: number) => a + b + c)

    expect(fn(1, 2, 3)).toBe(6)
    expect(fn(4, 5, 6)).toBe(6) // cached
  })

  it('should have isCalled property', () => {
    const fn = once(() => {})

    expect(fn.isCalled).toBe(false)
    fn()
    expect(fn.isCalled).toBe(true)
    fn()
    expect(fn.isCalled).toBe(true)
  })

  it('should work with async functions', async () => {
    let count = 0
    const asyncFn = once(async () => {
      count++
      return 'result'
    })

    expect(await asyncFn()).toBe('result')
    expect(await asyncFn()).toBe('result')
    expect(count).toBe(1)
  })

  it('should handle functions that return undefined', () => {
    let called = false
    const fn = once(() => {
      called = true
    })

    expect(fn()).toBeUndefined()
    expect(fn()).toBeUndefined()
    expect(called).toBe(true)
  })

  it('should handle functions that return null', () => {
    const fn = once(() => null)

    expect(fn()).toBeNull()
    expect(fn()).toBeNull()
  })

  it('should handle functions that return 0', () => {
    const fn = once(() => 0)

    expect(fn()).toBe(0)
    expect(fn()).toBe(0)
  })

  it('should handle functions that return false', () => {
    let count = 0
    const fn = once(() => {
      count++
      return false
    })

    expect(fn()).toBe(false)
    expect(fn()).toBe(false)
    expect(count).toBe(1)
  })
})
