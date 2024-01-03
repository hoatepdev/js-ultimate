import * as _ from '../typed'

describe('typed module', () => {
  describe('isArray function', () => {
    test('returns false for null', () => {
      expect(_.isArray(null)).toBe(false)
    })
    test('returns false for undefined', () => {
      expect(_.isArray(undefined)).toBe(false)
    })
    test('returns false for boolean', () => {
      expect(_.isArray(true)).toBe(false)
    })
    test('returns false for object', () => {
      expect(_.isArray({})).toBe(false)
    })
    test('returns false for class instance', () => {
      class Data {}
      expect(_.isArray(new Data())).toBe(false)
    })
    test('returns false for number', () => {
      expect(_.isArray(68)).toBe(false)
    })
    test('returns false for string', () => {
      expect(_.isArray('blabla')).toBe(false)
    })
    test('returns true for array', () => {
      expect(_.isArray([1, 2, 3])).toBe(true)
    })
    test('returns true for empty array', () => {
      expect(_.isArray([])).toBe(true)
    })
  })

  describe('isObject function', () => {
    test('returns false for null', () => {
      expect(_.isObject(null)).toBe(false)
    })
    test('returns false for undefined', () => {
      expect(_.isObject(undefined)).toBe(false)
    })
    test('returns false for boolean', () => {
      expect(_.isObject(false)).toBe(false)
    })
    test('returns false for class instance', () => {
      class Data {}
      expect(_.isObject(new Data())).toEqual(false)
    })
    test('returns false for number', () => {
      expect(_.isObject(0)).toBe(false)
    })
    test('returns false for string', () => {
      expect(_.isObject('123')).toBe(false)
    })
    test('returns false for array', () => {
      expect(_.isObject(['a'])).toEqual(false)
    })
    test('returns true for object', () => {
      expect(_.isObject({ a: 1 })).toEqual(true)
    })
    test('returns true for empty object', () => {
      expect(_.isObject({})).toEqual(true)
    })
  })

  describe('isFunction function', () => {
    test('returns false for null', () => {
      expect(_.isFunction(null)).toBe(false)
    })
    test('returns false for undefined', () => {
      expect(_.isFunction(undefined)).toBe(false)
    })
    test('returns false for boolean', () => {
      expect(_.isFunction(true)).toBe(false)
    })
    test('returns false for class instance', () => {
      class Data {}
      expect(_.isFunction(new Data())).toBe(false)
    })
    test('returns false for number', () => {
      expect(_.isFunction(888)).toBe(false)
    })
    test('returns false for string', () => {
      expect(_.isFunction('string')).toBe(false)
    })
    test('returns false for array', () => {
      expect(_.isFunction([])).toBe(false)
    })
    test('returns false for object', () => {
      expect(_.isFunction({})).toBe(false)
    })
    test('returns true for anonymous function', () => {
      expect(
        _.isFunction(function () {
          return 'hello'
        })
      ).toBe(true)
    })
    test('returns true for arrow function', () => {
      expect(
        _.isFunction(() => {
          return 'hello'
        })
      ).toBe(true)
    })
    test('returns true for named function', () => {
      function sayHello() {
        return 'hello'
      }
      expect(_.isFunction(sayHello)).toBe(true)
    })
  })
})
