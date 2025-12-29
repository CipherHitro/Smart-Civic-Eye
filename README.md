# 🏙️ Smart Civic Eye

> AI-powered civic issue reporting system that automatically detects, analyzes, and reports infrastructure problems to local authorities.

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-purple.svg)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.7.0-orange.svg)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-green.svg)](https://ai.google.dev/)

## ✨ Key Features

### 🤖 AI-Powered Analysis
- **Automatic Issue Detection** - Google Gemini AI identifies civic problems (potholes, garbage, broken infrastructure)
- **Severity Assessment** - Classifies issues as Critical, High, Medium, or Low priority
- **Smart Descriptions** - Generates detailed analysis and repair urgency estimates

### 📍 Location Intelligence
- **Real-time GPS Tracking** - Captures exact coordinates of reported issues
- **Reverse Geocoding** - Converts coordinates to complete addresses with pincode
- **Google Maps Integration** - Direct links to issue locations

### 📧 Automated Reporting
- **Authority Matching** - Automatically fetches responsible officer details from database by pincode
- **Email Notifications** - Sends detailed reports to government authorities instantly
- **Officer Assignment** - Shows assigned ward officer and municipality details

### 📄 Documentation & Sharing
- **PDF Generation** - Creates downloadable grievance reports with all details
- **Social Media Integration** - One-click sharing to X (Twitter)
- **Success Tracking** - Confirmation screens with submission timestamps

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Firebase account
- Google AI Studio API key
- EmailJS account (for notifications)

### Installation

```bash
# Clone repository
git clone https://github.com/CipherHitro/Smart-Civic-Eye.git
cd Smart-Civic-Eye

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add your API keys to .env

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file with:

```env
# Google Gemini AI - Get from https://ai.google.dev/
VITE_GEMINI_API_KEY=your_gemini_api_key

# Google Maps API - Get from https://console.cloud.google.com/
VITE_GOOGLE_MAPS_API=your_google_map_api_key

# Firebase Configuration - Get from Firebase Console
VITE_FIREBASE_API=your_firebase_api_key

# EmailJS Configuration - Get from https://www.emailjs.com/
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**API Keys Required:**
- **Gemini AI** - For AI-powered image analysis and issue detection
- **Google Maps API** - For reverse geocoding (coordinates to address)
- **Firebase API** - For Firestore database access (officer details)
- **EmailJS** - For sending automated email notifications to authorities

## 🎯 How It Works

1. **📸 Capture** - User takes a photo of a civic issue
2. **🔍 Analyze** - AI identifies the problem and severity
3. **📍 Locate** - GPS coordinates and address are captured
4. **👮 Match** - System finds the responsible authority
5. **📧 Notify** - Email sent to officer automatically
6. **✅ Confirm** - Success screen with all details and PDF download

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 4
- **AI**: Google Gemini AI API
- **Database**: Firebase Firestore
- **Email**: EmailJS
- **PDF**: jsPDF
- **Location**: Geolocation API + Geocoding

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── CaptureButton.jsx    # Main capture interface
│   ├── ResultsModal.jsx     # AI analysis display
│   └── SuccessScreen.jsx    # Submission confirmation
├── services/           # Core services
│   ├── geminiService.js     # AI analysis
│   ├── emailService.js      # Email notifications
│   ├── locationService.js   # GPS & geocoding
│   └── complaintService.js  # Officer data fetching
└── utils/             # Helper functions
```

## 🎨 Features in Detail

### AI Analysis
- Real-time image analysis using Gemini 2.0 Flash
- Detects: potholes, garbage dumps, broken infrastructure, water leakage
- Provides repair urgency and estimated timeline

### Smart Routing
- Pincode-based officer matching
- Fallback to default authorities
- Municipality and ward tracking

### User Experience
- Mobile-first responsive design
- One-tap reporting
- Instant feedback
- Downloadable reports

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Team

Built by **Rohit Rathod & Yashvi Dalsaniya** for TechSprint Hackathon

---

<div align="center">
  <b>Making cities smarter, one report at a time 🌟</b>
</div>
