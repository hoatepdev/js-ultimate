import { describe, it, expect } from 'vitest'
import { find } from '../../src/collection/find'

describe('find', () => {
  it('should find first matching element', () => {
    expect(find([1, 2, 3, 4], n => n > 2)).toBe(3)
  })

  it('should find by string match', () => {
    expect(find(['a', 'b', 'c'], v => v === 'b')).toBe('b')
  })

  it('should find object by property', () => {
    expect(find([{ id: 1 }, { id: 2 }], obj => obj.id === 2)).toEqual({ id: 2 })
  })

  it('should return undefined when no match', () => {
    expect(find([1, 2, 3], n => n > 10)).toBeUndefined()
  })

  it('should handle empty arrays', () => {
    expect(find([], () => true)).toBeUndefined()
  })
})
