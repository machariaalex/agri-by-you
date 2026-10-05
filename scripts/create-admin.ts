/**
 * Creates an admin account, or resets the password of an existing one.
 *   npm run admin:create -- you@example.com "Your Name" [password]
 * A random password is generated and printed when none is given.
 */
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { db, schema } from "./db";

async function main() {
  const [email, name, given] = process.argv.slice(2);
  if (!email || !name) {
    console.error('Usage: npm run admin:create -- <email> "<name>" [password]');
    process.exitCode = 1;
    return;
  }
  const password = given ?? randomBytes(9).toString("base64url");
  if (password.length < 10) throw new Error("Password must be at least 10 characters");

  const passwordHash = await bcrypt.hash(password, 12);
  await db
    .insert(schema.adminUsers)
    .values({ email: email.toLowerCase(), name, passwordHash })
    .onConflictDoUpdate({ target: schema.adminUsers.email, set: { name, passwordHash } });

  console.log(`✓ Admin ready: ${email.toLowerCase()}`);
  if (!given) console.log(`  Password: ${password}  (change it under Admin → Settings)`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
