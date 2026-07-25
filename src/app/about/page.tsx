import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "Our Story & Mission",
  description: "Learn about the heart behind Sunflower Petals, our educational frameworks (EFL, ADL, IADL), and our partnership with the Sunflower Institute for Autism.",
  openGraph: {
    title: "About Sunflower Petals | Our Journey",
    description: "Discover how we're redefining neurodiverse play and learning through mindful gifting and functional living frameworks.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
