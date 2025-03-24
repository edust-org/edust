import { z } from "zod"

const emptyStringToUndefined = z.literal("").transform(() => undefined)

export function asOptionalField<T extends z.ZodTypeAny>(schema: T) {
  return schema.optional().or(emptyStringToUndefined)
}
