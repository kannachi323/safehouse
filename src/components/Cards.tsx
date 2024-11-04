import RENT1 from "@public/images/rent1.jpg";
import Image from "next/image"
import Listing from "@/containers/listings-page/ListingsContainer"

export interface Listing {
    prices?: string
    address?: string
    features?: string
    city?: string
    state?: string
    zipcode?: string | number | null;
    id?: number
}

interface ListingContentCardProps {
    className? : string
    listing: Listing
}

export function ListingContentCard({ className, listing } : ListingContentCardProps) {
    return (
        <div className={className}>
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