import { eq, lte, gte, and } from 'drizzle-orm/expressions';
import { db } from '../index';
import { listings } from '../schema';

export async function getFilteredListings(searchParams: URLSearchParams) {
    const conditions = [];

    const address = searchParams.get('address');
    const city = searchParams.get('city');
    const max_price = searchParams.get('max_price');
    const min_price = searchParams.get('min_price');

    console.log(city);
    
    if (address) {
        conditions.push(eq(listings.address, address));
    }
    if (city) {
        conditions.push(eq(listings.city, city));
    }
    if (max_price) {
        conditions.push(lte(listings.price, Number(max_price)));
    }
    if (min_price) {
        conditions.push(gte(listings.price, Number(min_price)));
    }

    const filteredListings = await db
        .select()
        .from(listings)
        .where(and(...conditions));
    
        return filteredListings;
        

}