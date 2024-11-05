'use client';
import React, { useState } from 'react';
import { ListingContentCard } from "@components/Cards";
import listingsData from "@utils/response.json"; // Import JSON data directly

interface Props {
    className : string;
}

export default function ListingsContainer({className} : Props) {
    // Initialize state with the imported JSON data
    const [listings, setListings] = useState(listingsData);

    console.log(listings); // For debugging purposes
    console.log(listings[0].prices)
    return (
        <div className={className}>
            <h1 className="text-3xl font-bold w-full p-5">Available for rent</h1>
            <div className="grid grid-cols-2 gap-4 w-full place-items-center">
                {listings.map((listing) => (
                    <ListingContentCard className="flex flex-col w-[90%] rounded-lg border-2 border-[#013c6c]"
                    key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    );
}