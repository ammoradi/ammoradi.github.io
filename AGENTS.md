# Repository guidance

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

## Naming

- React component files and their directories: `PascalCase`.
- Hooks, utilities, data, setup, and style files: `kebab-case`.
- Exported component names must match their file names.
