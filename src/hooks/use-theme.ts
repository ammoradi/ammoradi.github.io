import { useEffect, useState } from "react";
import { getInitialThemePreference, getSystemTheme } from "../utils/initial-preferences";
import type { ThemePreference } from "../utils/portfolio-types";

export function useTheme() {
  const [themePreference, setThemePreference] = useState(getInitialThemePreference);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  const theme = themePreference === "system" ? systemTheme : themePreference;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0c282d" : "#f6f0e4");
  }, [theme]);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystemTheme = (event: MediaQueryListEvent) =>
      setSystemTheme(event.matches ? "dark" : "light");
    setSystemTheme(systemTheme.matches ? "dark" : "light");
    systemTheme.addEventListener("change", followSystemTheme);
    return () => systemTheme.removeEventListener("change", followSystemTheme);
  }, []);

  const changeTheme = (preference: ThemePreference) => {
    try {
      if (preference === "system") window.localStorage.removeItem("portfolio-theme");
      else window.localStorage.setItem("portfolio-theme", preference);
    } catch {}
    setThemePreference(preference);
  };

  return { themePreference, changeTheme };
}
