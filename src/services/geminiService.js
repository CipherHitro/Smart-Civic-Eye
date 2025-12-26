import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// 2. Helper function to convert file to Base64
async function fileToGenerativePart(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1]; // Remove the "data:image/jpeg;base64," part
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
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      // Force the model to return JSON so the code doesn't break
      generationConfig: { responseMimeType: "application/json" } 
    });

    const imagePart = await fileToGenerativePart(imageFile);

    const prompt = `
      You are an expert civic surveyor for the Indian government. 
      Analyze this image strictly. 
      Identify if there is a civic issue (like pothole, garbage dump, broken street light, water logging, etc.).
      
      Return ONLY a JSON object with this structure:
      {
        "is_civic_issue": boolean,
        "issue_type": "string (e.g., Pothole, Garbage, etc.)",
        "severity": "string (Low, Medium, High, Critical)",
        "description": "string (short technical description, max 20 words)",
        "estimated_repair_urgency": "string (Immediate, Within 3 days, Routine)"
      }
      
      If the image is not related to a civic issue (e.g., a selfie or random object), set "is_civic_issue" to false.
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