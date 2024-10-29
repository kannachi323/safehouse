import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const price = searchParams.get('price');

    try {
        if(!address && !price) throw new Error("Missing query parameter 'address' or 'price'");
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }

    if (address) {
        const filteredListings = await sql `SELECT address FROM listings WHERE address = ${address};`;
        return NextResponse.json({ filteredListings }, { status: 200 });
    }
    if (price) {
        const priceNum = parseInt(price);
        const minPrice = priceNum * 0.9;
        const maxPrice = priceNum * 1.1;

        const filteredListings = await sql `SELECT price FROM listings WHERE price BETWEEN ${minPrice} AND ${maxPrice};`;
        return NextResponse.json({ filteredListings }, { status: 200 });
    }
}