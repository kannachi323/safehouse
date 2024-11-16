CREATE TABLE IF NOT EXISTS "listings" (
	"listing_id" serial PRIMARY KEY NOT NULL,
	"uid" text NOT NULL,
	"prices" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"zip_code" text NOT NULL,
	"state" text NOT NULL,
	"picture_ref" text,
	"feature" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"uid" serial PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"theme" integer NOT NULL,
	"notifs" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"uid" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"is_landlord" boolean NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
