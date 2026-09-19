"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, ShieldCheck, Truck, WalletCards, RotateCcw, UserRoundX } from "lucide-react";
import { PRODUCTS, CATEGORY_NAMES } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Header } from "./Header";

export function HomeClient() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const products = useMemo(() => PRODUCTS.filter(p => {
    const c = category === "all" || p.category === category;
    const q = search.toLowerCase().trim();
    return c && (!q || p.name.toLowerCase().includes(q) || p.category.includes(q));
  }), [category, search]);

  return (
    <>
      <Header onSearch={setSearch}/>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 pb-24 space-y-6">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 text-white shadow-xl">
          <div className="grid md:grid-cols-12 items-center p-6 sm:p-8 md:p-10 gap-6">
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">⚡ ধামাকা অফার চলছে</span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">স্টাইলিশ ও আরামদায়ক <br className="hidden sm:block"/>জুতা এবার আপনার হাতের মুঠোয়</h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto md:mx-0">কোনো রেজিস্ট্রেশন বা কার্ড ছাড়াই ক্যাশ অন ডেলিভারিতে সারা বাংলাদেশে ডেলিভারি।</p>
              <Link href="#productSection" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full font-semibold text-sm">কালেকশন দেখুন <ArrowDown size={16}/></Link>
            </div>
            <Link href="/products/1" className="md:col-span-5 flex justify-center">
              <img src={PRODUCTS[0].images[0]} alt="Featured shoes" className="w-64 h-56 sm:w-80 sm:h-64 object-contain -rotate-12 hover:rotate-0 transition-all duration-500 drop-shadow-2xl"/>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs sm:text-sm">
          {[
            [Truck,"সারা দেশে ডেলিভারি","২-৩ দিনের মধ্যে"],
            [WalletCards,"ক্যাশ অন ডেলিভারি","পণ্য দেখে টাকা"],
            [RotateCcw,"সহজ রিটার্ন","সাইজ পরিবর্তন"],
            [UserRoundX,"অ্যাকাউন্ট লাগবে না","ডিরেক্ট অর্ডার"]
          ].map(([Icon,title,sub]: any) => <div key={title} className="bg-white p-3.5 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm"><div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0"><Icon size={18}/></div><div><h4 className="font-bold text-slate-800 leading-tight">{title}</h4><p className="text-slate-400 text-[11px]">{sub}</p></div></div>)}
        </section>

        <section id="productSection" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div><h2 className="text-xl sm:text-2xl font-bold text-slate-900">আমাদের কালেকশন</h2><p className="text-xs sm:text-sm text-slate-500">ক্যাটাগরি বেছে নিয়ে সরাসরি অর্ডার করুন</p></div>
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
              {Object.entries(CATEGORY_NAMES).map(([id,name]) => <button key={id} onClick={() => setCategory(id)} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border ${category===id ? "bg-orange-600 text-white border-orange-600" : "bg-white text-slate-600 border-slate-200"}`}>{name}</button>)}
            </div>
          </div>
          {products.length ? <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">{products.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <div className="py-16 text-center bg-white rounded-3xl border border-slate-100">কোনো জুতা খুঁজে পাওয়া যায়নি।</div>}
        </section>
      </main>
      <MobileNav/>
    </>
  );
}

function MobileNav() {
  return <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-8 py-2 flex justify-between text-xs shadow-lg">
    <Link href="/" className="flex flex-col items-center gap-1 text-orange-600 font-bold"><span>⌂</span><span>হোম</span></Link>
    <Link href="/checkout" className="flex flex-col items-center gap-1 text-slate-500"><span>🛍</span><span>কার্ট</span></Link>
    <Link href="/orders" className="flex flex-col items-center gap-1 text-slate-500"><span>☰</span><span>More</span></Link>
  </nav>;
}