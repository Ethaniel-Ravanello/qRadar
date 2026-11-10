---
inclusion: fileMatch
fileMatch: "**/*.{tsx,jsx,vue,svelte,css,scss,html}"
---

# Frontend & Web Standards

## 1. Component Architecture
- Use functional components with strict TypeScript types for props and state.
- Keep components focused and single-purpose; extract complex UI logic into custom hooks.
- Separate data-fetching from presentation components.

## 2. Platform-First & Accessibility (a11y)
- Use semantic HTML tags (`<main>`, `<nav>`, `<section>`, `<article>`, `<button>`).
- Use native HTML primitives where available (`<dialog>`, `<popover>`) before third-party libraries.
- Ensure all interactive elements have accessible names (`aria-label`, visible text, or form labels).
- Ensure full keyboard accessibility (`Tab` focus order, `Enter`/`Space` activation, `Escape` dismiss).

## 3. Styling & Performance (CWV)
- Use standard CSS variables or utility classes (Tailwind); avoid hardcoded ad-hoc values.
- Minimize layout shifts (CLS): reserve explicit dimensions for images, banners, and dynamic widgets.
- Keep bundle size minimal: avoid importing entire monolithic libraries for single helper utilities.
