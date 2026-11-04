import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTheme } from "./use-theme";

describe("theme preference", () => {
  it("resumes live system appearance after clearing a saved override", () => {
    let notify = (_event: { matches: boolean }) => {};
    const removeEventListener = vi.fn();
    vi.stubGlobal("matchMedia", () => ({
      matches: false,
      addEventListener: (_type: string, listener: typeof notify) => { notify = listener; },
      removeEventListener,
    }));
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    document.head.append(meta);
    window.localStorage.setItem("portfolio-theme", "dark");

    const { result, unmount } = renderHook(useTheme);
    expect(result.current.themePreference).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(meta.content).toBe("#0c282d");

    act(() => result.current.changeTheme("system"));
    expect(window.localStorage.getItem("portfolio-theme")).toBeNull();
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(meta.content).toBe("#f6f0e4");
    act(() => notify({ matches: true }));
    expect(document.documentElement.dataset.theme).toBe("dark");

    act(() => result.current.changeTheme("light"));
    expect(window.localStorage.getItem("portfolio-theme")).toBe("light");
    act(() => notify({ matches: false }));
    act(() => notify({ matches: true }));
    expect(document.documentElement.dataset.theme).toBe("light");
    act(() => result.current.changeTheme("system"));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    unmount();
    expect(removeEventListener).toHaveBeenCalledWith("change", notify);
    meta.remove();
  });

  it("defaults to System and keeps working when storage is blocked", () => {
    vi.stubGlobal("localStorage", {
      getItem: () => { throw new Error("Storage blocked"); },
      setItem: () => { throw new Error("Storage blocked"); },
      removeItem: () => { throw new Error("Storage blocked"); },
    });
    const { result } = renderHook(useTheme);
    expect(result.current.themePreference).toBe("system");
    act(() => result.current.changeTheme("dark"));
    expect(document.documentElement.dataset.theme).toBe("dark");
    act(() => result.current.changeTheme("system"));
    expect(result.current.themePreference).toBe("system");
    vi.unstubAllGlobals();
  });
});
