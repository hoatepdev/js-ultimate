export const isArray = Array.isArray

export const isObject = (value: unknown): boolean => {
  return (
    value != null && (typeof value === 'object' || typeof value === 'function')
  )
}

export const isFunction = (value: unknown): boolean => {
  return typeof value === 'function'
}

export const isString = (value: unknown): boolean => {
  return typeof value === 'string'
}

export const isNumber = (value: unknown): boolean => {
  return typeof value === 'number'
}

export const isDate = (value: unknown): boolean => {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export const isNil = <T>(val: T): boolean => {
  return val === null || val === undefined
}
