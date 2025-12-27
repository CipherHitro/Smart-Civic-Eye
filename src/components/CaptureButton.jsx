import { useRef, useState } from 'react';
import { Camera } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';
import { getCurrentLocation, getAddressFromCoords } from '../services/locationService';
import ResultsModal from './ResultsModal';

const CaptureButton = () => {
  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [locationData, setLocationData] = useState(null);

  const handleButtonClick = async () => {
    try {
      // First, request location permission
      const coords = await getCurrentLocation();
      console.log('Location obtained:', coords);
      
      // Get address from coordinates
      const address = await getAddressFromCoords(coords.lat, coords.lng);
      console.log('Address obtained:', address);
      
      // Store location data
      setLocationData({
        coordinates: coords,
        address: address
      });
      
      // If location is allowed, open camera
      fileInputRef.current?.click();
    } catch (error) {
      console.error('Location error:', error);
      alert('Location access is required to report civic issues. Please enable location services and try again.');
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      
      // Open modal and start analyzing
      setIsModalOpen(true);
      setIsAnalyzing(true);
      setResults(null);

      try {
        // Call Gemini AI service with location data
        const analysisResults = await analyzeImage(file);
        console.log('AI Analysis Results:', analysisResults);
        
        // Show results with location
        setResults({
          ...analysisResults,
          location: locationData
        });
        setIsAnalyzing(false);
      } catch (error) {
        console.error('Analysis failed:', error);
        setIsAnalyzing(false);
        alert('Failed to analyze image. Please try again.');
        setIsModalOpen(false);
      }

      // Reset file input
      event.target.value = '';
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setResults(null);
    setIsAnalyzing(false);
    setLocationData(null);
  };

  return (
    <>
      <div className="flex-1 flex items-center justify-center px-6">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          aria-label="Capture or upload image"
        />

        <button
          onClick={handleButtonClick}
          disabled={isAnalyzing}
          className="relative w-64 h-64 rounded-full bg-linear-to-br from-red-500 to-orange-500 shadow-2xl shadow-red-500/50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Open camera to report issue"
        >
          <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></span>
          
          <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-white">
            <Camera className="w-20 h-20" strokeWidth={2} />
            <div className="text-center">
              <p className="text-xl font-bold">Report Issue</p>
              <p className="text-sm font-medium opacity-90">Tap to Capture</p>
            </div>
          </div>

          <div className="absolute inset-8 rounded-full border-4 border-white/30"></div>
        </button>
      </div>

      <ResultsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        results={results}
        isAnalyzing={isAnalyzing}
      />
    </>
  );
};

export default CaptureButton;
