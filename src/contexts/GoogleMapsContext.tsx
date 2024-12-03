import React, { createContext, useState, useEffect, useContext } from 'react';
import { useJsApiLoader, Libraries } from '@react-google-maps/api';

// Define the type for the context value
interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | null;
}

// Create the context with a default value of `null`
const GoogleMapsContext = createContext<GoogleMapsContextType | null>(null);

export const GoogleMapsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<Error | null>(null);

  const googleMapsAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const googleMapsLibraries = process.env.NEXT_PUBLIC_GOOGLE_MAPS_LIBRARIES?.split(',') as Libraries;


  // Use the Google Maps API loader hook
  const { isLoaded: loaded, loadError: error } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsAPIKey || '',
    libraries: googleMapsLibraries || [],
  });

  useEffect(() => {
    if (loaded) {
      setIsLoaded(true);
    }
    if (error) {
      setLoadError(error);
    }
  }, [loaded, error]);

  // Provide the context value to the children
  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

// Custom hook to access Google Maps context
export const useGoogleMaps = (): GoogleMapsContextType => {
  const context = useContext(GoogleMapsContext);
  if (!context) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
};
