---
name: frontend-web-engineering
description: Modern web development runbook. Use when creating or refining web UI components, responsive layouts, styling with Tailwind/CSS, accessibility audits (WCAG/ARIA), and Core Web Vitals optimization.
license: MIT
compatibility: Kiro, Claude Code, Cursor, Antigravity
metadata:
  category: frontend-development
  complexity: intermediate
---

# Frontend Web Engineering

Best practices for modern web application development and responsive UI design.

## Core Directives

### 1. Platform-First Semantics
- Use semantic HTML tags (`<main>`, `<nav>`, `<aside>`, `<section>`, `<article>`, `<button>`).
- Use native HTML elements (`<dialog>`, `<popover>`, `<details>`) before pulling third-party packages.
- Always include `type="button"` on non-submit buttons to avoid accidental form submits.

### 2. Accessibility (a11y) & Usability
- Ensure clear accessible labels (`aria-label`, `<label for="...">`).
- Verify keyboard interaction: focus rings (`:focus-visible`), tab order, and dismissal with `Escape`.
- Ensure color contrast ratios satisfy WCAG AA (minimum 4.5:1 for normal text).

### 3. Core Web Vitals & Rendering
- **LCP (Largest Contentful Paint)**: Prioritize loading above-the-fold hero elements with explicit dimensions and `fetchpriority="high"`.
- **CLS (Cumulative Layout Shift)**: Always allocate aspect-ratio or explicit `width`/`height` on images, embeds, and dynamic slots.
- **INP (Interaction to Next Paint)**: Keep event handlers lightweight; defer heavy calculations off the main thread.

### 4. Component Structure
- Keep components small and focused.
- Co-locate styles, tests, and component logic.
- Avoid multi-nested state wrappers; derive values during render rather than syncing redundant states via `useEffect`.
