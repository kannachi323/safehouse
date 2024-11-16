import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export function buildConditions(searchParams : URLSearchParams) {
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const zip_code = searchParams.get('zip_code');
    const bath_count = searchParams.get('bath_count')
    
    let conditions = "";
    
    if (city) {
        conditions += `city=${city}`
    }
    
    return conditions;
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

   
    const conditions = buildConditions(searchParams);
    console.log(conditions);
    const city = searchParams.get('city')

    try {

        // Construct the SQL query dynamically with the WHERE clause using template literals
        const result = await sql`
            SELECT * FROM listings WHERE ${conditions};
        `;

        // Return the query results as JSON
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}
