import brands from "@/data/brands.json";
import categories from "@/data/categories.json";
import products from "@/data/products.json";
import reviews from "@/data/reviews.json";
import testimonials from "@/data/testimonials.json";
import bundles from "@/data/bundles.json";
import blanxerLinks from "@/data/blanxer.json";

export interface Brand {
  id: string;
  label: string;
  color: string;
  href: string;
  section: {
    bg: string;
    text: string;
    subtitle: string;
    logo: string;
    description: string;
    features: { label: string; desc: string }[];
    image: string;
    quote: string;
    quoteSubtitle: string;
    quoteColor: string;
    exploreHref: string;
    nextHref: string | null;
    nextLabel: string | null;
  };
}

export interface Category {
  id: string;
  brandId: string;
  name: string;
  subtitle: string;
  image: string;
  icon: string;
  color: string;
}

export interface Review {
  id: string;
  productId: string;
  user: string;
  rating: number;
  text: string;
  date?: string;
}

export interface Testimonial {
  id: string;
  productId: string;
  name: string;
  role: string;
  text: string;
}

export interface Product {
  id: string;
  name: string;
  brandId: string;
  categoryId: string;
  description: string;
  _microDescription?: string;
  microDescription?: string;
  color: string;
  priceNumeric: number;
  offerPriceNumeric?: number;
  tag?: string;
  featured?: boolean;
  isOriginal?: boolean;
  whyWeLoveIt?: string[];
  whyToUse?: string;
  howToUse?: string[];
  whenToUse?: { title: string; description: string }[];
  whatItHelpsWith?: string[];
  specifications?: Record<string, string>;
  rating?: {
    stars: number;
    count: number;
  };
  createdAt?: string;
  image: string;
  images: string[];
}

export interface Bundle extends Omit<Product, 'specifications'> {
  contains: string[];
  specifications: Record<string, string>;
}

export type FullProduct = Product & {
  categoryName: string;
  categoryDescription: string;
  price: string;
  offerPrice?: string;
  reviews: Review[];
  testimonials: Testimonial[];
  productInfo: Record<string, string | undefined>;
  brand: string;
  contains?: string[];
  blanxerLink?: string;
};

// Helper to format price
export const formatPrice = (price: number) => `NPR ${price.toFixed(2)}`;

// Data Getters
export const getBrands = (): Brand[] => brands as Brand[];

export const getBrandById = (id: string) => getBrands().find(b => b.id === id);

export const getCategories = (): Category[] => categories as Category[];

export const getCategoryById = (id: string) => getCategories().find(c => c.id === id);

export const getProducts = () => products as unknown as Product[];

export const getReviews = () => reviews as unknown as Review[];

export const getTestimonials = () => testimonials as unknown as Testimonial[];

export const getBundles = () => bundles as unknown as Bundle[];

// Denormalized/Rich Data Fetchers
export const getFullProducts = (): FullProduct[] => {
  const allProducts = [...getProducts(), ...getBundles()];
  
  return allProducts.map(p => {
    const brand = getBrandById(p.brandId);
    const category = getCategoryById(p.categoryId);
    const productReviews = getReviews().filter(r => r.productId === p.id);
    const productTestimonials = getTestimonials().filter(t => t.productId === p.id);

    return {
      ...p,
      brand: brand?.label || "",
      categoryName: category?.name || "",
      categoryDescription: category?.subtitle || "",
      price: formatPrice(p.priceNumeric),
      offerPrice: p.offerPriceNumeric ? formatPrice(p.offerPriceNumeric) : undefined,
      reviews: productReviews,
      testimonials: productTestimonials,
      productInfo: p.specifications || {}, // Mapping specifications to productInfo for backward compatibility
      contains: (p as any).contains,
      blanxerLink: (blanxerLinks as Record<string, string>)[p.id]
    };
  });
};

export const getProductById = (id: string) => {
  return getFullProducts().find(p => p.id === id);
};
