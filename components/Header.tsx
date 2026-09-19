"use client";

import Link from "next/link";
import { Grid2x2, Menu, Search, ShoppingBag, MessageCircle } from "lucide-react";
import { useShop } from "./ShopProvider";

export function Header({ onSearch }: { onSearch: (q: string) => void }) {
  const { cart } = useShop();
  const count = cart.reduce((s, x) => s + x.quantity, 0);
  return (
    <>
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 text-center font-medium">
        <span className="inline-flex items-center mr-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500">অফার</span>
        কোনো অ্যাকাউন্ট বা সাইন-আপ ছাড়াই সহজে অর্ডার করুন!
      </div>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <ShoppingBag size={20}/>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900">ধাপ<span className="text-orange-600">.কম</span></span>
                <p className="text-[10px] text-slate-400 leading-none">DHAP FOOTWEAR</p>
              </div>
            </Link>
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
                <input onChange={e => onSearch(e.target.value)} placeholder="পছন্দের জুতা সার্চ করুন..." className="w-full bg-slate-100 border border-transparent focus:border-orange-500 focus:bg-white rounded-full pl-10 pr-4 py-2.5 outline-none text-sm"/>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801700000000"}`} target="_blank" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-200">
                <MessageCircle size={15}/> হেল্পলাইন
              </a>
              <Link href="/orders" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full text-slate-700 bg-slate-100">
                <Grid2x2 size={15}/> মেন্যু
              </Link>
              <Link href="/checkout" className="relative p-2.5 text-slate-700 hover:text-orange-600 rounded-full">
                <ShoppingBag size={20}/>
                {count > 0 && <span className="absolute -top-0.5 -right-0.5 bg-orange-600 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">{count}</span>}
              </Link>
            </div>
          </div>
          <div className="pb-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16}/>
              <input onChange={e => onSearch(e.target.value)} placeholder="পছন্দের জুতা সার্চ করুন..." className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2 outline-none text-sm"/>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}