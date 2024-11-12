import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import fetch from 'node-fetch'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userLatitude = searchParams.get('latitude')
  const userLongitude = searchParams.get('longitude')
  const radius = parseInt(searchParams.get('radius') || '10') * 1000

  if (!userLatitude || !userLongitude) {
    return NextResponse.json({ error: "Missing 'latitude' or 'longitude' parameter" }, { status: 400 })
  }

  const listings = await sql`SELECT id, address FROM listings;`
  const addresses = listings.rows.map((listing) => encodeURIComponent(listing.address)).join('|');

  try {
    const googleApiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${userLatitude},${userLongitude}&destinations=${addresses}&key=${process.env.GOOGLE_MAPS_API_KEY_2}`
    
    const response = await fetch(googleApiUrl)
    const data = await response.json()

    if (data.status !== 'OK') {
      return NextResponse.json({ error: 'Error with Google Maps API', details: data.error_message }, { status: 500 })
    }

    const nearbyListings = listings.rows.filter((listing, index) => {
      const distance = data.rows[0].elements[index].distance?.value
      return distance && distance <= radius
    })

    return NextResponse.json({ nearbyListings }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch listings based on proximity' }, { status: 500 })
  }
}
