import path from "node:path";
import { defineConfig } from "prisma/config";

// Local dev: load the repo-root .env if present. In CI/production the variables
// come from the environment / secret manager.
try {
  process.loadEnvFile(path.join(import.meta.dirname, "../../.env"));
} catch {
  // No .env file — rely on the real environment.
}

// The CLI (migrate, seed) uses DIRECT_URL: Supabase's direct/session connection.
// Migrations must not go through the transaction pooler. The app uses DATABASE_URL (see src/client.ts).
// `prisma generate` doesn't need a database, so an empty URL is fine there.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DIRECT_URL"] ?? "",
    ...(process.env["SHADOW_DATABASE_URL"]
      ? { shadowDatabaseUrl: process.env["SHADOW_DATABASE_URL"] }
      : {}),
  },
});
