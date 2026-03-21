

# WebQuest 6 — Reading Manners bo'limini to'liqlashtirish

## O'zgarishlar

### 1. Rasmlar
2 ta yuklangan rasmni WebP formatga konvertatsiya qilib saqlash:
- `user-uploads://image-72.png` → `public/images/webquest6/manners_sandwich.webp`
- `user-uploads://image-73.png` → `public/images/webquest6/manners_indian.webp`

### 2. `src/pages/WebQuest6.tsx` — `Reading2Step` funksiyasi (163-176 qatorlar)
Hozirgi 6 ta qisqa `ReadingSection` o'rniga:

**a) 2 ta rasm grid** (tepada):
- `grid sm:grid-cols-2 gap-3 mb-3`
- Har bir rasm: `w-full h-auto rounded-xl shadow-md object-contain`, `loading="eager"`, `decoding="async"`

**b) To'liq reading matnlari** (foydalanuvchi bergan matn bo'yicha):

| Sarlavha | Mazmun |
|---|---|
| "Mind Your Manners: Introduction" | Kirish — dining etiquette, table manners, faux pas |
| "India & Italy" | Right hand only, cappuccino after 11am, pasta cutting sin |
| "China & Japan" | Burping = gratitude, slurping noodles, chopsticks in rice = bad omen |
| "USA & Ethiopia" | 15-20% tipping, injera flatbread, don't lick fingers |
| "Conclusion" | Expert local leader, do's and don'ts, true taste of culture |

**c) Topshiriqlar** (TrueFalseTask + OpenQuestionTask) — o'zgarmaydi, saqlanadi.

2 ta rasm WebP konvertatsiya + 1 fayl tahrir.

