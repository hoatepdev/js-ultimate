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

  describe('trim function', () => {
    test('handles bad input', () => {
      expect(_.trim(null as any)).toBe('')
      expect(_.trim(undefined as any)).toBe('')
    })
    test('returns input string correctly trimmed', () => {
      expect(_.trim('\n\n\t\nhello\n\t  \n', '\n\t ')).toBe('hello')
      expect(_.trim('hello', 'x')).toBe('hello')
      expect(_.trim(' hello  ')).toBe('hello')
      expect(_.trim(' __hello__  ', '_')).toBe(' __hello__  ')
      expect(_.trim('__hello__', '_')).toBe('hello')
      expect(_.trim('//repos////', '/')).toBe('repos')
      expect(_.trim('/repos/:owner/:repo/', '/')).toBe('repos/:owner/:repo')
    })

    test('handles when char to trim is special case in regex', () => {
      expect(_.trim('_- hello_- ', '_- ')).toBe('hello')
    })
  })
})
