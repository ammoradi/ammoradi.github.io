import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

describe("theme dropdown", () => {
  it("supports keyboard selection, Escape, and outside dismissal", () => {
    const onChange = vi.fn();
    render(<ThemeToggle preference="system" onChange={onChange} />);
    const trigger = screen.getByRole("button", { name: "Color theme: System" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const system = screen.getByRole("menuitemradio", { name: "System" });
    expect(system).toHaveAttribute("aria-checked", "true");
    expect(system).toHaveFocus();
    fireEvent.keyDown(system, { key: "ArrowDown" });
    const light = screen.getByRole("menuitemradio", { name: "Light" });
    expect(light).toHaveFocus();
    fireEvent.keyDown(light, { key: "End" });
    expect(system).toHaveFocus();
    fireEvent.keyDown(system, { key: "Home" });
    expect(light).toHaveFocus();
    fireEvent.click(light);
    expect(onChange).toHaveBeenCalledWith("light");
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.click(trigger);
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
