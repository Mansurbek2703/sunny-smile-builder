

# Submit tugmasi + Congratulations sahifasi + Javoblarni tekshirish

## 1. Har bir WebQuest reflection bo'limida o'zgarish (7 ta fayl)

Har bir WebQuest (1-7) dagi reflection step'dagi `Congratulations` Card o'rniga **"Submit" tugmasi** qo'yiladi. Tugma bosilganda:
- `activity_log` ga `quest_completed` yoziladi
- `/quest/{n}/complete` sahifasiga yo'naltiriladi

## 2. Yangi `QuestCompletePage.tsx` komponenti

Bitta universal sahifa yaratiladi — `src/pages/QuestCompletePage.tsx`:
- URL parametridan quest raqamini oladi (`/quest/:id/complete`)
- Har bir quest uchun o'ziga xos congratulations matni (massivda saqlanadi)
- Chiroyli dizayn: confetti effekt, quest nomi, congrat matn
- "Keyingi WebQuest" tugmasi (quest 7 da — "Bosh sahifaga qaytish")
- Respondent ID yo'q bo'lsa — bosh sahifaga redirect

## 3. Routing (`src/App.tsx`)

Yangi route qo'shiladi:
```
/quest/:id/complete → QuestCompletePage
```

## 4. Javoblarni aniq tekshirish

Hozirgi task komponentlari (`MultipleChoiceTask`, `TrueFalseTask`, `SelectMatchingTask`, `MatchingTask`, `FillBlanksTask`) allaqachon `trackAnswer()` chaqirib, `is_correct` ni bazaga yozadi. Bu qism ishlaydi — o'zgartirish kerak emas.

## Jami o'zgarishlar

| Fayl | O'zgarish |
|---|---|
| `src/pages/QuestCompletePage.tsx` | **Yangi** — universal congrat sahifa |
| `src/App.tsx` | Route qo'shish |
| `src/pages/WebQuest1.tsx` | Congrat Card → Submit tugma |
| `src/pages/WebQuest2.tsx` | Congrat Card → Submit tugma |
| `src/pages/WebQuest3.tsx` | Congrat Card → Submit tugma |
| `src/pages/WebQuest4.tsx` | Congrat Card → Submit tugma |
| `src/pages/WebQuest5.tsx` | Congrat Card → Submit tugma |
| `src/pages/WebQuest6.tsx` | Congrat Card → Submit tugma |
| `src/pages/WebQuest7.tsx` | Congrat Card → Submit tugma |

9 ta fayl (1 yangi + 8 tahrir).

