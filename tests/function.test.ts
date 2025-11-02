import * as _ from '../src/function'

describe('function module', () => {
  describe('debounce function', () => {
    vi.useFakeTimers()

    test('delays function execution', () => {
      const mockFn = vi.fn()
      const debounced = _.debounce(mockFn, 1000)

      debounced()
      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(1000)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    test('cancels previous timeout on new call', () => {
      const mockFn = vi.fn()
      const debounced = _.debounce(mockFn, 1000)

      debounced()
      vi.advanceTimersByTime(500)
      debounced()
      vi.advanceTimersByTime(500)
      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(500)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    test('passes arguments correctly', () => {
      const mockFn = vi.fn()
      const debounced = _.debounce(mockFn, 1000)

      debounced('arg1', 'arg2')
      vi.advanceTimersByTime(1000)
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })

  describe('throttle function', () => {
    vi.useFakeTimers()

    test('executes function immediately on first call', () => {
      const mockFn = vi.fn()
      const throttled = _.throttle(mockFn, 1000)

      throttled()
      expect(mockFn).toHaveBeenCalledTimes(1)
    })

    test('prevents execution during throttle period', () => {
      const mockFn = vi.fn()
      const throttled = _.throttle(mockFn, 1000)

      throttled()
      throttled()
      throttled()
      expect(mockFn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(1000)
      throttled()
      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    test('passes arguments correctly', () => {
      const mockFn = vi.fn()
      const throttled = _.throttle(mockFn, 1000)

      throttled('arg1', 'arg2')
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })

  describe('once function', () => {
    test('executes function only once', () => {
      const mockFn = vi.fn(() => 'result')
      const onceFn = _.once(mockFn)

      const result1 = onceFn()
      const result2 = onceFn()
      const result3 = onceFn()

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(result1).toBe('result')
      expect(result2).toBe('result')
      expect(result3).toBe('result')
    })

    test('passes arguments on first call', () => {
      const mockFn = vi.fn()
      const onceFn = _.once(mockFn)

      onceFn('arg1', 'arg2')
      onceFn('arg3', 'arg4')

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
    })
  })

  describe('memoize function', () => {
    test('caches function results', () => {
      const expensiveFn = vi.fn((n: number) => n * 2)
      const memoized = _.memoize(expensiveFn)

      const result1 = memoized(5)
      const result2 = memoized(5)
      const result3 = memoized(10)

      expect(expensiveFn).toHaveBeenCalledTimes(2)
      expect(result1).toBe(10)
      expect(result2).toBe(10)
      expect(result3).toBe(20)
    })

    test('handles different argument combinations', () => {
      const mockFn = vi.fn((a: number, b: number) => a + b)
      const memoized = _.memoize(mockFn)

      memoized(1, 2)
      memoized(1, 2)
      memoized(2, 1)
      memoized(1, 2)

      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    test('works with complex objects as arguments', () => {
      const mockFn = vi.fn((obj: any) => obj.value * 2)
      const memoized = _.memoize(mockFn)

      const obj1 = { value: 5 }
      const obj2 = { value: 5 }

      memoized(obj1)
      memoized(obj2)
      memoized(obj1)

      expect(mockFn).toHaveBeenCalledTimes(1) // obj1 and obj2 have same JSON.stringify result
    })
  })
})
