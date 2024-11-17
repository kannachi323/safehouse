import { eq, lte, gte, and} from 'drizzle-orm/expressions';
import { db } from '../index';
import { listings } from '../schema';
import { features } from '../schema';

interface Filters {
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    bedCount?: number;
    bathCount?: number;
    min_price?: number;
    max_price?: number;
    roomType?: string;
    roommateGender?: string;
    pets?: boolean;
}

interface Feature {
    bed?: number;
    bath?: number;
    room_type?: string;
    roommate_gender?: string;
    distance_from_school?: number;
    is_pets?: boolean;
}

interface Listing {
    price?: number;
    address?: string;
    city?: string;
    state_code?: string;
    zipcode?: string;
    uid: string;
    feature?: Feature[];
}



export async function getFilteredListings(searchParams: URLSearchParams) {
    const conditions = [];
    
    // Dynamically iterate over searchParams and build conditions
    for (const [key, value] of searchParams.entries()) {
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
            case 'pets':
                conditions.push(eq(features.is_pets, value === 'true')); // assuming pets is a boolean
                break;
            default:
                // Ignore unknown keys
                break;
        }
    }

    // Construct the query with the dynamically built conditions
    const query_results = await db
        .select()
        .from(listings)
        .innerJoin(features, eq(listings.listing_id, features.listing_id))// Join the features table
        .where(and(...conditions));

    // Now, merge the listings and features
    const filteredListings = query_results.map((item) => {
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
                is_pets: feature.is_pets,
            }
        };
    });

    return filteredListings;
}
