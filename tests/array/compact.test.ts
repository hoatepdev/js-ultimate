import { describe, it, expect } from 'vitest'
import { compact } from '../../src/array/compact'

describe('compact', () => {
  it('should remove falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3])).toEqual([1, 2, 3])
  })

  it('should remove null and undefined', () => {
    expect(compact([null, undefined, 'hello', 0])).toEqual(['hello'])
  })

  it('should remove NaN', () => {
    expect(compact([NaN, 1, NaN, 2])).toEqual([1, 2])
  })

  it('should return empty array when all falsy', () => {
    expect(compact([0, false, null, undefined, '', NaN])).toEqual([])
  })

  it('should return same values when no falsy', () => {
    expect(compact([1, 2, 3])).toEqual([1, 2, 3])
  })
})
