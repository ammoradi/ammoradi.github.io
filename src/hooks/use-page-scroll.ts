import { useEffect, useRef, useState, type RefObject } from "react";
import { navigationLinks } from "../utils/navigation-links";
import type { SectionId } from "../utils/portfolio-types";

export function usePageScroll(
  heroRef: RefObject<HTMLElement | null>,
  isMobile: boolean,
  impactCount: number,
) {
  const [activeImpact, setActiveImpact] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>("top");
  const pageProgressRef = useRef<HTMLSpanElement>(null);
  const impactNavigationRef = useRef(0);

  useEffect(() => {
    const updateScrollState = () => {
      const hero = heroRef.current;
      if (hero && !isMobile) {
        const scrollRange = Math.max(1, hero.offsetHeight - window.innerHeight);
        const progress = Math.min(
          1,
          Math.max(0, (window.scrollY - hero.offsetTop) / scrollRange),
        );
        const nextImpact = Math.min(
          impactCount - 1,
          Math.floor(progress * impactCount),
        );
        impactNavigationRef.current = nextImpact;
        setActiveImpact((current) =>
          current === nextImpact ? current : nextImpact,
        );
      }

      const pageRange = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const pageProgress = Math.min(1, Math.max(0, window.scrollY / pageRange));
      if (pageProgressRef.current)
        pageProgressRef.current.style.transform = `scaleX(${pageProgress})`;

      const activationPoint = window.scrollY + 96;
      const isAtPageEnd =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 4;
      const nextSection = isAtPageEnd
        ? "contact"
        : navigationLinks.reduce<SectionId>((current, link) => {
            const section = document.getElementById(link.id);
            return section && section.offsetTop <= activationPoint
              ? link.id
              : current;
          }, "top");
      setActiveSection((current) =>
        current === nextSection ? current : nextSection,
      );
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [heroRef, impactCount, isMobile]);

  return { activeImpact, activeSection, impactNavigationRef, pageProgressRef };
}
