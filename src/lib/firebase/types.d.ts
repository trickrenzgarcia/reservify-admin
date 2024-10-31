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
  | "permits";

export type User = {
  id: string;
  email: string;
  name: string;
};

export type Inventory = {
  id: string;
  name: string;
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

export type Reserve = {
  id: string;
  reserveId: string;
  packageId: string;
  email: string;
  isPending: boolean;
};

export type Permit = {
  id: string;
  name: string;
  amount: number;
  expiredAt: string;
  updatedAt: string;
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
