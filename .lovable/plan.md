

# WebQuest 1 — Reading matnlarini to'liq almashtirish + Thanksgiving birlashtirish

## O'zgarishlar (`src/pages/WebQuest1.tsx`)

### 1. Steps massivini yangilash (11 → 10 step)
- `{ id: "thanksgiving", label: "Reading — Thanksgiving" }` va `{ id: "thanksgiving-tasks", label: "Thanksgiving Tasks" }` → bitta `{ id: "thanksgiving", label: "Thanksgiving — Reading & Tasks", icon: BookOpen }`
- `StepContent` dan `case "thanksgiving-tasks"` o'chiriladi, `case "thanksgiving"` yangi `ThanksgivingStep()` ni chaqiradi

### 2. NavruzStep — to'liq A-H matn
Hozirgi 5 ta qisqa ReadingSection (A-E) o'rniga foydalanuvchi bergan to'liq matn:
- **Intro paragraf** (kirish — "Each spring, Uzbekistan bursts into colour...")
- **A** — Celebrations, sumalak, reconciliation (to'liq 3 abzats)
- **B** — Origins, Zoroastrian, equinox
- **C** — Regional variations (Iran, Kazakhstan, Fergana, Samarkand — 2 abzats)
- **D** — Legends (Zahhak, Kaveh — 2 hikoya)
- **E** — Food (sumalak, halim, kuk samsa)
- **F** — Greetings ("Navruz muborak!")
- **G** — Modern adaptations (concerts, eco-initiatives)
- **+ Navruz activities for children**
- **+ Navruz music and dance** (bakhshi, Lazgi, doira, nay)
- **+ Kupkari** (buzkashi, ot o'yinlari — 2 abzats)
- **+ Traditional fashion** (atlas, doppi, chapan)
- **+ Astrological meanings**
- **H** — Conclusion (2 abzats)

MatchingTask A-E dan **A-H gacha** kengaytiriladi (8 ta pair). VocabularyMatchTask o'zgarmaydi.

### 3. ThanksgivingStep — to'liq matn + tasklar bitta stepda
`ThanksgivingReadingStep` va `ThanksgivingTasksStep` birlashtiriladi. Reading qismi:
- **Intro paragraf** ("It's the most wonderful time of the year...")
- 🦃 Watch the Macy's Parade (to'liq)
- 🦴 Break the wishbone (to'liq)
- 🍗 Eat a traditional meal (to'liq)
- 😴 Take a nap (tryptophan haqida to'liq)
- 🙏 Share what you're thankful for (to'liq)
- 🏈 Watch football (to'liq)
- 🤝 Friendsgiving (to'liq)
- 🏃 Turkey trot (to'liq)
- 🛍️ Black Friday (to'liq)
- ❤️ Giving back + EF Academy (to'liq)

Pastida `border-t` bilan ajratilgan tasklar: OpenQuestionTask va SelectMatchingTask (hozirgi ThanksgivingTasksStep dagi).

### Natija
- 10 step (hozirgi 11 o'rniga)
- Navruz: to'liq A-H matn + 8 ta matching task
- Thanksgiving: to'liq reading + tasklar bitta sahifada

