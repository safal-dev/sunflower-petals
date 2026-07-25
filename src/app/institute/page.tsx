import InstituteClient from "./InstituteClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sunflower Institute for Autism | Center of Excellence",
  description: "A holistic Center of Excellence providing comprehensive autism care, therapy, research, and community support in Nepal. Founded on the mission to provide integrated care and national impact.",
  keywords: ["autism", "Nepal", "autism care", "autism therapy", "autism support", "autism research", "neurodiversity", "developmental disorders"],
};

export default function InstitutePage() {
  return <InstituteClient />;
}
