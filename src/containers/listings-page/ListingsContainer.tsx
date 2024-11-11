'use client';
import React, { useEffect, useState } from 'react';
import { ListingContentCard } from "@components/Cards";
import { Listing } from '@components/Cards';
import { Filters, useQuery } from '@/contexts/QueryContext';


function buildFilterParams(filters : Filters) {
  const queryParams = new URLSearchParams();
    
  filters.address && queryParams.append('address', filters.address);
  filters.city && queryParams.append('city', filters.city);
  filters.state && queryParams.append('state', filters.state);
  filters.zip_code && queryParams.append('zip_code', filters.zip_code);
  
  return queryParams.toString();
}

interface Props {
  className : string;
}

export default function ListingsContainer({className} : Props) {
    const [listings, setListings] = useState<Listing[]>([]);

    const { filters, refresh } = useQuery();

    useEffect(() => {
       async function fetchUserListings() {        
           try {
              const filtersParams = buildFilterParams(filters)
              console.log(filtersParams)
              const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?${filtersParams}`);
              
              if (response.ok) {
                  const data = await response.json();
                  console.log(data);
                  console.log('happy');
                  setListings(data); // Assuming the API returns the listings array
              } else {
                  console.error("Failed to fetch listings:", response.statusText);
              }
           } catch (error) {
               console.error("Error fetching listings:", error);
           }
       }
        fetchUserListings();
    }, [refresh])

   


    return (
        <div className={className}>
            <h1 className="text-3xl font-bold w-full p-5">Available for rent</h1>
            <div className="grid grid-cols-2 gap-4 w-full place-items-center">
                {listings?.map((listing, id) => (
                    <ListingContentCard className="flex flex-col w-[90%] rounded-lg border-2 border-[#013c6c]"
                    key={id} listing={listing} />
                ))}
            </div>
        </div>
    );
}