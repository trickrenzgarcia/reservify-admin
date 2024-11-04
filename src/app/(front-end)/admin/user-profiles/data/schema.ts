import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  gender: z.string().optional(),
  idType: z.string().optional(),
  phoneNumber: z.string().optional(),
  username: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
