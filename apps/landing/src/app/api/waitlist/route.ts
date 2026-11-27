/**
 * Waitlist signup endpoint — stub.
 * Saving signups (validation, Arcjet protection, database) is built in P0V-T08.
 */
export function POST(): Response {
  return Response.json({ error: "not_implemented" }, { status: 501 });
}
