# 🪟 Process App — دليل تشغيل Windows 11

---

## ⚡ المتطلبات (مرة واحدة)

### 1. Node.js v20+ (إلزامي)
- رابط: **https://nodejs.org** → اختر **LTS**
- التثبيت: Next → Next → Finish
- تحقق:
  ```powershell
  node --version   # v20.x.x أو أعلى
  npm --version    # 10.x.x أو أعلى
  ```

### 2. VS Code (للتطوير)
- رابط: **https://code.visualstudio.com**
- إضافات مقترحة: ESLint, Prettier, ES7+ React snippets

### 3. Git (اختياري)
- رابط: **https://git-scm.com/download/win**

---

## 🚀 تشغيل التطبيق

```powershell
# 1. فك الضغط: process-app_app_complete.zip → process-app-v4
# 2. افتح Terminal في المجلد:
cd C:\Users\YourName\process-app-v4

# 3. تثبيت (مرة واحدة، 2-5 دقائق)
npm install

# 4. تشغيل
npm run dev

# 5. المتصفح يفتح تلقائياً:
# http://localhost:5173
```

---

## 🗄️ تغذية قاعدة البيانات (Seeds)

1. `http://localhost:5173/maestro`
2. أدخل كلمة المرور
3. في **Run Seeds**:

| الزر | يُحمِّل |
|---|---|
| **Brands** | 1,390 براند |
| **Notes** | 1,828 نوتة |
| **Perfumers** | 217 عطار |
| **Perfumes** | عطور نموذجية |
| **⭐ Seed All** | كل شيء |

---

## 📝 بناء عطر صحيح في perfumes_builtin.json

```json
{
  "Arabia Fragrance": [
    {
      "name_en": "Poem of the Desert",
      "name_ar": "قصيدة الصحراء",
      "type": "Eau de Parfum - EDP",
      "gender": "Unisex",
      "about_en": "A fragrant poem where the desert whispers in oud and Taif rose.",
      "about_ar": "قصيدة عطرية حيث تهمس الصحراء بالعود وورد الطائف.",
      "category": "Oriental شرقي",
      "odor_family": "Woody خشبي, Floral زهري",
      "top_notes": "Taif Rose ورد طائفي, Bergamot برغموت",
      "heart_notes": "Agarwood Oud عود, Rose Damascena الوردة الدمشقية",
      "base_notes": "Amber عنبر, Deer Musk مسك غزال, Sandalwood خشب الصندل",
      "innovation_notes": "A Breath of Saudi Coffee نفس قهوة سعودية",
      "occasions": "Evening, Weddings",
      "season": "All Seasons",
      "time_of_day": "Night",
      "release_year": 2026,
      "price": 450,
      "price_range": "$$$$",
      "ml": 100,
      "brand_name": "Arabia Fragrance",
      "perfumer_names": "",
      "collection_name": "Poems Collection",
      "discontinued": false
    }
  ]
}
```

### القيم المسموحة

| الحقل | القيم |
|---|---|
| `type` | Parfum - Extrait de Parfum / Eau de Parfum - EDP / Eau de Toilette - EDT / Eau de Cologne - EDC / Body Lotion / Body Mist |
| `gender` | Men / Women / Unisex |
| `season` | Spring / Summer / Fall / Winter / All Seasons |
| `time_of_day` | Day / Night / All |
| `price_range` | $ / $$ / $$$ / $$$$ |

### 🔑 قاعدة النوتات الإلزامية

كل نوتة **لازم** تطابق سلسلة من `notes_builtin.json` بالضبط:
```
✅ "Rose ورد, Jasmine ياسمين, Oud عود"
❌ "Rose, Jasmine, Oud"   (يفقد الربط)
```

---

## 🔒 التشفير (v2)

التطبيق يستخدم **AES-256-GCM** عبر Web Crypto API لـ:
- الأسعار والميزانية
- الملاحظات الشخصية
- بيانات المستخدم

البيانات القديمة (base64) تُقرأ تلقائياً وتُعاد كتابتها مشفرة.

---

## 🔧 هيكل المشروع

```
process-app-v4/
├── src/
│   ├── pages/                           ← صفحات React
│   ├── components/                      ← مكونات UI
│   ├── data/
│   │   └── builtin_database/
│   │       ├── brands_builtin.json      ← 1,390 براند
│   │       ├── notes_builtin.json       ← 1,828 نوتة
│   │       ├── perfumers_builtin.json   ← 217 عطار
│   │       └── perfumes_builtin.json    ← العطور
│   └── lib/
│       ├── storageEncryption.js         ← AES-256-GCM v2
│       └── indexedDB.js                 ← قاعدة محلية Process App
├── .env.local                            ← إعدادات محلية
├── vite.config.js                        ← إعدادات Vite
└── package.json
```

---

## ⚠️ مشاكل شائعة

| المشكلة | الحل |
|---|---|
| `npm install` يفشل | تحقق من الإنترنت، احذف `node_modules` |
| منفذ 5173 مشغول | غيّر في `vite.config.js` إلى `port: 5174` |
| Seeds تفشل | تأكد من تشغيل التطبيق أولاً |
| شاشة بيضاء | DevTools → Console → ابحث عن الخطأ |

---

## 📊 FragDB — هل ملفاتها مشفرة؟

**لا — CSV نصي عادي** بفاصل `|`:

```csv
pid|name|brand|gender|year|notes_top|longevity|sillage
1|Chanel No. 5|Chanel;123|for women|1921|28,0.8,1.0|3.8|3.2
```

استيراد سهل:
```python
import pandas as pd
fragrances = pd.read_csv('fragrances.csv', sep='|', encoding='utf-8')
brands = pd.read_csv('brands.csv', sep='|', encoding='utf-8')

fragrances['brand_id'] = fragrances['brand'].str.split(';').str[1]
df = fragrances.merge(brands, left_on='brand_id', right_on='id')
print(df[['name', 'name_brand', 'year']].head())
```
