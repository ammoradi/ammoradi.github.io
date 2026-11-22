export function formatCoverageTable(total) {
  const rows = ['lines', 'branches', 'functions', 'statements'].map(metric => {
    const { covered, total: count, pct } = total[metric]
    if (![covered, count, pct].every(Number.isFinite)) throw Error('Invalid coverage totals')
    return `| ${metric} | ${covered} | ${count} | ${pct}% |`
  })

  return ['| Metric | Covered | Total | Coverage |', '| --- | ---: | ---: | ---: |', ...rows].join('\n')
}
