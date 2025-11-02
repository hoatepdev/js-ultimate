/**
 * Generates a random integer between min and max (inclusive)
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A random integer between min and max
 * @example
 * randomInt(1, 10) // Returns a random integer between 1 and 10
 */
export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Clamps number within the inclusive lower and upper bounds
 * @param number - The number to clamp
 * @param lower - The lower bound
 * @param upper - The upper bound
 * @returns Returns the clamped number
 * @example
 * clamp(-10, -5, 5) // -5
 * clamp(10, -5, 5) // 5
 * clamp(3, -5, 5) // 3
 */
export const clamp = (number: number, lower: number, upper: number): number => {
  return Math.max(lower, Math.min(number, upper))
}

/**
 * Creates a promise that resolves after a given number of milliseconds
 * @param ms - The number of milliseconds to wait
 * @returns A promise that resolves after the specified time
 * @example
 * await sleep(1000) // Waits for 1 second
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Recursively freezes an object, making it immutable
 * @param obj - The object to freeze
 * @returns The frozen object
 * @example
 * const frozen = deepFreeze({ a: { b: 1 } })
 * frozen.a.b = 2 // Will not change the value
 */
export const deepFreeze = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj

  Object.freeze(obj)

  Object.getOwnPropertyNames(obj).forEach(prop => {
    if ((obj as any)[prop] !== null && typeof (obj as any)[prop] === 'object') {
      deepFreeze((obj as any)[prop])
    }
  })

  return obj
}

/**
 * Gets the value at path of object
 * @param obj - The object to query
 * @param path - The path of the property to get
 * @param defaultValue - The value returned for undefined resolved values
 * @returns Returns the resolved value
 * @example
 * get({ a: { b: { c: 3 } } }, 'a.b.c') // 3
 * get({ a: { b: { c: 3 } } }, 'a.b.x', 'default') // 'default'
 */
export const get = <T = any>(obj: any, path: string, defaultValue?: T): T => {
  if (!obj || typeof obj !== 'object') return defaultValue as T

  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === null || result === undefined || !(key in result)) {
      return defaultValue as T
    }
    result = result[key]
  }

  return result as T
}
