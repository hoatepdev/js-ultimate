import { describe, it, expect } from 'vitest'
import { camelCase } from '../../src/string/camelCase'

describe('camelCase', () => {
  it('should convert space-separated words', () => {
    expect(camelCase('foo bar')).toBe('fooBar')
  })

  it('should handle dashed strings', () => {
    expect(camelCase('--foo-bar--')).toBe('fooBar')
  })

  it('should handle underscored strings', () => {
    expect(camelCase('__FOO_BAR__')).toBe('fooBar')
  })

  it('should handle empty strings', () => {
    expect(camelCase('')).toBe('')
  })

  it('should handle single words', () => {
    expect(camelCase('foo')).toBe('foo')
    expect(camelCase('FOO')).toBe('foo')
  })
})
