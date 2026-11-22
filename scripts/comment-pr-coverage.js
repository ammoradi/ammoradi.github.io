import { execFileSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { formatCoverageTable } from './format-coverage-table.js'

export default async function commentPrCoverage({ github, context, core }) {
  const repo = context.repo
  const run = context.payload.workflow_run
  const headSha = run?.head_sha ?? context.payload.pull_request.head.sha
  const runId = run?.id ?? context.runId
  const runNumber = run?.run_number ?? Number(process.env.GITHUB_RUN_NUMBER)
  const attempt = run?.run_attempt ?? Number(process.env.GITHUB_RUN_ATTEMPT)
  let number = context.payload.pull_request?.number

  if (run) {
    const { data: pulls } = await github.rest.pulls.list({
      ...repo, state: 'open', base: 'master',
      head: `${run.head_repository.owner.login}:${run.head_branch}`,
    })
    const matching = pulls.filter(pr =>
      pr.head.repo?.id === run.head_repository.id && pr.head.sha === headSha)
    if (matching.length !== 1) return
    number = matching[0].number
  }

  const repositoryUrl = `${context.serverUrl}/${repo.owner}/${repo.repo}`
  const runUrl = `${repositoryUrl}/actions/runs/${runId}`
  const { data } = await github.rest.actions.listWorkflowRunArtifacts({
    ...repo, run_id: runId, name: `vitest-coverage-${attempt}`,
  })
  const artifact = data.artifacts.find(item => !item.expired)
  let report = 'Coverage is unavailable for this run.'
  if (artifact && artifact.size_in_bytes <= 10 * 1024 * 1024) {
    // Read only the JSON entry from the untrusted archive. Render numeric totals only.
    try {
      const { data: archive } = await github.rest.actions.downloadArtifact({
        ...repo, artifact_id: artifact.id, archive_format: 'zip',
      })
      const zip = join(process.env.RUNNER_TEMP, 'portfolio-coverage.zip')
      writeFileSync(zip, Buffer.from(archive))
      const { total } = JSON.parse(execFileSync('unzip', ['-p', zip, 'coverage-summary.json'], {
        encoding: 'utf8', maxBuffer: 1024 * 1024,
      }))
      report = formatCoverageTable(total)
      report += `\n\n[Download the HTML report](${runUrl}/artifacts/${artifact.id})`
    } catch (error) {
      core.warning(`Could not read coverage totals: ${error.name}`)
    }
  }

  const { data: pr } = await github.rest.pulls.get({ ...repo, pull_number: number })
  if (pr.state !== 'open' || pr.head.sha !== headSha) return

  const thread = { ...repo, issue_number: number }
  const marker = '<!-- portfolio-coverage:'
  const comments = await github.paginate(github.rest.issues.listComments, { ...thread, per_page: 100 })
  const previous = comments.find(comment =>
    comment.user?.login === 'github-actions[bot]' && comment.body?.startsWith(marker))
  const version = previous?.body.match(/^<!-- portfolio-coverage:(\d+):(\d+) -->/)
  if (version && (Number(version[1]) > runNumber ||
      (Number(version[1]) === runNumber && Number(version[2]) > attempt))) return

  const body = `${marker}${runNumber}:${attempt} -->\n### Vitest coverage\n\n` +
    `Unit, component, and integration tests · [Run for \`${headSha.slice(0, 7)}\`](${runUrl})\n\n${report}`
  if (previous) {
    if (previous.body !== body) {
      await github.rest.issues.updateComment({ ...repo, comment_id: previous.id, body })
    }
  } else {
    await github.rest.issues.createComment({ ...thread, body })
  }
}
