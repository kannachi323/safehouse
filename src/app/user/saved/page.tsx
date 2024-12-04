'use client';
import React, { useEffect, useState } from 'react';
import UserManagerContainer from "@/containers/user-page/UserManagerContainer";
import { ListingContentCard, ListingFullDetailsCard } from "@/components/Cards";
import { useQuery } from "@/contexts/QueryContext";
import { useAuth } from "@/contexts/AuthContext";
import { Listing } from '@/types';


function SavedSearchesContent() {
  const { user } = useAuth();
  const { listings, setListings } = useQuery();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  
  useEffect(() => {
    if (!user) return;
    fetchBookmarks();
  }, []);

  async function fetchBookmarks() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookmarks?uid=${user?.uid}`);
      if (response.ok) {
        const savedListings = await response.json();
        setListings(savedListings);
        
      } else {
        console.error("Failed to fetch bookmarks:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  }
  

  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-3xl font-bold p-6">Saved Searches</h1>
      {listings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {listings.map((listing, id) => (
            <ListingContentCard
              className="flex flex-col w-[90%] rounded-lg"
              key={id}
              listing={listing}
              toggleFunction={() => {
                setSelectedListing(listing);
                setIsPopupOpen(true)
              }}
            />
          ))}
           {isPopupOpen && selectedListing &&   
              <ListingFullDetailsCard
                className="fixed flex flex-row bg-white rounded-lg p-10 gap-x-8 z-[99]"
                listing={selectedListing}
                onClose={() => setIsPopupOpen(false)}
              />
            }
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-lg mx-6">
          <p className="text-gray-500 text-lg">
            No saved listings yet. Start bookmarking your favorite listings!
          </p>
        </div>
      )}
    </div>
  );
}


export default function SavedSearchesPage() {
  return (
    
      <UserManagerContainer node="saved">
        <SavedSearchesContent />
      </UserManagerContainer>
   
  );
}
