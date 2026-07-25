import { Metadata } from "next";
import EFLClient from "../efl/EFLClient";

export const metadata: Metadata = {
  title: "Early Foundational Learning",
  description: "Understand the principles, pillars, and practices of Early Foundational Learning — the developmental framework behind every Petals product, designed for families of children with autism.",
  openGraph: {
    title: "What Is Early Foundational Learning? | Sunflower Petals",
    description: "Six pillars. One philosophy. Discover how Early Foundational Learning guides every product we make at Petals.",
  },
};

export default function EarlyFoundationalLearningPage() {
  return <EFLClient />;
}
