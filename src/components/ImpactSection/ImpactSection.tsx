import { ChevronDown } from "lucide-react";
import type { RefObject } from "react";
import { impactStories } from "../../utils/impact-stories";
import { HeroIdentity } from "../HeroIdentity/HeroIdentity";
import { ImpactCard } from "../ImpactCard/ImpactCard";

type Props = {
  isMobile: boolean;
  activeImpact: number;
  heroRef: RefObject<HTMLElement | null>;
  impactNavigationRef: RefObject<number>;
};

export function ImpactSection({
  isMobile,
  activeImpact,
  heroRef,
  impactNavigationRef,
}: Props) {
  const advance = () => {
    const hero = heroRef.current;
    if (!hero) return;
    const current = impactNavigationRef.current;
    if (current >= impactStories.length - 1)
      return document
        .getElementById("skills")
        ?.scrollIntoView({ behavior: "smooth" });
    const range = Math.max(1, hero.offsetHeight - window.innerHeight);
    const next = current + 1;
    impactNavigationRef.current = next;
    window.scrollTo({
      top: hero.offsetTop + range * ((next + 0.05) / impactStories.length),
      behavior: "smooth",
    });
  };

  return (
    <section
      className={`hero${isMobile ? " hero-mobile" : ""}`}
      id="top"
      aria-label="Impact stories"
      ref={heroRef}
    >
      {isMobile ? (
        <div className="mobile-impact-list">
          <HeroIdentity />
          {impactStories.map((story, index) => (
            <ImpactCard
              story={story}
              index={index}
              mobile
              key={story.company}
            />
          ))}
        </div>
      ) : (
        <div
          className="hero-impact"
          aria-roledescription="carousel"
          aria-label="Selected impact"
        >
          <HeroIdentity />
          <div className="impact-stage">
            <ImpactCard
              story={impactStories[activeImpact]}
              index={activeImpact}
              key={impactStories[activeImpact].company}
            />
          </div>
          <button
            className="scroll-cue"
            type="button"
            aria-label="Explore impact stories"
            onClick={advance}
          >
            <span>Scroll through impact stories</span>
            <ChevronDown aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
