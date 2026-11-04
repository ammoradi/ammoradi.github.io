import type { Theme, ThemePreference } from "./portfolio-types";

export function getInitialGalleryPlayback() {
  return !(
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function getInitialMobileLayout() {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(max-width: 740px)").matches
  );
}

export function getInitialThemePreference(): ThemePreference {
  try {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  } catch {}
  return "system";
}

export function getSystemTheme(): Theme {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
