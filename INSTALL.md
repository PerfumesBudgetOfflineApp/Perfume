# 🚀 Process App v6 — Glossary & Encyclopedia + Tier 1 Brands

## ✨ ما الجديد في v6

### 1. 📚 المعجم والموسوعة (Glossary & Encyclopedia)
- إعادة تسمية كاملة لصفحة Glossary
- **تبويبان منفصلان:**
  - 📖 **المعجم (Glossary)** — مصطلحات عطرية (10 مصطلحات)
  - 🌙 **الموسوعة (Encyclopedia)** — قصص دور العطور (5 قصص بدئية)
- بنية بيانات جديدة: `entry_type` (term | story)
- تصميم قراءة قبل النوم بأسلوب الكتب (Cormorant Garamond + Amiri)

### 2. 🏛️ Tier 1 Brands — 5 براندات مكتملة
كل براند: عطور كاملة + قصة أدبية باللغتين

| البراند | عطور | قصة |
|---|---:|:---:|
| Chanel | 29 | (قادم) |
| Dior | 25 | (قادم) |
| Burberry | 33 | ✅ |
| Prada | 19 | ✅ |
| Maison Francis Kurkdjian | 21 | ✅ |
| Tom Ford | 23 | ✅ |
| Carolina Herrera | 19 | ✅ |

### 3. 💬 نظام الاقتباسات الموحّد
- 4,415 اقتباس فريد
- 17 تصنيف موحد
- صفحة fit-to-screen مع تصدير PDF نمط الكتاب

---

## 📊 الإحصاء الكامل

| المقياس | القيمة |
|---|---:|
| براندات إجمالاً | 1,397 |
| براندات لها عطور | 327 |
| **عطور إجمالاً** | **628** |
| اقتباسات | 4,415 |
| تصنيفات | 17 |
| نوتات | 1,828 |
| عطّارين | 217 |
| **مدخلات المعجم** | **15** |
| **قصص الموسوعة** | **5** |

---

## 🌱 آلية الزرع (Auto-Seeding)

### عند `npm run build`:
Vite يجمع كل ملفات JSON ويضمّها في APK.

### عند أول فتح للتطبيق:
1. `AutoSeedSplash.jsx` يتحقق: IndexedDB فاضي؟
2. إذا نعم → `seedAllLocal()` تنطلق تلقائياً
3. تزرع بالترتيب:
   - Brands → Notes → Perfumers → Perfumes → **Glossary** → Quotes → Wisdom
4. كل القصص تظهر تلقائياً في تبويب "الموسوعة"

### إعادة الزرع يدوياً:
Maestro → Seed Glossary (يعيد زرع المعجم + الموسوعة)

---

## 🛠️ خطوات التنصيب

```powershell
# 1. نسخ احتياطي
cd C:\Users\inves\Downloads\@apps
Copy-Item -Recurse src src-backup-v5

# 2. فك الضغط
Expand-Archive -Path process-app-v6-FULL-update.zip -DestinationPath . -Force
Move-Item -Path process-app-final\* -Destination . -Force
Remove-Item -Path process-app-final -Recurse

# 3. نظف الـ cache
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# 4. ابني
npm run build
npx cap sync

# 5. Android Studio → Build APK
```

### بعد التنصيب:
لرؤية كل التحديثات: **Settings → Clear App Data** ثم افتح التطبيق.
AutoSeed سيزرع كل البيانات الجديدة تلقائياً (~30 ثانية).

---

## 🎯 الخطة القادمة (Tier 1 — 15 باقي)

| التالي | البراند | متى |
|---|---|---|
| 8 | Versace | v7 |
| 9 | Jean Paul Gaultier | v7 |
| 10 | Paco Rabanne | v7 |
| 11 | Bulgari | v7 |
| 12-20 | Hugo Boss, CK, Lancôme, YSL, Armani, Hermès, D&G, Chanel, Dior, Guerlain | v8-v10 |

🎉 استمتع!
