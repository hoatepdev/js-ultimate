import { describe, it, expectTypeOf } from 'vitest'
import { get, set, setImmutable } from '../../src/index'
import type { Split, GetByPath, GetType, Paths } from '../../src/index'

/**
 * Type-level tests — these verify compile-time behavior, not runtime.
 * If the types are wrong, this file will fail to compile.
 */

describe('Type utilities', () => {
  describe('Split', () => {
    it('should split dot paths into tuples', () => {
      expectTypeOf<Split<'a.b.c'>>().toEqualTypeOf<['a', 'b', 'c']>()
      expectTypeOf<Split<'a'>>().toEqualTypeOf<['a']>()
      expectTypeOf<Split<'x.y'>>().toEqualTypeOf<['x', 'y']>()
    })
  })

  describe('GetByPath', () => {
    it('should resolve types from tuple paths', () => {
      type Obj = { a: { b: { c: number } } }
      expectTypeOf<GetByPath<Obj, ['a', 'b', 'c']>>().toEqualTypeOf<number>()
      expectTypeOf<GetByPath<Obj, ['a', 'b']>>().toEqualTypeOf<{
        c: number
      }>()
      expectTypeOf<GetByPath<Obj, ['a']>>().toEqualTypeOf<{
        b: { c: number }
      }>()
    })

    it('should return undefined for invalid paths', () => {
      type Obj = { a: { b: number } }
      expectTypeOf<GetByPath<Obj, ['x']>>().toEqualTypeOf<undefined>()
    })
  })

  describe('GetType', () => {
    it('should resolve types from string paths', () => {
      type Obj = { a: { b: number; d: string } }
      expectTypeOf<GetType<Obj, 'a.b'>>().toEqualTypeOf<number>()
      expectTypeOf<GetType<Obj, 'a.d'>>().toEqualTypeOf<string>()
    })
  })

  describe('Paths', () => {
    it('should generate valid paths for an object type', () => {
      type Obj = { a: { b: number }; c: string }
      type P = Paths<Obj>
      expectTypeOf<'a'>().toMatchTypeOf<P>()
      expectTypeOf<'c'>().toMatchTypeOf<P>()
      expectTypeOf<'a.b'>().toMatchTypeOf<P>()
    })
  })
})

describe('get() type inference', () => {
  it('should infer return type from path', () => {
    const obj = { a: { b: 2 }, c: 'hello' }
    const result = get(obj, 'a.b')
    expectTypeOf(result).toEqualTypeOf<number>()

    const result2 = get(obj, 'c')
    expectTypeOf(result2).toEqualTypeOf<string>()
  })

  it('should infer nested object type', () => {
    const obj = { a: { b: { c: true } } }
    const result = get(obj, 'a.b')
    expectTypeOf(result).toEqualTypeOf<{ c: boolean }>()
  })

  it('should accept loose signature as fallback', () => {
    const obj = { a: 1 }
    const dynamicPath: string = 'a'
    const result = get(obj, dynamicPath)
    expectTypeOf(result).toBeAny()
  })
})

describe('set() type inference', () => {
  it('should accept valid paths', () => {
    const obj = { a: { b: 1 }, c: 'test' }
    const result = set(obj, 'a.b', 99)
    expectTypeOf(result).toEqualTypeOf<typeof obj>()
  })

  it('should accept loose signature', () => {
    const obj = { a: 1 }
    const dynamicPath: string = 'x.y'
    const result = set(obj, dynamicPath, 2)
    expectTypeOf(result).toEqualTypeOf<typeof obj>()
  })
})

describe('setImmutable() type inference', () => {
  it('should preserve object type', () => {
    const obj = { a: { b: 1 }, c: 'test' }
    const result = setImmutable(obj, 'a.b', 99)
    expectTypeOf(result).toEqualTypeOf<typeof obj>()
  })
})
