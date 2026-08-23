const fs = require('fs');
const path = require('path');

const SUPPORTED_LANGUAGES = ['tr', 'az', 'en'];
const DEFAULT_LANGUAGE = 'tr';

const locales = {};

// Load all translation files
SUPPORTED_LANGUAGES.forEach(lang => {
  try {
    const filePath = path.join(__dirname, `../locales/${lang}.json`);
    if (fs.existsSync(filePath)) {
      locales[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
      locales[lang] = {};
    }
  } catch (err) {
    console.error(`Failed to load locale: ${lang}`, err);
    locales[lang] = {};
  }
});

function getNestedValue(obj, keyPath) {
  if (!obj || !keyPath) return null;
  const parts = keyPath.split('.');
  let current = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return null;
    }
  }
  return current;
}

function translate(key, params = {}, lang = DEFAULT_LANGUAGE) {
  const chosenLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
  
  // 1. Try in chosen language
  let val = getNestedValue(locales[chosenLang], key);
  
  // 2. Fallback to Turkish if missing
  if (val === null && chosenLang !== 'tr') {
    val = getNestedValue(locales['tr'], key);
  }
  
  // 3. Fallback to English if still missing
  if (val === null && chosenLang !== 'en') {
    val = getNestedValue(locales['en'], key);
  }

  // 4. Return key if not found
  if (val === null || val === undefined) {
    return key;
  }

  // If val is a string, handle parameter replacement {param}
  if (typeof val === 'string' && params && typeof params === 'object') {
    return val.replace(/\{(\w+)\}/g, (match, p) => {
      return params[p] !== undefined ? params[p] : match;
    });
  }

  return val;
}

// Middleware for Express
function i18nMiddleware(req, res, next) {
  let lang = DEFAULT_LANGUAGE;

  // 1. Query parameter ?lang=az or ?lang=en or ?lang=tr
  if (req.query && req.query.lang && SUPPORTED_LANGUAGES.includes(req.query.lang.toLowerCase())) {
    lang = req.query.lang.toLowerCase();
    res.cookie('coc_lang', lang, { maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: false });
  } 
  // 2. Cookie coc_lang
  else if (req.cookies && req.cookies.coc_lang && SUPPORTED_LANGUAGES.includes(req.cookies.coc_lang.toLowerCase())) {
    lang = req.cookies.coc_lang.toLowerCase();
  }
  // 3. Accept-Language header
  else if (req.headers && req.headers['accept-language']) {
    const header = req.headers['accept-language'].toLowerCase();
    if (header.startsWith('az')) lang = 'az';
    else if (header.startsWith('en')) lang = 'en';
    else if (header.startsWith('tr')) lang = 'tr';
  }

  req.currentLang = lang;
  res.locals.currentLang = lang;
  res.locals.languages = [
    { code: 'az', name: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  // Helper function for EJS templates
  res.locals.t = (key, params) => translate(key, params, lang);
  req.t = (key, params) => translate(key, params, lang);

  next();
}

module.exports = {
  translate,
  i18nMiddleware,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE
};
