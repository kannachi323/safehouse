import RENT1 from "@public/images/rent1.jpg";
import Image from "next/image"
import Listing from "@containers/rentals-page/ListingsContainer"

export interface Listing {
    prices: string
    address: string
    features: string
    city: string
    state: string
    zipcode: string
}

interface ListingContentCardProps {
    listing: Listing
}

export function ListingContentCard({listing} : ListingContentCardProps) {
    return (
        <div className="flex flex-col w-[90%] rounded-lg border-2 border-[#013c6c]">
            <Image src={RENT1} alt="some image" className="w-full h-[60%] rounded-t-md" />
            <div className="flex flex-col w-full">
                <h1 className="text-xl">{listing.prices}</h1>
                <p>{listing.features}</p>
                <p>{listing.address}</p>
                <p>{listing.city}</p>
                <p>{listing.state}</p>
                <p>{listing.zipcode}</p>

            </div>
        </div>
    )
}