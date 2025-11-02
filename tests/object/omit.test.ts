import { describe, it, expect } from 'vitest';
import { omit } from '../../src/object/omit';

describe('omit', () => {
  it('should omit specified keys', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ b: 2 });
  });

  it('should omit single key', () => {
    expect(omit({ name: 'John', age: 30, city: 'NYC' }, ['age'])).toEqual({ name: 'John', city: 'NYC' });
  });

  it('should return copy when omitting no keys', () => {
    expect(omit({ x: 1, y: 2 }, [])).toEqual({ x: 1, y: 2 });
  });

  it('should handle non-existent keys', () => {
    expect(omit({ a: 1, b: 2 }, ['c'] as any)).toEqual({ a: 1, b: 2 });
  });

  it('should not mutate original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['a']);
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    expect(result).toEqual({ b: 2, c: 3 });
  });
});
