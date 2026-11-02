// Everything the Contact section says. Components only render it.
import { profile } from "./profile";

export type ContactLink = {
  icon: "download" | "linkedin" | "github" | "whatsapp";
  label: string;
  detail: string;
  href: string | null; // null = not ready yet, and the card is hidden
  download?: boolean; // a file to save, not a page to open
};

export const contact: {
  eyebrow: string;
  title: string;
  intro: string;
  email: { address: string; subject: string; cta: string; note: string };
  timeZone: { id: string; city: string };
  links: ContactLink[];
} = {
  eyebrow: "Contact",
  // Answers the About section's closing "$ let's talk"
  title: "Let’s talk.",
  intro:
    "I’m looking for a full-stack role. If you’re hiring, or have a question about something I’ve built, I’d like to hear from you.",

  email: {
    address: "ahmedelgaml2927@gmail.com",
    // Pre-filled (and editable) in the visitor's email, so portfolio messages stand out in my inbox
    subject: "Hello from your portfolio",
    cta: "Write to me",
    note: "Email is the fastest way to reach me. I reply within a day.",
  },

  // Shown as a live local time, so someone in another time zone knows when I'll see their message
  timeZone: { id: "Africa/Cairo", city: "Cairo" },

  // Order = display order. The CV comes first because it's what recruiters want most.
  links: [
    { icon: "download", label: "Download CV", detail: "PDF · one page", href: profile.links.resume, download: true },
    { icon: "linkedin", label: "LinkedIn", detail: "Connect with me", href: "https://www.linkedin.com/in/ahmed-samy-8b8448239/" },
    { icon: "github", label: "GitHub", detail: "@ahmed-sami9", href: profile.links.github },
    // wa.me needs the international number: Egypt is +20, and the leading 0 drops
    { icon: "whatsapp", label: "WhatsApp", detail: "For quick messages", href: "https://wa.me/201043178494" },
  ],
};

// The one place that knows the email links' shapes. Values are URL-encoded, so a subject with
// spaces or "&" can't break the link.
const { address, subject } = contact.email;
const enc = encodeURIComponent;

export const emailLinks = {
  // Opens the visitor's own email app, when one is set up
  mailto: `mailto:${address}?subject=${enc(subject)}`,
  // The fallbacks for visitors without one: a compose window in the browser
  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${enc(address)}&su=${enc(subject)}`,
  outlook: `https://outlook.office.com/mail/deeplink/compose?to=${enc(address)}&subject=${enc(subject)}`,
};
