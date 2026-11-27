import { describe, expect, it } from "vitest";
import { WaitlistSignupInput } from "./waitlist.js";

describe("WaitlistSignupInput", () => {
  it("accepts a valid signup and normalizes the email", () => {
    const parsed = WaitlistSignupInput.parse({
      email: " Pet.Owner@Example.com ",
      priceAnswer: "yes_29_year",
      insurer: "Example Pet Insurance",
      petCount: 2,
      source: "utm_source=newsletter",
    });
    expect(parsed).toEqual({
      email: "pet.owner@example.com",
      priceAnswer: "yes_29_year",
      insurer: "Example Pet Insurance",
      petCount: 2,
      source: "utm_source=newsletter",
    });
  });

  it("accepts the minimum (email + priceAnswer only)", () => {
    expect(
      WaitlistSignupInput.safeParse({ email: "a@example.com", priceAnswer: "no" }).success,
    ).toBe(true);
  });

  it("rejects a bad email", () => {
    const result = WaitlistSignupInput.safeParse({ email: "not-an-email", priceAnswer: "maybe" });
    expect(result.success).toBe(false);
  });

  it("rejects an unknown priceAnswer", () => {
    const result = WaitlistSignupInput.safeParse({
      email: "a@example.com",
      priceAnswer: "yes_5_month",
    });
    expect(result.success).toBe(false);
  });

  it.each([-1, 1.5, 101])("rejects petCount %j", (petCount) => {
    const result = WaitlistSignupInput.safeParse({
      email: "a@example.com",
      priceAnswer: "no",
      petCount,
    });
    expect(result.success).toBe(false);
  });

  it("rejects unknown fields", () => {
    const result = WaitlistSignupInput.safeParse({
      email: "a@example.com",
      priceAnswer: "no",
      isAdmin: true,
    });
    expect(result.success).toBe(false);
  });
});
