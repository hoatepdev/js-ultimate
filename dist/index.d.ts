declare const first: <T>(array: readonly T[], defaultValue?: T | null | undefined) => T | null | undefined;
declare const group: <T, Key extends string | number | symbol>(array: readonly T[], getGroupId: (item: T) => Key) => Partial<Record<Key, T[]>>;

declare const isNil: <T>(val: T) => boolean;

export { first, group, isNil };
