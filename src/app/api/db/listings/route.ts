import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres';

export async function POST(req: Request) {
  try {
    const { prices, address, city, state_code, zipcode, feature, uid } = await req.json();

    const result = await sql`
      INSERT INTO listings (prices, address, city, state_code, zipcode, feature, uid) 
      VALUES (${prices}, ${address}, ${city}, ${state_code}, ${zipcode}, ${feature}, ${uid});
    `;

    return NextResponse.json({ listing: result.rows[0] });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 });
  }
}

export async function GET() {

  try {
    const result = await sql`
      SELECT * FROM listings;
    `;
    
    if (result) {
      return NextResponse.json(result.rows)
    }
  } catch (error) {
    console.error("error fetching default listings:", error);
    return NextResponse.json({ error: "can't fetch listings" }, { status: 500});
  }
}
