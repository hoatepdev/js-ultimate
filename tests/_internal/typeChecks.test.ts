import { describe, it, expect } from 'vitest'
import { isObject, isPlainObjectCheck } from '../../src/_internal/typeChecks'

describe('isObject', () => {
  it('should return true for plain objects', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({ a: 1 })).toBe(true)
  })

  it('should return false for arrays', () => {
    expect(isObject([])).toBe(false)
    expect(isObject([1, 2])).toBe(false)
  })

  it('should return false for null', () => {
    expect(isObject(null)).toBe(false)
  })

  it('should return false for primitives', () => {
    expect(isObject(42)).toBe(false)
    expect(isObject('string')).toBe(false)
    expect(isObject(true)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })

  it('should return true for class instances', () => {
    expect(isObject(new Date())).toBe(true)
  })
})

describe('isPlainObjectCheck', () => {
  it('should return true for {}', () => {
    expect(isPlainObjectCheck({})).toBe(true)
  })

  it('should return true for Object.create(null)', () => {
    expect(isPlainObjectCheck(Object.create(null))).toBe(true)
  })

  it('should return false for class instances', () => {
    expect(isPlainObjectCheck(new Date())).toBe(false)
    expect(isPlainObjectCheck(new Map())).toBe(false)
  })

  it('should return false for arrays', () => {
    expect(isPlainObjectCheck([])).toBe(false)
  })

  it('should return false for primitives', () => {
    expect(isPlainObjectCheck(null)).toBe(false)
    expect(isPlainObjectCheck(42)).toBe(false)
    expect(isPlainObjectCheck('str')).toBe(false)
  })
})
