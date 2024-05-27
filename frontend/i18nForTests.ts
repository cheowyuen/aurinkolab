import i18n from "i18next"
import {initReactI18next} from 'react-i18next'
import ChainedBackend from "i18next-chained-backend";
import  tranEn from './public/locales/en/translation.json'
import Backend from 'i18next-http-backend'

/* 

This is an i18n file config for testing porpouses, due Jest can not retrive 
the translation json file, we have to do it here manually  with tranEn.

This is only calling the English langauge and the the test is only for English,

**/

i18n
.use(initReactI18next)
.use(ChainedBackend)
.use(Backend)
.init({
    preload: ['en'],
    debug:true, 
    fallbackLng:'en', /** defining the default language */
    resources: {
      en: {
        translation: tranEn, /** retrieving the json file with the translations.*/
      },
    },

      });

export default i18n
