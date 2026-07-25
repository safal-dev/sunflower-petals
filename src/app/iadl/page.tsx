import { Metadata } from "next";
import IADLClient from "./IADLClient";

export const metadata: Metadata = {
  title: "Instrumental Activities of Daily Living (IADL)",
  description: "Instrumental Activities of Daily Living — the complex, community-oriented skills for independent living: shopping, cooking, managing money, transport, and more.",
  openGraph: {
    title: "Instrumental Activities of Daily Living (IADL) | Sunflower Petals",
    description: "Eight skill domains. Community independence. Discover how IADL instruction builds real-world skills for children with autism.",
  },
};

export default function IADLPage() {
  return <IADLClient />;
}
