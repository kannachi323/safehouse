import { Filters } from "@/types";

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
    setCurrentCoordinates: (currentCoordiantes: google.maps.LatLng | undefined) => void;
    setFilters: (filters: Filters) => void;
}

export function buildFilters({ autocompleteRef, setFilters, setCurrentCoordinates }: BuildFiltersProps) {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      const address_components = place.address_components;

      // Initialize filters object
      const newFilters: Filters = {};

      if (address_components) {
        address_components.forEach((component) => {
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

        // Set filters based on the extracted components
        setFilters(newFilters);
      }
 
      if (place.geometry) {
        setCurrentCoordinates(place.geometry.location); // Update selected location with place details
      }
    }
  };