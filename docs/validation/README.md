# Phase 0 Validation — Interview Kit

Everything needed to run the Phase 0 customer interviews from [`plan.md`](../../plan.md) and score the go / no-go decision.

| File | What it's for |
|---|---|
| [`interview-script.md`](./interview-script.md) | What to say: intro + consent, open questions, follow-ups, closing waitlist ask. |
| [`interview-notes-template.md`](./interview-notes-template.md) | One-page anonymized notes form. Copy once per interview (`P01.md`, `P02.md`, …). |
| [`interview-tracker.csv`](./interview-tracker.csv) | One row per interview. Used to score the exit criteria. |
| [`recruiting-posts.md`](./recruiting-posts.md) | Outreach drafts for Reddit, Facebook groups, and friends. |

## How to run it

1. Recruit participants with [`recruiting-posts.md`](./recruiting-posts.md) — **check each community's self-promotion rules first.**
2. Give each participant the next ID: `P01`, `P02`, … Never use names or emails as IDs.
3. Run the interview with [`interview-script.md`](./interview-script.md). Get consent before starting; never record without an explicit Yes.
4. Fill in a copy of the notes template during / right after the call.
5. Add one row to `interview-tracker.csv` using the scoring definitions below.
6. After 20+ interviews, score the exit criteria.

## Privacy rules

- Participant ID only. No names, emails, phone numbers, addresses, policy numbers, claim numbers, or detailed medical information in notes or the tracker.
- Insurer name is OK (it is needed for the insurer research). Policy details are not.
- Delete any recordings once notes are written.
- `key_quote` must not contain anything that identifies the person or their pet's medical history.
- Filled-in notes and real tracker rows stay in the owner's private research folder, not in this repo, unless the owner decides otherwise. The committed CSV has the header only.

---

## Exit criteria (go / no-go) — from `plan.md` Phase 0

Copied exactly from `plan.md`:

- ≥ 15 of 20 interviewees describe the pain clearly.
- ≥ 200 waitlist signups OR ≥ 30% of interviewees say they would pay.
- Legal answer: "owner submits" mode is safe.

**Go** only if **all three** are met. Any one not met = **no-go** (or revisit the plan with the owner).

### How to score each one

| # | Criterion | Source | How to compute | Pass if |
|---|---|---|---|---|
| 1 | ≥ 15 of 20 interviewees describe the pain clearly | `interview-tracker.csv` | Count rows where `describes_pain = Y`. | Count ≥ 15 (out of 20 interviews) |
| 2a | ≥ 200 waitlist signups | Waitlist / landing page (Phase 0 task 2) | Total signups from the waitlist tool. | ≥ 200 |
| 2b | ≥ 30% of interviewees say they would pay | `interview-tracker.csv` | Rows where `would_pay = Y` ÷ total rows. | ≥ 30% |
| 2 | (2a **OR** 2b) | — | — | Either 2a or 2b passes |
| 3 | "Owner submits" mode is safe | Legal memo (Phase 0 task 5) | Lawyer's written answer. | Lawyer says owner-submits is safe |

Only criteria 1 and 2b come from the tracker. 2a and 3 come from other Phase 0 tasks.

#### Notes on scoring

- **`maybe` does not count as "would pay".** `plan.md` says "say they would pay", so only `Y` counts. Report the `maybe` count separately as context.
- **More than 20 interviews:** `plan.md` states criterion 1 as "15 of 20". If you run more than 20 interviews, report the raw count and total (e.g. "17 of 24") and let the owner decide how to read it — don't rescale the threshold without the owner's sign-off.
- Exclude rows where the participant did **not** consent or stopped before Section 3.

Quick count from the command line (header row skipped):

```bash
# Criterion 1: describes_pain = Y (column 6)
tail -n +2 interview-tracker.csv | awk -F, '$6=="Y"' | wc -l
# Criterion 2b: would_pay = Y (column 7), and total rows
tail -n +2 interview-tracker.csv | awk -F, '$7=="Y"' | wc -l
tail -n +2 interview-tracker.csv | wc -l
```

(If a `key_quote` contains commas, wrap it in double quotes. The `awk` commands above still work because the quote is the last column. Or just open the CSV in a spreadsheet and use `COUNTIF`.)

---

## Scoring definitions

Use these when filling each tracker row so different interviewers score the same way.

| Column | Values | Definition |
|---|---|---|
| `participant_id` | `P01`, `P02`, … | Anonymous ID. Never a name or email. |
| `date` | `YYYY-MM-DD` | Interview date. |
| `channel` | `reddit`, `facebook`, `friend`, `referral`, `other` | Where you found them. |
| `insurer` | text | Insurer name only. No policy numbers. |
| `pets` | integer | Number of insured pets. |
| `describes_pain` | `Y` / `N` | `Y` if, **without prompting**, they described at least one concrete problem with filing claims (e.g., time spent, chasing records, confusing forms, missed claim, missed deadline, denial, slow payment) **and** it clearly bothered them. `N` if they said it's easy / fine, or only agreed when you suggested a problem. |
| `would_pay` | `Y` / `N` / `maybe` | Their answer to Q15 ("Would you pay $4 a month…?"). `Y` = clear yes. `maybe` = "depends", "probably", "maybe". `N` = no. |
| `price_said` | number or blank | The monthly price they named in Q14 before hearing $4 (e.g. `5`, `0`). Blank if they didn't name one. Note "per year" if they said a yearly price. |
| `missed_deadline` | `Y` / `N` | `Y` if they ever missed a claim deadline **or** skipped claiming a visit they could have claimed. |
| `denied_before` | `Y` / `N` | `Y` if any claim was ever denied or paid noticeably less than expected. |
| `key_quote` | text | One short, exact, anonymized quote. Wrap in double quotes if it contains commas. |

### Example rows (fake — for format only, don't add to the tracker)

```csv
participant_id,date,channel,insurer,pets,describes_pain,would_pay,price_said,missed_deadline,denied_before,key_quote
P01,2026-12-02,reddit,ExampleInsurer,1,Y,Y,5,Y,N,"I had the invoice but the records took two weeks to get from the clinic."
P02,2026-12-03,friend,ExampleInsurer,2,N,maybe,,N,N,"Honestly the app is fine, it takes me five minutes."
```
