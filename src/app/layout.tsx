import type { Metadata } from "next";
import { 
  Nunito_Sans, 
  Lora,
  Pacifico,
  Caveat,
  Amatic_SC,
  Bangers,
  Permanent_Marker
} from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });
const amatic = Amatic_SC({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-amatic" });
const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers" });
const permanentMarker = Permanent_Marker({ weight: "400", subsets: ["latin"], variable: "--font-permanent-marker" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sunflowerpetals.com"), // Placeholder URL, should be updated to actual domain
  title: {
    default: "Sunflower Petals | Creative Sensory Solutions",
    template: "%s | Sunflower Petals"
  },
  description: "Empowering neurodiverse children through mindful play. Discover our curated collection of sensory regulation tools and educational aids designed for autism.",
  keywords: ["autism", "sensory toys", "neurodiversity", "educational aids", "occupational therapy", "child development", "sunflower petals"],
  authors: [{ name: "Sunflower Petals Team" }],
  creator: "Sunflower Petals",
  publisher: "Sunflower Institute for Autism",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sunflowerpetals.com",
    siteName: "Sunflower Petals",
    title: "Sunflower Petals | Creative Sensory Solutions",
    description: "Mindful play and sensory solutions for neurodiverse kids. An initiative of the Sunflower Institute for Autism.",
    images: [
      {
        url: "/og-image.png", // Need to ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "Sunflower Petals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunflower Petals | Creative Sensory Solutions",
    description: "Empowering neurodiverse children through mindful play.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "PVtDVag8GxDl_FtUhNXMmGOvPr9scNi-aGz24ysV9YM",
  },
};


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${nunitoSans.variable} ${pacifico.variable} ${caveat.variable} ${amatic.variable} ${bangers.variable} ${permanentMarker.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full selection:bg-brand-yellow selection:text-black">
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-6 focus:py-3 focus:bg-brand-yellow focus:text-black focus:rounded-full focus:font-bold focus:shadow-xl outline-none"
        >
          Skip to content
        </a>
        <CartProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          {/* <CartBasket /> */}
        </CartProvider>
      </body>
    </html>
  );
}
