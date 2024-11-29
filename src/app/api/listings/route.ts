import { NextResponse } from 'next/server';
import { createListing } from '@/db/listings/insert';
import { getCoordinates } from '@/utils/helper';
import { Media } from '@/types';


export async function POST(request: Request) {
  try {
   
    const body = await request.json();
    
    const { feature, media, ...listing } = body;  

   
    const { latitude, longitude } = await getCoordinates(listing.address);

    if (!latitude || !longitude) {
      return NextResponse.json({ error: 'Failed to get coordinates' }, { status: 500 });
    }

    const updatedListing = {
      ...listing,
      latitude: latitude,
      longitude: longitude,

    };
    console.log(media);
    // Insert the listing into the database
    await createListing(updatedListing, feature, media);

    return NextResponse.json({ message: 'Listing created successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}
