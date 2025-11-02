import { describe, it, expect } from 'vitest'
import { first } from '../../src/array/first'

describe('first', () => {
  it('should return first element of array', () => {
    expect(first([1, 2, 3])).toBe(1)
  })

  it('should return undefined for empty array', () => {
    expect(first([])).toBeUndefined()
  })

  it('should handle string arrays', () => {
    expect(first(['a', 'b', 'c'])).toBe('a')
  })

  it('should handle object arrays', () => {
    const obj = { id: 1 }
    expect(first([obj, { id: 2 }])).toBe(obj)
  })

  it('should handle single element arrays', () => {
    expect(first([42])).toBe(42)
  })
})
