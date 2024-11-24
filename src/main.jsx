import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
import i18next from 'i18next';
import english from "../en/translation.json"
import francais from "../fr/translation.json"
import arabic from "../ar/translation.json"
import { initReactI18next } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: english },
    fr: { translation: francais },
    ar: { translation: arabic },
  },
  lng: 'ar', 
  fallbackLng: 'en', 
  interpolation: {
    escapeValue: false,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider> 
  </StrictMode>,
)
