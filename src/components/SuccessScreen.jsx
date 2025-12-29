import { CheckCircle, Download, Share2, MapPin, AlertCircle, User } from 'lucide-react';
import { generateGrievancePDF } from '../services/pdfService'

const SuccessScreen = ({ complaintData, imageFile, onClose }) => {
  if (!complaintData) return null;
    console.log(complaintData)

  const formatDate = (date) => {
    if (!date) return 'N/A';
    const d = date instanceof Date ? date : new Date();
    return d.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadPDF = async () => {
    try {
      await generateGrievancePDF(complaintData, imageFile);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handlePostOnX = () => {
    const text = `🚨 Civic Issue Reported!\n\nIssue: ${complaintData.issueType}\nLocation: ${complaintData.location?.address?.formattedAddress || 'N/A'}\nSeverity: ${complaintData.severity}\n\nReported via Smart Civic Eye 🏙️\n#SmartCity #CivicIssue`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
  };

  const getSeverityBadgeColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto animate-slide-up">
        
        {/* Success Header */}
        <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white px-4 py-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-16 translate-y-16"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-3 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={2.5} />
            </div>
            <h2 className="text-xl font-bold mb-2">Complaint Submitted Successfully!</h2>
            <p className="text-green-50 text-sm">
              Complaint officially submitted and email sent to authorities.
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-4 space-y-3">
          
          {/* Issue Type Card */}
          <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-slate-500 mb-1">ISSUE DETECTED</div>
                <div className="text-lg font-bold text-slate-900 mb-1.5">{complaintData.issueType}</div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border-2 ${getSeverityBadgeColor(complaintData.severity)}`}>
                    {complaintData.severity} Severity
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-blue-600 mb-1">LOCATION</div>
                <div className="text-base font-semibold text-slate-900 mb-1">
                  {complaintData.location?.address?.city || 'Unknown City'}
                </div>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {complaintData.location?.address?.formattedAddress || 'Address not available'}
                </p>
                {complaintData.location?.address?.pincode && (
                  <p className="text-slate-600 text-xs mt-1">
                    Pincode: <span className="font-semibold">{complaintData.location.address.pincode}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Authority & Officer Card */}
          {complaintData.officerDetails && (
            <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <div className="text-xs font-semibold text-purple-600 mb-2">ASSIGNED AUTHORITY</div>
                  
                  <div className="space-y-1.5">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Authority</div>
                      <div className="text-sm font-semibold text-slate-900">
                        {complaintData.officerDetails.municipality}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Ward</div>
                      <div className="text-sm font-semibold text-slate-900">
                        {complaintData.officerDetails.ward_name}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-semibold">Officer</div>
                      <div className="text-sm font-semibold text-slate-900">
                        {complaintData.officerDetails.officer_name}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status & Date Card */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-3 border-2 border-slate-200">
              <div className="text-[10px] font-semibold text-slate-500 mb-0.5">STATUS</div>
              <div className="text-sm font-bold text-slate-900">{complaintData.status}</div>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-3 border-2 border-slate-200">
              <div className="text-[10px] font-semibold text-slate-500 mb-0.5">SUBMITTED ON</div>
              <div className="text-xs font-bold text-slate-900">{formatDate(complaintData.reportedAt)}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-sm"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            
            <button
              onClick={handlePostOnX}
              className="flex items-center justify-center gap-2 bg-black text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl text-sm"
            >
              <Share2 className="w-4 h-4" />
              Post on X
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-200 transition-all text-sm"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
