const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const configFile = path.join(dataDir, 'settings.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Default system settings
const defaultSettings = {
  adminUsername: 'root',
  adminPassword: 'root', // Can be changed in panel
  featuredClanTag: '#2PP8RGLV',
  siteTitle: 'Clash of Clans Portal',
  siteDescription: 'Canlı Klan Savaşları, Ekipman Analizleri ve Efsane Ligi Takip Portalı',
  announcementEnabled: true,
  announcementText: '🔥 Yeni Özellik: Bütün belediye 18 kahraman ekipmanları ve canlı klan savaşı takibi aktif edildi!',
  announcementType: 'info', // info, warning, success, event
  maintenanceMode: false,
  customApiToken: '',
  allowMockFallback: true,
  savedTags: [
    { tag: '#9PRQL200', type: 'player', name: 'Max TH18 Leader', note: 'Top 100 Efsane Ligi' },
    { tag: '#2PP8RGLV', type: 'clan', name: 'Anatolia Warriors', note: 'Canlı CWL Klanı' }
  ],
  announcements: [
    {
      id: 'ann-1',
      title: 'Belediye Binası 18 ve Ekipmanlar Yayında!',
      content: 'Town Hall 18 seviyesi, yeni kahraman seviyeleri ve ekipman analizleri sitemize tam olarak entegre edildi.',
      badge: 'YENİ GÜNCELLEME',
      type: 'success',
      link: '/leagues',
      active: true,
      createdAt: '23.08.2026'
    }
  ],
  customImages: {
    'Barbarian King': '',
    'Archer Queen': '',
    'Grand Warden': '',
    'Royal Champion': '',
    'Minion Prince': '',
    'Town Hall 18': '',
    'siteLogo': '',
    'siteBanner': ''
  },
  customTexts: {
    heroTitlePrefix: '',
    heroTitleGradient: '',
    heroTitleSuffix: '',
    heroSubtitle: '',
    heroBadge: '',
    footerText: ''
  },
  customEntities: {}
};

// In-memory request telemetry
const telemetry = {
  startTime: Date.now(),
  totalRequests: 0,
  apiSuccessCount: 0,
  apiErrorCount: 0,
  recentLogs: []
};

function loadSettings() {
  try {
    if (fs.existsSync(configFile)) {
      const data = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
      return {
        ...defaultSettings,
        ...data,
        announcements: Array.isArray(data.announcements) ? data.announcements : defaultSettings.announcements,
        customImages: { ...defaultSettings.customImages, ...(data.customImages || {}) },
        customTexts: { ...defaultSettings.customTexts, ...(data.customTexts || {}) },
        customEntities: { ...defaultSettings.customEntities, ...(data.customEntities || {}) }
      };
    }
  } catch (e) {
    console.error('Error reading settings.json:', e.message);
  }
  saveSettings(defaultSettings);
  return defaultSettings;
}

function saveSettings(newSettings) {
  try {
    fs.writeFileSync(configFile, JSON.stringify(newSettings, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error saving settings.json:', e.message);
    return false;
  }
}

function updateSettings(partialSettings) {
  const current = loadSettings();
  const updated = { ...current, ...partialSettings };
  saveSettings(updated);
  return updated;
}

// ----------------------------------------------------
// Custom Entities (Troops, Spells, Heroes, Equipments)
// ----------------------------------------------------
function updateCustomEntities(entitiesMap) {
  const settings = loadSettings();
  settings.customEntities = { ...(settings.customEntities || {}), ...entitiesMap };
  saveSettings(settings);
  return settings.customEntities;
}

function setCustomEntity(entityId, { customName, customImage }) {
  const settings = loadSettings();
  if (!settings.customEntities) settings.customEntities = {};
  settings.customEntities[entityId] = {
    customName: (customName || '').trim(),
    customImage: (customImage || '').trim()
  };
  saveSettings(settings);
  return settings.customEntities[entityId];
}

function resetCustomEntities() {
  const settings = loadSettings();
  settings.customEntities = {};
  saveSettings(settings);
  return settings.customEntities;
}

// ----------------------------------------------------
// Announcement Helpers
// ----------------------------------------------------
function addAnnouncement({ title, content, badge, type, link, active }) {
  const settings = loadSettings();
  const newAnn = {
    id: 'ann-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
    title: (title || '').trim(),
    content: (content || '').trim(),
    badge: (badge || 'DUYURU').trim().toUpperCase(),
    type: type || 'info', // info, warning, success, event
    link: (link || '').trim(),
    active: active !== false,
    createdAt: new Date().toLocaleDateString('tr-TR')
  };
  settings.announcements.unshift(newAnn);
  saveSettings(settings);
  return newAnn;
}

function deleteAnnouncement(id) {
  const settings = loadSettings();
  settings.announcements = (settings.announcements || []).filter(a => a.id !== id);
  saveSettings(settings);
  return true;
}

function toggleAnnouncement(id) {
  const settings = loadSettings();
  const target = (settings.announcements || []).find(a => a.id === id);
  if (target) {
    target.active = !target.active;
    saveSettings(settings);
  }
  return target;
}

// ----------------------------------------------------
// Image & Text Customizer Helpers
// ----------------------------------------------------
function updateCustomImages(imagesMap) {
  const settings = loadSettings();
  settings.customImages = { ...settings.customImages, ...imagesMap };
  saveSettings(settings);
  return settings.customImages;
}

function resetCustomImages() {
  const settings = loadSettings();
  settings.customImages = { ...defaultSettings.customImages };
  saveSettings(settings);
  return settings.customImages;
}

function updateCustomTexts(textsMap) {
  const settings = loadSettings();
  settings.customTexts = { ...settings.customTexts, ...textsMap };
  saveSettings(settings);
  return settings.customTexts;
}

// ----------------------------------------------------
// Telemetry
// ----------------------------------------------------
function logRequest(endpoint, status, latencyMs, isCached = false) {
  telemetry.totalRequests++;
  if (status >= 200 && status < 400) {
    telemetry.apiSuccessCount++;
  } else {
    telemetry.apiErrorCount++;
  }

  const logEntry = {
    id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
    timestamp: new Date().toLocaleTimeString('tr-TR'),
    endpoint,
    status,
    latencyMs,
    isCached
  };

  telemetry.recentLogs.unshift(logEntry);
  if (telemetry.recentLogs.length > 50) {
    telemetry.recentLogs.pop();
  }
}

function getTelemetry() {
  const uptimeSeconds = Math.floor((Date.now() - telemetry.startTime) / 1000);
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  return {
    ...telemetry,
    uptimeFormatted: `${hours}s ${minutes}d ${seconds}sn`,
    uptimeSeconds
  };
}

module.exports = {
  loadSettings,
  saveSettings,
  updateSettings,
  addAnnouncement,
  deleteAnnouncement,
  toggleAnnouncement,
  updateCustomImages,
  resetCustomImages,
  updateCustomTexts,
  updateCustomEntities,
  setCustomEntity,
  resetCustomEntities,
  logRequest,
  getTelemetry
};
