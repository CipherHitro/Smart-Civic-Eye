# 🧪 Testing Mode - Quick Guide

## How to Toggle Between Mock and Real APIs

### Location: `src/config/testConfig.js`

```javascript
export const USE_MOCK_DATA = true;  // ← Change this value
```

### Settings:

#### 🧪 **Testing Mode (Save API Credits)**
```javascript
export const USE_MOCK_DATA = true;
```
- ✅ Uses mock AI response
- ✅ Uses mock location data
- ✅ No API calls made
- ✅ Saves your credits
- ℹ️ Console shows: "🧪 Using MOCK [service] (testing mode)"

#### 🚀 **Production Mode (Real APIs)**
```javascript
export const USE_MOCK_DATA = false;
```
- ✅ Uses real Gemini AI
- ✅ Uses real Google Maps API
- ⚠️ Consumes API credits

---

## Current Mock Data

### AI Response:
- Issue Type: Pothole
- Severity: High
- Description: "Large pothole on main road causing traffic disruption"
- Urgency: Within 3 days

### Location:
- Location: Connaught Place, New Delhi
- Coordinates: 28.6139, 77.2090
- Pincode: 110001

---

## To Customize Mock Data

Edit the values in `src/config/testConfig.js`:

```javascript
export const MOCK_AI_RESPONSE = {
  is_civic_issue: true,
  issue_type: "Your Issue Type",  // Change this
  severity: "Critical",            // Low, Medium, High, Critical
  description: "Your description",
  estimated_repair_urgency: "Immediate"  // Immediate, Within 3 days, Routine
};

export const MOCK_LOCATION = {
  coordinates: {
    lat: 28.6139,  // Your latitude
    lng: 77.2090   // Your longitude
  },
  address: {
    formattedAddress: "Your Address",
    pincode: "110001",
    city: "Your City"
  }
};
```

---

## Quick Switch Instructions

1. Open `src/config/testConfig.js`
2. Change `USE_MOCK_DATA` value:
   - `true` = Testing (no API calls)
   - `false` = Production (real APIs)
3. Save file
4. Refresh your app

**That's it!** No need to edit multiple files. 🎉
