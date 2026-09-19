"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShieldCheck, Trash2, CheckCircle2 } from "lucide-react";
import { useShop } from "./ShopProvider";
import { taka } from "@/lib/format";

export function CheckoutClient() {
  const { cart, changeQty, removeFromCart, clearCart } = useShop();
  const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [address,setAddress]=useState("");
  const [zone,setZone]=useState<"inside"|"outside">("inside"); const [payment,setPayment]=useState<"cod"|"mfs">("cod"); const [trx,setTrx]=useState(""); const [coupon,setCoupon]=useState(""); const [discount,setDiscount]=useState(0);
  const [loading,setLoading]=useState(false); const [success,setSuccess]=useState<{order_no:string,total:number}|null>(null); const [error,setError]=useState("");

  const subtotal=useMemo(()=>cart.reduce((s,x)=>s+x.product.price*x.quantity,0),[cart]);
  const delivery=zone==="inside"?60:120;
  const total=Math.max(0,subtotal+delivery-Math.min(discount,subtotal));

  const applyCoupon=()=>{const c=coupon.trim().toUpperCase();setDiscount(c==="DHAP100"?100:c==="FREE60"?60:0);};
  async function submit(e:React.FormEvent){e.preventDefault();setError("");if(!cart.length){setError("কার্টে কোনো পণ্য নেই।");return;}if(payment==="mfs"&&!trx.trim()){setError("অগ্রিম পেমেন্টের TrxID দিন।");return;}setLoading(true);
    try{const res=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({customer:{name,phone,address},cart,zone,paymentMethod:payment,trxId:trx,subtotal,deliveryFee:delivery,discount:Math.min(discount,subtotal),grandTotal:total})});const data=await res.json();if(!res.ok)throw new Error(data.error||"অর্ডার ব্যর্থ হয়েছে");setSuccess({order_no:data.order.order_no,total});clearCart();}catch(err:any){setError(err.message)}finally{setLoading(false)}}

  if(success)return <main className="max-w-xl mx-auto px-4 py-16 text-center"><div className="bg-white rounded-3xl border p-8 shadow-sm space-y-4"><CheckCircle2 size={64} className="mx-auto text-emerald-500"/><h1 className="text-2xl font-bold">অভিনন্দন! অর্ডার সম্পন্ন হয়েছে</h1><p className="text-sm text-slate-500">অর্ডার আইডি: <b className="text-orange-600">#{success.order_no}</b></p><p className="text-sm">প্রদেয় মোট: <b className="text-orange-600">{taka(success.total)}</b></p><Link href="/" className="inline-block bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-bold">কেনাকাটা চালিয়ে যান</Link></div></main>;

  return <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-12"><Link href="/" className="text-xs text-slate-500 flex items-center gap-1 mb-4"><ArrowLeft size={14}/>শপে ফিরুন</Link><div className="grid lg:grid-cols-12 gap-6">
    <form onSubmit={submit} className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 shadow-sm space-y-4">
      <div><h1 className="text-xl sm:text-2xl font-bold">গেস্ট চেকআউট</h1><p className="text-xs text-slate-500">কোনো অ্যাকাউন্ট বা পাসওয়ার্ড লাগবে না।</p></div>
      <label className="block text-xs font-bold">আপনার পুরো নাম *<input value={name} onChange={e=>setName(e.target.value)} required className="mt-1 w-full bg-slate-50 border rounded-xl px-4 py-2.5 font-normal outline-none" placeholder="মোঃ আরিফুল ইসলাম"/></label>
      <label className="block text-xs font-bold">সচল মোবাইল নম্বর *<input value={phone} onChange={e=>setPhone(e.target.value)} required type="tel" className="mt-1 w-full bg-slate-50 border rounded-xl px-4 py-2.5 font-normal outline-none" placeholder="017XXXXXXXX"/></label>
      <div><p className="text-xs font-bold mb-2">ডেলিভারি এলাকা *</p><div className="grid grid-cols-2 gap-3">{[["inside","ঢাকার ভেতরে","৳৬০"],["outside","ঢাকার বাইরে","৳১২০"]].map(([v,t,c])=><label key={v} className={`p-3 rounded-2xl border cursor-pointer ${zone===v?"border-orange-600 bg-orange-50":"border-slate-200"}`}><input type="radio" checked={zone===v} onChange={()=>setZone(v as any)} className="mr-2"/><span className="text-xs font-bold">{t}</span><span className="block text-[11px] text-orange-600 ml-5">{c}</span></label>)}</div></div>
      <label className="block text-xs font-bold">পূর্ণাঙ্গ ডেলিভারি ঠিকানা *<textarea value={address} onChange={e=>setAddress(e.target.value)} required rows={3} className="mt-1 w-full bg-slate-50 border rounded-xl px-4 py-2.5 font-normal outline-none" placeholder="বাড়ি/রোড, এলাকা/গ্রাম, থানা ও জেলা..."/></label>
      <div className="border-t pt-4"><p className="text-xs font-bold mb-2">পেমেন্ট মেথড</p><div className="space-y-2"><label className={`block p-3 rounded-2xl border cursor-pointer ${payment==="cod"?"border-orange-600 bg-orange-50":"border-slate-200"}`}><input type="radio" checked={payment==="cod"} onChange={()=>setPayment("cod")} className="mr-2"/><span className="text-xs font-bold">ক্যাশ অন ডেলিভারি</span></label><label className={`block p-3 rounded-2xl border cursor-pointer ${payment==="mfs"?"border-orange-600 bg-orange-50":"border-slate-200"}`}><input type="radio" checked={payment==="mfs"} onChange={()=>setPayment("mfs")} className="mr-2"/><span className="text-xs font-bold">বিকাশ / নগদ পেমেন্ট (অগ্রিম)</span></label></div>{payment==="mfs"&&<input value={trx} onChange={e=>setTrx(e.target.value)} className="mt-2 w-full border rounded-xl px-3 py-2 text-xs" placeholder="পেমেন্ট করার পর TrxID লিখুন..."/>}</div>
      {error&&<p className="bg-rose-50 text-rose-600 p-3 rounded-xl text-xs">{error}</p>}
      <button disabled={loading} className="w-full bg-orange-600 disabled:opacity-60 text-white font-bold py-4 rounded-2xl">{loading?"অর্ডার প্রসেস হচ্ছে...":`অর্ডার কনফার্ম করুন (${taka(total)})`}</button>
      <p className="text-[11px] text-center text-slate-400"><ShieldCheck size={13} className="inline text-emerald-500"/> কোনো প্রি-পেমেন্ট বা অ্যাকাউন্ট আবশ্যক নয়</p>
    </form>
    <aside className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm h-fit space-y-4">
      <div className="flex justify-between border-b pb-2.5"><h2 className="font-bold text-sm">অর্ডারের পণ্যসমূহ</h2><span className="text-xs bg-slate-100 px-2 rounded-full">{cart.reduce((s,x)=>s+x.quantity,0)} টি</span></div>
      {cart.length===0?<p className="text-xs text-slate-400 py-8 text-center">কার্ট খালি। <Link href="/" className="text-orange-600 underline">পণ্য দেখুন</Link></p>:<div className="space-y-3">{cart.map(i=><div key={i.key} className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl"><Image src={i.product.images[0]} alt="" width={56} height={56} className="w-14 h-14 object-contain bg-white rounded-xl"/><div className="flex-1 min-w-0"><p className="text-xs font-bold truncate">{i.product.name}</p><p className="text-[11px] text-slate-400">সাইজ {i.size} • {i.color}</p><p className="text-xs font-bold text-orange-600">{taka(i.product.price)} × {i.quantity}</p></div><div className="flex items-center bg-white border rounded-lg"><button onClick={()=>changeQty(i.key,-1)} type="button" className="p-1"><Minus size={12}/></button><span className="w-5 text-center text-xs">{i.quantity}</span><button onClick={()=>changeQty(i.key,1)} type="button" className="p-1"><Plus size={12}/></button></div><button type="button" onClick={()=>removeFromCart(i.key)} className="text-rose-400"><Trash2 size={14}/></button></div>)}</div>}
      <div className="border-t pt-3 space-y-2 text-xs"><div className="flex justify-between"><span>পণ্যের মোট</span><b>{taka(subtotal)}</b></div><div className="flex justify-between"><span>ডেলিভারি</span><b>{taka(delivery)}</b></div><div className="flex gap-2 pt-2"><input value={coupon} onChange={e=>setCoupon(e.target.value)} placeholder="কুপন কোড" className="flex-1 border rounded-xl px-3 py-2 text-xs uppercase"/><button type="button" onClick={applyCoupon} className="bg-slate-900 text-white rounded-xl px-3 text-xs font-bold">প্রয়োগ</button></div>{discount>0&&<div className="flex justify-between text-emerald-600"><span>ডিসকাউন্ট</span><b>-{taka(Math.min(discount,subtotal))}</b></div>}<div className="border-t pt-2 flex justify-between text-base"><b>সর্বমোট</b><b className="text-orange-600">{taka(total)}</b></div></div>
    </aside>
  </main>;
}