import { describe, it, expect } from 'vitest'
import { groupBy } from '../../src/collection/groupBy'

describe('groupBy', () => {
  it('should group by function result', () => {
    expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
      '4': [4.2],
      '6': [6.1, 6.3]
    })
  })

  it('should group by property name', () => {
    const users = [
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 30 },
      { name: 'Carol', age: 20 }
    ]
    const result = groupBy(users, 'age')
    expect(result['20']).toEqual([
      { name: 'Alice', age: 20 },
      { name: 'Carol', age: 20 }
    ])
    expect(result['30']).toEqual([{ name: 'Bob', age: 30 }])
  })

  it('should group by string length', () => {
    expect(groupBy(['one', 'two', 'three'], v => v.length)).toEqual({
      '3': ['one', 'two'],
      '5': ['three']
    })
  })

  it('should handle empty array', () => {
    expect(groupBy([], (v: number) => v)).toEqual({})
  })

  it('should not have prototype properties on result', () => {
    const result = groupBy([1], () => 'a')
    expect(Object.getPrototypeOf(result)).toBe(null)
  })
})
