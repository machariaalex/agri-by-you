import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/** HTTP driver: one round trip per query, safe in parallel. Use db.batch([...]) for atomic multi-statement writes. */
export const db = drizzle({ client: neon(process.env.DATABASE_URL!), schema });

export { schema };
