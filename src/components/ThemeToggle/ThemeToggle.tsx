import { Moon, Sun } from "lucide-react";
import type { Theme } from "../../utils/portfolio-types";

type ThemeToggleProps = {
  theme: Theme;
  onToggle: () => void;
  compact?: boolean;
};

export function ThemeToggle({
  theme,
  onToggle,
  compact = false,
}: ThemeToggleProps) {
  return (
    <button
      className={compact ? "header-theme theme-toggle" : "theme-toggle"}
      type="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      aria-pressed={theme === "dark"}
      onClick={onToggle}
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" />
      ) : (
        <Moon aria-hidden="true" />
      )}
      <span>
        {theme === "dark"
          ? compact
            ? "Light"
            : "Light theme"
          : compact
            ? "Dark"
            : "Dark theme"}
      </span>
    </button>
  );
}
