import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { statSync } from 'node:fs'

const resumeModifiedAt = statSync(
  './public/Amir_Mohammad_Moradi_Resume.pdf',
).mtime

export default defineConfig({
  base: '/',
  define: {
    __RESUME_MODIFIED_AT__: JSON.stringify(resumeModifiedAt.toISOString()),
  },
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
