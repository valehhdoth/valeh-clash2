const express = require('express');
const router = express.Router();
const cocService = require('../services/cocService');
const configService = require('../services/configService');

// Home Dashboard
router.get('/', async (req, res) => {
  const settings = configService.loadSettings();
  const clanTag = settings.featuredClanTag || '#2PP8RGLV';

  try {
    const featuredClan = await cocService.getClan(clanTag);
    const featuredWar = await cocService.getCurrentWar(clanTag);
    const rankings = await cocService.getRankings('players', 'global');
    const goldPass = await cocService.getGoldPass();

    res.render('index', {
      title: `${settings.siteTitle || 'Clash of Clans Portal'} | Canlı İstatistikler ve Takip`,
      activePage: 'home',
      isLiveApi: cocService.isConfigured(),
      featuredClan,
      featuredWar,
      topPlayers: rankings.players || rankings.items || [],
      goldPass,
      settings
    });
  } catch (error) {
    console.error('Home route error:', error);
    res.render('index', {
      title: settings.siteTitle || 'Clash of Clans Portal',
      activePage: 'home',
      isLiveApi: false,
      featuredClan: null,
      featuredWar: null,
      topPlayers: [],
      goldPass: null,
      settings
    });
  }
});

module.exports = router;
