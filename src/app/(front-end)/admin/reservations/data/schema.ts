import { z } from "zod";
import { packageSchema } from "../../packages/data/schema";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const reservationSchema = z.object({
  bookingData: z.object({
    bookingId: z.string().min(1, "Booking ID is required."),
    email: z.string().email().min(1, "Email is required."),
    phoneNumber: z.string(),
  }),
  customPackageData: z.object({
    items: z
      .object({
        id: z.string(),
        amount: z.number(),
        name: z.string(),
        quantity: z.number(),
        type: z.string(),
      })
      .array()
      .optional(),
  }),
  firebaseFormattedDate: z.any(),
  packageData: packageSchema.omit({ inclusions: true }),
  paymentMethod: z.string(),
  paymentStatus: z.string(),
});

export const termsConditionSchema = z.object({
  id: z.string(),
  items: z
    .object({
      title: z.string(),
      body: z.string().min(1),
    })
    .array(),
});

export type Reservation = z.infer<typeof reservationSchema>;
export type TermsConditions = z.infer<typeof termsConditionSchema>;
