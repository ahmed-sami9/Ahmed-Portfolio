import { ArrowUpRightIcon, FileCodeIcon } from "@/components/ui/icons";
import type { CodeRef } from "@/data/caseStudies/types";
import { repoFileUrl } from "@/data/projects";

type CodeRefLinksProps = {
  refs: CodeRef[];
  repoUrl?: string;
};

const CHIP =
  "inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-muted ring-1 ring-line ring-inset";

// The files a claim lives in, as small mono chips. With a repo they open the real file on
// GitHub in a new tab ("don't take my word for it"); without one they stay plain text,
// never a dead link. Muted, not amber: they're a side door, not the page's main action.
function CodeRefLinks({ refs, repoUrl }: CodeRefLinksProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {refs.map((ref) => (
        <li key={ref.path}>
          {repoUrl ? (
            <a
              href={repoFileUrl(repoUrl, ref.path)}
              target="_blank"
              rel="noopener noreferrer"
              title={ref.path}
              className={`${CHIP} transition-colors hover:text-text hover:ring-glow/40`}
            >
              <FileCodeIcon className="size-3.5" />
              {ref.label}
              <ArrowUpRightIcon className="size-3" />
              <span className="sr-only"> on GitHub (opens in a new tab)</span>
            </a>
          ) : (
            <code className={CHIP} title={ref.path}>
              <FileCodeIcon className="size-3.5" />
              {ref.label}
            </code>
          )}
        </li>
      ))}
    </ul>
  );
}

export default CodeRefLinks;
