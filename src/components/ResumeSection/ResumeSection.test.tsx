import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResumeSection } from "./ResumeSection";

describe("résumé views", () => {
  it("defaults to the cylinder and supports keyboard tab selection", () => {
    render(<ResumeSection />);
    const cylinder = screen.getByRole("tab", { name: "Cyrus Cylinder" });
    expect(cylinder).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: "Cyrus Cylinder" })).toBeVisible();
    fireEvent.keyDown(cylinder, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "PDF preview" })).toHaveFocus();
    expect(screen.getByRole("img", { name: /Preview of Amir/ })).toBeVisible();
    fireEvent.keyDown(screen.getByRole("tab", { name: "PDF preview" }), { key: "Home" });
    expect(cylinder).toHaveFocus();
    expect(screen.getByRole("tabpanel", { name: "Cyrus Cylinder" })).toBeVisible();
  });

  it("rolls with keys, buttons, and the position control; preserves position across tabs", () => {
    render(<ResumeSection />);
    const surface = screen.getByRole("slider", { name: "Roll the résumé cylinder" });
    expect(surface).toHaveAttribute("aria-valuenow", "13");
    fireEvent.keyDown(surface, { key: "ArrowDown" });
    expect(surface).toHaveAttribute("aria-valuenow", "19");
    fireEvent.click(screen.getByRole("button", { name: "Roll toward résumé end" }));
    expect(surface).toHaveAttribute("aria-valuenow", "31");
    fireEvent.change(screen.getByRole("slider", { name: "Résumé position" }), { target: { value: "63" } });
    fireEvent.click(screen.getByRole("tab", { name: "PDF preview" }));
    fireEvent.click(screen.getByRole("tab", { name: "Cyrus Cylinder" }));
    expect(surface).toHaveAttribute("aria-valuenow", "63");
    fireEvent.keyDown(surface, { key: "End" });
    expect(screen.getByRole("button", { name: "Roll toward résumé end" })).toBeDisabled();
    fireEvent.keyDown(surface, { key: "ArrowDown" });
    expect(surface).toHaveAttribute("aria-valuenow", "100");
    fireEvent.click(screen.getByRole("button", { name: "Reset cylinder" }));
    expect(surface).toHaveAttribute("aria-valuenow", "0");
  });

  it("rolls on wheel input and releases page scrolling at the ends", () => {
    render(<ResumeSection />);
    const surface = screen.getByRole("slider", { name: "Roll the résumé cylinder" });
    fireEvent.keyDown(surface, { key: "Home" });
    expect(fireEvent.wheel(surface, { deltaY: -100, cancelable: true })).toBe(true);
    expect(fireEvent.wheel(surface, { deltaY: 180, cancelable: true })).toBe(false);
    expect(surface).toHaveAttribute("aria-valuenow", "10");
    fireEvent.keyDown(surface, { key: "End" });
    expect(fireEvent.wheel(surface, { deltaY: 100, cancelable: true })).toBe(true);
    fireEvent.wheel(surface, { deltaY: -100, ctrlKey: true });
    expect(surface).toHaveAttribute("aria-valuenow", "100");
  });
});
