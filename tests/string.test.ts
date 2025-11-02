import * as _ from '../src/string'

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

  describe('camelCase function', () => {
    test('returns empty string for non-string type', () => {
      expect(_.camelCase(null as any)).toBe('')
      expect(_.camelCase(undefined as any)).toBe('')
      expect(_.camelCase(123 as any)).toBe('')
    })

    test('converts strings to camel case', () => {
      expect(_.camelCase('Foo Bar')).toBe('fooBar')
      expect(_.camelCase('--foo-bar--')).toBe('fooBar')
      expect(_.camelCase('__FOO_BAR__')).toBe('fooBar')
      expect(_.camelCase('foo bar baz')).toBe('fooBarBaz')
      expect(_.camelCase('hello world')).toBe('helloWorld')
    })

    test('handles already camelCase strings', () => {
      expect(_.camelCase('fooBar')).toBe('fooBar')
      expect(_.camelCase('alreadyCamelCase')).toBe('alreadyCamelCase')
    })
  })

  describe('kebabCase function', () => {
    test('returns empty string for non-string type', () => {
      expect(_.kebabCase(null as any)).toBe('')
      expect(_.kebabCase(undefined as any)).toBe('')
      expect(_.kebabCase(123 as any)).toBe('')
    })

    test('converts strings to kebab case', () => {
      expect(_.kebabCase('Foo Bar')).toBe('foo-bar')
      expect(_.kebabCase('fooBar')).toBe('foo-bar')
      expect(_.kebabCase('__FOO_BAR__')).toBe('foo-bar')
      expect(_.kebabCase('HelloWorld')).toBe('hello-world')
      expect(_.kebabCase('HELLO_WORLD')).toBe('hello-world')
    })

    test('handles already kebab-case strings', () => {
      expect(_.kebabCase('foo-bar')).toBe('foo-bar')
      expect(_.kebabCase('already-kebab-case')).toBe('already-kebab-case')
    })

    test('handles edge cases', () => {
      expect(_.kebabCase('')).toBe('')
      expect(_.kebabCase('a')).toBe('a')
      expect(_.kebabCase('A')).toBe('a')
    })
  })
})
