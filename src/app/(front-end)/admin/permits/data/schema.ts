import { z } from "zod";

export const permitSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  amount: z
    .number()
    .positive()
    .refine((val) => val >= 0, {
      message: "Amount should be greater than or equal to 0",
    }),
  expiredAt: z.string().min(1),
  updatedAt: z.string(),
});

export type Permit = z.infer<typeof permitSchema>;
