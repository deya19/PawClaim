import { z } from "zod";
import { EmailSchema } from "./email.js";

/** Allowed answers to the waitlist price question. Must match the `waitlist_price_answer` DB enum. */
export const WAITLIST_PRICE_ANSWERS = ["yes_399_month", "yes_29_year", "maybe", "no"] as const;

export const WaitlistPriceAnswerSchema = z.enum(WAITLIST_PRICE_ANSWERS);
export type WaitlistPriceAnswer = z.infer<typeof WaitlistPriceAnswerSchema>;

/** Waitlist form submission. Limits mirror the CHECK constraints in packages/db. */
export const WaitlistSignupInput = z.strictObject({
  email: EmailSchema.pipe(z.string().max(320)),
  priceAnswer: WaitlistPriceAnswerSchema,
  insurer: z.string().trim().min(1).max(200).optional(),
  petCount: z.number().int().min(0).max(100).optional(),
  /** UTM source / referrer. */
  source: z.string().trim().min(1).max(500).optional(),
});

export type WaitlistSignupInput = z.infer<typeof WaitlistSignupInput>;
