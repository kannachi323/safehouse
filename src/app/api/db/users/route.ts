import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    const first_name = 'First';
    const last_name = 'Last';
    const email = 'firstlast@email.com';
    const is_landlord = false;

    try {
        const result = await sql`
            INSERT INTO "Users".users (first_name, last_name, email, is_landlord)
            VALUES (${first_name}, ${last_name}, ${email}, ${is_landlord});
        `;

        return NextResponse.json({ message: 'Account created successfully', result }, {status: 201});
    } catch (error) {
        console.error('Error inserting user:', error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}