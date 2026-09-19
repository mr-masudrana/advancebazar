"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Truck, Heart, Package, ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { useShop } from "./ShopProvider";

export function OrdersClient() {
  const { wishlist } = useShop();
  const [q,setQ]=useState(""); const [result,setResult]=useState<any>(null); const [error,setError]=useState("");
  async function track(){setError("");setResult(null);if(!q.trim())return;const r=await fetch(`/api/orders?q=${encodeURIComponent(q.trim())}`);const d=await r.json();if(!r.ok)setError(d.error||"অর্ডার পাওয়া যায়নি");else setResult(d.order);}
  const fav=PRODUCTS.filter(p=>wishlist.includes(p.id));
  return <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-12 space-y-5"><div className="flex items-center justify-between border-b pb-3"><div><h1 className="text-xl sm:text-2xl font-bold">মেন্যু ও অন্যান্য সুবিধা</h1><p className="text-xs text-slate-500">পার্সেল ট্র্যাকিং ও উইশলিস্ট</p></div><Link href="/" className="text-xs text-orange-600 flex gap-1 items-center"><ArrowLeft size={13}/>শপে ফিরুন</Link></div>
    <section className="bg-white rounded-3xl p-5 sm:p-7 border shadow-sm max-w-2xl mx-auto space-y-4"><div className="text-center"><Truck className="mx-auto text-amber-600"/><h2 className="text-lg font-bold">অর্ডার ট্র্যাকিং</h2><p className="text-xs text-slate-500">অর্ডার আইডি বা মোবাইল নম্বর লিখুন</p></div><div className="flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} className="flex-1 bg-slate-50 border rounded-2xl px-4 py-3 text-xs" placeholder="DHAP-123456 বা 017..."/><button onClick={track} className="bg-slate-900 text-white rounded-2xl px-5 text-xs font-bold"><Search size={15} className="inline mr-1"/>ট্র্যাক</button></div>{error&&<p className="text-xs text-rose-500">{error}</p>}{result&&<div className="border-t pt-4 space-y-2 text-xs"><p><b>অর্ডার:</b> #{result.order_no}</p><p><b>স্ট্যাটাস:</b> <span className="text-orange-600 font-bold">{result.status}</span></p><p><b>মোট:</b> ৳{result.grand_total}</p>{result.items?.map((i:any)=><p key={i.id} className="text-slate-500">{i.product_name} • সাইজ {i.size} • {i.quantity} জোড়া</p>)}</div>}</section>
    <section className="space-y-3"><h2 className="text-base font-bold flex gap-2 items-center"><Heart size={17} className="text-rose-500"/>উইশলিস্ট ({fav.length})</h2>{fav.length?<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">{fav.map(p=><ProductCard key={p.id} product={p}/>)}</div>:<div className="bg-white border rounded-2xl p-8 text-center text-xs text-slate-400">এখনও কোনো পণ্য উইশলিস্টে নেই।</div>}</section>
  </main>;
}