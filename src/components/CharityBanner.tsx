'use client';

import React, { useEffect } from 'react';
import { useCart } from "@/context/CartContext";

const CharityBanner = () => {
  const { setTopOffset } = useCart();

  useEffect(() => {
    setTopOffset(32);
    return () => setTopOffset(0);
  }, [setTopOffset]);

  return (
    <div className="w-full bg-[#F6BE2C] text-[#1A1A1A] py-2 overflow-hidden fixed top-0 left-0 z-[110] border-b border-black/5 shadow-sm">
      <div className="max-w-[2000px] mx-auto px-4 overflow-hidden relative">
      <div className="flex items-center justify-center text-center animate-pulsate">
        <span className="text-[10px] md:text-[11px] font-bold tracking-[0.05em] uppercase text-black/80 px-4">
          5% of all sales from the original products of Sunflower Petals goes to the Golden Sunflower Foundation - non profit for the benefit of the autism community and the persons with autism
        </span>
      </div>
      </div>
    </div>
  );
};

export default CharityBanner;
