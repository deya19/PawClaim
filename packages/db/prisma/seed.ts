// Seed data: synthetic only. Never put real customer data here (AGENTS.md §9).
import { createDbClient } from "../src/client.js";

// The CLI loads env from prisma.config.ts; the seed script runs as its own process,
// so fall back to DIRECT_URL when DATABASE_URL isn't set locally.
const db = createDbClient(process.env["DATABASE_URL"] ?? process.env["DIRECT_URL"]);

const signups = [
  {
    email: "alex.tester@example.com",
    priceAnswer: "yes_399_month",
    insurer: "Example Pet Insurance",
    petCount: 1,
    source: "utm_source=seed",
  },
  {
    email: "sam.sample@example.com",
    priceAnswer: "yes_29_year",
    insurer: null,
    petCount: 2,
    source: null,
  },
  {
    email: "jo.placeholder@example.com",
    priceAnswer: "maybe",
    insurer: null,
    petCount: null,
    source: "referrer=example.org",
  },
] as const;

async function main(): Promise<void> {
  for (const signup of signups) {
    await db.waitlistSignup.upsert({
      where: { email: signup.email },
      update: {},
      create: signup,
    });
  }
  console.log(`Seeded ${signups.length} waitlist signups`);
}

try {
  await main();
} finally {
  await db.$disconnect();
}
