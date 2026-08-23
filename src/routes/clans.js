const express = require('express');
const router = express.Router();
const cocService = require('../services/cocService');

// Explore & Search Clans with Labels and Locations
router.get('/', async (req, res) => {
  try {
    const { name, minMembers, maxMembers, minClanLevel, minClanPoints, warFrequency, locationId, labelIds } = req.query;
    
    const [searchResults, labels, locations] = await Promise.all([
      cocService.searchClans({
        name: name || (minClanLevel || warFrequency ? '' : 'Turkey'),
        minMembers,
        maxMembers,
        minClanLevel,
        minClanPoints,
        warFrequency,
        locationId,
        labelIds
      }),
      cocService.getClanLabels(),
      cocService.getLocations()
    ]);

    res.render('clans', {
      title: 'Klan Bul & Keşfet | Clash of Clans',
      activePage: 'clans',
      isLiveApi: cocService.isConfigured(),
      clans: searchResults.items || [],
      labels: labels.items || [],
      locations: (locations.items || []).filter(l => l.isCountry).slice(0, 30),
      query: req.query
    });
  } catch (error) {
    console.error('Clans search route error:', error);
    res.render('clans', {
      title: 'Klan Bul & Keşfet',
      activePage: 'clans',
      isLiveApi: false,
      clans: [],
      labels: [],
      locations: [],
      query: req.query
    });
  }
});

module.exports = router;
