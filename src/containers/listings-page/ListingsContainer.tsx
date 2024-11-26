'use client'
import React, { useEffect, useState } from 'react';
import { ListingContentCard, ListingFullDetailsCard } from "@components/Cards";
import { useQuery } from '@/contexts/QueryContext';
import { HiOutlineEmojiSad } from "react-icons/hi";
import { findDistanceBetweenTwoPoints } from '@/utils/helper';
import { Listing } from "@/types";

export default function ListingsContainer({ className }: { className: string }) {
    
    const { filters, listings, setListings, circleCenterCoordinates } = useQuery();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

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

        if (circleCenterCoordinates) {
            // Apply the distance filter no matter what
            listings.filter((listing) => 
                findDistanceBetweenTwoPoints(
                    circleCenterCoordinates.lat(),
                    circleCenterCoordinates.lng(),
                    listing.latitude,
                    listing.longitude,
                    true
                ) <= (filters?.max_distance ?? 20)
            );
        }
    }, [filters]);

  
    return (
        <div className={className}>
            <h1 className="text-3xl font-bold w-full px-5 items-center mb-5">{filters?.city} {filters.state} Rental Listings</h1>
            <div className="grid grid-cols-2 gap-4 w-full place-items-center py-1">
                {listings.length > 0 ? listings.map((listing, id) => (
                  <ListingContentCard
                    className="flex flex-col w-[90%] rounded-lg"
                    key={id}
                    listing={listing}
                    toggleFunction={() => {
                      setSelectedListing(listing);
                      setIsPopupOpen(true)
                    }}
                  />
                )) : (
                  <span className="inline-flex items-center justify-evenly w-full h-full bg-red-50">
                      <h1 className="text-lg font-bold">No listings found</h1>
                      <HiOutlineEmojiSad className="text-3xl text-[#013c6c]" />
                  </span>
                )}
                {isPopupOpen && selectedListing &&
                  
                     
                  <ListingFullDetailsCard
                    className="fixed flex flex-row bg-white rounded-lg p-10 gap-x-8 z-[99]"
                    listing={selectedListing}
                    onClose={() => setIsPopupOpen(false)}
                  />
                  
                  
                 
                }
            </div>
        </div>
    );
}