/**
 * Type-safe path engine for get/set operations.
 * Provides compile-time path validation and return type inference.
 */

/**
 * Split a dot-separated string path into a tuple of keys.
 * "a.b.c" => ["a", "b", "c"]
 */
export type Split<
  S extends string,
  D extends string = '.'
> = S extends `${infer Head}${D}${infer Tail}` ? [Head, ...Split<Tail, D>] : [S]

/**
 * Navigate a type by a tuple of string keys, returning the type at that path.
 * Returns undefined if the path is invalid.
 */
export type GetByPath<T, Path extends readonly string[]> = Path extends [
  infer Head extends string,
  ...infer Tail extends string[]
]
  ? Head extends keyof T
    ? GetByPath<T[Head], Tail>
    : undefined
  : T

/**
 * Resolve the type at a dot-separated string path.
 * Get<{ a: { b: number } }, "a.b"> => number
 */
export type GetType<T, P extends string> = GetByPath<T, Split<P>>

/**
 * Generate all valid dot-separated paths for a type, up to a depth limit.
 * Uses a counter tuple to prevent infinite recursion and compiler slowdown.
 *
 * Depth limit of 5 covers 99%+ of real-world object nesting.
 */
export type Paths<
  T,
  Depth extends readonly unknown[] = []
> = Depth['length'] extends 5
  ? never
  : T extends Record<string, unknown>
    ? {
        [K in keyof T & string]: K | `${K}.${Paths<T[K], [...Depth, unknown]>}`
      }[keyof T & string]
    : never
