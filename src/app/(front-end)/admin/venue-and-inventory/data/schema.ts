import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const inventorySchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().refine((val) => val >= 0, {
    message: "Quantity should be greater than or equal to 0",
  }),
  amount: z.number().refine((val) => val >= 0, {
    message: "Amount should be greater than or equal to 0",
  }),
  type: z.string(),
});

export type Inventory = z.infer<typeof inventorySchema>;
