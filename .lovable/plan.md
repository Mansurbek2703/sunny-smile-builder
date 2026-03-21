

# WebQuest 5 — Rasmlar tez yuklanishini ta'minlash

## Muammo
Profiling natijalari:
- `infographic1.png` — **2.5MB**, 1254ms yuklanish
- `aysek_logo.png` — **1.7MB**, 1168ms yuklanish
- Boshqa rasmlar (culture_shock_reading.png, etiquette_reading.png, intro_culture.png) ham katta PNG fayllar

PNG formatdagi rasmlar juda og'ir — bu kechikishning asosiy sababi.

## Yechim

Rasmlarni siqib, WebP formatga o'tkazish orqali hajmini 5-10 baravar kamaytirish. Bu o'zgarish faqat rasmlarni optimallashtiradi, kodda boshqa hech narsa o'zgarmaydi.

### 1. Rasm fayllarni kompressiya qilish (lov-exec orqali)
- `sharp` kutubxonasi yordamida barcha WebQuest 5 PNG rasmlarni WebP formatga konvertatsiya qilish (sifat 80-85%)
- `aysek_logo.png` ni ham siqish
- Asl fayllarni yangi siqilgan versiyalar bilan almashtirish (`.webp` yoki siqilgan `.png`)

### 2. Kod o'zgarishlari (`src/pages/WebQuest5.tsx` + `src/components/SiteHeader.tsx`)
- Rasm `src` yo'llarini yangi `.webp` fayllarga o'zgartirish
- `decoding="async"` atributi qo'shish (brauzerga asinxron dekodlash imkonini beradi)
- `fetchPriority="low"` — lazy rasmlar uchun, `fetchPriority="high"` — logo uchun

### Kutilgan natija
- Rasm hajmi: ~2.5MB → ~200-400KB (har biri)
- Yuklanish vaqti: ~1200ms → ~100-200ms (har biri)
- Boshqa hech narsa o'zgarmaydi

