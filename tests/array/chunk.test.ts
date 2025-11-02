import { describe, it, expect } from 'vitest';
import { chunk } from '../../src/array/chunk';

describe('chunk', () => {
  it('should split array into chunks of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('should handle arrays with exact chunk size', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
  });

  it('should return empty array for size less than 1', () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
    expect(chunk([1, 2, 3], -1)).toEqual([]);
  });

  it('should handle empty arrays', () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it('should handle chunk size larger than array length', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });
});
