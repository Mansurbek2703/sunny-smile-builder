

# Barcha WebQuest matnlarini 1 Tailwind o'lchamga kattalashtirish

Foydalanuvchi "2 o'lchamga" deganda har bir matn hajmini ~2px ga oshirishni nazarda tutmoqda (masalan, 10→12). Tailwind-da har bir qadam taxminan 2px, shuning uchun har bir text class bir pog'ona yuqoriga ko'tariladi:

| Hozirgi | Yangi | px o'zgarishi |
|---------|-------|--------------|
| `text-[9px]` | `text-[11px]` | +2px |
| `text-[13px]` | `text-[15px]` | +2px |
| `text-xs` (12px) | `text-sm` (14px) | +2px |
| `text-sm` (14px) | `text-base` (16px) | +2px |
| `text-base` (16px) | `text-lg` (18px) | +2px |
| `text-lg` (18px) | `text-xl` (20px) | +2px |
| `text-xl` (20px) | `text-2xl` (24px) | +4px |
| `text-2xl` (24px) | `text-3xl` (30px) | +6px |
| `text-3xl` (30px) | `text-4xl` (36px) | +6px |

## O'zgariladigan fayllar (18 ta)

### WebQuest sahifalari (7 ta):
- `src/pages/WebQuest1.tsx` — ~100+ text class
- `src/pages/WebQuest2.tsx` — ~100+ text class
- `src/pages/WebQuest3.tsx` — ~100+ text class
- `src/pages/WebQuest4.tsx` — ~100+ text class
- `src/pages/WebQuest5.tsx` — ~100+ text class
- `src/pages/WebQuest6.tsx` — ~100+ text class
- `src/pages/WebQuest7.tsx` — ~100+ text class

### Quest komponentlari (11 ta):
- `ComparisonTable.tsx`, `DragMatchingTask.tsx`, `FillBlanksTask.tsx`, `MatchingTask.tsx`, `MultipleChoiceTask.tsx`, `OpenQuestionTask.tsx`, `SelectMatchingTask.tsx`, `TrueFalseTask.tsx`, `VennDiagram.tsx`, `VideoTask.tsx`, `VocabularyMatchTask.tsx`

## Texnik yondashuv
Har bir faylda barcha `text-*` classlarini yuqoridagi jadvalga ko'ra almashtiriladi. Responsive classlar (`sm:text-sm` → `sm:text-base`) ham shu qoidaga amal qiladi. Sidebar va navigatsiya elementlari ham o'zgaradi — lekin sidebar kengligini mos ravishda sozlash kerak bo'lishi mumkin.

## Ehtiyotkorlik
- Sarlavhalar (`h1-h6`) va body matnlari bir xil qoida bilan kattalashtiriladi
- Mobil ko'rinishda `truncate` va `leading-tight` classlar saqlangan holda buzilishlar oldini olish uchun konteyner kengliklari tekshiriladi
- Sidebar matnlari kichikroq bo'lgani uchun ular ham proporsional kattalashadi

