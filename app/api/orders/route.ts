import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, cart, zone, paymentMethod, trxId, subtotal, deliveryFee, discount, grandTotal } = body;

    if (!customer?.name || !customer?.phone || !customer?.address || !Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json({ error: "Required order information is missing." }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const orderNo = `DHAP-${Math.floor(100000 + Math.random() * 900000)}`;

    const { data: order, error: orderError } = await db.from("orders").insert({
      order_no: orderNo,
      customer_name: customer.name,
      phone: customer.phone,
      address: customer.address,
      zone,
      payment_method: paymentMethod,
      trx_id: trxId || null,
      status: "confirmed",
      subtotal,
      delivery_fee: deliveryFee,
      discount,
      grand_total: grandTotal
    }).select("id, order_no, status, grand_total, created_at").single();

    if (orderError) throw orderError;

    const rows = cart.map((item: any) => ({
      order_id: order.id,
      product_id: item.product?.id ?? null,
      product_name: item.product?.name ?? "Product",
      price: item.product?.price ?? 0,
      image: item.product?.images?.[0] ?? null,
      size: item.size,
      color: item.color,
      quantity: item.quantity
    }));

    const { error: itemsError } = await db.from("order_items").insert(rows);
    if (itemsError) throw itemsError;

    return NextResponse.json({ success: true, order });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Order could not be created." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ error: "Search query is required." }, { status: 400 });

  try {
    const db = getSupabaseAdmin();
    const { data: order } = await db.from("orders").select("*").or(`order_no.ilike.%${q}%,phone.ilike.%${q}%`).maybeSingle();
    if (!order) return NextResponse.json({ error: "Order not found." }, { status: 404 });

    const { data: items } = await db.from("order_items").select("*").eq("order_id", order.id);
    return NextResponse.json({ order: { ...order, items: items ?? [] } });
  } catch {
    return NextResponse.json({ error: "Tracking service is unavailable." }, { status: 500 });
  }
}