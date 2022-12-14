import { z } from "zod";

export const impl = <T>() => {
  return {
    with: <S extends z.ZodType<T, any, any>>(arg: S) => arg,
  };
};
