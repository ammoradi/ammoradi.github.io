import { Download } from "lucide-react";
import { SectionHeading } from "../SectionHeading/SectionHeading";

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
          address and phone number for privacy. To get in touch, please{" "}
          <a href="#contact">visit the Contact section</a>.
        </p>
      </aside>
      <article className="resume-card reveal" aria-label="Resume preview card">
        <div className="resume-card-header">
          <div>
            <p className="eyebrow">Amir Mohammad Moradi</p>
            <p>Public résumé · PDF · One page</p>
          </div>
          <a
            className="button button-dark resume-download"
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
          <img
            src="/resume-preview.png"
            alt="Preview of Amir Mohammad Moradi's resume"
          />
        </div>
      </article>
    </section>
  );
}
