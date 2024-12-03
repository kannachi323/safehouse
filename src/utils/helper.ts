import { Filters } from "@/types";

export async function getCoordinates(address: string) {
const liveKey = process.env.NEXT_PUBLIC_RADAR_API_KEY;  // Make sure your Live Key is set in the environment variables
  console.log(liveKey);
  if (!liveKey) {
    throw new Error("RADAR_API_KEY is missing");
  }

  const url = `https://api.radar.io/v1/geocode/forward?query=${encodeURIComponent(address)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `${liveKey}`,  // Correct authorization header format
      },
    });

    if (!response.ok) {
      throw new Error('Failed to geocode address');
    }

    const data = await response.json();

    // Check if no addresses were found
    if (!data.addresses || data.addresses.length === 0) {
      throw new Error('No coordinates found');
    }

    const latitude = data.addresses[0].latitude;
    const longitude = data.addresses[0].longitude;

    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    return { latitude, longitude };

  } catch (error) {
    console.error('Error:', error);
    throw error;  // Rethrow the error so the caller knows something went wrong
  }
}
export function findDistanceBetweenTwoPoints(
    lat1: number, lon1: number, lat2: number, lon2: number, isMiles: boolean = false,
): number {
    function toRadians(degrees: number) {
        return degrees * (Math.PI / 180);
    }

    // Convert degrees to radians
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);
    const lon1Rad = toRadians(lon1);
    const lon2Rad = toRadians(lon2);

    // Differences in coordinates
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    // Haversine formula
    const a = Math.sin(deltaLat / 2) ** 2 +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return isMiles ? c * 3958.8 : c * 6371; // Radius of Earth in kilometers
}


interface BuildFiltersProps {
    autocompleteRef: React.RefObject<google.maps.places.Autocomplete | null>;
    setCircleCenterCoordinates: (currentCoordiantes: google.maps.LatLng | undefined) => void;
    setFilters: (filters: Filters) => void;
}



export function buildFilters(address_components : any) {

  const newFilters: Filters = {};

  if (address_components) {
    address_components.forEach((component : any) => {
      const types = component.types;

      // Map address component types to the filters
      if (types.includes('street_number')) {
        newFilters.address = component.long_name; // Street number
      } else if (types.includes('route')) {
        newFilters.address = (newFilters.address || '') + ' ' + component.long_name; // Street name
      } else if (types.includes('locality')) {
        newFilters.city = component.long_name; // City
      } else if (types.includes('administrative_area_level_1')) {
        newFilters.state = component.short_name; // State (e.g., 'CA')
      } else if (types.includes('postal_code')) {
        newFilters.zip_code = component.long_name; // Zip code
      }
    });

    return newFilters as Filters;
  }

}

export function buildFiltersFromSearch({ autocompleteRef, setFilters, setCircleCenterCoordinates }: BuildFiltersProps) {
  if (autocompleteRef.current) {
    const place = autocompleteRef.current.getPlace();
    const address_components = place.address_components;

    // Initialize filters object
    const newFilters = buildFilters(address_components);

    if (newFilters) {
      setFilters(newFilters);
    }
    
    localStorage.setItem('autoCompletePlace', JSON.stringify(place));

    if (place.geometry) {
      setCircleCenterCoordinates(place.geometry.location); // Update selected location with place details
      localStorage.setItem('geometry', JSON.stringify(place.geometry.location));
    }
 
  }
};



