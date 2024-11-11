
'use client'

import { useQuery } from '@/contexts/QueryContext';
import { IoMdSearch } from "react-icons/io";

interface Location {
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}

function parseAddress(input: string): Location {
  const location: Location = {};

  // Updated regex to handle optional unit/apartment numbers in the address
  const regex = /^(.+?),\s*([A-Za-z\s]+),\s*([A-Z]{2})\s*(\d{5})$/;
  const match = input.match(regex);

  if (match) {
      location.address = match[1].trim(); // Street address with optional apartment number
      location.city = match[2].trim();    // City name
      location.state = match[3];          // State code
      location.zip_code = match[4];       // Zip code
  } else {
      console.error("Input address format is invalid or does not match expected pattern.");
  }

  return location;
}

// Test the function
const addressString = "433 E Duarte Rd Apt A, Arcadia, CA 91006";
console.log(parseAddress(addressString));


type SearchBarProps = {
  children? : React.ReactNode
  className? : string;
}

export default function SearchBar({children, className } : SearchBarProps) {
   const { searchQuery, setSearchQuery, setFilters, setRefresh, refresh } = useQuery();

    const handleQuery = () => {
      console.log(searchQuery)
      const updatedFilters = parseAddress(searchQuery)
      setFilters((prevFilters) => ({
        ...prevFilters,
        ...updatedFilters,
      }));
      setRefresh(!refresh);

    }
  

    return (
      <span className={className}>
        <input className="rounded-md inline-flex h-7 outline-none text-base text-[#013c6c] px-2 w-full"
          id="search-bar"
          type="search" 
          placeholder="Enter an address, neighborhood, city, or ZIP code"
          onChange={(e) => {{
            setSearchQuery(e.target.value)
          }}}
          onKeyDown={handleQuery}
        />
        {children}
        <button onClick={handleQuery}>
          <IoMdSearch className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0"/>
        </button>
        
      </span>
         
      
        
        
    )
}