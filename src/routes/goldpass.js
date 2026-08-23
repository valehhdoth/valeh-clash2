const express = require('express');
const router = express.Router();
const cocService = require('../services/cocService');

// Gold Pass Route
router.get('/', async (req, res) => {
  try {
    const goldPass = await cocService.getGoldPass();

    res.render('goldpass', {
      title: 'Altın Bilet & Sezon Detayları | Clash of Clans',
      activePage: 'goldpass',
      isLiveApi: cocService.isConfigured(),
      goldPass
    });
  } catch (error) {
    console.error('Gold Pass route error:', error);
    res.render('goldpass', {
      title: 'Altın Bilet',
      activePage: 'goldpass',
      isLiveApi: false,
      goldPass: null
    });
  }
});

module.exports = router;
