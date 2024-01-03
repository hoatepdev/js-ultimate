import * as _ from '../typed'

describe('typed module', () => {
  describe('isArray function', () => {
    test('return null', () => {
      expect(_.isArray(null)).toBe(false)
    })
  })
})
