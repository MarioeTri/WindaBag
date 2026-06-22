# Mahogany Bag Co. — AGENTS.md

## Stack

- **Vanilla TypeScript + Vite 6** — no frameworks (React, Vue, etc.). DOM is built with `innerHTML` and `querySelector`. Entry: `index.html` → `src/main.ts` → `src/styles.css`.
- **CSS custom properties** (`:root` vars) for the brown/gold theme. No CSS preprocessor.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | `tsc && vite build` (typecheck + bundle to `dist/`) |
| `npm run preview` | Serve `dist/` locally |

No test, lint, or formatter config exists. No CI/CD.

## Conventions

- **Language:** Indonesian. Prices in IDR Rupiah (`Intl.NumberFormat("id-ID", { currency: "IDR" })` with 0 fraction digits).
- **Brand:** Mahogany Bag Co. — Instagram [`@_mahogany.co`](https://instagram.com/_mahogany.co/).
- **Fonts:** Cormorant Garamond (headings) + Manrope (body) via Google Fonts (preconnected in `index.html`).
- **Responsive breakpoints:** 1040px (tablet) and 640px (mobile). Hero/story go single-column, nav hides at 640px.
- **Animations:** `IntersectionObserver` on `.reveal` elements (threshold 0.15, offset -30px). Adding `.in` class triggers opacity + translateY transition.

## TypeScript

- `tsconfig.json` has `noEmit: true` (Vite handles bundling), `types: ["vite/client"]` for Vite-specific globals.
- **strict mode** enabled. No path aliases configured.
