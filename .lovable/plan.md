

# WebQuest 5 — Rasm ko'rinishi va yuklanish tezligini tuzatish

## Muammolar
1. **Etiquette rasm kesilib qolyapti**: `object-cover` + `max-h-[350px]` rasmni kesadi. `object-contain` bo'lishi kerak.
2. **Rasmlar kechikib yuklanadi**: Barcha rasmlar `loading="lazy"` — bo'lim ochilganda rasm darhol ko'rinmaydi. `loading="eager"` bo'lishi kerak.

## Yechim (`src/pages/WebQuest5.tsx`)

### 1. Etiquette rasm (218-qator)
- `object-cover` → `object-contain` (rasm to'liq ko'rinadi, kesilmaydi)
- `max-h-[350px]` → `max-h-[500px]` (infografik rasm balandroq bo'lishi uchun)
- `loading="lazy"` → `loading="eager"`

### 2. Barcha boshqa rasmlar ham `loading="eager"` ga o'tkaziladi
- 84-qator: infographic rasm
- 104-qator: intro rasm  
- 128-qator: culture shock reading rasm

Jami 4 ta `loading="lazy"` → `loading="eager"` o'zgarish + 1 ta `object-cover` → `object-contain`.

Boshqa hech narsa o'zgarmaydi.

