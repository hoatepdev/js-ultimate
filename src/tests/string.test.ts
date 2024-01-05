import * as _ from '../string'

describe('string module', () => {
  describe('capitalize function', () => {
    test('returns empty string for non-string type', () => {
      expect(_.capitalize(null as any)).toBe('')
      expect(_.capitalize(undefined as any)).toBe('')
      expect(_.capitalize(true as any)).toBe('')
      class Data {}
      expect(_.capitalize(new Data() as any)).toBe('')
      expect(_.capitalize(22 as any)).toBe('')
      expect(_.capitalize(['1', '2'] as any)).toBe('')
      expect(_.capitalize({} as any)).toBe('')
    })
    test('returns capitalize string for string type', () => {
      expect(_.capitalize('abc') as any).toBe('Abc')
      expect(_.capitalize(String('123') as any)).toBe('123')
    })
  })
})
