import { ExternalLink } from "lucide-react";
import { useState } from "react";
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
  const [playbackSlot, setPlaybackSlot] = useState<HTMLDivElement | null>(null);
  return (
    <article
      className={`impact-focus-card${mobile ? " mobile-impact-card" : ""}`}
      aria-live={mobile ? undefined : "polite"}
    >
      <div className="impact-card-topline">
        <div className="impact-card-labels">
          <p>{story.company}</p>
          <span aria-hidden="true">›</span>
          <p>{story.kicker}</p>
        </div>
        {!mobile && (
          <div className="impact-card-counter">
            <span>{String(index + 1).padStart(2, "0")} / 03</span>
            <div ref={setPlaybackSlot} />
          </div>
        )}
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
        <ImpactGallery story={story} emphasizeControl={index === 0} playbackSlot={playbackSlot} />
      </div>
      {mobile && <div className="mobile-impact-playback" ref={setPlaybackSlot} />}
    </article>
  );
}
