import { db } from '../index';
import { InsertListing, listings, InsertFeature, InsertMedia, features, users, media } from '../schema';
import { eq, and } from 'drizzle-orm/expressions';

export async function createListing(listing: InsertListing, feature: InsertFeature | null, mediaEntries: InsertMedia[]| null): Promise<void> {
  try {
    // check if user exists
    const userExists = await db
      .select({ uid: users.uid })
      .from(users)
      .where(eq(users.uid, listing.uid));

    if (userExists.length === 0) {
      throw new Error("User does not exist");
    }

    // check if identical listing has already been posted in the past by that user
    const listingExists = await db
      .select({ listing_id: listings.listing_id })
      .from(listings)
      .where(and(
        eq(listings.uid, listing.uid),
        eq(listings.price, listing.price),
        eq(listings.address, listing.address),
        eq(listings.city, listing.city),
        eq(listings.state, listing.state),
        eq(listings.zip_code, listing.zip_code)
      ));

    if (listingExists.length > 0) {
      throw new Error("Listing already exists for this user");
    }

    // db transaction for atomicity
    await db.transaction(async (trx) => {
      // insert listing into "listings" table and get its listing ID
      const [newListing] = await trx
        .insert(listings)
        .values(listing)
        .returning({ listing_id: listings.listing_id });

      if (!newListing) {
        throw new Error("Failed to retrieve the new listing ID");
      }

      // insert features into "features" table with returned listing ID
      if (feature) {
        await trx.insert(features).values({ ...feature, listing_id: newListing.listing_id });
      }

      // insert media into "media" table with returned listing ID
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
