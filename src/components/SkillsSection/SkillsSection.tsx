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
      <SectionHeading
        id="skills-title"
        eyebrow="Technical toolkit"
        title="The tools & skills behind the outcomes."
      />
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
