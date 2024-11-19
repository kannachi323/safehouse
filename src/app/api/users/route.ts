import { NextResponse } from 'next/server';
import { getUserByID } from '@/db/users/select';
import { createUser } from '@/db/users/insert';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');
    
    try {
        const body = await request.json(); //this should be in the form of InsertUser 
        const { user } = body;

        const getUserResponse = await getUserByID(user.uid);
        console.log(getUserResponse);
        
        if (getUserResponse != null) {
            return NextResponse.json(`user already exists...logging in user: ${getUserResponse.uid}`, { status: 200})
        }

        //at this point, we know that the user does not exist, so we can create them
        
        const createUserResponse = await createUser(user);
        
        if (createUserResponse.ok) {
            return NextResponse.json(`user created...logging in user: ${uid}`, { status: createUserResponse.status });
        }
       
    } catch (error) {
        console.error("Database query error:", error);
        return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 });
    }
}
