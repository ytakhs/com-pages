import type { ZodType } from 'zod';

export const schemaForType =
  <T>() =>
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  <S extends ZodType<T, any, any>>(arg: S) => {
    return arg;
  };
