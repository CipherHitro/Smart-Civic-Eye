import { getFirestore, collection, getDocs, writeBatch } from "firebase/firestore";
import { db } from "../firebase"; // Adjust path to your firebase config

export const setAllEmailsToTest = async (myEmail) => {
  const batch = writeBatch(db);
  const govCollectionRef = collection(db, "government_registry");
  
  try {
    const snapshot = await getDocs(govCollectionRef);
    
    if (snapshot.empty) {
      console.log("No documents found!");
      return;
    }

    let count = 0;
    snapshot.forEach((doc) => {
      // For every document, update the 'email' field
      batch.update(doc.ref, { email: myEmail });
      count++;
    });

    await batch.commit();
    console.log(`✅ Successfully updated ${count} officers to email: ${myEmail}`);
    alert(`Success! All ${count} records now send emails to you.`);
    
  } catch (error) {
    console.error("Error updating emails:", error);
    alert("Failed to update emails. Check console.");
  }
};