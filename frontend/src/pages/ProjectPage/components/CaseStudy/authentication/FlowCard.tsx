import { KeyIcon, MailIcon, RotateIcon, UserIcon } from "@/components/ui/icons";
import TextWithCode from "@/components/ui/TextWithCode";
import type { AuthFlow } from "@/data/caseStudies/types";

type FlowCardProps = {
  flow: AuthFlow;
};

// The data names an icon; this maps the name to the component. Keeps the data file free of
// React imports (content is data, presentation is components).
const ICONS = { key: KeyIcon, user: UserIcon, mail: MailIcon, rotate: RotateIcon };

// One way of getting a session: three short steps, then the one practice that matters most,
// set apart at the bottom so it's what the eye lands on.
//
// The step numbers are deliberately plain (muted ring, no amber): there are twelve of them in
// the diagram, and amber here is kept for the one thing they all lead to, the session.
// h-full + flex-col + mt-auto on the footer: cards in a row share their height and their key
// practices line up, whatever the length of the steps.
function FlowCard({ flow }: FlowCardProps) {
  const Icon = ICONS[flow.icon];

  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-bg p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <Icon className="size-5 shrink-0 text-text/80" />
        <h5 className="font-display text-base text-text">{flow.title}</h5>
      </div>

      <ol className="mt-4 mb-4 space-y-2.5">
        {flow.steps.map((step, i) => (
          <li key={step} className="flex gap-3 text-[13px] leading-snug text-muted">
            <span
              aria-hidden
              className="grid size-5 shrink-0 place-items-center rounded-full font-mono text-[10px] text-subtle ring-1 ring-line"
            >
              {i + 1}
            </span>
            <span className="min-w-0">
              <TextWithCode text={step} />
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-auto border-t border-line pt-3 text-sm font-medium text-text">
        {flow.keyPractice}
      </p>
    </article>
  );
}

export default FlowCard;
