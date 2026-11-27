"use client";

import { useId, useState, type FormEvent } from "react";
import { strings } from "../strings";

const copy = strings.waitlist;

type Status = "idle" | "submitting" | "success" | "notOpenYet" | "error";

const statusMessage: Record<Exclude<Status, "idle" | "submitting">, string> = {
  success: copy.success,
  notOpenYet: copy.notOpenYet,
  error: copy.error,
};

function readForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const petCount = String(data.get("petCount") ?? "").trim();
  return {
    email: String(data.get("email") ?? ""),
    wouldPay: String(data.get("wouldPay") ?? ""),
    insurer: String(data.get("insurer") ?? "").trim() || undefined,
    petCount: petCount === "" ? undefined : Number(petCount),
  };
}

function statusFromResponse(response: Response): Status {
  if (response.ok) return "success";
  if (response.status === 501) return "notOpenYet";
  return "error";
}

export function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const id = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(readForm(event.currentTarget)),
      });
      setStatus(statusFromResponse(response));
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";
  const message = status === "idle" || status === "submitting" ? "" : statusMessage[status];

  return (
    <form className="waitlist-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor={`${id}-email`}>{copy.emailLabel}</label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby={`${id}-email-hint`}
        />
        <p id={`${id}-email-hint`} className="hint">
          {copy.emailHint}
        </p>
      </div>

      <fieldset className="field">
        <legend>{copy.priceLegend}</legend>
        {copy.priceOptions.map((option, index) => (
          <div className="radio" key={option.value}>
            <input
              id={`${id}-price-${option.value}`}
              type="radio"
              name="wouldPay"
              value={option.value}
              required={index === 0}
            />
            <label htmlFor={`${id}-price-${option.value}`}>{option.label}</label>
          </div>
        ))}
      </fieldset>

      <div className="field">
        <label htmlFor={`${id}-insurer`}>{copy.insurerLabel}</label>
        <input id={`${id}-insurer`} name="insurer" type="text" autoComplete="off" maxLength={100} />
      </div>

      <div className="field">
        <label htmlFor={`${id}-petCount`}>{copy.petCountLabel}</label>
        <input
          id={`${id}-petCount`}
          name="petCount"
          type="number"
          inputMode="numeric"
          min={1}
          max={20}
          step={1}
        />
      </div>

      <button type="submit" className="button" disabled={isSubmitting}>
        {isSubmitting ? copy.submitting : copy.submit}
      </button>

      <p className="form-status" role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
