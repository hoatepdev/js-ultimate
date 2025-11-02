import { describe, it, expect } from 'vitest';
import { get } from '../../src/object/get';

describe('get', () => {
  it('should get nested property with string path', () => {
    expect(get({ a: { b: 2 } }, 'a.b')).toBe(2);
  });

  it('should get nested property with array path', () => {
    expect(get({ a: { b: 2 } }, ['a', 'b'])).toBe(2);
  });

  it('should return default value for undefined path', () => {
    expect(get({ a: { b: 2 } }, 'a.c', 'default')).toBe('default');
  });

  it('should handle null values in path', () => {
    expect(get({ a: null }, 'a.b', 'default')).toBe('default');
  });

  it('should return undefined when no default provided', () => {
    expect(get({ a: 1 }, 'b')).toBeUndefined();
  });
});
