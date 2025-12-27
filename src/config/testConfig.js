// Test Configuration
// Set USE_MOCK_DATA to true during testing to save API credits
// Set to false when you want to use real APIs

export const USE_MOCK_DATA = false; // Toggle this: true = mock data, false = real APIs

// Mock AI Response
export const MOCK_AI_RESPONSE = {
  is_civic_issue: true,
  issue_type: "Pothole",
  severity: "High",
  description: "Large pothole on main road causing traffic disruption and vehicle damage",
  estimated_repair_urgency: "Within 3 days"
};

// Mock Location Response
export const MOCK_LOCATION = {
  coordinates: {
    lat: 28.6139,
    lng: 77.2090
  },
  address: {
    formattedAddress: "Connaught Place, New Delhi, Delhi 110001, India",
    pincode: "380005",
    city: "New Delhi"
  }
};
