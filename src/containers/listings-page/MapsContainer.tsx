'use client'
import { useQuery } from '@/contexts/QueryContext';
import { GoogleMap, Marker } from '@react-google-maps/api';

export default function MapsContainer() {
  const { selectedLocation } = useQuery();
  
  const defaultCoordinates = { lat: 36.9741, lng: -122.0308 };
  

  const coordinates = selectedLocation?.geometry?.location
    ? { lat: selectedLocation.geometry.location.lat(), lng: selectedLocation.geometry.location.lng() }
    : defaultCoordinates;

  // Set the map center to the coordinates (use the selected location if available)
  const mapCenter = coordinates;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '50vw', height: '82vh' }}
      center={mapCenter}  // Set map center to coordinates
      zoom={12}
    >
      <Marker position={coordinates} />
    </GoogleMap>
  );
}
