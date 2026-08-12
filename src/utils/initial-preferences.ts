import type { Theme } from "./portfolio-types";

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

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const savedTheme = window.localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
