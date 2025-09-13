import { isString } from './typed'

export const capitalize = (value: string): string => {
  if (!isString(value)) return ''
  return value[0].toUpperCase() + value.slice(1)
}

export const trim = (value: string, charsToTrim: string = ' '): string => {
  if (!isString(value)) return ''
  const toTrim = charsToTrim.replace(/[\W]{1}/g, '\\$&')
  const regex = new RegExp(`^[${toTrim}]+|[${toTrim}]+$`, 'g')
  return value.replace(regex, '')
}

/**
 * Converts string to camel case
 * @param value - The string to convert
 * @returns Returns the camel cased string
 * @example
 * camelCase('Foo Bar') // 'fooBar'
 * camelCase('--foo-bar--') // 'fooBar'
 * camelCase('__FOO_BAR__') // 'fooBar'
 */
export const camelCase = (value: string): string => {
  if (!isString(value)) return ''

  return value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(word => word.length > 0)
    .map((word, index) => {
      const lowerWord = word.toLowerCase()
      if (index === 0) {
        return lowerWord
      }
      return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1)
    })
    .join('')
}

/**
 * Converts string to kebab case
 * @param value - The string to convert
 * @returns Returns the kebab cased string
 * @example
 * kebabCase('Foo Bar') // 'foo-bar'
 * kebabCase('fooBar') // 'foo-bar'
 * kebabCase('__FOO_BAR__') // 'foo-bar'
 */
export const kebabCase = (value: string): string => {
  if (!isString(value)) return ''
  return value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}
