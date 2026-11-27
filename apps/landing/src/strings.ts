/**
 * All user-facing copy for the landing page (AGENTS.md §4: one strings file per app).
 *
 * Wording rules (AGENTS.md §8): never promise claim approval, a payout, or a specific amount.
 * The owner submits the claim; we prepare it.
 */

/** Placeholder product name — change it here only. */
export const BRAND_NAME = "PawClaim";

export const strings = {
  meta: {
    title: `${BRAND_NAME} — Pet insurance claims, prepared for you`,
    description:
      "Forward your vet emails. We prepare the insurance claim for any insurer, watch the deadline, and make sure the money arrives.",
  },

  nav: {
    skipToContent: "Skip to main content",
    joinWaitlist: "Join the waitlist",
  },

  hero: {
    eyebrow: "Coming soon · US pet insurance",
    headline:
      "Forward your vet emails. We prepare the insurance claim for any insurer, watch the deadline, and make sure the money arrives.",
    subhead:
      "No more digging for invoices, retyping forms, or missing the filing window. You stay in control and send the claim yourself.",
    cta: "Join the waitlist",
  },

  howItWorks: {
    heading: "How it works",
    steps: [
      {
        title: "Forward your vet email",
        body: "Send invoices and records from your vet to your personal forwarding address, or snap a photo.",
      },
      {
        title: "Review your claim",
        body: "We fill in your insurer's claim form from your documents. You check every detail before anything is created.",
      },
      {
        title: "Send it and track it",
        body: "You submit the claim to your insurer. We remind you before the deadline and help you check that the reimbursement arrives.",
      },
    ],
  },

  audience: {
    heading: "Who it's for",
    items: [
      "Pet owners in the US with pet insurance from any insurer.",
      "Busy households with more than one pet or frequent vet visits.",
      "Anyone who has put off a claim, or forgotten one, because the paperwork was a hassle.",
    ],
  },

  faq: {
    heading: "Questions",
    items: [
      {
        question: "Do you submit the claim for me?",
        answer:
          "No. You stay in control — you submit the claim. We prepare the form and documents so it's ready to send, and you send it to your insurer yourself.",
      },
      {
        question: "Which insurers will you support?",
        answer:
          "We're starting with the largest US pet insurers and plan to add more. Tell us your insurer below so we know who to support first.",
      },
      {
        question: "Will my claim be approved?",
        answer:
          "We can't promise that. Your insurer decides on every claim based on your policy. We help you send a complete claim on time.",
      },
      {
        question: "What will it cost?",
        answer:
          "We haven't set a final price yet. The form below asks what you'd pay, which helps us decide.",
      },
      {
        question: "What happens to my email address?",
        answer: "We use it only to contact you about the waitlist and launch. We won't sell it.",
      },
    ],
  },

  waitlist: {
    heading: "Join the waitlist",
    intro: "Be the first to try it. It takes 20 seconds.",
    emailLabel: "Email address",
    emailHint: "Required.",
    priceLegend: "Would you pay for this?",
    priceOptions: [
      { value: "monthly_399", label: "Yes, $3.99 per month" },
      { value: "yearly_29", label: "Yes, $29 per year" },
      { value: "maybe", label: "Maybe" },
      { value: "no", label: "No" },
    ],
    insurerLabel: "Your pet insurer (optional)",
    petCountLabel: "How many insured pets? (optional)",
    submit: "Join the waitlist",
    submitting: "Sending…",
    success: "Thanks — you're on the list.",
    notOpenYet: "Signups aren't open yet. Please check back soon.",
    error: "Something went wrong. Please try again.",
  },

  footer: {
    disclaimer: `${BRAND_NAME} is not an insurance company and does not decide claims.`,
    copyright: `© ${new Date().getFullYear()} ${BRAND_NAME}`,
  },
} as const;

export type PriceOptionValue = (typeof strings.waitlist.priceOptions)[number]["value"];
