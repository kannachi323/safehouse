
import { useState } from 'react';
import { getCity } from '@utils/db'
import { IoMdSearch } from "react-icons/io";
import { useQuery } from "@contexts/QueryContext"

type SearchBarProps = {
  children? : React.ReactNode
  width: string
}

export default function SearchBar({children, width} : SearchBarProps) {
   const queryContext = useQuery();

   const { searchQuery, setSearchQuery } = queryContext;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        getCity(searchQuery);
      }
    };

    return (
      <span className="inline-flex items-center justify-center rounded-lg bg-white h-9 border-[#013c6c] border-2"
        style={{width}}
      >
        <input className="rounded-md inline-flex h-7 outline-none text-base text-[#013c6c] px-2 w-full"
          id="search-bar"
          type="search" 
          placeholder="Enter an address, neighborhood, city, or ZIP code"
          onChange={(e) => {{
            setSearchQuery(e.target.value)
            console.log(searchQuery);
          }}}
          onKeyDown={handleKeyDown}
        />
        {children}
        <IoMdSearch className="text-3xl text-black hover:text-[#d4d2d2] cursor-pointer m-0"
          onClick={() => getCity(searchQuery) }
        />
      </span>
         
      
        
        
    )
}