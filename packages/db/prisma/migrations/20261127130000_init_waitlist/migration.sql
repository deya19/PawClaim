-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "waitlist_price_answer" AS ENUM ('yes_399_month', 'yes_29_year', 'maybe', 'no');

-- CreateTable
CREATE TABLE "waitlist_signups" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "price_answer" "waitlist_price_answer" NOT NULL,
    "insurer" TEXT,
    "pet_count" INTEGER,
    "source" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_signups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_signups_email_key" ON "waitlist_signups"("email");


-- Hand-written: data integrity checks (Prisma can't express CHECK constraints).
ALTER TABLE "waitlist_signups"
    ADD CONSTRAINT "waitlist_signups_email_lowercase" CHECK ("email" = lower("email")),
    ADD CONSTRAINT "waitlist_signups_email_length" CHECK (char_length("email") BETWEEN 3 AND 320),
    ADD CONSTRAINT "waitlist_signups_insurer_length" CHECK (char_length("insurer") <= 200),
    ADD CONSTRAINT "waitlist_signups_source_length" CHECK (char_length("source") <= 500),
    ADD CONSTRAINT "waitlist_signups_pet_count_range" CHECK ("pet_count" BETWEEN 0 AND 100);

-- Hand-written: Row Level Security. RLS is on with NO policies, so Supabase's public
-- roles (anon, authenticated) can't read or write rows through the Data API.
-- Only the server (postgres / service_role connection via Prisma) writes this table.
ALTER TABLE "waitlist_signups" ENABLE ROW LEVEL SECURITY;

-- Defense in depth: also drop the default table grants for Supabase's API roles.
-- Guarded so the migration still runs on plain Postgres (local/CI) where these roles don't exist.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN
        REVOKE ALL ON TABLE "waitlist_signups" FROM anon;
    END IF;
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN
        REVOKE ALL ON TABLE "waitlist_signups" FROM authenticated;
    END IF;
END
$$;
