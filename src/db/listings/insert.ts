import { db } from '../index';
import { InsertListing, listings, InsertFeature, features, users } from '../schema';
import { eq, and } from 'drizzle-orm/expressions';

export async function createListing(listing: InsertListing, feature: InsertFeature): Promise<void> {
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
      // Insert the listing
      await trx.insert(listings).values(listing);

      // Insert the feature (if it exists)
      if (feature) {
        await trx.insert(features).values(feature);
      }
    });

  } catch (error) {
    console.error("Database insertion error:", error);
    throw new Error("Failed to insert listing");
  }
}