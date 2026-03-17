

# Barcha WebQuest matnlarini kuchli kontrast rangga o'zgartirish

## Muammo
Hozir ko'plab matnlar `text-muted-foreground` classini ishlatadi — bu `hsl(220, 12%, 40%)` rangni beradi (kulrang, past kontrastli). Reading bo'limlari va boshqa kontent matnlari yetarlicha o'qilmaydi.

## Yechim
Barcha kontent/reading matnlarini `text-foreground` (kuchli qora — `hsl(220, 25%, 12%)`) ga o'zgartirish. Navigatsiya va yordamchi elementlarni `text-primary` (kuchli moviy — `hsl(220, 50%, 40%)`) ga o'zgartirish.

## Qoidalar

| Element turi | Hozirgi | Yangi |
|---|---|---|
| Reading paragraflar, task instructions | `text-muted-foreground` | `text-foreground` |
| Sidebar inactive items | `text-muted-foreground` saqlanadi (navigatsiya uchun mos) |
| Step counter ("1/7") | `text-muted-foreground` | `text-primary` |
| Quest komponent instructions | `text-muted-foreground` | `text-foreground` |
| Placeholder text (`placeholder:text-muted-foreground/40`) | saqlanadi |

## O'zgariladigan fayllar (12 ta)

### WebQuest sahifalari (7 ta)
`WebQuest1-7.tsx` — barcha `<p>` va matn elementlaridagi `text-muted-foreground` → `text-foreground`. Sidebar navigatsiya elementlarida faqat `hover:text-foreground` saqlanadi, inactive holatda `text-muted-foreground` qoladi (chunki bu UX pattern).

### Quest komponentlari (5 ta)
- `VideoTask.tsx` — instruction text
- `MultipleChoiceTask.tsx` — option letters
- `DragMatchingTask.tsx` — instruction, numbering
- `MatchingTask.tsx` — right column text
- `VennDiagram.tsx` — "Both" label

Placeholder ranglar (`placeholder:text-muted-foreground/40`) o'zgartirilmaydi — ular input holati uchun mos.

