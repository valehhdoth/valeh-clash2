const express = require('express');
const router = express.Router();
const cocService = require('../services/cocService');

// Leaderboards / Rankings (Supporting 5 modes and dynamic locations)
router.get('/', async (req, res) => {
  try {
    const type = req.query.type || 'players'; // 'players', 'clans', 'players-builder-base', 'clans-builder-base', 'capitals'
    const location = req.query.location || 'tr'; // Default to Turkey or Global
    
    const [rankings, locations] = await Promise.all([
      cocService.getRankings(type, location),
      cocService.getLocations()
    ]);

    const items = rankings.items || (type === 'players' ? rankings.players : rankings.clans) || [];

    res.render('rankings', {
      title: 'Liderlik Tablosu & Tüm Sıralamalar | Clash of Clans',
      activePage: 'rankings',
      isLiveApi: cocService.isConfigured(),
      items,
      type,
      location,
      locations: (locations.items || []).filter(l => l.isCountry || l.id === 'global' || l.id === 32000000).slice(0, 40)
    });
  } catch (error) {
    console.error('Rankings route error:', error);
    res.render('rankings', {
      title: 'Liderlik Tablosu',
      activePage: 'rankings',
      isLiveApi: false,
      items: [],
      type: 'players',
      location: 'tr',
      locations: []
    });
  }
});

module.exports = router;
