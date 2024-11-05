'use client';

import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from 'react';
import { Listing, ListingContentCard } from "@components/Cards";


export default function ViewMyListingsContainer() {
    const [params, setParams] = useState({})
    const [userListings, setUserListings] = useState<Listing[]>([]);
     // Fetch user listings on `params` change
     useEffect(() => {
        getUserListings(params);
    }, [params]); 
    

    const { user } = useAuth();
   

    if (!user) {
        return null;
    }


    const getUserListings = async (params: Record<string, string>) => {
        const urlParams = new URLSearchParams(params);
        console.log(urlParams);

        try {
            const response = await fetch(`http://localhost:3000/api/search?${urlParams.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setUserListings(data); // Assuming the API returns the listings array
            } else {
                console.error("Failed to fetch listings:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

   

    console.log(userListings);
    return (
        <>
            <h1 className="text-3xl font-bold w-full p-5">Available for rent</h1>
            <div className="grid grid-cols-4 gap-4 w-full place-items-center">
                {userListings && userListings.map((listing, key) => (
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
