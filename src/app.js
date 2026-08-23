const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cocService = require('./services/cocService');
const configService = require('./services/configService');
const assetHelper = require('./services/assetHelper');
const { i18nMiddleware, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } = require('./services/i18nService');
const { townHallData, MAX_TOWN_HALL_LEVEL, MIN_TOWN_HALL_LEVEL, getTownHall, getAllTownHalls } = require('./data/townHallData');

dotenv.config();

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files & body parsers
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// i18n multi-language middleware (AZ, TR, EN)
app.use(i18nMiddleware);

// Session setup for Admin authentication
app.use(session({
  secret: process.env.SESSION_SECRET || 'coc_portal_secret_key_supercell_99',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// Global template locals middleware
app.use((req, res, next) => {
  const settings = configService.loadSettings();
  
  res.locals.activePage = '';
  res.locals.isLiveApi = cocService.isConfigured();
  res.locals.title = settings.siteTitle || res.locals.t('meta.siteTitle');
  res.locals.siteSettings = settings;
  res.locals.isAdmin = Boolean(req.session && req.session.isAdmin);
  
  // User Authentication Local
  const userService = require('./services/userService');
  res.locals.currentUser = req.session.userId ? userService.getUserById(req.session.userId) : null;
  
  // Asset & Town Hall Helpers
  res.locals.getHeroImage = assetHelper.getHeroImage;
  res.locals.getEquipmentImage = assetHelper.getEquipmentImage;
  res.locals.getTroopImage = assetHelper.getTroopImage;
  res.locals.getSpellImage = assetHelper.getSpellImage;
  res.locals.getEntityImage = assetHelper.getEntityImage;
  res.locals.getEntityName = assetHelper.getEntityName;
  res.locals.getTownHallImage = assetHelper.getTownHallImage;
  res.locals.getBuilderHallImage = assetHelper.getBuilderHallImage;
  res.locals.getHeroEquippedItems = assetHelper.getHeroEquippedItems;

  // Entity Catalog
  res.locals.entityCatalog = require('./data/entityCatalog');

  // Town Hall Data Helpers
  res.locals.townHallData = townHallData;
  res.locals.MAX_TOWN_HALL_LEVEL = MAX_TOWN_HALL_LEVEL;
  res.locals.MIN_TOWN_HALL_LEVEL = MIN_TOWN_HALL_LEVEL;
  res.locals.getTownHall = getTownHall;
  res.locals.getAllTownHalls = getAllTownHalls;

  next();
});

// Maintenance Mode Middleware
app.use((req, res, next) => {
  const settings = configService.loadSettings();
  const isAdmin = Boolean(req.session && req.session.isAdmin);
  
  // Always allow admin routes, login, assets, and active admin sessions
  if (
    !settings.maintenanceMode || 
    isAdmin || 
    req.path.startsWith('/admin') || 
    req.path.startsWith('/css') || 
    req.path.startsWith('/js') || 
    req.path.startsWith('/images') ||
    req.path.startsWith('/set-language')
  ) {
    return next();
  }

  // Intercept all other public requests with 503 Maintenance page
  res.status(503).render('maintenance', {
    title: `${settings.siteTitle || res.locals.t('meta.siteTitle')} - ${res.locals.t('error.maintenanceTitle')}`
  });
});

// Language Switcher Route Endpoint
app.get('/set-language/:lang', (req, res) => {
  const lang = (req.params.lang || '').toLowerCase();
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    res.cookie('coc_lang', lang, { maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: false });
  }
  const referer = req.get('Referer') || '/';
  // Remove any ?lang= param from referer if present to avoid conflict
  const cleanReferer = referer.replace(/[?&]lang=[^&]+/, '');
  res.redirect(cleanReferer);
});

// Routes
const indexRoutes = require('./routes/index');
const playerRoutes = require('./routes/player');
const clanRoutes = require('./routes/clan');
const clansRoutes = require('./routes/clans');
const rankingsRoutes = require('./routes/rankings');
const goldPassRoutes = require('./routes/goldpass');
const leaguesRoutes = require('./routes/leagues');
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/player', playerRoutes);
app.use('/clan', clanRoutes);
app.use('/clans', clansRoutes);
app.use('/rankings', rankingsRoutes);
app.use('/goldpass', goldPassRoutes);
app.use('/leagues', leaguesRoutes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// Quick Tag Search Route handler
app.get('/search-tag', (req, res) => {
  let { tag, type } = req.query;
  if (!tag) return res.redirect('/');
  tag = tag.trim().replace(/^#/, '');
  if (type === 'clan') {
    return res.redirect(`/clan/%23${tag}`);
  } else {
    return res.redirect(`/player/%23${tag}`);
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: `${res.locals.t('error.notFoundTitle')}`,
    activePage: '404',
    isLiveApi: cocService.isConfigured(),
    message: res.locals.t('error.notFoundDesc')
  });
});

module.exports = app;
