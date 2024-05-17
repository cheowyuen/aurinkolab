import i18next from "i18next"
import {initReactI18next} from 'react-i18next'
import ChainedBackend from "i18next-chained-backend";
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'






i18next
.use(initReactI18next)
.use(ChainedBackend)
.use(LanguageDetector)
.use(Backend)

.init({
    preload: ['en', 'es'],
    debug:true,
    fallbackLng:'en',

      });

export default i18next
