const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const dataDir = path.join(__dirname, '../data');
const usersFile = path.join(dataDir, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

function loadUsers() {
  try {
    if (fs.existsSync(usersFile)) {
      const data = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
      return Array.isArray(data) ? data : [];
    }
  } catch (e) {
    console.error('Error reading users.json:', e.message);
  }
  return [];
}

function saveUsers(users) {
  try {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error saving users.json:', e.message);
    return false;
  }
}

// ----------------------------------------------------
// 1. User Registration & Authentication
// ----------------------------------------------------
function registerUser({ username, email, password }) {
  const cleanUsername = (username || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();

  if (!cleanUsername || cleanUsername.length < 3) {
    throw new Error('Kullanıcı adı en az 3 karakter olmalıdır.');
  }
  if (!cleanEmail || !cleanEmail.includes('@')) {
    throw new Error('Geçerli bir e-posta adresi giriniz.');
  }
  if (!password || password.length < 6) {
    throw new Error('Şifre en az 6 karakter olmalıdır.');
  }

  const users = loadUsers();
  
  const userExists = users.some(u => u.username.toLowerCase() === cleanUsername.toLowerCase());
  if (userExists) {
    throw new Error('Bu kullanıcı adı zaten kullanılmaktadır.');
  }

  const emailExists = users.some(u => u.email.toLowerCase() === cleanEmail);
  if (emailExists) {
    throw new Error('Bu e-posta adresiyle kayıtlı bir hesap zaten var.');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);

  const newUser = {
    id: 'usr_' + Date.now().toString(36) + crypto.randomBytes(4).toString('hex'),
    username: cleanUsername,
    email: cleanEmail,
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
    linkedVillages: [], // Array of linked player tags
    snapshots: {} // Map: { [playerTag]: [ { timestamp, date, townHallLevel, trophies, heroes, ... } ] }
  };

  users.push(newUser);
  saveUsers(users);

  return sanitizeUser(newUser);
}

function authenticateUser(usernameOrEmail, password) {
  const clean = (usernameOrEmail || '').trim().toLowerCase();
  const users = loadUsers();

  const user = users.find(u => u.username.toLowerCase() === clean || u.email.toLowerCase() === clean);
  if (!user) {
    throw new Error('Kullanıcı adı veya şifre hatalı.');
  }

  const checkHash = hashPassword(password, user.salt);
  if (checkHash !== user.passwordHash) {
    throw new Error('Kullanıcı adı veya şifre hatalı.');
  }

  return sanitizeUser(user);
}

function getUserById(userId) {
  const users = loadUsers();
  const user = users.find(u => u.id === userId);
  return user ? sanitizeUser(user) : null;
}

function getRawUserById(userId) {
  const users = loadUsers();
  return users.find(u => u.id === userId) || null;
}

function sanitizeUser(user) {
  if (!user) return null;
  const { salt, passwordHash, ...safe } = user;
  return safe;
}

// ----------------------------------------------------
// 2. Village Linking & Unlinking
// ----------------------------------------------------
function linkVillageTag(userId, playerTag, villageData = null) {
  const cleanTag = playerTag.trim().startsWith('#') ? playerTag.trim().toUpperCase() : '#' + playerTag.trim().toUpperCase();
  const users = loadUsers();
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('Kullanıcı bulunamadı.');

  if (!user.linkedVillages) user.linkedVillages = [];
  
  const existing = user.linkedVillages.find(v => v.tag === cleanTag);
  if (!existing) {
    user.linkedVillages.push({
      tag: cleanTag,
      name: villageData?.name || cleanTag,
      townHallLevel: villageData?.townHallLevel || 1,
      trophies: villageData?.trophies || 0,
      clanName: villageData?.clan?.name || '',
      linkedAt: new Date().toLocaleDateString('tr-TR')
    });
  } else if (villageData) {
    existing.name = villageData.name || existing.name;
    existing.townHallLevel = villageData.townHallLevel || existing.townHallLevel;
    existing.trophies = villageData.trophies || existing.trophies;
    existing.clanName = villageData.clan?.name || existing.clanName;
  }

  // Record initial snapshot if data provided
  if (villageData) {
    recordSnapshotInternal(user, cleanTag, villageData);
  }

  saveUsers(users);
  return sanitizeUser(user);
}

function unlinkVillageTag(userId, playerTag) {
  const cleanTag = playerTag.trim().toUpperCase();
  const users = loadUsers();
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('Kullanıcı bulunamadı.');

  user.linkedVillages = (user.linkedVillages || []).filter(v => v.tag !== cleanTag);
  saveUsers(users);
  return sanitizeUser(user);
}

// ----------------------------------------------------
// 3. Progress Snapshot Engine (Zaman İçinde Gelişim)
// ----------------------------------------------------
function recordSnapshot(userId, playerTag, villageData) {
  const cleanTag = playerTag.trim().toUpperCase();
  const users = loadUsers();
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('Kullanıcı bulunamadı.');

  const snapshot = recordSnapshotInternal(user, cleanTag, villageData);
  saveUsers(users);
  return snapshot;
}

function recordSnapshotInternal(user, cleanTag, villageData) {
  if (!user.snapshots) user.snapshots = {};
  if (!user.snapshots[cleanTag]) user.snapshots[cleanTag] = [];

  const heroesMap = {};
  if (villageData.heroes && Array.isArray(villageData.heroes)) {
    villageData.heroes.forEach(h => {
      heroesMap[h.name] = { level: h.level, maxLevel: h.maxLevel, village: h.village || 'home' };
    });
  }

  const equipmentMap = {};
  if (villageData.heroEquipment && Array.isArray(villageData.heroEquipment)) {
    villageData.heroEquipment.forEach(eq => {
      equipmentMap[eq.name] = { level: eq.level, maxLevel: eq.maxLevel };
    });
  }

  const troopsMap = {};
  if (villageData.troops && Array.isArray(villageData.troops)) {
    villageData.troops.forEach(tr => {
      troopsMap[tr.name] = { level: tr.level, maxLevel: tr.maxLevel, village: tr.village || 'home' };
    });
  }

  const spellsMap = {};
  if (villageData.spells && Array.isArray(villageData.spells)) {
    villageData.spells.forEach(sp => {
      spellsMap[sp.name] = { level: sp.level, maxLevel: sp.maxLevel };
    });
  }

  // Calculate overall TH18 Completion Percentage Score (0 to 100%)
  const th = villageData.townHallLevel || 1;
  const thScore = (th / 18) * 30; // 30% from Town Hall level

  let heroTotalLevels = 0, heroTotalMax = 0;
  Object.values(heroesMap).forEach(h => {
    if (h.village !== 'builderBase') {
      heroTotalLevels += h.level;
      heroTotalMax += (h.maxLevel || 95);
    }
  });
  const heroScore = heroTotalMax > 0 ? (heroTotalLevels / heroTotalMax) * 40 : 0; // 40% from Heroes

  let troopTotalLevels = 0, troopTotalMax = 0;
  Object.values(troopsMap).forEach(tr => {
    if (tr.village !== 'builderBase') {
      troopTotalLevels += tr.level;
      troopTotalMax += (tr.maxLevel || 12);
    }
  });
  const troopScore = troopTotalMax > 0 ? (troopTotalLevels / troopTotalMax) * 30 : 0; // 30% from Troops/Spells

  const completionPercentage = Math.min(100, Math.max(1, Math.round(thScore + heroScore + troopScore)));

  const now = new Date();
  const newSnapshot = {
    id: 'snp_' + Date.now().toString(36),
    timestamp: now.getTime(),
    dateFormatted: now.toLocaleDateString('tr-TR') + ' ' + now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    townHallLevel: villageData.townHallLevel || 1,
    townHallWeaponLevel: villageData.townHallWeaponLevel || 0,
    trophies: villageData.trophies || 0,
    bestTrophies: villageData.bestTrophies || 0,
    warStars: villageData.warStars || 0,
    attackWins: villageData.attackWins || 0,
    defenseWins: villageData.defenseWins || 0,
    clanCapitalContributions: villageData.clanCapitalContributions || 0,
    builderHallLevel: villageData.builderHallLevel || 0,
    builderBaseTrophies: villageData.builderBaseTrophies || 0,
    warPreference: villageData.warPreference || 'in',
    league: villageData.league ? { name: villageData.league.name, iconUrls: villageData.league.iconUrls } : { name: 'Lig Yok' },
    builderBaseLeague: villageData.builderBaseLeague ? { name: villageData.builderBaseLeague.name } : null,
    heroes: heroesMap,
    heroEquipment: equipmentMap,
    troops: troopsMap,
    spells: spellsMap,
    completionPercentage,
    clan: villageData.clan ? { name: villageData.clan.name, tag: villageData.clan.tag, role: villageData.role } : null
  };

  // Keep last 30 snapshots per village
  user.snapshots[cleanTag].unshift(newSnapshot);
  if (user.snapshots[cleanTag].length > 30) {
    user.snapshots[cleanTag].pop();
  }

  return newSnapshot;
}

function getProgressionHistory(userId, playerTag) {
  const users = loadUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return { snapshots: [], diffs: null };

  const cleanTag = playerTag.trim().toUpperCase();
  const list = (user.snapshots && user.snapshots[cleanTag]) || [];
  
  if (list.length === 0) {
    return { snapshots: [], diffs: null };
  }

  // Calculate diff between newest (index 0) and oldest (last index) or previous snapshot
  const latest = list[0];
  const previous = list.length > 1 ? list[1] : list[0];
  const oldest = list[list.length - 1];

  const diffs = {
    trophiesDiff: latest.trophies - oldest.trophies,
    trophiesDiffPrev: latest.trophies - previous.trophies,
    warStarsDiff: latest.warStars - oldest.warStars,
    thDiff: latest.townHallLevel - oldest.townHallLevel,
    thWeaponDiff: (latest.townHallWeaponLevel || 0) - (oldest.townHallWeaponLevel || 0),
    capitalDiff: latest.clanCapitalContributions - oldest.clanCapitalContributions,
    attackWinsDiff: latest.attackWins - oldest.attackWins,
    builderHallDiff: (latest.builderHallLevel || 0) - (oldest.builderHallLevel || 0),
    builderTrophiesDiff: (latest.builderBaseTrophies || 0) - (oldest.builderBaseTrophies || 0),
    completionDiff: (latest.completionPercentage || 0) - (oldest.completionPercentage || 0),
    heroDiffs: {},
    equipmentDiffs: {},
    troopDiffs: {},
    spellDiffs: {}
  };

  // Hero diffs
  Object.keys(latest.heroes || {}).forEach(heroName => {
    const latestLvl = latest?.heroes?.[heroName]?.level || 0;
    const oldestLvl = oldest?.heroes?.[heroName]?.level ?? latestLvl;
    diffs.heroDiffs[heroName] = latestLvl - oldestLvl;
  });

  // Equipment diffs
  Object.keys(latest.heroEquipment || {}).forEach(eqName => {
    const latestLvl = latest?.heroEquipment?.[eqName]?.level || 0;
    const oldestLvl = oldest?.heroEquipment?.[eqName]?.level ?? latestLvl;
    diffs.equipmentDiffs[eqName] = latestLvl - oldestLvl;
  });

  // Troop diffs
  Object.keys(latest.troops || {}).forEach(trName => {
    const latestLvl = latest?.troops?.[trName]?.level || 0;
    const oldestLvl = oldest?.troops?.[trName]?.level ?? latestLvl;
    if (latestLvl - oldestLvl > 0) {
      diffs.troopDiffs[trName] = latestLvl - oldestLvl;
    }
  });

  // Spell diffs
  Object.keys(latest.spells || {}).forEach(spName => {
    const latestLvl = latest?.spells?.[spName]?.level || 0;
    const oldestLvl = oldest?.spells?.[spName]?.level ?? latestLvl;
    if (latestLvl - oldestLvl > 0) {
      diffs.spellDiffs[spName] = latestLvl - oldestLvl;
    }
  });

  return {
    snapshots: list,
    latest,
    oldest,
    previous,
    diffs
  };
}

function getAllUsers() {
  const users = loadUsers();
  return users.map(u => {
    const safe = sanitizeUser(u);
    let totalSnapshots = 0;
    if (u.snapshots) {
      Object.values(u.snapshots).forEach(list => {
        if (Array.isArray(list)) totalSnapshots += list.length;
      });
    }
    return {
      ...safe,
      totalSnapshots,
      villagesCount: (u.linkedVillages || []).length
    };
  });
}

function deleteUser(userId) {
  let users = loadUsers();
  users = users.filter(u => u.id !== userId);
  return saveUsers(users);
}

module.exports = {
  registerUser,
  authenticateUser,
  getUserById,
  getAllUsers,
  deleteUser,
  linkVillageTag,
  unlinkVillageTag,
  recordSnapshot,
  getProgressionHistory
};
