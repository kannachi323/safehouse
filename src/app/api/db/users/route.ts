import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres';


export async function POST(request: Request) {
    const { first_name, last_name, email, is_landlord, uid} = await request.json();

    try {
        const result = await sql`
            INSERT INTO Users (first_name, last_name, email, is_landlord, uid)
            VALUES (${first_name}, ${last_name}, ${email}, ${is_landlord}, ${uid});
        `;

        return NextResponse.json({ message: 'Account created successfully', result }, {status: 201});
    } catch (error) {
        console.error('Error inserting user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email query parameter is required' }, { status: 400 });
    }

    try {
        const result = await sql`
            SELECT * FROM Users WHERE email = ${email};
        `;

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user: result.rows[0] }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
