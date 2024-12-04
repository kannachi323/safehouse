import { db } from '../index';
import { bookmarks, listings, features } from '../schema';
import { eq } from 'drizzle-orm/expressions';
import { getMediaByListingId } from '../listings/select';
import { Media } from '@/types';

export async function getBookmarks(uid: string) {
  try {
    // Fetch bookmarks, related listing details, and features
    const rows = await db
      .select({
        bookmark_listing_id: bookmarks.listing_id, // Alias to avoid conflict
        listingDetails: listings, // Fetch all columns from listings
        featureDetails: features, // Fetch all columns from features
      })
      .from(bookmarks)
      .innerJoin(listings, eq(bookmarks.listing_id, listings.listing_id))
      .innerJoin(features, eq(listings.listing_id, features.listing_id)) // Join the features table
      .where(eq(bookmarks.uid, uid));

    const listingIds = rows.map(row => row.bookmark_listing_id);

    // Fetch media for the selected listings
    const media = await getMediaByListingId(listingIds);

    // Merge the results into a user-friendly format
    return rows.map((row) => ({
      bookmark_listing_id: row.bookmark_listing_id, 
      ...row.listingDetails, 
      feature: {
        bed_count: row.featureDetails.bed_count,
        bath_count: row.featureDetails.bath_count,
        room_type: row.featureDetails.room_type,
        roommate_gender: row.featureDetails.roommate_gender,
        description: row.featureDetails.description,
        policies: row.featureDetails.policies,
      },
      media: media.filter((item: Media) => item.listing_id === row.bookmark_listing_id), // Attach media
    }));
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    throw new Error('Failed to fetch bookmarks');
  }
}
