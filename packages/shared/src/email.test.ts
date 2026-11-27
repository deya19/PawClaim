import { describe, expect, it } from "vitest";
import { EmailSchema } from "./email.js";

describe("EmailSchema", () => {
  it("accepts a valid email and normalizes it", () => {
    expect(EmailSchema.parse("  Owner@Example.COM ")).toBe("owner@example.com");
  });

  it.each(["", "not-an-email", "a@", "@example.com", "a b@example.com"])("rejects %j", (input) => {
    expect(EmailSchema.safeParse(input).success).toBe(false);
  });
});
