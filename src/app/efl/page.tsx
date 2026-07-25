import { Metadata } from "next";
import EssentialsClient from "./EssentialsClient";

export const metadata: Metadata = {
  title: "EFL — Essentials for Living",
  description: "Essentials for Living (EFL) is the primary philosophy behind every Petals product — seven domains of real-world independence that every child deserves to develop.",
  openGraph: {
    title: "Essentials for Living | Sunflower Petals",
    description: "Seven domains. One philosophy. Discover how Essentials for Living guides every product we make at Petals.",
  },
};

export default function EFLPage() {
  return <EssentialsClient />;
}
