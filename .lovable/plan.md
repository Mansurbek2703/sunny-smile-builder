

# WebQuest 7 — DOCX asosida to'liq qayta yozish

## Hozirgi holat
WebQuest 7 da faqat 5 ta oddiy qadam bor (Intro, Task, Research, Create, Reflection) va ular juda qisqa, DOCX dagi ko'p topshiriqlar va to'liq reading matni yo'q.

## DOCX tuzilishi (amalga oshirilishi kerak)

### Steps (sidebar qadam nomlari)
1. **Introduction** — Objective, Learning outcomes, intro matn
2. **Process & Tasks** — Match picture with name (rasm+nom), Task I (hero-description matching), Video Task II
3. **Reading** — Lead-in questions, Nelson Mandela to'liq reading matni (A-H paragraflar), Task II (heading-paragraph matching), Reading 2 link (Alisher Navoi)
4. **Research** — Task III (cultural hero tanlash va ma'lumot to'ldirish), Biography jadval, Major Contributions, Cultural Impact
5. **Create Product** — Task IV (Creative Digital Project: poster yoki podcast), Task V (Role-play Interview: 8 savollik intervyu), Interview structure
6. **Reflection** — Intercultural Reflection savollar, Self-Assessment Checklist, Conclusion

### Tafsiliy o'zgarishlar (`src/pages/WebQuest7.tsx`)

**a) Steps massivni yangilash** — 6 ta qadam:
- intro, process, reading, research, create, reflection

**b) IntroStep** — Hozirgi 2 ta qora rasm o'rniga Unsplash rasm (cultural heroes), Objective to'liq matn, Learning outcomes 5 ta

**c) ProcessStep (yangi)** — "Match picture with the name" (6 ta hero: Shakespeare=1, Gandhi=2, da Vinci=3, Confucius=4, Mandela=5, Navoi=6 — Unsplash rasmlar bilan SelectMatchingTask), Task I (hero A-F ni description 1-6 ga moslashtirish — SelectMatchingTask), VideoTask (YouTube link + 5 ta savol OpenQuestionTask)

**d) ReadingStep (yangi)** — Lead-in savollar, Mandela rasmi (Unsplash), to'liq reading matn (7 ta ReadingSection: intro + A-H paragraflar), Task II heading-paragraph matching (SelectMatchingTask: A-H → 7 ta heading), Reading 2 havola (Alisher Navoi — cabacter.com)

**e) ResearchStep** — Task III: Cultural hero tanlash (ro'yxat), OpenQuestionTask (Name, Country, Why hero, Biography aspects, 3 key achievements, Cultural impact savollar)

**f) CreateStep** — Task IV (poster/podcast talablari), Task V Role-play Interview (8 ta savol OpenQuestionTask), Interview structure ko'rsatmalar

**g) ReflectionStep** — Intercultural reflection savollar (OpenQuestionTask), Self-Assessment Checklist (6 ta), Conclusion card

### Rasmlar strategiyasi
- Intro uchun Unsplash rasm (cultural heroes theme)
- Reading uchun Mandela Unsplash rasm
- "Match picture with name" — Unsplash rasmlar har bir hero uchun (Shakespeare, Gandhi, da Vinci, Confucius, Mandela, Navoi)

### Infographic
- DOCX dagi infographic (page 16) ni hozircha qoldiramiz — alohida yuklash kerak bo'ladi

### Komponentlar ishlatiladi
- `ReadingSection` (WebQuest6 dan import pattern)
- `SelectMatchingTask` — hero-description matching, heading-paragraph matching
- `VideoTask` — YouTube video
- `OpenQuestionTask` — barcha yozma topshiriqlar
- `SelfEvalChecklist` — allaqachon mavjud

### Texnik yondashuv
- 1 ta fayl to'liq qayta yoziladi: `src/pages/WebQuest7.tsx`
- Barcha mavjud komponentlar import qilinadi (SelectMatchingTask, VideoTask, OpenQuestionTask)
- ReadingSection helper funksiya WebQuest6 dagi kabi yaratiladi
- Rasmlar Unsplash dan olinadi (ishonchli, tez yuklanadi)

