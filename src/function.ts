/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns Returns the new debounced function
 * @example
 * const debounced = debounce(() => console.log('Hello'), 1000)
 * debounced() // Will only execute after 1 second of no more calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Creates a throttled function that only invokes func at most once per every wait milliseconds
 * @param func - The function to throttle
 * @param wait - The number of milliseconds to throttle invocations to
 * @returns Returns the new throttled function
 * @example
 * const throttled = throttle(() => console.log('Hello'), 1000)
 * throttled() // Will execute immediately, then wait 1 second before allowing next execution
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), wait)
    }
  }
}

/**
 * Creates a function that is restricted to invoking func once
 * @param func - The function to restrict
 * @returns Returns the new restricted function
 * @example
 * const initialize = once(() => console.log('Initialized'))
 * initialize() // Logs 'Initialized'
 * initialize() // Does nothing
 */
export const once = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => ReturnType<T> | undefined) => {
  let called = false
  let result: ReturnType<T>
  return (...args: Parameters<T>) => {
    if (!called) {
      called = true
      result = func(...args)
      return result
    }
    return result
  }
}

/**
 * Creates a function that memoizes the result of func
 * @param func - The function to have its output memoized
 * @returns Returns the new memoized function
 * @example
 * const memoized = memoize((n: number) => n * 2)
 * memoized(5) // Calculates and caches result
 * memoized(5) // Returns cached result
 */
export const memoize = <T extends (...args: any[]) => any>(
  func: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  const cache = new Map<string, ReturnType<T>>()
  return (...args: Parameters<T>) => {
    let key: string
    try {
      key = JSON.stringify(args)
    } catch {
      key = args.map(arg => String(arg)).join(',')
    }
    if (cache.has(key)) {
      return cache.get(key)!
    }
    const result = func(...args)
    cache.set(key, result)
    return result
  }
}
