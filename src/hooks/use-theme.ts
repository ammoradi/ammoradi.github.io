import { useEffect, useState } from "react";
import { getInitialTheme } from "../utils/initial-preferences";

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#151513" : "#f5f2ea");
  }, [theme]);

  useEffect(() => {
    if (
      typeof window.matchMedia !== "function" ||
      window.localStorage.getItem("portfolio-theme")
    )
      return;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystemTheme = (event: MediaQueryListEvent) =>
      setTheme(event.matches ? "dark" : "light");
    systemTheme.addEventListener("change", followSystemTheme);
    return () => systemTheme.removeEventListener("change", followSystemTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("portfolio-theme", nextTheme);
    setTheme(nextTheme);
  };

  return { theme, toggleTheme };
}
