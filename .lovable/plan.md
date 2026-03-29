

# WebQuest 7 — Rasm-ism matching task (mobil + desktop)

## Yaxshi xabar
`DragMatchingTask` komponenti **allaqachon** ikkala rejimni qo'llab-quvvatlaydi:
- **Mobil**: rasmni bosish → kerakli ism qatorini bosish (tap-to-place)
- **Desktop**: rasmni sichqoncha bilan tutib, kerakli maydonga sudrab olib borish (drag-and-drop)

Faqat bitta kichik tuzatish kerak: mobil ko'rsatma matni hozir o'zbekcha va bayroqlar haqida ("Bayroqni bosing..."). Uni inglizchaga va rasmlar haqida qilib o'zgartirish kerak.

## O'zgarishlar

### 1. `src/components/quest/DragMatchingTask.tsx` (64-qator)
Mobil ko'rsatma matnini o'zgartirish:
- Hozirgi: `"Bayroqni bosing, keyin joylashtirish uchun qatorni bosing"`
- Yangi: `"Tap a picture, then tap the row to place it"`

### 2. `src/pages/WebQuest7.tsx`
- `DragMatchingTask` import qo'shish
- Step 2 dagi statik rasm-ism gridni `DragMatchingTask` ga almashtirish:
  - **Items**: 6 ta rasm (Shakespeare, Gandhi, Da Vinci, Confucius, Mandela, Navoi)
  - **Descriptions**: A–F harflari bilan ismlar
  - **correctAnswers**: `{{ 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }}`

2 ta fayl tahrirlanadi.

