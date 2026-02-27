import { describe, it, expect } from 'vitest'
import { clamp } from '../../src/lang/clamp'

describe('clamp', () => {
  it('should return number when within bounds', () => {
    expect(clamp(5, 1, 10)).toBe(5)
    expect(clamp(1, 1, 10)).toBe(1)
    expect(clamp(10, 1, 10)).toBe(10)
  })

  it('should clamp to lower bound', () => {
    expect(clamp(-5, 0, 100)).toBe(0)
    expect(clamp(0, 1, 10)).toBe(1)
    expect(clamp(-100, -50, 50)).toBe(-50)
  })

  it('should clamp to upper bound', () => {
    expect(clamp(150, 0, 100)).toBe(100)
    expect(clamp(1000, 1, 10)).toBe(10)
    expect(clamp(100, -50, 50)).toBe(50)
  })

  it('should handle reversed bounds', () => {
    expect(clamp(5, 10, 1)).toBe(5)
    expect(clamp(-5, 100, 0)).toBe(0)
    expect(clamp(150, 100, 0)).toBe(100)
  })

  it('should handle negative numbers', () => {
    expect(clamp(-10, -20, -5)).toBe(-10)
    expect(clamp(-25, -20, -5)).toBe(-20)
    expect(clamp(-3, -20, -5)).toBe(-5)
  })

  it('should handle decimal numbers', () => {
    expect(clamp(0.5, 0, 1)).toBe(0.5)
    expect(clamp(1.5, 0, 1)).toBe(1)
    expect(clamp(-0.5, 0, 1)).toBe(0)
  })

  it('should handle equal bounds', () => {
    expect(clamp(5, 10, 10)).toBe(10)
    expect(clamp(15, 10, 10)).toBe(10)
  })

  it('should handle zero', () => {
    expect(clamp(0, -10, 10)).toBe(0)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('should handle very large numbers', () => {
    expect(clamp(Number.MAX_VALUE, 0, 100)).toBe(100)
    expect(clamp(Number.MIN_VALUE, 0, 100)).toBe(Number.MIN_VALUE)
  })
})
