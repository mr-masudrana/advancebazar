"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/lib/types";
import { taka } from "@/lib/format";
import { useShop } from "./ShopProvider";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [size, setSize] = useState(product.sizes[0]);
  const wished = wishlist.includes(product.id);
  const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
  return (
    <article className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col group relative">
      <button onClick={() => toggleWishlist(product.id)} className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow ${wished ? "text-rose-500" : "text-slate-400"}`}><Heart size={15} fill={wished ? "currentColor" : "none"}/></button>
      <Link href={`/products/${product.id}`} className="relative bg-slate-100 aspect-square overflow-hidden flex items-center justify-center p-4">
        {product.badge && <span className="absolute top-2.5 left-2.5 z-10 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{product.badge}</span>}
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-contain group-hover:scale-105 transition-transform duration-300"/>
      </Link>
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between gap-2">
        <div>
          <div className="flex items-center gap-1 text-[11px] text-amber-500 font-semibold"><Star size={12} fill="currentColor"/><span>{product.rating}</span><span className="text-slate-400">({product.reviews_count})</span></div>
          <Link href={`/products/${product.id}`} className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1 block mt-1">{product.name}</Link>
          <div className="mt-2 flex flex-wrap gap-1">
            {product.sizes.map(s => <button key={s} onClick={() => setSize(s)} className={`text-[10px] w-7 h-7 rounded-md font-bold ${size === s ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}>{s}</button>)}
          </div>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-baseline gap-1.5 mb-2"><span className="text-base font-black text-orange-600">{taka(product.price)}</span><span className="text-xs text-slate-400 line-through">{taka(product.original_price)}</span><span className="text-[9px] text-rose-500 font-bold">-{discount}%</span></div>
          <div className="grid grid-cols-2 gap-1.5">
            <button onClick={() => addToCart(product, size)} className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1"><ShoppingCart size={13}/>কার্ট</button>
            <Link href={`/checkout?product=${product.id}`} onClick={() => addToCart(product, size)} className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-xl text-xs text-center">অর্ডার →</Link>
          </div>
        </div>
      </div>
    </article>
  );
}