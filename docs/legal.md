# Legal Brief — PawClaim

> ## Status: PENDING LAWYER REVIEW — auto-submission NOT approved
>
> This document is a **brief for outside counsel**. It describes the product and lists questions. It contains **no legal conclusions**. Nothing here means that any mode, feature, wording or fee model is legal or approved.
> Until the [Decision](#4-decision) section is signed off by the owner after the lawyer's answers, AGENTS.md §8 applies: v1 is "owner submits" only and nothing is auto-submitted.

| | |
|---|---|
| Prepared by | PawClaim team (non-lawyers) |
| Prepared on | 2026-11-27 |
| Source | `plan.md` (Phase 0 task 5, Phases 2–5), `AGENTS.md` §7–8 |
| First market | United States |

---

## 1. What PawClaim does

### 1.1 Product in one line
Pet owners forward vet emails and documents. PawClaim turns them into a claim package for the owner's pet insurer (any insurer), tracks the filing deadline, and checks that the reimbursement arrives.

### 1.2 Who the parties are
- **Customer:** a US pet owner (household) with a pet insurance policy. They pay PawClaim a subscription (planned: $3.99/month or $29/year; free tier of 1 pet and 3 claims/year).
- **Insurer:** the owner's pet insurance company. PawClaim has **no contract or partnership** with any insurer in v1.
- **Vet clinic:** sends invoices and medical records to the owner. No contract with PawClaim in v1.
- **PawClaim:** a software company. It does not act as an insurer, insurance agency, broker or adjuster, and as far as the team knows it holds no insurance licenses (owner to confirm).

### 1.3 v1 — "Owner submits" (MVP, planned)
1. The owner forwards vet emails/documents to a PawClaim address, or uploads them in the app.
2. AI reads the documents and extracts facts (clinic, date, line items, totals, diagnosis, invoice number). It never invents or changes amounts, dates or diagnoses.
3. **The owner reviews and confirms** every extracted field.
4. PawClaim fills in the insurer's claim form and merges it with the invoice and records into one PDF. For email-based insurers it also drafts the email.
5. **The owner sends the claim themselves.** PawClaim opens the owner's mail composer or share sheet, or shows step-by-step instructions for the insurer's portal. PawClaim does not log into insurer accounts and does not contact the insurer.
6. PawClaim reminds the owner of the filing deadline. The owner updates the claim status by hand.
7. PawClaim does **not** negotiate with the insurer, give an opinion on coverage, or promise approval or a payout amount.

### 1.4 Later modes (planned, not built, not approved)
| Mode | Phase | What it would do |
|---|---|---|
| **A. Submit on behalf (auto-submission)** | 5 | PawClaim sends the claim to the insurer for the owner by email, API or a partner program. |
| **B. Appeal / denial helper** | 3 | Reads the insurer's denial letter or EOB, explains the stated reason in plain language, and drafts an appeal letter citing the policy and records. The owner reviews and sends it. |
| **C. Appeal success fee** | later | A fee charged when an appeal results in payment (amount/percentage not decided). |
| **D. "Is this covered?" policy Q&A** | 3 | Reads the owner's policy PDF and answers coverage questions, citing the policy section, with a "not a guarantee" note. |
| **E. Reimbursement estimator** | 3 | Shows an expected payout from the deductible, reimbursement % and limits in the owner's policy. |
| **F. Status auto-detection** | 3 | The owner forwards insurer emails. AI updates the claim status. |
| **G. Bank linking (Plaid)** | 3 | Reads the owner's bank transactions to find vet payments with no claim, and insurer deposits that should have arrived. |
| **H. Vet clinic B2B / white label** | 5 | Clinics use PawClaim to prepare (or, if approved, submit) claims for their clients, possibly integrated with practice software. |
| **I. Insurance comparison at renewal** | 5 | "Based on your last 12 months of claims, here's what other plans would have paid." Possible affiliate revenue from insurers. |
| **J. International** | 5 | UK, Canada, then EU. |

### 1.5 Data PawClaim handles
| Data | Examples | When |
|---|---|---|
| Pet medical records | diagnoses, treatments, medications, vet notes | v1 |
| Vet invoices | line items, amounts, clinic details | v1 |
| Owner identity & contact | name, email, address, phone | v1 |
| Insurance policy data | insurer, policy number, policy PDF, coverage terms | v1 |
| Claim history & status | amounts claimed, paid, denied; denial letters | v1 / Phase 3 |
| Bank transaction data | transactions from linked accounts (via Plaid) | Phase 3 |
| Third-party processors | cloud hosting, inbound email provider, AI model provider (Anthropic Claude API), analytics | v1 |

Current safeguards (planned, see AGENTS.md §7): encryption at rest, short-lived signed URLs, no sensitive data in logs, per-household access control, audit log of claim creation, edits, generation and submission.

---

## 2. Questions for the lawyer

Please answer per mode and per state where the answer differs.

### 2.1 Licensing — public adjuster / insurance producer / other
1. In **v1 "owner submits" mode (§1.3)**, does PawClaim need a public adjuster, insurance producer (agent/broker), or any other license in any US state? Does charging a subscription change the answer?
2. For **Mode A (submit on behalf)**: what license(s) would be needed, and in which states? Does it matter whether submission is by email, insurer API or an insurer partner program?
3. Is there a line between "software that fills in a form the customer sends" and "acting on behalf of the insured"? Which product behaviors cross it (e.g., drafting the cover email, choosing which documents to attach, pre-filling the claim description)?
4. Do public adjuster laws in the target states apply to **pet insurance** (often property/casualty or inland marine), or only to certain lines of insurance?
5. For **Mode H (vet clinic B2B)**: does the answer change if the clinic, not the owner, prepares or sends claims through PawClaim? Does the clinic need anything?
6. For **Mode I (insurance comparison / affiliate revenue)**: does comparing plans or receiving referral fees from insurers require a producer license or create other obligations (e.g., disclosure of compensation)?
7. For **Modes D and E (coverage Q&A, payout estimate)**: could explaining policy terms or estimating payouts be treated as adjusting, giving insurance advice, or the unauthorized practice of law?
8. Do we need any insurer's permission to prepare claims on their forms, or to use their claim-form PDFs in our product?

### 2.2 Which states matter first
9. Which US states should we analyze first? Please suggest an order based on (a) strict public adjuster / producer rules and (b) where pet owners with insurance are concentrated. Should we geo-restrict any modes by state at launch?
10. Is a 50-state survey needed before launching v1 nationally, or can v1 launch nationally if "owner submits" is cleared in a defined set of states?

### 2.3 Appeal-letter drafting (Mode B)
11. Can PawClaim draft an appeal letter that the owner reviews and sends? Does that count as adjusting, advocacy on behalf of the insured, or legal services?
12. What wording or design (e.g., "template you edit", owner signs and sends) changes the answer?
13. Are there limits on explaining a denial reason "in plain language"?

### 2.4 Fee models
14. **Flat subscription** (independent of claim outcome) — any licensing or regulatory problem in each mode?
15. **Success fee / percentage of recovered money (Mode C)** — does an outcome-based fee change the licensing analysis (e.g., public adjuster fee rules or caps)?
16. **Free tier + paid tier** — any issue with limiting the number of claims prepared per year?
17. **Affiliate / referral fees from insurers (Mode I)** — any restrictions or conflict-of-interest disclosures?
18. **Vet clinic B2B fees (Mode H)** — any issue with clinics paying us, or with clinics charging clients for the service?

### 2.5 Required disclaimers and wording
19. What disclaimers must appear in the app, website, generated claim package and emails for each mode? Please provide or approve wording.
20. Specific wording we plan to use — is it acceptable, and what's missing?
    - "We prepare your claim. You submit it to your insurer."
    - "This is not a guarantee of coverage or payment." (policy Q&A and payout estimate)
    - "PawClaim is not your insurer, agent, broker or adjuster."
21. Which words or claims must we avoid in marketing (e.g., "get paid more", "we file for you", "maximize your claim")?
22. What must the Terms of Service and Privacy Policy include for each mode?

### 2.6 Privacy and data laws
23. **HIPAA:** does HIPAA apply to pet medical records or to PawClaim in any mode? Does anything change if a vet clinic partner (Mode H) is involved?
24. Are there **state veterinary records confidentiality laws** that affect receiving, storing or processing pet medical records forwarded by the owner, or receiving them directly from clinics (Mode H)?
25. **GLBA:** does GLBA apply to PawClaim (a) in v1, (b) once we hold policy numbers and claim payment data, (c) once bank data is linked via Plaid (Mode G)? If yes, which obligations (Safeguards Rule, privacy notices)?
26. **CCPA/CPRA** and other **state privacy laws** (e.g., Virginia, Colorado, Connecticut, Texas): which apply at our expected size, and what do we need (notices, data subject requests, sensitive data handling, opt-outs)?
27. **Financial data (Mode G):** any obligations beyond GLBA/state privacy laws for bank transaction data (e.g., CFPB rules on personal financial data access, Plaid's terms)?
28. **AI processing:** any disclosures or consent needed for sending documents to a third-party AI model provider? Any restrictions on using data to improve the product?
29. **Inbound email:** any issues with receiving emails (and attachments) that contain third-party information (e.g., vet staff names) on the owner's behalf?
30. **Data retention and deletion:** what retention limits or deletion obligations apply to each data type in §1.5?
31. **Insurance data rules:** do any state insurance data security laws (e.g., NAIC Insurance Data Security Model Law adoptions) apply to PawClaim?

### 2.7 Other
32. **Fraud and duplicates:** do we have any duty if we detect a possible duplicate or altered claim? (We block duplicate claims for the same invoice and never alter source values.)
33. **Liability:** if the AI extraction is wrong and the owner submits it, what is our exposure? What contract terms limit it?
34. **International (Mode J):** at a high level, what should we check first for the UK, Canada and EU (licensing equivalents, GDPR)? A referral is fine.
35. Is there anything about this product we haven't asked about that you'd flag?

---

## 3. Lawyer answers

*To be completed by counsel. Leave blank until answered.*

| | |
|---|---|
| Lawyer name | |
| Firm | |
| Jurisdiction(s) covered | |
| Date of advice | |
| Engagement / reference | |
| Written memo attached (link, stored privately) | |

| Q# | Answer | States covered | Conditions / caveats |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |
| 9 | | | |
| 10 | | | |
| 11 | | | |
| 12 | | | |
| 13 | | | |
| 14 | | | |
| 15 | | | |
| 16 | | | |
| 17 | | | |
| 18 | | | |
| 19 | | | |
| 20 | | | |
| 21 | | | |
| 22 | | | |
| 23 | | | |
| 24 | | | |
| 25 | | | |
| 26 | | | |
| 27 | | | |
| 28 | | | |
| 29 | | | |
| 30 | | | |
| 31 | | | |
| 32 | | | |
| 33 | | | |
| 34 | | | |
| 35 | | | |

Approved disclaimer wording (verbatim from counsel):

> _(blank)_

---

## 4. Decision

*To be completed by the owner after reading the lawyer's answers. Until this is filled in and signed, every mode below is **not approved**.*

| Mode | Decision (approved / approved with conditions / not approved) | Conditions (states, wording, fees) | Based on Q# |
|---|---|---|---|
| v1 — Owner submits | | | |
| A — Submit on behalf | | | |
| B — Appeal drafting | | | |
| C — Appeal success fee | | | |
| D — "Is this covered?" | | | |
| E — Reimbursement estimator | | | |
| F — Status auto-detection | | | |
| G — Bank linking | | | |
| H — Vet clinic B2B | | | |
| I — Insurance comparison / affiliate | | | |
| J — International | | | |

| | |
|---|---|
| Decided by (owner) | |
| Date | |
| Next legal review date | |

Phase 0 exit criterion this feeds (`plan.md`): *Legal answer: "owner submits" mode is safe.*
