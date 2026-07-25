import FoundationClient from "./FoundationClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Golden Sunflower Foundation | Autism & Neurodiversity Support",
  description: "A non-profit organization in Nepal dedicated to supporting individuals with autism, neurodiversity, and their families. Bridging the gap in support through direct benefit and care.",
  keywords: ["Golden Sunflower Foundation", "Foundation", "autism support", "Nepal", "neurodiversity", "charity", "family assistance"],
};

export default function FoundationPage() {
  return <FoundationClient />;
}
