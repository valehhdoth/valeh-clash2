// Complete Exhaustive Catalog of Clash of Clans Characters, Troops, Spells, Equipment, Pets, and Siege Machines
const ENTITY_CATEGORIES = {
  heroes: {
    id: 'heroes',
    title: 'Kahramanlar (Heroes)',
    badge: '👑 Kahraman',
    items: [
      { id: 'Barbarian King', name: 'Barbarian King', defaultNameTr: 'Barbar Kral', defaultImage: '/images/assets/barbarian_king_info.png' },
      { id: 'Archer Queen', name: 'Archer Queen', defaultNameTr: 'Okçu Kraliçe', defaultImage: '/images/assets/archer_queen_info.png' },
      { id: 'Grand Warden', name: 'Grand Warden', defaultNameTr: 'Büyük Koruyucu', defaultImage: '/images/assets/grand_warden_info.png' },
      { id: 'Royal Champion', name: 'Royal Champion', defaultNameTr: 'Kraliyet Şampiyonu', defaultImage: '/images/assets/royal_champion_info.png' },
      { id: 'Minion Prince', name: 'Minion Prince', defaultNameTr: 'Dalkavuk Prens', defaultImage: '/images/assets/minion_prince_info.png' },
      { id: 'Dragon Duke', name: 'Dragon Duke', defaultNameTr: 'Ejderha Dükü (Dragon Duke)', defaultImage: '/images/assets/dragon_info.png' },
      { id: 'Battle Machine', name: 'Battle Machine', defaultNameTr: 'Savaş Makinesi', defaultImage: '/images/assets/battle_machine_info.png' },
      { id: 'Battle Copter', name: 'Battle Copter', defaultNameTr: 'Savaş Helikopteri', defaultImage: '/images/assets/battle_copter_info.png' }
    ]
  },
  troops: {
    id: 'troops',
    title: 'Ana Köy Askerleri (Home Troops)',
    badge: '⚔️ Birlik',
    items: [
      { id: 'Barbarian', name: 'Barbarian', defaultNameTr: 'Barbar', defaultImage: '/images/assets/barbarian_info.png' },
      { id: 'Archer', name: 'Archer', defaultNameTr: 'Okçu', defaultImage: '/images/assets/archer_info.png' },
      { id: 'Giant', name: 'Giant', defaultNameTr: 'Dev', defaultImage: '/images/assets/giant_info.png' },
      { id: 'Goblin', name: 'Goblin', defaultNameTr: 'Goblin', defaultImage: '/images/assets/goblin_info.png' },
      { id: 'Wall Breaker', name: 'Wall Breaker', defaultNameTr: 'Duvar Yıkıcı', defaultImage: '/images/assets/wall_breaker_info.png' },
      { id: 'Balloon', name: 'Balloon', defaultNameTr: 'Balon', defaultImage: '/images/assets/balloon_info.png' },
      { id: 'Wizard', name: 'Wizard', defaultNameTr: 'Büyücü', defaultImage: '/images/assets/wizard_info.png' },
      { id: 'Healer', name: 'Healer', defaultNameTr: 'Şifacı', defaultImage: '/images/assets/healer_info.png' },
      { id: 'Dragon', name: 'Dragon', defaultNameTr: 'Ejderha', defaultImage: '/images/assets/dragon_info.png' },
      { id: 'P.E.K.K.A', name: 'P.E.K.K.A', defaultNameTr: 'P.E.K.K.A', defaultImage: '/images/assets/p_e_k_k_a_info.png' },
      { id: 'Baby Dragon', name: 'Baby Dragon', defaultNameTr: 'Bebek Ejderha', defaultImage: '/images/assets/baby_dragon_info.png' },
      { id: 'Miner', name: 'Miner', defaultNameTr: 'Madenci', defaultImage: '/images/assets/miner_info.png' },
      { id: 'Electro Dragon', name: 'Electro Dragon', defaultNameTr: 'Elektro Ejderha', defaultImage: '/images/assets/electro_dragon_info.png' },
      { id: 'Yeti', name: 'Yeti', defaultNameTr: 'Yeti', defaultImage: '/images/assets/yeti_info.png' },
      { id: 'Dragon Rider', name: 'Dragon Rider', defaultNameTr: 'Ejderha Binicisi', defaultImage: '/images/assets/dragon_rider_info.png' },
      { id: 'Electro Titan', name: 'Electro Titan', defaultNameTr: 'Elektro Titan', defaultImage: '/images/assets/electro_titan_info.png' },
      { id: 'Root Rider', name: 'Root Rider', defaultNameTr: 'Kök Binicisi', defaultImage: '/images/assets/root_rider_info.png' },
      { id: 'Minion', name: 'Minion', defaultNameTr: 'Dalkavuk', defaultImage: '/images/assets/minion_info.png' },
      { id: 'Hog Rider', name: 'Hog Rider', defaultNameTr: 'Domuz Binicisi', defaultImage: '/images/assets/hog_rider_info.png' },
      { id: 'Valkyrie', name: 'Valkyrie', defaultNameTr: 'Valkür', defaultImage: '/images/assets/valkyrie_info.png' },
      { id: 'Golem', name: 'Golem', defaultNameTr: 'Golem', defaultImage: '/images/assets/golem_info.png' },
      { id: 'Witch', name: 'Witch', defaultNameTr: 'Cadı', defaultImage: '/images/assets/witch_info.png' },
      { id: 'Lava Hound', name: 'Lava Hound', defaultNameTr: 'Lav Tazısı', defaultImage: '/images/assets/lava_hound_info.png' },
      { id: 'Bowler', name: 'Bowler', defaultNameTr: 'Atıcı', defaultImage: '/images/assets/bowler_info.png' },
      { id: 'Ice Golem', name: 'Ice Golem', defaultNameTr: 'Buz Golem', defaultImage: '/images/assets/ice_golem_info.png' },
      { id: 'Headhunter', name: 'Headhunter', defaultNameTr: 'Kelle Avcısı', defaultImage: '/images/assets/headhunter_info.png' },
      { id: 'Apprentice Warden', name: 'Apprentice Warden', defaultNameTr: 'Çırak Koruyucu', defaultImage: '/images/assets/apprentice_warden_info.png' },
      { id: 'Druid', name: 'Druid', defaultNameTr: 'Druid', defaultImage: '/images/assets/druid_info.png' }
    ]
  },
  superTroops: {
    id: 'superTroops',
    title: 'Süper Birlikler (Super Troops)',
    badge: '⚡ Süper Birlik',
    items: [
      { id: 'Super Barbarian', name: 'Super Barbarian', defaultNameTr: 'Süper Barbar', defaultImage: '/images/assets/super_barbarian_info.png' },
      { id: 'Super Archer', name: 'Super Archer', defaultNameTr: 'Süper Okçu', defaultImage: '/images/assets/super_archer_info.png' },
      { id: 'Sneaky Goblin', name: 'Sneaky Goblin', defaultNameTr: 'Sinsi Goblin', defaultImage: '/images/assets/sneaky_goblin_info.png' },
      { id: 'Super Wall Breaker', name: 'Super Wall Breaker', defaultNameTr: 'Süper Duvar Yıkıcı', defaultImage: '/images/assets/super_wall_breaker_info.png' },
      { id: 'Super Giant', name: 'Super Giant', defaultNameTr: 'Süper Dev', defaultImage: '/images/assets/super_giant_info.png' },
      { id: 'Rocket Balloon', name: 'Rocket Balloon', defaultNameTr: 'Roket Balonu', defaultImage: '/images/assets/rocket_balloon_info.png' },
      { id: 'Super Wizard', name: 'Super Wizard', defaultNameTr: 'Süper Büyücü', defaultImage: '/images/assets/super_wizard_info.png' },
      { id: 'Super Dragon', name: 'Super Dragon', defaultNameTr: 'Süper Ejderha', defaultImage: '/images/assets/super_dragon_info.png' },
      { id: 'Inferno Dragon', name: 'Inferno Dragon', defaultNameTr: 'Cehennem Ejderhası', defaultImage: '/images/assets/inferno_dragon_info.png' },
      { id: 'Super Minion', name: 'Super Minion', defaultNameTr: 'Süper Dalkavuk', defaultImage: '/images/assets/super_minion_info.png' },
      { id: 'Super Valkyrie', name: 'Super Valkyrie', defaultNameTr: 'Süper Valkür', defaultImage: '/images/assets/super_valkyrie_info.png' },
      { id: 'Super Witch', name: 'Super Witch', defaultNameTr: 'Süper Cadı', defaultImage: '/images/assets/super_witch_info.png' },
      { id: 'Ice Hound', name: 'Ice Hound', defaultNameTr: 'Buz Tazısı', defaultImage: '/images/assets/ice_hound_info.png' },
      { id: 'Super Bowler', name: 'Super Bowler', defaultNameTr: 'Süper Atıcı', defaultImage: '/images/assets/bowler_info.png' },
      { id: 'Super Miner', name: 'Super Miner', defaultNameTr: 'Süper Madenci', defaultImage: '/images/assets/super_miner_info.png' },
      { id: 'Super Hog Rider', name: 'Super Hog Rider', defaultNameTr: 'Süper Domuz Binicisi', defaultImage: '/images/assets/super_hog_rider_info.png' }
    ]
  },
  builderTroops: {
    id: 'builderTroops',
    title: 'İnşaatçı Üssü (Builder Base)',
    badge: '🔨 İnşaatçı Birlik',
    items: [
      { id: 'Raged Barbarian', name: 'Raged Barbarian', defaultNameTr: 'Öfkeli Barbar', defaultImage: '/images/assets/barbarian_info.png' },
      { id: 'Sneaky Archer', name: 'Sneaky Archer', defaultNameTr: 'Sinsi Okçu', defaultImage: '/images/assets/archer_info.png' },
      { id: 'Boxer Giant', name: 'Boxer Giant', defaultNameTr: 'Boksör Dev', defaultImage: '/images/assets/giant_info.png' },
      { id: 'Beta Minion', name: 'Beta Minion', defaultNameTr: 'Beta Dalkavuk', defaultImage: '/images/assets/minion_info.png' },
      { id: 'Bomber', name: 'Bomber', defaultNameTr: 'Bombacı', defaultImage: '/images/assets/wall_breaker_info.png' },
      { id: 'Baby Dragon BB', name: 'Baby Dragon', defaultNameTr: 'Bebek Ejderha (İÜ)', defaultImage: '/images/assets/baby_dragon_info.png' },
      { id: 'Night Witch', name: 'Night Witch', defaultNameTr: 'Gece Cadısı', defaultImage: '/images/assets/witch_info.png' },
      { id: 'Drop Ship', name: 'Drop Ship', defaultNameTr: 'Bırakma Gemisi', defaultImage: '/images/assets/balloon_info.png' },
      { id: 'Power P.E.K.K.A', name: 'Power P.E.K.K.A', defaultNameTr: 'Güç P.E.K.K.A', defaultImage: '/images/assets/p_e_k_k_a_info.png' },
      { id: 'Hog Glider', name: 'Hog Glider', defaultNameTr: 'Domuz Planörü', defaultImage: '/images/assets/hog_rider_info.png' },
      { id: 'Electrofire Wizard', name: 'Electrofire Wizard', defaultNameTr: 'Elektroateş Büyücüsü', defaultImage: '/images/assets/wizard_info.png' }
    ]
  },
  pets: {
    id: 'pets',
    title: 'Evcil Hayvanlar (Hero Pets)',
    badge: '🐾 Evcil Hayvan',
    items: [
      { id: 'L.A.S.S.I', name: 'L.A.S.S.I', defaultNameTr: 'L.A.S.S.I', defaultImage: '/images/assets/barbarian_puppet.png' },
      { id: 'Electro Owl', name: 'Electro Owl', defaultNameTr: 'Elektro Baykuş', defaultImage: '/images/assets/eternal_tome.png' },
      { id: 'Mighty Yak', name: 'Mighty Yak', defaultNameTr: 'Güçlü Yak', defaultImage: '/images/assets/earthquake_boots.png' },
      { id: 'Unicorn', name: 'Unicorn', defaultNameTr: 'Tekboynuz', defaultImage: '/images/assets/healer_puppet.png' },
      { id: 'Frosty', name: 'Frosty', defaultNameTr: 'Ayaz (Frosty)', defaultImage: '/images/assets/frozen_arrow.png' },
      { id: 'Diggy', name: 'Diggy', defaultNameTr: 'Kazıcı (Diggy)', defaultImage: '/images/assets/spiky_ball.png' },
      { id: 'Poison Lizard', name: 'Poison Lizard', defaultNameTr: 'Zehir Kertenkelesi', defaultImage: '/images/assets/poison_spell_info.png' },
      { id: 'Phoenix', name: 'Phoenix', defaultNameTr: 'Anka Kuşu (Phoenix)', defaultImage: '/images/assets/fireball.png' },
      { id: 'Spirit Fox', name: 'Spirit Fox', defaultNameTr: 'Ruh Tilkisi (Spirit Fox)', defaultImage: '/images/assets/magic_mirror.png' },
      { id: 'Angry Jelly', name: 'Angry Jelly', defaultNameTr: 'Kızgın Denizanası', defaultImage: '/images/assets/dark_orb.png' }
    ]
  },
  spells: {
    id: 'spells',
    title: 'Büyüler (Spells)',
    badge: '🔮 Büyü',
    items: [
      { id: 'Lightning Spell', name: 'Lightning Spell', defaultNameTr: 'Yıldırım Büyüsü', defaultImage: '/images/assets/lightning_spell_info.png' },
      { id: 'Healing Spell', name: 'Healing Spell', defaultNameTr: 'İyileştirme Büyüsü', defaultImage: '/images/assets/healing_spell_info.png' },
      { id: 'Rage Spell', name: 'Rage Spell', defaultNameTr: 'Öfke Büyüsü', defaultImage: '/images/assets/rage_spell_info.png' },
      { id: 'Jump Spell', name: 'Jump Spell', defaultNameTr: 'Atlatma Büyüsü', defaultImage: '/images/assets/jump_spell_info.png' },
      { id: 'Freeze Spell', name: 'Freeze Spell', defaultNameTr: 'Dondurma Büyüsü', defaultImage: '/images/assets/freeze_spell_info.png' },
      { id: 'Clone Spell', name: 'Clone Spell', defaultNameTr: 'Klon Büyüsü', defaultImage: '/images/assets/clone_spell_info.png' },
      { id: 'Invisibility Spell', name: 'Invisibility Spell', defaultNameTr: 'Görünmezlik Büyüsü', defaultImage: '/images/assets/invisibility_spell_info.png' },
      { id: 'Recall Spell', name: 'Recall Spell', defaultNameTr: 'Geri Çağırma Büyüsü', defaultImage: '/images/assets/recall_spell_info.png' },
      { id: 'Overgrowth Spell', name: 'Overgrowth Spell', defaultNameTr: 'Sarmaşık Büyüsü', defaultImage: '/images/assets/overgrowth_spell_info.png' },
      { id: 'Poison Spell', name: 'Poison Spell', defaultNameTr: 'Zehir Büyüsü', defaultImage: '/images/assets/poison_spell_info.png' },
      { id: 'Earthquake Spell', name: 'Earthquake Spell', defaultNameTr: 'Deprem Büyüsü', defaultImage: '/images/assets/earthquake_spell_info.png' },
      { id: 'Haste Spell', name: 'Haste Spell', defaultNameTr: 'Acele Büyüsü', defaultImage: '/images/assets/haste_spell_info.png' },
      { id: 'Skeleton Spell', name: 'Skeleton Spell', defaultNameTr: 'İskelet Büyüsü', defaultImage: '/images/assets/skeleton_spell_info.png' },
      { id: 'Bat Spell', name: 'Bat Spell', defaultNameTr: 'Yarasa Büyüsü', defaultImage: '/images/assets/bat_spell_info.png' }
    ]
  },
  equipment: {
    id: 'equipment',
    title: 'Kahraman Ekipmanları (Hero Equipment)',
    badge: '🛡️ Ekipman',
    items: [
      // BK Equipments
      { id: 'Giant Gauntlet', name: 'Giant Gauntlet', defaultNameTr: 'Dev Eldiven (BK)', defaultImage: '/images/assets/giant_gauntlet.png' },
      { id: 'Spiky Ball', name: 'Spiky Ball', defaultNameTr: 'Dikenli Top (BK)', defaultImage: '/images/assets/spiky_ball.png' },
      { id: 'Barbarian Puppet', name: 'Barbarian Puppet', defaultNameTr: 'Barbar Kuklası (BK)', defaultImage: '/images/assets/barbarian_puppet.png' },
      { id: 'Rage Vial', name: 'Rage Vial', defaultNameTr: 'Öfke Şişesi (BK)', defaultImage: '/images/assets/rage_vial.png' },
      { id: 'Earthquake Boots', name: 'Earthquake Boots', defaultNameTr: 'Deprem Çizmeleri (BK)', defaultImage: '/images/assets/earthquake_boots.png' },
      { id: 'Vampstache', name: 'Vampstache', defaultNameTr: 'Vampir Bıyığı (BK)', defaultImage: '/images/assets/vampstache.png' },

      // AQ Equipments
      { id: 'Frozen Arrow', name: 'Frozen Arrow', defaultNameTr: 'Buz Oku (AQ)', defaultImage: '/images/assets/frozen_arrow.png' },
      { id: 'Magic Mirror', name: 'Magic Mirror', defaultNameTr: 'Sihirli Ayna (AQ)', defaultImage: '/images/assets/magic_mirror.png' },
      { id: 'Giant Arrow', name: 'Giant Arrow', defaultNameTr: 'Dev Ok (AQ)', defaultImage: '/images/assets/giant_arrow.png' },
      { id: 'Archer Puppet', name: 'Archer Puppet', defaultNameTr: 'Okçu Kuklası (AQ)', defaultImage: '/images/assets/archer_puppet.png' },
      { id: 'Invisibility Vial', name: 'Invisibility Vial', defaultNameTr: 'Görünmezlik Şişesi (AQ)', defaultImage: '/images/assets/invisibility_vial.png' },
      { id: 'Healer Puppet', name: 'Healer Puppet', defaultNameTr: 'Şifacı Kuklası (AQ)', defaultImage: '/images/assets/healer_puppet.png' },

      // GW Equipments
      { id: 'Eternal Tome', name: 'Eternal Tome', defaultNameTr: 'Ebedi Kitap (GW)', defaultImage: '/images/assets/eternal_tome.png' },
      { id: 'Healing Tome', name: 'Healing Tome', defaultNameTr: 'İyileştirme Kitabı (GW)', defaultImage: '/images/assets/healing_tome.png' },
      { id: 'Fireball', name: 'Fireball', defaultNameTr: 'Ateş Topu (GW)', defaultImage: '/images/assets/fireball.png' },
      { id: 'Life Gem', name: 'Life Gem', defaultNameTr: 'Yaşam Mücevheri (GW)', defaultImage: '/images/assets/life_gem.png' },
      { id: 'Rage Gem', name: 'Rage Gem', defaultNameTr: 'Öfke Mücevheri (GW)', defaultImage: '/images/assets/rage_gem.png' },
      { id: 'Lavaloon Puppet', name: 'Lavaloon Puppet', defaultNameTr: 'Lavalon Kuklası (GW)', defaultImage: '/images/assets/lavaloon_puppet.png' },

      // RC Equipments
      { id: 'Seeking Shield', name: 'Seeking Shield', defaultNameTr: 'Uçan Kalkan (RC)', defaultImage: '/images/assets/seeking_shield.png' },
      { id: 'Royal Gem', name: 'Royal Gem', defaultNameTr: 'Kraliyet Taşı (RC)', defaultImage: '/images/assets/royal_gem.png' },
      { id: 'Haste Vial', name: 'Haste Vial', defaultNameTr: 'Acele Şişesi (RC)', defaultImage: '/images/assets/haste_vial.png' },
      { id: 'Rocket Spear', name: 'Rocket Spear', defaultNameTr: 'Roket Mızrağı (RC)', defaultImage: '/images/assets/rocket_spear.png' },
      { id: 'Electro Boots', name: 'Electro Boots', defaultNameTr: 'Elektro Çizmeler (RC)', defaultImage: '/images/assets/electro_boots.png' },

      // Minion Prince Equipments
      { id: 'Dark Orb', name: 'Dark Orb', defaultNameTr: 'Karanlık Küre (MP)', defaultImage: '/images/assets/dark_orb.png' },
      { id: 'Henchmen Puppet', name: 'Henchmen Puppet', defaultNameTr: 'Uşak Kuklası (MP)', defaultImage: '/images/assets/henchmen_puppet.png' }
    ]
  },
  siege: {
    id: 'siege',
    title: 'Kuşatma Makineleri (Siege Machines)',
    badge: '🚀 Kuşatma',
    items: [
      { id: 'Wall Wrecker', name: 'Wall Wrecker', defaultNameTr: 'Duvar Yıkıcı Araç', defaultImage: '/images/assets/wall_wrecker_info.png' },
      { id: 'Battle Blimp', name: 'Battle Blimp', defaultNameTr: 'Savaş Zeplini', defaultImage: '/images/assets/battle_blimp_info.png' },
      { id: 'Stone Slammer', name: 'Stone Slammer', defaultNameTr: 'Kaya Balonu', defaultImage: '/images/assets/stone_slammer_info.png' },
      { id: 'Siege Barracks', name: 'Siege Barracks', defaultNameTr: 'Kuşatma Kışlası', defaultImage: '/images/assets/siege_barracks_info.png' },
      { id: 'Log Launcher', name: 'Log Launcher', defaultNameTr: 'Kütük Fırlatıcı', defaultImage: '/images/assets/log_launcher_info.png' },
      { id: 'Flame Flinger', name: 'Flame Flinger', defaultNameTr: 'Alev Fırlatıcı', defaultImage: '/images/assets/flame_flinger_info.png' },
      { id: 'Battle Drill', name: 'Battle Drill', defaultNameTr: 'Savaş Matkabı', defaultImage: '/images/assets/battle_drill_info.png' }
    ]
  }
};

function getAllCatalogItems() {
  const all = [];
  Object.values(ENTITY_CATEGORIES).forEach(cat => {
    cat.items.forEach(item => {
      all.push({ ...item, categoryId: cat.id, categoryTitle: cat.title, categoryBadge: cat.badge });
    });
  });
  return all;
}

module.exports = {
  ENTITY_CATEGORIES,
  getAllCatalogItems
};
