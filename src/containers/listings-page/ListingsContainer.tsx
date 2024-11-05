import { ListingContentCard } from "@components/Cards";
import { Listing } from "@components/Cards"

interface Props {
    className : string;
    listings : Listing[]
}

export default function ListingsContainer({className, listings} : Props) {

    return (
        <div className={className}>
            <h1 className="text-3xl font-bold w-full p-5">Available for rent</h1>
            <div className="grid grid-cols-2 gap-4 w-full place-items-center">
                {listings.map((listing, key) => (
                    <ListingContentCard className="flex flex-col w-[90%] rounded-lg border-2 border-[#013c6c]"
                    key={key} listing={listing} />
                ))}
            </div>
        </div>
    );
}