# ঐতিহ্য ৬৪ (Oitijjo 64) — Frontend

> **৬৪ জেলার খাবার, ঐতিহ্য ও গল্প। আমার জেলা, আমার গর্ব।**  
> ডোমেইন: `oitijjo64.site`  
> ইভেন্ট প্রেক্ষাপট: ঐতিহ্যের হাট ৫.০, ২১ নভেম্বর ২০২৬  
> ভোটিং ডেডলাইন: ২১ নভেম্বর ২০২৬, রাত ১০:০০টা (বাংলাদেশ সময়, UTC+6)  

---

## 📌 প্রকল্পের পরিচিতি ও অনানুষ্ঠানিক উদ্যোগ ঘোষণা

ঐতিহ্য ৬৪ একটি স্বাধীন ও অনানুষ্ঠানিক শিক্ষার্থী/কমিউনিটি উদ্যোগ। এটি ঐতিহ্যের হাট ৫.০, ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি বা মূল আয়োজক কমিটির কোনো অফিসিয়াল ওয়েবসাইট নয় এবং তাদের দ্বারা পরিচালিত বা অনুমোদিত নয়। এই ওয়েবসাইটের ভোট, র‍্যাঙ্কিং বা ফলাফল মূল আয়োজনের বিচার, নম্বর, অবস্থান বা পুরস্কারে কোনো প্রভাব ফেলে না।

---

## 🚀 টেকনোলজি স্ট্যাক (Technology Stack)

- **ফ্রেমওয়ার্ক:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **প্রোগ্রামিং ল্যাঙ্গুয়েজ:** [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
- **স্টাইলিং:** [Tailwind CSS 3](https://tailwindcss.com/) + CSS Design Tokens
- **রাউটিং:** [React Router DOM v6](https://reactrouter.com/)
- **আইকনস:** [Lucide React](https://lucide.dev/)
- **পোস্টার জেনারেশন:** [html-to-image](https://github.com/bubkoo/html-to-image) (2x PNG Export + Web Share API)
- **টাইপোগ্রাফি:** Hind Siliguri / Noto Sans Bengali

---

## 📁 ফোল্ডার স্ট্রাকচার (Directory Structure)

```text
oitijjo64/
├── public/
│   └── images/               # স্ট্যাটিক অ্যাসেটস
├── src/
│   ├── app/
│   │   └── App.tsx           # মূল রাউটিং ও অ্যাপ এন্ট্রি
│   ├── components/
│   │   ├── common/           # SectionHeading, PageContainer, EmptyState, ইত্যাদি
│   │   ├── layout/           # Header, Footer, RootLayout
│   │   ├── home/             # Hero, Countdown, Stats, Leaderboard preview, ইত্যাদি
│   │   ├── districts/        # DistrictCard, Filters, Thumbnail
│   │   ├── district-detail/  # Hero, Foods, Heritage, Event, Action cards
│   │   ├── leaderboard/      # Podium, Table, Countdown banner
│   │   ├── voting/           # VoteDialog, VoteButton
│   │   └── poster/           # PosterCard, PosterControls
│   ├── context/
│   │   └── VoteContext.tsx   # গ্লোবাল ভোটিং ও মক অথ স্টেট
│   ├── data/
│   │   ├── districts.ts      # ৬৪ জেলার সিড ডেটাসেট
│   │   └── validation.ts     # রানটাইম ডেটাসেট ভ্যালিডেশন ইউটিলিটি
│   ├── services/
│   │   ├── districtService.ts# জেলা ডেটা অ্যাক্সেস সার্ভিস
│   │   ├── leaderboardService.ts # লিডারবোর্ড ও পরিসংখ্যান সার্ভিস
│   │   ├── voteService.ts    # ডেমো ভোট ও লোকালস্টোরেজ হ্যান্ডলার
│   │   └── authService.ts    # ডেমো গুগল অথেনটিকেশন সার্ভিস
│   ├── styles/
│   │   └── index.css         # ডিজাইন টোকেন ও গ্লোবাল রিসেট
│   ├── types/
│   │   └── index.ts          # গ্লোবাল টাইপস্ক্রিপ্ট ইন্টারফেস
│   ├── utils/
│   │   ├── constants.ts      # ব্র্যান্ড, ট্যাগলাইন ও ডেডলাইন কনস্ট্যান্টস
│   │   └── index.ts          # বাংলা সংখ্যা ফরম্যাটিং ইত্যাদি
│   ├── main.tsx              # ডম রেন্ডারার
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🛠️ ইনস্টলেশন ও লোকাল ডেভেলপমেন্ট (Local Setup)

### ১. ডিপেন্ডেন্সি ইনস্টল করুন
```bash
npm install
```

### ২. লোকাল ডেভেলপমেন্ট সার্ভার চালু করুন
```bash
npm run dev
```
ব্রাউজারে `http://localhost:3000` ঠিকানায় অ্যাপ্লিকেশনটি চালু হবে।

### ৩. প্রোডাকশন বিল্ড তৈরি করুন
```bash
npm run build
```
টাইপস্ক্রিপ্ট কম্পাইলেশন শেষে `dist/` ফোল্ডারে অপ্টিমাইজড বান্ডল তৈরি হবে।

---

## 📊 জেলা ডেটাসেট (District Dataset)

- সকল ৬৪ জেলার সিড ডেটা সংরক্ষিত রয়েছে: [`src/data/districts.ts`](file:///c:/Users/Assaduzzaman/Coding/oitijjo64/src/data/districts.ts)।
- ৮টি বিভাগের সঠিক বণ্টন:
  - ঢাকা: ১৩টি জেলা
  - চট্টগ্রাম: ১১টি জেলা
  - খুলনা: ১০টি জেলা
  - রাজশাহী: ৮টি জেলা
  - রংপুর: ৮টি জেলা
  - সিলেট: ৪টি জেলা
  - বরিশাল: ৬টি জেলা
  - ময়মনসিংহ: ৪টি জেলা
  - **সর্বমোট: ৬৪টি জেলা**
- জেলা তথ্য ও প্রদর্শনী তালিকা সম্পাদন করতে সরাসরি [`src/data/districts.ts`](file:///c:/Users/Assaduzzaman/Coding/oitijjo64/src/data/districts.ts) ফাইলে মান পরিবর্তন করলেই পুরো ওয়েবসাইটে তা রেন্ডার হবে।

---

## 🗳️ ডেমো ভোটিং ও টেস্ট রিসেট (Demo Voting & Reset)

এই ফ্রন্টএন্ড পর্যায়ে ভোটিং সম্পূর্ণ ক্লায়েন্ট-সাইড ডেমো হিসেবে কাজ করে:
1. যেকেউ যেকোনো পেজ লগইন ছাড়া ব্রাউজ করতে পারেন।
2. **ভোট দিন** বাটনে ক্লিক করলে গুগল সাইন-ইন মোডাল উন্মুক্ত হয়।
3. এক অ্যাকাউন্টে একটি ভোট সংরক্ষিত থাকে (লোকালস্টোরেজে `oitijjo64_demo_vote_v1` কী-এর মাধ্যমে)।
4. **টেস্টিংয়ের জন্য ভোট রিসেট করতে চাইলে:**
   - ব্রাউজারের ডেভটুলস কনসোলে গিয়ে `localStorage.clear()` চালান অথবা ব্রাউজার স্টোরেজ থেকে `oitijjo64_demo_vote_v1` ও `oitijjo64_demo_user_v1` মুছে দিন।
5. **ভোটের সময়সীমা:** ২১ নভেম্বর ২০২৬ রাত ১০:০০টা অতিক্রান্ত হলে স্বয়ংক্রিয়ভাবে ভোটিং বাটন নিষ্ক্রিয় হবে এবং সমাপ্তি নোটিশ প্রদর্শিত হবে।

---

## 🔌 ব্যাকএন্ড ইন্টিগ্রেশন নির্দেশনা (Future Django API Integration)

পরবর্তী ধাপে জ্যাঙ্গো ব্যাকএন্ড যুক্ত করার সময় শুধুমাত্র [`src/services/`](file:///c:/Users/Assaduzzaman/Coding/oitijjo64/src/services/) ডিরেক্টরির ফাইলগুলো এপিআই কলের সাথে রিপ্লেস করতে হবে:
1. `districtService.ts` -> `GET /api/districts/` ও `GET /api/districts/:slug/`
2. `leaderboardService.ts` -> `GET /api/leaderboard/`
3. `voteService.ts` -> `POST /api/votes/` (সার্ভার-সাইডে গুগল আইডি টোকেন ভ্যালিডেশন এবং পোস্টগ্রেএসকিউএলে ইউনিক কনস্ট্রেইন্ট দিয়ে এক-ভোট নিশ্চিতকরণ)
4. `authService.ts` -> অফিসিয়াল `@react-oauth/google` SDK ব্যবহার করে গুগল ক্রেডেনশিয়াল হ্যান্ডলিং।
UI কম্পোনেন্টগুলোতে কোনো পরিবর্তন করার প্রয়োজন হবে না।

---

## 📜 লাইসেন্স ও স্বত্বাধিকার

© ২০২৬ ঐতিহ্য ৬৪ (`oitijjo64.site`) — একটি স্বাধীন ও অলাভজনক কমিউনিটি উদ্যোগ।

