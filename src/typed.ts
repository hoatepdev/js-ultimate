export const isArray = Array.isArray

export const isObject = (value: unknown): boolean => {
  return !!value && value.constructor === Object
}

export const isFunction = (value: unknown): boolean => {
  return typeof value === 'function'
}

export const isString = (value: unknown): boolean => {
  return typeof value === 'string'
}

export const isNumber = (value: unknown): boolean => {
  return Number(value) === value
}

export const isDate = (value: unknown): boolean => {
  return value instanceof Date
}

export const isPromise = (value: any): boolean => {
  if (!value) return false
  if (!value.then) return false
  if (!isFunction(value.then)) return false
  return true
}

export const isSymbol = (value: unknown): boolean => {
  return typeof value === 'symbol'
}

export const isNil = (value: unknown): boolean => {
  return value === null || value === undefined
}

export const isEmpty = (value: any) => {
  if (value === true || value === false) return true
  if (value === null || value === undefined) return true
  if (isNumber(value)) return value === 0
  if (isDate(value)) return isNaN(value.getTime())
  if (isFunction(value)) return false
  if (isNumber(value.length)) return value.length === 0
  if (isNumber(value.size)) return value.size === 0
  return Object.keys(value).length === 0
}

const deepEqual = (object1: any, object2: any) => {
  const keys1 = Object.keys(object1)
  const keys2 = Object.keys(object2)

  if (keys1.length !== keys2.length) {
    return false
  }

  // if (keys1.length === keys2.length && keys1.length === 0) {
  //   return true
  // }

  for (const key of keys1) {
    const val1 = object1[key]
    const val2 = object2[key]
    const areObjects = isObject(val1) && isObject(val2)
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false
    }
  }

  return true
}

export const isEqual = <T>(x: T, y: T) => {
  if (Object.is(x, y)) return true
  if (x instanceof Date && y instanceof Date) return x.getDate() === y.getDate()
  if (
    typeof x === 'object' &&
    typeof y === 'object' &&
    x !== null &&
    y !== null
  ) {
    return deepEqual(x, y)
  }
  return false
}
