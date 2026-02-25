import { describe, it, expect } from 'vitest'
import { shallowClone } from '../../src/_internal/clone'

describe('shallowClone', () => {
  it('should clone objects', () => {
    const obj = { a: 1, b: { c: 2 } }
    const cloned = shallowClone(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.b).toBe(obj.b) // shallow — same reference
  })

  it('should clone arrays', () => {
    const arr = [1, 2, [3]]
    const cloned = shallowClone(arr)
    expect(cloned).toEqual(arr)
    expect(cloned).not.toBe(arr)
    expect(cloned[2]).toBe(arr[2]) // shallow
  })

  it('should return primitives as-is', () => {
    expect(shallowClone(42)).toBe(42)
    expect(shallowClone('hello')).toBe('hello')
    expect(shallowClone(null)).toBe(null)
    expect(shallowClone(undefined)).toBe(undefined)
  })
})
