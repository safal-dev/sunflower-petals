# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sunflower Petals is a **Next.js 16.2.1 marketing website** for a sensory toy company. The site features a landing page with interactive animations, product showcase, FAQ, and inquiry form.

### Tech Stack
- **Framework**: Next.js 16.2.1 (App Router)
- **UI**: React 19 + TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 + PostCSS 4
- **Animations**: Framer Motion for scroll/hover effects
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Lora for headings, Nunito Sans for body)

### Important Note on Next.js 16
⚠️ See `AGENTS.md` — Next.js 16 has **breaking changes** from prior versions. Read docs in `node_modules/next/dist/docs/` before implementing features. Common differences from your training data:
- App Router conventions may differ
- API routes, middleware, config options may have changed
- Always check for deprecation notices in the docs

## Development Commands

```bash
# Start dev server (with hot reload)
npm run dev

# Build for production
npm build

# Run production build locally
npm start

# Lint code (ESLint with Next.js config)
npm run lint

# No test framework configured yet
```

**Dev server runs on**: `http://localhost:3000`

## Code Architecture & Patterns

### File Structure
```
src/
  ├── app/
  │   ├── layout.tsx      # Root layout (fonts, metadata, <html>/<body>)
  │   ├── page.tsx        # Home page (orchestrates all sections)
  │   └── globals.css     # Global Tailwind directives
  └── components/         # Reusable React components
```

### Key Architectural Patterns

**1. Page Composition** (`src/app/page.tsx`)
- The home page imports and composes section components in a specific order: Navbar → Hero → ProductShowcase → FAQ → Inquiry → Footer
- **Wave SVGs are embedded directly in page.tsx** as visual separators between sections
- Wave parameters (thickness, vertical position, height) are hardcoded constants at the top of page.tsx for easy adjustment

**2. Component Structure**
- Most components are **server components** (default in App Router)
- **Client components** use `"use client"` directive when they need interactivity (e.g., ProductShowcase uses Framer Motion)
- Components accept **no props** — data is either hardcoded (like PRODUCTS array in ProductShowcase) or derived from DOM state

**3. Styling**
- **Tailwind CSS** is the primary styling tool; custom CSS in globals.css is minimal
- **Font variables** are set in layout.tsx as CSS custom properties (`--font-lora`, `--font-nunito`) and applied via className
- Color scheme:
  - Primary green: `#00863d` (Inquiry section, accents)
  - Dark: `#060e06` (Footer)
  - Light: neutrals + branded colors (yellow `#f6c936`, blue `#002f5d`, orange `#df9836`)

**4. Animations** (Framer Motion)
- Used in ProductShowcase and likely other client components
- Common pattern: `initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}`
- Animations trigger on scroll using `whileInView` for viewport-based effects

### Path Alias
- Use `@/` to import from `src/`: `import Navbar from "@/components/Navbar"`

## Important Implementation Details

1. **Wave Transitions**: Page separators use SVG with Bezier curves. Parameters at top of page.tsx let you adjust wave thickness, vertical offset, and viewBox height.

2. **No Form Backend Yet**: Inquiry component exists but may not have backend validation/submission wired up yet. Check the component before working on form flows.

3. **Responsive Design**: Heavy use of `md:` and `lg:` breakpoints. Test on mobile (375px) and tablet (768px+) when making layout changes.

4. **Typography**: Font sizes use `clamp()` for fluid scaling (e.g., `text-[clamp(2rem,5vw,4rem)]`). Adjust carefully to avoid breaking responsive layouts.

5. **Link Navigation**: Links use hash anchors (e.g., `href="#products"`). No actual multi-page routing yet.

## TypeScript & Linting

- **TypeScript**: Strict mode enabled. Use proper types for component props and function returns.
- **ESLint**: Configured with Next.js web vitals and TypeScript rules. Run `npm run lint` before committing.
- **Type declarations**: Auto-generated in `.next/` (don't edit manually).

## When Modifying This Project

- **Adding components**: Place in `src/components/`, use `"use client"` only if interactivity is needed
- **Changing styles**: Use Tailwind classes first; add custom CSS to globals.css only if Tailwind can't express it
- **Updating fonts**: Modify the imports and variable names in `src/app/layout.tsx`
- **Adjusting animations**: Look for Framer Motion props in client components
- **Testing changes**: Rebuild (`npm run build`) occasionally to catch Next.js-specific issues early

## No Tests Currently
There is no test framework set up. If adding tests, consider Jest or Vitest with React Testing Library.
