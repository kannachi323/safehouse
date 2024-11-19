'use client'
import { useQuery } from '@/contexts/QueryContext';
import { findDistanceBetweenTwoPoints } from '@/utils/helper';
import { Circle, GoogleMap, Marker } from '@react-google-maps/api';

export default function MapsContainer() {
  const { currentCoordinates, listings, filters } = useQuery();

  
  const defaultCoordinates = new google.maps.LatLng(36.9741, -122.0308);
  const mapCenter = currentCoordinates ?? defaultCoordinates;
 

  const maxRadius = filters?.max_radius ?? 1;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '50vw', height: '82vh' }}
      center={mapCenter}  // Set map center to coordinates
      zoom={14}
    >
      {listings && listings.length > 0 && listings.map((listing, index) => {
        const listingCoordinates = new google.maps.LatLng(listing.latitude, listing.longitude);

        // Calculate the distance and check if it's within the max radius
        const distance = findDistanceBetweenTwoPoints(
          mapCenter.lat(),
          mapCenter.lng(),
          listingCoordinates.lat(), 
          listingCoordinates.lng(), 
          true //this boolean is for converting to miles (default is km)
        );

        if (distance <= maxRadius) {
          return (
            <Marker key={index} position={listingCoordinates} />
          );
        }

        return null;
      })}

      <Circle 
        center={mapCenter} 
        radius={maxRadius * 1609.34}  // Convert miles to meters (1 mile = 1609.34 meters)
        options={{
          fillColor: 'blue',
          fillOpacity: 0.2,
          strokeColor: 'blue',
          strokeOpacity: 0.5,
          strokeWeight: 2,
        }}
      />
    </GoogleMap>
  );
}
