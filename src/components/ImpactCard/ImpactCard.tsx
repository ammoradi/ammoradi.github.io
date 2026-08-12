import { ExternalLink } from "lucide-react";
import { SiReact } from "react-icons/si";
import type { ImpactStory } from "../../utils/portfolio-types";
import { ImpactGallery } from "../ImpactGallery/ImpactGallery";

export function ImpactCard({
  story,
  index,
  mobile = false,
}: {
  story: ImpactStory;
  index: number;
  mobile?: boolean;
}) {
  const Heading = mobile ? "h2" : "h1";
  return (
    <article
      className={`impact-focus-card${mobile ? " mobile-impact-card" : ""}`}
      aria-live={mobile ? undefined : "polite"}
      data-step={String(index + 1).padStart(2, "0")}
    >
      <div className="impact-card-topline">
        <div className="impact-card-labels">
          <p>{story.company}</p>
          <span aria-hidden="true">›</span>
          <p>{story.kicker}</p>
        </div>
        {!mobile && <span>{String(index + 1).padStart(2, "0")} / 03</span>}
      </div>
      <div className="impact-story-copy">
        <Heading id={mobile ? undefined : "hero-title"}>{story.title}</Heading>
        <dl className="impact-metrics impact-metrics-compact">
          {story.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.value}</dt>
              <dd>{metric.label}</dd>
            </div>
          ))}
        </dl>
        {story.productUrl && (
          <a
            className="impact-product-link"
            href={story.productUrl}
            target="_blank"
            rel="noreferrer"
          >
            {story.productLabel}
            <ExternalLink aria-hidden="true" />
          </a>
        )}
      </div>
      <div className="impact-story-side">
        <ImpactGallery story={story} emphasizeControl={index === 0} />
      </div>
      <SiReact className="impact-react-mark" aria-hidden="true" />
    </article>
  );
}
