import type { Technology } from "../../utils/portfolio-types";

export function TechnologySet({
  technologies,
  duplicate = false,
}: {
  technologies: Technology[];
  duplicate?: boolean;
}) {
  return (
    <div className="technology-set" aria-hidden={duplicate || undefined}>
      {technologies.map(({ name, icon: Icon }) => (
        <div className="technology" key={name}>
          <Icon aria-hidden="true" />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}
