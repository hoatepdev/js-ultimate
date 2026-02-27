import { describe, it, expect } from 'vitest'
import { kebabCase } from '../../src/string/kebabCase'

describe('kebabCase', () => {
  it('should convert space-separated words', () => {
    expect(kebabCase('foo bar')).toBe('foo-bar')
  })

  it('should convert camelCase to kebab-case', () => {
    expect(kebabCase('fooBar')).toBe('foo-bar')
    expect(kebabCase('fooBarBaz')).toBe('foo-bar-baz')
  })

  it('should convert PascalCase to kebab-case', () => {
    expect(kebabCase('FooBar')).toBe('foo-bar')
    expect(kebabCase('FooBarBaz')).toBe('foo-bar-baz')
  })

  it('should handle dashed strings', () => {
    expect(kebabCase('--foo-bar--')).toBe('foo-bar')
  })

  it('should handle underscored strings', () => {
    expect(kebabCase('__FOO_BAR__')).toBe('foo-bar')
    expect(kebabCase('foo_bar')).toBe('foo-bar')
  })

  it('should handle already kebab-case (idempotent)', () => {
    expect(kebabCase('foo-bar')).toBe('foo-bar')
  })

  it('should handle consecutive separators', () => {
    expect(kebabCase('foo--bar')).toBe('foo-bar')
    expect(kebabCase('foo___bar')).toBe('foo-bar')
  })

  it('should handle acronyms', () => {
    expect(kebabCase('HTMLParser')).toBe('html-parser')
    expect(kebabCase('XMLHttpRequest')).toBe('xml-http-request')
  })

  it('should handle single words', () => {
    expect(kebabCase('foo')).toBe('foo')
    expect(kebabCase('FOO')).toBe('foo')
  })

  it('should handle empty strings', () => {
    expect(kebabCase('')).toBe('')
  })

  it('should handle special characters only', () => {
    expect(kebabCase('---')).toBe('')
    expect(kebabCase('___')).toBe('')
  })

  it('should handle numbers in string', () => {
    expect(kebabCase('test123Case')).toBe('test123-case')
    expect(kebabCase('foo2Bar')).toBe('foo2-bar')
  })
})
