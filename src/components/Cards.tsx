import RENT1 from "@public/images/rent1.jpg";
import Image from "next/image"
import Listing from "@/containers/listings-page/ListingsContainer"

export interface Listing {
    prices?: string
    address?: string
    features?: string
    city?: string
    state?: string
    zipcode?: string;
    id?: number
}

interface ListingContentCardProps {
    className? : string
    listing: Listing
}

export function ListingContentCard({ className, listing }: ListingContentCardProps) {
    return (
        <div className={`${className} bg-white shadow-lg rounded-lg overflow-hidden`}>
            <Image src={RENT1} alt="some image" className="w-full h-[60%] object-cover" />
            <div className="flex flex-col w-full p-4">
                {/* Price */}
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">{listing.prices} /mo</h1>
                
                {/* Address and Features */}
                <p className="text-gray-600 text-sm">{listing.features}</p>
                
                {/* Address Details */}
                <p className="text-gray-700 mt-2">
                    {listing.address}, {listing.city}, {listing.state} {listing.zipcode}
                </p>
            </div>
        </div>
    );
}
