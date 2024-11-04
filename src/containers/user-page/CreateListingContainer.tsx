'use client'

import { MdAdd } from "react-icons/md";
import { useState } from 'react';
import { ListingContentCard } from "@/components/Cards";
import { Listing } from "@components/Cards"

export default function CreateListingContainer() {
    const [showContent, setShowContent] = useState(false)

    let newListing : Listing = {}
    
    return (
      showContent ? (
        <div className="flex flex-col justify-center items-center bg-blue-500 w-full h-full text-3xl"
          onClick={() => setShowContent(!showContent)}
        >
          <ListingContentCard className="flex flex-col w-1/2 h-[90%] rounded-lg border-2 border-[#013c6c]"
            listing={newListing}
          />


         
          
        </div>
        
      ) : (
      
        
        <div className="flex flex-col justify-center items-center bg-red-500 w-1/3 h-1/2 m-5 text-3xl rounded-3xl"
          onClick={() => setShowContent(!showContent)}
        >
          Create a new listing
          <MdAdd className="text-3xl"/>

        </div>

      )
    )
}

