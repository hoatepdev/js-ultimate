import { isString } from './typed'

export const capitalize = (value: string): string => {
  if (!isString(value)) return ''
  return value[0].toUpperCase() + value.slice(1)
}
