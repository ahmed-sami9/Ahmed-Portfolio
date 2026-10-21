import { Link } from "react-router";
import { ArrowRightIcon, GitHubIcon } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import HeroPhoto from "./components/HeroPhoto";
import TerminalLine from "@/components/ui/TerminalLine";

// Phones (< md, 768px): one column, text -> buttons -> framed photo -> terminal line.
// Tablets and up (md+): two columns, text + terminal line on the left, photo on the right.
function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      // Phones: one column, left-aligned.
      // Tablets (md): two columns, as tall as the content.
      // Laptops/desktops (lg): text column + a photo column exactly as wide as the photo,
      //   so there's no dead space beside it pulling the two sides apart.
      //   min-h stops 11rem short of the screen bottom (5rem navbar + 11rem): on tall screens the top of
      //   "My projects" shows below the fold. On short laptops the photo is taller than that, and wins.
      //   lg:pt-14 lg:pb-8 keep the photo clear of the navbar when the content fills that height.
      className="mx-auto grid w-full max-w-page items-center gap-14 px-4 pt-10 pb-20 sm:px-6 sm:pt-16 md:grid-cols-[1.15fr_0.85fr] md:gap-12 md:pb-24 lg:min-h-[calc(100svh-16rem)] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20 lg:px-8 lg:pt-14 lg:pb-8"
    >
      {/* lg:pb-16 lifts only the text column: it's vertically centered in its grid cell,
          so extra bottom padding moves its content up by half that amount. The photo stays put. */}
      <div className="lg:pb-16">
        <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
          {profile.role}
        </p>

        <h1
          id="hero-title"
          className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-7xl"
        >
          {profile.name}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg xl:max-w-2xl">
          {profile.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            to="/#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-sm font-medium text-on-accent transition hover:brightness-105"
          >
            View my projects
            <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
          </Link>

          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>

        {/* Tablet/desktop position: close under the buttons, so it reads as part of the call to action */}
        <div className="mt-8 hidden md:block">
          <TerminalLine text={profile.terminalLine} />
        </div>
      </div>

      <HeroPhoto />

      {/* Phone position: last, after the photo. Rendered in two places instead of
          reordering the grid, so the desktop layout stays exactly as it is.
          display:none removes the hidden copy from screen readers too. */}
      <div className="md:hidden">
        <TerminalLine text={profile.terminalLine} />
      </div>
    </section>
  );
}

export default Hero;
