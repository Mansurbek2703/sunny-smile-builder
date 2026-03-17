

# Barcha WebQuest matnlarini 14px va Times New Roman ga o'zgartirish

## Yondashuv

**2 ta asosiy o'zgarish:**

### 1. Shrift o'zgartirish — `tailwind.config.ts` va `src/index.css`
- `font-display` va `font-body` ni `'Times New Roman', serif` ga o'zgartirish
- Google Fonts importini olib tashlash (endi kerak emas)
- `body` va `h1-h6` font-family ni Times New Roman ga yangilash

### 2. Matn hajmini 14px ga normalizatsiya — 18 ta fayl
Barcha WebQuest sahifalari (7 ta) va quest komponentlari (11 ta) ichidagi turli matn hajmlarini (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`) `text-sm` (14px) ga o'zgartirish.

**Istisnolar** (14px bo'lmaydi):
- Sarlavhalar (`h1`, `h2`, `h3`) — `text-base` (16px) qoladi, chunki ular kontent strukturasini ko'rsatadi
- Sidebar step labels — `text-sm` (14px)
- `text-[11px]` module labellar — `text-xs` (12px) ga o'tadi (UI element, kontent emas)

### O'zgariladigan fayllar
- `tailwind.config.ts` — font-family
- `src/index.css` — Google Fonts import olib tashlash, font-family
- `src/pages/WebQuest1-7.tsx` — text sizes
- 11 ta quest komponent — text sizes

