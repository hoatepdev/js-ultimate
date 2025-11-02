import { describe, it, expect, vi } from 'vitest'
import { debounce } from '../../src/function/debounce'

describe('debounce', () => {
  it('should debounce function calls', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    debounced()
    debounced()

    expect(fn).not.toHaveBeenCalled()

    await new Promise(resolve => setTimeout(resolve, 150))
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass latest arguments', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced(1)
    debounced(2)
    debounced(3)

    await new Promise(resolve => setTimeout(resolve, 150))
    expect(fn).toHaveBeenCalledWith(3)
  })

  it('should handle multiple debounce cycles', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 50)

    debounced()
    await new Promise(resolve => setTimeout(resolve, 100))
    debounced()
    await new Promise(resolve => setTimeout(resolve, 100))

    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should preserve context', async () => {
    const obj = {
      value: 42,
      method: debounce(function (this: any) {
        return this.value
      }, 50)
    }

    const result = vi.fn()
    obj.method = debounce(function (this: any) {
      result(this.value)
    }, 50)

    obj.method()
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(result).toHaveBeenCalledWith(42)
  })

  it('should reset timer on subsequent calls', async () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    await new Promise(resolve => setTimeout(resolve, 50))
    debounced()
    await new Promise(resolve => setTimeout(resolve, 50))
    expect(fn).not.toHaveBeenCalled()

    await new Promise(resolve => setTimeout(resolve, 100))
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
