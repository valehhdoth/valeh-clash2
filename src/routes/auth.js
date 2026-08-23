const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const cocService = require('../services/cocService');

// Middleware to check if user is authenticated
function requireAuth(req, res, next) {
  const userId = (req.session && req.session.userId) || (req.cookies && req.cookies['coc_user_id']);
  if (userId) {
    const user = userService.getUserById(userId);
    if (user) {
      if (req.session) {
        req.session.userId = user.id;
        req.session.username = user.username;
      }
      return next();
    }
  }
  res.redirect('/login?returnUrl=' + encodeURIComponent(req.originalUrl || '/my-account'));
}

// ----------------------------------------------------
// 1. Authentication Pages & Handlers
// ----------------------------------------------------
router.get('/login', (req, res) => {
  const userId = (req.session && req.session.userId) || (req.cookies && req.cookies['coc_user_id']);
  if (userId && userService.getUserById(userId)) {
    return res.redirect('/my-account');
  }
  res.render('auth/login', {
    title: 'Giriş Yap | ClashPortal',
    activePage: 'login',
    error: req.query.error || null,
    msg: req.query.msg || null,
    returnUrl: req.query.returnUrl || '/my-account'
  });
});

router.post('/login', (req, res) => {
  const { username, password, returnUrl } = req.body;
  try {
    const user = userService.authenticateUser(username, password);
    if (req.session) {
      req.session.userId = user.id;
      req.session.username = user.username;
    }
    res.cookie('coc_user_id', user.id, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    res.redirect(returnUrl || '/my-account');
  } catch (err) {
    res.redirect(`/login?error=${encodeURIComponent(err.message)}&returnUrl=${encodeURIComponent(returnUrl || '/my-account')}`);
  }
});

router.get('/register', (req, res) => {
  const userId = (req.session && req.session.userId) || (req.cookies && req.cookies['coc_user_id']);
  if (userId && userService.getUserById(userId)) {
    return res.redirect('/my-account');
  }
  res.render('auth/register', {
    title: 'Kayıt Ol | ClashPortal',
    activePage: 'register',
    error: req.query.error || null
  });
});

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.redirect('/register?error=' + encodeURIComponent('Girilen şifreler birbiriyle uyuşmuyor.'));
  }

  try {
    const user = userService.registerUser({ username, email, password });
    if (req.session) {
      req.session.userId = user.id;
      req.session.username = user.username;
    }
    res.cookie('coc_user_id', user.id, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    res.redirect('/my-account?msg=welcome');
  } catch (err) {
    res.redirect('/register?error=' + encodeURIComponent(err.message));
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('coc_user_id');
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

// ----------------------------------------------------
// 2. User Account Dashboard & Village Progression Hub
// ----------------------------------------------------
router.get('/my-account', requireAuth, async (req, res) => {
  try {
    const user = userService.getUserById(req.session.userId);
    if (!user) {
      req.session.destroy();
      return res.redirect('/login');
    }

    const selectedTag = req.query.tag || (user.linkedVillages && user.linkedVillages[0]?.tag) || null;
    let liveVillage = null;
    let history = { snapshots: [], diffs: null };

    if (selectedTag) {
      // Fetch fresh live village data
      liveVillage = await cocService.getPlayer(selectedTag);
      
      // If live data retrieved, auto-record progression snapshot if needed
      if (liveVillage && liveVillage.tag) {
        userService.recordSnapshot(user.id, selectedTag, liveVillage);
      }

      history = userService.getProgressionHistory(user.id, selectedTag);
    }

    res.render('user/dashboard', {
      title: `${user.username} | Köyüm ve Gelişim Takibi`,
      activePage: 'my-account',
      user,
      selectedTag,
      liveVillage,
      history,
      msg: req.query.msg || null,
      error: req.query.error || null
    });
  } catch (err) {
    console.error('Account dashboard error:', err);
    res.redirect('/?error=' + encodeURIComponent(err.message));
  }
});

// Link a new Village Player Tag
router.post('/my-account/link-tag', requireAuth, async (req, res) => {
  const { playerTag } = req.body;
  if (!playerTag || playerTag.trim().length < 3) {
    return res.redirect('/my-account?error=' + encodeURIComponent('Lütfen geçerli bir oyuncu etiketi (#TAG) giriniz.'));
  }

  try {
    const cleanTag = playerTag.trim().toUpperCase().startsWith('#') ? playerTag.trim().toUpperCase() : '#' + playerTag.trim().toUpperCase();
    const livePlayer = await cocService.getPlayer(cleanTag);
    
    userService.linkVillageTag(req.session.userId, cleanTag, livePlayer);
    res.redirect(`/my-account?tag=${encodeURIComponent(cleanTag)}&msg=village_linked`);
  } catch (err) {
    res.redirect('/my-account?error=' + encodeURIComponent(err.message));
  }
});

// Unlink a Village
router.post('/my-account/unlink-tag', requireAuth, (req, res) => {
  const { playerTag } = req.body;
  if (playerTag) {
    userService.unlinkVillageTag(req.session.userId, playerTag);
  }
  res.redirect('/my-account?msg=village_unlinked');
});

// Force manual progress snapshot
router.post('/my-account/snapshot', requireAuth, async (req, res) => {
  const { playerTag } = req.body;
  if (!playerTag) return res.redirect('/my-account');

  try {
    const livePlayer = await cocService.getPlayer(playerTag);
    userService.recordSnapshot(req.session.userId, playerTag, livePlayer);
    res.redirect(`/my-account?tag=${encodeURIComponent(playerTag)}&msg=snapshot_saved`);
  } catch (err) {
    res.redirect(`/my-account?tag=${encodeURIComponent(playerTag)}&error=${encodeURIComponent(err.message)}`);
  }
});

module.exports = router;
