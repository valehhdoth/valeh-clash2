const axios = require('axios');
const fs = require('fs');

const itemNames = [
  // Heroes
  'Barbarian King info', 'Archer Queen info', 'Grand Warden info', 'Royal Champion info', 'Minion Prince info',
  'Battle Machine info', 'Battle Copter info',
  // Equipments
  'Giant Gauntlet', 'Spiky Ball', 'Frozen Arrow', 'Magic Mirror', 'Fireball', 'Rocket Spear', 'Haste Vial',
  'Eternal Tome', 'Healing Tome', 'Life Gem', 'Rage Gem', 'Seeking Shield', 'Royal Gem', 'Giant Arrow',
  'Archer Puppet', 'Invisibility Vial', 'Healer Puppet', 'Barbarian Puppet', 'Rage Vial', 'Earthquake Boots',
  'Vampstache', 'Lavaloon Puppet', 'Electro Boots', 'Dark Orb', 'Henchmen Puppet',
  // Troops
  'Barbarian avatar', 'Archer avatar', 'Giant avatar', 'Goblin avatar', 'Wall Breaker avatar', 'Balloon avatar',
  'Wizard avatar', 'Healer avatar', 'Dragon avatar', 'P.E.K.K.A avatar', 'Baby Dragon avatar', 'Miner avatar',
  'Electro Dragon avatar', 'Yeti avatar', 'Dragon Rider avatar', 'Electro Titan avatar', 'Root Rider avatar',
  'Furnace avatar', 'Minion avatar', 'Hog Rider avatar', 'Valkyrie avatar', 'Golem avatar', 'Witch avatar',
  'Lava Hound avatar', 'Bowler avatar', 'Ice Golem avatar', 'Headhunter avatar', 'Apprentice Warden avatar',
  'Super Barbarian avatar', 'Super Archer avatar', 'Sneaky Goblin avatar', 'Super Wall Breaker avatar',
  'Super Dragon avatar', 'Super Wizard avatar', 'Super Minion avatar', 'Ice Hound avatar',
  'Wall Wrecker avatar', 'Battle Blimp avatar', 'Stone Slammer avatar', 'Siege Barracks avatar',
  'Log Launcher avatar', 'Flame Flinger avatar', 'Battle Drill avatar',
  // Spells
  'Lightning Spell', 'Healing Spell', 'Rage Spell', 'Jump Spell', 'Freeze Spell', 'Clone Spell',
  'Invisibility Spell', 'Recall Spell', 'Overgrowth Spell', 'Poison Spell', 'Earthquake Spell',
  'Haste Spell', 'Skeleton Spell', 'Bat Spell',
  // Town Halls
  'Town Hall17', 'Town Hall16', 'Town Hall15', 'Town Hall14', 'Town Hall13', 'Town Hall12', 'Town Hall11',
  'Builder Hall10', 'Builder Hall9', 'Builder Hall8', 'Builder Hall7', 'Capital Peak10'
];

async function fetchAll() {
  const result = {};
  const chunkSize = 25;
  for (let i = 0; i < itemNames.length; i += chunkSize) {
    const chunk = itemNames.slice(i, i + chunkSize);
    const titles = chunk.map(name => `File:${name}.png`).join('|');
    try {
      const res = await axios.get(`https://clashofclans.fandom.com/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url&format=json`);
      if (res.data && res.data.query && res.data.query.pages) {
        for (const page of Object.values(res.data.query.pages)) {
          if (page.imageinfo && page.imageinfo[0]) {
            const cleanTitle = page.title.replace('File:', '').replace('.png', '').trim();
            result[cleanTitle] = page.imageinfo[0].url;
          }
        }
      }
    } catch (err) {
      console.error('Error fetching chunk:', err.message);
    }
  }
  
  console.log(`Fetched ${Object.keys(result).length} official image URLs!`);
  fs.writeFileSync('./src/services/cocAssetMap.json', JSON.stringify(result, null, 2));
}

fetchAll();
