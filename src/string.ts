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
