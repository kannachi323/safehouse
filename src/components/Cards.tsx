import RENT1 from "@public/images/rent1.jpg";
import Image from "next/image"
import Listing from "@containers/rentals-page/ListingsContainer"

export interface Listing {
    price: string
    address: string
    features: string
}

interface ListingContentCardProps {
    content: Listing
}

export function ListingContentCard({content} : ListingContentCardProps) {
    return (
        <div className="flex flex-col w-[90%] rounded-lg border-2 border-[#013c6c]">
            <Image src={RENT1} alt="some image" className="w-full h-[60%] rounded-t-md" />
            <div className="flex flex-col w-full">
                <h1 className="text-xl">{content.price}</h1>
                <p>{content.features}</p>
                <p>{content.address}</p>
            </div>
        </div>
    )
}