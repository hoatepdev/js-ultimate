import { describe, it, expect, vi } from 'vitest'
import { throttle } from '../../src/function/throttle'

describe('throttle', () => {
  it('should call function immediately on first invocation (leading)', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should not call more than once per wait period', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    throttled()
    throttled()

    expect(fn).toHaveBeenCalledTimes(1)

    await new Promise(resolve => setTimeout(resolve, 150))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should allow calls after wait period', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 50)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    await new Promise(resolve => setTimeout(resolve, 60))
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should pass arguments correctly', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled(1, 2, 3)
    expect(fn).toHaveBeenCalledWith(1, 2, 3)
  })

  it('should support leading: false option', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 50, { leading: false })

    throttled()
    expect(fn).not.toHaveBeenCalled()

    await new Promise(resolve => setTimeout(resolve, 60))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should support trailing: false option', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 50, { trailing: false })

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)

    throttled()
    throttled()

    await new Promise(resolve => setTimeout(resolve, 60))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should support leading: false and trailing: false together', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 50, { leading: false, trailing: false })

    throttled()
    throttled()
    throttled()

    await new Promise(resolve => setTimeout(resolve, 100))
    expect(fn).not.toHaveBeenCalled()
  })

  it('should have default options with leading and trailing both true', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should cancel pending trailing call', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100, { leading: false })

    throttled()
    expect(fn).not.toHaveBeenCalled()

    throttled.cancel()

    await new Promise(resolve => setTimeout(resolve, 150))
    expect(fn).not.toHaveBeenCalled()
  })

  it('should allow new calls after cancel', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 50)

    throttled()
    throttled.cancel()

    await new Promise(resolve => setTimeout(resolve, 10))
    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should preserve this context', async () => {
    let capturedContext: any
    const fn = vi.fn(function (this: any) {
      capturedContext = this
      return this.value
    })
    const obj = { value: 42, method: fn }

    const throttled = throttle(function (this: any) {
      return fn.apply(this, [])
    }, 50)

    obj.throttledMethod = throttled
    obj.throttledMethod()

    expect(fn).toHaveBeenCalledTimes(1)
    expect(capturedContext.value).toBe(42)
  })

  it('should work with arrow functions', () => {
    let count = 0
    const fn = vi.fn(() => count++)
    const throttled = throttle(fn, 100)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should handle wait = 0', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 0)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should handle rapid successive calls', async () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 50)

    for (let i = 0; i < 10; i++) {
      throttled(i)
    }

    expect(fn).toHaveBeenCalledTimes(1)

    await new Promise(resolve => setTimeout(resolve, 60))
    expect(fn).toHaveBeenCalledTimes(1)

    throttled()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should handle single call without throttling', () => {
    const fn = vi.fn()
    const throttled = throttle(fn, 100)

    throttled()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
