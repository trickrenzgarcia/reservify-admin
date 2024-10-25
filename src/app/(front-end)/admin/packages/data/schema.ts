import { z } from "zod";

export const packageSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z
    .number()
    .positive()
    .refine((val) => val >= 0, {
      message: "Amount should be greater than or equal to 0",
    }),
  inclusions: z.string().array(),
});

export type Package = z.infer<typeof packageSchema>;
