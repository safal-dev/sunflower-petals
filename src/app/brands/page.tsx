import { Metadata } from "next";
import BrandsClient from "./BrandsClient";

export const metadata: Metadata = {
  title: "Our Brands",
  description: "Meet the three brands under Sunflower Petals — Cliky Claky, DayDay, and NumSum. Three distinct lines, one shared purpose: tools that truly work for your child.",
  openGraph: {
    title: "Our Brands | Sunflower Petals",
    description: "Cliky Claky · DayDay · NumSum — three purposeful brands for neurodiverse children.",
  },
};

export default function BrandsPage() {
  return <BrandsClient />;
}
