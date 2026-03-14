import { describe, it, expect } from 'vitest'
import { defaults } from '../../src/object/defaults'

describe('defaults', () => {
  it('should assign default values', () => {
    expect(defaults({ a: 1 }, { b: 2 }, { a: 3, c: 4 })).toEqual({
      a: 1,
      b: 2,
      c: 4
    })
  })

  it('should not overwrite existing values', () => {
    expect(
      defaults({ host: 'example.com' }, { host: 'localhost', port: 3000 })
    ).toEqual({ host: 'example.com', port: 3000 })
  })

  it('should handle empty target', () => {
    expect(defaults({}, { host: 'localhost', port: 3000 })).toEqual({
      host: 'localhost',
      port: 3000
    })
  })

  it('should handle no sources', () => {
    expect(defaults({ a: 1 })).toEqual({ a: 1 })
  })

  it('should handle multiple sources left to right', () => {
    expect(defaults({}, { a: 1 }, { a: 2, b: 2 }, { b: 3, c: 3 })).toEqual({
      a: 1,
      b: 2,
      c: 3
    })
  })

  it('should mutate the target object', () => {
    const obj = { a: 1 }
    const result = defaults(obj, { b: 2 })
    expect(result).toBe(obj)
    expect(obj).toEqual({ a: 1, b: 2 })
  })

  it('should overwrite undefined values', () => {
    expect(defaults({ a: undefined }, { a: 1 })).toEqual({ a: 1 })
  })

  it('should not overwrite null values', () => {
    expect(defaults({ a: null }, { a: 1 })).toEqual({ a: null })
  })

  it('should not overwrite falsy values', () => {
    expect(
      defaults({ a: 0, b: '', c: false }, { a: 1, b: 'hi', c: true })
    ).toEqual({
      a: 0,
      b: '',
      c: false
    })
  })
})
