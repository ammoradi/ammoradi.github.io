# Repository guidance

## Ticket workflow

- For each ticket, create a separate Git worktree and branch from the latest `origin/master` unless the user explicitly asks otherwise.
- When creating a pull request, change the ticket label from `ready-for-agent` to `ready-for-human`.

## Architecture

- Keep React components under `src/components`.
- Give every component its own PascalCase directory and PascalCase `.tsx` entry file.
- Colocate component tests in the same directory as `ComponentName.test.tsx`.
- Keep hooks under `src/hooks` and utilities or data under `src/utils`.
- Name every non-component source file in kebab-case.
- Keep `App` focused on composition. Page sections own their markup; hooks own browser state and effects; utility modules own static data and pure helpers.

## Styling

- Keep global reset, tokens, and shared primitives in `src/styles`.
- Keep component-specific CSS beside its component when adding or substantially changing styles.
- Reuse the existing custom properties and light/dark theme palette.
- Preserve responsive and reduced-motion behavior.

## Testing

- Test behavior through accessible roles, names, and user-visible text.
- Prefer component-level tests for isolated behavior and a small App integration suite for cross-section behavior.
- Run `npm test` and `npm run build` after structural changes.
- For UI changes, test the UI and attach screenshots to the pull request for all four combinations of light and dark themes and desktop and mobile viewports. Include video when needed.

## Naming

- React component files and their directories: `PascalCase`.
- Hooks, utilities, data, setup, and style files: `kebab-case`.
- Exported component names must match their file names.

## Commits

- Use Conventional Commits for commit messages: `type(scope): description` (scope optional), for example `feat: add contact form`.

## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the default triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

This repository uses a single-context layout. See `docs/agents/domain.md`.
