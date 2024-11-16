import { integer, boolean, pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { em } from 'framer-motion/client';

export const users = pgTable('users', {
  uid: serial('uid').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  is_landlord: boolean('is_landlord').notNull(),  
});

export const listings = pgTable('listings', {
    listing_id: serial('listing_id').primaryKey(),
    uid: text('uid').notNull(),
    price: text('prices').notNull(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    zip_code: text('zip_code').notNull(),
    state: text('state').notNull(),
    picture_ref: text('picture_ref'),
    feature: jsonb('feature').notNull()
  });

  

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
