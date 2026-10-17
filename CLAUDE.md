# CLAUDE.md: ahmed-portfolio

Personal portfolio for Ahmed, a junior+ full-stack (MERN) developer applying for jobs.
Its job is to get him hired. It is a feeling and a shape, not a complex app.

## Stack

- Vite + React + TypeScript + Tailwind (v4, tokens in `@theme` in `src/index.css`)
- React Router (`react-router`): `/` = the portfolio, `/projects/:slug` = a project page. Routes live in `App.tsx`.
- Hosting needs a single-page-app rewrite (every URL serves `index.html`), or `/projects/...` 404s on refresh.
- Frontend only. No backend. No Next.js (no SEO need, the link is shared directly).

## Code quality

- Clean, readable, well-organized code is a hard requirement, even though there is little functionality.
- One component per file. Small components. Clear names.
- Content is data, presentation is components: all project content lives in `src/data/`, components only render it.
- No hard-coded colors or fonts in components. Use the design tokens.
- Responsive by default (mobile-first for layout), accessible by default (semantic HTML, focus states, keyboard access, `prefers-reduced-motion` respected).
- Explain the structure whenever code is written: what each file is for, how it connects to the others, and why it is designed that way.

## Workflow

- Write changes directly into the repo. No need to hand over files for manual copying.
- Before handing over, verify: it builds (`npm run build`), lints, has no horizontal scroll, and actually looks right at desktop and phone widths.
- Never commit. Ahmed reviews the diff and commits himself.
- Old files that need deleting get listed for Ahmed to remove.

## Structure (frontend/src)

```
src/
  data/                     all content (profile, navigation, projects)
  components/               shared across the whole site
    layout/                 RootLayout (shared frame of every page), Navbar, MobileMenu, Background, Section
    project/                pieces used by both the project cards and the project page (tags, status badge)
    ui/                     icons, SectionHeading, TerminalLine and other small reusable pieces
  hooks/                    shared React hooks (scroll, active section, in-view, reduced motion, page title, back to projects)
  pages/
    ProjectPage/            /projects/:slug: the project panel (gallery, intro, features + problem)
    NotFoundPage/           any unknown URL
    PortfolioPage/
      PortfolioPage.tsx     composes the sections in reading order
      components/
        Hero/
          Hero.tsx          the section itself
          components/       pieces used only by this section
        Projects/ ...       same pattern for every section
  index.css                 Tailwind import, design tokens, global base styles
```

- A component used by one section lives inside that section's `components/` folder.
  Once a second section needs it, it moves up to `src/components/`.
- Imports: `@/` means `src/` (alias in `vite.config.ts` + `tsconfig.app.json`).
  Use `@/...` for anything outside the current folder, `./...` for siblings.

## Layout

- Page width is one token, `--container-page` (80rem) in `index.css`, used as `max-w-page` by the navbar, the hero and `Section`. Never hard-code a page width; their left edges must always line up.

## Look and feel

- Professional first. He is a developer, not a designer. Do not overdo it.
- But it must not feel like the 100th identical portfolio. It needs its own touch.
- Following common patterns is fine when it is the genuinely good choice.
- One flat dark-green background, sand/amber accent used sparingly, serif for identity, sans for reading, mono for dev details.
- Everything must work passively. The visitor should never have to do extra work to get the important signal.
- Animation is welcome only if it reveals information. No animation for its own sake.

## Feedback (always on)

Give design feedback without being asked. Whenever something is seen, say so:
- layout and CSS: propose the best option, and make sure everything is responsive and works at every size
- animations: whether they help or get in the way, and where one would add value
- how projects are shown and interacted with (hover preview, intro, technical case study)
- wording: headlines, descriptions, button labels, microcopy
- things to add, remove or simplify
Be direct. Say when there is a better way. Do not just agree.

## Decided

- Display name: Ahmed Elgaml, monogram AE
- Hero terminal line: "open to remote roles"
- Hero tagline: "I build full-stack web applications with the MERN stack, and I learn whatever a problem needs beyond it. I make sure what I ship is reliable today and still easy to change a year from now."

- Projects: one reusable ProjectCard renders every entry in `data/projects.ts`. Wide, short cards (thumbnail left, text right): one column below lg, a 2×2 grid from lg up. Card shows name, status, 2-line summary, tech-stack pills (green-tinted fill; all of them when the card's text column is at least 20rem wide via a container query, otherwise 3 + "+N") and links; hover = green gradient border (CardGlow) + soft green glow (`--color-glow`), no movement; amber stays reserved for clickable things. Hover the thumbnail (desktop) = floating preview that cycles screenshots; click/tap = full viewer (<dialog>). Each card remembers its screenshot position. No filter chips (revisit at 6+ projects).
- Projects section ends with a terminal line that links to GitHub.
- Project click: "View project" opens a real page, `/projects/:slug`, in the same tab (not a modal, not a new tab). Its top is one framed panel (four subtle gold L-corners that fade into the border, like the hero photo bracket; the screenshot has the cards' glow ring always on): screenshot gallery left, intro right (name, tagline · role, status, summary, stack, demo + source code), then key features next to the problem. The X (and browser Back) returns to the exact card clicked; opened from a shared link, the X goes to `/#projects`. Navbar links are `/#section` router links so they work from every page.

## Before launch (placeholders that must not go public)

- "Live demo" on the project page is a do-nothing button until `links.demo` is set in `data/projects.ts`
- "Explore the technical details" scrolls to `#technical-details`, which doesn't exist until the deep dive is built
- `data/projects.ts`: Diraya repeated 4 times, placeholder screenshots, GitHub URL `your-username`, Diraya's problem text (check it's in Ahmed's words)
- `profile.ts`: real GitHub URL; `public/resume.pdf` must exist
- Hosting: SPA rewrite (every URL serves `index.html`)

## Decisions still open

- The project page's technical deep dive (architecture, database, auth, challenges, decisions), below the panel
- Whether the footer also gets a second photo of him, or keeps the mountain and quote
