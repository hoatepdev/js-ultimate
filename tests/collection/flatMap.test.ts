import { describe, it, expect } from 'vitest'
import { flatMap } from '../../src/collection/flatMap'

describe('flatMap', () => {
  it('should map and flatten results', () => {
    expect(flatMap([1, 2, 3], n => [n, n * 2])).toEqual([1, 2, 2, 4, 3, 6])
  })

  it('should flatten one level only', () => {
    expect(
      flatMap(
        [
          [1, 2],
          [3, 4]
        ],
        x => x
      )
    ).toEqual([1, 2, 3, 4])
  })

  it('should split strings', () => {
    expect(flatMap(['hello world', 'foo bar'], s => s.split(' '))).toEqual([
      'hello',
      'world',
      'foo',
      'bar'
    ])
  })

  it('should handle non-array return values', () => {
    expect(flatMap([1, 2, 3], x => x * 2)).toEqual([2, 4, 6])
  })

  it('should handle empty array', () => {
    expect(flatMap([], (x: number) => [x])).toEqual([])
  })

  it('should handle empty return arrays', () => {
    expect(flatMap([1, 2, 3], () => [])).toEqual([])
  })

  it('should provide index to iteratee', () => {
    expect(flatMap(['a', 'b', 'c'], (v, i) => [v, i])).toEqual([
      'a',
      0,
      'b',
      1,
      'c',
      2
    ])
  })

  it('should handle mixed array and non-array returns', () => {
    expect(flatMap([1, 2, 3], n => (n === 2 ? [20, 21] : n))).toEqual([
      1, 20, 21, 3
    ])
  })
})
