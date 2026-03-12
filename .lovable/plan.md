

# WebQuest 2 — Reading "6 Tips" bo'limini to'liq yangilash

## O'zgarishlar

### 1. 3 ta kichik rasmni loyihaga nusxalash
- `user-uploads://image-50.png` → `public/images/webquest2/tip_dress.png`
- `user-uploads://image-51.png` → `public/images/webquest2/tip_gifts.png`
- `user-uploads://image-52.png` → `public/images/webquest2/tip_food.png`
- Oldingi approved rejadagi `user-uploads://image-49.png` → `public/images/webquest2/reading_hero.jpg` (tepadagi 2 rasm o'rniga)

### 2. `ReadingSection` komponentini yangilash (519-526 qatorlar)
Ixtiyoriy `image` prop qo'shiladi. Agar rasm berilsa, matn boshida chapda kichik hajmda (`w-14 h-14 float-left mr-3 mb-1 rounded-lg object-contain`) ko'rsatiladi — matn rasm atrofida oqadi.

### 3. `ReadingStep` ni to'liq qayta yozish (385-458 qatorlar)
- **Tepadagi 2 rasm** (`reading1.jpg`, `tips1.jpg`) o'rniga bitta `reading_hero.jpg` — `max-w-3xl mx-auto rounded-2xl shadow-xl`
- **6 ta qisqa tip** o'rniga foydalanuvchi yuborgan **to'liq matn** joylashtiriladi:
  - Kirish: 3 paragraf
  - Tip 1: Find a Local Guide (3 paragraf, rasmsiz)
  - Tip 2: Do Your Homework (3 paragraf + savollar ro'yxati, rasmsiz)
  - Tip 3: Dress for the Occasion — `tip_dress.png` rasm bilan
  - Tip 4: Be Thoughtful with Gifts — `tip_gifts.png` rasm bilan
  - Tip 5: Clarify Food Preferences — `tip_food.png` rasm bilan
  - Tip 6: Keep an Open Mind (3 paragraf, rasmsiz)
  - Xulosa paragraf (TKC superpowers)
- Mashqlar (Task III, V, VI, VII) aynan hozirgicha qoladi

