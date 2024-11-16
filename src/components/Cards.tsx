'use client';
import RENT1 from "@public/images/rent1.jpg";
import RENT2 from "@public/images/rent2.jpg";
import SAMMY from "@public/images/sammy_logo.jpg";
import BKG from "@public/images/bkg1.jpg";
import { useState } from 'react';
import Image from "next/image";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  
  const images = [RENT1, RENT2, SAMMY, BKG]; // Keep these as imports

  function nextStep() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function prevStep() {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }

  return (
    <div className={`${className} bg-white shadow-lg rounded-lg overflow-hidden`}>
      <div id="framer-slideshow" className="relative w-full h-[200px]" onMouseEnter={() => setShowArrows(true)} onMouseLeave={() => setShowArrows(false)}> 
        
        <Image
          src={images[currentIndex]} // Correct src usage
          alt="Listing Image"
          className="object-cover w-full h-full"
        />
        {showArrows && 
          <button
            className="absolute top-1/2 left-0 text-white"
            onClick={prevStep}
          >
            <MdKeyboardArrowLeft className="text-5xl"/>
          </button>
        }
        {showArrows &&
          <button
            className="absolute top-1/2 right-0 text-white"
            onClick={nextStep}
          >
            <MdKeyboardArrowRight className="text-5xl" />
          </button>
        }
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
