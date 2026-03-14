import { describe, it, expect } from 'vitest'
import { mapValues } from '../../src/object/mapValues'

describe('mapValues', () => {
  it('should map values with iteratee', () => {
    expect(mapValues({ a: 1, b: 2, c: 3 }, v => v * 2)).toEqual({
      a: 2,
      b: 4,
      c: 6
    })
  })

  it('should provide key to iteratee', () => {
    expect(mapValues({ a: 1, b: 2 }, (_v, k) => k)).toEqual({
      a: 'a',
      b: 'b'
    })
  })

  it('should handle boolean transformation', () => {
    expect(mapValues({ fred: 30, barney: 40 }, age => age >= 35)).toEqual({
      fred: false,
      barney: true
    })
  })

  it('should handle empty object', () => {
    expect(mapValues({}, (v: number) => v * 2)).toEqual({})
  })

  it('should handle string values', () => {
    expect(mapValues({ a: 'hello', b: 'world' }, v => v.toUpperCase())).toEqual(
      { a: 'HELLO', b: 'WORLD' }
    )
  })

  it('should preserve keys', () => {
    const result = mapValues({ x: 1, y: 2, z: 3 }, v => v + 10)
    expect(Object.keys(result)).toEqual(['x', 'y', 'z'])
  })

  it('should provide object reference to iteratee', () => {
    const obj = { a: 1 }
    mapValues(obj, (_v, _k, o) => {
      expect(o).toBe(obj)
      return 0
    })
  })

  it('should handle mixed value types', () => {
    expect(mapValues({ a: 1, b: 'two', c: true }, v => typeof v)).toEqual({
      a: 'number',
      b: 'string',
      c: 'boolean'
    })
  })
})
