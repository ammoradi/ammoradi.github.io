import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'

describe('portfolio', () => {
  it('opens with a measurable impact carousel', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Interfaces built to stay on forever/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Show Bluefors impact/i })).not.toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('10k+')).toBeInTheDocument()
    expect(screen.getByText('2k+')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /View Bluefors control software/i })).toHaveAttribute(
      'href',
      'https://bluefors.com/products/dilution-refrigerator-measurement-systems/control-software/',
    )
    expect(screen.getAllByRole('img', { name: /Bluefors control software/i })).toHaveLength(3)
  })

  it('moves between impact stories as the page scrolls', () => {
    render(<App />)

    const hero = document.querySelector('.hero') as HTMLElement
    Object.defineProperty(hero, 'offsetHeight', {
      configurable: true,
      value: 3000,
    })
    Object.defineProperty(hero, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 1000,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 1000,
    })
    fireEvent.scroll(window)
    expect(screen.getByRole('heading', { name: /A decade of code, made micro-frontends/i })).toBeInTheDocument()
    expect(screen.getByText('4k+')).toBeInTheDocument()
    expect(screen.getByText('100k+')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Visit AlphaSense/i })).toHaveAttribute(
      'href',
      'https://www.alpha-sense.com/',
    )
    expect(screen.getAllByRole('img', { name: /AlphaSense/i })).toHaveLength(3)

    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 1900,
    })
    fireEvent.scroll(window)
    expect(screen.getByRole('heading', { name: /A platform scaled 100×/i })).toBeInTheDocument()
    expect(screen.getByText('2K → 200K+')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Visit Bookapo/i })).toHaveAttribute('href', 'https://bookapo.com/')
    expect(screen.getAllByRole('img', { name: /Bookapo/i })).toHaveLength(3)
  })

  it('provides section navigation alongside LinkedIn, GitHub, and resume', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Impact' })).toHaveAttribute('href', '#top')
    expect(screen.getByRole('link', { name: 'Tools & Skills' })).toHaveAttribute('href', '#skills')
    expect(screen.getAllByRole('link', { name: /^Resume/i })[0]).toHaveAttribute('href', '#resume')
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact')
    expect(screen.getByRole('link', { name: 'LinkedIn profile' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ammoradi/',
    )
    expect(screen.getByRole('link', { name: 'GitHub profile' })).toHaveAttribute('href', 'https://github.com/ammoradi')
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(document.querySelector('.header-resume')).not.toBeInTheDocument()
    expect(document.querySelector('.header-theme')).toBeInTheDocument()
  })

  it('supports a persistent light and dark theme preference', () => {
    window.localStorage.removeItem('portfolio-theme')
    render(<App />)

    const toggle = screen.getByRole('button', { name: 'Switch to dark theme' })
    fireEvent.click(toggle)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(window.localStorage.getItem('portfolio-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('uses the browser color-scheme preference when no theme is saved', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )

    render(<App />)
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument()
    vi.unstubAllGlobals()
  })

  it('uses ordinary stacked impact stories on mobile instead of the scroll-driven carousel', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: query === '(max-width: 740px)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )

    render(<App />)

    expect(document.querySelector('.hero')).toHaveClass('hero-mobile')
    expect(document.querySelector('.hero-impact')).not.toBeInTheDocument()
    expect(document.querySelectorAll('.mobile-impact-card')).toHaveLength(3)
    expect(screen.getByRole('heading', { name: /Interfaces built to stay on forever/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /A decade of code, made micro-frontends/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /A platform scaled/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Explore impact stories' })).not.toBeInTheDocument()
    expect(screen.queryByText('01 / 03')).not.toBeInTheDocument()
    expect(screen.getAllByText('Amir Mohammad Moradi').length).toBeGreaterThan(0)

    const menu = screen.getByRole('button', { name: 'Open navigation menu' })
    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn profile' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ammoradi/',
    )
    expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toBeInTheDocument()

    vi.unstubAllGlobals()
  })

  it('presents the toolkit as technology lanes without duplicated biography sections', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'The tools & skills behind the outcomes.' }),
    ).toBeInTheDocument()
    expect(screen.getAllByText('TypeScript').length).toBe(4)
    expect(screen.getAllByText('Playwright').length).toBeGreaterThan(0)
    expect(screen.getAllByText('GraphQL').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Figma').length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: 'How I work.' })).toBeInTheDocument()
    expect(screen.getByText('Technical leadership')).toBeInTheDocument()
    expect(screen.queryByText('01 / Toolkit')).not.toBeInTheDocument()
    expect(screen.queryByText(/A frontend specialist with a whole-product view/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/A decade of building, leading, and learning/i)).not.toBeInTheDocument()
  })

  it('keeps the portrait in the header and uses a downward scroll cue', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Explore impact stories' })).toBeInTheDocument()
    expect(document.querySelector('.hero-identity')?.textContent).toContain('Frontend Tech Lead · AI Product Engineer')
    expect(document.querySelector('.hero-identity')?.textContent).not.toContain('Amir Mohammad Moradi')
    expect(document.querySelector('.portrait-number')).not.toBeInTheDocument()
    expect(document.querySelector('.portrait-label')).not.toBeInTheDocument()
    expect(document.querySelector('.portrait-panel')).not.toBeInTheDocument()
    expect(document.querySelector('.brand-avatar img')).toHaveAttribute('src', '/portrait.jpg')
    expect(screen.queryByRole('button', { name: 'Next impact' })).not.toBeInTheDocument()
  })

  it('lets visitors pause and restart automatic screenshot rotation', () => {
    render(<App />)

    const pause = screen.getByRole('button', { name: 'Pause automatic screenshot rotation' })
    expect(pause).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(pause)
    const play = screen.getByRole('button', { name: 'Play automatic screenshot rotation' })
    expect(play).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(play)
    expect(screen.getByRole('button', { name: 'Pause automatic screenshot rotation' })).toBeInTheDocument()
  })

  it('advances the impact cue one chapter at a time before reaching tools and skills', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    render(<App />)

    const hero = document.querySelector('.hero') as HTMLElement
    Object.defineProperty(hero, 'offsetHeight', {
      configurable: true,
      value: 3000,
    })
    Object.defineProperty(hero, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 1000,
    })
    const skills = document.getElementById('skills') as HTMLElement
    const scrollIntoView = vi.fn()
    skills.scrollIntoView = scrollIntoView

    const cue = screen.getByRole('button', { name: 'Explore impact stories' })
    fireEvent.click(cue)
    const firstDestination = scrollTo.mock.calls.at(-1)?.[0] as ScrollToOptions
    expect(firstDestination.behavior).toBe('smooth')
    expect(firstDestination.top).toBeCloseTo(700, 1)
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 700 })
    fireEvent.scroll(window)
    expect(screen.getByRole('heading', { name: /A decade of code, made micro-frontends/i })).toBeInTheDocument()

    fireEvent.click(cue)
    const secondDestination = scrollTo.mock.calls.at(-1)?.[0] as ScrollToOptions
    expect(secondDestination.behavior).toBe('smooth')
    expect(secondDestination.top).toBeCloseTo(1366.67, 1)
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 1367 })
    fireEvent.scroll(window)
    expect(screen.getByRole('heading', { name: /A platform scaled/i })).toBeInTheDocument()

    fireEvent.click(cue)
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    scrollTo.mockRestore()
  })

  it('links to a scrollable resume preview with an explicit download', () => {
    render(<App />)

    expect(
      screen.getByRole('img', {
        name: /Preview of Amir Mohammad Moradi's resume/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Scrollable resume preview')).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('link', { name: /Download PDF/i })).toHaveAttribute(
      'href',
      '/Amir_Mohammad_Moradi_Resume.pdf',
    )
    expect(screen.getByRole('link', { name: /Download PDF/i })).toHaveAttribute('download')
    expect(screen.getByLabelText('Public resume privacy note')).toHaveTextContent(
      'I omit my personal email address and phone number for privacy',
    )
    expect(screen.getByRole('link', { name: /visit the Contact section/i })).toHaveAttribute('href', '#contact')
    expect(screen.queryByText('02 / Resume')).not.toBeInTheDocument()
  })

  it('offers LinkedIn as the public contact channel', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Let’s talk on LinkedIn.' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Message me on LinkedIn/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/ammoradi/',
    )
  })

  it('keeps keyboard navigation landmarks and the Codex credit', () => {
    render(<App />)

    expect(screen.queryByRole('heading', { name: 'Engineering fundamentals.' })).not.toBeInTheDocument()
    expect(screen.getByLabelText('Made with love by Codex')).toBeInTheDocument()
    expect(document.querySelector('.page-progress')).toBeInTheDocument()
    expect(document.querySelector('.impact-scroll-progress')).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content')
    expect(document.querySelector('#main-content')).toBeInTheDocument()
  })

  it('measures progress across the full document', () => {
    render(<App />)
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      configurable: true,
      value: 3000,
    })
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 1000,
    })
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      value: 1000,
    })

    fireEvent.scroll(window)
    expect(document.querySelector('.page-progress span')).toHaveStyle({
      transform: 'scaleX(0.5)',
    })
  })
})
