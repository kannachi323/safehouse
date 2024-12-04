import { db } from '../index';
import { bookmarks, users, listings } from '../schema';
import { eq, and } from 'drizzle-orm/expressions';

export async function addBookmark(uid: string, listingId: number): Promise<void> {
  try {
    const userExists = await db
      .select({ uid: users.uid })
      .from(users)
      .where(eq(users.uid, uid));

    if (userExists.length === 0) {
      throw new Error("User does not exist");
    }

    const listingExists = await db
      .select({ listing_id: listings.listing_id })
      .from(listings)
      .where(eq(listings.listing_id, listingId));

    if (listingExists.length === 0) {
      throw new Error("Listing does not exist");
    }

    const bookmarkExists = await db
      .select({ listing_id: bookmarks.listing_id })
      .from(bookmarks)
      .where(and(eq(bookmarks.uid, uid), eq(bookmarks.listing_id, listingId)));

    if (bookmarkExists.length > 0) {
      throw new Error("Bookmark already exists");
    }

    await db.insert(bookmarks).values({ uid, listing_id: listingId });
    console.log("Bookmark added successfully");
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw new Error("Failed to add bookmark");
  }
}

