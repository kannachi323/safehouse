'use client'
import { useQuery } from '@/contexts/QueryContext';
import { findDistanceBetweenTwoPoints } from '@/utils/helper';
import { Circle, GoogleMap, Marker } from '@react-google-maps/api';
import { Listing } from '@/types';

interface MapsContainerProps {
  width: string;
  height: string;
  showRadius?: boolean;
  listing?: Listing; 
}

export default function MapsContainer({width, height, showRadius = true, listing = undefined}: MapsContainerProps) {
  const { circleCenterCoordinates, listings, filters } = useQuery();
  if (listing && listing.latitude && listing.longitude) {
    console.log(listing.latitude, listing.longitude);
  }

  
  const defaultCoordinates = new google.maps.LatLng(36.9741, -122.0308);
  const mapCenter = circleCenterCoordinates ?? defaultCoordinates;
 

  const maxRadius = filters?.max_distance ?? 5;
  console.log(listing?.latitude, listing?.longitude);

  //apply the distance filter no matter what (we might need to think abt this)
  const filteredListings = listings.filter((listing) => findDistanceBetweenTwoPoints(mapCenter.lat(), mapCenter.lng(), listing.latitude, listing.longitude, true) <= maxRadius);
  
  return (
    <GoogleMap
      mapContainerStyle={{ width: width, height: height }}
      center={listing ? new google.maps.LatLng(listing.latitude, listing.longitude) : mapCenter}
      zoom={12}
    >
      {listing ? (
        <Marker position={new google.maps.LatLng(listing.latitude, listing.longitude)} />
      ) : (
        filteredListings.map((listing, index) => (
          <Marker key={index} position={new google.maps.LatLng(listing.latitude, listing.longitude)} />
        ))
      )}
      
      {showRadius && maxRadius > 0 &&
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
