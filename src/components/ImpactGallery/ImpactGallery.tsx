import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { getInitialGalleryPlayback } from "../../utils/initial-preferences";
import type { ImpactStory } from "../../utils/portfolio-types";

type ImpactGalleryProps = {
  story: ImpactStory;
  emphasizeControl?: boolean;
};

export function ImpactGallery({
  story,
  emphasizeControl = false,
}: ImpactGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [playing, setPlaying] = useState(getInitialGalleryPlayback);
  const [hovered, setHovered] = useState(false);
  const [hintVisible, setHintVisible] = useState(emphasizeControl);
  const imageCount = story.images?.length ?? 0;

  useEffect(() => {
    if (imageCount < 2 || !playing || hovered) return;
    const interval = window.setInterval(
      () => setActiveImage((current) => (current + 1) % imageCount),
      4600,
    );
    return () => window.clearInterval(interval);
  }, [hovered, imageCount, playing]);

  useEffect(() => {
    if (!emphasizeControl) return;
    const timeout = window.setTimeout(() => setHintVisible(false), 8000);
    return () => window.clearTimeout(timeout);
  }, [emphasizeControl]);

  if (!story.images) return null;

  return (
    <div
      className={`impact-gallery impact-gallery-${story.galleryFormat ?? "landscape"}`}
      aria-label={`${story.company} product screenshots`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {story.images.map((image, index) => (
        <figure
          className={`impact-image-card${image.presentation ? ` impact-image-card--${image.presentation}` : ""}${index === activeImage ? " is-active" : ""}`}
          key={image.src}
        >
          <a
            className="impact-image-link"
            href={story.productUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${story.company}: ${image.caption}`}
          >
            <img src={image.src} alt={image.alt} />
            <figcaption>
              <span>{image.caption}</span>
              <small>
                © {story.company} / Product imagery: {story.company}
              </small>
            </figcaption>
          </a>
        </figure>
      ))}
      <button
        className={`gallery-playback${hintVisible || !playing ? " is-prominent" : ""}`}
        type="button"
        aria-label={`${playing ? "Pause" : "Play"} automatic screenshot rotation`}
        aria-pressed={!playing}
        onClick={() => setPlaying((current) => !current)}
      >
        {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        <span>{playing ? "Pause auto-play" : "Start auto-play"}</span>
      </button>
    </div>
  );
}
