import { useState } from "react";
import { useMobileLayout } from "../../hooks/use-mobile-layout";
import { Cylinder, Download, FileText } from "lucide-react";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import { ResumeCylinder } from "../ResumeCylinder/ResumeCylinder";

const resumeModifiedDate = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "long",
  timeZone: "Europe/Helsinki",
}).format(new Date(__RESUME_MODIFIED_AT__));

export function ResumeSection() {
  const isMobile = useMobileLayout();
  const [selectedView, setView] = useState<"cylinder" | "pdf">();
  const view = selectedView ?? (isMobile ? "pdf" : "cylinder");
  return (
    <section
      className="resume section"
      id="resume"
      aria-labelledby="resume-title"
    >
      <SectionHeading
        id="resume-title"
        eyebrow="Resume"
        title="The story so far."
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
        <small className="resume-updated">Last updated <time dateTime={__RESUME_MODIFIED_AT__}>{resumeModifiedDate}</time></small>
      </aside>
      <article className="resume-card reveal" aria-label="Resume preview card">
        <div className="resume-toolbar">
        <div className="resume-tabs" role="tablist" aria-label="Résumé view">
          {(["cylinder", "pdf"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              id={`resume-tab-${tab}`}
              aria-controls={`resume-panel-${tab}`}
              aria-selected={view === tab}
              tabIndex={view === tab ? 0 : -1}
              onClick={() => setView(tab)}
              onKeyDown={(event) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                event.preventDefault();
                const next = event.key === "Home" ? "cylinder" : event.key === "End" ? "pdf" : tab === "cylinder" ? "pdf" : "cylinder";
                setView(next);
                document.getElementById(`resume-tab-${next}`)?.focus();
              }}
            >
              {tab === "cylinder" ? <Cylinder size={17} aria-hidden="true" /> : <FileText size={17} aria-hidden="true" />}
              <span className="resume-tab-label">
                <span>{tab === "cylinder" ? "Cyrus Cylinder" : "PDF preview"}</span>
                <span aria-hidden="true">{tab === "cylinder" ? "Cyrus Cylinder" : "PDF preview"}</span>
              </span>
            </button>
          ))}
        </div>
          <a
            className="button resume-download"
            href="/Amir_Mohammad_Moradi_Resume.pdf"
            download
          >
            <Download size={17} strokeWidth={2.25} aria-hidden="true" />
            Download PDF
          </a>
        </div>
          <svg width="0" height="0" aria-hidden="true" className="resume-color-filter">
            {["resume-accent", "resume-accent-dark", "resume-cylinder-light", "resume-cylinder-dark"].map((id) => (
              <filter key={id} id={id} colorInterpolationFilters="sRGB">
                <feColorMatrix in="SourceGraphic" type="matrix" values={
                  id.endsWith("-dark")
                    ? "0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  2 0 -2 0 0"
                    : "0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  -2 0 2 0 0"
                } result="accent-mask" />
                <feColorMatrix in="SourceGraphic" type="saturate" values="0" result="text" />
                <feFlood floodColor="var(--secondary)" />
                <feComposite in2="accent-mask" operator="in" />
                <feComposite in2="text" operator="over" result="page" />
                {id === "resume-cylinder-light" && (
                  <>
                    <feFlood floodColor="var(--button-bg)" result="page-background" />
                    <feBlend in="page" in2="page-background" mode="multiply" />
                    <feComposite in2="SourceGraphic" operator="in" />
                  </>
                )}
                {id === "resume-cylinder-dark" && (
                  <>
                    <feFlood floodColor="var(--button-bg)" result="page-background" />
                    <feBlend in="page" in2="page-background" mode="screen" />
                    <feComposite in2="SourceGraphic" operator="in" />
                  </>
                )}
              </filter>
            ))}
          </svg>
        <div className="resume-panels">
        <div role="tabpanel" id="resume-panel-cylinder" aria-labelledby="resume-tab-cylinder" hidden={view !== "cylinder"}>
          <ResumeCylinder />
        </div>
        <div role="tabpanel" id="resume-panel-pdf" aria-labelledby="resume-tab-pdf" hidden={view !== "pdf"}>
          <div className="cylinder-intro resume-pdf-intro">
            <span className="cylinder-edition">A résumé, on paper.</span>
            <p>The full story, in one page</p>
          </div>
        <div
          className="resume-preview-scroll"
          tabIndex={0}
          aria-label="Scrollable resume preview"
        >
          <img
            src="/resume-preview.png"
            loading="lazy"
            alt="Preview of Amir Mohammad Moradi's resume"
          />
        </div>
        </div>
        </div>
      </article>
    </section>
  );
}
