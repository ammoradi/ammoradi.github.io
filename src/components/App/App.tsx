import { useRef } from "react";
import { useMobileLayout } from "../../hooks/use-mobile-layout";
import { usePageScroll } from "../../hooks/use-page-scroll";
import { useTheme } from "../../hooks/use-theme";
import { impactStories } from "../../utils/impact-stories";
import { ContactSection } from "../ContactSection/ContactSection";
import { ImpactSection } from "../ImpactSection/ImpactSection";
import { ResumeSection } from "../ResumeSection/ResumeSection";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteHeader } from "../SiteHeader/SiteHeader";
import { SkillsSection } from "../SkillsSection/SkillsSection";

export default function App() {
  const isMobile = useMobileLayout();
  const { theme, toggleTheme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);
  const scroll = usePageScroll(heroRef, isMobile, impactStories.length);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader
        isMobile={isMobile}
        activeSection={scroll.activeSection}
        theme={theme}
        onToggleTheme={toggleTheme}
        pageProgressRef={scroll.pageProgressRef}
      />
      <main id="main-content">
        <ImpactSection
          isMobile={isMobile}
          activeImpact={scroll.activeImpact}
          heroRef={heroRef}
          impactNavigationRef={scroll.impactNavigationRef}
        />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
