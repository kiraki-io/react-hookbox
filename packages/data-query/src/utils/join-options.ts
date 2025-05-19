export interface Options<K> {
  asyncMethods?: K[];
  priorities?: (Record<string, number> | undefined)[];
}

export type Tuple<T> = [T, T];

export const joinOptions = <T extends Record<string, unknown>, K extends keyof T>(
  obj1: T,
  obj2: T,
  { asyncMethods, priorities = [] }: Options<K> = {},
): T => {
  const combination: T = { ...obj1, ...obj2 };

  for (const [key, value] of Object.entries(obj1)) {
    if (typeof value === 'function') {
      if (!Reflect.has(obj2, key)) {
        continue;
      }

      const value2 = obj2[key];

      if (typeof value2 !== 'function') {
        continue;
      }

      const firstPriority = priorities?.at(0)?.[key] ?? 0;
      const secondPriority = priorities?.at(1)?.[key] ?? 0;

      const orderedValue = [value, value2].sort(() => firstPriority - secondPriority) as Tuple<
        typeof value
      >;

      if (asyncMethods?.includes(key as K)) {
        Reflect.set(combination, key, async (...args: unknown[]) => {
          const [firstToCall, secondToCall] = orderedValue;
          const firstResult = await firstToCall(...args);
          const secondResult = await secondToCall(...args);

          return { ...firstResult, ...secondResult };
        });
      } else {
        Reflect.set(combination, key, (...args: unknown[]) => {
          const [firstToCall, secondToCall] = orderedValue;
          const firstResult = firstToCall(...args);
          const secondResult = secondToCall(...args);

          return { ...firstResult, ...secondResult };
        });
      }
    }
  }

  return combination;
};
