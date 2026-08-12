import { useEffect, useState, type CSSProperties } from 'react'
import { ChevronDown, Download, Heart } from 'lucide-react'
import { FaAws, FaCodeBranch, FaGithub, FaLinkedinIn, FaRobot } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
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
} from 'react-icons/si'
import {
  TbBinaryTree,
  TbDevices,
  TbPlugConnected,
  TbServer,
  TbTestPipe,
  TbVector,
  TbWorldWww,
} from 'react-icons/tb'

type ImpactStory = {
  company: string
  kicker: string
  title: string
  metrics: Array<{ value: string; label: string }>
}

type Technology = {
  name: string
  icon: IconType
}

type SkillLane = {
  title: string
  technologies: Technology[]
  duration: string
}

const impactStories: ImpactStory[] = [
  {
    company: 'Bluefors',
    kicker: 'Leadership & reliability',
    title: 'Interfaces built to stay on.',
    metrics: [
      { value: '3', label: 'frontend teams led' },
      { value: '80%', label: 'end-to-end test coverage' },
      { value: '100+', label: 'manual components removed' },
    ],
  },
  {
    company: 'AlphaSense',
    kicker: 'Architecture at scale',
    title: 'A decade of code, made modular.',
    metrics: [
      { value: '10+', label: 'years of legacy code modernized' },
      { value: '20+', label: 'frontend collaborators' },
      { value: '4k+', label: 'enterprise companies served' },
      { value: '100k+', label: 'visits per month' },
    ],
  },
  {
    company: 'Bookapo',
    kicker: 'Product & engineering',
    title: 'A platform scaled 100×.',
    metrics: [
      { value: '2k → 200k', label: 'users scaled' },
      { value: '2k+', label: 'concurrent users' },
      { value: '−20%', label: 'mobile crash rate' },
      { value: '−80%', label: 'mobile memory use' },
    ],
  },
]

const skillLanes: SkillLane[] = [
  {
    title: 'Languages & frameworks',
    duration: '30s',
    technologies: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'React', icon: SiReact },
      { name: 'React Native', icon: SiReact },
      { name: 'Redux', icon: SiRedux },
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Clojure', icon: SiClojure },
    ],
  },
  {
    title: 'Quality engineering',
    duration: '27s',
    technologies: [
      { name: 'Playwright', icon: TbTestPipe },
      { name: 'Vitest', icon: SiVitest },
      { name: 'Jest', icon: SiJest },
      { name: 'Testing Library', icon: SiTestinglibrary },
      { name: 'End-to-end', icon: FaCodeBranch },
      { name: 'SVG & Canvas', icon: TbVector },
    ],
  },
  {
    title: 'Architecture & APIs',
    duration: '24s',
    technologies: [
      { name: 'Micro-frontends', icon: TbBinaryTree },
      { name: 'SSR', icon: TbWorldWww },
      { name: 'REST APIs', icon: TbServer },
      { name: 'GraphQL', icon: SiGraphql },
      { name: 'WebSocket', icon: TbPlugConnected },
    ],
  },
  {
    title: 'Tooling & cloud',
    duration: '32s',
    technologies: [
      { name: 'Vite', icon: SiVite },
      { name: 'Webpack', icon: SiWebpack },
      { name: 'Rollup', icon: SiRollupdotjs },
      { name: 'esbuild', icon: SiEsbuild },
      { name: 'Turborepo', icon: SiTurborepo },
      { name: 'AWS', icon: FaAws },
      { name: 'Terraform', icon: SiTerraform },
      { name: 'GitHub Actions', icon: SiGithubactions },
    ],
  },
  {
    title: 'Product & interface',
    duration: '29s',
    technologies: [
      { name: 'Material UI', icon: SiMui },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Styled Components', icon: SiStyledcomponents },
      { name: 'SCSS', icon: SiSass },
      { name: 'Responsive UI', icon: TbDevices },
      { name: 'Figma', icon: SiFigma },
      { name: 'Codex', icon: FaRobot },
    ],
  },
]

function TechnologySet({ technologies, duplicate = false }: { technologies: Technology[]; duplicate?: boolean }) {
  return (
    <div className="technology-set" aria-hidden={duplicate || undefined}>
      {technologies.map(({ name, icon: Icon }) => (
        <div className="technology" key={name}>
          <Icon aria-hidden="true" />
          <span>{name}</span>
        </div>
      ))}
    </div>
  )
}

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div className="section-heading reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </div>
  )
}

function App() {
  const [carouselStep, setCarouselStep] = useState(0)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const activeImpact = ((carouselStep % impactStories.length) + impactStories.length) % impactStories.length
  const activeStory = impactStories[activeImpact]

  useEffect(() => {
    const prefersReducedMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (carouselPaused || prefersReducedMotion) return

    const timer = window.setInterval(() => setCarouselStep((step) => step + 1), 7000)
    return () => window.clearInterval(timer)
  }, [carouselPaused])

  const selectImpact = (index: number) => {
    setCarouselStep((step) => {
      const current = ((step % impactStories.length) + impactStories.length) % impactStories.length
      let distance = index - current
      if (distance > impactStories.length / 2) distance -= impactStories.length
      if (distance < -impactStories.length / 2) distance += impactStories.length
      return step + distance
    })
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Amir Mohammad Moradi, home">
          <span className="monogram" aria-hidden="true">AM</span>
          <span className="brand-name">Amir Mohammad Moradi</span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#top">Impact</a>
          <a href="#skills">Toolkit</a>
          <a href="#resume">Resume</a>
        </nav>
        <div className="header-links" aria-label="Professional profiles">
          <a className="header-icon" href="https://www.linkedin.com/in/ammoradi/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
            <FaLinkedinIn aria-hidden="true" />
          </a>
          <a className="header-icon" href="https://github.com/ammoradi" target="_blank" rel="noreferrer" aria-label="GitHub profile">
            <FaGithub aria-hidden="true" />
          </a>
          <a className="header-resume" href="#resume">Resume <span aria-hidden="true">↓</span></a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div
            className="hero-impact"
            aria-roledescription="carousel"
            aria-label="Selected impact"
            onPointerEnter={() => setCarouselPaused(true)}
            onPointerLeave={() => setCarouselPaused(false)}
            onFocusCapture={() => setCarouselPaused(true)}
            onBlurCapture={() => setCarouselPaused(false)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') setCarouselStep((step) => step - 1)
              if (event.key === 'ArrowRight') setCarouselStep((step) => step + 1)
            }}
          >
            <div className="hero-identity">
              <p className="eyebrow">
                Helsinki, Finland · 11+ years in software · Frontend Tech Lead · AI Product Engineer
              </p>
            </div>

            <div className="impact-stage">
              <div className="impact-selector" aria-label="Choose an impact story">
                {impactStories.map((story, index) => (
                  <button
                    type="button"
                    key={story.company}
                    aria-label={`Show ${story.company} impact`}
                    aria-current={activeImpact === index ? 'true' : undefined}
                    onClick={() => selectImpact(index)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {story.company}
                  </button>
                ))}
              </div>
              <article className="impact-focus-card" aria-live="polite">
                <div className="impact-card-topline">
                  <p>{activeStory.company}</p>
                  <span>{String(activeImpact + 1).padStart(2, '0')} / 03</span>
                </div>
                <p className="impact-kicker">{activeStory.kicker}</p>
                <h1 id="hero-title">{activeStory.title}</h1>
                <dl className="impact-metrics">
                  {activeStory.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.value}</dt>
                      <dd>{metric.label}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            </div>

          </div>

          <div className="portrait-panel">
            <img src="/portrait.jpg" alt="Illustrated portrait of Amir Mohammad Moradi" />
          </div>

          <a className="scroll-cue" href="#skills" aria-label="Scroll to toolkit">
            <span>Explore toolkit</span>
            <ChevronDown aria-hidden="true" />
          </a>
        </section>

        <section className="skills section" id="skills" aria-labelledby="skills-title">
          <SectionHeading id="skills-title" eyebrow="01 / Toolkit" title="The tools behind the outcomes." />
          <div className="skill-lanes">
            {skillLanes.map((lane, index) => (
              <article className="skill-lane reveal" key={lane.title}>
                <div className="skill-lane-heading">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{lane.title}</h3>
                </div>
                <div className="technology-window">
                  <div className="technology-track" style={{ '--marquee-duration': lane.duration } as CSSProperties}>
                    {[0, 1, 2, 3].map((copy) => (
                      <TechnologySet key={copy} technologies={lane.technologies} duplicate={copy > 0} />
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="resume section" id="resume" aria-labelledby="resume-title">
          <SectionHeading id="resume-title" eyebrow="02 / Resume" title="The full story, in one page." />
          <article className="resume-card reveal" aria-label="Resume preview card">
            <div className="resume-card-header">
              <div>
                <p className="eyebrow">Amir Mohammad Moradi</p>
                <p>Résumé · PDF · One page</p>
              </div>
              <a className="button button-dark resume-download" href="/Amir_Mohammad_Moradi_Resume.pdf" download>
                <Download size={17} strokeWidth={2.25} aria-hidden="true" />
                Download PDF
              </a>
            </div>
            <div className="resume-preview-scroll" tabIndex={0} aria-label="Scrollable resume preview">
              <img src="/resume-preview.png" alt="Preview of Amir Mohammad Moradi's resume" />
            </div>
          </article>
        </section>

      </main>

      <footer>
        <p>© {new Date().getFullYear()} Amir Mohammad Moradi</p>
        <p className="footer-made" aria-label="Made with love with Codex">
          Made with <Heart aria-hidden="true" /> with Codex
        </p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}

export default App
