# CLAUDE.md — In-Vehicle-UI

This file provides guidance for AI assistants (Claude and others) working in this repository.

---

## Project Overview

**In-Vehicle-UI** is an automotive infotainment / instrument-cluster user-interface project. The goal is to build a responsive, touch- and hardware-knob-friendly dashboard UI intended to run on in-vehicle head units (e.g., Android Auto host, embedded Linux displays, or web-based HMI systems).

> **Status:** Project is in its initial setup phase. No application code exists yet. Decisions about the tech stack should align with the conventions described below.

---

## Recommended Tech Stack

| Concern | Technology |
|---|---|
| Language | TypeScript |
| UI Framework | React (with functional components and hooks) |
| Build Tool | Vite |
| Styling | Tailwind CSS (or CSS Modules for component-level isolation) |
| State Management | Zustand (preferred) or React Context for simple shared state |
| Routing | React Router v6 |
| Testing | Vitest + React Testing Library |
| Linting | ESLint (with `@typescript-eslint` and `eslint-plugin-react`) |
| Formatting | Prettier |
| Package Manager | npm |

These are the conventions to follow unless the project's `package.json` already establishes different choices.

---

## Repository Structure (Target Layout)

```
In-Vehicle-UI/
├── public/                  # Static assets (icons, fonts, splash screens)
├── src/
│   ├── assets/              # Images, SVGs, sounds
│   ├── components/          # Reusable UI components (Button, Knob, Gauge, etc.)
│   │   └── <ComponentName>/
│   │       ├── index.tsx
│   │       ├── <ComponentName>.tsx
│   │       ├── <ComponentName>.test.tsx
│   │       └── <ComponentName>.module.css   # only if CSS Modules are used
│   ├── features/            # Feature-sliced modules (Navigation, Media, Climate, etc.)
│   │   └── <FeatureName>/
│   │       ├── index.ts
│   │       ├── components/
│   │       ├── hooks/
│   │       └── store.ts
│   ├── hooks/               # Shared custom React hooks
│   ├── layouts/             # Page / screen layout wrappers
│   ├── pages/               # Top-level route pages / screens
│   ├── store/               # Global Zustand store slices
│   ├── types/               # Shared TypeScript type definitions
│   ├── utils/               # Pure utility functions (no React)
│   ├── App.tsx
│   ├── main.tsx             # Vite entry point
│   └── vite-env.d.ts
├── .env.example             # Document required environment variables here
├── index.html               # Vite HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── prettier.config.js
├── CLAUDE.md                # This file
└── README.md
```

---

## Development Workflow

### Setup

```bash
npm install
npm run dev        # Start Vite dev server (default: http://localhost:5173)
```

### Common Commands

```bash
npm run dev        # Development server with HMR
npm run build      # Production build (output: dist/)
npm run preview    # Preview production build locally
npm run test       # Run Vitest unit tests
npm run test:ui    # Vitest with browser UI
npm run lint       # ESLint check
npm run format     # Prettier write
npm run typecheck  # tsc --noEmit
```

### Before Committing

Always run all checks before committing:

```bash
npm run typecheck && npm run lint && npm run test
```

---

## Coding Conventions

### TypeScript

- **Strict mode** must be enabled (`"strict": true` in `tsconfig.json`).
- Prefer `interface` over `type` for object shapes; use `type` for unions, intersections, and aliases.
- Never use `any`. Use `unknown` with type guards when the type is genuinely unknown.
- Export types from `src/types/` when shared across features; co-locate types with their feature when local.

### React Components

- All components are **functional** with hooks. No class components.
- One component per file. File name matches the component name (PascalCase).
- Props interface defined in the same file, above the component:

```tsx
interface GaugeProps {
  value: number;
  max: number;
  label: string;
}

export function Gauge({ value, max, label }: GaugeProps) { ... }
```

- Use named exports (not default exports) for components, except for lazy-loaded page components.
- Avoid inline arrow functions in JSX for non-trivial handlers — extract to named functions inside the component.

### State Management

- Local UI state: `useState` / `useReducer`.
- Shared or cross-feature state: Zustand store slices in `src/store/`.
- Server/vehicle data streams: custom hooks in `src/hooks/` or feature `hooks/` that abstract the data source.
- Never mutate state directly; always create new objects/arrays.

### Styling

- Target a **dark-themed**, high-contrast interface suitable for in-vehicle displays (reduce eye strain, glare).
- Design for **touch targets ≥ 44×44 px** (automotive HMI guidelines).
- Support both portrait and landscape orientations via responsive CSS.
- Avoid animations that exceed 300 ms for critical interactions (latency sensitivity in a vehicle context).
- If using Tailwind, prefer Tailwind utility classes over custom CSS. Use `@apply` sparingly.

### File & Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Components | PascalCase | `SpeedGauge.tsx` |
| Hooks | camelCase, `use` prefix | `useVehicleSpeed.ts` |
| Utilities | camelCase | `formatSpeed.ts` |
| Store slices | camelCase, `Store` suffix | `mediaStore.ts` |
| Types/Interfaces | PascalCase | `VehicleState.ts` |
| CSS modules | camelCase | `speedGauge.module.css` |
| Test files | Same name + `.test.tsx` | `SpeedGauge.test.tsx` |

### Imports

Order imports as follows (enforced by ESLint `import/order` rule):

1. Node built-ins
2. External packages (react, zustand, etc.)
3. Internal aliases (`@/components/...`)
4. Relative imports (`./`, `../`)
5. Type-only imports (`import type ...`)

Blank line between each group.

---

## Testing Conventions

- All components in `src/components/` must have a corresponding `.test.tsx` file.
- Test user-visible behavior, not implementation details.
- Use `@testing-library/user-event` for simulating user interactions.
- Mock vehicle data sources at the hook level, not deep inside components.
- Aim for **≥ 80% line coverage** on `src/utils/` and `src/store/` (pure logic).

Example test structure:

```tsx
import { render, screen } from '@testing-library/react';
import { Gauge } from './Gauge';

describe('Gauge', () => {
  it('renders the label', () => {
    render(<Gauge value={50} max={100} label="Speed" />);
    expect(screen.getByText('Speed')).toBeInTheDocument();
  });
});
```

---

## Automotive / In-Vehicle UI Considerations

These constraints are important to keep in mind throughout development:

1. **Driver distraction**: Critical controls must be reachable in ≤ 2 taps/interactions from any screen.
2. **Glanceability**: Key information (speed, navigation, alerts) must be legible in < 1 second.
3. **Touch target sizing**: Minimum 44×44 px; prefer 60×60 px for primary actions.
4. **Night mode**: The UI must support a dark/dim mode to reduce cabin light at night.
5. **Error states**: Always show meaningful fallback UI when vehicle data is unavailable (no blank screens).
6. **Performance**: Target 60 fps animations; avoid layout thrashing and heavy synchronous computations on the main thread.
7. **No modal dialogs while driving**: Alerts should use non-blocking toast/banner patterns for non-critical messages.

---

## Environment Variables

Document all environment variables in `.env.example`. Never commit real secrets. Prefix variables with `VITE_` for Vite to expose them to the browser:

```
VITE_VEHICLE_API_URL=http://localhost:3001
VITE_MOCK_VEHICLE_DATA=true
```

---

## Git Conventions

- **Branch naming**: `feature/<short-description>`, `fix/<short-description>`, `chore/<short-description>`, or `claude/<task-id>` for AI-assisted branches.
- **Commit messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat: add speedometer gauge component`
  - `fix: correct RPM display overflow on small screens`
  - `chore: configure ESLint and Prettier`
  - `test: add unit tests for formatSpeed utility`
- Keep commits small and focused on a single concern.
- Never commit directly to `main` or `master`; use pull requests.

---

## AI Assistant Guidelines

When working in this repository, AI assistants should:

1. **Follow the conventions above** — do not introduce alternative patterns without updating this file.
2. **Read existing code before modifying** — understand the established style before making changes.
3. **Prefer editing over creating** — update existing files rather than creating redundant ones.
4. **Keep solutions minimal** — implement only what is asked; avoid premature abstractions.
5. **Run all checks** — always ensure `typecheck`, `lint`, and `test` pass before committing.
6. **Update this file** if new tooling, conventions, or architectural decisions are made.
7. **Automotive context awareness** — every UI decision should consider driver safety and usability in a moving vehicle.

---

## Related Documentation

- [README.md](./README.md) — project overview for humans
- Vite docs: https://vitejs.dev
- React docs: https://react.dev
- Zustand docs: https://zustand-bear.dev
- Vitest docs: https://vitest.dev
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
