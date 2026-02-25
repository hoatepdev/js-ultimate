import { describe, it, expect } from 'vitest'
import { isPlainObject } from '../../src/lang/isPlainObject'

describe('isPlainObject', () => {
  it('should return true for {}', () => {
    expect(isPlainObject({})).toBe(true)
  })

  it('should return true for objects with properties', () => {
    expect(isPlainObject({ a: 1, b: 2 })).toBe(true)
  })

  it('should return true for Object.create(null)', () => {
    expect(isPlainObject(Object.create(null))).toBe(true)
  })

  it('should return false for class instances', () => {
    expect(isPlainObject(new Date())).toBe(false)
    expect(isPlainObject(new Map())).toBe(false)
    expect(isPlainObject(new Set())).toBe(false)
    expect(isPlainObject(/regex/)).toBe(false)
  })

  it('should return false for arrays', () => {
    expect(isPlainObject([])).toBe(false)
    expect(isPlainObject([1, 2, 3])).toBe(false)
  })

  it('should return false for primitives and null', () => {
    expect(isPlainObject(null)).toBe(false)
    expect(isPlainObject(undefined)).toBe(false)
    expect(isPlainObject(42)).toBe(false)
    expect(isPlainObject('string')).toBe(false)
    expect(isPlainObject(true)).toBe(false)
  })
})
