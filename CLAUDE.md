# CLAUDE.md — In-Vehicle-UI

This file provides guidance for AI assistants (Claude Code and similar tools) working in this repository.

## Project Overview

**In-Vehicle-UI** is a user interface project targeting in-vehicle infotainment or dashboard systems. The project is in its initial stage — no framework, build tooling, or source code has been committed yet beyond this documentation.

> When the project grows, update this file to reflect the actual stack, conventions, and workflows that have been adopted.

---

## Repository State (as of 2026-03-14)

| Item | Status |
|------|--------|
| Source code | Not yet added |
| Package manager | Not configured |
| Build system | Not configured |
| Test framework | Not configured |
| Linting / formatting | Not configured |
| CI/CD | Not configured |

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` / `master` | Stable, production-ready code |
| `claude/<description>-<id>` | AI-assisted feature or documentation branches |

- All AI-assisted work must be committed to and pushed from branches prefixed with `claude/`.
- Never push directly to `main` or `master` without an explicit pull request.

### Git Push Convention

```bash
git push -u origin <branch-name>
```

- Branch names must start with `claude/` and end with the session ID suffix when working in an AI-assisted session.
- Retry up to 4 times with exponential backoff (2s → 4s → 8s → 16s) on network failures.

---

## Development Workflow (intended)

Once the project stack is decided, the typical workflow will be:

1. **Branch** — Create a feature branch from `main`.
2. **Develop** — Write code following the conventions in this file.
3. **Test** — Run the project's test suite before committing.
4. **Lint** — Run the linter and formatter; fix all errors before committing.
5. **Commit** — Use clear, descriptive commit messages (imperative mood, ≤72 chars on the first line).
6. **Push** — Push to the remote branch and open a pull request.

---

## Commit Message Convention

Use the imperative mood and keep the subject line concise:

```
Add navigation component for dashboard view
Fix speed gauge rendering on small screens
Refactor media player state management
```

- **No** periods at the end of the subject line.
- Separate subject from body with a blank line when a body is needed.
- Reference issue numbers when applicable: `Fix #42: ...`

---

## Codebase Conventions (to be adopted)

Because no implementation exists yet, conventions should be agreed upon and added here before the first feature is built. Common choices for in-vehicle UI projects:

### Likely Technology Directions

| Concern | Common Choices |
|---------|----------------|
| Framework | React, Vue, or a native/embedded UI toolkit |
| Language | TypeScript (strongly recommended) |
| Styling | CSS Modules, Tailwind, or styled-components |
| State management | Redux Toolkit, Zustand, or Pinia (if Vue) |
| Build tool | Vite or Webpack |
| Testing | Vitest + Testing Library, or Jest |
| Linting | ESLint + Prettier |

> Update this table once the stack is finalized.

---

## In-Vehicle UI Considerations

When implementing features, keep the following domain-specific constraints in mind:

- **Driver distraction** — Minimize text input requirements while the vehicle is in motion. Prefer large touch targets (≥44 × 44 px).
- **Readability** — High contrast, large fonts. Assume ambient lighting variations (bright sunlight to night).
- **Performance** — Smooth animations (60 fps target). Avoid layout jank on embedded hardware with limited GPU.
- **Safety-critical separation** — Never mix safety-critical displays (speed, warnings) with entertainment UI in the same render cycle if possible.
- **Responsiveness** — Support multiple screen sizes and orientations (portrait dashboard vs. landscape center console).
- **Accessibility** — Voice control and haptic feedback integration may be required.

---

## AI Assistant Guidelines

### Do

- Read existing files before modifying them.
- Follow the commit and branch conventions defined above.
- Prefer editing existing files over creating new ones.
- Keep changes minimal and focused on the task at hand.
- Run tests and linting after any code change (once configured).
- Update this CLAUDE.md when significant project decisions are made (new framework adopted, testing strategy chosen, etc.).

### Do Not

- Push to `main` or `master` directly.
- Introduce dependencies without documenting them here or in a relevant config file.
- Add comments that restate what the code obviously does.
- Add features or refactors beyond what was explicitly requested.
- Generate or guess external URLs unless they are clearly public documentation URLs.

---

## Adding This File's Sections Over Time

As the project matures, expand this file with:

- **Setup instructions** — How to clone, install dependencies, and run the dev server.
- **Project structure** — Directory layout and the role of each major folder.
- **Environment variables** — Required `.env` keys and where to get them.
- **Testing** — How to run unit, integration, and e2e tests.
- **Deployment** — How builds are produced and deployed to target hardware.
- **API / data sources** — CAN bus, OBD-II, REST APIs, or WebSocket feeds the UI consumes.
