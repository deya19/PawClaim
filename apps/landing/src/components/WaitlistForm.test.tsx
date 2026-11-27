import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { strings } from "../strings";
import { WaitlistForm } from "./WaitlistForm";

const copy = strings.waitlist;

afterEach(cleanup);

describe("WaitlistForm", () => {
  it("renders every waitlist field with an accessible label", () => {
    render(<WaitlistForm />);

    const email = screen.getByLabelText(copy.emailLabel);
    expect(email.getAttribute("type")).toBe("email");
    expect(email.hasAttribute("required")).toBe(true);

    const priceGroup = screen.getByRole("group", { name: copy.priceLegend });
    expect(priceGroup).toBeTruthy();
    for (const option of copy.priceOptions) {
      const radio = screen.getByRole("radio", { name: option.label });
      expect(radio.getAttribute("value")).toBe(option.value);
    }

    const insurer = screen.getByLabelText(copy.insurerLabel);
    expect(insurer.hasAttribute("required")).toBe(false);

    const petCount = screen.getByLabelText(copy.petCountLabel);
    expect(petCount.getAttribute("type")).toBe("number");
    expect(petCount.hasAttribute("required")).toBe(false);

    expect(screen.getByRole("button", { name: copy.submit })).toBeTruthy();
  });

  it("offers exactly the four price options", () => {
    render(<WaitlistForm />);
    expect(screen.getAllByRole("radio")).toHaveLength(4);
  });

  it("posts to /api/waitlist and shows 'not open yet' while the route is a 501 stub", async () => {
    const fetchMock = vi.fn(async () => new Response(null, { status: 501 }));
    vi.stubGlobal("fetch", fetchMock);

    render(<WaitlistForm />);
    fireEvent.change(screen.getByLabelText(copy.emailLabel), {
      target: { value: "owner@example.com" },
    });
    fireEvent.click(screen.getByRole("radio", { name: "Maybe" }));
    const form = screen.getByRole("button", { name: copy.submit }).closest("form");
    if (!form) throw new Error("waitlist form not found");
    fireEvent.submit(form);

    expect(await screen.findByText(copy.notOpenYet)).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/waitlist",
      expect.objectContaining({ method: "POST" }),
    );
    vi.unstubAllGlobals();
  });
});
