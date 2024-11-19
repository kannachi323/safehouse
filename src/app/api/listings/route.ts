import { NextResponse } from 'next/server';
import { createListing } from '@/db/listings/insert';
import { getCoordinates } from '@/utils/helper';


export async function POST(request: Request) {
  try {
   
    const body = await request.json();
    console.log(body);
    const { feature, ...listing } = body;  

   
    const { latitude, longitude } = await getCoordinates(listing.address);

    if (!latitude || !longitude) {
      return NextResponse.json({ error: 'Failed to get coordinates' }, { status: 500 });
    }

    const updatedListing = {
      ...listing,
      latitude: latitude,
      longitude: longitude,

    };

    console.log(updatedListing);

    // Insert the listing into the database
    await createListing(updatedListing, feature);

    return NextResponse.json({ message: 'Listing created successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}
