import { describe, it, expect } from 'vitest'
import { isEmpty } from '../../src/lang/isEmpty'

describe('isEmpty', () => {
  it('should return true for null and undefined', () => {
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
  })

  it('should return true for booleans and numbers', () => {
    expect(isEmpty(true)).toBe(true)
    expect(isEmpty(false)).toBe(true)
    expect(isEmpty(0)).toBe(true)
    expect(isEmpty(42)).toBe(true)
  })

  it('should check string length', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('hello')).toBe(false)
  })

  it('should check array length', () => {
    expect(isEmpty([])).toBe(true)
    expect(isEmpty([1])).toBe(false)
  })

  it('should check object keys', () => {
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ a: 1 })).toBe(false)
  })

  it('should check Map and Set size', () => {
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Map([['a', 1]]))).toBe(false)
    expect(isEmpty(new Set())).toBe(true)
    expect(isEmpty(new Set([1]))).toBe(false)
  })
})
