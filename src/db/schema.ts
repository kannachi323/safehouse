import { boolean, pgTable, integer, text, serial, doublePrecision } from 'drizzle-orm/pg-core';

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;


export const users = pgTable('users', {
  uid: text('uid').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  is_landlord: boolean('is_landlord').notNull(),  
});

export type InsertSavedListing = typeof bookmarks.$inferInsert;
export type SelectSavedListing = typeof bookmarks.$inferSelect;

export const bookmarks = pgTable('bookmarks', {
  listing_id: serial('listing_id').notNull().references(() => listings.listing_id),
  uid: text('uid').notNull().references(() => users.uid),
})

export type InsertListing = typeof listings.$inferInsert;
export type SelectListing = typeof listings.$inferSelect;



export const listings = pgTable('listings', {
    listing_id: serial('listing_id').primaryKey(),
    uid: text('uid').notNull().references(() => users.uid),
    price: integer('price').notNull(),
    address: text('address').notNull(),
    city: text('city').notNull(),
    zip_code: text('zip_code').notNull(),
    state: text('state').notNull(),
    latitude: doublePrecision('latitude').notNull(),
    longitude: doublePrecision('longitude').notNull(),
});

export type InsertFeature = typeof features.$inferInsert;
export type SelectFeature = typeof features.$inferSelect;

export const features = pgTable('features', {
  feature_id: serial('feature_id').primaryKey(),
  listing_id : serial('listing_id').notNull().references(() => listings.listing_id),
  bed_count: integer('bed_count'),
  bath_count: integer('bath_count'),
  room_type: text('room_type'),
  roommate_gender: text('roommate_gender'),
  description: text('description'),
  policies: text('policies'),
})

export const settings = pgTable('settings', {
    uid: text('uid').primaryKey(),
    display_name: text('display_name').notNull(),
    theme: integer('theme').notNull(),
    notifs: integer('notifs').notNull().default(0)
});


export type InsertMedia = typeof media.$inferInsert;
export type SelectMedia = typeof media.$inferSelect;

export const media = pgTable('media', {
  ref: text('ref').notNull().primaryKey(),
  listing_id: serial('listing_id').notNull().references(() => listings.listing_id),
})
  