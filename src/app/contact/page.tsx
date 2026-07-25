import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Support",
  description: "Get in touch with the Sunflower Petals team. Whether you're a parent, clinician, or institution, we're here to help with sensory solutions and clinical consults.",
  openGraph: {
    title: "Contact Sunflower Petals | Support & Inquiries",
    description: "Reach out for support, bulk orders, or to learn more about our sensory tools for neurodiverse children.",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactClient />
    </>
  );
}
