
# WebQuest 7 — correctAnswers teskari yozilgan, tuzatish

## Muammo
`correctAnswers` xaritasi `item_index → description_index` sifatida yozilgan, lekin komponent uni `description_index → item_index` sifatida tekshiradi (`assignments[di] === correctAnswers[di]`).

## Tuzatish: `src/pages/WebQuest7.tsx` (189-qator)

Items: 0=Mandela, 1=Da Vinci, 2=Navoi, 3=Shakespeare, 4=Confucius, 5=Gandhi
Descriptions: 0=Shakespeare, 1=Gandhi, 2=Da Vinci, 3=Confucius, 4=Mandela, 5=Navoi

To'g'ri xarita (desc → item):
- 0 (Shakespeare) → 3
- 1 (Gandhi) → 5
- 2 (Da Vinci) → 1
- 3 (Confucius) → 4
- 4 (Mandela) → 0
- 5 (Navoi) → 2

```
correctAnswers={{ 0: 3, 1: 5, 2: 1, 3: 4, 4: 0, 5: 2 }}
```

Faqat 1 qator o'zgaradi.
