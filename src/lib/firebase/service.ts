"use server";

import {
  getDocs,
  collection,
  where,
  query,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { AdminUser, FirestoreCollections } from "./types";
import { db } from ".";
import bcrypt from "bcryptjs";
import { revalidatePath, revalidateTag } from "next/cache";

export async function verifyPassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function getCollection<T>(
  collectionName: FirestoreCollections,
  tag?: string
) {
  const collectionRef = collection(db, collectionName);

  try {
    const snapshot = await getDocs(collectionRef);

    const data: T[] = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as T)
    );
    if (tag) {
      revalidateTag(tag);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getPaidCustomers() {}

export async function _addDoc(
  collectionName: FirestoreCollections,
  data: Omit<Partial<any>, "id">
): Promise<void> {
  try {
    const docRef = doc(collection(db, collectionName));
    const docId = docRef.id;

    // Add the document with ID as field
    await setDoc(docRef, { ...data, id: docId });
  } catch (error) {
    throw error;
  }
}

export async function _deleteDoc(
  collectionName: FirestoreCollections,
  id: string
): Promise<void> {
  if (!collectionName) return;

  const docRef = doc(db, collectionName, id);

  try {
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
}

export async function getDocById<T>(
  collectionName: FirestoreCollections,
  docId: string
): Promise<T | undefined> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    throw error;
  }
}

export async function _cancelReservation(
  collectionName: FirestoreCollections,
  bookingId: string
): Promise<void> {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(
      collectionRef,
      where("bookingData.bookingId", "==", bookingId)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error(`No reservation found with booking ID: ${bookingId}`);
    }

    // Assuming only one document has this bookingId; delete it
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(docSnapshot.ref);
    });
  } catch (error) {
    throw error;
  }
}

export async function _editDoc(
  collectionName: FirestoreCollections,
  docId: string,
  data: Partial<any>
): Promise<void> {
  if (!collectionName) return;

  const docRef = doc(db, collectionName, docId);

  try {
    await updateDoc(docRef, data);
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

export async function updateMessage(
  userId: string,
  textMessage: string
): Promise<void> {
  try {
    // Define a new message with a unique ID, sender, and timestamp
    const newMessage = {
      id: new Date().getTime().toString(), // Use timestamp or UUID for unique ID
      sender: "admin",
      text: textMessage,
    };

    // Reference the customer_service collection
    const customerServiceCollection = collection(db, "customer_service");

    // Query for the document where userData.userId matches the provided userId
    const q = query(
      customerServiceCollection,
      where("userData.userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);

    // Ensure the document is found
    if (querySnapshot.empty) {
      throw new Error(`No document found for user with ID: ${userId}`);
    }

    // Update the conversations array in the found document
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, {
      conversations: arrayUnion(newMessage),
    });
  } catch (error) {
    console.error("Failed to update message:", error);
    throw error;
  }
  revalidateTag("customer_service");
  revalidatePath("/admin/service", "page");
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
