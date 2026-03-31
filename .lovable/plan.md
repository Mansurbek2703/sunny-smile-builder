

# Tozalash tugmasi rangini o'zgartirish

## Muammo
Tozalash tugmasi `variant="outline"` bilan oq rangda ko'rinadi, boshqa tugmalar esa rangli (emerald, cyan).

## Yechim: `src/pages/AdminDashboard.tsx` (331-qator)

Hozirgi:
```
variant="outline" ... className="text-white border-blue-700 hover:bg-blue-800 text-sm"
```

Yangi (cyan rangda, boshqa tugmalardek):
```
className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-sm px-3"
```

`variant="outline"` olib tashlanadi. Faqat 1 qator o'zgaradi.

