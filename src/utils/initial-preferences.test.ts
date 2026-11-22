import { expect, it } from 'vitest'
import { getInitialThemePreference } from './initial-preferences'

it('falls back to System when the saved theme preference is unrecognized', () => {
  window.localStorage.setItem('portfolio-theme', 'sepia')

  expect(getInitialThemePreference()).toBe('system')
})
