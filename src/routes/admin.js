const express = require('express');
const router = express.Router();
const configService = require('../services/configService');
const cocService = require('../services/cocService');
const userService = require('../services/userService');

const crypto = require('crypto');

function getAdminAuthToken(settings) {
  const secret = process.env.SESSION_SECRET || 'coc_admin_secret_auth_token_99';
  return crypto.createHmac('sha256', secret)
    .update(`${settings.adminUsername}:${settings.adminPassword}`)
    .digest('hex');
}

// Middleware to protect admin routes
function requireAdmin(req, res, next) {
  const settings = configService.loadSettings();
  const validToken = getAdminAuthToken(settings);

  const isSessionAdmin = Boolean(req.session && req.session.isAdmin);
  const isCookieAdmin = Boolean(req.cookies && req.cookies['coc_admin_token'] === validToken);

  if (isSessionAdmin || isCookieAdmin) {
    if (req.session) req.session.isAdmin = true;
    return next();
  }
  res.redirect('/admin/login');
}

// ----------------------------------------------------
// 1. Authentication Routes
// ----------------------------------------------------
router.get('/login', (req, res) => {
  const settings = configService.loadSettings();
  const validToken = getAdminAuthToken(settings);

  if ((req.session && req.session.isAdmin) || (req.cookies && req.cookies['coc_admin_token'] === validToken)) {
    return res.redirect('/admin');
  }
  res.render('admin/login', {
    title: 'Yönetici Girişi | ClashPortal Admin',
    error: req.query.error || null,
    activePage: 'admin'
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const settings = configService.loadSettings();

  if (username === settings.adminUsername && password === settings.adminPassword) {
    if (req.session) req.session.isAdmin = true;
    const token = getAdminAuthToken(settings);
    res.cookie('coc_admin_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    return res.redirect('/admin');
  }

  res.redirect('/admin/login?error=invalid');
});

router.get('/logout', (req, res) => {
  res.clearCookie('coc_admin_token');
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

// ----------------------------------------------------
// 2. Admin Dashboard & Overview
// ----------------------------------------------------
router.get('/', requireAdmin, async (req, res) => {
  const settings = configService.loadSettings();
  const telemetry = configService.getTelemetry();
  const isApiLive = cocService.isConfigured();
  const users = userService.getAllUsers();

  res.render('admin/dashboard', {
    title: 'Yönetim Paneli | ClashPortal',
    activePage: 'admin',
    settings,
    telemetry,
    isApiLive,
    users,
    msg: req.query.msg || null,
    activeTab: req.query.tab || 'overview'
  });
});

// Delete user account endpoint
router.post('/users/delete', requireAdmin, (req, res) => {
  const { userId } = req.body;
  if (userId) {
    userService.deleteUser(userId);
  }
  res.redirect('/admin?tab=users&msg=user_deleted');
});

// ----------------------------------------------------
// 3. Settings Updates
// ----------------------------------------------------
router.post('/settings/general', requireAdmin, (req, res) => {
  const { siteTitle, siteDescription, featuredClanTag, allowMockFallback, maintenanceMode } = req.body;
  
  configService.updateSettings({
    siteTitle: siteTitle ? siteTitle.trim() : 'Clash of Clans Portal',
    siteDescription: siteDescription ? siteDescription.trim() : '',
    featuredClanTag: featuredClanTag ? featuredClanTag.trim() : '#2PP8RGLV',
    allowMockFallback: allowMockFallback === 'on' || allowMockFallback === 'true',
    maintenanceMode: maintenanceMode === 'on' || maintenanceMode === 'true'
  });

  res.redirect('/admin?tab=general&msg=general_saved');
});

router.post('/settings/announcement', requireAdmin, (req, res) => {
  const { announcementEnabled, announcementText, announcementType } = req.body;

  configService.updateSettings({
    announcementEnabled: announcementEnabled === 'on' || announcementEnabled === 'true',
    announcementText: announcementText ? announcementText.trim() : '',
    announcementType: announcementType || 'info'
  });

  res.redirect('/admin?tab=announcement&msg=announcement_saved');
});

router.post('/settings/token', requireAdmin, (req, res) => {
  const { customApiToken } = req.body;

  configService.updateSettings({
    customApiToken: customApiToken ? customApiToken.trim() : ''
  });

  res.redirect('/admin?tab=api&msg=token_saved');
});

router.post('/settings/security', requireAdmin, (req, res) => {
  const { adminUsername, newPassword, confirmPassword } = req.body;

  if (newPassword && newPassword.length >= 4) {
    if (newPassword !== confirmPassword) {
      return res.redirect('/admin?tab=security&msg=password_mismatch');
    }
    configService.updateSettings({
      adminUsername: adminUsername.trim(),
      adminPassword: newPassword.trim()
    });
  } else if (adminUsername) {
    configService.updateSettings({
      adminUsername: adminUsername.trim()
    });
  }

  res.redirect('/admin?tab=security&msg=security_saved');
});

// ----------------------------------------------------
// 4. Announcements Management
// ----------------------------------------------------
router.post('/announcements/add', requireAdmin, (req, res) => {
  const { title, content, badge, type, link, active } = req.body;
  if (!title || !content) {
    return res.redirect('/admin?tab=announcements&msg=announcement_missing');
  }

  configService.addAnnouncement({
    title,
    content,
    badge,
    type,
    link,
    active: active === 'on' || active === 'true' || active === true
  });

  res.redirect('/admin?tab=announcements&msg=announcement_added');
});

router.post('/announcements/delete', requireAdmin, (req, res) => {
  const { id } = req.body;
  if (id) {
    configService.deleteAnnouncement(id);
  }
  res.redirect('/admin?tab=announcements&msg=announcement_deleted');
});

router.post('/announcements/toggle', requireAdmin, (req, res) => {
  const { id } = req.body;
  if (id) {
    configService.toggleAnnouncement(id);
  }
  res.redirect('/admin?tab=announcements&msg=announcement_toggled');
});

// ----------------------------------------------------
// 5. Custom Entities (Troops, Spells, Heroes, Equipments)
// ----------------------------------------------------
router.post('/settings/entities/single', requireAdmin, (req, res) => {
  const { entityId, customName, customImage } = req.body;
  if (entityId) {
    configService.setCustomEntity(entityId, { customName, customImage });
  }
  const tab = req.body.returnTab || 'entities';
  res.redirect(`/admin?tab=${tab}&msg=entity_saved`);
});

router.post('/settings/entities/bulk', requireAdmin, (req, res) => {
  const entities = {};
  Object.keys(req.body).forEach(key => {
    if (key.startsWith('customName_')) {
      const id = key.replace('customName_', '');
      if (!entities[id]) entities[id] = {};
      entities[id].customName = (req.body[key] || '').trim();
    } else if (key.startsWith('customImage_')) {
      const id = key.replace('customImage_', '');
      if (!entities[id]) entities[id] = {};
      entities[id].customImage = (req.body[key] || '').trim();
    }
  });

  configService.updateCustomEntities(entities);
  res.redirect('/admin?tab=entities&msg=entities_bulk_saved');
});

router.post('/settings/entities/reset', requireAdmin, (req, res) => {
  configService.resetCustomEntities();
  res.redirect('/admin?tab=entities&msg=entities_reset');
});

// ----------------------------------------------------
// 6. Custom Images & Media Customizer (Legacy / Global)
// ----------------------------------------------------
router.post('/settings/images', requireAdmin, (req, res) => {
  const customImages = {
    'Barbarian King': (req.body.bkImage || '').trim(),
    'Archer Queen': (req.body.aqImage || '').trim(),
    'Grand Warden': (req.body.gwImage || '').trim(),
    'Royal Champion': (req.body.rcImage || '').trim(),
    'Minion Prince': (req.body.mpImage || '').trim(),
    'Town Hall 18': (req.body.th18Image || '').trim(),
    'siteLogo': (req.body.siteLogo || '').trim(),
    'siteBanner': (req.body.siteBanner || '').trim()
  };

  configService.updateCustomImages(customImages);
  res.redirect('/admin?tab=entities&msg=images_saved');
});

router.post('/settings/images/reset', requireAdmin, (req, res) => {
  configService.resetCustomImages();
  res.redirect('/admin?tab=entities&msg=images_reset');
});

// ----------------------------------------------------
// 6. Custom Texts & Content Customizer
// ----------------------------------------------------
router.post('/settings/texts', requireAdmin, (req, res) => {
  const customTexts = {
    heroTitlePrefix: (req.body.heroTitlePrefix || '').trim(),
    heroTitleGradient: (req.body.heroTitleGradient || '').trim(),
    heroTitleSuffix: (req.body.heroTitleSuffix || '').trim(),
    heroSubtitle: (req.body.heroSubtitle || '').trim(),
    heroBadge: (req.body.heroBadge || '').trim(),
    footerText: (req.body.footerText || '').trim()
  };

  configService.updateCustomTexts(customTexts);
  res.redirect('/admin?tab=texts&msg=texts_saved');
});

// ----------------------------------------------------
// 7. Saved Tags Management
// ----------------------------------------------------
router.post('/tags/add', requireAdmin, (req, res) => {
  const { tag, type, name, note } = req.body;
  if (!tag) return res.redirect('/admin?tab=tags');

  const settings = configService.loadSettings();
  const cleanTag = tag.trim().startsWith('#') ? tag.trim().toUpperCase() : '#' + tag.trim().toUpperCase();
  
  // Prevent duplicate
  const exists = settings.savedTags.some(t => t.tag === cleanTag);
  if (!exists) {
    settings.savedTags.push({
      tag: cleanTag,
      type: type || 'player',
      name: name ? name.trim() : cleanTag,
      note: note ? note.trim() : ''
    });
    configService.saveSettings(settings);
  }

  res.redirect('/admin?tab=tags&msg=tag_added');
});

router.post('/tags/delete', requireAdmin, (req, res) => {
  const { tag } = req.body;
  const settings = configService.loadSettings();
  settings.savedTags = settings.savedTags.filter(t => t.tag !== tag);
  configService.saveSettings(settings);

  res.redirect('/admin?tab=tags&msg=tag_deleted');
});

// ----------------------------------------------------
// 8. Live Tag Inspector & API Probe
// ----------------------------------------------------
router.post('/probe', requireAdmin, async (req, res) => {
  const { probeTag, probeType } = req.body;
  const startTime = Date.now();
  let result = null;
  let status = 'ok';
  let error = null;

  try {
    if (probeType === 'clan') {
      result = await cocService.getClan(probeTag);
    } else {
      result = await cocService.getPlayer(probeTag);
    }
  } catch (e) {
    status = 'error';
    error = e.message;
  }

  const latency = Date.now() - startTime;
  configService.logRequest(`/probe/${probeType}/${probeTag}`, status === 'ok' ? 200 : 500, latency);

  res.json({
    status,
    latency: `${latency}ms`,
    error,
    source: result?._source || 'live',
    data: result
  });
});

module.exports = router;
