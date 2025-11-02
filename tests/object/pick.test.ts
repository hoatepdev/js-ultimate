import { describe, it, expect } from 'vitest';
import { pick } from '../../src/object/pick';

describe('pick', () => {
  it('should pick specified keys', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('should pick multiple keys', () => {
    expect(pick({ name: 'John', age: 30, city: 'NYC' }, ['name', 'age'])).toEqual({ name: 'John', age: 30 });
  });

  it('should return empty object when picking no keys', () => {
    expect(pick({ x: 1, y: 2 }, [])).toEqual({});
  });

  it('should handle non-existent keys', () => {
    expect(pick({ a: 1, b: 2 }, ['a', 'c'] as any)).toEqual({ a: 1 });
  });

  it('should not mutate original object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = pick(obj, ['a']);
    expect(obj).toEqual({ a: 1, b: 2, c: 3 });
    expect(result).toEqual({ a: 1 });
  });
});
