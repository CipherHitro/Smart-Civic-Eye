const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported by this browser."));
      return;
    }

    // The Magic Options for Precision
    const options = {
      enableHighAccuracy: true, // Force GPS (if available)
      timeout: 15000,           // Wait up to 15s (GPS takes time to warm up)
      maximumAge: 0             // Do not use a cached position from 10 mins ago
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy 
        });
      },
      (error) => {
        reject(error);
      },
      options 
    );
  });
};

export const getAddressFromCoords = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      const addressComponent = data.results[0];
      // Extract pincode to find authority
      const pincodeObj = addressComponent.address_components.find(ac => ac.types.includes('postal_code'));
      const pincode = pincodeObj ? pincodeObj.short_name : null;
      
      return {
        formattedAddress: addressComponent.formatted_address,
        pincode: pincode,
        city: addressComponent.address_components.find(ac => ac.types.includes('locality'))?.long_name
      };
    }
    throw new Error("Address not found");
  } catch (error) {
    console.error("Geocoding error:", error);
    return { formattedAddress: "Location detected (Address unavailable)", pincode: null };
  }
};