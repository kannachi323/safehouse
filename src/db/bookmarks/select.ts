import { db } from '../index';
import { bookmarks, listings } from '../schema';
import { eq } from 'drizzle-orm/expressions';

export async function getBookmarksByUser(uid: string) {
  try {
    const rows = await db
      .select({
        listing_id: listings.listing_id,
        price: listings.price,
        address: listings.address,
        city: listings.city,
        state: listings.state,
        zip_code: listings.zip_code,
        latitude: listings.latitude,
        longitude: listings.longitude,
        pictures_folder_ref: listings.pictures_folder_ref,
      })
      .from(bookmarks)
      .innerJoin(listings, eq(bookmarks.listing_id, listings.listing_id))
      .where(eq(bookmarks.uid, uid));

    return rows;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw new Error("Failed to fetch bookmarks");
  }
}
