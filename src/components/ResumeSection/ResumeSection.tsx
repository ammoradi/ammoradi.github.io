import { Download } from "lucide-react";
import { SectionHeading } from "../SectionHeading/SectionHeading";

const resumeModifiedDate = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeZone: "Europe/Helsinki",
}).format(new Date(__RESUME_MODIFIED_AT__));

export function ResumeSection() {
  return (
    <section
      className="resume section"
      id="resume"
      aria-labelledby="resume-title"
    >
      <SectionHeading
        id="resume-title"
        eyebrow="Resume"
        title="The full story, in one page."
      />
      <aside
        className="resume-public-note reveal"
        aria-label="Public resume privacy note"
      >
        <p>
          This is the public version of my résumé. I omit my personal email
          address and phone number for privacy.{" "}
          <br className="resume-public-note-break" />
          To get in touch, please{" "}
          <a href="#contact">visit the Contact section</a>.
        </p>
      </aside>
      <article className="resume-card reveal" aria-label="Resume preview card">
        <div className="resume-card-header">
          <p className="resume-card-subtitle">
            Public résumé · PDF · One page
            <small>
              (Last updated <time dateTime={__RESUME_MODIFIED_AT__}>{resumeModifiedDate}</time>)
            </small>
          </p>
          <a
            className="button resume-download"
            href="/Amir_Mohammad_Moradi_Resume.pdf"
            download
          >
            <Download size={17} strokeWidth={2.25} aria-hidden="true" />
            Download PDF
          </a>
        </div>
        <div
          className="resume-preview-scroll"
          tabIndex={0}
          aria-label="Scrollable resume preview"
        >
          <svg width="0" height="0" aria-hidden="true" className="resume-color-filter">
            {[false, true].map((dark) => (
              <filter key={String(dark)} id={dark ? "resume-accent-dark" : "resume-accent"} colorInterpolationFilters="sRGB">
                <feColorMatrix in="SourceGraphic" type="matrix" values={
                  dark
                    ? "0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  2 0 -2 0 0"
                    : "0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  -2 0 2 0 0"
                } result="accent-mask" />
                <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="text" />
                <feFlood floodColor="var(--secondary)" />
                <feComposite in2="accent-mask" operator="in" />
                <feComposite in2="text" operator="over" />
              </filter>
            ))}
          </svg>
          <img
            src="/resume-preview.png"
            loading="lazy"
            alt="Preview of Amir Mohammad Moradi's resume"
          />
        </div>
      </article>
    </section>
  );
}
