import { NextResponse } from 'next/server';
import { getCoordinates } from '@/utils/helper';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const address = data.place;



    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 });
    }

    const coordinates = await getCoordinates(address);
    
    
    return NextResponse.json(coordinates, { status: 200 });
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return NextResponse.json({ error}, { status: 500 });
  }
}
