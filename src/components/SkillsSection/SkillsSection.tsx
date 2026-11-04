import type { CSSProperties } from "react";
import { skillLanes, softSkills } from "../../utils/skill-lanes";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import { TechnologySet } from "../TechnologySet/TechnologySet";

export function SkillsSection() {
  return (
    <section
      className="skills section"
      id="skills"
      aria-labelledby="skills-title"
    >
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="skill-icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--secondary)" />
            <stop offset="100%" stopColor="var(--gold)" />
          </linearGradient>
        </defs>
      </svg>
      <SectionHeading
        id="skills-title"
        eyebrow="Technical toolkit"
        title="The tools & skills behind the outcomes."
      >
        <p className="skills-inspiration">
          By the way, the curves are inspired by the <a href="https://en.wikipedia.org/wiki/Sasanian_architecture" target="_blank" rel="noreferrer">Sasanian arch</a>.
        </p>
      </SectionHeading>
      <div className="skills-layout">
        <div className="skill-lanes">
          {skillLanes.map((lane) => (
            <article className="skill-lane reveal" key={lane.title}>
              <div className="skill-lane-heading">
                <h3>{lane.title}</h3>
              </div>
              <div className="technology-window">
                <div
                  className="technology-track"
                  style={
                    { "--marquee-duration": lane.duration } as CSSProperties
                  }
                >
                  {[0, 1, 2, 3].map((copy) => (
                    <TechnologySet
                      key={copy}
                      technologies={lane.technologies}
                      duplicate={copy > 0}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside
          className="soft-skills reveal"
          aria-labelledby="soft-skills-title"
        >
          <p className="eyebrow">Soft skills</p>
          <h3 id="soft-skills-title">How I work.</h3>
          <ul>
            {softSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
