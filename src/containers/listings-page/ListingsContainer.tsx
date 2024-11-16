'use client';
import React, { useEffect, useState } from 'react';
import { ListingContentCard } from "@components/Cards";
import { Listing } from '@components/Cards';
import { Filters, useQuery } from '@/contexts/QueryContext';
import { HiOutlineEmojiSad } from "react-icons/hi";


function buildFilterParams(filters : Filters) {
  const queryParams = new URLSearchParams();
    
  if (filters.address) queryParams.append('address', filters.address);
  if (filters.city) queryParams.append('city', filters.city);
  if (filters.state) queryParams.append('state', filters.state);
  if (filters.zip_code) queryParams.append('zip_code', filters.zip_code);
  
  return queryParams.toString();
}

interface Props {
  className : string;
}

export default function ListingsContainer({className} : Props) {
    const [listings, setListings] = useState<Listing[]>([]);

    const { filters } = useQuery();

    useEffect(() => {
       async function fetchUserListings() {        
           try {
              const filtersParams = buildFilterParams(filters)
              console.log('i fetched user listings')
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?${filtersParams}`);
              
              if (response.ok) {
                  const data = await response.json();
                  console.log(data);
                  setListings(data); // Assuming the API returns the listings array
              } else {
                  console.error("Failed to fetch listings:", response.statusText);
              }
           } catch (error) {
               console.error("Error fetching listings:", error);
           }
       }
        fetchUserListings();
    }, [filters])

   


    return (
        <div className={className}>
            <h1 className="text-3xl font-bold w-full pb-5">Available for rent</h1>
            <div className="grid grid-cols-2 gap-4 w-full place-items-center">
                {listings.length > 0 ? listings.map((listing, id) => (
                    
                    <ListingContentCard className="flex flex-col w-[90%] rounded-lg border-2 border-[#013c6c]"
                    key={id} listing={listing} />
                )) : (
                    <span className="inline-flex items-center justify-evenly w-full h-full bg-red-50">
                        <h1 className="text-lg font-bold">No listings found</h1>
                        <HiOutlineEmojiSad className="text-3xl text-[#013c6c]"/>
                    </span>
                   
                )}
            </div>
        </div>
    );
}