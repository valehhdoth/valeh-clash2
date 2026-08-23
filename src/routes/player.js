const express = require('express');
const router = express.Router();
const cocService = require('../services/cocService');

// Player Profile Route
router.get('/:tag?', async (req, res) => {
  try {
    const rawTag = req.params.tag || req.query.tag || '#9PRQL200';
    const player = await cocService.getPlayer(rawTag);

    res.render('player', {
      title: `${player.name} (${player.tag}) | Oyuncu Profili`,
      activePage: 'player',
      isLiveApi: cocService.isConfigured(),
      player,
      verifyResult: null
    });
  } catch (error) {
    console.error('Player route error:', error);
    res.status(500).render('404', {
      title: 'Oyuncu Bulunamadı',
      message: 'Aradığınız oyuncu bulunamadı veya API geçici olarak yanıt vermiyor.'
    });
  }
});

// Verify In-Game Account Ownership Token
router.post('/verify', async (req, res) => {
  const { tag, token } = req.body;
  if (!tag || !token) {
    return res.redirect(`/player/${encodeURIComponent(tag || '#9PRQL200')}`);
  }

  const [player, verifyResult] = await Promise.all([
    cocService.getPlayer(tag),
    cocService.verifyPlayerToken(tag, token)
  ]);

  res.render('player', {
    title: `${player.name} (${player.tag}) | Hesap Doğrulama`,
    activePage: 'player',
    isLiveApi: cocService.isConfigured(),
    player,
    verifyResult
  });
});

module.exports = router;
