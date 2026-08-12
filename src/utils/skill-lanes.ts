import { FaAws, FaCodeBranch, FaRobot } from "react-icons/fa6";
import {
  SiClojure,
  SiEsbuild,
  SiFigma,
  SiGithubactions,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiMui,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiRollupdotjs,
  SiSass,
  SiStyledcomponents,
  SiTailwindcss,
  SiTerraform,
  SiTestinglibrary,
  SiTurborepo,
  SiTypescript,
  SiVite,
  SiVitest,
  SiWebpack,
} from "react-icons/si";
import {
  TbBinaryTree,
  TbDevices,
  TbPlugConnected,
  TbServer,
  TbTestPipe,
  TbVector,
  TbWorldWww,
} from "react-icons/tb";
import type { SkillLane } from "./portfolio-types";

export const skillLanes: SkillLane[] = [
  {
    title: "Languages & frameworks",
    duration: "30s",
    technologies: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "React", icon: SiReact },
      { name: "React Native", icon: SiReact },
      { name: "Redux", icon: SiRedux },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Clojure", icon: SiClojure },
    ],
  },
  {
    title: "Quality engineering",
    duration: "27s",
    technologies: [
      { name: "Playwright", icon: TbTestPipe },
      { name: "Vitest", icon: SiVitest },
      { name: "Jest", icon: SiJest },
      { name: "Testing Library", icon: SiTestinglibrary },
      { name: "End-to-end", icon: FaCodeBranch },
      { name: "SVG & Canvas", icon: TbVector },
    ],
  },
  {
    title: "Architecture & APIs",
    duration: "24s",
    technologies: [
      { name: "Micro-frontends", icon: TbBinaryTree },
      { name: "SSR", icon: TbWorldWww },
      { name: "REST APIs", icon: TbServer },
      { name: "GraphQL", icon: SiGraphql },
      { name: "WebSocket", icon: TbPlugConnected },
    ],
  },
  {
    title: "Tooling & cloud",
    duration: "32s",
    technologies: [
      { name: "Vite", icon: SiVite },
      { name: "Webpack", icon: SiWebpack },
      { name: "Rollup", icon: SiRollupdotjs },
      { name: "esbuild", icon: SiEsbuild },
      { name: "Turborepo", icon: SiTurborepo },
      { name: "AWS", icon: FaAws },
      { name: "Terraform", icon: SiTerraform },
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Codex", icon: FaRobot },
    ],
  },
  {
    title: "Product & interface",
    duration: "29s",
    technologies: [
      { name: "Material UI", icon: SiMui },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Styled Components", icon: SiStyledcomponents },
      { name: "SCSS", icon: SiSass },
      { name: "Responsive UI", icon: TbDevices },
      { name: "Figma", icon: SiFigma },
    ],
  },
];

export const softSkills = [
  "Technical leadership",
  "Mentoring",
  "Product thinking",
  "Cross-functional communication",
  "Systems thinking",
  "Ownership",
];
