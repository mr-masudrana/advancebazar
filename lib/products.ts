import { Product } from "./types";

const img = (id: string) => `https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=80`;

export const PRODUCTS: Product[] = [
  {
    id: "1", name: "স্নিকার্স প্রো এয়ার আল্ট্রা", category: "sneakers", price: 1850, original_price: 2600,
    rating: 4.8, reviews_count: 42,
    images: [img("photo-1542291026-7eec264c27ff"), img("photo-1608231387042-66d1773070a5"), img("photo-1595950653106-6c9ebd614d3a")],
    sizes: [40,41,42,43,44], colors: ["Black","White","Grey"], badge: "সেরা পছন্দ", in_stock: true,
    short_desc: "আল্ট্রা-লাইট ব্রিদেবল ফ্যাব্রিক ও শক-অ্যাবজরবিং এয়ার কুশন সোলের প্রিমিয়াম স্নিকার্স।",
    full_desc: "দৈনন্দিন হাঁটা, রানিং কিংবা ফ্যাশনেবল ক্যাজুয়াল পরিধানের জন্য এটি অতুলনীয়। ভেতরে রয়েছে আরামদায়ক মেমরি ফোম এবং ওয়াটার-রেসিস্ট্যান্ট কোটিং।",
    features: ["লাইটওয়েট ব্রিদেবল মেশ আপার","শক-অ্যাবজরবিং রাবার আউটসোল","স্মুথ মেমরি ফোম ইনসোল","অ্যান্টি-স্লিপ গ্রিপ প্রযুক্তি"]
  },
  {
    id: "2", name: "লেদার প্রিমিয়াম ফর্মাল শু", category: "formal", price: 2450, original_price: 3200,
    rating: 4.9, reviews_count: 35,
    images: [img("photo-1614252235316-8c857d38b5f4"), img("photo-1533867617858-e7b97e060509")],
    sizes: [39,40,41,42,43], colors: ["Black","Brown"], badge: "১০০% লেদার", in_stock: true,
    short_desc: "১০০% জেনুইন লেদার দিয়ে নিখুঁত হ্যান্ডক্র্যাফটেড ফর্মাল শু।",
    full_desc: "উচ্চমানের চামড়া ও দীর্ঘস্থায়ী রাবার সোল দিয়ে প্রস্তুত। অফিস, মিটিং বা অনুষ্ঠানে ক্লাসি লুক প্রদান করবে।",
    features: ["১০০% জেনুইন অরিজিনাল লেদার","হাতে সেলাই করা প্রিমিয়াম ফিনিশ","অ্যান্টি-ব্যাকটেরিয়াল সফট লাইনিং","ক্লাসিক ডার্বি ডিজাইন"]
  },
  {
    id: "3", name: "স্পোর্টস রানিং লাইটওয়েট", category: "sports", price: 1350, original_price: 1950,
    rating: 4.7, reviews_count: 58,
    images: [img("photo-1551107696-a4b0c5a0d9a2"), img("photo-1542291026-7eec264c27ff")],
    sizes: [40,41,42,43], colors: ["Black","Blue"], badge: "অফার", in_stock: true,
    short_desc: "জিম ও দ্রুত রানিং করার জন্য অত্যন্ত হালকা ও ফ্লেক্সিবল স্পোর্টস জুতা।",
    full_desc: "ইভা ফোম সোলের তৈরি যা প্রতিটি পদক্ষেপে আরাম জোগায়। সহজে পরিষ্কারযোগ্য এবং বাতাস চলাচলের উপযোগী।",
    features: ["ইভা আল্ট্রাফ্লেক্স সোল","হিট-ডিসিপেশন প্রযুক্তি","ফ্লেক্সিবল ব্যালেন্স সাপোর্ট"]
  },
  {
    id: "4", name: "ক্যাজুয়াল লোফার স্লিপ-অন", category: "casual", price: 1550, original_price: 2200,
    rating: 4.6, reviews_count: 19,
    images: [img("photo-1533867617858-e7b97e060509"), img("photo-1614252235316-8c857d38b5f4")],
    sizes: [40,41,42,44], colors: ["Black","Brown"], badge: null, in_stock: true,
    short_desc: "ফিতা বাঁধার ঝামেলা ছাড়াই আরামদায়ক স্লিপ-অন ক্যাজুয়াল লোফার।",
    full_desc: "জিন্স বা চিনো প্যান্টের সাথে সহজে মানিয়ে যায়। সারাদিন পরে থাকলেও আরামদায়ক।",
    features: ["ইজি স্লিপ-অন ডিজাইন","সফট ভেলভেট টাচ লাইনিং","ডাবল স্টিচড ডিউরাবিলিটি"]
  },
  {
    id: "5", name: "ক্লাসিক হাই-টপ আরবান স্নিকার্স", category: "sneakers", price: 2150, original_price: 2900,
    rating: 4.8, reviews_count: 64,
    images: [img("photo-1525966222134-fcfa99b8ae77"), img("photo-1542291026-7eec264c27ff")],
    sizes: [40,41,42,43], colors: ["Black","White"], badge: "জনপ্রিয়", in_stock: true,
    short_desc: "স্ট্রিটওয়্যার স্টাইলের হাই-টপ স্নিকার্স।",
    full_desc: "অ্যাঙ্কেল সাপোর্টসহ ক্লাসিক রেট্রো লুক। টেকসই ক্যানভাস ও ভলকানাইজড রাবার সোলের তৈরি।",
    features: ["হাই-টপ অ্যাঙ্কেল প্রোটেকশন","ভলকানাইজড গ্রিপ আউটসোল","রেট্রো আরবান আর্ট ডিজাইন"]
  },
  {
    id: "6", name: "কমফোর্ট হাইকিং ও ট্র্যাকিং বুট", category: "boots", price: 2750, original_price: 3800,
    rating: 4.9, reviews_count: 29,
    images: [img("photo-1520639888713-7851133b1ed0"), img("photo-1533867617858-e7b97e060509")],
    sizes: [41,42,43,44], colors: ["Black","Brown"], badge: "ওয়াটারপ্রুফ", in_stock: true,
    short_desc: "রুক্ষ পথ ও ভ্রমণের জন্য ওয়াটারপ্রুফ হেভি-ডিউটি ট্র্যাকিং বুট।",
    full_desc: "কঠিন পাথর ও পাহাড়ি পথে দৃঢ় গ্রিপের জন্য ডিপ লাগ রাবার সোল।",
    features: ["ওয়াটার-রেপেলেন্ট চামড়া ও ফেব্রিক","হেভি ডিউটি ট্র্যাকিং লুগসোল","মেটাল আইলেট লেস সিস্টেম"]
  },
  {
    id: "7", name: "সফট ফোম ডেলি স্লিপার্স", category: "casual", price: 850, original_price: 1200,
    rating: 4.5, reviews_count: 82,
    images: [img("photo-1603808033192-082d6919d3e1")],
    sizes: [40,41,42], colors: ["Black","Blue"], badge: "বেস্ট সেলার", in_stock: true,
    short_desc: "বাসায় ও আশেপাশে হাঁটার জন্য আল্ট্রা সফট ফোম স্যান্ডেল স্লিপার।",
    full_desc: "ক্লাউড কুশন ফোম, ওয়াটারপ্রুফ ও সহজে শুকায়।",
    features: ["আল্ট্রা-সফট ক্লাউড ফোম","অ্যান্টি-স্লিপ বাথ ও টাইলস ফ্রেন্ডলি"]
  },
  {
    id: "8", name: "প্রিমিয়াম অক্সফোর্ড ব্রাউন শু", category: "formal", price: 2650, original_price: 3400,
    rating: 4.9, reviews_count: 31,
    images: [img("photo-1595950653106-6c9ebd614d3a"), img("photo-1614252235316-8c857d38b5f4")],
    sizes: [40,41,42,43], colors: ["Brown","Black"], badge: "এক্সক্লুসিভ", in_stock: true,
    short_desc: "ব্রাউন ফিনিশ খাঁটি লেদারের অক্সফোর্ড শু।",
    full_desc: "উন্নত ফিনিশিং এবং দীর্ঘস্থায়ী আরাম। শার্ট-প্যান্ট বা ব্লেজারের সাথে চমৎকার মিলবে।",
    features: ["উচ্চমানের চামড়া ও টেকসই সোল","স্মার্ট ক্লাসিক্যাল শেপ"]
  }
];

export const CATEGORY_NAMES: Record<string,string> = {
  all: "সকল জুতা", sneakers: "স্নিকার্স", formal: "ফর্মাল শু", sports: "স্পোর্টস", casual: "ক্যাজুয়াল ও স্লিপার", boots: "বুটস"
};