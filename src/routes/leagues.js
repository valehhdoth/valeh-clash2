const express = require('express');
const router = express.Router();
const cocService = require('../services/cocService');

// All Game Leagues & Badges
router.get('/', async (req, res) => {
  try {
    const [homeLeagues, warLeagues, capitalLeagues, builderLeagues, legendSeasons] = await Promise.all([
      cocService.getLeagues(),
      cocService.getWarLeagues(),
      cocService.getCapitalLeagues(),
      cocService.getBuilderBaseLeagues(),
      cocService.getLegendSeasons()
    ]);

    res.render('leagues', {
      title: 'Ligler, Rozetler & Sezon Arşivi | Clash of Clans',
      activePage: 'leagues',
      isLiveApi: cocService.isConfigured(),
      homeLeagues: homeLeagues.items || [],
      warLeagues: warLeagues.items || [],
      capitalLeagues: capitalLeagues.items || [],
      builderLeagues: builderLeagues.items || [],
      legendSeasons: (legendSeasons.items || []).slice(0, 12)
    });
  } catch (error) {
    console.error('Leagues route error:', error);
    res.render('leagues', {
      title: 'Ligler ve Rozetler',
      activePage: 'leagues',
      isLiveApi: false,
      homeLeagues: [],
      warLeagues: [],
      capitalLeagues: [],
      builderLeagues: [],
      legendSeasons: []
    });
  }
});

module.exports = router;
