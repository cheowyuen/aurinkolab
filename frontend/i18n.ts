import i18next from "i18next"
import {initReactI18next} from 'react-i18next'
import ChainedBackend from "i18next-chained-backend";
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

/** 
 * This is the main i18n config file that the application uses.
 * 
 * Here we use the backend library to call the translations files that are located in the public folder.
 * 
*/
i18next
.use(initReactI18next)
.use(ChainedBackend)
.use(LanguageDetector)
.use(Backend)

.init({
    preload: ['en', 'es'],
    debug:true,
    fallbackLng:'en', /** this is the default language "English", but we are usign a detecter laguage library to use the language that user uses. */

      });

export default i18next
