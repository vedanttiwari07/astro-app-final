import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx prisma db execute --file prisma/seed.sql --schema prisma/schema.prisma",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
