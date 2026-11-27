# PawClaim — Product & Build Plan

> Working name: **PawClaim** (placeholder — check trademark and domain before launch).
> One line: *Forward your vet emails. We prepare the insurance claim for any insurer, watch the deadline, and make sure the money arrives.*

---

## 0. Summary

| Item | Decision |
|---|---|
| Problem | Pet owners must manually file claims (invoice + medical records + form) within strict deadlines (often ~30 days). Claims stall on missing records/itemized invoices. Insurer apps only work for their own policies; record apps don't file. |
| Gap (from research, Nov 2026) | No insurer-agnostic app found that handles the full chain: **records → claim → deadline → reimbursement check → appeal**. |
| First market | United States, top 5 pet insurers by market share (verify list in Phase 0). |
| Platforms | Mobile app (iOS + Android) + small web dashboard. |
| Business model | $3.99/month or $29/year per household; free tier = 1 pet, 3 claims/year. Later: appeal success fee, vet-clinic B2B. |
| North-star metric | **$ reimbursed to users per month** through the app. |

---

## Phase 0 — Validation — *no code*

**Goal:** prove people have the pain and will pay before building.

Tasks
1. **Interviews:** talk to 20+ pet owners who have pet insurance (Reddit r/dogs, r/cats, r/petinsurance, Facebook pet groups, friends).
   - Questions: How do you file claims today? How long does it take? Ever missed a claim or deadline? Ever been denied? Would you pay $4/month to never think about it?
2. **Landing page + waitlist:** one page explaining the promise, email signup, a "would you pay?" price question.
3. **Competitor table:** confirm what Vet Record (VitusVet), Wagabond, MyPetID, Pet Cloud (Figo), Lemonade, Trupanion, Pawlicy Advisor do today. Note screenshots and prices.
4. **Insurer research:** for the top 5 US insurers, collect: claim form (PDF or portal only?), required documents, filing deadline, submission channel (email / upload / portal / app), typical processing time.
5. **Legal check (important):** ask a lawyer whether *preparing* a claim for the owner (owner submits) vs *submitting on their behalf* counts as public-adjuster / insurance-producer activity in target states. Decide the safe mode for v1.

Exit criteria (go / no-go)
- ≥ 15 of 20 interviewees describe the pain clearly.
- ≥ 200 waitlist signups OR ≥ 30% of interviewees say they would pay.
- Legal answer: "owner submits" mode is safe.

Deliverables: interview notes, insurer requirements sheet, legal memo, waitlist page.

---

## Phase 1 — Design 

**Goal:** clickable prototype users can react to.

Core user flows
1. **Onboarding:** create account → add pet (name, species, breed, birthday, photo) → pick insurer + policy number → upload policy PDF (optional) → get unique forwarding email (e.g. `luna-7k2@in.pawclaim.app`).
2. **Inbox → Claim:** vet email/PDF/photo arrives → AI extracts → user sees a "Claim ready" card → reviews fields → taps **Submit** (opens prepared email / downloads filled PDF / guided portal steps).
3. **Claims tracker:** list of claims with status: `Draft → Ready → Submitted → In review → Approved/Denied → Paid`.
4. **Deadlines:** countdown on every unsent claim; push + email reminders at 14, 7, 3, 1 days.
5. **Pet timeline:** all visits, diagnoses, vaccines, medications, weights in one history.
6. **"Is this covered?"** (Phase 3): ask a question, get an answer citing the user's policy.

Design tasks
- Wireframes for the 6 flows above (Figma).
- Visual identity: friendly, trustworthy, calm (money + pets).
- Test the prototype with 5–8 interviewees; fix confusion points.

Deliverables: Figma prototype, design tokens (colors, type, spacing), copy deck.

---

## Phase 2 — MVP Build 

**Goal:** real users file real claims faster.

### 2.1 Tech stack (see AGENTS.md for rules)
| Layer | Choice |
|---|---|
| Mobile | React Native + Expo (TypeScript) |
| Web dashboard | Next.js (TypeScript) |
| Backend API | Node.js + TypeScript (Fastify) |
| Database | PostgreSQL (Supabase or Neon) + Prisma |
| File storage | S3-compatible bucket (encrypted) |
| Auth | Clerk (or Supabase Auth) |
| Inbound email | Postmark Inbound (or SendGrid Inbound Parse) |
| AI extraction | Anthropic Claude API (`claude-opus-5-5`, structured outputs) |
| PDF filling | `pdf-lib` |
| Jobs / queue | BullMQ + Redis (or Inngest) |
| Push notifications | Expo Notifications |
| Payments | RevenueCat (in-app) + Stripe (web) |
| Monitoring | Sentry + PostHog |

### 2.2 MVP features (must-have)
1. Accounts, households, pets.
2. Unique inbound email per pet; also upload photo/PDF in app.
3. **AI document extraction** → structured JSON: clinic, date, line items, totals, diagnosis, treatment, pet name, invoice number. Confidence score per field.
4. **Human-in-the-loop review screen:** user confirms or edits low-confidence fields before anything is generated.
5. **Claim package generator** for top 5 insurers: filled claim form PDF + invoice + records, merged into one PDF; email draft for email-based insurers.
6. **Owner submits** (v1 legal-safe mode): "Send" opens mail composer / share sheet / step-by-step portal guide.
7. **Deadline engine:** per-insurer rules → due date → reminders.
8. **Claim status tracker** (manual status updates by user in v1).
9. Pet health timeline (auto-built from extracted documents).
10. Subscription paywall (free tier limits).

### 2.3 Data model (first version)
- `User`, `Household`, `Pet`, `Insurer`, `Policy`
- `InboundMessage` (raw email, attachments)
- `Document` (file, type: invoice / record / policy / EOB, extraction JSON, confidence)
- `Visit` (clinic, date, diagnoses, line items)
- `Claim` (visit, insurer, status, amounts, due date, submitted at, paid at)
- `Reminder`, `AuditLog`

### 2.4 Not in MVP (on purpose)
Bank linking, auto-submission, appeals, policy Q&A, collars, vet integrations, non-US insurers.

Exit criteria
- 50 beta users, ≥ 100 claims prepared.
- Extraction field accuracy ≥ 95% after user review; median time from email → ready claim < 2 minutes.
- Zero data-leak incidents.

---

## Phase 3 — Smart Layer

**Goal:** the integrations that make it unique.

1. **Bank connection (Plaid):** detect vet payments and insurer deposits.
   - Alert: "You paid $480 to Sunny Vet on Mar 3 — no claim yet."
   - Alert: "Claim #12 approved 10 days ago — reimbursement not received."
2. **Policy reader + "Is this covered?":** parse policy PDF into structured coverage (deductible, reimbursement %, annual limit, exclusions, waiting periods). Answers always cite the policy section and include a "not a guarantee" note.
3. **Reimbursement estimator:** show expected payout per claim (deductible + % + limits).
4. **Denial helper:** read EOB/denial letter → explain reason in plain language → draft appeal letter citing policy + records (user reviews and sends).
5. **Status auto-detection:** forward insurer emails too → AI updates claim status automatically.
6. **Calendar sync:** vaccines, refills, deadlines → Google / Apple calendar.

Exit criteria
- ≥ 40% of active users link a bank account.
- Found "missed money" for ≥ 20% of linked users.
- Paid conversion ≥ 5% of active free users.

---

## Phase 4 — Launch 

1. App Store + Google Play submission (privacy labels, data-safety form).
2. Pricing live; annual plan promoted.
3. Launch channels: Product Hunt, Reddit (helpful posts, not spam), pet TikTok/Instagram creators, pet-owner Facebook groups, SEO articles ("How to file a [Insurer] claim", one per insurer).
4. Referral program: "Give a month, get a month."
5. Support: in-app chat + help center with per-insurer guides.

KPIs: installs, activation (first claim prepared within 7 days), claims/month, $ reimbursed, paid conversion, churn.

---

## Phase 5 — Growth & Moat (Months 6–12)

1. **More insurers** → cover ~95% of US policies.
2. **Auto-submission** (only if legal review approves) via insurer email/API/partner programs.
3. **Vet clinic partnership (B2B):** white-label "we file for your clients" tool; integrations with practice software (verify API availability for ezyVet, Covetrus Pulse, IDEXX Neo, Shepherd).
4. **Smart collars** (Fi, Tractive, Whistle — verify APIs): activity history in the timeline; optional evidence for claims.
5. **Pet pharmacy refills** reminders (Chewy etc. — verify).
6. **Insurance comparison at renewal:** "Based on your last 12 months of claims, here's what you'd have gotten from other plans" (affiliate revenue; check licensing).
7. **International:** UK, Canada, then EU (note: Lassie/ManyPets already automate in Europe).

---

## Phase 6 — Scale & Compliance (ongoing)

- SOC 2 Type I → Type II when selling to vet clinics / insurers.
- Data retention and deletion policy; export-my-data.
- State privacy laws (CCPA etc.); GLBA considerations once bank data is involved.
- Fraud prevention: never alter invoice amounts; detect duplicate submissions.
- Insurer relationships: become a helpful channel, not an adversary (clean, complete claims reduce their cost).

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Acting as unlicensed adjuster | v1 "owner submits" mode; lawyer sign-off before automation |
| AI extraction error causes wrong claim | Confidence scores, mandatory user review, never invent values |
| Insurers improve their own apps | Our value is cross-insurer + money checks + appeals |
| Sensitive data (health + bank) | Encryption at rest/in transit, least privilege, audit logs, no data selling |
| Low willingness to pay | Free tier; show "$ recovered" prominently; annual plan |
| Insurer form changes | Insurer templates as versioned config, monitored monthly |

---

## Budget estimate (solo founder, first 6 months)

| Item | Approx. cost |
|---|---|
| Apple + Google developer accounts | ~$125 |
| Hosting, DB, storage, email inbound | $50–150 / month |
| AI API usage | scales with claims; budget $50–300 / month in beta |
| Plaid (Phase 3) | usage-based; check current pricing |
| Legal review | $500–2,000 one-time |
| Design (if outsourced) | $0–3,000 |

*(Estimates — verify current pricing before committing.)*

---

## Timeline at a glance

```
Phase 0  Validation
Phase 1  Design
Phase 2  MVP build + private beta
Phase 3  Smart layer (bank, policy reader, appeals)
Phase 4  Public launch
Phase 5  Growth & moat
Phase 6  Scale & compliance
```
