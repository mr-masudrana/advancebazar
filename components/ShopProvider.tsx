"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartItem, Product } from "@/lib/types";

type ShopContextType = {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size?: number, color?: string, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  changeQty: (key: string, delta: number) => void;
  toggleWishlist: (id: string) => void;
  clearCart: () => void;
};

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("dhap_cart");
      const w = localStorage.getItem("dhap_wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);

  useEffect(() => { localStorage.setItem("dhap_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("dhap_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const value = useMemo(() => ({
    cart,
    wishlist,
    addToCart: (product: Product, size = product.sizes[0], color = product.colors[0] || "Black", quantity = 1) => {
      const key = `${product.id}-${size}-${color}`;
      setCart(prev => {
        const found = prev.find(x => x.key === key);
        if (found) return prev.map(x => x.key === key ? { ...x, quantity: x.quantity + quantity } : x);
        return [...prev, { key, product, size, color, quantity }];
      });
    },
    removeFromCart: (key: string) => setCart(prev => prev.filter(x => x.key !== key)),
    changeQty: (key: string, delta: number) => setCart(prev => prev.flatMap(x => {
      if (x.key !== key) return [x];
      const q = x.quantity + delta;
      return q > 0 ? [{ ...x, quantity: q }] : [];
    })),
    toggleWishlist: (id: string) => setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]),
    clearCart: () => setCart([])
  }), [cart, wishlist]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}