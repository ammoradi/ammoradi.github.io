import { readFileSync } from 'node:fs'
import { formatCoverageTable } from './format-coverage-table.js'

const { total } = JSON.parse(readFileSync('coverage/coverage-summary.json', 'utf8'))
console.log(`## Vitest coverage\n\n${formatCoverageTable(total)}`)
