import { X, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

const ResultsModal = ({ isOpen, onClose, results, isAnalyzing }) => {
  if (!isOpen) return null;

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    if (urgency?.toLowerCase().includes('immediate')) {
      return 'text-red-600';
    } else if (urgency?.toLowerCase().includes('3 days')) {
      return 'text-orange-600';
    }
    return 'text-blue-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slide-up">
        <div className="sticky top-0 bg-linear-to-r from-blue-600 to-blue-700 text-white px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl font-bold">AI Analysis</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)] sm:max-h-[calc(85vh-80px)]">
          {isAnalyzing ? (
            // AI Analyzing State
            <div className="px-4 py-8 sm:px-6 sm:py-12 text-center">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                  <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 text-blue-600" />
                </div>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                AI Processing...
              </h3>
              
              <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-slate-600 max-w-md mx-auto">
                <p className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-pulse" />
                  Analyzing image data
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-pulse delay-100" />
                  Identifying civic issues
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-pulse delay-200" />
                  Assessing severity level
                </p>
                <p className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full animate-pulse delay-300" />
                  Generating recommendations
                </p>
              </div>
            </div>
          ) : results ? (
            // Results Display
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-6">
              {results.is_civic_issue ? (
                <>
                  <div className="bg-linear-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-3 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="shrink-0">
                        <AlertCircle className="w-7 h-7 sm:w-10 sm:h-10 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-xl font-bold text-red-900 mb-0.5 sm:mb-1">
                          Civic Issue Detected
                        </h3>
                        <p className="text-red-700 text-xs sm:text-sm">
                          AI identified a problem requiring attention
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Issue Type */}
                  <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <div className="text-xs sm:text-sm font-semibold text-slate-500 mb-1 sm:mb-2">
                      ISSUE TYPE
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {results.issue_type}
                    </div>
                  </div>

                  {/* Severity & Urgency Grid */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4">
                    <div className={`border-2 rounded-xl sm:rounded-2xl p-3 sm:p-5 ${getSeverityColor(results.severity)}`}>
                      <div className="text-[10px] sm:text-xs font-bold uppercase mb-1 sm:mb-2 opacity-75">
                        Severity
                      </div>
                      <div className="text-lg sm:text-2xl font-bold">
                        {results.severity}
                      </div>
                    </div>

                    <div className="border-2 border-slate-200 rounded-xl sm:rounded-2xl p-3 sm:p-5 bg-white">
                      <div className="text-[10px] sm:text-xs font-bold uppercase text-slate-500 mb-1 sm:mb-2">
                        Urgency
                      </div>
                      <div className={`text-sm sm:text-lg font-bold flex items-center gap-1 ${getUrgencyColor(results.estimated_repair_urgency)}`}>
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="line-clamp-2">{results.estimated_repair_urgency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-6">
                    <div className="text-xs sm:text-sm font-bold text-blue-600 mb-2 sm:mb-3 uppercase">
                      AI Analysis
                    </div>
                    <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                      {results.description}
                    </p>
                  </div>

                  {/* Location */}
                  {results.location && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl sm:rounded-2xl p-3 sm:p-6">
                      <div className="text-xs sm:text-sm font-bold text-green-600 mb-2 sm:mb-3 uppercase">
                        📍 Location
                      </div>
                      <div className="space-y-2">
                        <p className="text-slate-800 text-sm sm:text-base">
                          {results.location.address?.formattedAddress || 'Location detected'}
                        </p>
                        <div className="flex gap-4 text-xs sm:text-sm text-slate-600">
                          <span>Lat: {results.location.coordinates?.lat.toFixed(6)}</span>
                          <span>Lng: {results.location.coordinates?.lng.toFixed(6)}</span>
                        </div>
                        {results.location.address?.city && (
                          <p className="text-xs sm:text-sm text-slate-600">
                            City: {results.location.address.city}
                          </p>
                        )}
                        {results.location.address?.pincode && (
                          <p className="text-xs sm:text-sm text-slate-600">
                            Pincode: {results.location.address.pincode}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 sm:gap-3 pt-1 sm:pt-2">
                    <button className="w-full bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:shadow-lg transition-all text-sm sm:text-base">
                      Submit Report to Authorities
                    </button>
                    <button 
                      onClick={onClose}
                      className="w-full bg-slate-100 text-slate-700 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:bg-slate-200 transition-all text-sm sm:text-base"
                    >
                      Capture Another
                    </button>
                  </div>
                </>
              ) : (
                // No Issue Detected
                <div className="py-8 sm:py-12 text-center px-4">
                  <div className="mb-4 sm:mb-6 flex justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">
                    No Civic Issue Detected
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto">
                    Our AI couldn't identify any civic problems in this image. 
                    Please capture a civic issue like potholes, garbage, or broken infrastructure.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-blue-700 transition-all text-sm sm:text-base"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
