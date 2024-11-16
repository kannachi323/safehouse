import { db } from '../index';
import { InsertUser, users, InsertListing, listings } from '../schema';

export async function createUser(data: InsertUser) {
  await db.insert(users).values(data);
}

export async function createListing(data: InsertListing) {
  await db.insert(listings).values(data);
}
