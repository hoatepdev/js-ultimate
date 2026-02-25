import { describe, it, expect } from 'vitest'
import { parsePath, hasDangerousKey } from '../../src/_internal/path'

describe('parsePath', () => {
  it('should parse string path into array', () => {
    expect(parsePath('a.b.c')).toEqual(['a', 'b', 'c'])
  })

  it('should return array path as-is', () => {
    expect(parsePath(['a', 'b'])).toEqual(['a', 'b'])
  })

  it('should handle single key string', () => {
    expect(parsePath('a')).toEqual(['a'])
  })

  it('should handle empty string', () => {
    expect(parsePath('')).toEqual([''])
  })
})

describe('hasDangerousKey', () => {
  it('should detect __proto__', () => {
    expect(hasDangerousKey(['a', '__proto__', 'b'])).toBe(true)
  })

  it('should detect constructor', () => {
    expect(hasDangerousKey(['constructor'])).toBe(true)
  })

  it('should detect prototype', () => {
    expect(hasDangerousKey(['prototype'])).toBe(true)
  })

  it('should return false for safe keys', () => {
    expect(hasDangerousKey(['a', 'b', 'c'])).toBe(false)
  })

  it('should return false for empty keys', () => {
    expect(hasDangerousKey([])).toBe(false)
  })
})
