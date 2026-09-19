import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { PRODUCTS } from "@/lib/products";

export async function GET() {
  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db.from("products").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ products: PRODUCTS, source: "fallback", error: error.message });
    return NextResponse.json({ products: data?.length ? data : PRODUCTS, source: data?.length ? "supabase" : "fallback" });
  } catch {
    return NextResponse.json({ products: PRODUCTS, source: "fallback" });
  }
}