import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres';

export async function POST(req : Request) {
    try {
        const { id, price, address, features, is_active, url } = await req.json()
    
        const result = await sql`INSERT INTO listings (id, price, address, features, is_active, url) 
                                 VALUES (${id}, ${price}, ${address}, ${features}, ${is_active}, ${url})
                                 RETURNING *;`
    
        return NextResponse.json({ listing: result.rows[0] })
      } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 })
      }
}