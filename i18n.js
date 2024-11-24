import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// إعداد اللغات والتكوين
i18n
  .use(HttpApi) // لتحميل الترجمات من الملفات
  .use(LanguageDetector) // لاكتشاف اللغة
  .use(initReactI18next) // تكامل مع React
  .init({
    supportedLngs: ['en', 'fr', 'ar'], // اللغات المدعومة
    fallbackLng: 'en', // اللغة الافتراضية
    debug: true, // لتفعيل وضع التصحيح أثناء التطوير
    interpolation: {
      escapeValue: false, // لا حاجة إلى الهروب في React
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // مسار ملفات الترجمة
    },
  });

export default i18n;
