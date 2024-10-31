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
  cycle: z.string().min(1),
  endTime: z.string().min(1),
  endCycle: z.string().min(1),
  startTime: z.string().min(1),
  startCycle: z.string().min(1),
  inclusions: z.string().array(),
});

export type Package = z.infer<typeof packageSchema>;
