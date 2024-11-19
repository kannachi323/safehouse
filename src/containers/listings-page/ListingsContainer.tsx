'use client'
import React, { useEffect } from 'react';
import { ListingContentCard } from "@components/Cards";
import { useQuery } from '@/contexts/QueryContext';
import { HiOutlineEmojiSad } from "react-icons/hi";
import { Filters } from "@/types";



function buildFilterParams(filters: Filters) {
    const queryParams = new URLSearchParams();

    // Define mapping of filters to URL parameter names
    const filterMap = {
        address: filters.address,
        city: filters.city,
        state: filters.state,
        zip_code: filters.zip_code,
        min_price: filters.min_price,
        max_price: filters.max_price,
        bed_count: filters.bed_count,
        bath_count: filters.bath_count,
        room_type: filters.room_type,
        roommate_gender: filters.roommate_gender,
        pets: filters.pets,
        max_radius: filters.max_radius,
    };

    // Iterate over the filter map and append non-null values
    for (const [key, value] of Object.entries(filterMap)) {
        if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
        }
    }

    console.log(queryParams);
    return queryParams.toString();
}


export default function ListingsContainer({ className }: { className: string }) {
    
    const { filters, listings, setListings } = useQuery();


    useEffect(() => {
        async function fetchUserListings() {
            try {
                const filtersParams = buildFilterParams(filters);
                console.log(filtersParams);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?${filtersParams}`);

                if (response.ok) {
                    const listings = await response.json();
                    console.log(listings);
                    setListings(listings);
                } else {
                    console.error("Failed to fetch listings:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        }

        fetchUserListings();
    }, [filters, setListings]);

    return (
        <div className={className}>
            <h1 className="text-3xl font-bold w-full pb-5">Available for rent</h1>
            <div className="grid grid-cols-2 gap-4 w-full place-items-center">
                {listings.length > 0 ? listings.map((listing, id) => (
                    <ListingContentCard
                        className="flex flex-col w-[90%] rounded-lg border-2 border-[#013c6c]"
                        key={id}
                        listing={listing}
                    />
                )) : (
                    <span className="inline-flex items-center justify-evenly w-full h-full bg-red-50">
                        <h1 className="text-lg font-bold">No listings found</h1>
                        <HiOutlineEmojiSad className="text-3xl text-[#013c6c]" />
                    </span>
                )}
            </div>
        </div>
    );
}
