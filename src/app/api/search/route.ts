import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

// Function to create the SQL WHERE clause from search parameters
function buildConditions(searchParams: URLSearchParams): string {
    const conditions: string[] = [];

    const address = searchParams.get('address');
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const zip_code = searchParams.get('zip_code');

    // Check each search parameter and add the corresponding SQL condition
    if (address) {
        conditions.push(`address ILIKE '%${address}%'`);
    }
    if (city) {
        conditions.push(`city = '${city}'`);
    }
    if (state) {
        conditions.push(`state = '${state}'`);
    }
    if (zip_code) {
        conditions.push(`zip_code = '${zip_code}'`);
    }

    // If no conditions are provided, return an empty string (no WHERE clause)
    return conditions.length > 0 ? conditions.join(' AND ') : '';
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const zip_code = searchParams.get('zip_code');

    try {
        // Generate the WHERE clause based on search parameters
        const CONDITIONS = buildConditions(searchParams);

        // Construct the SQL query dynamically with the WHERE clause using template literals
        const result = await sql`
            SELECT * FROM listings WHERE city=${city};
        `;

        // Return the query results as JSON
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}
