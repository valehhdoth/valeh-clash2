const express = require('express');
const router = express.Router();
const cocService = require('../services/cocService');

// Clan Detail Route with CWL, Capital Raids and War Log
router.get('/:tag?', async (req, res) => {
  try {
    const rawTag = req.params.tag || req.query.tag || '#2PP8RGLV';
    
    // Fetch all related resources in parallel
    const [clan, war, warLog, cwlGroup, capitalRaids] = await Promise.all([
      cocService.getClan(rawTag),
      cocService.getCurrentWar(rawTag),
      cocService.getWarLog(rawTag),
      cocService.getClanCWLGroup(rawTag),
      cocService.getClanCapitalRaids(rawTag)
    ]);

    res.render('clan', {
      title: `${clan.name} (${clan.tag}) | Klan & Savaş Takibi`,
      activePage: 'clans',
      isLiveApi: cocService.isConfigured(),
      clan,
      war,
      warLog: warLog.items || [],
      cwlGroup,
      capitalRaids: capitalRaids.items || []
    });
  } catch (error) {
    console.error('Clan route error:', error);
    res.status(500).render('404', {
      title: 'Klan Bulunamadı',
      message: 'Aradığınız klan bulunamadı veya API geçici olarak yanıt vermiyor.'
    });
  }
});

// CWL War details route
router.get('/cwl-war/:warTag', async (req, res) => {
  try {
    const warTag = req.params.warTag;
    const cwlWar = await cocService.getCWLWar(warTag);
    res.json(cwlWar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
