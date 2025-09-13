import * as _ from '../src/utils'

describe('utils module', () => {
  describe('randomInt function', () => {
    test('returns integer within range', () => {
      for (let i = 0; i < 100; i++) {
        const result = _.randomInt(1, 10)
        expect(result).toBeGreaterThanOrEqual(1)
        expect(result).toBeLessThanOrEqual(10)
        expect(Number.isInteger(result)).toBe(true)
      }
    })
    
    test('handles single value range', () => {
      const result = _.randomInt(5, 5)
      expect(result).toBe(5)
    })
  })

  describe('clamp function', () => {
    test('clamps number within bounds', () => {
      expect(_.clamp(-10, -5, 5)).toBe(-5)
      expect(_.clamp(10, -5, 5)).toBe(5)
      expect(_.clamp(3, -5, 5)).toBe(3)
      expect(_.clamp(0, -5, 5)).toBe(0)
    })
    
    test('handles edge cases', () => {
      expect(_.clamp(5, 5, 5)).toBe(5)
      expect(_.clamp(-5, -5, -5)).toBe(-5)
    })
  })

  describe('sleep function', () => {
    vi.useFakeTimers()
    
    test('creates promise that resolves after specified time', async () => {
      const promise = _.sleep(1000)
      let resolved = false
      promise.then(() => { resolved = true })
      
      vi.advanceTimersByTime(999)
      expect(resolved).toBe(false)
      
      vi.advanceTimersByTime(1)
      await promise
      expect(resolved).toBe(true)
    })
  })

  describe('deepFreeze function', () => {
    test('freezes object and nested objects', () => {
      const obj = { a: { b: { c: 1 } }, d: [1, 2, 3] }
      const frozen = _.deepFreeze(obj)
      
      expect(Object.isFrozen(frozen)).toBe(true)
      expect(Object.isFrozen(frozen.a)).toBe(true)
      expect(Object.isFrozen(frozen.a.b)).toBe(true)
      expect(Object.isFrozen(frozen.d)).toBe(true)
    })
    
    test('handles primitive values', () => {
      expect(_.deepFreeze(42)).toBe(42)
      expect(_.deepFreeze('hello')).toBe('hello')
      expect(_.deepFreeze(null)).toBe(null)
    })
    
    test('returns same reference', () => {
      const obj = { a: 1 }
      const frozen = _.deepFreeze(obj)
      expect(frozen).toBe(obj)
    })
  })

  describe('get function', () => {
    test('gets value at object path', () => {
      const obj = { a: { b: { c: 3 } } }
      expect(_.get(obj, 'a.b.c')).toBe(3)
      expect(_.get(obj, 'a.b')).toEqual({ c: 3 })
      expect(_.get(obj, 'a')).toEqual({ b: { c: 3 } })
    })
    
    test('returns default value for non-existent paths', () => {
      const obj = { a: { b: { c: 3 } } }
      expect(_.get(obj, 'a.b.x', 'default')).toBe('default')
      expect(_.get(obj, 'x.y.z', 'default')).toBe('default')
      expect(_.get(obj, 'a.x.c', 'default')).toBe('default')
    })
    
    test('handles null and undefined objects', () => {
      expect(_.get(null, 'a.b.c', 'default')).toBe('default')
      expect(_.get(undefined, 'a.b.c', 'default')).toBe('default')
    })
    
    test('handles edge cases', () => {
      expect(_.get({}, 'a', 'default')).toBe('default')
      expect(_.get({ a: null }, 'a.b', 'default')).toBe('default')
      expect(_.get({ a: undefined }, 'a.b', 'default')).toBe('default')
    })
  })
})