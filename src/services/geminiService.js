import { GoogleGenerativeAI } from "@google/generative-ai";
import { USE_MOCK_DATA, MOCK_AI_RESPONSE } from '../config/testConfig';

// 1. Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// 2. Helper function to convert file to Base64
async function fileToGenerativePart(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1]; 
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.readAsDataURL(file);
  });
}

// 3. The Main Function
export async function analyzeImage(imageFile) {
  // Return mock data during testing to save API credits
  if (USE_MOCK_DATA) {
    console.log('🧪 Using MOCK AI Response (testing mode)');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_AI_RESPONSE;
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      // Force the model to return JSON so the code doesn't break
      generationConfig: { responseMimeType: "application/json" } 
    });

    const imagePart = await fileToGenerativePart(imageFile);

    // const prompt = `
    //   You are an expert civic surveyor for the Indian government. 
    //   Analyze this image strictly. 
    //   Identify if there is a civic issue (like pothole, garbage dump, broken street light, water logging, etc.).
      
    //   Return ONLY a JSON object with this structure:
    //   {
    //     "is_civic_issue": boolean,
    //     "issue_type": "string (e.g., Pothole, Garbage, etc.)",
    //     "severity": "string (Low, Medium, High, Critical)",
    //     "description": "string (short technical description, max 20 words)",
    //     "estimated_repair_urgency": "string (Immediate, Within 3 days, Routine)"
    //   }
      
    //   If the image is not related to a civic issue (e.g., a selfie or random object), set "is_civic_issue" to false.
    // `;

    const prompt = `
      You are an expert civic surveyor and digital forensic analyst. 
      Analyze this image strictly for two things: authenticity and civic issues.

      STEP 1: AUTHENTICITY CHECK
      Check if the image is a real-world photograph captured on-site. 
      Flag it as "fake" if it is:
      - AI-generated (check for distorted textures, unnatural lighting, or "hallucinated" geometry).
      - A digital render or CGI.
      - A photo of a computer/phone screen.

      STEP 2: CIVIC ANALYSIS
      If authentic, identify civic issues (potholes, garbage, broken lights, etc.).

      Return ONLY a JSON object with this structure:
      {
        "authenticity": {
          "is_real_world_capture": boolean,
          "ai_generated_probability": number (0.0 to 1.0),
          "notes": "string (why it looks real or fake)"
        },
        "is_civic_issue": boolean,
        "issue_type": "string (Pothole, Garbage, etc., or 'N/A')",
        "severity": "string (Low, Medium, High, Critical, or 'N/A')",
        "description": "string (short technical description, max 20 words)",
        "estimated_repair_urgency": "string (Immediate, Within 3 days, Routine, or 'N/A')"
      }

      If "is_real_world_capture" is false, set "is_civic_issue" to false immediately.
    `;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text); // Return clean JSON data

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}