import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Fetch government officer details by pincode
 * @param {string} pincode - The pincode to lookup
 * @returns {Promise<Object|null>} - Government officer details or null
 */
export async function getGovernmentOfficerByPincode(pincode) {
  try {
    if (!pincode) {
      console.warn('No pincode provided, using default');
      pincode = 'default';
    }

    console.log('Fetching officer details for pincode:', pincode);
    const docRef = doc(db, 'government_registry', pincode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Officer found:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No officer found for pincode, trying default');
      // Fallback to default officer
      const defaultDocRef = doc(db, 'government_registry', 'default');
      const defaultDocSnap = await getDoc(defaultDocRef);
      
      if (defaultDocSnap.exists()) {
        return defaultDocSnap.data();
      }
      
      return null;
    }
  } catch (error) {
    console.error('Error fetching officer details:', error);
    return null;
  }
}
