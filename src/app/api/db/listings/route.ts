import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres';

export async function GET(req : Request) {
    console.log("i got to the get query")
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');

    try {
        if(!city) throw new Error("Missing query paramter 'city'");
        
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    const filteredListings = await sql `SELECT * FROM cleaned_listings WHERE city = ${city};`;
    return NextResponse.json({ filteredListings }, { status: 200 });
}