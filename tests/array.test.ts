import * as _ from '../src/array'

describe('array module', () => {
  describe('first function', () => {
    test('returns first element of array', () => {
      expect(_.first([1, 2, 3])).toBe(1)
      expect(_.first(['a', 'b', 'c'])).toBe('a')
    })
    
    test('returns default value for empty array', () => {
      expect(_.first([], 'default')).toBe('default')
      expect(_.first([])).toBe(undefined)
    })
  })

  describe('group function', () => {
    test('groups array elements by key', () => {
      const result = _.group([1, 2, 3, 4], x => x % 2)
      expect(result).toEqual({ 1: [1, 3], 0: [2, 4] })
    })
    
    test('groups objects by property', () => {
      const users = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 30 }
      ]
      const result = _.group(users, user => user.age)
      expect(result).toEqual({
        30: [{ name: 'John', age: 30 }, { name: 'Bob', age: 30 }],
        25: [{ name: 'Jane', age: 25 }]
      })
    })
  })

  describe('uniq function', () => {
    test('removes duplicate values', () => {
      expect(_.uniq([1, 2, 2, 3, 1])).toEqual([1, 2, 3])
      expect(_.uniq(['a', 'b', 'a', 'c'])).toEqual(['a', 'b', 'c'])
    })
    
    test('handles empty array', () => {
      expect(_.uniq([])).toEqual([])
    })
  })

  describe('flatten function', () => {
    test('flattens array one level deep', () => {
      expect(_.flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4])
      expect(_.flatten([[1, 2], [3, 4]])).toEqual([1, 2, 3, 4])
    })
    
    test('does not flatten nested arrays beyond one level', () => {
      expect(_.flatten([1, [2, [3, 4]], 5])).toEqual([1, 2, [3, 4], 5])
    })
  })

  describe('chunk function', () => {
    test('creates chunks of specified size', () => {
      expect(_.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
      expect(_.chunk(['a', 'b', 'c', 'd'], 3)).toEqual([['a', 'b', 'c'], ['d']])
    })
    
    test('handles edge cases', () => {
      expect(_.chunk([], 2)).toEqual([])
      expect(_.chunk([1, 2, 3], 0)).toEqual([])
      expect(_.chunk([1, 2, 3], -1)).toEqual([])
    })
  })

  describe('range function', () => {
    test('creates range with start and end', () => {
      expect(_.range(0, 4)).toEqual([0, 1, 2, 3])
      expect(_.range(1, 5)).toEqual([1, 2, 3, 4])
    })
    
    test('creates range with step', () => {
      expect(_.range(0, 10, 2)).toEqual([0, 2, 4, 6, 8])
      expect(_.range(1, 10, 3)).toEqual([1, 4, 7])
    })
    
    test('creates range with only end parameter', () => {
      expect(_.range(4)).toEqual([0, 1, 2, 3])
    })
    
    test('handles negative step', () => {
      expect(_.range(0, -4, -1)).toEqual([0, -1, -2, -3])
    })
  })

  describe('compact function', () => {
    test('removes falsy values', () => {
      expect(_.compact([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3])
      expect(_.compact([true, 1, 'hello'])).toEqual([true, 1, 'hello'])
    })
    
    test('handles empty array', () => {
      expect(_.compact([])).toEqual([])
    })
  })

  describe('shuffle function', () => {
    test('returns array with same length', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = _.shuffle(original)
      expect(shuffled).toHaveLength(original.length)
      expect(shuffled.sort()).toEqual(original.sort())
    })
    
    test('does not modify original array', () => {
      const original = [1, 2, 3, 4, 5]
      const shuffled = _.shuffle(original)
      expect(original).toEqual([1, 2, 3, 4, 5])
      expect(shuffled).not.toBe(original)
    })
    
    test('handles empty array', () => {
      expect(_.shuffle([])).toEqual([])
    })
  })
})