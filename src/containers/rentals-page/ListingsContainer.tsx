'use client';
import React, { useState } from 'react';
import { ListingContentCard } from "@components/Cards";
import listingsData from "@utils/response.json"; // Import JSON data directly

export default function ListingsContainer() {
    // Initialize state with the imported JSON data
    const [listings, setListings] = useState(listingsData);

    console.log(listings); // For debugging purposes
    console.log(listings[0].prices)
    return (
        <div className="w-[50vw] h-[82vh] overflow-y-scroll">
            <h1 className="text-3xl font-bold w-full p-5">Available for rent</h1>
            <div className="grid grid-cols-2 gap-4 w-full place-items-center">
                {listings.map((listing) => (
                    <ListingContentCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
}
