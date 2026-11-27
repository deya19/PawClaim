import { describe, expect, it } from "vitest";
import { WAITLIST_PRICE_ANSWERS } from "@pawclaim/shared";
import { WaitlistPriceAnswer } from "./generated/prisma/enums.js";

describe("WaitlistPriceAnswer", () => {
  it("DB enum matches the shared zod enum", () => {
    expect(Object.values(WaitlistPriceAnswer).sort()).toEqual([...WAITLIST_PRICE_ANSWERS].sort());
  });
});
