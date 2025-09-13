import * as _ from '../src/typed'

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

  describe('isString function', () => {
    test('returns false for null', () => {
      expect(_.isString(null)).toBe(false)
    })
    test('returns false for undefined', () => {
      expect(_.isString(undefined)).toBe(false)
    })
    test('returns false for boolean', () => {
      expect(_.isString(false)).toBe(false)
    })
    test('returns false for class instance', () => {
      class Data {}
      expect(_.isString(new Data())).toBe(false)
    })
    test('returns false for number', () => {
      expect(_.isString(22)).toBe(false)
    })
    test('returns false for array', () => {
      expect(_.isString(['1', '2'])).toBe(false)
    })
    test('returns false for object', () => {
      expect(_.isString({})).toBe(false)
    })
    test('returns true for string', () => {
      expect(_.isString('abc')).toBe(true)
    })
    test('returns true for string class', () => {
      expect(_.isString(String('123'))).toBe(true)
    })
  })

  describe('isNumber function', () => {
    test('returns false for null', () => {
      expect(_.isNumber(null)).toBe(false)
    })
    test('returns false for undefined', () => {
      expect(_.isNumber(undefined)).toBe(false)
    })
    test('returns false for boolean', () => {
      expect(_.isNumber(false)).toBe(false)
    })
    test('returns false for class instance', () => {
      class Data {}
      expect(_.isNumber(new Data())).toBe(false)
    })
    test('returns true for int', () => {
      expect(_.isNumber(22)).toBe(true)
    })
    test('returns true for float', () => {
      expect(_.isNumber(22.0567)).toBe(true)
    })
    test('returns false for NaN', () => {
      expect(_.isNumber(NaN)).toBe(false)
    })
    test('returns false for array', () => {
      expect(_.isNumber([1, 2, 3])).toBe(false)
    })
    test('returns false for object', () => {
      expect(_.isNumber({})).toBe(false)
    })
    test('returns false for string', () => {
      expect(_.isNumber('abc')).toBe(false)
    })
    test('returns false for string class', () => {
      expect(_.isNumber(String('123'))).toBe(false)
    })
  })

  describe('isEmpty function', () => {
    class DataEmpty {}
    class Data {
      name: string = 'hoatep'
    }

    const map = new Map()
    map.set('a', 1)

    test('returns true for empty values', () => {
      expect(_.isEmpty(null)).toBe(true)
      expect(_.isEmpty(undefined)).toBe(true)
      expect(_.isEmpty(new DataEmpty())).toBe(true)
      expect(_.isEmpty(0)).toBe(true)
      expect(_.isEmpty(true)).toBe(true)
      expect(_.isEmpty([])).toBe(true)
      expect(_.isEmpty(false)).toBe(true)
      expect(_.isEmpty({})).toBe(true)
      expect(_.isEmpty('')).toBe(true)
      expect(_.isEmpty(String())).toBe(true)
      expect(_.isEmpty(new Map())).toBe(true)
      expect(_.isEmpty(new Date('invalid value'))).toBe(true)
    })

    test('returns false for non-empty values', () => {
      expect(_.isEmpty(new Date())).toBe(false)
      expect(_.isEmpty(new Date('2022-09-01T02:19:55.976Z'))).toBe(false)
      expect(_.isEmpty(22)).toBe(false)
      expect(_.isEmpty(new Data())).toBe(false)
      expect(_.isEmpty({ b: 2 })).toBe(false)
      expect(_.isEmpty('abc')).toBe(false)
      expect(_.isEmpty(String('abc'))).toBe(false)
      expect(_.isEmpty([1, 2, 3])).toBe(false)
      expect(_.isEmpty(function func() {})).toBe(false)
      expect(_.isEmpty(() => {})).toBe(false)
      expect(_.isEmpty(map)).toBe(false)
    })
  })

  describe('isDate function', () => {
    test('return true for Date values', () => {
      expect(_.isDate(new Date())).toBe(true)
      expect(_.isDate(new Date('2022-09-01T02:19:55.976Z'))).toBe(true)
      expect(_.isDate(new Date('invalid value'))).toBe(true)
    })
    test('return false for non-Date values', () => {
      expect(_.isDate(22)).toBe(false)
      expect(_.isDate({ a: 1 })).toBe(false)
      expect(_.isDate('abc')).toBe(false)
      expect(_.isDate(String('bla'))).toBe(false)
      expect(_.isDate([1, 2, 3])).toBe(false)
      expect(_.isDate(function func() {})).toBe(false)
      expect(_.isDate(() => {})).toBe(false)
    })
  })


  describe('isEqual function', () => {
    class Person {
      name: string
      friends: Person[] = []
      self?: Person
      constructor(name: string) {
        this.name = name
      }
    }
    const jake = new Person('jake')
    jake.self = jake
    jake.friends = [jake, jake]
    const symbolKey = Symbol('symkey')
    const complex = {
      num: 0,
      str: '',
      boolean: true,
      unf: void 0,
      nul: null,
      obj: { name: 'object', id: 1, chilren: [0, 1, 2] },
      arr: [0, 1, 2],
      func() {},
      loop: null as any,
      person: jake,
      date: new Date(0),
      reg: new RegExp('/regexp/ig'),
      [symbolKey]: 'symbol'
    }
    complex.loop = { ...complex }
    const now = new Date()

    test('returns true for equal things', () => {
      expect(_.isEqual(0, 0)).toBe(true)
      expect(_.isEqual('a', 'a')).toBe(true)
      expect(_.isEqual({}, {})).toBe(true)
      expect(_.isEqual(true, true)).toBe(true)
      expect(_.isEqual(now, now)).toBe(true)
      expect(_.isEqual([], [])).toBe(true)
      expect(_.isEqual(complex, { ...complex })).toBe(true)
      expect(
        _.isEqual([complex, complex], [{ ...complex }, { ...complex }])
      ).toBe(true)
    })
    test('returns false for non-equal things', () => {
      expect(_.isEqual(0, 1)).toBe(false)
      expect(_.isEqual('a', 'b')).toBe(false)
      expect(_.isEqual(Symbol('hello'), Symbol('goodbye'))).toBe(false)
      expect(_.isEqual({ a: 20 }, { a: 21 })).toBe(false)
      expect(_.isEqual(true, false)).toBe(false)
      expect(_.isEqual(new Date(), new Date('2022-09-01T03:25:12.750Z'))).toBe(
        false
      )
      expect(_.isEqual([], [1])).toBe(false)
      expect(_.isEqual(complex, { ...complex, num: 222 })).toBe(false)
      expect(_.isEqual([complex], [{ ...complex, num: 222 }])).toBe(false)
    })
  })
})
