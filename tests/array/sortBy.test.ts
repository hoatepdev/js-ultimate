import { describe, it, expect } from 'vitest'
import { sortBy } from '../../src/array/sortBy'

describe('sortBy', () => {
  it('should sort by iteratee function', () => {
    expect(sortBy([3, 1, 2], x => x)).toEqual([1, 2, 3])
  })

  it('should sort by property name', () => {
    const users = [
      { name: 'Bob', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Carol', age: 35 }
    ]
    expect(sortBy(users, 'age')).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Carol', age: 35 }
    ])
  })

  it('should sort strings by length', () => {
    expect(sortBy(['banana', 'apple', 'cherry'], s => s.length)).toEqual([
      'apple',
      'banana',
      'cherry'
    ])
  })

  it('should sort strings alphabetically', () => {
    expect(sortBy(['c', 'a', 'b'], x => x)).toEqual(['a', 'b', 'c'])
  })

  it('should not mutate the original array', () => {
    const original = [3, 1, 2]
    const sorted = sortBy(original, x => x)
    expect(sorted).toEqual([1, 2, 3])
    expect(original).toEqual([3, 1, 2])
  })

  it('should handle empty array', () => {
    expect(sortBy([], (x: number) => x)).toEqual([])
  })

  it('should handle single element', () => {
    expect(sortBy([42], x => x)).toEqual([42])
  })

  it('should handle equal values', () => {
    const items = [
      { name: 'Alice', group: 'a' },
      { name: 'Bob', group: 'a' },
      { name: 'Carol', group: 'b' }
    ]
    const result = sortBy(items, 'group')
    expect(result[0].group).toBe('a')
    expect(result[1].group).toBe('a')
    expect(result[2].group).toBe('b')
  })

  it('should sort negative numbers', () => {
    expect(sortBy([-3, -1, -2], x => x)).toEqual([-3, -2, -1])
  })
})
