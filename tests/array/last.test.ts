import { describe, it, expect } from 'vitest';
import { last } from '../../src/array/last';

describe('last', () => {
  it('should return last element of array', () => {
    expect(last([1, 2, 3])).toBe(3);
  });

  it('should return undefined for empty array', () => {
    expect(last([])).toBeUndefined();
  });

  it('should handle string arrays', () => {
    expect(last(['a', 'b', 'c'])).toBe('c');
  });

  it('should handle object arrays', () => {
    const obj = { id: 2 };
    expect(last([{ id: 1 }, obj])).toBe(obj);
  });

  it('should handle single element arrays', () => {
    expect(last([42])).toBe(42);
  });
});
