import { describe, it, expect } from 'vitest'
import { upperFirst } from '../../src/string/upperFirst'

describe('upperFirst', () => {
  it('should convert first character to upper case', () => {
    expect(upperFirst('fred')).toBe('Fred')
    expect(upperFirst('hello')).toBe('Hello')
    expect(upperFirst('world')).toBe('World')
  })

  it('should not modify already uppercased first character', () => {
    expect(upperFirst('Fred')).toBe('Fred')
    expect(upperFirst('Hello')).toBe('Hello')
  })

  it('should not modify remaining characters', () => {
    expect(upperFirst('fRED')).toBe('FRED')
    expect(upperFirst('hELLO')).toBe('HELLO')
  })

  it('should handle empty strings', () => {
    expect(upperFirst('')).toBe('')
  })

  it('should handle single character strings', () => {
    expect(upperFirst('a')).toBe('A')
    expect(upperFirst('A')).toBe('A')
  })

  it('should handle strings starting with non-letters', () => {
    expect(upperFirst('123abc')).toBe('123abc')
    expect(upperFirst(' hello')).toBe(' hello')
    expect(upperFirst('-foo')).toBe('-foo')
  })

  it('should handle unicode characters', () => {
    expect(upperFirst('éclair')).toBe('Éclair')
    expect(upperFirst('ñandu')).toBe('Ñandu')
  })
})
