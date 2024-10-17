import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');
    const userID = searchParams.get('userID');
   
    try {
      if (!firstName || !lastName || !userID) throw new Error('First and last names required, userID required');
      await sql`INSERT INTO Users (Name, UserID) VALUES (${firstName + ' ' + lastName}, ${userID});`;
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
   
    const pets = await sql`SELECT * FROM Users;`;
    return NextResponse.json({ pets }, { status: 200 });
  }