import type { Timestamp } from "firebase/firestore";

export type Test = {
  id: string;
  projectName: string;
};

export type FirestoreCollections =
  | "users"
  | "inventory"
  | "venues"
  | "package"
  | "reservations"
  | "admin"
  | "permits"
  | "customer_reviews"
  | "terms_and_conditions";

export type User = {
  id: string;
  email: string;
  name: string;
  firstname: string;
  lastname: string;
  gender: string;
  idType: string;
  phoneNumber: string;
  username: string;
  capturedImage: string;
};

export type Inventory = {
  id: string;
  name: string;
  type: "amenities" | "audio-visual" | "seating";
  quantity: number;
  amount: number;
};

export type Venue = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  videos: string[];
};

export type Package = {
  id: string;
  name: string;
  price: number;
  inclusions: string[];
  cycle: string;
  startCycle: string;
  startTime: string;
  endCycle: string;
  endTime: string;
};

export type Booking = {
  bookingId: string;
  email: string;
  phoneNumber: string;
};

export type CustomPackage = {
  amenities: string[];
  chairs: string;
  equipment: string[];
  tables: string;
};

export type Reserve = {
  bookingData: Booking;
  customPackageData: CustomPackage;
  firebaseFormattedDate: Timestamp;
  packageData: Omit<Package, "inclusions">;
  paymentMethod: string;
  paymentStatus: string;
};

export type TermsConditions = {
  id: string;
  items: {
    title: string;
    body: string;
  }[];
};

export type Permit = {
  id: string;
  name: string;
  amount: number;
  expiredAt: string;
  updatedAt: string;
};

export type CustomerReview = {
  id: string;
  customer: {
    id: string;
    email: string;
    name: string;
  };
  needToImproves: string[];
  suggestion: string;
  rate: number;
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
};

export type AdminLogin = {
  email: string;
  password: string;
};
