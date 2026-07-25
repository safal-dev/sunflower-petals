import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { getFullProducts } from "@/lib/data";
import CharityBanner from "@/components/CharityBanner";

const allProducts = getFullProducts();

export async function generateStaticParams() {
  return allProducts.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Sunflower Petals`,
      description: product.description,
      images: [product.image || ""],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image || ""],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="w-full relative min-h-screen bg-[#FAF9F6]">
      <CharityBanner />
      <ProductDetailClient product={product} />
    </main>
  );
}
