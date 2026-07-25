import { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Sensory Solutions Garden",
  description: "Explore our hand-chosen collection of sensory regulation tools, routine aids, and skill-building products. Designed to support neurodiverse children through the magic of play.",
  openGraph: {
    title: "The Products Garden | Sunflower Petals",
    description: "Discover functional tools for autism, from tactile spinners to visual calendars, crafted for meaningful connection.",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
