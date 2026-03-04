import { describe, it, expect } from 'vitest'
import { capitalize } from '../../src/string/capitalize'

describe('capitalize', () => {
  it('should capitalize first character and lower case the rest', () => {
    expect(capitalize('fred')).toBe('Fred')
    expect(capitalize('FRED')).toBe('Fred')
    expect(capitalize('hello world')).toBe('Hello world')
  })

  it('should handle empty strings', () => {
    expect(capitalize('')).toBe('')
  })

  it('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A')
    expect(capitalize('A')).toBe('A')
  })

  it('should not affect characters after the first word', () => {
    expect(capitalize('FRED SMITH')).toBe('Fred smith')
    expect(capitalize('hello WORLD')).toBe('Hello world')
  })

  it('should handle strings starting with non-letters', () => {
    expect(capitalize('123abc')).toBe('123abc')
    expect(capitalize(' hello')).toBe(' hello')
    expect(capitalize('-foo')).toBe('-foo')
  })

  it('should handle strings with only first character as letter', () => {
    expect(capitalize('A123')).toBe('A123')
    expect(capitalize('aBC')).toBe('Abc')
  })

  it('should handle unicode characters', () => {
    expect(capitalize('ÉCLAIR')).toBe('Éclair')
    expect(capitalize('éclair')).toBe('Éclair')
  })
})
