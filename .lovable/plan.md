

# Respondent ro'yxatga olish + Admin Panel — To'liq tizimli reja

## Umumiy arxitektura

```text
┌─────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  Index.tsx   │────▶│ Registration     │────▶│ WebQuest 1-7     │
│  (Asosiy)    │     │ Modal (1 marta)  │     │ (javoblar bazaga │
│              │     │ email, ism, kurs │     │  yoziladi)       │
└─────────────┘     └──────────────────┘     └──────────────────┘
                                                      │
                                                      ▼
                                              ┌──────────────────┐
                                              │  Supabase DB     │
                                              │  respondents     │
                                              │  responses       │
                                              │  activity_log    │
                                              └──────────────────┘
                                                      │
                                                      ▼
                                              ┌──────────────────┐
                                              │  /admin          │
                                              │  Login (hardcode)│
                                              │  Dashboard       │
                                              │  Export Excel    │
                                              └──────────────────┘
```

---

## 1-bosqich: Ma'lumotlar bazasi (Supabase migration)

### a) `respondents` jadvali
| Ustun | Turi | Izoh |
|---|---|---|
| id | uuid PK | auto |
| email | text NOT NULL UNIQUE | |
| first_name | text NOT NULL | Ism |
| last_name | text NOT NULL | Familiya |
| father_name | text | Otasining ismi |
| course_direction | text NOT NULL | Kurs + yo'nalish |
| university | text NOT NULL | Universitet nomi |
| registered_at | timestamptz | now() |

### b) `responses` jadvali
| Ustun | Turi | Izoh |
|---|---|---|
| id | uuid PK | auto |
| respondent_id | uuid FK → respondents | |
| quest_number | int | 1-7 |
| step_id | text | qadam nomi |
| task_id | text | topshiriq identifikatori |
| task_type | text | matching/open/truefalse/... |
| answer_data | jsonb | javob ma'lumotlari |
| is_correct | boolean NULL | to'g'ri/noto'g'ri (agar tekshirilsa) |
| created_at | timestamptz | now() |

### c) `activity_log` jadvali
| Ustun | Turi | Izoh |
|---|---|---|
| id | uuid PK | auto |
| respondent_id | uuid FK | |
| quest_number | int | |
| step_id | text | |
| action | text | "step_entered", "step_completed", "quest_started", "quest_completed" |
| duration_seconds | int NULL | shu qadamda o'tkazgan vaqti |
| created_at | timestamptz | now() |

RLS: respondents — INSERT (public), SELECT (own row by email match); responses va activity_log — INSERT (public), SELECT (faqat admin funksiya orqali).

---

## 2-bosqich: Respondent ro'yxatga olish modali

### Ishlash tartibi:
1. Foydalanuvchi Index sahifasida istalgan WebQuest kartasini bosganda — `localStorage` da `respondent_id` bormi tekshiriladi
2. Agar yo'q — **RegistrationModal** ochiladi (email, ism, familiya, otasining ismi, kurs+yo'nalish, universitet nomi)
3. Ma'lumotlar `respondents` jadvaliga INSERT qilinadi, `respondent_id` `localStorage` ga saqlanadi
4. Modal yopiladi, foydalanuvchi tanlagan WebQuest ga o'tadi
5. Keyingi safar boshqa WebQuestga kirganda modal chiqmaydi (1 marta to'ldiradi)

### Yangi komponentlar:
- `src/components/RegistrationModal.tsx` — form + validatsiya
- `src/hooks/useRespondent.ts` — localStorage + Supabase bilan ishlash

---

## 3-bosqich: Javoblarni yozib borish

Har bir quest komponentida (WebQuest1-7) mavjud task komponentlariga (`OpenQuestionTask`, `SelectMatchingTask`, `TrueFalseTask`, `FillBlanksTask`, `MultipleChoiceTask`, `MatchingTask`, `DragMatchingTask`) **onAnswer callback** qo'shiladi:

- Har safar javob berilganda `responses` jadvaliga INSERT
- Qadam o'zgarganda `activity_log` ga "step_entered" + oldingi qadamning `duration_seconds` yoziladi
- Quest boshlanishi va tugashi ham log qilinadi

### Yondashuv:
- `useResponseTracker(questNumber)` custom hook — javoblarni saqlash va faollik vaqtini kuzatish uchun
- Task komponentlariga `onAnswer` prop qo'shiladi (optional, backward-compatible)

---

## 4-bosqich: Admin panel (`/admin`)

### a) Admin login sahifasi
- **Supabase Auth ISHLATILMAYDI** (foydalanuvchi so'ragan hardcoded login/parol)
- Lekin **xavfsizlik uchun**: Edge Function orqali login — server tomonda `superadmin` / `specialforadmin1` tekshiriladi, JWT token qaytaradi
- Token `localStorage` da saqlanadi, admin sahifalari himoyalanadi

### b) Admin Dashboard (`/admin/dashboard`)

**Yuqori qism — Summary kartalar:**
- Jami respondentlar soni
- Jami javoblar soni
- Eng faol WebQuest
- O'rtacha vaqt (quest boshidan oxirigacha)

**Vizual tahlillar (recharts kutubxonasi):**
- **Bar chart**: Har bir WebQuest bo'yicha respondentlar soni
- **Pie chart**: Universitetlar bo'yicha taqsimot
- **Line chart**: Kunlik ro'yxatga olish dinamikasi
- **Heatmap/Bar**: Qaysi qadamlarda eng ko'p xatolar
- **Bar chart**: Kurslar bo'yicha taqsimot
- **Stacked bar**: WebQuest bo'yicha to'g'ri/noto'g'ri javoblar nisbati

**Filtrlar paneli:**
- Universitet nomi bo'yicha qidirish (autocomplete)
- Kurs bo'yicha filter
- WebQuest raqami bo'yicha filter
- Sana oralig'i (date range picker)
- Ism/email bo'yicha qidirish

**Respondentlar jadvali:**
- Sahifalangan (paginated) jadval
- Ustunlar: #, Ism, Familiya, Email, Universitet, Kurs, Ro'yxatga olingan sana, Ishlagan questlar soni
- Har bir respondentga bosganda — batafsil sahifa (barcha javoblari, vaqtlari)

**Excel eksport:**
- "Barchasini yuklab olish" tugmasi — barcha respondentlar + javoblar
- Filtr asosida yuklab olish — hozirgi filtr natijalari
- `xlsx` formatda (SheetJS kutubxonasi)
- Ustunlar: Ism, Familiya, Otasining ismi, Email, Universitet, Kurs, Quest raqami, Qadam, Topshiriq, Javob matni, To'g'ri/Noto'g'ri, Vaqt

---

## 5-bosqich: Routing

```
/admin         → AdminLogin
/admin/dashboard → AdminDashboard (himoyalangan)
```

`App.tsx` ga yangi lazy route qo'shiladi.

---

## Texnik detallar

### Yangi fayllar:
- `src/components/RegistrationModal.tsx`
- `src/hooks/useRespondent.ts`
- `src/hooks/useResponseTracker.ts`
- `src/pages/AdminLogin.tsx`
- `src/pages/AdminDashboard.tsx`
- `src/components/admin/DashboardStats.tsx`
- `src/components/admin/DashboardCharts.tsx`
- `src/components/admin/RespondentsTable.tsx`
- `src/components/admin/FilterPanel.tsx`
- `src/components/admin/ExcelExport.tsx`
- `supabase/functions/admin-login/index.ts`

### O'zgartiriladigan fayllar:
- `src/App.tsx` — yangi routelar
- `src/pages/Index.tsx` — quest kartasini bosganda registration tekshirish
- `src/pages/WebQuest1-7.tsx` — har biriga response tracking qo'shish

### Kutubxonalar:
- `recharts` — grafiklar
- `xlsx` (SheetJS) — Excel eksport
- `date-fns` — sana formatlash

---

## Qo'shimcha tavsiyalar (keyingi bosqichlar)

1. **Respondent progress tracker** — har bir respondent qaysi questlarni tugatganini ko'rsatish (asosiy sahifada progress bar)
2. **Avtomatik ball hisoblash** — matching/truefalse/multiplechoice topshiriqlarni avtomatik tekshirish va ball berish
3. **Respondent shaxsiy kabineti** — o'z natijalarini ko'rish imkoniyati
4. **Admin uchun email xabarnoma** — yangi respondent ro'yxatga olinganda bildirishnoma
5. **PDF sertifikat** — barcha questlarni tugatgan respondentlarga avtomatik sertifikat generatsiya qilish
6. **Comparative analytics** — universitetlar o'rtasida taqqoslash jadvallari
7. **Real-time monitoring** — hozir online bo'lgan respondentlar soni va faoliyati

---

## Amalga oshirish tartibi

Bu juda katta ish — uni **4 ta alohida bosqichda** amalga oshirish kerak:

| # | Bosqich | Tavsif |
|---|---|---|
| 1 | DB + Registration | Jadvallar yaratish + registration modal |
| 2 | Response tracking | Har bir WebQuestga javob yozish qo'shish |
| 3 | Admin login + dashboard | Admin panel: login, dashboard, grafiklar |
| 4 | Export + batafsil filtrlar | Excel eksport, ilg'or filtrlar, respondent tafsilotlari |

Birinchi bosqichdan boshlaymizmi?

