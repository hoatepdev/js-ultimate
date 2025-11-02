import { describe, it, expect } from 'vitest'
import { set } from '../../src/object/set'

describe('set', () => {
  it('should set existing nested property', () => {
    const obj = { a: { b: 1 } }
    set(obj, 'a.b', 2)
    expect(obj).toEqual({ a: { b: 2 } })
  })

  it('should create nested path with array notation', () => {
    const obj = {}
    set(obj, ['a', 'b'], 2)
    expect(obj).toEqual({ a: { b: 2 } })
  })

  it('should create deep nested path', () => {
    const obj = { a: 1 }
    set(obj, 'b.c.d', 4)
    expect(obj).toEqual({ a: 1, b: { c: { d: 4 } } })
  })

  it('should return the object', () => {
    const obj = {}
    const result = set(obj, 'a', 1)
    expect(result).toBe(obj)
  })

  it('should overwrite non-object values in path', () => {
    const obj = { a: 'string' }
    set(obj, 'a.b', 1)
    expect(obj).toEqual({ a: { b: 1 } })
  })

  it('should prevent prototype pollution via __proto__', () => {
    const obj = {}
    set(obj, '__proto__.polluted', 'yes')
    expect(({} as any).polluted).toBeUndefined()
  })

  it('should prevent prototype pollution via constructor', () => {
    const obj = {}
    set(obj, 'constructor.prototype.polluted', 'yes')
    expect(({} as any).polluted).toBeUndefined()
  })
})
