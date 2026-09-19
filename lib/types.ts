export type Category = "sneakers" | "formal" | "sports" | "casual" | "boots";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  original_price: number;
  rating: number;
  reviews_count: number;
  images: string[];
  sizes: number[];
  colors: string[];
  badge: string | null;
  in_stock: boolean;
  short_desc: string;
  full_desc: string;
  features: string[];
};

export type CartItem = {
  key: string;
  product: Product;
  size: number;
  color: string;
  quantity: number;
};

export type Order = {
  id: string;
  order_no: string;
  customer_name: string;
  phone: string;
  address: string;
  zone: "inside" | "outside";
  payment_method: "cod" | "mfs";
  trx_id?: string | null;
  status: string;
  subtotal: number;
  delivery_fee: number;
  discount: number;
  grand_total: number;
  items: CartItem[];
  created_at: string;
};