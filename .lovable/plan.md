

# Admin Panel dizaynini yaxshilash

## Muammolar
1. Header dagi Excel tugmalari matnlari ko'rinmayapti (matn kichik, rang past kontrast)
2. Logo yo'q navbarda
3. Umumiy dizayn kontrastni kuchaytirish kerak

## O'zgarishlar

### 1. `src/pages/AdminDashboard.tsx` — Header (205-218 qatorlar)
- Logo qo'shish: `<img src="/images/webquest6/aysek_logo.webp" />` (mavjud logo)
- Excel tugmalari: `bg-emerald-600 hover:bg-emerald-700 text-white font-medium` — yashil fon, oq matn, aniq ko'rinadigan
- Tugma matnlarini kattalashtirish: `text-sm` → o'lchamni oshirish
- Header fonini `bg-blue-900/90` qilish

### 2. `src/pages/AdminDashboard.tsx` — Umumiy dizayn
- Asosiy fon: `bg-slate-900` → `bg-blue-950` (moviy)
- Kartalar: `bg-slate-800` → `bg-blue-900/60 border-blue-800`
- Matnlar kontrastini kuchaytirish: `text-slate-300` → `text-white`, `text-slate-400` → `text-gray-300`
- Filtrlar: `bg-slate-700` → `bg-blue-900 border-blue-700`
- Jadval sarlavhalari: `text-slate-400` → `text-cyan-300`

### 3. `src/pages/AdminLogin.tsx` — Login sahifasi
- Fon: `from-slate-900` → `from-blue-950 via-blue-900 to-blue-950`
- Karta: `bg-slate-800/80` → `bg-blue-900/80 border-blue-700`
- Logo qo'shish login sahifasiga ham

2 ta fayl tahrirlanadi, boshqa hech narsa o'zgarmaydi.

