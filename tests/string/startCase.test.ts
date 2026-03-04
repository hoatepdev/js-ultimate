import { describe, it, expect } from 'vitest'
import { startCase } from '../../src/string/startCase'

describe('startCase', () => {
  it('should convert string to start case', () => {
    expect(startCase('--foo-bar--')).toBe('Foo Bar')
    expect(startCase('fooBar')).toBe('Foo Bar')
    expect(startCase('__FOO_BAR__')).toBe('Foo Bar')
  })

  it('should handle space-separated words', () => {
    expect(startCase('foo bar')).toBe('Foo Bar')
    expect(startCase('hello world')).toBe('Hello World')
  })

  it('should capitalize each word and lower case the rest', () => {
    expect(startCase('FOO BAR')).toBe('Foo Bar')
    expect(startCase('hello WORLD')).toBe('Hello World')
  })

  it('should handle empty strings', () => {
    expect(startCase('')).toBe('')
  })

  it('should handle single words', () => {
    expect(startCase('foo')).toBe('Foo')
    expect(startCase('FOO')).toBe('Foo')
  })

  it('should handle strings with multiple spaces', () => {
    expect(startCase('foo   bar')).toBe('Foo Bar')
    expect(startCase('  foo  bar  ')).toBe('Foo Bar')
  })

  it('should handle camelCase', () => {
    expect(startCase('fooBarBaz')).toBe('Foo Bar Baz')
    expect(startCase('getHTTPResponse')).toBe('Get Http Response')
  })

  it('should handle strings with numbers', () => {
    expect(startCase('foo2bar')).toBe('Foo2bar')
    expect(startCase('foo2_bar')).toBe('Foo2 Bar')
  })
})
