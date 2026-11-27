import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

/**
 * Create a Prisma client for the app. Uses DATABASE_URL (Supabase pooler).
 * Call once per process and reuse the client.
 */
export function createDbClient(connectionString = process.env["DATABASE_URL"]): PrismaClient {
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}
