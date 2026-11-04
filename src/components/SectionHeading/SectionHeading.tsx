import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, id, children }: SectionHeadingProps) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {children}
    </div>
  );
}
