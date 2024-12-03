import { eq, lte, gte, and, inArray} from 'drizzle-orm/expressions';
import { db } from '../index';
import { listings, features, media } from '../schema';
import { Filters } from '@/types';

export async function getMediaByListingId(listingIds : number[]) {
    const rows = await db
        .select()
        .from(media)
        .where(inArray(media.listing_id, listingIds));
    
     return rows;

}


export async function getListings(filters : Filters) {
    const conditions = [];
    
    // Dynamically iterate over searchParams and build conditions
    for (const [key, value] of Object.entries(filters)) {
        switch (key) {
            case 'address':
                conditions.push(eq(listings.address, value));
                break;
            case 'city':
                conditions.push(eq(listings.city, value));
                break;
            case 'max_price':
                conditions.push(lte(listings.price, Number(value)));
                break;
            case 'min_price':
                conditions.push(gte(listings.price, Number(value)));
                break;
            case 'bed_count':
                conditions.push(gte(features.bed_count, Number(value)));
                break;
            case 'bath_count':
                conditions.push(gte(features.bath_count, Number(value)));
                break;
            case 'room_type':
                conditions.push(eq(features.room_type, value));
                break;
            case 'roommate_gender':
                conditions.push(eq(features.roommate_gender, value));
                break;
            case 'uid':
                conditions.push(eq(listings.uid, value));
            default:
                // Ignore unknown keys
                break;
        }
    }

    // Construct the query with the dynamically built conditions
    const rows = await db
        .select()
        .from(listings)
        .innerJoin(features, eq(listings.listing_id, features.listing_id))// Join the features table
        .where(and(...conditions));
    
    // Now, merge the listings and features
    const filteredListings = rows.map((item) => {
        // Destructure listings and features from the result
        const { listings: listing, features: feature } = item;

        // Return the merged result
        return {
            ...listing, // Spread listing fields
            feature: {
                bed_count: feature.bed_count,
                bath_count: feature.bath_count,
                room_type: feature.room_type,
                roommate_gender: feature.roommate_gender,
                description: feature.description,
                policies: feature.policies,
            }
        };
    });

    return filteredListings;
}
