# design.md — Sunflower Petals Design Reference

A detailed record of visual design decisions, layout patterns, and animation behavior for the Sunflower Petals marketing site.

---

## Brand Identity

**Sunflower Petals** is a sensory toy company for children. The visual language is warm, playful, and nature-inspired — leading with yellow as the primary brand color. Typography pairs a classic serif (Lora) for authority with a rounded sans-serif (Nunito Sans) for approachability.

---

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `brand-yellow` | `#FFCE04` | Primary brand: section backgrounds, CTAs, accents, hover states |
| `brand-orange` | `#F5A623` | Warm secondary accent (defined but used sparingly) |
| Background | `#F9F9F9` | Global page background |
| Foreground | `#171717` | Global default text |
| White | `#ffffff` | Hero section, clean contrast surfaces |
| Light Gray | `#f5f5f5` | Footer background, product card placeholder color |
| Black | `#000000` / `#171717` | Primary buttons, headings, borders |
| Green (decorative) | `#358240` | FAQ stem SVG stroke only |

**Tailwind token names** (defined in `globals.css` via `@theme inline`):
- `bg-brand-yellow`, `text-brand-yellow` → `#FFCE04`
- `font-heading` → Lora (serif)
- `font-body` / `font-sans` → Nunito Sans

---

## Typography

### Typefaces
| Role | Font | Source | CSS Token |
|---|---|---|---|
| Headings (h1, h2, h3) | Lora | Google Fonts | `font-heading` |
| Body / UI / Buttons | Nunito Sans | Google Fonts | `font-body` |

Font CSS variables are injected from `layout.tsx` into `<html>`: `--font-lora`, `--font-nunito`.

### Scale (Fluid with `clamp()`)
| Element | Size Expression |
|---|---|
| Hero h1 | `clamp(2.5rem, 8vw, 4.8rem)` |
| Section h2 | `clamp(2rem–2.5rem, 4–5vw, 3.5rem–4rem)` |
| Product card h3 | `clamp(1.8rem, 3vw, 2.5rem)` |
| Body text | `text-base` (16px) → `text-xl` (20px) on desktop |
| Labels / Eyebrows | `text-xs`–`text-sm`, uppercase, letter-spacing `[0.2em]`–`[0.25em]` |

### Font Weights
- **Lora**: 400 (body), 500, 600, 700 (headings). In practice, headings are unstyled weight (400) for an editorial feel.
- **Nunito Sans**: Regular for body; `font-bold` for buttons, labels, CTAs.
---

## Layout

### Global Horizontal Gutter
All sections use `px-[10%]` — a consistent 10% padding on both sides. This creates a unified content channel across all sections.

### Breakpoints
Standard Tailwind: `md:` = 768px, `lg:` = 1024px, `xl:` = 1280px.

### Z-Index Stacking (section layer order)
| Layer | Component | z-index |
|---|---|---|
| Top | Navbar | `z-[50]` |
| High | Hero | `z-[30]` |
| Mid | ProductShowcase | `z-[20]` |
| Low | FAQ | `z-[10]` |
| Base | Footer | default |

This layering creates the overlapping wave effect between sections.

---

## Section Design

### 1. Navbar
- **Position**: `absolute`, top-0 left-0, overlays the Hero section.
- **Background**: fully transparent (relies on Hero's white background showing through).
- **Contents**: Logo placeholder (text "Logo") on left; nav links on right (desktop only).
- **Nav links**: Home, About, Products, Contact. `hover:text-amber-500`.
- **Mobile**: Nav links hidden (`hidden md:flex`). No hamburger menu yet.

---

### 2. Hero
- **Background**: White (`bg-white`).
- **Layout**: Full-screen (`min-h-screen`). Mobile: stacked (text top, image bottom). Desktop: content left, graphic right.
- **Content Column** (left/top):
  - Headline: Lora, fluid size, line-height 1.1. Two-line: "Fun and Creative / Sensory Solutions".
  - Subtext: Nunito Sans, `text-neutral-600`, `text-base` mobile / `text-xl` desktop.
  - CTAs: Two pill buttons — "Shop Now" (filled black) + "Learn More" (outlined black). Full-width on mobile, auto-width on `sm:`.
- **Graphic Column** (right/bottom):
  - `/hero-graphic.svg` — the sunflower character. Floats with a continuous bobbing animation (see Animations).
  - Desktop: absolute positioned at `right-[10%]`, bottom of section.
  - Mobile: relative, `mt-auto`, `self-center`, 40vh height.
- **Wave at bottom**: Yellow SVG wave (`#f0b21c`) that transitions into the ProductShowcase. Height: `h-[20vh]` mobile / `h-[44vh]` desktop. `translate-y-[2px]` to eliminate sub-pixel gap.

---

### 3. ProductShowcase
- **Background**: `bg-brand-yellow` (`#f0b21c`).
- **Layout**: Two-column flex. Left 40%, right 60%. Stacks on mobile.
- **Left Column (sticky info panel)**:
  - Sticky at `md:top-[22vh]`.
  - Shows the **active category** — updates as user scrolls through products.
  - Eyebrow label: "Explore our products" in small uppercase, `text-black/60`.
  - Category number: zero-padded index (e.g., "01", "02"), `text-black/50`.
  - Category name: Lora, `clamp(2.2rem, 4vw, 3.5rem)`.
  - Category description: Nunito Sans, `text-black/80`, `text-xl`.
  - CTA button: "Explore more in this category" → links to `/categories/[id]`. Outlined style, rounded-full, hover fills black.
  - Category text transitions: `AnimatePresence` with slide-up/fade pattern on category change.
- **Right Column (scrolling product stack)**:
  - Each product card: full bleed rounded card (`rounded-[2.5rem]`), `aspect-square` mobile / `h-[50vh]` desktop.
  - Card background: colored `div` (`product.color`) + optional `<Image>` overlay.
  - Hover: card background scales `group-hover:scale-105`, description fades in from below (`opacity-0 translate-y-4` → `opacity-100 translate-y-0`).
  - Cards link to `/products/[id]` via full-bleed `<Link>` overlay.
- **Category switching**: Uses Framer Motion `onViewportEnter` with `viewport={{ margin: "-50% 0px -50% 0px" }}` — category switches when a product card crosses the vertical midpoint of the viewport.
- **Bottom Wave**: SVG wave flowing outward from the bottom, extending `translate-y-[99%]`. Color `#f0b21c`, height `h-[12vh]` mobile / `h-[20vh]` desktop.

---

### 4. FAQ
- **Background**: White.
- **Layout**: Centered column, `max-w-4xl mx-auto`.
- **Header**: Centered pill badge (`bg-yellow-100 text-brand-yellow` "Help & Support") + h2 "Common Questions". Same pill style as other sections.
- **Accordion Items**:
  - Separator: `border-b border-gray-200`.
  - Question: Lora, `text-xl md:text-3xl`. Hover changes text + icon to `brand-yellow`.
  - Toggle icon: custom cross/plus made of two `<span>` bars. Vertical bar rotates 90° when open (to merge into the horizontal, forming `—`).
  - Answer: Nunito Sans, `text-gray-600`, height animates `0 → auto` with `AnimatePresence`.
  - First item open by default (`openIndex` starts at `0`).
- **Decorative Stem Graphic** (desktop only):
  - Positioned absolute, right side, extending from `-top-44`.
  - SVG path drawn progressively using `pathLength` driven by `useScroll` → `useTransform`.
  - Stroke: `#358240` (muted green), `strokeWidth: 24`, rounded linecap.
  - Draws as the section scrolls into view (`offset: ["start 80%", "center center"]`).

---

### 5. Footer (with embedded CTA)
- **Background**: Light gray `#f5f5f5`.
- **CTA Card** (overlapping, `-mt-32 md:-mt-[10rem]`):
  - Brand yellow card (`bg-brand-yellow`) floats above the footer, creating a visual overlap with the section above (using `h-24 md:h-48` white spacer in `page.tsx`).
  - Card contains: headline "Let's grow together.", short subtext, "Let's Chat" button (black pill).
  - Right side: `/foot-graphic.svg` (character illustration), positioned to bleed off the right edge. Desktop only.
- **Footer body**:
  - Logo: small `/hero-graphic.svg` + "Sunflower Petals" in Lora.
  - Nav links: Products, FAQ, Contact. `text-gray-500 hover:text-brand-yellow`.
  - Social icons (Instagram, Pinterest, Facebook): `10×10` rounded squares, `bg-black/5`, `hover:bg-brand-yellow hover:text-white`.
  - Divider: `border-t border-black/10` separates logo row from links.
  - Bottom row: copyright + Privacy Policy / Terms of Service links in `text-gray-400`.

---

## Buttons

### Filled (Primary)
```
bg-black text-white px-8 py-3 rounded-full font-body font-bold
hover:bg-neutral-800 hover:scale-105 active:scale-95 transition-all
```

### Outlined (Secondary)
```
border-2 border-black text-black px-8 py-3 rounded-full font-body font-bold
hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all
```

### Outlined Subtle (Tertiary — used in ProductShowcase)
```
border-[1.5px] border-black/20 text-black px-8 py-3.5 rounded-full font-body font-bold text-sm
hover:border-black hover:bg-black hover:text-white hover:scale-[1.02] active:scale-[0.98]
```

All buttons use `rounded-full` pill shape. Scale transforms on hover/active are universal.

---

## Section Pill Badge / Eyebrow Label

Used above section headers to label the content area.

```jsx
<div className="inline-block px-4 py-1.5 rounded-full bg-yellow-100 text-brand-yellow font-body font-bold text-sm tracking-widest uppercase mb-6">
  Help & Support
</div>
```

Variants: `bg-yellow-100 text-brand-yellow` (FAQ) or `bg-emerald-100 text-[#00863d]` (older ProductShowcase version).

---

## Animation System

### Easing
| Name | Cubic Bezier | Used For |
|---|---|---|
| Spring-like | `[0.16, 1, 0.3, 1]` | Product cards, hero graphic, FAQ accordion |
| Standard ease-out | `"easeOut"` | Hero text fade-ins |
| Ease-in-out | `"easeInOut"` | ProductShowcase AnimatePresence transitions |

### Page Load (Hero)
Staggered fade+rise, using `animate` (not `whileInView`):
```
h1:      delay 0s,   duration 0.75s
p:       delay 0.1s, duration 0.75s
buttons: delay 0.2s, duration 0.75s
graphic: delay 0.3s, duration 1s,   ease [0.16,1,0.3,1]
```

### Hero Graphic Bob (Infinite loop)
```js
animate={{ y: [0, -10, 0] }}
transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
```

### Scroll-triggered (all other sections)
Standard pattern across all `whileInView` elements:
```js
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.6 }}
```
Stagger delay: `delay: index * 0.1` per list item.

### ProductShowcase Category Transition
```js
// On each product card
viewport={{ margin: "-50% 0px -50% 0px", amount: "some" }}
onViewportEnter={() => setActiveCategoryId(cat.id)}

// Category panel text
<AnimatePresence mode="wait">
  <motion.div
    key={activeCategory.id}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  />
</AnimatePresence>
```

### FAQ Stem Path Drawing
```js
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 80%", "center center"] });
const stemDraw = useTransform(scrollYProgress, [0, 1], [0, 1]);
// Applied to SVG path: style={{ pathLength: stemDraw }}
```

### FAQ Accordion Height
```js
initial={{ height: 0, opacity: 0 }}
animate={{ height: "auto", opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
```

---

## SVG Wave Transitions

### Hero → ProductShowcase (bottom of Hero)
```jsx
<svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[20vh] md:h-[44vh] block translate-y-[2px]">
  <path fill="#f0b21c" d="M 0,120 C 480,40 960,280 1440,240 L 1440,320 L 0,320 Z" />
</svg>
```

### ProductShowcase → FAQ (bottom of ProductShowcase)
```jsx
<svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[12vh] md:h-[20vh] block">
  <path fill="#f0b21c" d="M 0,160 C 480,0 960,320 1440,160 L 1440,0 L 0,0 Z" />
</svg>
```
Positioned `absolute bottom-0 translate-y-[99%]` extending below ProductShowcase.

### FAQ → Footer (overlap)
No SVG transition. Instead, a white spacer div (`h-24 md:h-48`) in `page.tsx` creates space for the CTA card to overlap out of the footer using negative margin (`-mt-32 md:-mt-[10rem]`).

---

## Product Data

Products are loaded from `src/data/products-data.json`.

### Data Shape
```ts
type Product = {
  id: string;
  name: string;
  description: string;
  color: string;      // hex background color for the card
  image?: string;     // path to /public/*.png, optional
};

type Category = {
  id: string;
  category: string;             // display name
  categoryDescription: string;  // shown in sticky panel
  products: Product[];
};
```

### Current Categories
| ID | Name |
|---|---|
| `sensory-regulation` | Sensory Regulation Tools |
| `organization-routine` | Organization and Routine Aids |
| `skill-building` | Skill-Building and Independence |

### Product Images (in `/public/`)
| File | Product |
|---|---|
| `hero-graphic.svg` | Sunflower character (used in Hero + Footer logo) |
| `foot-graphic.svg` | Footer CTA illustration |
| `clicky-clacky.png` | Clicky Clacky Keyring product |
| `dummy-calendar.png` | Daily Visual Calendar product |
| `dummy-puzzle.png` | Magic Numbers Set product |

---

## Routes (Placeholder — pages not yet built)

| Route | Linked From | Status |
|---|---|---|
| `/categories/[id]` | ProductShowcase sticky panel CTA | Not yet built |
| `/products/[id]` | Each product card | Not yet built |
| `#products` | Navbar, Footer nav | Scroll anchor |
| `#faq` | Footer nav | Scroll anchor |
| `#contact` | Navbar, Footer nav | Scroll anchor → Footer section |

---

## Responsive Behavior Summary

| Section | Mobile | Desktop |
|---|---|---|
| Navbar | Logo only, no links | Logo + nav links |
| Hero | Stacked (text → image) | Side-by-side |
| ProductShowcase | Stacked, no sticky behavior | Two-column sticky/scroll |
| FAQ stem graphic | Hidden | Visible, draws on scroll |
| Footer CTA | Card only, no foot graphic | Card + character illustration |

---

## Known Gaps / Incomplete Areas

- **Navbar mobile menu**: No hamburger or drawer implemented.
- **Navbar logo**: Placeholder text "Logo" — actual logo image not yet added.
- **CTA destinations**: "Shop Now", "Learn More", "Explore more in this category", "Let's Chat" buttons have no routes.
- **Product/Category pages**: Routes are linked but pages don't exist yet.
- **Inquiry form**: The old `Inquiry` component has been removed from `page.tsx`; the "Let's Chat" CTA has no form backing it.
- **Social links**: All href="#" placeholders.
