import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const materialSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number().positive(),
});

export const packageSchema = z.object({
  id: z.string(),
  name: z.string(),
  details: z.string(),
  amount: z
    .number()
    .positive()
    .refine((val) => val >= 0, {
      message: "Amount should be greater than or equal to 0",
    }),
  materials: z.array(materialSchema),
});

export type Package = z.infer<typeof packageSchema>;
