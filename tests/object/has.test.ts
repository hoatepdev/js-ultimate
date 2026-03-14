import { describe, it, expect } from 'vitest'
import { has } from '../../src/object/has'

describe('has', () => {
  it('should check for existing nested path', () => {
    expect(has({ a: { b: 2 } }, 'a.b')).toBe(true)
  })

  it('should return false for missing path', () => {
    expect(has({ a: { b: 2 } }, 'a.c')).toBe(false)
  })

  it('should check top-level property', () => {
    expect(has({ a: 1 }, 'a')).toBe(true)
    expect(has({ a: 1 }, 'b')).toBe(false)
  })

  it('should handle array index paths', () => {
    expect(has({ a: [1, 2, 3] }, 'a.0')).toBe(true)
    expect(has({ a: [1, 2, 3] }, 'a.5')).toBe(false)
  })

  it('should handle array path format', () => {
    expect(has({ a: { b: 2 } }, ['a', 'b'])).toBe(true)
    expect(has({ a: { b: 2 } }, ['a', 'c'])).toBe(false)
  })

  it('should return false for null/undefined input', () => {
    expect(has(null, 'a')).toBe(false)
    expect(has(undefined, 'a')).toBe(false)
  })

  it('should handle empty object', () => {
    expect(has({}, 'a')).toBe(false)
  })

  it('should handle deeply nested paths', () => {
    const obj = { a: { b: { c: { d: 1 } } } }
    expect(has(obj, 'a.b.c.d')).toBe(true)
    expect(has(obj, 'a.b.c.e')).toBe(false)
  })

  it('should detect properties with undefined values', () => {
    expect(has({ a: undefined }, 'a')).toBe(true)
  })

  it('should detect properties with null values', () => {
    expect(has({ a: null }, 'a')).toBe(true)
  })

  it('should return false for non-object intermediate path', () => {
    expect(has({ a: 42 }, 'a.b')).toBe(false)
  })
})
