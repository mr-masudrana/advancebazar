# ধাপ.কম — Next.js + Tailwind + Supabase + Cloudinary

এই starter project-এ আপনার HTML storefront-কে Next.js App Router-এ ভাঙা হয়েছে।

## Included
- Responsive Bengali footwear storefront
- Product listing/search/category
- Product details, size/color/quantity
- LocalStorage cart + wishlist
- Guest checkout
- COD + MFS/TrxID fields
- Supabase orders/order_items schema
- Order tracking API
- Cloudinary-ready product image setup
- Vercel-ready Next.js structure

## 1. Install
```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2. Supabase
Supabase SQL Editor-এ `supabase/schema.sql` রান করুন।

Production-এ `SUPABASE_SERVICE_ROLE_KEY` শুধুমাত্র server-side environment variable হিসেবে রাখবেন।

## 3. Cloudinary
Cloudinary Dashboard থেকে:
- Cloud name নিন
- একটি unsigned upload preset তৈরি করুন
- `.env.local`-এ `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` ও `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` দিন

এই version-এর storefront এখন remote image URL ব্যবহার করছে। Admin product upload UI যোগ করার সময় Cloudinary unsigned upload বা server-side signed upload ব্যবহার করা যাবে।

## 4. Important architecture note
`lib/products.ts` fallback/demo catalog। Supabase-এ product rows থাকলে `/api/products` সেগুলো ফেরত দেয়। পরের ধাপে চাইলে Home page-কে সরাসরি Supabase product query-তে নেওয়া যায়।

## 5. Deploy to Vercel
GitHub-এ push করুন → Vercel → Import Project → Environment Variables যোগ করুন → Deploy.

Required:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
- NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
- NEXT_PUBLIC_WHATSAPP_NUMBER

## Security
- Supabase service role key কখনও `NEXT_PUBLIC_` prefix দিয়ে রাখবেন না।
- Client থেকে সরাসরি order insert না করে `/api/orders` server route ব্যবহার করা হয়েছে।
- Admin dashboard-এ authentication + authorization যোগ করার আগে service role দিয়ে public admin UI বানাবেন না.
