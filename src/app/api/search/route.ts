import { NextResponse } from 'next/server';
import { getListings } from '@/db/listings/select';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    
    try {
        const filters = await request.json();
        console.log(filters);
        
        if (uid) {
            filters.uid = uid;
        }
        console.log(filters);
        const response = await getListings(filters);
        console.log(response);
        // Return the query results as JSON
        return NextResponse.json(response, { status: 200 });
    
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}
