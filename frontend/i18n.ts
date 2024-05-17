import i18next from "i18next"
import {initReactI18next} from 'react-i18next'
import ChainedBackend from "i18next-chained-backend";
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from "../frontend/public/locales/en/translation.json"
import esTranslation from "../frontend/public/locales/es/translation.json"




i18next
.use(initReactI18next)
.use(ChainedBackend)
.use(LanguageDetector)
.init({
    preload: ['en', 'es'],
    debug:true,
    fallbackLng:'en',
    defaultNS: 'translation',
    resources:{
        en:{
            translation: enTranslation
        },
        es:{
            translation: esTranslation
        }
    },
   
      });

export default i18next
