import { describe, it, expect } from 'vitest'
import { truncate } from '../../src/string/truncate'

describe('truncate', () => {
  it('should truncate long strings', () => {
    expect(truncate('hi-diddly-ho there, neighborino')).toBe(
      'hi-diddly-ho there, neighbo...'
    )
  })

  it('should not truncate short strings', () => {
    expect(truncate('hello world')).toBe('hello world')
    expect(truncate('')).toBe('')
  })

  it('should respect custom length', () => {
    expect(truncate('hi-diddly-ho there, neighborino', { length: 24 })).toBe(
      'hi-diddly-ho there, n...'
    )
  })

  it('should handle length smaller than omission', () => {
    expect(truncate('hello world', { length: 2, omission: '...' })).toBe('...')
    expect(truncate('hello world', { length: 3, omission: '...' })).toBe('...')
    expect(truncate('hello world', { length: 4, omission: '...' })).toBe('h...')
  })

  it('should respect custom omission', () => {
    expect(
      truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' })
    ).toBe('hi-diddly-ho there, neig [...]')
  })

  it('should truncate at separator', () => {
    expect(
      truncate('hi-diddly-ho there, neighborino', {
        length: 24,
        separator: ' '
      })
    ).toBe('hi-diddly-ho there,...')
  })

  it('should handle regex separator', () => {
    expect(
      truncate('hi-diddly-ho there, neighborino', {
        length: 24,
        separator: /-/
      })
    ).toBe('hi-diddly...')
  })

  it('should handle strings at exact length boundary', () => {
    const str = 'a'.repeat(30)
    expect(truncate(str)).toBe(str)
    expect(truncate(str + 'b')).toBe(str.substring(0, 27) + '...')
  })

  it('should handle unicode strings', () => {
    expect(truncate('hello world 世界', { length: 10 })).toBe('hello w...')
  })

  it('should handle empty omission', () => {
    expect(truncate('hello world', { length: 5, omission: '' })).toBe('hello')
  })
})
