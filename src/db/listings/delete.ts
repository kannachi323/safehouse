import { db } from '../index';
import { listings, features, media } from '../schema';
import { eq } from 'drizzle-orm/expressions';

export async function deleteListing(listingId: number): Promise<void> {
  try {
    // Start a transaction to ensure atomicity
    await db.transaction(async (trx) => {
      // Delete associated media entries
      await trx
        .delete(media)
        .where(eq(media.listing_id, listingId));

      // Delete associated features
      await trx
        .delete(features)
        .where(eq(features.listing_id, listingId));

      // Delete the listing itself
      const deletedListings = await trx
        .delete(listings)
        .where(eq(listings.listing_id, listingId))
        .returning({ listing_id: listings.listing_id });

      if (deletedListings.length === 0) {
        throw new Error(`Listing with ID ${listingId} does not exist.`);
      }
    });

    console.log(`Successfully deleted listing with ID ${listingId}`);
  } catch (error) {
    console.error("Database deletion error:", error);
    throw new Error("Failed to delete listing");
  }
}
