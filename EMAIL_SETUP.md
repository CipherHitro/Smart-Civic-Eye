# Email Integration Setup Guide

## Overview
This feature allows automatic email notifications to be sent to government authorities when a civic issue is reported.

## How It Works

1. **User Submits Report**: When the user clicks "Submit Report to Authorities" button
2. **Data Fetching**: The system fetches officer details from Firebase based on the pincode
3. **Success Screen**: Shows success screen immediately to the user
4. **Email Sending**: Sends email to the authority in parallel (non-blocking)

## Setup Instructions

### 1. Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Configure EmailJS Service

1. Go to **Email Services** in the EmailJS dashboard
2. Click **Add New Service**
3. Select your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Copy the **Service ID**

### 3. Create Email Template

1. Go to **Email Templates** in the EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Civic Issue Report - {{issue_type}}

Dear {{officer_name}},

A new civic issue has been reported in your jurisdiction.

ISSUE DETAILS:
--------------
Issue Type: {{issue_type}}
Severity: {{severity}}
Ward: {{ward_name}}

LOCATION:
---------
Address: {{address}}
Pincode: {{pincode}}
Coordinates: {{lat}}, {{lng}}
Map Link: {{map_link}}

Please take necessary action at the earliest.

This is an automated report from Smart Civic Eye.
```

4. Copy the **Template ID**

### 4. Get Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. Copy it

### 5. Configure Environment Variables

1. Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

2. Add your EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. Restart Development Server

```bash
npm run dev
```

## Email Template Variables

The following variables are automatically populated:

- `to_email` - Officer's email from database
- `officer_name` - Officer's name
- `ward_name` - Ward name
- `issue_type` - Type of civic issue
- `severity` - Severity level (Critical/High/Medium/Low)
- `address` - Full address of the issue
- `pincode` - Area pincode
- `lat` - Latitude coordinate
- `lng` - Longitude coordinate
- `map_link` - Google Maps link to exact location

## Testing

1. Make sure you have officer details in your Firebase database with valid email addresses
2. Capture an image of a civic issue
3. Click "Submit Report to Authorities"
4. Check the console for email sending status
5. Check the officer's email inbox

## Troubleshooting

### Email not sending?

1. **Check console logs**: Look for any errors in browser console
2. **Verify EmailJS credentials**: Make sure all three environment variables are correct
3. **Check EmailJS quota**: Free tier has 200 emails/month limit
4. **Verify officer email**: Make sure the database has valid email addresses

### Common Issues

- **"Failed to send email"**: Check if your EmailJS service is properly configured
- **No email received**: Check spam folder, verify email address in database
- **Environment variables not working**: Restart the dev server after adding .env file

## Code Flow

```
ResultsModal.jsx (handleSubmitReport)
    ↓
1. Fetch officer details from Firebase
    ↓
2. Show success screen immediately
    ↓
3. Send email asynchronously (non-blocking)
    ↓
emailService.js (sendOfficialEmail)
    ↓
EmailJS API → Officer's Email
```

## Important Notes

- Email sending happens in the background and doesn't block the success screen
- If email fails, the success screen still shows (email failure is logged in console)
- The email includes a direct Google Maps link to the exact location
- No image is sent in the email (only text data and location link)

## Support

For EmailJS issues: https://www.emailjs.com/docs/
For Firebase issues: Check your Firebase console
