import { useRef } from 'react';
import { Camera } from 'lucide-react';

const CaptureButton = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name, file.type, file.size);
      alert(`📸 Image captured: ${file.name}`);
      // TODO: Process the image file here
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-6">
      {/* Hidden file input with camera capture */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Capture or upload image"
      />

      {/* Large capture button */}
      <button
        onClick={handleButtonClick}
        className="relative w-64 h-64 rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-2xl shadow-red-500/50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-500/50"
        aria-label="Open camera to report issue"
      >
        {/* Pulsing animation ring */}
        <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></span>
        
        {/* Inner content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 text-white">
          <Camera className="w-20 h-20" strokeWidth={2} />
          <div className="text-center">
            <p className="text-xl font-bold">Report Issue</p>
            <p className="text-sm font-medium opacity-90">Tap to Capture</p>
          </div>
        </div>

        {/* Decorative inner ring */}
        <div className="absolute inset-8 rounded-full border-4 border-white/30"></div>
      </button>
    </div>
  );
};

export default CaptureButton;
