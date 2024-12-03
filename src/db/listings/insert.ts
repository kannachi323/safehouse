import { db } from '../index';
import { InsertListing, listings, InsertFeature, InsertMedia, features, users, media } from '../schema';
import { eq, and } from 'drizzle-orm/expressions';

export async function createListing(listing: InsertListing, feature: InsertFeature | null, mediaEntries: InsertMedia[]| null): Promise<void> {
  try {
    // Check if the user exists
    const userExists = await db
      .select({ uid: users.uid })
      .from(users)
      .where(eq(users.uid, listing.uid));

    if (userExists.length === 0) {
      throw new Error("User does not exist");
    }

    // Check if a listing already exists for the user
    const listingExists = await db
      .select({ listing_id: listings.listing_id })
      .from(listings)
      .where(and(
        eq(listings.uid, listing.uid),   // Same user
        eq(listings.price, listing.price), // Same price
        eq(listings.address, listing.address), // Same address
        eq(listings.city, listing.city),   // Same city
        eq(listings.state, listing.state), // Same state
        eq(listings.zip_code, listing.zip_code) // Same zip code
      ));

    if (listingExists.length > 0) {
      throw new Error("Listing already exists for this user");
    }

    // Start a transaction to ensure atomicity for both inserts
    await db.transaction(async (trx) => {
      // Insert the listing and retrieve the new `listing_id`
      const [newListing] = await trx
        .insert(listings)
        .values(listing)
        .returning({ listing_id: listings.listing_id });

      if (!newListing) {
        throw new Error("Failed to retrieve the new listing ID");
      }

      // Insert the feature (if it exists) with the retrieved `listing_id`
      if (feature) {
        await trx.insert(features).values({ ...feature, listing_id: newListing.listing_id });
      }

      if (mediaEntries && mediaEntries.length > 0) {
        const updatedMediaEntries = mediaEntries.map((mediaEntry) => ({
          ...mediaEntry,
          listing_id: newListing.listing_id,
        }));
        
        for (const mediaEntry of updatedMediaEntries) {
          await trx.insert(media).values(mediaEntry);
        }
        
      }
    });

  } catch (error) {
    console.error("Database insertion error:", error);
    throw new Error("Failed to insert listing");
  }
}
