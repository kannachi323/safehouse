CREATE TABLE IF NOT EXISTS "features" (
	"feature_id" serial PRIMARY KEY NOT NULL,
	"listing_id" serial NOT NULL,
	"bed_count" integer,
	"bath_count" integer,
	"room_type" text,
	"roommate_gender" text,
	"is_pets" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "listings" (
	"listing_id" serial PRIMARY KEY NOT NULL,
	"uid" text NOT NULL,
	"price" integer NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"zip_code" text NOT NULL,
	"state" text NOT NULL,
	"pictures_folder_ref" text,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"uid" text PRIMARY KEY NOT NULL,
	"display_name" text NOT NULL,
	"theme" integer NOT NULL,
	"notifs" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"uid" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"is_landlord" boolean NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "features" ADD CONSTRAINT "features_listing_id_listings_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("listing_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "listings" ADD CONSTRAINT "listings_uid_users_uid_fk" FOREIGN KEY ("uid") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
