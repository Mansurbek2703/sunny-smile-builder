

# WebQuest 7 — Buyuk shaxslar rasmlarini tuzatish

## Muammo
Wikimedia Commons hotlinking ni bloklaydi — rasmlar brauzerda ochilmaydi.

## Yechim
6 ta hero portret rasmini Wikimedia dan yuklab, WebP formatga konvertatsiya qilib `public/images/webquest7/` ga saqlash, keyin `src/pages/WebQuest7.tsx` dagi URL larni lokal yo'llarga o'zgartirish.

### 1. Rasmlarni yuklab olish va konvertatsiya (lov-exec)
- `sharp` yordamida 6 ta rasmni Wikimedia dan yuklab, WebP formatga o'tkazish
- Saqlash: `public/images/webquest7/shakespeare.webp`, `gandhi.webp`, `davinci.webp`, `confucius.webp`, `mandela.webp`, `navoi.webp`

### 2. Kod o'zgarishi (`src/pages/WebQuest7.tsx`, 170-175 qatorlar)
6 ta Wikimedia URL ni lokal yo'llarga almashtirish:
```
/images/webquest7/shakespeare.webp
/images/webquest7/gandhi.webp
...
```

Faqat 6 ta `img` URL o'zgaradi.

