import type { ZodType } from 'zod';

export const schemForType =
  <T>() =>
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  <S extends ZodType<T, any, any>>(arg: S) => {
    return arg;
  };
