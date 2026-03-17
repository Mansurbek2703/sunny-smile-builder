

# Barcha WebQuest matnlarini 18px (text-lg) ga o'zgartirish

Times New Roman allaqachon o'rnatilgan. Hozir barcha matnlar `text-sm` (14px). Ularni `text-lg` (18px) ga o'zgartirish kerak.

## O'zgarishlar

### 18 ta fayl — `text-sm` → `text-lg`

**7 ta sahifa:** `WebQuest1-7.tsx`
- Barcha kontent paragraflar, instruksiyalar, card matnlari: `text-sm` → `text-lg`
- Sarlavhalar (`h1-h3`): `text-base` → `text-xl` (ierarxiya saqlanadi)
- Sidebar/navigatsiya elementlari: `text-sm` saqlanadi (UI element, kontent emas)
- Module labellar (`text-[11px]`, `text-xs`): o'zgartirilmaydi

**11 ta komponent:** `OpenQuestionTask`, `VideoTask`, `ComparisonTable`, `VennDiagram`, `MatchingTask`, `FillBlanksTask`, `MultipleChoiceTask`, `SelectMatchingTask`, `TrueFalseTask`, `VocabularyMatchTask`, `DragMatchingTask`
- Barcha matn va input elementlari: `text-sm` → `text-lg`
- Komponent sarlavhalari: `text-base` → `text-xl`

**Saqlanadi (o'zgartirilmaydi):**
- Sidebar navigatsiya tugmalari (UI pattern)
- Module label taglar (`text-xs`, `text-[11px]`)
- Input placeholder styling

