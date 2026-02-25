import { describe, it, expect } from 'vitest'
import { cloneDeep } from '../../src/object/cloneDeep'

describe('cloneDeep', () => {
  it('should deep clone objects', () => {
    const obj = { a: 1, b: { c: 2 } }
    const cloned = cloneDeep(obj)
    expect(cloned).toEqual(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.b).not.toBe(obj.b)
  })

  it('should deep clone arrays', () => {
    const arr = [1, [2, [3]]]
    const cloned = cloneDeep(arr)
    expect(cloned).toEqual(arr)
    expect(cloned[1]).not.toBe(arr[1])
  })

  it('should clone Date objects', () => {
    const date = new Date('2024-01-01')
    const cloned = cloneDeep(date)
    expect(cloned).toEqual(date)
    expect(cloned).not.toBe(date)
    expect(cloned.getTime()).toBe(date.getTime())
  })

  it('should clone RegExp objects', () => {
    const regex = /test/gi
    const cloned = cloneDeep(regex)
    expect(cloned.source).toBe(regex.source)
    expect(cloned.flags).toBe(regex.flags)
    expect(cloned).not.toBe(regex)
  })

  it('should clone Map objects', () => {
    const map = new Map([['key', { nested: true }]])
    const cloned = cloneDeep(map)
    expect(cloned.get('key')).toEqual({ nested: true })
    expect(cloned.get('key')).not.toBe(map.get('key'))
  })

  it('should clone Set objects', () => {
    const set = new Set([1, 2, 3])
    const cloned = cloneDeep(set)
    expect(cloned).toEqual(set)
    expect(cloned).not.toBe(set)
  })

  it('should handle circular references', () => {
    const obj: any = { a: 1 }
    obj.self = obj
    const cloned = cloneDeep(obj)
    expect(cloned.a).toBe(1)
    expect(cloned.self).toBe(obj) // returns original ref for circular
  })

  it('should return primitives as-is', () => {
    expect(cloneDeep(42)).toBe(42)
    expect(cloneDeep('hello')).toBe('hello')
    expect(cloneDeep(null)).toBe(null)
    expect(cloneDeep(true)).toBe(true)
  })
})
