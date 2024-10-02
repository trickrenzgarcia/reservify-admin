import { getDocs, collection, where, query } from "firebase/firestore";
import { AdminUser, Test } from "./types";
import { db } from ".";
import bcrypt from "bcrypt";

async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainPassword, hashedPassword);
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
    console.error("Error fetching documents: ", error);
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
    return null;
  }
}
