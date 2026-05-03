# Calculadora de Horas Extras

A calculator for Brazilian overtime pay rates. Enter your gross monthly salary and instantly see your hourly rate across different overtime bands (50%, 75%, night shift, weekends, holidays, on-call, etc.).

## Features

- Real-time hourly rate calculation across configurable bands
- Add/remove bands directly from the grid
- Hours-to-pay calculator (select a band, enter hours worked, see the total)
- Persists salary and band configuration in localStorage
- Responsive design (mobile-first)

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Styling:** Tailwind CSS 4
- **Hosting:** Cloudflare Workers (static assets + Worker entry)
- **Testing:** Vitest + React Testing Library

## Architecture

```
src/
├── App.tsx                  # Root component, state management, localStorage persistence
├── main.tsx                 # React DOM entry point
├── worker.ts               # Cloudflare Worker entry (serves assets + /api/events)
├── config.ts               # Default bands and constants (HORAS_MENSAIS = 200)
├── types/index.ts           # TypeScript interfaces (Band, Config, CalculationResult)
├── utils/
│   ├── calculations.ts      # Core math: base hourly rate × multiplier per band
│   └── logger.ts            # Analytics event batching and flush to /api/events
└── components/
    ├── Header.tsx           # App title
    ├── SalaryInput.tsx      # Masked currency input (R$)
    ├── ResultsGrid.tsx      # Band cards grid + inline add-band form
    ├── BandCard.tsx         # Single band card with X-to-delete
    ├── HoursCalculator.tsx  # Hours × rate = total pay calculator
    └── Footer.tsx           # Footer
```

State lives in `App.tsx` and is persisted to `localStorage` on every change. The `ResultsGrid` handles band add/remove directly on the grid without a modal.

## Deployment

Hosted on Cloudflare Workers at:

```
https://horasextras.paulo-grabin.workers.dev
```

Deployed via:

```bash
npm run deploy
```

This runs `tsc -b && vite build && wrangler deploy`, which compiles TypeScript, builds static assets with Vite, and deploys the Worker + assets to Cloudflare.

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server (Vite, hot reload)
npm run dev

# Run tests
npm test

# Preview production build with Wrangler locally
npm run preview

# Lint
npm run lint
```

## Configuration

The default bands are defined in `src/config.ts`. Users can add/remove bands at runtime from the UI — changes persist in localStorage.
