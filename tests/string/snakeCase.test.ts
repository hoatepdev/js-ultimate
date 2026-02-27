import { describe, it, expect } from 'vitest'
import { snakeCase } from '../../src/string/snakeCase'

describe('snakeCase', () => {
  it('should convert space-separated words', () => {
    expect(snakeCase('foo bar')).toBe('foo_bar')
  })

  it('should convert camelCase to snake_case', () => {
    expect(snakeCase('fooBar')).toBe('foo_bar')
    expect(snakeCase('fooBarBaz')).toBe('foo_bar_baz')
  })

  it('should convert PascalCase to snake_case', () => {
    expect(snakeCase('FooBar')).toBe('foo_bar')
    expect(snakeCase('FooBarBaz')).toBe('foo_bar_baz')
  })

  it('should handle dashed strings', () => {
    expect(snakeCase('--foo-bar--')).toBe('foo_bar')
  })

  it('should handle underscored strings', () => {
    expect(snakeCase('__FOO_BAR__')).toBe('foo_bar')
    expect(snakeCase('foo_bar')).toBe('foo_bar')
  })

  it('should handle already snake_case (idempotent)', () => {
    expect(snakeCase('foo_bar')).toBe('foo_bar')
  })

  it('should handle consecutive separators', () => {
    expect(snakeCase('foo--bar')).toBe('foo_bar')
    expect(snakeCase('foo___bar')).toBe('foo_bar')
  })

  it('should handle acronyms', () => {
    expect(snakeCase('HTMLParser')).toBe('html_parser')
    expect(snakeCase('XMLHttpRequest')).toBe('xml_http_request')
  })

  it('should handle single words', () => {
    expect(snakeCase('foo')).toBe('foo')
    expect(snakeCase('FOO')).toBe('foo')
  })

  it('should handle empty strings', () => {
    expect(snakeCase('')).toBe('')
  })

  it('should handle special characters only', () => {
    expect(snakeCase('---')).toBe('')
    expect(snakeCase('___')).toBe('')
  })

  it('should handle numbers in string', () => {
    expect(snakeCase('test123Case')).toBe('test123_case')
    expect(snakeCase('foo2Bar')).toBe('foo2_bar')
  })
})
