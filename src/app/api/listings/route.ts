import { NextResponse } from 'next/server';
import { createListing } from '@/db/listings/insert';
import { deleteListing } from '@/db/listings/delete';
import { getCoordinates } from '@/utils/helper';


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
    // Insert the listing into the database
    await createListing(updatedListing, feature, media);

    return NextResponse.json({ message: 'Listing created successfully' }, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const listingId = searchParams.get('listingId');

    if (!listingId) {
      return NextResponse.json({ error: 'Missing listingId parameter' }, { status: 400 });
    }

    // Convert listingId to a number
    const listingIdNumber = Number(listingId);
    if (isNaN(listingIdNumber)) {
      return NextResponse.json({ error: 'Invalid listingId parameter' }, { status: 400 });
    }

    // Delete the listing from the database
    await deleteListing(listingIdNumber);

    return NextResponse.json({ message: 'Listing deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return NextResponse.json({ error: 'Failed to delete listing' }, { status: 500 });
  }
}
