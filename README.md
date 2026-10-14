# David Rizo — Portfolio

Personal site of David Rizo, physicist and machine learning engineer. Live at [davidrizo.dev](https://davidrizo.dev).

## Pages

| Route | Content |
| --- | --- |
| `/` | Introduction, both projects in brief, about and experience |
| `/projects/galaxy-classifier` | Case study: a 1D CNN, trained from scratch, that classifies SDSS galaxy spectra as AGN or starburst |
| `/projects/camp-lead` | Case study: an AI agent that registers summer-camp enquiries in CampMinder, live at French Woods Festival |

## Stack

React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router. Deployed on Vercel; `vercel.json` rewrites every path to `index.html` so project URLs load directly.

## Development

```bash
npm ci
npm run dev     # http://localhost:8080
npm run check   # lint + production build (what CI runs)
```

## Where things live

- `src/projects.ts` — the summaries shown on the home page
- `src/components/galaxy/data.ts` — every number on the Galaxy Classifier page, taken from the training notebook in [agn-starburst-galaxy-classifier](https://github.com/QuantumRizo/agn-starburst-galaxy-classifier)
- `public/projects/` — images for each project. Camp Lead dashboard captures use demo data, never real family records.
