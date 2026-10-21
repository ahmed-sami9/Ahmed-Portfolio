import { useEffect } from "react";
import { Link } from "react-router";
import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/ui/icons";
import { navLinks } from "@/data/navigation";
import { profile } from "@/data/profile";

type MobileMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeId: string;
};

// Small screens only: the hamburger button plus the panel it opens.
// The panel covers the page below the navbar and closes on: link tap, Escape,
// tapping the empty area, or the screen growing to desktop width.
function MobileMenu({ open, onOpenChange, activeId }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const close = () => onOpenChange(false);
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && close();
    const desktop = window.matchMedia("(min-width: 768px)"); // Tailwind's md breakpoint
    const onBreakpoint = (e: MediaQueryListEvent) => e.matches && close();

    // Stop the page behind the panel from scrolling while the menu is open
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, onOpenChange]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="-mr-2 p-2 text-text"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/*
        Always rendered so it can fade both ways. When closed it's invisible, ignores taps,
        and `inert` removes its links from keyboard focus and screen readers.
        Tapping the panel's empty area closes it; taps on links close it too (they navigate first).
      */}
      <div
        id="mobile-menu"
        inert={!open}
        onClick={() => onOpenChange(false)}
        className={`fixed inset-x-0 top-20 bottom-0 bg-bg/95 backdrop-blur-md transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <nav aria-label="Main" className="px-4 pt-6 sm:px-6">
          <ul className="border-t border-line">
            {navLinks.map((link, index) => {
              const isActive = link.id === activeId;
              return (
                <li key={link.id} className="border-b border-line">
                  <Link
                    to={`/#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="font-mono text-xs text-subtle">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-3xl tracking-tight ${
                        isActive ? "text-accent" : "text-text"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {profile.links.resume && (
            <a
              href={profile.links.resume}
              download
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted"
            >
              <DownloadIcon />
              Download resume
            </a>
          )}
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
