import Hero from "@/components/Hero";
import ProductSneakPeek from "@/components/ProductSneakPeek";
import CollectionShowcase from "@/components/CollectionShowcase";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Creative Sensory Solutions | Mindful Play for Neurodiverse Kids",
  description: "Sunflower Petals offers a curated selection of sensory and educational tools designed to help children with autism bloom through play.",
  openGraph: {
    title: "Sunflower Petals | Creative Sensory Solutions",
    description: "Empowering neurodiverse children through mindful play and functional living aids.",
  },
};

export default function Home() {
  return (
    <main className="w-full relative min-h-screen bg-white">
      <Hero />

      {/* New: Featured Sneak Peek of individual products */}
      <ProductSneakPeek />

      {/* Revamped: Carousel-based showcase is now a Collection Showcase */}
      <CollectionShowcase />
      {/* <Testimonials /> */}
      <FAQ />
    </main>
  );
}
