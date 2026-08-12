import { Download } from 'lucide-react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'

type ImpactStory = {
  company: string
  kicker: string
  title: string
  description: string
  metrics: Array<{ value: string; label: string }>
}

type Experience = {
  period: string
  company: string
  role: string
  location: string
  summary: string
  technologies: string[]
}

const impactStories: ImpactStory[] = [
  {
    company: 'Bluefors',
    kicker: 'Leadership & reliability',
    title: 'Interfaces built to stay on.',
    description:
      'Leading frontend teams behind long-running scientific applications, while extending into product design, APIs, WebSocket systems, and code generation.',
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
    description:
      'Helped reshape legacy frontends into a micro-frontend architecture, built an internal UI library, and delivered alongside a large distributed engineering group.',
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
    description:
      'Guided the team building an e-book platform across web, Android, and iOS, improving the product while its audience grew dramatically.',
    metrics: [
      { value: '2k→200k', label: 'users scaled' },
      { value: '2k+', label: 'concurrent users' },
      { value: '−20%', label: 'mobile crash rate' },
      { value: '−80%', label: 'mobile memory use' },
    ],
  },
]

const experiences: Experience[] = [
  {
    period: 'Sep 2023 – Present',
    company: 'Bluefors',
    role: 'Lead Frontend Developer',
    location: 'Helsinki, Finland · Hybrid',
    summary:
      'Leading three frontend teams building resilient scientific interfaces, with work spanning architecture, automated testing, UI/UX, Java Spring Boot APIs, and WebSocket systems.',
    technologies: ['React', 'TypeScript', 'Playwright', 'Java', 'Figma', 'Clojure'],
  },
  {
    period: 'Jul 2023 – Sep 2023',
    company: 'Bluefors',
    role: 'Senior Frontend Developer',
    location: 'Helsinki, Finland · Hybrid',
    summary:
      'Joined the product engineering organization to develop high-reliability frontend systems for scientific hardware.',
    technologies: ['React', 'TypeScript', 'Redux', 'Material UI'],
  },
  {
    period: 'Jan 2022 – Jul 2023',
    company: 'AlphaSense',
    role: 'Software Engineer',
    location: 'Helsinki, Finland · Hybrid',
    summary:
      'Modernized legacy applications through micro-frontends, strengthened test coverage, created an internal UI library, and customized delivery through AWS CloudFront and Terraform.',
    technologies: ['React', 'TypeScript', 'Micro-frontends', 'GraphQL', 'AWS'],
  },
  {
    period: 'Dec 2020 – Dec 2021',
    company: 'TDD Solutions',
    role: 'Senior Frontend Developer',
    location: 'Tehran, Iran',
    summary:
      'Developed e-commerce and financial web applications, including a product with approximately 86% automated test coverage.',
    technologies: ['React', 'TypeScript', 'Redux', 'Socket.IO'],
  },
  {
    period: 'Jan 2020 – Dec 2020',
    company: 'JEE Group',
    role: 'Senior Frontend Developer',
    location: 'Tehran, Iran',
    summary:
      'Built mobile-first e-learning and healthcare PWAs with drag-and-drop and multimedia experiences serving more than 300,000 users.',
    technologies: ['React', 'TypeScript', 'JavaScript', 'PWA'],
  },
  {
    period: 'Oct 2019 – Jan 2020',
    company: 'Manavira',
    role: 'Senior Frontend Developer',
    location: 'Stockholm, Sweden · Remote',
    summary:
      'Built a B2B consultancy application with a complex client-side dashboard and 100% automated test coverage.',
    technologies: ['React', 'JavaScript', 'Redux', 'Jest'],
  },
  {
    period: 'Feb 2019 – Sep 2019',
    company: 'Bookapo',
    role: 'Chief Technology Officer',
    location: 'Tehran, Iran',
    summary:
      'Led development of an e-book and e-learning platform across web and mobile, supporting rapid user growth and major reliability improvements.',
    technologies: ['React Native', 'React', 'JavaScript', 'Firebase'],
  },
  {
    period: 'Oct 2017 – Feb 2019',
    company: 'Aduper',
    role: 'Frontend Developer',
    location: 'Tehran, Iran',
    summary:
      'Created B2B marketing software, a back-office admin experience, reusable data visualizations, and a React Native application.',
    technologies: ['React', 'TypeScript', 'Redux', 'React Native'],
  },
  {
    period: 'Jul 2017 – Oct 2017',
    company: 'Yara Information Technology',
    role: 'Frontend Developer · Part-time',
    location: 'Tehran, Iran',
    summary:
      'Maintained and developed a multilingual online game platform while collaborating across frontend, backend, design, and desktop teams.',
    technologies: ['AngularJS', 'HTML', 'CSS', 'Kanban'],
  },
  {
    period: 'Jul 2015 – Oct 2016',
    company: 'Rishe Co',
    role: 'Frontend Developer · Part-time',
    location: 'Tehran, Iran',
    summary:
      'Delivered restaurant ordering, online game, and e-commerce experiences for startup clients.',
    technologies: ['JavaScript', 'AngularJS', 'jQuery', 'HTML', 'CSS'],
  },
]

const skillGroups = [
  {
    title: 'Languages & frameworks',
    items: ['TypeScript', 'JavaScript', 'React', 'React Native', 'Redux', 'Node.js', 'Clojure'],
  },
  {
    title: 'Quality engineering',
    items: ['Playwright', 'Vitest', 'Jest', 'React Testing Library', 'E2E testing', 'SVG & Canvas'],
  },
  {
    title: 'Architecture & APIs',
    items: ['Micro-frontends', 'SSR', 'REST APIs', 'GraphQL', 'WebSocket'],
  },
  {
    title: 'Tooling & cloud',
    items: ['Vite', 'Webpack', 'Rollup', 'esbuild', 'Turborepo', 'AWS', 'Terraform', 'GitHub Actions'],
  },
  {
    title: 'Product & interface',
    items: ['Material UI', 'Tailwind CSS', 'Styled Components', 'SCSS', 'Responsive UI', 'Figma', 'Codex'],
  },
]

const navItems = [
  ['About', '#about'],
  ['Impact', '#impact'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
]

const careerMetrics = [
  { value: '11+', label: 'years building software' },
  { value: '3', label: 'frontend teams led' },
  { value: '200k', label: 'Bookapo users' },
  { value: '2k+', label: 'Bookapo concurrent users' },
  { value: '4k+', label: 'AlphaSense enterprise companies' },
  { value: '100k+', label: 'AlphaSense monthly visits' },
]

function Arrow({ direction = 'out' }: { direction?: 'out' | 'down' }) {
  return <span className="arrow" aria-hidden="true">{direction === 'out' ? '↗' : '↓'}</span>
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
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Amir Mohammad Moradi, home">AM</a>
        <nav aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <a className="header-resume" href="#resume">
          Resume <Arrow direction="down" />
        </a>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">Helsinki, Finland · 11+ years in software</p>
            <p className="hero-name">Amir Mohammad Moradi</p>
            <h1 id="hero-title">Engineering interfaces that stay clear under pressure.</h1>
            <p className="hero-intro">
              Frontend Tech Lead at Bluefors and AI Product Engineer. I build durable web and mobile products,
              guide engineering teams, and turn complex systems into calm experiences.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#impact">Explore my work <Arrow direction="down" /></a>
              <a className="button button-ghost" href="#resume">
                View resume <Arrow direction="down" />
              </a>
            </div>
            <div className="social-links" aria-label="Social profiles">
              <a href="https://github.com/ammoradi" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              <a href="https://www.linkedin.com/in/ammoradi/" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
            </div>
          </div>

          <div className="portrait-panel">
            <div className="portrait-number" aria-hidden="true">11+</div>
            <img src="/portrait.jpg" alt="Illustrated portrait of Amir Mohammad Moradi" />
            <div className="portrait-label" aria-hidden="true">
              <span>Frontend</span><span>Product</span><span>AI</span>
            </div>
          </div>

          <div className="hero-stats" aria-label="Career highlights">
            {careerMetrics.map((metric) => (
              <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
            ))}
          </div>
        </section>

        <section className="about section" id="about" aria-labelledby="about-title">
          <SectionHeading id="about-title" eyebrow="01 / About" title="A frontend specialist with a whole-product view." />
          <div className="about-grid reveal">
            <p className="about-lead">
              I work across the software lifecycle, from architecture and interface design to testing,
              performance, delivery, and mentoring.
            </p>
            <div className="about-copy">
              <p>
                My focus is large-scale web and mobile applications built with React and TypeScript. I help
                teams make sound technical decisions and ship software that remains scalable, maintainable,
                and dependable long after launch.
              </p>
              <p>
                AI is now an integral part of that practice. I use tools including Codex and Cursor to
                accelerate development, explore solutions, improve code quality, and raise productivity while
                keeping ownership and engineering judgment firmly human.
              </p>
              <p>
                Before working professionally, I taught programming to young students. I am still a lifelong
                learner. Away from the screen, I am a Setar player.
              </p>
            </div>
          </div>
        </section>

        <section className="impact section" id="impact" aria-labelledby="impact-title">
          <SectionHeading id="impact-title" eyebrow="02 / Selected impact" title="Work measured by what changed." />
          <div className="impact-list">
            {impactStories.map((story, index) => (
              <article className="impact-card reveal" key={story.company}>
                <div className="impact-index">0{index + 1}</div>
                <div className="impact-body">
                  <p className="impact-kicker">{story.company} · {story.kicker}</p>
                  <h3>{story.title}</h3>
                  <p>{story.description}</p>
                </div>
                <dl className="impact-metrics">
                  {story.metrics.map((metric) => (
                    <div key={metric.label}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="experience section" id="experience" aria-labelledby="experience-title">
          <SectionHeading id="experience-title" eyebrow="03 / Experience" title="A decade of building, leading, and learning." />
          <div className="timeline">
            {experiences.map((experience, index) => (
              <article className="timeline-item reveal" key={`${experience.company}-${experience.period}`}>
                <div className="timeline-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                <div className="timeline-meta"><p>{experience.period}</p><p>{experience.location}</p></div>
                <div className="timeline-content">
                  <p className="company">{experience.company}</p>
                  <h3>{experience.role}</h3>
                  <p>{experience.summary}</p>
                  <ul className="tag-list" aria-label={`${experience.company} technologies`}>
                    {experience.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section" id="skills" aria-labelledby="skills-title">
          <SectionHeading id="skills-title" eyebrow="04 / Toolkit" title="Deep frontend craft, broad delivery range." />
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-group reveal" key={group.title}>
                <p className="skill-number">0{index + 1}</p>
                <h3>{group.title}</h3>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="education section" aria-labelledby="education-title">
          <SectionHeading id="education-title" eyebrow="05 / Education" title="Built on engineering fundamentals." />
          <div className="education-list">
            <article className="education-item reveal">
              <p>2014 – 2019</p>
              <div><h3>Bachelor of Science · Computer Engineering</h3><p>Iran University of Science and Technology · Tehran, Iran</p></div>
            </article>
            <article className="education-item reveal">
              <p>2007 – 2014</p>
              <div><h3>Diploma · Mathematics Science</h3><p>National Organization for Development of Exceptional Talents · Tonekabon, Iran</p></div>
            </article>
          </div>
        </section>

        <section className="resume section" id="resume" aria-labelledby="resume-title">
          <SectionHeading id="resume-title" eyebrow="06 / Resume" title="The complete story, in one page." />
          <div className="resume-layout reveal">
            <div className="resume-copy">
              <p>
                Review the résumé here, or download the original PDF for a portable version of my experience,
                skills, and education.
              </p>
              <p className="resume-hint">The preview card scrolls independently.</p>
            </div>
            <article className="resume-card" aria-label="Resume preview card">
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
          </div>
        </section>

        <section className="closing section" aria-labelledby="closing-title">
          <p className="eyebrow">Open to the next hard problem</p>
          <h2 id="closing-title">Let’s make complex software feel inevitable.</h2>
          <p>Follow my work, explore the code, or get the full career story in one page.</p>
          <div className="closing-actions">
            <a className="button button-light" href="https://www.linkedin.com/in/ammoradi/" target="_blank" rel="noreferrer">
              <FaLinkedinIn size={17} aria-hidden="true" />
              Connect on LinkedIn <Arrow />
            </a>
            <a className="button button-outline-light" href="https://github.com/ammoradi" target="_blank" rel="noreferrer">
              <FaGithub size={18} aria-hidden="true" />
              View GitHub <Arrow />
            </a>
            <a className="text-link-light" href="#resume">
              Resume <Arrow direction="down" />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Amir Mohammad Moradi</p>
        <p>Designed to last. Built with React.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}

export default App
