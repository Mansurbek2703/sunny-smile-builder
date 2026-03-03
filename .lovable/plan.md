
# WebQuest 2-7 — Step-by-Step Layout va Rasm Tuzatishlari

## Umumiy maqsad
Barcha WebQuest sahifalarini (2-7) WebQuest 1 dagi kabi step-by-step navigatsiya tizimiga o'tkazish: sticky header, sticky footer (Previous/Next), sidebar, scrollable kontent. Buzilgan/ko'rinmaydigan rasmlarni generatsiya qilib almashtirish, sifatsiz "qalam" rasmlarini olib tashlash, har bir WebQuest uchun faqat 1 ta infografik qoldirish.

## Har bir WebQuest uchun o'zgarishlar

### Umumiy arxitektura o'zgarishi (barcha 6 ta fayl uchun bir xil)
Hozirgi accordion (QuestSection + toggle) tuzilmasi o'rniga WebQuest 1 dagi kabi:

```text
+---------------------------+
| HEADER (sticky)           |
+---------------------------+
| SIDEBAR  |  CONTENT       |
| (steps)  |  (scrollable)  |
+---------------------------+
| FOOTER (Previous / Next)  |
+---------------------------+
```

- `h-screen flex flex-col overflow-hidden` root container
- Desktop sidebar (`w-52`, gradient border)
- Mobile hamburger menu
- `AnimatePresence mode="wait"` step transitions
- Sticky footer navigation buttons
- Hero section accordion o'rniga birinchi step (Introduction) ichiga qo'shiladi

### WebQuest 2 — Holidays Around the World
**Steps:** Infographic, Introduction, Task (Match Holidays), Discussion & Vocabulary, Video Tasks, Reading (6 Tips), Research, Conclusion
**Rasm tuzatishlari:**
- `hero1.jpg`, `hero2.jpg` — qora/ko'rinmaydigan. 2 ta yangi rasm generatsiya qilinadi (jahon bayramlari mavzusida)
- Infographic: faqat `infographic2.jpg` (`holidays_world.jpg`) qoldiriladi, birinchisi o'chiriladi (yoki 1 taga birlashtiriladi)
- 4 ta kichik rasm (carnival, tomatina, cherry_blossom, day_of_dead) — tekshirilib, buzilganlar almashtiriladi

### WebQuest 3 — Cultural Stereotypes
**Steps:** Infographic, Introduction, Video Task, Cultural Idioms, Vocabulary, Reading, Observations, Conclusion
**Rasm tuzatishlari:**
- `infographic1.jpg` — ko'rinmayapti (screenshot'da). 1 ta infografik qoldiriladi
- `idioms.png` — katta qalam rasmi. **Olib tashlanadi**
- `hero1.jpg`, `hero2.jpg` — tekshiriladi, kerak bo'lsa almashtiriladi
- `reading1.jpg`, `reading2.jpg` — sifatsiz bo'lsa almashtiriladi

### WebQuest 4 — City Through Tourist Eyes
**Steps:** Infographic, Introduction, Match Landmarks, Travel Idioms, Video Task, Reading (Turkey), Research, Reflection
**Rasm tuzatishlari:**
- `idioms.png` — katta qalam rasmi. **Olib tashlanadi**
- Infographic: 1 taga qisqartiriladi
- `landmark1-10.jpg` — tekshiriladi
- `hero1.jpg`, `hero2.jpg`, `turkey1.jpg`, `turkey2.jpg` — tekshiriladi

### WebQuest 5 — Culture Shock & Etiquette
**Steps:** Infographic, Introduction, Idioms Task, Vocabulary, Reading (Culture Shock), Etiquette Reading, Video Task, Research, Reflection
**Rasm tuzatishlari:**
- Infographic: 1 taga qisqartiriladi
- `hero1.jpg`, `hero2.jpg` — tekshiriladi
- `culture_shock.jpg`, `etiquette1.jpg`, `etiquette2.jpg` — tekshiriladi

### WebQuest 6 — Food Culture & Dining
**Steps:** Infographic, Introduction, Video Task, Reading 1 (Culinary), Reading 2 (Manners), Discussion, Research, Reflection
**Rasm tuzatishlari:**
- Infographic: 1 taga qisqartiriladi
- `hero1.jpg` — tekshiriladi
- `reading1.jpg`, `reading2.jpg` — tekshiriladi

### WebQuest 7 — Cultural Heroes
**Steps:** Introduction, Task, Research, Create, Reflection
**Rasm tuzatishlari:**
- `hero1.jpg`, `hero2.jpg` — tekshiriladi
- `game1.jpg` — tekshiriladi
- Bu WebQuestda infografik yo'q — qo'shilmaydi (chunki kontent boshqacha)

## Texnik amalga oshirish tartibi

### 1-bosqich: Rasmlarni tekshirish va generatsiya
- Brauzerda barcha WebQuest sahifalarini ochib, qaysi rasmlar qora/buzilgan ekanini aniqlash
- Buzilgan rasmlar o'rniga mavzuga mos fotorealistik 16:9 rasmlar generatsiya qilish
- `idioms.png` rasmlarini (WQ3, WQ4) olib tashlash
- Har bir WQ uchun infografikani 1 taga qisqartirish

### 2-bosqich: WebQuest 2 ni step-by-step layoutga o'tkazish
- `steps` array yaratish (barcha sectionlardan)
- Hero va accordion tuzilmasini olib tashlash
- WebQuest 1 dagi sidebar + footer + step-content arxitekturasini qo'llash
- Barcha mavjud komponentlar (SelectMatchingTask, VocabularyMatchTask, etc.) saqlanadi

### 3-bosqich: WebQuest 3 ni step-by-step layoutga o'tkazish
- Xuddi shu pattern

### 4-bosqich: WebQuest 4 ni step-by-step layoutga o'tkazish

### 5-bosqich: WebQuest 5 ni step-by-step layoutga o'tkazish

### 6-bosqich: WebQuest 6 ni step-by-step layoutga o'tkazish

### 7-bosqich: WebQuest 7 ni step-by-step layoutga o'tkazish

## O'zgarmaydigan narsalar
- Barcha quest komponentlari (SelectMatchingTask, VocabularyMatchTask, VideoTask, TrueFalseTask, MultipleChoiceTask, FillBlanksTask, OpenQuestionTask, ComparisonTable)
- SiteHeader komponenti
- Javoblar va task logikasi
- ReadingSection va SelfEvalChecklist helper komponentlari (har bir faylda saqlanadi)

## Natija
- Barcha 7 ta WebQuest bir xil professional ko'rinishga ega bo'ladi
- Sticky header + footer, sidebar navigatsiya
- Sifatli, ko'rinadigan rasmlar
- Mobil va desktopda chiroyli ishlaydi
