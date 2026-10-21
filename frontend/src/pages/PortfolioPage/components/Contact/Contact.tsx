import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { contact } from "@/data/contact";
import ContactLinks from "./components/ContactLinks";
import EmailCard from "./components/EmailCard";

// The last section: one main action (email), then the other ways in.
// Phones and tablets: stacked. Laptops (lg): email on the left, the other links beside it.
// No closing terminal line here: the footer comes right after and ends the page.
function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        eyebrow={contact.eyebrow}
        title={contact.title}
        description={contact.intro}
      />

      <div className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <EmailCard />
        <ContactLinks />
      </div>
    </Section>
  );
}

export default Contact;
