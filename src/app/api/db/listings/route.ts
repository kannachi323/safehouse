import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres';

export async function GET(req : Request) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get('address');
    try {
        if(!address) throw new Error("Missing query paramter 'loc'");
        console.log(address);
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    const filteredListings = await sql `SELECT address FROM listings WHERE address = ${address};`;
    return NextResponse.json({ filteredListings }, { status: 200 });
}