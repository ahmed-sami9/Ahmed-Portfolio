import { contact } from "@/data/contact";
import ContactLinkCard from "./ContactLinkCard";

// The other ways in, one row each. A link without an href yet (the CV) is simply left out,
// so the page never shows a dead link.
// lg:auto-rows-fr: beside the email card, the rows share its height evenly.
function ContactLinks() {
  const ready = contact.links.filter((link) => link.href !== null);

  return (
    <ul aria-label="Other ways to reach me" className="grid gap-3 lg:auto-rows-fr">
      {ready.map((link) => (
        <li key={link.label}>
          <ContactLinkCard link={link} />
        </li>
      ))}
    </ul>
  );
}

export default ContactLinks;
