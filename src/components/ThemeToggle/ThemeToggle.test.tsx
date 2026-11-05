import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

describe("theme dropdown", () => {
  it("closes when a touch on the trigger blurs the selected option before click", () => {
    const onChange = vi.fn();
    render(<ThemeToggle preference="system" onChange={onChange} />);
    const trigger = screen.getByRole("button", { name: "Color theme: System" });
    fireEvent.click(trigger);
    const option = screen.getByRole("menuitemradio", { name: "System" });
    fireEvent.pointerDown(trigger, { pointerType: "touch" });
    fireEvent.pointerUp(trigger, { pointerType: "touch" });
    fireEvent.blur(option, { relatedTarget: null });
    fireEvent.click(trigger, { detail: 1 });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole("menuitemradio", { name: "Dark" }));
    expect(onChange).toHaveBeenCalledWith("dark");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.pointerDown(trigger);
    fireEvent.pointerUp(document.body);
    fireEvent.blur(screen.getByRole("menuitemradio", { name: "System" }), { relatedTarget: null });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

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
