import { NextResponse } from 'next/server';
import { getListings } from '@/db/queries/select';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
   
    try {
        const response = await getListings(searchParams);
        console.log(response);
        // Return the query results as JSON
        return NextResponse.json(response, { status: 200 });
    
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}
