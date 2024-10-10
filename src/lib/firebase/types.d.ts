export type Test = {
  id: string;
  projectName: string;
};

export type FirestoreCollections = "users" | "inventory" | "package" | "admin";

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

export type Material = {
  id: string;
  name: string;
  amount: number;
};

export type Package = {
  id: string;
  name: string;
  details: string;
  amount: number;
  materials: Material[];
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
