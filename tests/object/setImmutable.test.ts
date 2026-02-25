import { describe, it, expect } from 'vitest'
import { setImmutable } from '../../src/object/setImmutable'

describe('setImmutable', () => {
  it('should set nested value without mutating original', () => {
    const obj = { a: { b: 1, c: 2 }, x: 3 }
    const result = setImmutable(obj, 'a.b', 99)
    expect(result).toEqual({ a: { b: 99, c: 2 }, x: 3 })
    expect(obj.a.b).toBe(1) // original unchanged
  })

  it('should create missing paths', () => {
    const result = setImmutable({}, 'a.b.c', 1)
    expect(result).toEqual({ a: { b: { c: 1 } } })
  })

  it('should support array path notation', () => {
    const result = setImmutable({}, ['x', 'y'], 42)
    expect(result).toEqual({ x: { y: 42 } })
  })

  it('should preserve structural sharing for untouched branches', () => {
    const child = { d: 4 }
    const obj = { a: { b: 1 }, c: child }
    const result = setImmutable(obj, 'a.b', 99)
    expect(result.c).toBe(child) // same reference
  })

  it('should block prototype pollution', () => {
    const obj = { a: 1 }
    const result = setImmutable(obj, '__proto__.polluted', true)
    expect(result).toBe(obj) // returns original
    expect((obj as any).polluted).toBeUndefined()
  })

  it('should return a new root object', () => {
    const obj = { a: 1 }
    const result = setImmutable(obj, 'a', 2)
    expect(result).not.toBe(obj)
    expect(result).toEqual({ a: 2 })
  })
})
