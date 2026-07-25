import { Metadata } from "next";
import StoryClient from "./StoryClient";

export const metadata: Metadata = {
  title: "The Story Behind Petals",
  description: "From a parent's heart to your home. Read about the journey of Sunflower Petals, from the first diagnosis to creating tactile sensory tools that truly connect.",
  openGraph: {
    title: "The Sunflower Petals Story | A Journey of Connection",
    description: "Discover why we started Petals and how we're turning 'shoe box' activities into premium, therapeutic sensory solutions.",
  },
};

export default function StoryPage() {
  return <StoryClient />;
}
