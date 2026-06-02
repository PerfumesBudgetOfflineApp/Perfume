# 📱 Process App — تشغيل على الجوال والويندوز

---

## 🎯 طريقتان لاستخدام التطبيق على جوالك

### 🟢 الطريقة 1 — PWA (الأسهل، 0 دقائق إعداد إضافي)

التطبيق **يعمل الآن مباشرة على جوالك** كتطبيق مثبّت!

#### الخطوات:

**على جهاز الكمبيوتر:**
1. شغّل التطبيق:
   ```powershell
   cd C:\Users\inves\Downloads\process-app
   npm run dev
   ```

2. ابحث عن عنوان IP جهازك:
   ```powershell
   ipconfig
   ```
   ابحث عن `IPv4 Address` → سيكون شيء مثل `192.168.1.5`

3. ستظهر في Terminal سطر مثل:
   ```
   ➜  Network: http://192.168.1.5:5173/
   ```

**على جوالك:**
1. تأكد أن **الجوال والكمبيوتر على نفس الـ WiFi**
2. افتح المتصفح (Chrome على Android, Safari على iPhone)
3. اكتب: `http://192.168.1.5:5173` (استبدل بعنوان IP جهازك)
4. التطبيق يفتح بنفس شكله

#### تثبيت كتطبيق على الجوال:

**Android (Chrome):**
1. اضغط على القائمة `⋮` أعلى يمين
2. اختر **"Add to Home screen"** أو **"إضافة إلى الشاشة الرئيسية"**
3. ستجد أيقونة Process App على شاشتك مثل أي تطبيق

**iPhone (Safari):**
1. اضغط زر **Share** (المربع مع السهم لأعلى)
2. اختر **"Add to Home Screen"**
3. أيقونة جاهزة

⚠️ **القيد:** التطبيق يحتاج الكمبيوتر مشغّل و `npm run dev` يعمل. عند إغلاق الكمبيوتر، التطبيق على الجوال لا يعمل.

---

### 🔵 الطريقة 2 — APK دائم (التطبيق الحقيقي offline)

تحويل التطبيق إلى **APK يثبَّت ويعمل بدون الكمبيوتر**.

#### المتطلبات:
- Android Studio (مجاني): https://developer.android.com/studio
- ~15 دقيقة للإعداد الأول

#### الخطوات:

```powershell
cd C:\Users\inves\Downloads\process-app

# 1. ثبت Capacitor (مرة واحدة)
npm install @capacitor/core @capacitor/cli @capacitor/android

# 2. أنشئ مشروع Capacitor
npx cap init "Process App" "com.arabia.processapp" --web-dir=dist

# 3. بناء التطبيق
npm run build

# 4. أضف منصة Android
npx cap add android

# 5. افتح Android Studio
npx cap open android
```

في Android Studio:
- اضغط **Build → Build Bundle(s) / APK(s) → Build APK(s)**
- انتظر 5-10 دقائق
- ستجد ملف APK جاهز في:
  ```
  process-app\android\app\build\outputs\apk\debug\app-debug.apk
  ```
- انقل الـ APK إلى جوالك بأي طريقة (USB / Telegram / Email)
- اضغط عليه على الجوال → ثبّت → التطبيق جاهز offline بالكامل

---

## 🪟 تشغيل على Windows 11 (التذكير)

### المتطلبات
- **Node.js LTS** من https://nodejs.org
- **VS Code** (اختياري) من https://code.visualstudio.com

### التشغيل
```powershell
cd C:\Users\inves\Downloads\process-app
npm install           # مرة واحدة فقط
npm run dev           # كل مرة تريد التشغيل
```

### القاعدة (مرة واحدة)
1. افتح `http://localhost:5173`
2. F12 → Console:
   ```javascript
   indexedDB.deleteDatabase('ProcessAppDB'); location.reload();
   ```
3. اذهب لـ `/maestro` → **Seed All**

---

## 📦 ما المُحدّث في هذه النسخة

✅ **localBase44.js** — adapter محلي IndexedDB كامل  
✅ **AuthContext.jsx** — auto-login offline  
✅ **localSeeder.js** — تحميل JSON محلياً  
✅ **PerfumersSection.jsx** — ربط العطار صحيح  
✅ **PerfumeDetail.jsx** — تشخيص شراء + ربط براند ذكي  
✅ **DBViewer.jsx** — عارض هرمي للقاعدة  
✅ **notes_builtin.json** — 1,828 نوتة بصيغة `sub_notes/low_notes`  
✅ **brands** — 1,390 براند  
✅ **perfumers** — 217 عطار

