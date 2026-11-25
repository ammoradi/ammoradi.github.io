# Amir Mohammad Moradi’s portfolio

A personal portfolio showcasing frontend engineering work, technical skills, and an interactive résumé with a downloadable PDF. The site is a static React application written in TypeScript, built with Vite, and hosted on GitHub Pages. Tests use Vitest and React Testing Library.

[Visit the portfolio](https://ammoradi.github.io/)

## Run locally

Use Node.js **22.22.2 or later in the 22.x series** and npm. CI uses Node.js 22, and the locked jsdom dependency requires at least 22.22.2 on that release line.

From the repository root:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Test and build

| Command | What it does |
| --- | --- |
| `npm test` | Runs the test suite once. |
| `npm run test:watch` | Reruns tests as files change. |
| `npm test -- --coverage` | Runs the suite with coverage and writes the HTML report to `coverage/index.html`. |
| `npm run knip` | Checks for unused files, exports, and dependencies. |
| `npm run build` | Type-checks the project and writes the production site to `dist/`. |
| `npm run preview` | Serves the production build locally after `npm run build`. |

## Update portfolio content

| Content | Where to edit |
| --- | --- |
| Project case studies and gallery entries | [src/utils/impact-stories.ts](src/utils/impact-stories.ts). Put new screenshots in [public/](public/) and update their paths and alt text in the story data. |
| Technical and soft skills | [src/utils/skill-lanes.ts](src/utils/skill-lanes.ts) |
| Hero and contact information | [HeroIdentity.tsx](src/components/HeroIdentity/HeroIdentity.tsx) and [ContactSection.tsx](src/components/ContactSection/ContactSection.tsx) |
| Page title, description, and social sharing metadata | [index.html](index.html). The social preview image is [public/og.png](public/og.png). |

To update the résumé, replace [public/Amir_Mohammad_Moradi_Resume.pdf](public/Amir_Mohammad_Moradi_Resume.pdf) with the new one-page PDF under the same filename. Regenerate the image used by the résumé preview and interactive cylinder. This step requires Python 3 with `pypdfium2` and `Pillow` installed:

```sh
python3 scripts/render-resume-preview.py
```

Commit the PDF and the regenerated [public/resume-preview.png](public/resume-preview.png) together.

## Deploy

[CI](.github/workflows/ci.yml) runs Knip, tests with coverage, and the production build on pull requests targeting `master`. After a merge, the push to `master` triggers [CD](.github/workflows/deploy.yml). CD runs the tests and build, uploads `dist/` as a Pages artifact, and deploys it to GitHub Pages. To redeploy manually, run the **CD** workflow from the repository’s **Actions** tab and select `master`.
