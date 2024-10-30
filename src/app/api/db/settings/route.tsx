import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    const uid = '00001';
    const notifs = 0;
    const theme = 1;   
    // get settings values

    try {
        const result = await sql`
            INSERT INTO table_name (uid, {notifs}, {theme})
            VALUES ({uid}, {notifs}, {theme})
            ON CONFLICT (uid) DO UPDATE
            SET notifs = EXCLUDED.{notifs},
            theme = EXCLUDED.{theme};
        `;

        return NextResponse.json({ message: 'Settings updated successfully', result }, {status: 201});
    } catch (error) {
        console.error('Error inserting user:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}