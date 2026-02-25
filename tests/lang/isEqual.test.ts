import { describe, it, expect } from 'vitest'
import { isEqual } from '../../src/lang/isEqual'

describe('isEqual', () => {
  it('should compare objects', () => {
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true)
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false)
  })

  it('should compare arrays', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false)
  })

  it('should compare nested objects', () => {
    expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true)
    expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false)
  })

  it('should handle primitive types', () => {
    expect(isEqual(1, 1)).toBe(true)
    expect(isEqual('a', 'a')).toBe(true)
    expect(isEqual(true, true)).toBe(true)
    expect(isEqual(1, 2)).toBe(false)
  })

  it('should handle dates', () => {
    const date1 = new Date('2024-01-01')
    const date2 = new Date('2024-01-01')
    const date3 = new Date('2024-01-02')
    expect(isEqual(date1, date2)).toBe(true)
    expect(isEqual(date1, date3)).toBe(false)
  })

  it('should handle RegExp', () => {
    expect(isEqual(/test/gi, /test/gi)).toBe(true)
    expect(isEqual(/test/g, /test/i)).toBe(false)
    expect(isEqual(/abc/, /def/)).toBe(false)
  })

  it('should handle Map', () => {
    const map1 = new Map([
      ['a', 1],
      ['b', 2]
    ])
    const map2 = new Map([
      ['a', 1],
      ['b', 2]
    ])
    const map3 = new Map([
      ['a', 1],
      ['b', 3]
    ])
    expect(isEqual(map1, map2)).toBe(true)
    expect(isEqual(map1, map3)).toBe(false)
  })

  it('should handle Set', () => {
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true)
    expect(isEqual(new Set([1, 2]), new Set([1, 2, 3]))).toBe(false)
  })
})
