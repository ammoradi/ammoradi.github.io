import { ExternalLink } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa6";
import { SectionHeading } from "../SectionHeading/SectionHeading";

export function ContactSection() {
  return (
    <section
      className="contact section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <SectionHeading
        id="contact-title"
        eyebrow="Contact"
        title="Let’s talk on LinkedIn."
      />
      <div className="contact-action reveal">
        <p>Please visit my LinkedIn profile and send me a message there.</p>
        <a
          className="button contact-link"
          href="https://www.linkedin.com/in/ammoradi/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedinIn aria-hidden="true" />
          Message me on LinkedIn
          <ExternalLink size={16} strokeWidth={2.25} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
