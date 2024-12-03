'use client'

import { useQuery } from '@/contexts/QueryContext';
import { Autocomplete } from '@react-google-maps/api';
import { IoMdSearch } from "react-icons/io";
import { useRef } from 'react';
import { buildFilters, buildFiltersFromSearch } from '@/utils/helper';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

type SearchBarProps = {
  children?: React.ReactNode;
  className?: string;
}

export default function SearchBar({ children, className }: SearchBarProps) {
  const { setCircleCenterCoordinates, setFilters } = useQuery();
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('autoCompletePlace')) {
      const place = JSON.parse(localStorage.getItem('autoCompletePlace') as string);
      const address_components = place.address_components;
      if (address_components) {
        const newFilters = buildFilters(address_components);
        if (newFilters) {
          setFilters(newFilters);
        }
      }
    }
    if (localStorage.getItem('circleCenterCoordinates')) {
      const geometry = JSON.parse(localStorage.getItem('circleCenterCoordinates') as string);
      setCircleCenterCoordinates(geometry.location)
    }
  }, []);
  

  return (
    <div className={className}>
      <Autocomplete
        onLoad={(autocomplete) => { autocompleteRef.current = autocomplete }}
        onPlaceChanged={() => buildFiltersFromSearch({ autocompleteRef, setFilters, setCircleCenterCoordinates })} 
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
        <IoMdSearch className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0" 
          onClick={() => router.push('/listings/default')}
        />
      </button>
    </div>
  );
}