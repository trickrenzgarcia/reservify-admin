import {
  getDocs,
  collection,
  where,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { AdminUser, Test, User } from "./types";
import { db } from ".";
import bcrypt from "bcryptjs";

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function getTests(): Promise<Test[]> {
  const testsCollection = collection(db, "test");

  try {
    const querySnapshot = await getDocs(testsCollection);

    const tests: Test[] = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Test)
    );

    return tests;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers(): Promise<User[]> {
  const usersCollection = collection(db, "users");

  try {
    const snapshot = await getDocs(usersCollection);

    const users: User[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as User)
    );

    return users;
  } catch (error) {
    throw error;
  }
}

export async function editUser(id: string, data: Partial<any>): Promise<void> {
  const userDocRef = doc(db, "users", id);

  try {
    await updateDoc(userDocRef, data);
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id: string): Promise<void> {
  const userDocRef = doc(db, "users", id);
  const accountsCollection = collection(db, "accounts");

  const q = query(accountsCollection, where("userId", "==", id));

  try {
    const queue1 = deleteDoc(userDocRef);
    const queue2 = getDocs(q);

    const [_, accountsSnapshot] = await Promise.all([queue1, queue2]);

    if (accountsSnapshot.empty) return;

    accountsSnapshot.docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  } catch (error) {
    throw error;
  }
}

export async function getUsersCount(): Promise<number> {
  const usersCollection = collection(db, "users");

  try {
    const snapshot = await getDocs(usersCollection);

    return snapshot.size;
  } catch (error) {
    throw error;
  }
}

export async function adminLogin(
  email: string,
  password: string
): Promise<AdminUser | null> {
  try {
    const userQuery = query(
      collection(db, "admins"),
      where("email", "==", email)
    );

    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      console.log("No admin found with the email: ", email);
      return null;
    }

    // Get the first admin document (assuming emails are unique)
    const adminDoc = userSnapshot.docs[0];
    const adminData = adminDoc.data();

    const user = userSnapshot.docs[0].data();

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    // Return the admin user data (make sure to include important fields)
    const adminUser: AdminUser = {
      id: adminDoc.id,
      email: adminData.email,
      name: adminData.name,
    };

    return adminUser;
  } catch (error) {
    throw error;
  }
}
