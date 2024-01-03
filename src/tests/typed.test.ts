import * as _ from '../typed'

describe('typed module', () => {
  describe('isArray function', () => {
    test('return false for null', () => {
      expect(_.isArray(null)).toBe(false)
    })
    test('return false for undefined', () => {
      expect(_.isArray(undefined)).toBe(false)
    })
    test('return false for boolean', () => {
      expect(_.isArray(true)).toBe(false)
    })
    test('return false for object', () => {
      expect(_.isArray({})).toBe(false)
    })
    test('return false for class', () => {
      class Data {}
      expect(_.isArray(new Data())).toBe(false)
    })
    test('return false for number', () => {
      expect(_.isArray(68)).toBe(false)
    })
    test('return false for string', () => {
      expect(_.isArray('blabla')).toBe(false)
    })
    test('return true for array', () => {
      expect(_.isArray([1, 2, 3])).toBe(true)
    })
    test('return true for empty array', () => {
      expect(_.isArray([])).toBe(true)
    })
  })
})
