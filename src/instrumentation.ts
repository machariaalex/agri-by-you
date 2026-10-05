export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node gives each address only 250ms to connect before failing over. Far from the database
    // (local dev in Nairobi → Neon in us-east-1) every attempt can miss that, failing queries with
    // "fetch failed". A longer window costs nothing when connections are fast.
    const net = await import("node:net");
    net.setDefaultAutoSelectFamilyAttemptTimeout(1000);
  }
}
