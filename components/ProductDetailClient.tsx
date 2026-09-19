"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Heart, Minus, Plus, ShoppingBag, Star, MessageCircle, Ruler } from "lucide-react";
import { Product } from "@/lib/types";
import { taka, whatsappUrl } from "@/lib/format";
import { useShop } from "./ShopProvider";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [image, setImage] = useState(product.images[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0] || "Black");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"specs"|"reviews">("specs");
  const wished = wishlist.includes(product.id);
  const discount = Math.round(((product.original_price-product.price)/product.original_price)*100);
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000";

  const add = () => addToCart(product,size,color,qty);
  const buy = () => { add(); window.location.href = "/checkout"; };
  const message = `হ্যালো ধাপ.কম, আমি "${product.name}" অর্ডার করতে চাই। সাইজ: ${size}, কালার: ${color}, পরিমাণ: ${qty} জোড়া। মূল্য: ${product.price*qty} টাকা।`;

  return <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-12">
    <Link href="/" className="text-xs text-slate-500 flex items-center gap-1 mb-4"><ArrowLeft size={14}/>হোমে ফিরুন</Link>
    <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-100 shadow-sm grid lg:grid-cols-12 gap-6 lg:gap-10">
      <div className="lg:col-span-6 space-y-3">
        <div className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden p-6"><Image src={image} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain"/><span className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">{product.badge || "অফার"}</span></div>
        <div className="flex gap-2.5 overflow-x-auto custom-scrollbar">{product.images.map(src => <button key={src} onClick={()=>setImage(src)} className={`w-16 h-16 rounded-xl border-2 p-1 shrink-0 ${image===src ? "border-orange-600" : "border-slate-200"}`}><Image src={src} alt="" width={64} height={64} className="w-full h-full object-contain"/></button>)}</div>
      </div>
      <div className="lg:col-span-6 flex flex-col justify-between gap-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between"><span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{product.category}</span><div className="flex items-center gap-1 text-xs text-amber-500 font-bold"><Star size={13} fill="currentColor"/>{product.rating}<span className="text-slate-400 font-normal">({product.reviews_count})</span></div></div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">{product.name}</h1>
          <div className="flex items-baseline gap-3"><span className="text-2xl sm:text-3xl font-black text-orange-600">{taka(product.price)}</span><span className="text-base text-slate-400 line-through">{taka(product.original_price)}</span><span className="bg-rose-100 text-rose-600 text-xs font-black px-2 py-0.5 rounded">{discount}% ছাড়</span></div>
          <p className="text-slate-600 text-sm leading-relaxed">{product.short_desc}</p>

          <div><span className="text-xs font-bold">কালার বাছাই করুন:</span><div className="flex gap-2 mt-2">{product.colors.map(c=><button key={c} onClick={()=>setColor(c)} className={`px-3 py-1 rounded-lg text-xs font-medium border ${color===c ? "border-orange-600 bg-orange-50 text-orange-700" : "border-slate-200"}`}>{c}</button>)}</div></div>
          <div><div className="flex items-center justify-between text-xs font-bold"><span>সাইজ নির্বাচন করুন (EU):</span><button className="text-orange-600 flex gap-1 items-center"><Ruler size={13}/>সাইজ গাইড</button></div><div className="flex flex-wrap gap-2 mt-2">{product.sizes.map(s=><button key={s} onClick={()=>setSize(s)} className={`h-10 w-12 rounded-xl text-xs font-bold border ${size===s ? "bg-slate-900 text-white border-slate-900" : "border-slate-200"}`}>{s}</button>)}</div></div>
          <div className="flex items-center gap-3"><span className="text-xs font-bold">পরিমাণ:</span><div className="flex items-center bg-slate-100 rounded-xl p-1"><button onClick={()=>setQty(Math.max(1,qty-1))} className="w-8 h-8 flex items-center justify-center"><Minus size={14}/></button><span className="w-8 text-center text-xs font-bold">{qty}</span><button onClick={()=>setQty(qty+1)} className="w-8 h-8 flex items-center justify-center"><Plus size={14}/></button></div><span className="text-[11px] text-emerald-600 font-semibold"><Check size={13} className="inline"/> স্টকে আছে</span></div>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">{product.features.map(f=><div key={f} className="flex items-center gap-2"><Check size={14} className="text-emerald-500"/>{f}</div>)}</div>
        </div>
        <div className="space-y-2.5 pt-4 border-t border-slate-100">
          <div className="grid grid-cols-2 gap-2.5"><button onClick={add} className="bg-slate-100 py-3.5 rounded-2xl text-sm font-bold flex justify-center gap-2 items-center"><ShoppingBag size={17}/>ব্যাগে যোগ করুন</button><button onClick={buy} className="bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-2xl text-sm font-bold">সরাসরি চেকআউট →</button></div>
          <a href={whatsappUrl(wa,message)} target="_blank" className="w-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2"><MessageCircle size={16}/>হোয়াটসঅ্যাপে অর্ডার</a>
          <button onClick={()=>toggleWishlist(product.id)} className="text-xs text-slate-500 flex items-center gap-1"><Heart size={14} fill={wished ? "currentColor":"none"} className={wished ? "text-rose-500":"text-slate-400"}/>{wished ? "উইশলিস্টে আছে":"উইশলিস্টে রাখুন"}</button>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-sm mt-6">
      <div className="flex gap-6 border-b border-slate-200 text-sm font-bold"><button onClick={()=>setTab("specs")} className={`pb-3 ${tab==="specs"?"text-orange-600 border-b-2 border-orange-600":"text-slate-400"}`}>পণ্যের বিবরণ ও বৈশিষ্ট্য</button><button onClick={()=>setTab("reviews")} className={`pb-3 ${tab==="reviews"?"text-orange-600 border-b-2 border-orange-600":"text-slate-400"}`}>গ্রাহক মতামত ({product.reviews_count})</button></div>
      {tab==="specs" ? <div className="pt-4 text-sm text-slate-600 leading-relaxed">{product.full_desc}</div> : <div className="pt-4 text-sm text-slate-500">এই ডেমো ডেটাসেটে বিস্তারিত রিভিউ আলাদা রাখা হয়নি। Supabase-এ reviews table যোগ করে এটিকে পূর্ণ করা যাবে।</div>}
    </div>
  </main>;
}