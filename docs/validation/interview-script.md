# Interview Script — Phase 0 Validation

**Who:** adults in the US who have (or recently had) pet insurance for at least one pet.
**Length:** 20–30 minutes. **Format:** video call, phone, or in person.
**Goal:** learn how people file claims today and where it hurts. **Not** a sales pitch.

Use one copy of [`interview-notes-template.md`](./interview-notes-template.md) per interview.
After the call, add one row to [`interview-tracker.csv`](./interview-tracker.csv).

---

## Ground rules for the interviewer

- **Ask about the past, not the future.** "Tell me about the last time…" beats "Would you…?"
- **Don't describe the product idea until Section 5.** Once they've heard it, their answers about the problem are biased.
- **Don't suggest answers.** Ask open questions; let silence sit for a few seconds.
- **Don't argue or correct.** If they say filing is easy, that is useful data.
- **Follow the energy.** If a story is emotional or detailed, ask for more of it.
- **Write down exact words** for strong statements (these become `key_quote`).
- **Don't collect sensitive data.** No policy numbers, claim numbers, full names of pets + owners together, addresses, or medical details beyond a general category (e.g., "an injury", "a chronic condition"). If they start reading out a policy number, stop them politely.

---

## 1. Intro and consent (2 min)

> Hi, thanks for making time. I'm [first name]. I'm researching how pet owners deal with pet insurance claims. I'm not selling anything today — I just want to hear about your experience. There are no right or wrong answers, and "it's easy, no problem" is a perfectly good answer.
>
> A few things before we start:
> - **I won't record this call unless you say it's OK.** Is it OK if I record audio, just for my own notes? *(If no: "No problem, I'll just type notes.")*
> - **I won't store your name, email, policy numbers, or your pet's medical details.** My notes use a code like "P07", not your name. Please don't share policy or claim numbers.
> - You can skip any question or stop at any time.
>
> Does that sound OK?

- [ ] Consent to continue: **Yes / No** (if No, thank them and end.)
- [ ] Consent to record: **Yes / No** (never record without an explicit Yes.)

---

## 2. Warm-up — their pets and insurance (3 min)

1. Tell me a bit about your pet(s).
2. How long have you had pet insurance? Which insurer are you with?
3. What made you decide to get insurance?

---

## 3. Filing claims today (8–10 min)

4. **Walk me through the last time you filed a claim, from the vet visit to getting paid.**
   - Follow-ups (use as needed):
     - What happened next?
     - Where did you get the invoice / medical records from?
     - How did you send the claim — app, email, website, paper?
     - Did anyone help you (vet clinic, partner, etc.)?
5. **Roughly how much time did that take you, all in?** (Include finding documents, filling forms, follow-ups.)
   - Follow-up: How long until you got the money?
6. What part of that process, if any, was the most annoying or confusing?
   - Follow-up: Why was that? / Can you give me an example?
7. How do you keep track of your vet documents and claims today?

## 4. Missed claims, deadlines, and denials (5–8 min)

8. **Has there ever been a vet visit you meant to claim but didn't end up claiming?**
   - If yes: What happened? Roughly how much money was it?
   - If no: How do you make sure you don't miss one?
9. **Do you know how long you have to submit a claim with your insurer?**
   - Follow-up: Have you ever been close to, or past, that deadline? What happened?
10. **Has a claim ever been denied, or paid less than you expected?**
    - If yes: What reason did they give? What did you do next? How did that feel?
    - If no: Has a claim ever been delayed or sent back asking for more documents?
11. Have you ever had to chase the insurer or the vet for anything? Tell me about it.

## 5. Current solutions and willingness to pay (5 min)

12. Have you tried anything to make claims easier — an app, a spreadsheet, a reminder, your vet's help?
    - Follow-up: What did you like or dislike about it?
13. *Now describe the idea in one neutral sentence:*
    > Some people are working on a tool where you forward your vet emails, it prepares the claim for your insurer, reminds you of the deadline, and checks the payment arrives. You'd still send the claim yourself.

    What's your honest reaction?
    - Follow-up: What would make it useful, or not useful, for you?
14. **If something like that existed, what, if anything, would you expect to pay for it?** *(Let them name a number first. Don't suggest one.)*
15. **Would you pay $4 a month for it?** *(Ask after Q14. Accept "yes", "no", or "maybe" — then ask "Why?")*
    - Follow-up: What would make it worth it, or not worth it?

## 6. Closing (2 min)

16. Is there anything about pet insurance claims I should have asked but didn't?
17. Do you know someone else with pet insurance who might be willing to talk to me?

> Thank you — this was really helpful. We're putting together a waitlist for early testers. **Would you like to join?** It's completely optional, and joining is separate from this interview — your notes stay anonymous either way.

- If yes: share the waitlist link (or ask them to sign up themselves). **Do not** copy their email into the interview notes or tracker.

---

## Interviewer checklist (after the call)

- [ ] Notes file saved as `P##` (no names, no emails).
- [ ] Any recording stored privately and deleted after notes are written.
- [ ] One row added to `interview-tracker.csv`.
- [ ] Scored the Y/N columns using the definitions in [`README.md`](./README.md#scoring-definitions).
