

# WebQuest 1 — Step 4 va 5 ni birlashtirish

## Maqsad
"Reading — Navruz" (step 4) va "Navruz Tasks" (step 5) ni bitta sahifaga birlashtirish — talaba reading matnini o'qiy turib, savolarga javob yoza olishi uchun.

## O'zgarishlar (`src/pages/WebQuest1.tsx`)

### 1. Steps massividan bitta elementni olib tashlash
```text
Hozirgi (12 step):
  ... navruz-reading, navruz-tasks ...

Yangi (11 step):
  ... navruz (Reading + Tasks birgalikda) ...
```

`{ id: "navruz-reading", label: "Reading — Navruz" }` va `{ id: "navruz-tasks", label: "Navruz Tasks" }` o'rniga bitta `{ id: "navruz", label: "Navruz — Reading & Tasks", icon: BookOpen }` bo'ladi.

### 2. StepContent ichida bitta case
`case "navruz"` — ikkala komponent kontentini bitta sahifada ko'rsatadi:
- Yuqorida: Reading matnlari (rasmlar + A-E paragraflar)
- Pastda: Task I (Match headings) va Task II (VocabularyMatchTask)

Desktop versiyada reading va tasklar 2 ustunli grid (`md:grid-cols-2`) yoki vertikal ketma-ketlikda joylashtirilishi mumkin — kontent scroll qiladi.

### 3. Eski funksiyalar
`NavruzReadingStep()` va `NavruzTasksStep()` bitta `NavruzStep()` funksiyasiga birlashtiriladi.

## Boshqa fayllar
O'zgarish faqat `src/pages/WebQuest1.tsx` da.

