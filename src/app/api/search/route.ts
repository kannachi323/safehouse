import { NextResponse } from 'next/server';
import { getListings, getMediaByListingId } from '@/db/listings/select';
import { Listing, Media } from '@/types';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    
    try {
        const filters = await request.json();
  
        
        if (uid) {
            filters.uid = uid;
        }
 
        let listings = await getListings(filters);

        const listingIds = listings.map((listing) => listing.listing_id);
        
         //now fetch all the media and put them in listings
        const mediaRows = await getMediaByListingId(listingIds);
        const mediaByListingId = mediaRows.reduce<Record<number, Media[]>>((acc, mediaItem: Media) => {
            if (!acc[mediaItem.listing_id]) {
                acc[mediaItem.listing_id] = [];
            }
            acc[mediaItem.listing_id].push(mediaItem);
            return acc;
        }, {});

        const fullListings = listings.map((listing) => ({
            ...listing,
            media: mediaByListingId[listing.listing_id],
        }));

        
        
        
        return NextResponse.json(fullListings as Listing[], { status: 200 });
    
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}
