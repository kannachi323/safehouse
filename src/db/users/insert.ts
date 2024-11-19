import { NextResponse } from 'next/server';
import { db } from '../index';
import { InsertUser, users } from '../schema';

export async function createUser(user: InsertUser) {
    //InsertUser should be of type User
  console.log(user);
  
  try {
    // Start a transaction to ensure atomicity for both inserts
    await db.transaction(async (trx) => {
      // Insert the user
      await trx.insert(users).values(user);
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

  } catch (error) {
    console.error("Database insertion error:", error);
    throw new Error("Failed to insert user");
  }
}