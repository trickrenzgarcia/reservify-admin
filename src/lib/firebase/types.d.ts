export type Test = {
  id: string;
  projectName: string;
};

export type FirestoreCollections = "users" | "inventory" | "admin";

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

export type AdminUser = {
  id: string;
  email: string;
  name: string;
};

export type AdminLogin = {
  email: string;
  password: string;
};
