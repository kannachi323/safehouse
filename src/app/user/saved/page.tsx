'use client';
import React, { useEffect } from 'react';
import UserManagerContainer from "@/containers/user-page/UserManagerContainer";
import { ListingContentCard } from "@/components/Cards";
import { QueryProvider, useQuery } from "@/contexts/QueryContext";
import { useAuth } from "@/contexts/AuthContext";

function SavedSearchesContent() {
  const { user } = useAuth();
  const { bookmarkedListings, setBookmarkedListings } = useQuery();

  useEffect(() => {
    if (!user) return;

    async function fetchBookmarks() {
      try {
        const response = await fetch(`/api/bookmarks?uid=${user.uid}`);
        if (response.ok) {
          const data = await response.json();
          setBookmarkedListings(data); // Update state
        } else {
          console.error("Failed to fetch bookmarks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    }

    fetchBookmarks();
  }, [user, setBookmarkedListings]);

  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-3xl font-bold p-6">Saved Searches</h1>
      {bookmarkedListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {bookmarkedListings.map((listing) => (
            <ListingContentCard
              key={listing.listing_id}
              listing={listing}
              isBookmarked={true}
              onBookmark={() => {}}
            />
          ))}
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
    <QueryProvider>
      <UserManagerContainer node="saved">
        <SavedSearchesContent />
      </UserManagerContainer>
    </QueryProvider>
  );
}
