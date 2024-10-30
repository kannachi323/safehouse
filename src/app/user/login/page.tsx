import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    try {
        // Extract the Firebase ID token from the Authorization header
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
        }
        
        const idToken = authHeader.split('Bearer ')[1];

        // Verify the ID token using Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name } = decodedToken; // Extracting uid, email, and name from the token

        // Define other user data (Assuming name contains both first and last names for simplicity)
        const [first_name, last_name] = name ? name.split(' ') : ['First', 'Last'];
        const is_landlord = false; // Set as per your application logic

        // Insert the data into the Users table
        const result = await sql`
            INSERT INTO Users (uid, first_name, last_name, email, is_landlord)
            VALUES (${uid}, ${first_name}, ${last_name}, ${email}, ${is_landlord});
        `;

        return NextResponse.json(
            { message: 'User created successfully', result },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error verifying token or inserting user:', error);
        return NextResponse.json({ error: 'Failed to authenticate or create user' }, { status: 500 });
    }
}