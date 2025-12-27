import jsPDF from "jspdf";

/**
 * Convert image file to base64 data URL
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generateGrievancePDF = async (complaintData, imageFile) => {
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const lineSpacing = 7;
  let cursorY = 20; 

  // Generate tracking ID
  const trackingId = `SCE-${Date.now()}`;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("From:", margin, cursorY);
  doc.text("Concerned Citizen", margin, cursorY + 5);
  doc.text(`Tracking ID: ${trackingId}`, margin, cursorY + 10);
  
  // Date 
  const dateStr = new Date().toLocaleDateString('en-IN', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
  doc.text(`Date: ${dateStr}`, pageWidth - margin - 30, cursorY);

  cursorY += 25;

  // --- 2. RECIPIENT (The Government) ---
  doc.setFont("helvetica", "bold");
  doc.text("To,", margin, cursorY);
  cursorY += 5;
  doc.text("The Municipal Commissioner / Ward Officer,", margin, cursorY);
  cursorY += 5;
  doc.text(`${complaintData.officerDetails?.ward_name || "Ward Office"},`, margin, cursorY);
  cursorY += 5;
  doc.text(`${complaintData.location?.address?.city || "City Municipal Corporation"}`, margin, cursorY);
  
  cursorY += 15;

  // --- 3. SUBJECT  ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  const subject = `SUBJECT: Grievance Report regarding ${complaintData.issueType} at ${complaintData.location?.address?.pincode || 'N/A'}`;
  doc.text(subject, margin, cursorY);
  // Underline logic
  const textWidth = doc.getTextWidth(subject);
  doc.line(margin, cursorY + 1, margin + textWidth, cursorY + 1);
  
  cursorY += 15;

  // --- 4. SALUTATION ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Respected Sir/Madam,", margin, cursorY);
  cursorY += 10;

  // --- 5. BODY ---
  const bodyText = `I am writing to formally report a civic issue that requires your immediate attention. The details are as follows:

  1. Nature of Issue: ${complaintData.issueType} (${complaintData.severity} Severity)
  2. Location: ${complaintData.location?.address?.formattedAddress || 'N/A'}
  3. Observation: ${complaintData.description}
  
  This issue poses a safety risk to the residents and commuters of this area. I request the concerned department to inspect the site and undertake necessary repairs at the earliest.`;

  // Wrap text to fit page width
  const splitBody = doc.splitTextToSize(bodyText, pageWidth - (2 * margin));
  doc.text(splitBody, margin, cursorY);
  
  cursorY += (splitBody.length * lineSpacing) + 10;

  // --- 6. PHOTOGRAPHIC EVIDENCE (The Image) ---
  if (cursorY > 200) { doc.addPage(); cursorY = 20; } // Check for page break
  
  doc.setFont("helvetica", "bold");
  doc.text("ANNEXURE: PHOTOGRAPHIC EVIDENCE", margin, cursorY);
  cursorY += 8;
  
  if (imageFile) {
    try {
      // Convert image file to base64
      const imageData = await fileToBase64(imageFile);
      
      // Add the image 
      doc.addImage(imageData, "JPEG", margin, cursorY, 100, 80); 
      
      // Add Location Stamp on Image
      doc.setFontSize(8);
      doc.setTextColor(255, 0, 0); // Red Color
      doc.text(`Lat: ${complaintData.latitude?.toFixed(6) || 'N/A'}`, margin + 2, cursorY + 5);
      doc.text(`Lng: ${complaintData.longitude?.toFixed(6) || 'N/A'}`, margin + 2, cursorY + 10);
      doc.setTextColor(0, 0, 0); // Reset to Black
      
      cursorY += 85;
      
    } catch (err) {
      console.error("Image add failed", err);
      doc.text("[Image could not be loaded]", margin, cursorY + 10);
      cursorY += 15;
    }
  } else {
    doc.setFont("helvetica", "normal");
    doc.text("[No image available]", margin, cursorY);
    cursorY += 10;
  }

  // --- 7. CLOSING ---
  const footerY = pageHeight - 30;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Yours Faithfully,", margin, footerY);
  doc.text("Smart Civic Eye User", margin, footerY + 7);
  doc.setFontSize(8);
  doc.text("Generated via Smart Civic Eye App", margin, pageHeight - 10);

  // --- 8. OPEN PDF in new tab (user can download from browser) ---
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  
  // Open in new tab to show the PDF
  window.open(pdfUrl, '_blank');
};