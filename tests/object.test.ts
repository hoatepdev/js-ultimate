import * as _ from '../src/object'

describe('object module', () => {
  describe('merge function', () => {
    test('merges objects', () => {
      const result = _.merge({ a: 1 } as any, { b: 2 }, { c: 3 })
      expect(result).toEqual({ a: 1, b: 2, c: 3 })
    })
    
    test('merges nested objects', () => {
      const result = _.merge({ a: { x: 1 } } as any, { a: { y: 2 } })
      expect(result).toEqual({ a: { x: 1, y: 2 } })
    })
    
    test('overwrites primitive values', () => {
      const result = _.merge({ a: 1 }, { a: 2 })
      expect(result).toEqual({ a: 2 })
    })
  })

  describe('pick function', () => {
    test('picks specified properties', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 }
      const result = _.pick(obj, ['a', 'c'])
      expect(result).toEqual({ a: 1, c: 3 })
    })
    
    test('handles non-existent properties', () => {
      const obj = { a: 1, b: 2 }
      const result = _.pick(obj, ['a', 'c'] as any)
      expect(result).toEqual({ a: 1 })
    })
  })

  describe('omit function', () => {
    test('omits specified properties', () => {
      const obj = { a: 1, b: 2, c: 3, d: 4 }
      const result = _.omit(obj, ['b', 'd'])
      expect(result).toEqual({ a: 1, c: 3 })
    })
    
    test('handles non-existent properties', () => {
      const obj = { a: 1, b: 2 }
      const result = _.omit(obj, ['c'] as any)
      expect(result).toEqual({ a: 1, b: 2 })
    })
  })

  describe('cloneDeep function', () => {
    test('creates deep clone of object', () => {
      const original = { a: { b: { c: 1 } } }
      const cloned = _.cloneDeep(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.a).not.toBe(original.a)
      expect(cloned.a.b).not.toBe(original.a.b)
    })
    
    test('clones arrays deeply', () => {
      const original = [{ a: 1 }, { b: 2 }]
      const cloned = _.cloneDeep(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned[0]).not.toBe(original[0])
    })
    
    test('clones dates', () => {
      const date = new Date('2023-01-01')
      const cloned = _.cloneDeep(date)
      
      expect(cloned).toEqual(date)
      expect(cloned).not.toBe(date)
    })
    
    test('handles primitive values', () => {
      expect(_.cloneDeep(42)).toBe(42)
      expect(_.cloneDeep('hello')).toBe('hello')
      expect(_.cloneDeep(null)).toBe(null)
    })
  })

  describe('invert function', () => {
    test('inverts object keys and values', () => {
      const result = _.invert({ a: 1, b: 2, c: 1 })
      expect(result).toEqual({ '1': 'c', '2': 'b' })
    })
    
    test('handles string values', () => {
      const result = _.invert({ firstName: 'John', lastName: 'Doe' })
      expect(result).toEqual({ John: 'firstName', Doe: 'lastName' })
    })
  })
})