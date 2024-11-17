import React, { useEffect, useState } from 'react';
import { ListingContentCard } from "@components/Cards";
import { useQuery } from '@/contexts/QueryContext';
import { HiOutlineEmojiSad } from "react-icons/hi";

interface Feature {
    bed_count?: number;
    bath_count?: number;
    room_type?: string;
    roommate_gender?: string;
    distance_from_school?: number;
    is_pets?: boolean;
  }
  
  
  interface Listing {
    price?: number;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    uid: string;
    feature?: Feature;
  }

export interface Filters {
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    bed_count?: number;
    bath_count?: number;
    min_price?: number;
    max_price?: number;
    homeType?: string;
    room_type?: string;
    roommate_gender?: string;
    pets?: boolean;
    distance_from_school?: number;
}

function buildFilterParams(filters: Filters) {
    const queryParams = new URLSearchParams();
    if (filters.address) queryParams.append('address', filters.address);
    if (filters.city) queryParams.append('city', filters.city);
    if (filters.state) queryParams.append('state', filters.state);
    if (filters.zip_code) queryParams.append('zip_code', filters.zip_code);
    if (filters.min_price) queryParams.append('min_price', String(filters.min_price));
    if (filters.max_price) queryParams.append('max_price', String(filters.max_price));
    if (filters.bed_count) queryParams.append('bed_count', String(filters.bed_count));
    if (filters.bath_count) queryParams.append('bath_count', String(filters.bath_count));
    if (filters.room_type) queryParams.append('room_type', filters.room_type);
    if (filters.roommate_gender) queryParams.append('roommate_gender', filters.roommate_gender);
    if (filters.pets) queryParams.append('pets', String(filters.pets));
    if (filters.distance_from_school) queryParams.append('distance_from_school', String(filters.distance_from_school));
    console.log(queryParams);
    return queryParams.toString();
}

export default function ListingsContainer({ className }: { className: string }) {
    const [listings, setListings] = useState<Listing[]>([]);
    const { filters } = useQuery();


    useEffect(() => {
        async function fetchUserListings() {
            try {
                const filtersParams = buildFilterParams(filters);
                console.log(filtersParams);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?${filtersParams}`);

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    setListings(data);  // Set merged listings
                } else {
                    console.error("Failed to fetch listings:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        }

        fetchUserListings();
    }, [filters]);  // Depend on debounced filters

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
