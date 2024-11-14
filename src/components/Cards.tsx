import RENT1 from "@public/images/rent1.jpg";
import Image from "next/image";

export interface Feature {
  bed?: number;
  bath?: number;
}

export interface Listing {
  prices?: string;
  address?: string;
  feature?: Feature;
  city?: string;
  state_code?: string;
  zipcode?: string;
  uid: string;
}

interface ListingContentCardProps {
  className?: string;
  listing?: Listing;
}

export function ListingContentCard({ className, listing }: ListingContentCardProps) {
  return (
    <div className={`${className} bg-white shadow-lg rounded-lg overflow-hidden`}>
      <div className="relative w-full h-[60%]">
        <Image 
          src={RENT1} 
          alt="Listing Image" 
          className="object-cover w-full h-full"
        />
      </div>

      {listing && (
        <div className="flex flex-col w-full p-4">
          {/* Price */}
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">${listing.prices} /mo</h1>
          
          {/* Address Details */}
          <p className="text-gray-700 mt-2">
            {listing.address + ' '}{listing.city + ' '}
            
          </p>
          <p className="text-gray-700 mt-2">
            {listing.state_code + ' '}{listing.zipcode}
          </p>

          {/* Feature */}
          {listing.feature && (
            <p className="text-gray-600 text-sm mt-2">
              {listing.feature.bed ?? 0} bd / {listing.feature.bath ?? 0} ba
            </p>
          )}
        </div>
      )}
    </div>
  );
}
