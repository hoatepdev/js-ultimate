import { describe, it, expect } from 'vitest'
import { uniqBy } from '../../src/array/uniqBy'

describe('uniqBy', () => {
  it('should remove duplicates based on iteratee function', () => {
    const items = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' }
    ]
    const result = uniqBy(items, item => item.id)
    expect(result).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ])
  })

  it('should work with property key string', () => {
    const items = [{ x: 1 }, { x: 2 }, { x: 1 }]
    const result = uniqBy(items, 'x')
    expect(result).toEqual([{ x: 1 }, { x: 2 }])
  })

  it('should preserve order of first occurrences', () => {
    const items = [
      { id: 2, value: 'b' },
      { id: 1, value: 'a' },
      { id: 2, value: 'c' }
    ]
    const result = uniqBy(items, item => item.id)
    expect(result).toEqual([
      { id: 2, value: 'b' },
      { id: 1, value: 'a' }
    ])
  })

  it('should handle function iteratees', () => {
    const result = uniqBy([2.1, 1.2, 2.3], Math.floor)
    expect(result).toEqual([2.1, 1.2])
  })

  it('should handle case-insensitive string comparison', () => {
    const result = uniqBy(['a', 'b', 'A', 'B'], s => s.toLowerCase())
    expect(result).toEqual(['a', 'b'])
  })

  it('should handle empty arrays', () => {
    expect(uniqBy([], (x: any) => x)).toEqual([])
  })

  it('should handle arrays with single element', () => {
    const result = uniqBy([{ x: 1 }], item => item.x)
    expect(result).toEqual([{ x: 1 }])
  })

  it('should handle all unique items', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
    const result = uniqBy(items, 'id')
    expect(result).toEqual(items)
  })

  it('should handle all duplicate items', () => {
    const items = [{ id: 1 }, { id: 1 }, { id: 1 }]
    const result = uniqBy(items, 'id')
    expect(result).toEqual([{ id: 1 }])
  })

  it('should work with number keys', () => {
    const items = [
      [1, 'a'],
      [2, 'b'],
      [1, 'c']
    ]
    const result = uniqBy(items, item => item[0])
    expect(result).toEqual([
      [1, 'a'],
      [2, 'b']
    ])
  })

  it('should handle null and undefined values', () => {
    const items = [
      { id: null, value: 'a' },
      { id: undefined, value: 'b' },
      { id: null, value: 'c' }
    ]
    const result = uniqBy(items, item => item.id)
    expect(result).toEqual([
      { id: null, value: 'a' },
      { id: undefined, value: 'b' }
    ])
  })
})
