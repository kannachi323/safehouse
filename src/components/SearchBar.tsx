'use client'

import { Filters, useQuery } from '@/contexts/QueryContext';
import { Autocomplete } from '@react-google-maps/api';
import { IoMdSearch } from "react-icons/io";
import { useRef } from 'react';

type SearchBarProps = {
  children?: React.ReactNode;
  className?: string;
}

export default function SearchBar({ children, className }: SearchBarProps) {
  const { setSelectedLocation, setFilters } = useQuery();



  // Create a ref for the Autocomplete component
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
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
        setSelectedLocation(place); // Update selected location with place details
      }
    }
  };

  return (
    <div className={className}>
      <Autocomplete
        onLoad={(autocomplete) => { autocompleteRef.current = autocomplete }} // Store the Autocomplete instance
        onPlaceChanged={handlePlaceChanged} 
        className="flex w-full items-center"
      >
        <input
          className="rounded-md inline-flex h-7 outline-none text-base text-[#013c6c] px-2 w-full"
          id="search-bar"
          type="search"
          placeholder="Enter an address, neighborhood, city, or ZIP code"
          autoComplete="off"
        />
      </Autocomplete>
      {children}
      <button>
        <IoMdSearch className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0" />
      </button>
    </div>
  );
}
