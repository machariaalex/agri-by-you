import { setDefaultAutoSelectFamilyAttemptTimeout } from "node:net";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";

config({ path: ".env.local" });
setDefaultAutoSelectFamilyAttemptTimeout(1000);

export const db = drizzle({ client: neon(process.env.DATABASE_URL!), schema });
export { schema };
