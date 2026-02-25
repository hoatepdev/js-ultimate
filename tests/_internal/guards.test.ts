import { describe, it, expect } from 'vitest'
import {
  validatePathDepth,
  checkRecursionDepth
} from '../../src/_internal/guards'

describe('validatePathDepth', () => {
  it('should not throw for normal paths', () => {
    expect(() => validatePathDepth(['a', 'b', 'c'])).not.toThrow()
  })

  it('should throw for paths exceeding max depth', () => {
    const longPath = Array.from({ length: 101 }, (_, i) => `key${i}`)
    expect(() => validatePathDepth(longPath)).toThrow(RangeError)
  })

  it('should not throw at exactly max depth', () => {
    const maxPath = Array.from({ length: 100 }, (_, i) => `key${i}`)
    expect(() => validatePathDepth(maxPath)).not.toThrow()
  })
})

describe('checkRecursionDepth', () => {
  it('should not throw for normal depth', () => {
    expect(() => checkRecursionDepth(10)).not.toThrow()
  })

  it('should throw when exceeding max recursion depth', () => {
    expect(() => checkRecursionDepth(51)).toThrow(RangeError)
  })

  it('should not throw at exactly max depth', () => {
    expect(() => checkRecursionDepth(50)).not.toThrow()
  })
})
