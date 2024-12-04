import { db } from '../index';
import { bookmarks } from '../schema';
import { eq, and } from 'drizzle-orm/expressions';


export async function removeBookmark(uid: string, listingId: number): Promise<void> {
    try {
      // Attempt to delete the bookmark with matching uid and listingId
      const result = await db
        .delete(bookmarks)
        .where(and(eq(bookmarks.uid, uid), eq(bookmarks.listing_id, listingId)));
  
      // Check if rows were affected (this might vary depending on the database library)
      if (result.rowCount === 0) {
        throw new Error("Bookmark not found");
      }
  
      console.log("Bookmark removed successfully");
    } catch (error) {
      // Log the error and rethrow with a user-friendly message
      console.error("Error removing bookmark:", error);
      throw new Error("Failed to remove bookmark");
    }
}
  
  