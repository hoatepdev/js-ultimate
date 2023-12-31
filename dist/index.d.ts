declare const isArray: (arg: any) => arg is any[];
declare const isObject: (value: unknown) => boolean;
declare const isFunction: (value: unknown) => boolean;
declare const isString: (value: unknown) => boolean;
declare const isNumber: (value: unknown) => boolean;
declare const isDate: (value: unknown) => boolean;
declare const isSymbol: (value: unknown) => boolean;
declare const isNil: (value: unknown) => boolean;
declare const isEmpty: (value: any) => boolean;
declare const isEqual: <T>(x: T, y: T) => boolean;

declare const first: <T>(array: readonly T[], defaultValue?: T | null | undefined) => T | null | undefined;
declare const group: <T, Key extends string | number | symbol>(array: readonly T[], getGroupId: (item: T) => Key) => Record<Key, T[]>;

export { first, group, isArray, isDate, isEmpty, isEqual, isFunction, isNil, isNumber, isObject, isString, isSymbol };
