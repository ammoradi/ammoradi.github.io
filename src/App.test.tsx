import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('portfolio', () => {
  it('opens with a measurable impact carousel', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /Interfaces built to stay on/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Show Bluefors impact/i })).not.toBeInTheDocument()
    expect(screen.getByText('80%')).toBeInTheDocument()
    expect(screen.getByText('100+')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /View Bluefors control software/i })).toHaveAttribute(
      'href',
      'https://bluefors.com/products/dilution-refrigerator-measurement-systems/control-software/',
    )
    expect(screen.getAllByRole('img', { name: /Bluefors control software/i })).toHaveLength(3)
  })

  it('moves between impact stories as the page scrolls', () => {
    render(<App />)

    const hero = document.querySelector('.hero') as HTMLElement
    Object.defineProperty(hero, 'offsetHeight', { configurable: true, value: 3000 })
    Object.defineProperty(hero, 'offsetTop', { configurable: true, value: 0 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 1000 })
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 1000 })
    fireEvent.scroll(window)
    expect(screen.getByRole('heading', { name: /A decade of code, made modular/i })).toBeInTheDocument()
    expect(screen.getByText('4k+')).toBeInTheDocument()
    expect(screen.getByText('100k+')).toBeInTheDocument()

    Object.defineProperty(window, 'scrollY', { configurable: true, value: 1900 })
    fireEvent.scroll(window)
    expect(screen.getByRole('heading', { name: /A platform scaled 100×/i })).toBeInTheDocument()
    expect(screen.getByText('2k → 200k')).toBeInTheDocument()
  })

  it('provides section navigation alongside LinkedIn, GitHub, and resume', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Impact' })).toHaveAttribute('href', '#top')
    expect(screen.getByRole('link', { name: 'Toolkit' })).toHaveAttribute('href', '#skills')
    expect(screen.getAllByRole('link', { name: /^Resume/i })[0]).toHaveAttribute('href', '#resume')
    expect(screen.getByRole('link', { name: 'LinkedIn profile' })).toHaveAttribute('href', 'https://www.linkedin.com/in/ammoradi/')
    expect(screen.getByRole('link', { name: 'GitHub profile' })).toHaveAttribute('href', 'https://github.com/ammoradi')
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
  })

  it('presents the toolkit as technology lanes without duplicated biography sections', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'The tools behind the outcomes.' })).toBeInTheDocument()
    expect(screen.getAllByText('TypeScript').length).toBe(4)
    expect(screen.getAllByText('Playwright').length).toBeGreaterThan(0)
    expect(screen.getAllByText('GraphQL').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Figma').length).toBeGreaterThan(0)
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

  it('links to a scrollable resume preview with an explicit download', () => {
    render(<App />)

    expect(screen.getByRole('img', { name: /Preview of Amir Mohammad Moradi's resume/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Scrollable resume preview')).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('link', { name: /Download PDF/i })).toHaveAttribute(
      'href',
      '/Amir_Mohammad_Moradi_Resume.pdf',
    )
    expect(screen.getByRole('link', { name: /Download PDF/i })).toHaveAttribute('download')
  })

  it('keeps keyboard navigation landmarks and the Codex credit', () => {
    render(<App />)

    expect(screen.queryByRole('heading', { name: 'Engineering fundamentals.' })).not.toBeInTheDocument()
    expect(screen.getByLabelText('Made with love by Codex')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content')
    expect(document.querySelector('#main-content')).toBeInTheDocument()
  })
})
