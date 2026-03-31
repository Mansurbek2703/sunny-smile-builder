

# WebQuest 2 — Javoblarni aralashtirish va "(Extra!)" olib tashlash

## Muammolar
1. **Step 3 (Match Holidays)**: "7. Thanksgiving (Extra!)" — "Extra" so'zi javobni ochib qo'yadi
2. **Step 3**: options tartibi javoblar bilan bir xil (Japan, Germany, France... ketma-ket)
3. **Step 5 (Video — Task A)**: options tartibi javoblar bilan bir xil
4. **Step 6 (Reading — Task III)**: options tartibi javoblar bilan bir xil
5. **Step 6 (Reading — Task VII)**: options tartibi javoblar bilan bir xil

## Yechim: `src/pages/WebQuest2.tsx`

### 1. Match Holidays (232-235 qatorlar)
- `"7. Thanksgiving (Extra!)"` → `"7. Thanksgiving"`
- Options aralashtiriladi: `["South Africa", "France", "Extra — no match", "Italy", "Japan", "Saudi Arabia", "Germany"]`
- correctAnswers o'zgarmaydi (qiymatlar string bo'lgani uchun)

### 2. Video Task A (294-295 qatorlar)
- Options aralashtiriladi: `["Celebrates military victory over foreign forces", "Commemorates the birth of a religious figure", "Marks gratitude for harvest and blessings", "Celebrates the end of a fasting period", "Remembers a miracle involving oil", "Focuses on a new beginning and family reunions"]`

### 3. Reading Task III (405-406 qatorlar)
- Options aralashtiriladi: `["Ensures inclusivity and comfort", "Shows respect for religious and cultural norms", "Encourages cultural adaptation", "Builds trust and community connections", "Prevents cultural offense", "Helps avoid misunderstandings"]`

### 4. Reading Task VII (442-443 qatorlar)
- Options aralashtiriladi: `["Keep an open mind", "Dress for the occasion", "Clarify food restrictions", "Be thoughtful with gifts", "Find a local guide"]`

Faqat 1 fayl, 4 joyda options tartibi o'zgaradi + 1 joyda "(Extra!)" olib tashlanadi. correctAnswers o'zgarmaydi.

