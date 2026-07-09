import { z } from "zod";

export const validate = <T>(data: unknown, schema: z.ZodType<T>): T => {
  return schema.parse(data);
};