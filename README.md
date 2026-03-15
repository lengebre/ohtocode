# Machine Learning Blocks

A high-level overview of what AI is, built to support study for the **AWS Certified AI Practitioner (AIF-C01)** certification. The app visualizes core concepts: AI hierarchy (AI → ML → deep learning → generative AI), data types and modalities, neural flow, tokenization, and model scaling and alignment.

## Project structure

The codebase is split by concern for clarity and maintainability:

```
src/
├── App.tsx                 # Root component and tab routing
├── types/
│   └── index.ts            # Shared TypeScript types
├── constants/              # Static data (layers, steps, presets, modalities)
│   ├── index.ts
│   ├── hierarchy.ts
│   ├── tokenPresets.ts
│   ├── steps.tsx
│   └── dataModalities.tsx
├── utils/
│   └── tokenizer.ts        # Pure tokenization logic
├── hooks/
│   ├── index.ts
│   ├── useTheme.ts
│   ├── useTrainingSimulation.ts
│   ├── usePulse.ts
│   └── useInferenceSimulation.ts
└── components/
    ├── Header.tsx
    ├── TabNav.tsx
    ├── Footer.tsx
    ├── GlobalStyles.tsx
    └── tabs/
        ├── index.ts
        ├── HierarchyTab.tsx
        ├── DataTypesTab.tsx
        ├── ClassicFlowTab.tsx
        ├── TokenizationTab.tsx
        └── FoundationalTab.tsx
```

- **Entry:** `main.tsx` mounts the app (Vite). `main.ts` re-exports `App` for environments that use it as the root module.
- **Constants** are in `src/constants`; JSX-bearing data lives in `.tsx` files.
- **Hooks** encapsulate theme, training simulation, pulse animation, and inference progress.
- **Tab panels** are in `src/components/tabs/`; layout pieces (header, nav, footer) live in `src/components/`.

## Requirements

- **Node.js** 20 LTS or newer (see [releases](https://nodejs.org/en/about/releases/)). Use `.nvmrc` with nvm: `nvm use`.
- CI and GitHub Actions use pinned stable versions (see workflow comments and `package.json` `engines`).

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (e.g. http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # optional: preview production build
```

## Test

```bash
npm run test        # run tests once
npm run test:watch  # run tests in watch mode
npm run audit       # check dependencies for known vulnerabilities
```

## Security (OWASP Top 10)

The app is aligned with [OWASP Top 10](https://owasp.org/Top10/) where applicable: production builds inject a strict Content-Security-Policy and other security meta tags, all user content is rendered safely (no `dangerouslySetInnerHTML`), and CI runs tests and dependency audit. See [SECURITY.md](SECURITY.md) for details.
