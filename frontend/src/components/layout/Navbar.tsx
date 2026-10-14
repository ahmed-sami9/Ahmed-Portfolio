import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";
import { DownloadIcon } from "@/components/ui/icons";

function Navbar() {
  return (
    <header className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a
        href="#home"
        aria-label={`${profile.name}, back to top`}
        className="font-display text-2xl tracking-tight text-text"
      >
        {profile.initials}
      </a>

      {/* Hidden on small screens for now; a mobile menu comes once all sections exist */}
      <nav aria-label="Main" className="hidden md:block">
        <ul className="flex items-center gap-8 text-sm text-muted">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-text">
                {link.label}
              </a>
            </li>
          ))}
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
    </header>
  );
}

export default Navbar;
