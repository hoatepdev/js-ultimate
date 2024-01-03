export const first = <T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) => {
  return array.length ? array[0] : defaultValue
}

export const group = <T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key
): Record<Key, T[]> => {
  return array.reduce(
    (acc, item) => {
      const groupId = getGroupId(item)
      if (!acc[groupId]) acc[groupId] = []
      acc[groupId].push(item)
      return acc
    },
    {} as Record<Key, T[]>
  )
}
