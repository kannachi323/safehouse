'use client'
import React, { useEffect } from 'react';
import { ListingContentCard } from "@components/Cards";
import { useQuery } from '@/contexts/QueryContext';
import { HiOutlineEmojiSad } from "react-icons/hi";
import { findDistanceBetweenTwoPoints } from '@/utils/helper';

export default function ListingsContainer({ className }: { className: string }) {
    
    const { filters, listings, setListings, currentCoordinates } = useQuery();

    useEffect(() => {
        async function fetchUserListings() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filters),
                });

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

        if (currentCoordinates) {
            // Apply the distance filter no matter what
            listings.filter((listing) => 
                findDistanceBetweenTwoPoints(
                    currentCoordinates.lat(),
                    currentCoordinates.lng(),
                    listing.latitude,
                    listing.longitude,
                    true
                ) <= (filters?.max_distance ?? 20)
            );
        }
    }, [filters]);

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