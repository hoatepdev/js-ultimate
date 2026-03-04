import { describe, it, expect } from 'vitest'
import { pickBy } from '../../src/object/pickBy'

describe('pickBy', () => {
  it('should pick properties where predicate returns true', () => {
    const result = pickBy({ a: 1, b: 2, c: 3 }, value => value % 2 === 1)
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should work with type checking', () => {
    const result = pickBy(
      { a: 1, b: '2', c: 3 },
      value => typeof value === 'number'
    )
    expect(result).toEqual({ a: 1, c: 3 })
  })

  it('should handle falsy values correctly', () => {
    const result = pickBy(
      { a: 0, b: false, c: null, d: '', e: undefined },
      value => value != null
    )
    expect(result).toEqual({ a: 0, b: false, d: '' })
  })

  it('should include key in predicate', () => {
    const result = pickBy({ a: 1, b: 2, aa: 3 }, (value, key) =>
      key.startsWith('a')
    )
    expect(result).toEqual({ a: 1, aa: 3 })
  })

  it('should return empty object when predicate always false', () => {
    const result = pickBy({ a: 1, b: 2, c: 3 }, () => false)
    expect(result).toEqual({})
  })

  it('should return all properties when predicate always true', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pickBy(obj, () => true)
    expect(result).toEqual(obj)
  })

  it('should handle empty objects', () => {
    const result = pickBy({}, () => true)
    expect(result).toEqual({})
  })

  it('should not include inherited properties', () => {
    const parent = { inherited: 1 }
    const obj = Object.create(parent)
    obj.own = 2
    const result = pickBy(obj, () => true)
    expect(result).toEqual({ own: 2 })
  })

  it('should handle negative numbers', () => {
    const result = pickBy({ a: -1, b: 0, c: 1 }, value => value > 0)
    expect(result).toEqual({ c: 1 })
  })

  it('should work with nested objects', () => {
    const result = pickBy({ a: { x: 1 }, b: null }, value => value != null)
    expect(result).toEqual({ a: { x: 1 } })
  })
})
