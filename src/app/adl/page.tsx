import { Metadata } from "next";
import ADLClient from "./ADLClient";

export const metadata: Metadata = {
  title: "Activities of Daily Living (ADL)",
  description: "Activities of Daily Living — the foundational self-care skills every person needs: bathing, dressing, eating, toileting, and more. Taught with structure and joy for children with autism.",
  openGraph: {
    title: "Activities of Daily Living (ADL) | Sunflower Petals",
    description: "Seven skill areas. One foundation. Discover how ADL instruction builds independence for children with autism.",
  },
};

export default function ADLPage() {
  return <ADLClient />;
}
