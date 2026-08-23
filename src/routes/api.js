const express = require('express');
const router = express.Router();
const cocService = require('../services/cocService');

// Player endpoints
router.get('/player/:tag', async (req, res) => {
  try {
    const data = await cocService.getPlayer(req.params.tag);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/player/:tag/verifytoken', async (req, res) => {
  try {
    const data = await cocService.verifyPlayerToken(req.params.tag, req.body.token);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Clan endpoints
router.get('/clan/:tag', async (req, res) => {
  try {
    const data = await cocService.getClan(req.params.tag);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/clan/:tag/members', async (req, res) => {
  try {
    const data = await cocService.getClanMembers(req.params.tag);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/clan/:tag/currentwar', async (req, res) => {
  try {
    const data = await cocService.getCurrentWar(req.params.tag);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/clan/:tag/warlog', async (req, res) => {
  try {
    const data = await cocService.getWarLog(req.params.tag);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/clan/:tag/cwl', async (req, res) => {
  try {
    const data = await cocService.getClanCWLGroup(req.params.tag);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/clan/:tag/capitalraids', async (req, res) => {
  try {
    const data = await cocService.getClanCapitalRaids(req.params.tag);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leagues
router.get('/leagues', async (req, res) => {
  try {
    const data = await cocService.getLeagues();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Locations & Rankings
router.get('/locations', async (req, res) => {
  try {
    const data = await cocService.getLocations();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/rankings', async (req, res) => {
  try {
    const data = await cocService.getRankings(req.query.type, req.query.location);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gold Pass
router.get('/goldpass', async (req, res) => {
  try {
    const data = await cocService.getGoldPass();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
