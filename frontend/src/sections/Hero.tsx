import HeroAvatar from "../components/hero/HeroAvatar";
import HeroPhoto from "../components/hero/HeroPhoto";
import StatusLine from "../components/hero/StatusLine";
import { ArrowRightIcon, GitHubIcon } from "../components/ui/icons";
import { profile } from "../data/profile";

function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      // Mobile/tablet: as tall as its content. Desktop: fills the screen.
      className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 pt-10 pb-20 sm:px-6 sm:pt-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-12"
    >
      {/* lg:pb-16 lifts only the text column: it's vertically centered in its grid cell,
          so extra bottom padding moves its content up by half that amount. The photo stays put. */}
      <div className="lg:pb-16">
        {/* Small photo on mobile/tablet; the large portrait takes over on desktop */}
        <div className="mb-10 lg:hidden">
          <HeroAvatar />
        </div>

        <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
          {profile.role}
        </p>

        <h1
          id="hero-title"
          className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-7xl"
        >
          {profile.name}
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-sm font-medium text-on-accent transition hover:brightness-105"
          >
            View my projects
            <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-0.5" />
          </a>

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

        <div className="mt-12">
          <StatusLine text={profile.terminalLine} />
        </div>
      </div>

      <div className="hidden lg:block">
        <HeroPhoto />
      </div>
    </section>
  );
}

export default Hero;
