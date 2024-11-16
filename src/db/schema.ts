import { integer, boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { em } from 'framer-motion/client';

export const usersTable = pgTable('users_table', {
  uid: serial('id').primaryKey(),
  first_name: text('name').notNull(),
  last_name: text('name').notNull(),
  email: text('email').notNull().unique(),
  is_landlord: boolean('is_landlord').notNull(),

  
});



export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
