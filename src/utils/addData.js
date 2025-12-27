/* src/utils/seedDatabase.js */
import { getFirestore, writeBatch, doc } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

const dummyData = [
  // --- AHMEDABAD (Your Focus Area) ---
  {
    id: "380005", // Sabarmati (YOUR AREA)
    ward_name: "Sabarmati Ward (West Zone)",
    municipality: "Ahmedabad Municipal Corporation (AMC)",
    officer_name: "Mr. Vikram Chaudhary",
    email: "ward.sabarmati@amc.gov.in", // Change to YOUR email to test!
    city: "Ahmedabad",
    state: "Gujarat"
  },
  {
    id: "380015", // Satellite / Jodhpur / ISRO Area
    ward_name: "Jodhpur Ward (South West Zone)",
    municipality: "Ahmedabad Municipal Corporation (AMC)",
    officer_name: "Ms. Neha Patel",
    email: "ward.satellite@amc.gov.in",
    city: "Ahmedabad",
    state: "Gujarat"
  },
  {
    id: "380008", // Maninagar
    ward_name: "Maninagar Ward (South Zone)",
    municipality: "Ahmedabad Municipal Corporation (AMC)",
    officer_name: "Mr. Rajesh Shah",
    email: "ward.maninagar@amc.gov.in",
    city: "Ahmedabad",
    state: "Gujarat"
  },
  {
    id: "380009", // Navrangpura / University Area
    ward_name: "Navrangpura Ward (West Zone)",
    municipality: "Ahmedabad Municipal Corporation (AMC)",
    officer_name: "Dr. Sanjay Gupta",
    email: "ward.navrangpura@amc.gov.in",
    city: "Ahmedabad",
    state: "Gujarat"
  },
  {
    id: "380001", // Lal Darwaja / Old City (Central)
    ward_name: "Khadia Ward (Central Zone)",
    municipality: "Ahmedabad Municipal Corporation (AMC)",
    officer_name: "Mr. Ahmed Khan",
    email: "ward.central@amc.gov.in",
    city: "Ahmedabad",
    state: "Gujarat"
  },
  {
    id: "380054", // Bodakdev / Thaltej (New West)
    ward_name: "Bodakdev Ward (North West Zone)",
    municipality: "Ahmedabad Municipal Corporation (AMC)",
    officer_name: "Mrs. Anita Desai",
    email: "ward.bodakdev@amc.gov.in",
    city: "Ahmedabad",
    state: "Gujarat"
  },
  {
    id: "380058", // South Bopal
    ward_name: "South Bopal Ward",
    municipality: "AUDA / AMC",
    officer_name: "Mr. K. Prajapati",
    email: "ward.bopal@amc.gov.in",
    city: "Ahmedabad",
    state: "Gujarat"
  },

  // --- SURAT (Keep these just in case) ---
  {
    id: "395007", 
    ward_name: "Vesu - Ward 28",
    municipality: "Surat Municipal Corporation (SMC)",
    officer_name: "Mr. R. Patel",
    email: "vesu@smc.gov.in",
    city: "Surat",
    state: "Gujarat"
  },

  // --- FALLBACK (Crucial for testing unknown areas) ---
  {
    id: "default",
    ward_name: "General Civic Office (AMC HQ)",
    municipality: "Ahmedabad Municipal Corporation",
    officer_name: "Public Grievance Officer",
    email: "complaints@amc.gov.in",
    city: "Ahmedabad",
    state: "Gujarat"
  }
];

export const uploadGovernmentData = async () => {
  try {
    const batch = writeBatch(db);
    
    // Using for...of loop to handle async properly if needed later
    for (const record of dummyData) {
      const docRef = doc(db, "government_registry", record.id);
      batch.set(docRef, record);
    }

    await batch.commit();
    console.log("✅ Successfully seeded Ahmedabad & Surat data!");
    alert("Database Updated for Ahmedabad!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    alert("Error seeding. Check console.");
  }
};