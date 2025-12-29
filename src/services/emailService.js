/* src/services/emailService.js */
import emailjs from '@emailjs/browser';

// EmailJS configuration - Make sure to set these in your .env file
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID; 
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_ID;

export const sendOfficialEmail = async (params) => {
  // Only send text data and the map link
  const templateParams = {
    to_email: params.to_email,
    officer_name: params.officer_name,
    ward_name: params.ward_name,
    issue_type: params.issue_type,
    severity: params.severity,
    address: params.address,
    pincode: params.pincode,
    lat: params.lat,
    lng: params.lng,
    map_link: params.map_link, // The crucial link
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
};