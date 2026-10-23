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
- A new file with new Tailwind classes may not show up until `npm run dev` is restarted (+ hard refresh): Tailwind only generates classes it has scanned. Say so whenever new files are added.
- Keep each file's existing line endings (some, e.g. `Projects.tsx`, are CRLF), so git diffs show only real changes.
- Before suggesting `git restore`, check what's uncommitted: a restore can wipe unrelated uncommitted work in the same file.
- Compare before vs after (same screen sizes) for layout changes, not just "it works": a change can be correct and still barely visible.
- Test the project cards with a bright fake screenshot until real Diraya screenshots exist (the real app is light/blue).
- Every claim about Diraya must match its code (C:\dev\Diraya, read-only: never change anything there).
- Keep sessions short: one task per chat. This file is the shared memory between chats, so record new decisions here.

## Structure (frontend/src)

```
src/
  data/                     all content (profile, navigation, projects, about, contact, footer)
    caseStudies/            each project's technical deep dive (types.ts + one file per project)
  components/               shared across the whole site
    layout/                 RootLayout (shared frame of every page), Navbar, MobileMenu, Footer, Background, Section
    project/                pieces used by both the project cards and the project page (tags, status badge)
    ui/                     icons, SectionHeading, TerminalLine, AccentCorner, FrameCorners and other small reusable pieces
  utils/                    small plain functions (no React), e.g. scrollToSection
  hooks/                    shared React hooks (scroll, active section, in-view, reduced motion, page title, back to projects, now)
  pages/
    ProjectPage/            /projects/:slug: the project panel (gallery, intro, features + problem),
                            then CaseStudy/ (the technical deep dive): shared pieces at its root
                            (CaseStudySection, GroupFrame, PointList, RuleCallout...), one folder
                            per section (architecture/, database/, authentication/, decisions/)
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
- TerminalLine: the site's signature for actions/status, one per section at most; `href="#id"` scrolls on the page, other links open a new tab. Hero line: "open to new roles".
- Hero tagline: "I build full-stack web applications with the MERN stack, and I learn whatever a problem needs beyond it. I make sure what I ship is reliable today and still easy to change a year from now."

- Projects: one reusable ProjectCard renders every entry in `data/projects.ts`. Wide, short cards (thumbnail left, text right): one column below lg, a 2×2 grid from lg up. Card shows name, status, 2-line summary, tech-stack pills (green-tinted fill; all of them when the card's text column is at least 20rem wide via a container query, otherwise 3 + "+N") and links; hover = green gradient border (CardGlow) + soft green glow (`--color-glow`), no movement; amber stays reserved for clickable things. Hover the thumbnail (desktop) = floating preview that cycles screenshots; click/tap = full viewer (<dialog>). Each card remembers its screenshot position. No filter chips (revisit at 6+ projects).
- Projects section ends with a terminal line that links to GitHub.
- Project click: "View project" opens a real page, `/projects/:slug`, in the same tab (not a modal, not a new tab). Its top is one framed panel (four subtle gold L-corners that fade into the border, like the hero photo bracket; the screenshot has the cards' glow ring always on): screenshot gallery left, intro right (name, tagline · role, status, summary, stack, demo + source code), then key features next to the problem. The X (and browser Back) returns to the exact card clicked; opened from a shared link, the X goes to `/#projects`. Navbar links are `/#section` router links so they work from every page.

- Technical deep dive: always on the page under the panel (never collapsed, never a modal or its own route). One framed box like the panel, with a sidebar of tabs and ONE section shown at a time (WAI-ARIA tabs: arrow keys / Home / End, roving tabindex; sticky column from lg, a swipeable row on phones). The open section is in the URL as `?section=<id>` (replace, never a new history entry, so Back still closes the project; refresh and shared links keep the section). Switching brings the box's top back into view; below lg (where the sidebar isn't in view) each section ends with a Previous / Next pager; from lg the sticky sidebar does that job, so no pager (first section: Next only; last: Previous only; an unbuilt neighbour shows muted with "Coming soon", never a dead click; focus moves into the new section). "Explore the technical details" only scrolls to the box (a button, not a #link). Unbuilt sections show as "soon" (aria-disabled, skipped by the arrow keys) and become tabs by themselves once their data exists. Every claim must be true: no Prisma, no features or security details that aren't built.
- Back / X on the project page: `history.state.idx > 0` means the visitor came from inside the site, so go back one step; otherwise (opened from a shared link) go to `/#projects`.
- Architecture section: summary, a 3-box diagram (Browser → Express API → PostgreSQL) with numbered steps that match a real request traced below, backend layers next to the rule "controllers don't know about the database, services don't know about HTTP", notes (app.ts/server.ts, /api/v1), frontend layers. Layout uses container queries (the sidebar shares the width).

- Database section: summary, schema diagram (9 core tables on a 4×3 grid, chosen so no lines cross; lines drawn by an SVG measured from the real table positions, in crow's-foot ER notation (bar = one, fork = many) with a plain-words legend under the diagram; the lines draw in once, parent → child level by level, when the diagram is first seen (none for reduced motion); hovering a table brightens its lines and fades unrelated tables (an extra only, nothing depends on it); shown whenever the diagram has 42rem of its own width (`@2xl`, i.e. from 1024px laptops beside the sidebar), slightly tighter until `@4xl`; below that the same tables are three short vertical chains (Structure, Attendance, Exams; `chains` in the data) with 1/N links, compact cards and chips for the parents the chain doesn't show), "Rules the database enforces" (framed, plain English + the constraint, + the "nothing summarized is stored" callout), design decisions, the real `saveSheet` query, framed like the rules (the section's two key blocks), with lettered margin notes (letters = "look here", outlined; numbers = steps, solid); a note can cover several lines (`lines`, first one carries the letter) and hovering a note or its line lights up all of them; notes sit beside the code from 53rem, code column sized to the code so it never scrolls sideways there; no modal or click-to-open (the proof must be visible without effort), safety. In this section amber means only: the central table, the query letters, the key idea.
- Sections are numbered 01, 02... from their place in the sidebar. Sidebar: Architecture, Database, Authentication, Key decisions, Challenges, What I'd do differently. Authentication gets its own section because it's a layer every request passes through, not one feature.
- Authentication section (built, every claim checked against Diraya's backend/src/modules/auth): four blocks, each in a BlockFrame (border + ONE amber top-left corner; the outer Technical details box keeps four corners). 1) "Four ways in, one session": Password, Google, Sign up + verify, Password reset as wide cards in a 2x2 grid from 36rem (4 in a row made them narrow and tall), stacked below; 3 steps with plain muted numbers + one bold key practice. Soft amber lines run from each card into a trunk down the middle gap, then into the one Session box (strongest amber: border + 4% amber wash; httpOnly cookie, 3 h idle / 12 h max / 7 days remember me, ended at logout or reset). Amber on the lines is allowed because they are the session's paths. 2) "If someone tries to…" threat → defense table (a real <table> from 42rem, stacked items below), technical names as chips. 3) Design decisions (3 columns). 4) The Google linking query (createOrLinkGoogleTeacher) with lettered notes; key story: linking to an unverified account wipes its password (blocks account pre-hijacking).
- Shared across sections: CodeShowcase (code + lettered notes + hover ranges), SqlLine, LetterBadge, PointList (`columns` 1 | 2 | 3), BlockFrame, GroupFrame.
- Known gap, for "What I'd do differently" unless fixed in Diraya: sign-up answers 409 EMAIL_TAKEN for a registered verified email, while login and reset hide whether an email exists.
- Content of the deep dive is checked against the Diraya codebase (C:\dev\Diraya). No claim that isn't in the code (no student interface yet). Payments now exist in Diraya (payments, payment_months, student_months; checked 23 Oct 2026), but the Database section's schema diagram doesn't show them yet.
- Key decisions section (built, checked against Diraya's payments + demo modules, migrations and tests): 4 decision records, each in a BlockFrame titled with the question. Inside: "The obvious way" (dashed, muted, option struck through, top-aligned so it stays small) beside "What I built" (solid, faint green wash, green checks), side by side from @2xl; then a <dl>: "The cost" + "In the code" (mono chips that open the real file on GitHub via `repoFileUrl` = `<repo>/blob/HEAD/<path>`; plain text when the project has no repo, never a dead link). Ends with a RuleCallout: "make the wrong outcome impossible, not just unlikely". Decisions: payments as a ledger (split, void never delete, status computed), request_id + row lock against double payments, tests on a real test database (not mocks), a fresh demo teacher per visit. No diagram or code block: the GitHub links are the proof. Chosen to not repeat any section's own "Design decisions".
- About section (built; text lives in `src/data/about.ts`): serif lead "Telecom engineer by degree, full-stack developer by choice." + story beside a calm photo in its own matted frame (Unsplash forest lake, sky cropped by zooming from the bottom; decorative, alt=""); "How I work" as a framed card (3 numbered principles with dividers), then three bordered cards (How I learn, Toolbox, Looking for) with no numbers: every block framed so each starts and ends visibly; the belief line as the closing quote; then a divider + `$ let's talk` terminal line to #contact (the same ending as Projects). No fact strip: every fact was already said elsewhere. Amber only on the eyebrow and the belief bar; no highlighted words. Toolbox lists only what can be defended in an interview ("Familiar" hidden while empty). No age, no second portrait, no skill bars, no religion on the page.
- Project cards: one project per row at every width, as a large rectangle (md+: screenshot 46% on the left, text vertically centered beside it; phones: screenshot on top). Text: name + status + number, full summary, `highlights` as a stacked mono list (the "why click" lines), all tags, then links under a divider. Hovering the screenshot cycles through the screenshots in place; click opens the full viewer. No floating hover preview any more (it existed because the thumbnail was too small). Screenshots sit in a dark browser-window frame on a green panel, so a light/blue app screenshot is contained instead of clashing (don't re-theme Diraya for the portfolio). Four gold corners frame each card, the same `FrameCorners` as the project panel and the Technical details box (2px arms that fade into the border); they fade out on hover when the green glow takes over. Links: "See details" (project page), "Live demo" written out (new tab, once it exists), GitHub icon. No card lift/slide animation: it repeats the hover glow and reveals nothing.
- Hero layout (lg+): text column + a photo column exactly as wide as the photo (no dead space between them); photo up to 360px (lg) / 420px (xl), sized from the screen height so it always fits; tagline widens to max-w-2xl at xl. Decided: the big photo wins over the "My projects" peek on short laptops (the peek only shows on tall screens). Terminal line 32px under the buttons. Kept on purpose: the full tagline (the deep dive proves it), the photo frame, no status dot next to `$ open to new roles`.
- Contact section (built; text in `src/data/contact.ts`): "Let’s talk." answers About's `$ let's talk`. Email is the main action: one framed card with the amber corner (AccentCorner), the full address in mono, a solid amber "Write to me" (mailto) + a Copy button (status announced via role="status"), "I reply within a day", and Cairo's live local time with its offset computed by Intl (Egypt has DST, so never hard-code it). Beside it (lg) / under it: one row per other link (CV, LinkedIn, GitHub, WhatsApp via wa.me/20…), muted icons, no brand colors. A link with `href: null` is hidden, never shown dead. No photo, no section number, no contact form, no phone number shown (WhatsApp is text-only by intent). No closing terminal line: the footer ends the page.
- Footer (in RootLayout, so on every page): AE. + © year + name · "Built with React, TypeScript & Tailwind · Source on GitHub" (this repo) · "Back to top" button (scrolls, then focuses the navbar logo). No mountain, no quote, no second photo: About already has the photo and the quote.
- Resume: `profile.links.resume` is null until `public/resume.pdf` exists; while null, the navbar, mobile menu and Contact all hide their resume links.

## Before launch (placeholders that must not go public)

- "Live demo" on the project page is a do-nothing button until `links.demo` is set in `data/projects.ts`
- "Explore the technical details" scrolls to `#technical-details`, which doesn't exist until the deep dive is built
- `data/projects.ts`: Diraya repeated 4 times, placeholder screenshots, Diraya's problem text (check it's in Ahmed's words). The Diraya repo (github.com/ahmed-sami9/Diraya) must be public.
- `data/caseStudies/diraya.ts`: re-check against the Diraya code if Diraya changed since it was written
- Resume: add `public/resume.pdf`, then set `profile.links.resume` to "/resume.pdf" (all resume links appear by themselves)
- Name consistency: the site says Ahmed Elgaml; LinkedIn's shown name and custom URL should match
- Hosting: SPA rewrite (every URL serves `index.html`)
- About TODOs: full-size photo file, English level after the EF SET.
- Key decisions: every "In the code" link must open a pushed file on Diraya's default branch (repo public). Diraya's demo template (`demo.seed.ts` DEMO_SEEDERS) is still empty: fill it before launch, the demo decision promises sample data.
- Key decisions wording: Ahmed reads it aloud and rewords anything that doesn't sound like him (TODO in `diraya.ts`).

## Decisions still open

- Deep dive sections still to build: Challenges, What I'd do differently
- Database section: add the payments tables to the schema diagram (needs a new no-crossing layout), or say in a note that payments are covered in Key decisions
