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

  it('links to a scrollable resume preview with an explicit download', () => {
    render(<App />)

    expect(screen.getAllByRole('link', { name: /^resume/i })[0]).toHaveAttribute('href', '#resume')
    expect(screen.getByRole('img', { name: /Preview of Amir Mohammad Moradi's resume/i })).toBeInTheDocument()
    expect(screen.getByLabelText('Scrollable resume preview')).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('link', { name: /Download PDF/i })).toHaveAttribute(
      'href',
      '/Amir_Mohammad_Moradi_Resume.pdf',
    )
    expect(screen.getByRole('link', { name: /Download PDF/i })).toHaveAttribute('download')
  })

  it('shows the expanded Bookapo and AlphaSense metrics', () => {
    render(<App />)

    expect(screen.getAllByText('2k+').length).toBeGreaterThan(0)
    expect(screen.getAllByText('4k+').length).toBeGreaterThan(0)
    expect(screen.getAllByText('100k+').length).toBeGreaterThan(0)
    expect(screen.getAllByText(/legacy code modernized/i).length).toBeGreaterThan(0)
  })

  it('provides semantic navigation and a keyboard skip target', () => {
    render(<App />)

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content')
    expect(document.querySelector('#main-content')).toBeInTheDocument()
  })
})
