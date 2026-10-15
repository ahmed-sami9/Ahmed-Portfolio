import { DownloadIcon } from "@/components/ui/icons";
import { navLinks, sectionIds } from "@/data/navigation";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";

function Navbar() {
  const scrolled = useScrolled();
  const activeId = useActiveSection(sectionIds);

  return (
    // Full-width sticky bar: transparent over the hero, frosted glass + hairline once scrolled.
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/75 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          aria-label={`${profile.name}, back to top`}
          className="font-display text-2xl tracking-tight text-text"
        >
          {profile.initials}
        </a>

        {/* Hidden on small screens for now; a mobile menu comes once all sections are built */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {navLinks.map((link) => {
              const isActive = link.id === activeId;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
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
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={profile.links.resume}
          download
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          <DownloadIcon />
          Resume
        </a>
      </div>
    </header>
  );
}

export default Navbar;
