'use client'
import { ListingContentCard } from "@components/Cards"
import { useState } from 'react';


export default function ListingsContainer() {
    const [listings, setListings] = useState([
        {price : "$1,500-$9,999/mo", address : "1156 High St, Santa Cruz, CA 95064", features: "2bd/2ba"},
        {price : "$1,500-$9,999/mo", address : "1156 High St, Santa Cruz, CA 95064", features: "2bd/2ba"},
        {price : "$1,500-$9,999/mo", address : "1156 High St, Santa Cruz, CA 95064", features: "2bd/2ba"},
        {price : "$1,500-$9,999/mo", address : "1156 High St, Santa Cruz, CA 95064", features: "2bd/2ba"},
        {price : "$1,500-$9,999/mo", address : "1156 High St, Santa Cruz, CA 95064", features: "2bd/2ba"},
        {price : "$1,500-$9,999/mo", address : "1156 High St, Santa Cruz, CA 95064", features: "2bd/2ba"},
        {price : "$1,500-$9,999/mo", address : "1156 High St, Santa Cruz, CA 95064", features: "2bd/2ba"},
    ])


    return (
        <div className="w-[50vw]">
            <h1 className="text-3xl font-bold w-full p-5">Available for rent</h1>
            <div className="grid grid-cols-2 gap-4 w-full place-items-center">
                {listings.map((listing, index) => (
                    <ListingContentCard key={index} content={listing}/>
                ))}
            </div>
        </div>
    )
}
