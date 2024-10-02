import { getDocs, collection } from "firebase/firestore";
import { Test } from "./types";
import { db } from ".";

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
