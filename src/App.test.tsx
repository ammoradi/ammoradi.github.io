import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('portfolio', () => {
  it('presents the core professional story', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Engineering interfaces that stay clear under pressure/i })).toBeInTheDocument()
    expect(screen.getAllByText('Bluefors').length).toBeGreaterThan(0)
    expect(screen.getAllByText('AlphaSense').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Bookapo').length).toBeGreaterThan(0)
  })

  it('exposes only the approved social profiles in page links', () => {
    render(<App />)
    const hrefs = screen.getAllByRole('link').map((link) => link.getAttribute('href'))
    expect(hrefs).toContain('https://github.com/ammoradi')
    expect(hrefs).toContain('https://www.linkedin.com/in/ammoradi/')
    expect(hrefs.some((href) => href?.startsWith('mailto:'))).toBe(false)
    expect(document.body.textContent).not.toContain('+358')
  })

  it('offers the supplied resume as a download', () => {
    render(<App />)
    const resumeLinks = screen.getAllByRole('link', { name: /resume/i })
    expect(resumeLinks.length).toBeGreaterThanOrEqual(2)
    resumeLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', '/Amir_Mohammad_Moradi_Resume.pdf')
      expect(link).toHaveAttribute('download')
    })
  })

  it('provides semantic navigation and a keyboard skip target', () => {
    render(<App />)

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content')
    expect(document.querySelector('#main-content')).toBeInTheDocument()
  })
})
