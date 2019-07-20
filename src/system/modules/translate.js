import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Fetch from 'i18next-fetch-backend';
import {isProduction} from '../../general';


const detectorOptions = {
    // order and from where user language should be detected
    order: [
        'querystring',
        'cookie',
        'localStorage',
        'navigator',
        'htmlTag',
        'path',
        'subdomain',
    ],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],

    // optional expire and domain for set cookie
    cookieMinutes: 10,

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement,
};

const backendOptions = {
    // init option for fetch, for example
    requestOptions: {
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default',
    },
};

export function Translate() {
    return i18next
        .use(LanguageDetector)
        .use(Fetch)
        .init({
            debug: isProduction(),

            fallbackLng: 'zh-TW',

            detection: detectorOptions,
            backend: backendOptions,

            loadPath: ENV.I18N_URL,

            ns: ['alien', 'common'],
            defaultNS: 'alien',
        });
}
