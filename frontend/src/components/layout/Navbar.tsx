import { useState } from "react";
import { Link, useMatch } from "react-router";
import { DownloadIcon } from "@/components/ui/icons";
import { navLinks, sectionIds } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const scrolled = useScrolled();
  const sectionInView = useActiveSection(sectionIds);
  // On a project page there are no sections to track: "Projects" is where you are.
  const onProjectPage = useMatch("/projects/:slug") !== null;
  const activeId = onProjectPage ? "projects" : sectionInView;
  const [menuOpen, setMenuOpen] = useState(false);

  // The bar needs its background when scrolled, and also when the mobile menu is open
  // (otherwise, at the very top of the page, the menu panel would sit under a see-through bar).
  const showBackground = scrolled || menuOpen;

  return (
    // Full-width sticky bar: transparent over the hero, frosted glass + hairline once scrolled.
    <header className="sticky top-0 z-50">
      {/*
        The frosted background lives on its own layer that only fades its opacity in and out.
        Why a separate layer: blur (backdrop-filter) can't be smoothly transitioned on its own,
        it would snap on in one frame. Fading the whole layer's opacity makes the color, the blur
        and the hairline appear together, smoothly. Opacity is also the cheapest thing a browser
        can animate.
      */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 border-b border-line bg-bg/75 backdrop-blur-md transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
          showBackground ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* md+: three columns (1fr auto 1fr), so the links stay centered whether or not the resume link is shown */}
      <div className="mx-auto flex h-20 w-full max-w-page items-center justify-between px-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] lg:px-8">
        {/*
          Links are router <Link>s to "/#section", not plain "#section" anchors, so they also work
          from a project page: there they go back to the portfolio, then scroll to the section.
          On the portfolio itself they just scroll (smoothly).
        */}
        <Link
          to="/#home"
          aria-label={`${profile.name}, back to top`}
          onClick={() => setMenuOpen(false)}
          className="justify-self-start font-display text-2xl tracking-tight text-text"
        >
          {profile.initials}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {navLinks.map((link) => {
              const isActive = link.id === activeId;
              return (
                <li key={link.id}>
                  <Link
                    to={`/#${link.id}`}
                    // Tells screen readers which section you're in, like the dot does visually
                    aria-current={isActive ? "location" : undefined}
                    className={`relative transition-colors hover:text-text ${
                      isActive ? "text-text" : "text-muted"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute -bottom-2.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop resume link (on mobile it lives inside the menu). Hidden until the file exists. */}
        {profile.links.resume && (
          <a
            href={profile.links.resume}
            download
            className="hidden items-center gap-2 justify-self-end text-sm text-muted transition-colors hover:text-text md:inline-flex"
          >
            <DownloadIcon />
            Resume
          </a>
        )}

        <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} activeId={activeId} />
      </div>
    </header>
  );
}

export default Navbar;
