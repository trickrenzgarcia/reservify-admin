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
    amenities: z.string().array(),
    chairs: z.string(),
    equipment: z.string().array(),
    tables: z.string(),
  }),
  firebaseFormattedDate: z.any(),
  packageData: packageSchema.omit({ inclusions: true }),
  paymentMethod: z.string(),
  paymentStatus: z.string(),
});

export type Reservation = z.infer<typeof reservationSchema>;
