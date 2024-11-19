'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from 'react';
import {  ListingContentCard } from "@components/Cards";
import FiltersContainer from "@containers/listings-page/FiltersContainer";
import { useQuery } from "@contexts/QueryContext"
import { findDistanceBetweenTwoPoints } from "@/utils/helper";

export default function ViewMyListingsContainer() {
    
    const { user } = useAuth();
    const { filters, listings, setListings, currentCoordinates } = useQuery();


    useEffect(() => {
        async function fetchListings() {
            try {
                //this time, pass user uid to searchParams
                console.log(user?.uid);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search?uid=${user?.uid}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filters),
                });

                if (response.ok) {
                    console.log('weh response was ok');
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

        fetchListings();

        if (currentCoordinates) {
            // Apply the distance filter no matter what
            listings.filter((listing) => 
                findDistanceBetweenTwoPoints(
                    currentCoordinates.lat(),
                    currentCoordinates.lng(),
                    listing.latitude,
                    listing.longitude,
                    true
                ) <= (filters?.max_distance ?? 10)
            );
        }
    }, [filters, user?.uid]);


    return (
        <>
            <h1 className="text-3xl font-bold w-full p-5">My Listings</h1>
            <FiltersContainer />
            <div className="grid grid-cols-4 gap-4 w-full place-items-center my-5">
                {listings.length > 0 && listings.map((listing, key) => (
                    <ListingContentCard
                        className="flex flex-col w-[90%] rounded-lg border-2 border-[#013c6c]"
                        key={key}
                        listing={listing}
                    />
                ))}
            </div>
        </>
    );
}