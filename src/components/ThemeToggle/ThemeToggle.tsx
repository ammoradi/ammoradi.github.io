import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import type { ThemePreference } from "../../utils/portfolio-types";
import "./theme-toggle.css";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

type ThemeToggleProps = {
  preference: ThemePreference;
  onChange: (preference: ThemePreference) => void;
  compact?: boolean;
};

export function ThemeToggle({ preference, onChange, compact = false }: ThemeToggleProps) {
  const [open, setOpen] = useState(false);
  const picker = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const openAtPointerDown = useRef<boolean | null>(null);
  const menuId = useId();
  const selected = themes.find((theme) => theme.value === preference)!;
  const Icon = selected.icon;

  useEffect(() => {
    const clearOutsidePress = (event: PointerEvent) => {
      if (event.type === "pointercancel" || !trigger.current?.contains(event.target as Node)) {
        openAtPointerDown.current = null;
      }
    };
    document.addEventListener("pointerup", clearOutsidePress);
    document.addEventListener("pointercancel", clearOutsidePress);
    return () => {
      document.removeEventListener("pointerup", clearOutsidePress);
      document.removeEventListener("pointercancel", clearOutsidePress);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    picker.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus();
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !picker.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div
      className={compact ? "header-theme theme-picker" : "theme-picker"}
      ref={picker}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        className="theme-toggle"
        type="button"
        ref={trigger}
        aria-label={`Color theme: ${selected.label}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onPointerDown={(event) => { if (event.button === 0) openAtPointerDown.current = open; }}
        onClick={(event) => {
          const previous = event.detail === 0 ? null : openAtPointerDown.current;
          openAtPointerDown.current = null;
          setOpen((wasOpen) => !(previous ?? wasOpen));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <Icon size={16} aria-hidden="true" />
        <span>{selected.label}</span>
        <ChevronDown className="theme-caret" size={14} aria-hidden="true" />
      </button>
      {open && (
        <div
          className="theme-menu"
          id={menuId}
          role="menu"
          aria-label="Color theme"
          onKeyDown={(event) => {
            if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const options = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
            const index = options.findIndex((option) => option === document.activeElement);
            const next = event.key === "Home" ? 0 : event.key === "End" ? options.length - 1
              : (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length;
            options[next]?.focus();
          }}
        >
          {themes.map(({ value, label, icon: OptionIcon }) => (
            <button
              className="theme-option"
              key={value}
              type="button"
              role="menuitemradio"
              aria-checked={preference === value}
              tabIndex={-1}
              onClick={() => {
                onChange(value);
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <OptionIcon size={17} aria-hidden="true" />
              <span>{label}</span>
              {preference === value && <Check className="theme-check" size={16} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
