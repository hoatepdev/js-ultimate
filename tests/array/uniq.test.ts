import { describe, it, expect } from 'vitest'
import { uniq } from '../../src/array/uniq'

describe('uniq', () => {
  it('should remove duplicate numbers', () => {
    expect(uniq([2, 1, 2, 3, 1])).toEqual([2, 1, 3])
  })

  it('should remove duplicate strings', () => {
    expect(uniq(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
  })

  it('should preserve type differences', () => {
    expect(uniq([1, '1', 2, '2'])).toEqual([1, '1', 2, '2'])
  })

  it('should handle empty arrays', () => {
    expect(uniq([])).toEqual([])
  })

  it('should handle arrays with no duplicates', () => {
    expect(uniq([1, 2, 3])).toEqual([1, 2, 3])
  })
})
