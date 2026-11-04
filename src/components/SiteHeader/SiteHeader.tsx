import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { navigationLinks } from "../../utils/navigation-links";
import type { SectionId, ThemePreference } from "../../utils/portfolio-types";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

type Props = {
  isMobile: boolean;
  activeSection: SectionId;
  themePreference: ThemePreference;
  onChangeTheme: (preference: ThemePreference) => void;
  pageProgressRef: RefObject<HTMLSpanElement | null>;
};

export function SiteHeader({
  isMobile,
  activeSection,
  themePreference,
  onChangeTheme,
  pageProgressRef,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);
  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node &&
          !menuRef.current?.contains(event.target) &&
          !menuToggleRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [menuOpen]);
  const links = navigationLinks.map((link) => (
    <a
      href={`#${link.id}`}
      aria-current={activeSection === link.id ? "location" : undefined}
      onClick={isMobile ? () => setMenuOpen(false) : undefined}
      key={link.id}
    >
      {link.label}
    </a>
  ));

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Amir Mohammad Moradi, home">
        <span className="brand-avatar" aria-hidden="true">
          <img src="/portrait.png" alt="" />
        </span>
        <span className="brand-name">Amir Mohammad Moradi</span>
      </a>
      {isMobile ? (
        <>
          <div className="mobile-header-actions">
            <a
              className="mobile-header-linkedin"
              href="https://www.linkedin.com/in/ammoradi/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <button
              className="mobile-menu-toggle"
              ref={menuToggleRef}
              type="button"
              aria-label={`${menuOpen ? "Close" : "Open"} navigation menu`}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X aria-hidden="true" />
              ) : (
                <Menu aria-hidden="true" />
              )}
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-menu" id="mobile-menu" ref={menuRef}>
              <nav aria-label="Primary navigation">{links}</nav>
              <div
                className="mobile-menu-actions"
                aria-label="Social links and appearance"
              >
                <a
                  href="https://github.com/ammoradi"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub aria-hidden="true" /> GitHub
                </a>
                <ThemeToggle preference={themePreference} onChange={onChangeTheme} />
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <nav className="site-nav" aria-label="Primary navigation">
            {links}
          </nav>
          <div className="header-links" aria-label="Header controls">
            <a
              className="header-icon"
              href="https://www.linkedin.com/in/ammoradi/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a
              className="header-icon"
              href="https://github.com/ammoradi"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <FaGithub aria-hidden="true" />
            </a>
            <ThemeToggle preference={themePreference} onChange={onChangeTheme} compact />
          </div>
        </>
      )}
      <div className="page-progress" aria-hidden="true">
        <span ref={pageProgressRef} />
      </div>
    </header>
  );
}
