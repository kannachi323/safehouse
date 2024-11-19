'use client'

import { useQuery } from '@/contexts/QueryContext';
import { Autocomplete } from '@react-google-maps/api';
import { IoMdSearch } from "react-icons/io";
import { useRef } from 'react';
import { buildFilters } from '@/utils/helper';

type SearchBarProps = {
  children?: React.ReactNode;
  className?: string;
}

export default function SearchBar({ children, className }: SearchBarProps) {
  const { setCurrentCoordinates, setFilters } = useQuery();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  function handlePlaceChanged() {
    buildFilters({ autocompleteRef, setFilters, setCurrentCoordinates });
  }

  

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
