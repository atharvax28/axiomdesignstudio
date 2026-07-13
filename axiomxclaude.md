# axiomxclaude

Session record for the Axiom Design Studio site. Written 2026-07-13.

Deployed from: <https://github.com/atharvax28/axiomdesignstudio> → <https://axiomdesignstudio.vercel.app/>

---

## What this repo is

The Next.js 16 site for Axiom Design Studio, a Mumbai interior design and build
practice. It was exported out of a working folder (`axiomdemo1`) that also held
gigabytes of raw shoot material; only the app itself came across — `src/`,
`public/` (all 162 images and the hero film), and the config files.

**This folder is the source of truth.** `axiomdemo1` is now a stale copy.

There is a second GitHub repo, `axiomdesigns1`, holding the *initial import only*.
It is deliberately not kept up to date. Everything ships to `axiomdesignstudio`.

---

## The work done in this session

### Hero — was the whole performance problem
`main-16x9.jpg` was a **17MB, 6240×4160** JPEG served through a raw `<img>`, and
`main-9x16.jpg` was **byte-identical to it** — phones downloaded the same 17MB
file and got a centre-cropped landscape shot instead of the portrait crop the
code intended. Now real crops at 1280/1920/2560 and 750/1170, WebP with JPEG
fallback, preloaded per breakpoint. **17MB → ~137KB.**

### Images
No broken paths — all 134 referenced files exist, and exact-case checked (Vercel's
Linux would 404 on `.JPG` vs `.jpg`). Everything moved to `next/image` with
explicit `sizes`, so the 4:3 cards no longer pull multi-megabyte originals.
Gallery tiles are locked to 3:2 (CLS 0). The Unsplash stock photo behind the
"material palette" copy in `FullBleedBand` was replaced with the studio's own work.

### Scroll — two bugs
1. Going **Back** from a case study dumped the reader at the footer. Browser
   restoration ran against a page that had not laid out yet.
2. Lenis carried its scroll offset **across** navigations, so opening a project
   from mid-page dropped you partway into the case study instead of the top.

Both are handled in `src/components/providers/SmoothScroll.tsx`: position is
banked at click/popstate (never from a scroll listener — the router scrolls to 0
*before* the route commits, which would overwrite it), and the target is held for
~600ms while the route settles, released the moment the reader scrolls.

### Case study
Ends with a **Next Project** block (wraps last → first) instead of dead-ending at
the contact section. All 22 routes are prerendered (`generateStaticParams`) with
per-project metadata, rather than server-rendered per request.

### Video (`/about` hero)
Source is `MF- Hyderabad-Shortlisted/Mahindra.avi` (703MB, mpeg4 + mp3). The
deployed MP4 **had no audio stream at all**. Re-encoded 1600×900, H.264 + AAC,
`+faststart`, poster frame. **33MB silent → 18MB with sound** and a mute toggle
(autoplay is only permitted muted, so it starts muted by design). The legibility
scrims now lift in fullscreen.

### Fonts — a real bug
Headings are set `font-light` (300) in ~22 places, but Plus Jakarta Sans loaded
only weights **500/600/700** — the browser silently substituted 500, so the light
headings never rendered. Jakarta is a variable font now. Cormorant was loading six
files at weights nothing used; it ships one (400, roman + italic). The Material
Symbols stylesheet (render-blocking, loaded from inside `<body>`) is gone — those
icons are `lucide-react` now.

---

## Deliberately reverted at the client's request

These were fixed, then rolled back on request. Listed so nobody "fixes" them again
by accident:

| Reverted | Cost |
|---|---|
| `avatar.vercel.sh` placeholder avatars on About testimonials | 8 third-party requests; About mobile perf 75 → 64 |
| `--stone` back to `#94A3B8` | **2.05:1** on cream — fails WCAG AA for small text |
| `aria-label` back on the Navbar logo link | Accessible name does not contain the visible wordmark |
| `scroll-smooth` back on `<html>` | None measured; scroll restoration still passes |
| Hero text back to Framer Motion (from CSS) | Headline invisible until hydration; excluded from LCP |
| MorphingText back to `text-signal` | Transient 2.6:1 frame mid-crossfade |

Accessibility is **96** as a result, not 100. The two live issues are the `--stone`
contrast and the Navbar `aria-label`.

---

## Scores (production build, local)

| | Desktop | Mobile |
|---|---|---|
| Performance | 93–99 | 64–83 |
| Accessibility | 96 | 96 |
| Best practices | 100 | — |
| SEO | 100 | — |
| CLS | 0 | 0 |

---

## Notes for next time

- **Kill stray `next start` servers before measuring.** A stale server holding
  port 3000 serves the previous build's chunks (500s) and every measurement is a
  lie. This cost real time.
- **Lenis overrides `window.scrollTo`.** Scripted scrolling in a test does not
  reflect a real reader; drive the wheel instead.
- The hero source (6240×4160) is kept **outside** the repo, at
  `Downloads/axiom-hero-originals/`.
