import { describe, it, expect } from 'vitest'
import { mergeDeep } from '../../src/object/mergeDeep'

describe('mergeDeep', () => {
  it('should deeply merge objects', () => {
    const result = mergeDeep({ a: { b: 1 } }, { a: { c: 2 } })
    expect(result).toEqual({ a: { b: 1, c: 2 } })
  })

  it('should merge multiple sources', () => {
    const result = mergeDeep({ a: 1 }, { b: 2 }, { c: 3 })
    expect(result).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('should overwrite non-object values', () => {
    const result = mergeDeep({ a: { x: 1 } }, { a: { x: 2, y: 3 } })
    expect(result).toEqual({ a: { x: 2, y: 3 } })
  })

  it('should not mutate the target', () => {
    const target = { a: { b: 1 } }
    const result = mergeDeep(target, { a: { c: 2 } })
    expect(target).toEqual({ a: { b: 1 } })
    expect(result).not.toBe(target)
  })

  it('should prevent prototype pollution via __proto__', () => {
    const target = {}
    mergeDeep(target, JSON.parse('{"__proto__": {"polluted": true}}'))
    expect((target as any).polluted).toBeUndefined()
    expect(({} as any).polluted).toBeUndefined()
  })

  it('should prevent prototype pollution via constructor', () => {
    const target = {}
    mergeDeep(target, { constructor: { prototype: { polluted: true } } } as any)
    expect(({} as any).polluted).toBeUndefined()
  })

  it('should handle non-plain-object sources gracefully', () => {
    const result = mergeDeep({ a: 1 }, null as any, { b: 2 })
    expect(result).toEqual({ a: 1, b: 2 })
  })
})
