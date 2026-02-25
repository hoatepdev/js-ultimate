import { describe, it, expect } from 'vitest'
import { keyBy } from '../../src/collection/keyBy'

describe('keyBy', () => {
  it('should key by property name', () => {
    const items = [
      { id: 'a1', name: 'Alice' },
      { id: 'b2', name: 'Bob' }
    ]
    expect(keyBy(items, 'id')).toEqual({
      a1: { id: 'a1', name: 'Alice' },
      b2: { id: 'b2', name: 'Bob' }
    })
  })

  it('should key by function result', () => {
    expect(keyBy([1.2, 2.4, 3.6], Math.floor)).toEqual({
      '1': 1.2,
      '2': 2.4,
      '3': 3.6
    })
  })

  it('should use last element for duplicate keys', () => {
    const items = [
      { type: 'a', val: 1 },
      { type: 'a', val: 2 }
    ]
    expect(keyBy(items, 'type')).toEqual({
      a: { type: 'a', val: 2 }
    })
  })

  it('should handle empty array', () => {
    expect(keyBy([], (v: number) => v)).toEqual({})
  })

  it('should not have prototype properties on result', () => {
    const result = keyBy([1], () => 'a')
    expect(Object.getPrototypeOf(result)).toBe(null)
  })
})
