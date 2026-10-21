import { ArrowUpRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { ContactLink } from "@/data/contact";

const ICONS = {
  download: DownloadIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  whatsapp: WhatsAppIcon,
} as const;

// One way to reach me. The whole card is the link (a big, easy target on phones).
// Pages open in a new tab, so the portfolio stays open; the CV downloads in place.
// Icons stay muted: brand colors would be four loud colors fighting the amber email button.
function ContactLinkCard({ link }: { link: ContactLink }) {
  const Icon = ICONS[link.icon];
  const opensPage = !link.download;

  return (
    <a
      href={link.href ?? undefined}
      {...(link.download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
      className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-text/[0.015] p-4 transition-colors hover:border-glow/50 sm:px-5"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-muted transition-colors group-hover:text-text">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-text">{link.label}</span>
        <span className="block truncate text-sm text-subtle">{link.detail}</span>
      </span>
      {opensPage && (
        <>
          <ArrowUpRightIcon className="size-4 shrink-0 text-subtle transition-colors group-hover:text-accent" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </a>
  );
}

export default ContactLinkCard;
