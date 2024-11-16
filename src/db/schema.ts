import { boolean, pgTable, integer, text, jsonb } from 'drizzle-orm/pg-core';

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;


export const users = pgTable('users', {
  uid: text('uid').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  is_landlord: boolean('is_landlord').notNull(),  
});

export type InsertListing = typeof listings.$inferInsert;
export type SelectListing = typeof listings.$inferSelect;


export const listings = pgTable('listings', {
    listing_id: integer('listing_id').primaryKey(),
    uid: text('uid').notNull().references(() => users.uid),
    price: integer('price').notNull(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    zip_code: text('zip_code').notNull(),
    state: text('state').notNull(),
    picture_ref: text('picture_ref'),
    feature: jsonb('feature').notNull()
});

export const settings = pgTable('settings', {
    uid: serial('uid').primaryKey(),
    display_name: text('display_name').notNull(),
    theme: integer('theme').notNull(),
    notifs: integer('notifs').notNull().default(0)
});
  

