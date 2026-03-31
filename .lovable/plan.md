

# WebQuest 1 — Task I sarlavhalarni aralashtirish

## Muammo
Headinglar ketma-ket joylashgan: 1=A, 2=B, 3=C... Javob juda oson.

## Yechim: `src/pages/WebQuest1.tsx` (353-363 qatorlar)

Headinglar tartibini aralashtirish, correctAnswers mos ravishda yangilanadi:

| # | Heading (yangi tartib) | To'g'ri javob |
|---|---|---|
| 1 | Traditional Navruz food and drink | E |
| 2 | Conclusion | H |
| 3 | How Navruz is celebrated | A |
| 4 | Modern adaptations | G |
| 5 | The origins of Navruz | B |
| 6 | Legends and stories of Navruz | D |
| 7 | Navruz greetings | F |
| 8 | Regional and international variations | C |

```tsx
pairs={[
  { left: "1. Traditional Navruz food and drink", right: "Paragraph ___" },
  { left: "2. Conclusion", right: "Paragraph ___" },
  { left: "3. How Navruz is celebrated", right: "Paragraph ___" },
  { left: "4. Modern adaptations", right: "Paragraph ___" },
  { left: "5. The origins of Navruz", right: "Paragraph ___" },
  { left: "6. Legends and stories of Navruz", right: "Paragraph ___" },
  { left: "7. Navruz greetings", right: "Paragraph ___" },
  { left: "8. Regional and international variations", right: "Paragraph ___" },
]}
correctAnswers={{ 0: "E", 1: "H", 2: "A", 3: "G", 4: "B", 5: "D", 6: "F", 7: "C" }}
```

Faqat pairs tartibi va correctAnswers o'zgaradi. Paragraflar (A-H) o'zgarmaydi.

