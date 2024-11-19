'use client'
import { useQuery } from '@/contexts/QueryContext';
import { findDistanceBetweenTwoPoints } from '@/utils/helper';
import { Circle, GoogleMap, Marker } from '@react-google-maps/api';

export default function MapsContainer() {
  const { currentCoordinates, listings, filters } = useQuery();

  
  const defaultCoordinates = new google.maps.LatLng(36.9741, -122.0308);
  const mapCenter = currentCoordinates ?? defaultCoordinates;
 

  const maxRadius = filters?.max_distance ?? 5;
  console.log(maxRadius);

  //apply the distance filter no matter what (we might need to think abt this)
  const filteredListings = listings.filter((listing) => findDistanceBetweenTwoPoints(mapCenter.lat(), mapCenter.lng(), listing.latitude, listing.longitude, true) <= maxRadius);

  return (
    <GoogleMap
      mapContainerStyle={{ width: '50vw', height: '82vh' }}
      center={mapCenter}  // Set map center to coordinates
      zoom={14}
    >
      {filteredListings && filteredListings.length > 0 && filteredListings.map((listing, index) => {
        const listingCoordinates = new google.maps.LatLng(listing.latitude, listing.longitude);
        return (
          <Marker key={index} position={listingCoordinates} />
        );
      })}
      {maxRadius > 0 &&
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
      }
    </GoogleMap>
  );
}
