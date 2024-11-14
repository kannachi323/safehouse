'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from 'react';
import { Listing, ListingContentCard } from "@components/Cards";
import FiltersContainer from "@containers/listings-page/FiltersContainer";
import { QueryProvider, useQuery } from "@contexts/QueryContext"

export default function ViewMyListingsContainer() {
    const [userListings, setUserListings] = useState<Listing[]>([]);
    
    const { user } = useAuth();

     useEffect(() => {
        async function fetchUserListings() {        
            try {
                const response = await fetch(`http://localhost:3000/api/search?uid=${user?.uid}&city=${city}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setUserListings(data); // Assuming the API returns the listings array
                } else {
                    console.error("Failed to fetch listings:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching listings:", error);
            }
        }

        if (user?.uid) {
            fetchUserListings();
        }
        
       
     }, [user])

    return (
        <QueryProvider>
            <h1 className="text-3xl font-bold w-full p-5">My Listings</h1>
            <FiltersContainer />
            <div className="grid grid-cols-4 gap-4 w-full place-items-center my-5">
                {userListings && userListings.map((listing, key) => (
                    <ListingContentCard
                        className="flex flex-col w-[90%] rounded-lg border-2 border-[#013c6c]"
                        key={key}
                        listing={listing}
                    />
                ))}
            </div>
        </QueryProvider>
    );
}