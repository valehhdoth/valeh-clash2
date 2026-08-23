const fs = require('fs');
const path = require('path');
const { MAX_TOWN_HALL_LEVEL, MIN_TOWN_HALL_LEVEL } = require('../data/townHallData');

const dir = path.join(__dirname, '../../public/images/assets');

// List of all local files on disk
let localFiles = new Set();
try {
  localFiles = new Set(fs.readdirSync(dir));
} catch (e) {}

// Exact alias mappings for CoC game names to local filenames
const exactFileMap = {
  // Heroes
  "Barbarian King": "barbarian_king_info.png",
  "Archer Queen": "archer_queen_info.png",
  "Grand Warden": "grand_warden_info.png",
  "Royal Champion": "royal_champion_info.png",
  "Minion Prince": "minion_prince_info.png",
  "Dragon Duke": "dragon_info.png",
  "Battle Machine": "battle_machine_info.png",
  "Battle Copter": "battle_copter_info.png",

  // BK Equipments
  "Giant Gauntlet": "giant_gauntlet.png",
  "Spiky Ball": "spiky_ball.png",
  "Barbarian Puppet": "barbarian_puppet.png",
  "Rage Vial": "rage_vial.png",
  "Earthquake Boots": "earthquake_boots.png",
  "Vampstache": "vampstache.png",

  // AQ Equipments
  "Frozen Arrow": "frozen_arrow.png",
  "Magic Mirror": "magic_mirror.png",
  "Giant Arrow": "giant_arrow.png",
  "Archer Puppet": "archer_puppet.png",
  "Invisibility Vial": "invisibility_vial.png",
  "Healer Puppet": "healer_puppet.png",

  // GW Equipments
  "Eternal Tome": "eternal_tome.png",
  "Healing Tome": "healing_tome.png",
  "Fireball": "fireball.png",
  "Life Gem": "life_gem.png",
  "Rage Gem": "rage_gem.png",
  "Lavaloon Puppet": "lavaloon_puppet.png",

  // RC Equipments
  "Seeking Shield": "seeking_shield.png",
  "Royal Gem": "royal_gem.png",
  "Haste Vial": "haste_vial.png",
  "Rocket Spear": "rocket_spear.png",
  "Electro Boots": "electro_boots.png",

  // Minion Prince Equipments
  "Dark Orb": "dark_orb.png",
  "Henchmen Puppet": "henchmen_puppet.png",

  // Home Troops
  "Barbarian": "barbarian_info.png",
  "Archer": "archer_info.png",
  "Giant": "giant_info.png",
  "Goblin": "goblin_info.png",
  "Wall Breaker": "wall_breaker_info.png",
  "Balloon": "balloon_info.png",
  "Wizard": "wizard_info.png",
  "Healer": "healer_info.png",
  "Dragon": "dragon_info.png",
  "P.E.K.K.A": "p_e_k_k_a_info.png",
  "PEKKA": "p_e_k_k_a_info.png",
  "Baby Dragon": "baby_dragon_info.png",
  "Miner": "miner_info.png",
  "Electro Dragon": "electro_dragon_info.png",
  "Yeti": "yeti_info.png",
  "Dragon Rider": "dragon_rider_info.png",
  "Electro Titan": "electro_titan_info.png",
  "Root Rider": "root_rider_info.png",
  "Furnace": "flame_flinger_info.png",
  "Minion": "minion_info.png",
  "Hog Rider": "hog_rider_info.png",
  "Valkyrie": "valkyrie_info.png",
  "Golem": "golem_info.png",
  "Witch": "witch_info.png",
  "Lava Hound": "lava_hound_info.png",
  "Bowler": "bowler_info.png",
  "Ice Golem": "ice_golem_info.png",
  "Headhunter": "headhunter_info.png",
  "Apprentice Warden": "apprentice_warden_info.png",
  "Druid": "druid_info.png",

  // Super Troops
  "Super Barbarian": "super_barbarian_info.png",
  "Super Archer": "super_archer_info.png",
  "Sneaky Goblin": "sneaky_goblin_info.png",
  "Super Wall Breaker": "super_wall_breaker_info.png",
  "Super Giant": "super_giant_info.png",
  "Rocket Balloon": "rocket_balloon_info.png",
  "Super Wizard": "super_wizard_info.png",
  "Super Dragon": "super_dragon_info.png",
  "Inferno Dragon": "inferno_dragon_info.png",
  "Super Minion": "super_minion_info.png",
  "Super Valkyrie": "super_valkyrie_info.png",
  "Super Witch": "super_witch_info.png",
  "Ice Hound": "ice_hound_info.png",
  "Super Bowler": "super_miner_info.png",
  "Super Miner": "super_miner_info.png",
  "Super Hog Rider": "super_hog_rider_info.png",

  // Siege Machines
  "Wall Wrecker": "wall_wrecker_info.png",
  "Battle Blimp": "battle_blimp_info.png",
  "Stone Slammer": "stone_slammer_info.png",
  "Siege Barracks": "siege_barracks_info.png",
  "Log Launcher": "log_launcher_info.png",
  "Flame Flinger": "flame_flinger_info.png",
  "Battle Drill": "battle_drill_info.png",

  // Spells
  "Lightning Spell": "lightning_spell_info.png",
  "Healing Spell": "healing_spell_info.png",
  "Rage Spell": "rage_spell_info.png",
  "Jump Spell": "jump_spell_info.png",
  "Freeze Spell": "freeze_spell_info.png",
  "Clone Spell": "clone_spell_info.png",
  "Invisibility Spell": "invisibility_spell_info.png",
  "Recall Spell": "recall_spell_info.png",
  "Overgrowth Spell": "overgrowth_spell_info.png",
  "Poison Spell": "poison_spell_info.png",
  "Earthquake Spell": "earthquake_spell_info.png",
  "Haste Spell": "haste_spell_info.png",
  "Skeleton Spell": "skeleton_spell_info.png",
  "Bat Spell": "bat_spell_info.png",

  // Town Halls (TH1 to TH18 exact keys)
  "Town Hall 1": "town_hall_1.png",
  "Town Hall 2": "town_hall_2.png",
  "Town Hall 3": "town_hall_3.png",
  "Town Hall 4": "town_hall_4.png",
  "Town Hall 5": "town_hall_5.png",
  "Town Hall 6": "town_hall_6.png",
  "Town Hall 7": "town_hall_7.png",
  "Town Hall 8": "town_hall_8.png",
  "Town Hall 9": "town_hall_9.png",
  "Town Hall 10": "town_hall_10.png",
  "Town Hall 11": "town_hall11.png",
  "Town Hall 12": "town_hall_12.png",
  "Town Hall 13": "town_hall_13.png",
  "Town Hall 14": "town_hall_14.png",
  "Town Hall 15": "town_hall_15.png",
  "Town Hall 16": "town_hall_16.png",
  "Town Hall 17": "town_hall_17.png",
  "Town Hall 18": "town_hall_18.png"
};

// Hero equipment relations
const heroEquipmentMap = {
  "Barbarian King": [
    "Giant Gauntlet", "Spiky Ball", "Barbarian Puppet", "Rage Vial", "Earthquake Boots", "Vampstache"
  ],
  "Archer Queen": [
    "Frozen Arrow", "Magic Mirror", "Giant Arrow", "Archer Puppet", "Invisibility Vial", "Healer Puppet"
  ],
  "Grand Warden": [
    "Eternal Tome", "Healing Tome", "Fireball", "Life Gem", "Rage Gem", "Lavaloon Puppet"
  ],
  "Royal Champion": [
    "Seeking Shield", "Royal Gem", "Haste Vial", "Rocket Spear", "Electro Boots"
  ],
  "Minion Prince": [
    "Dark Orb", "Henchmen Puppet"
  ]
};

function resolveLocal(filename, fallbackName) {
  if (localFiles.has(filename)) {
    return `/images/assets/${filename}`;
  }
  if (fallbackName && localFiles.has(fallbackName)) {
    return `/images/assets/${fallbackName}`;
  }
  // Try clean sanitized name
  const clean = (filename || '').toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_') + '.png';
  if (localFiles.has(clean)) {
    return `/images/assets/${clean}`;
  }
  return `/images/assets/${filename}`;
}

function getCustomImage(key) {
  try {
    const configService = require('./configService');
    const settings = configService.loadSettings();
    // Check customEntities first
    if (settings && settings.customEntities && settings.customEntities[key] && settings.customEntities[key].customImage && settings.customEntities[key].customImage.trim().length > 3) {
      return settings.customEntities[key].customImage.trim();
    }
    // Check legacy customImages
    if (settings && settings.customImages && settings.customImages[key] && settings.customImages[key].trim().length > 3) {
      return settings.customImages[key].trim();
    }
  } catch (e) {}
  return null;
}

function getEntityName(name, lang = 'tr') {
  if (!name) return '';
  try {
    const configService = require('./configService');
    const settings = configService.loadSettings();
    if (settings && settings.customEntities && settings.customEntities[name] && settings.customEntities[name].customName && settings.customEntities[name].customName.trim().length > 0) {
      return settings.customEntities[name].customName.trim();
    }
  } catch(e) {}
  return name;
}

function getHeroImage(name) {
  const custom = getCustomImage(name);
  if (custom) return custom;
  if (exactFileMap[name]) return resolveLocal(exactFileMap[name]);
  const clean = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '_') + '_info.png';
  return resolveLocal(clean, 'barbarian_king_info.png');
}

function getEquipmentImage(name) {
  const custom = getCustomImage(name);
  if (custom) return custom;
  if (exactFileMap[name]) return resolveLocal(exactFileMap[name]);
  const clean = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '_') + '.png';
  return resolveLocal(clean, 'giant_gauntlet.png');
}

function getTroopImage(name) {
  const custom = getCustomImage(name);
  if (custom) return custom;
  if (exactFileMap[name]) return resolveLocal(exactFileMap[name]);
  const cleanInfo = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '_') + '_info.png';
  const cleanRaw = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '_') + '.png';
  return resolveLocal(cleanInfo, cleanRaw);
}

function getSpellImage(name) {
  const custom = getCustomImage(name);
  if (custom) return custom;
  if (exactFileMap[name]) return resolveLocal(exactFileMap[name]);
  const cleanInfo = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '_') + '_info.png';
  const cleanRaw = (name || '').toLowerCase().replace(/[^a-z0-9]/g, '_') + '.png';
  return resolveLocal(cleanInfo, cleanRaw);
}

function getEntityImage(name, type = 'troop') {
  const custom = getCustomImage(name);
  if (custom) return custom;
  if (type === 'hero' || exactFileMap[name]?.includes('_king') || exactFileMap[name]?.includes('_queen') || exactFileMap[name]?.includes('_warden') || exactFileMap[name]?.includes('_champion')) {
    return getHeroImage(name);
  }
  if (type === 'spell' || exactFileMap[name]?.includes('_spell')) {
    return getSpellImage(name);
  }
  if (type === 'equipment') {
    return getEquipmentImage(name);
  }
  return getTroopImage(name);
}

/**
 * Accurately resolve Town Hall 1 to Town Hall 18 images
 */
function getTownHallImage(level) {
  const lvl = Math.max(MIN_TOWN_HALL_LEVEL, Math.min(MAX_TOWN_HALL_LEVEL, parseInt(level) || 18));
  
  const custom = getCustomImage(`Town Hall ${lvl}`) || getCustomImage(`TH${lvl}`);
  if (custom) return custom;

  // Exact filenames available locally
  const candidate1 = `town_hall_${lvl}.png`;
  const candidate2 = `town_hall_${lvl}_info.png`;
  const candidate3 = `town_hall${lvl}.png`;
  
  if (localFiles.has(candidate1)) return `/images/assets/${candidate1}`;
  if (localFiles.has(candidate2)) return `/images/assets/${candidate2}`;
  if (localFiles.has(candidate3)) return `/images/assets/${candidate3}`;
  
  const key = `Town Hall ${lvl}`;
  if (exactFileMap[key]) return resolveLocal(exactFileMap[key]);

  return `/images/assets/town_hall_${lvl}.png`;
}

function getBuilderHallImage(level) {
  const lvl = parseInt(level) || 10;
  if (lvl >= 10) return resolveLocal('builder_hall_10_info.png', 'builder_hall10.png');
  return resolveLocal(`builder_hall${lvl}.png`, 'builder_hall10.png');
}

function getHeroEquippedItems(hero, allEquipment) {
  if (hero && hero.equipment && Array.isArray(hero.equipment) && hero.equipment.length > 0) {
    return hero.equipment;
  }
  const allowedNames = heroEquipmentMap[hero.name] || [];
  if (!allEquipment || !Array.isArray(allEquipment)) return [];
  return allEquipment.filter(eq => allowedNames.includes(eq.name));
}

module.exports = {
  getHeroImage,
  getEquipmentImage,
  getTroopImage,
  getSpellImage,
  getEntityImage,
  getEntityName,
  getTownHallImage,
  getBuilderHallImage,
  getHeroEquippedItems,
  heroEquipmentMap,
  exactFileMap
};
