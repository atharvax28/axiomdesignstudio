# Axiom Design Studio

The marketing site for Axiom Design Studio — a Next.js build tuned for performance, with custom motion and an interactive map of the studio's operations across India.

🔗 **Live:** https://axiomdesignstudio.vercel.app

---

## Highlights

- **Next.js (App Router)** with `generateStaticParams` for statically-rendered project pages
- **Motion & feel** — [`motion`](https://motion.dev), [Lenis](https://lenis.darkroom.engineering/) smooth scroll, and [`rough-notation`](https://roughnotation.com/) annotations
- **Interactive India operations map** and a presence section, lazy-loaded via `IntersectionObserver`
- **Performance-first** — AVIF/WebP image pipeline, code-split below-the-fold sections, deferred font/animation init. Desktop Lighthouse **98 / 100 / 100 / 100**
- **Tailwind CSS** design system with `clsx` + `tailwind-merge`

## Tech stack

`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `motion` · `Lenis` · `lucide-react`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## License

© Atharva Tayade. All rights reserved.
