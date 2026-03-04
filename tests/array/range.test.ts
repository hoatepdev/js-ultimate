import { describe, it, expect } from 'vitest'
import { range } from '../../src/array/range'

describe('range', () => {
  it('should create range from 0 to end with single argument', () => {
    expect(range(4)).toEqual([0, 1, 2, 3])
    expect(range(1)).toEqual([0])
    expect(range(0)).toEqual([])
  })

  it('should create range from start to end', () => {
    expect(range(0, 4)).toEqual([0, 1, 2, 3])
    expect(range(1, 5)).toEqual([1, 2, 3, 4])
    expect(range(-2, 2)).toEqual([-2, -1, 0, 1])
  })

  it('should create range with custom step', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8])
    expect(range(0, 5, 2)).toEqual([0, 2, 4])
    expect(range(1, 10, 3)).toEqual([1, 4, 7])
  })

  it('should create descending range with negative step', () => {
    expect(range(5, 1, -1)).toEqual([5, 4, 3, 2])
    expect(range(10, 0, -2)).toEqual([10, 8, 6, 4, 2])
    expect(range(3, 0, -1)).toEqual([3, 2, 1])
  })

  it('should handle empty ranges', () => {
    expect(range(0, 0)).toEqual([])
    expect(range(5, 5)).toEqual([])
    expect(range(5, 1)).toEqual([]) // start > end with positive step
    expect(range(1, 5, -1)).toEqual([]) // start < end with negative step
  })

  it('should handle step of zero', () => {
    expect(range(0, 5, 0)).toEqual([])
  })

  it('should handle negative ranges', () => {
    expect(range(-5, -1)).toEqual([-5, -4, -3, -2])
    expect(range(-1, -5, -1)).toEqual([-1, -2, -3, -4])
  })

  it('should handle single element ranges', () => {
    expect(range(0, 1)).toEqual([0])
    expect(range(5, 6, 1)).toEqual([5])
  })

  it('should work with large ranges', () => {
    expect(range(1000).length).toBe(1000)
    expect(range(0, 100, 10)).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90])
  })

  it('should handle fractional step', () => {
    expect(range(0, 3, 0.5)).toEqual([0, 0.5, 1, 1.5, 2, 2.5])
  })
})
