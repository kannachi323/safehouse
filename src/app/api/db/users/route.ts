import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/auth/config"

export async function POST(request: Request) {
    const { first_name, last_name, email, is_landlord } = await request.json();

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