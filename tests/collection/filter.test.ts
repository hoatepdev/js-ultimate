import { describe, it, expect } from 'vitest';
import { filter } from '../../src/collection/filter';

describe('filter', () => {
  it('should filter even numbers', () => {
    expect(filter([1, 2, 3, 4], n => n % 2 === 0)).toEqual([2, 4]);
  });

  it('should filter by index', () => {
    expect(filter(['a', 'b', 'c', 'd'], (v, i) => i > 1)).toEqual(['c', 'd']);
  });

  it('should filter objects by property', () => {
    expect(filter([{ active: true }, { active: false }], obj => obj.active)).toEqual([{ active: true }]);
  });

  it('should return empty array when no matches', () => {
    expect(filter([1, 2, 3], n => n > 10)).toEqual([]);
  });

  it('should handle empty arrays', () => {
    expect(filter([], () => true)).toEqual([]);
  });
});
