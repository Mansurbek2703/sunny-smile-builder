
# WebQuest 1 — Sticky Header, Sticky Footer Navigation, Scrollable Content

## Maqsad
Header (SiteHeader) va footer (Previous/Next tugmalari) har doim ekranda ko'rinib turadi. Ular orasidagi kontent maydoni — agar kontent sig'sa to'liq ko'rinadi, sig'masa vertikal scroll bilan ishlaydi.

## Arxitektura o'zgarishlari

### 1. Umumiy layout — `flex flex-col h-screen`
Asosiy konteyner `min-h-screen` o'rniga `h-screen flex flex-col` bo'ladi. Bu headerga va footerga o'z tabiiy balandligini beradi, qolgan joy esa kontent uchun ajratiladi.

```text
+---------------------------+
| HEADER (sticky/fixed)     |  <-- SiteHeader, o'z balandligi
+---------------------------+
|                           |
|   SIDEBAR  |  CONTENT     |  <-- flex-1, overflow-y-auto
|            |  (scrollable)|
|                           |
+---------------------------+
| FOOTER (Previous / Next)  |  <-- shrink-0, pastda qotib turadi
+---------------------------+
```

### 2. Tuzilma o'zgarishlari (`src/pages/WebQuest1.tsx`)

- **Root div**: `min-h-screen` -> `h-screen flex flex-col overflow-hidden`
- **Header (`<SiteHeader />`)**: `shrink-0` qo'shiladi — balandligi o'zgarmaydi
- **O'rta qism (sidebar + content)**: `flex-1 overflow-hidden` — qolgan joyni egallaydi
  - **Sidebar**: `min-h-[calc(100vh-56px)]` o'rniga `h-full overflow-y-auto` bo'ladi
  - **Content (`<main>`)**: `flex-1 overflow-y-auto` — faqat kontent scroll qiladi
- **Navigation buttons (Previous/Next)**: hozirgi `<main>` ichidagi joydan chiqariladi va alohida `shrink-0` footer sifatida qo'yiladi — har doim ekran pastida ko'rinib turadi
- **Saytning eski footer** (developer info): nav tugmalar bilan birgalikda pastki qismda yoki faqat oxirgi stepda ko'rsatiladi

### 3. Mobil versiya
- Mobil top bar (`md:hidden sticky top-0`) saqlanadi
- Previous/Next tugmalari footerda barcha ekran o'lchamlarida ko'rinadi
- Kontent maydoni scroll qiladi

### 4. O'zgarmaydigan narsalar
- SiteHeader komponenti o'zgarmaydi
- Step content (StepContent) komponentlari o'zgarmaydi
- Sidebar navigatsiya o'zgarmaydi
- Fon rasmi va glassmorphism effektlari saqlanadi

## Texnik xulosa
Faqat `src/pages/WebQuest1.tsx` faylida layout tuzilmasi o'zgartiriladi — header va footer `shrink-0`, o'rtadagi kontent `flex-1 overflow-y-auto`.
