/**
 * Clash of Clans Mock Data Provider
 * Full TH1 to TH18 support, realistic game stats, CWL, Clan Capital and live rankings.
 */

const mockPlayer = {
  tag: "#9PRQL200",
  name: "ClashMaster_TR",
  townHallLevel: 18,
  townHallWeaponLevel: 5,
  expLevel: 285,
  trophies: 6240,
  bestTrophies: 6450,
  warStars: 2680,
  attackWins: 388,
  defenseWins: 94,
  builderHallLevel: 10,
  builderBaseTrophies: 5350,
  bestBuilderBaseTrophies: 5600,
  role: "coLeader",
  warPreference: "in",
  donations: 14850,
  donationsReceived: 10200,
  clanCapitalContributions: 1850000,
  clan: {
    tag: "#2PP8RGLV",
    name: "ANATOLIA WARRIORS",
    clanLevel: 25,
    badgeUrls: {
      small: "https://api-assets.clashofclans.com/badges/70/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png",
      large: "https://api-assets.clashofclans.com/badges/512/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png",
      medium: "https://api-assets.clashofclans.com/badges/200/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png"
    }
  },
  league: {
    id: 29000022,
    name: "Legend League",
    iconUrls: {
      small: "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxghC9Uh_263WdtY72ZnvU.png",
      large: "https://api-assets.clashofclans.com/leagues/288/R2zmhyqQ0_lKcDR5EyghXCxghC9Uh_263WdtY72ZnvU.png",
      medium: "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxghC9Uh_263WdtY72ZnvU.png"
    }
  },
  builderBaseLeague: {
    id: 44000030,
    name: "Diamond League I"
  },
  legendStatistics: {
    legendTrophies: 15200,
    currentSeason: {
      trophies: 6240,
      rank: 210
    },
    bestSeason: {
      season: "2026-06",
      trophies: 6450,
      rank: 64
    }
  },
  heroes: [
    { 
      name: "Barbarian King", level: 105, maxLevel: 105, village: "home",
      equipment: [
        { name: "Giant Gauntlet", level: 27, maxLevel: 27, village: "home" },
        { name: "Spiky Ball", level: 27, maxLevel: 27, village: "home" }
      ]
    },
    { 
      name: "Archer Queen", level: 105, maxLevel: 105, village: "home",
      equipment: [
        { name: "Frozen Arrow", level: 27, maxLevel: 27, village: "home" },
        { name: "Magic Mirror", level: 27, maxLevel: 27, village: "home" }
      ]
    },
    { 
      name: "Grand Warden", level: 80, maxLevel: 80, village: "home",
      equipment: [
        { name: "Eternal Tome", level: 18, maxLevel: 18, village: "home" },
        { name: "Healing Tome", level: 18, maxLevel: 18, village: "home" }
      ]
    },
    { 
      name: "Royal Champion", level: 55, maxLevel: 55, village: "home",
      equipment: [
        { name: "Rocket Spear", level: 27, maxLevel: 27, village: "home" },
        { name: "Haste Vial", level: 18, maxLevel: 18, village: "home" }
      ]
    },
    { 
      name: "Minion Prince", level: 45, maxLevel: 45, village: "home",
      equipment: [
        { name: "Dark Orb", level: 18, maxLevel: 18, village: "home" },
        { name: "Henchmen Puppet", level: 18, maxLevel: 18, village: "home" }
      ]
    },
    { name: "Battle Copter", level: 35, maxLevel: 35, village: "builderBase" },
    { name: "Battle Machine", level: 35, maxLevel: 35, village: "builderBase" }
  ],
  heroEquipment: [
    { name: "Giant Gauntlet", level: 27, maxLevel: 27, village: "home" },
    { name: "Spiky Ball", level: 27, maxLevel: 27, village: "home" },
    { name: "Frozen Arrow", level: 27, maxLevel: 27, village: "home" },
    { name: "Magic Mirror", level: 27, maxLevel: 27, village: "home" },
    { name: "Eternal Tome", level: 18, maxLevel: 18, village: "home" },
    { name: "Healing Tome", level: 18, maxLevel: 18, village: "home" },
    { name: "Fireball", level: 27, maxLevel: 27, village: "home" },
    { name: "Rocket Spear", level: 27, maxLevel: 27, village: "home" },
    { name: "Haste Vial", level: 18, maxLevel: 18, village: "home" },
    { name: "Dark Orb", level: 18, maxLevel: 18, village: "home" },
    { name: "Henchmen Puppet", level: 18, maxLevel: 18, village: "home" }
  ],
  troops: [
    { name: "Barbarian", level: 13, maxLevel: 13, village: "home" },
    { name: "Archer", level: 13, maxLevel: 13, village: "home" },
    { name: "Giant", level: 13, maxLevel: 13, village: "home" },
    { name: "Goblin", level: 10, maxLevel: 10, village: "home" },
    { name: "Wall Breaker", level: 13, maxLevel: 13, village: "home" },
    { name: "Balloon", level: 12, maxLevel: 12, village: "home" },
    { name: "Wizard", level: 13, maxLevel: 13, village: "home" },
    { name: "Healer", level: 10, maxLevel: 10, village: "home" },
    { name: "Dragon", level: 12, maxLevel: 12, village: "home" },
    { name: "P.E.K.K.A", level: 12, maxLevel: 12, village: "home" },
    { name: "Baby Dragon", level: 11, maxLevel: 11, village: "home" },
    { name: "Miner", level: 11, maxLevel: 11, village: "home" },
    { name: "Electro Dragon", level: 8, maxLevel: 8, village: "home" },
    { name: "Yeti", level: 7, maxLevel: 7, village: "home" },
    { name: "Dragon Rider", level: 5, maxLevel: 5, village: "home" },
    { name: "Electro Titan", level: 5, maxLevel: 5, village: "home" },
    { name: "Root Rider", level: 4, maxLevel: 4, village: "home" },
    { name: "Druid", level: 4, maxLevel: 4, village: "home" },
    { name: "Minion", level: 13, maxLevel: 13, village: "home" },
    { name: "Hog Rider", level: 14, maxLevel: 14, village: "home" },
    { name: "Valkyrie", level: 12, maxLevel: 12, village: "home" },
    { name: "Golem", level: 14, maxLevel: 14, village: "home" },
    { name: "Witch", level: 8, maxLevel: 8, village: "home" },
    { name: "Lava Hound", level: 8, maxLevel: 8, village: "home" },
    { name: "Bowler", level: 9, maxLevel: 9, village: "home" },
    { name: "Ice Golem", level: 9, maxLevel: 9, village: "home" },
    { name: "Headhunter", level: 5, maxLevel: 5, village: "home" },
    { name: "Apprentice Warden", level: 5, maxLevel: 5, village: "home" },
    { name: "Super Barbarian", level: 13, maxLevel: 13, village: "home" },
    { name: "Super Archer", level: 13, maxLevel: 13, village: "home" },
    { name: "Sneaky Goblin", level: 10, maxLevel: 10, village: "home" },
    { name: "Super Wall Breaker", level: 13, maxLevel: 13, village: "home" },
    { name: "Super Dragon", level: 12, maxLevel: 12, village: "home" },
    { name: "Super Wizard", level: 13, maxLevel: 13, village: "home" },
    { name: "Super Minion", level: 13, maxLevel: 13, village: "home" },
    { name: "Wall Wrecker", level: 5, maxLevel: 5, village: "home" },
    { name: "Battle Blimp", level: 5, maxLevel: 5, village: "home" },
    { name: "Stone Slammer", level: 5, maxLevel: 5, village: "home" },
    { name: "Siege Barracks", level: 5, maxLevel: 5, village: "home" },
    { name: "Log Launcher", level: 5, maxLevel: 5, village: "home" },
    { name: "Flame Flinger", level: 5, maxLevel: 5, village: "home" },
    { name: "Battle Drill", level: 5, maxLevel: 5, village: "home" }
  ],
  spells: [
    { name: "Lightning Spell", level: 12, maxLevel: 12, village: "home" },
    { name: "Healing Spell", level: 11, maxLevel: 11, village: "home" },
    { name: "Rage Spell", level: 7, maxLevel: 7, village: "home" },
    { name: "Jump Spell", level: 5, maxLevel: 5, village: "home" },
    { name: "Freeze Spell", level: 8, maxLevel: 8, village: "home" },
    { name: "Clone Spell", level: 9, maxLevel: 9, village: "home" },
    { name: "Invisibility Spell", level: 5, maxLevel: 5, village: "home" },
    { name: "Recall Spell", level: 5, maxLevel: 5, village: "home" },
    { name: "Poison Spell", level: 11, maxLevel: 11, village: "home" },
    { name: "Earthquake Spell", level: 7, maxLevel: 7, village: "home" },
    { name: "Haste Spell", level: 6, maxLevel: 6, village: "home" },
    { name: "Skeleton Spell", level: 9, maxLevel: 9, village: "home" },
    { name: "Bat Spell", level: 7, maxLevel: 7, village: "home" },
    { name: "Overgrowth Spell", level: 5, maxLevel: 5, village: "home" }
  ],
  achievements: [
    { name: "Bigger & Better", stars: 3, value: 18, target: 18, info: "Upgrade Town Hall to level 18" },
    { name: "Gold Grab", stars: 3, value: 2000000000, target: 2000000000, info: "Steal 2,000,000,000 gold" },
    { name: "Elixir Escapade", stars: 3, value: 2000000000, target: 2000000000, info: "Steal 2,000,000,000 elixir" },
    { name: "Heroic Heist", stars: 3, value: 30000000, target: 30000000, info: "Steal 30,000,000 dark elixir" },
    { name: "War Hero", stars: 3, value: 2680, target: 1000, info: "Score 1000 stars for your clan in Clan Wars" },
    { name: "Clan Games Champion", stars: 3, value: 120000, target: 100000, info: "Earn 100,000 points in Clan Games" },
    { name: "Aggressive Prosthetics", stars: 3, value: 1850000, target: 1000000, info: "Contribute to Clan Capital upgrades" },
    { name: "Supercharge", stars: 3, value: 60, target: 50, info: "Complete 50 Supercharge building upgrades" }
  ],
  labels: [
    { id: 57000000, name: "Clan Wars", iconUrls: { small: "https://api-assets.clashofclans.com/labels/64/lXaIuoTlfoNOY5fKcQGeT57apJgnxug1ymEjsqmUpY4.png" } },
    { id: 57000001, name: "Clan War League", iconUrls: { small: "https://api-assets.clashofclans.com/labels/64/t94J9xH2DvdB47qG9LgqX2K8yS9XW_9e_M2lD_H7-bA.png" } },
    { id: 57000002, name: "Trophy Pushing", iconUrls: { small: "https://api-assets.clashofclans.com/labels/64/J0WcKjP4rB8rVv6n0c1Tq7gD5S2W_rF_T90qD-bX8qU.png" } }
  ]
};

const mockClan = {
  tag: "#2PP8RGLV",
  name: "ANATOLIA WARRIORS",
  type: "inviteOnly",
  description: "Türkiye'nin en aktif ve köklü klanı! 🇹🇷 CWL: Şampiyon I | Klan Başkenti 10 | Savaşlara katılım zorunludur. Saygı ve dostluk önceliğimizdir. Discord: discord.gg/anatolia",
  location: { id: 32000234, name: "Türkiye", isCountry: true, countryCode: "TR" },
  badgeUrls: {
    small: "https://api-assets.clashofclans.com/badges/70/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png",
    large: "https://api-assets.clashofclans.com/badges/512/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png",
    medium: "https://api-assets.clashofclans.com/badges/200/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png"
  },
  clanLevel: 25,
  clanPoints: 65450,
  clanBuilderBasePoints: 53800,
  clanCapitalPoints: 3750,
  capitalLeague: { id: 85000021, name: "Legends League" },
  warLeague: { id: 48000018, name: "Champion League I" },
  requiredTrophies: 4800,
  requiredBuilderBaseTrophies: 3200,
  requiredTownhallLevel: 16,
  warFrequency: "always",
  warWinStreak: 21,
  warWins: 678,
  warTies: 12,
  warLosses: 104,
  isWarLogPublic: true,
  warLogState: "public",
  members: 49,
  labels: [
    { id: 56000000, name: "Clan Wars", iconUrls: { small: "https://api-assets.clashofclans.com/labels/64/lXaIuoTlfoNOY5fKcQGeT57apJgnxug1ymEjsqmUpY4.png" } },
    { id: 56000001, name: "Clan War League", iconUrls: { small: "https://api-assets.clashofclans.com/labels/64/t94J9xH2DvdB47qG9LgqX2K8yS9XW_9e_M2lD_H7-bA.png" } },
    { id: 56000004, name: "Competitive", iconUrls: { small: "https://api-assets.clashofclans.com/labels/64/J0WcKjP4rB8rVv6n0c1Tq7gD5S2W_rF_T90qD-bX8qU.png" } }
  ],
  clanCapital: {
    capitalHallLevel: 10,
    districts: [
      { id: 70000000, name: "Capital Peak", districtHallLevel: 10 },
      { id: 70000001, name: "Barbarian Camp", districtHallLevel: 5 },
      { id: 70000002, name: "Wizard Valley", districtHallLevel: 5 },
      { id: 70000003, name: "Balloon Lagoon", districtHallLevel: 5 },
      { id: 70000004, name: "Builder's Workshop", districtHallLevel: 5 },
      { id: 70000005, name: "Dragon Cliffs", districtHallLevel: 5 },
      { id: 70000006, name: "Golem Quarry", districtHallLevel: 5 },
      { id: 70000007, name: "Skeleton Park", districtHallLevel: 5 },
      { id: 70000008, name: "Goblin Mines", districtHallLevel: 5 }
    ]
  },
  memberList: [
    { tag: "#9PRQL200", name: "ClashMaster_TR", role: "leader", expLevel: 285, league: { id: 29000022, name: "Legend League", iconUrls: { small: "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxghC9Uh_263WdtY72ZnvU.png" } }, trophies: 6240, builderBaseTrophies: 5350, clanRank: 1, previousClanRank: 1, donations: 14850, donationsReceived: 10200, townHallLevel: 18 },
    { tag: "#8YURQ821", name: "OttomanEmperor", role: "coLeader", expLevel: 268, league: { id: 29000022, name: "Legend League", iconUrls: { small: "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxghC9Uh_263WdtY72ZnvU.png" } }, trophies: 6150, builderBaseTrophies: 5120, clanRank: 2, previousClanRank: 2, donations: 11200, donationsReceived: 7800, townHallLevel: 18 },
    { tag: "#29LC80PQ", name: "SultanSuleyman", role: "coLeader", expLevel: 258, league: { id: 29000022, name: "Legend League", iconUrls: { small: "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxghC9Uh_263WdtY72ZnvU.png" } }, trophies: 6080, builderBaseTrophies: 4950, clanRank: 3, previousClanRank: 3, donations: 16800, donationsReceived: 8400, townHallLevel: 18 },
    { tag: "#PV802KLL", name: "DarkKnight_TR", role: "admin", expLevel: 245, league: { id: 29000022, name: "Legend League", iconUrls: { small: "https://api-assets.clashofclans.com/leagues/72/R2zmhyqQ0_lKcDR5EyghXCxghC9Uh_263WdtY72ZnvU.png" } }, trophies: 5890, builderBaseTrophies: 4800, clanRank: 4, previousClanRank: 4, donations: 9500, donationsReceived: 6200, townHallLevel: 17 },
    { tag: "#90QQPV08", name: "VikingRaider", role: "admin", expLevel: 238, league: { id: 29000021, name: "Titan League I", iconUrls: { small: "https://api-assets.clashofclans.com/leagues/72/nvrBLtCrKG2ENkuoImHum4KEorqo7l26DUcqf0CizIc.png" } }, trophies: 5200, builderBaseTrophies: 4600, clanRank: 5, previousClanRank: 5, donations: 7800, donationsReceived: 5600, townHallLevel: 17 },
    { tag: "#78PPQL99", name: "AnadoluKaplani", role: "member", expLevel: 228, league: { id: 29000021, name: "Titan League I", iconUrls: { small: "https://api-assets.clashofclans.com/leagues/72/nvrBLtCrKG2ENkuoImHum4KEorqo7l26DUcqf0CizIc.png" } }, trophies: 5050, builderBaseTrophies: 4350, clanRank: 6, previousClanRank: 6, donations: 6400, donationsReceived: 4500, townHallLevel: 17 },
    { tag: "#66LKPP43", name: "Bozkurt34", role: "member", expLevel: 216, league: { id: 29000020, name: "Titan League II", iconUrls: { small: "https://api-assets.clashofclans.com/leagues/72/llpbbg7eaUsmQ0kQjD9a0XWw1w9H9iK0r3B1vK3lG.png" } }, trophies: 4780, builderBaseTrophies: 4100, clanRank: 7, previousClanRank: 7, donations: 5100, donationsReceived: 4800, townHallLevel: 16 },
    { tag: "#55KLMN88", name: "AkrepKral", role: "member", expLevel: 206, league: { id: 29000019, name: "Titan League III", iconUrls: { small: "https://api-assets.clashofclans.com/leagues/72/llpbbg7eaUsmQ0kQjD9a0XWw1w9H9iK0r3B1vK3lG.png" } }, trophies: 4540, builderBaseTrophies: 3950, clanRank: 8, previousClanRank: 8, donations: 4600, donationsReceived: 4200, townHallLevel: 16 }
  ]
};

const mockCurrentWar = {
  state: "inWar",
  teamSize: 30,
  attacksPerMember: 2,
  startTime: "2026-08-23T12:00:00.000Z",
  endTime: "2026-08-24T12:00:00.000Z",
  clan: {
    tag: "#2PP8RGLV",
    name: "ANATOLIA WARRIORS",
    badgeUrls: {
      small: "https://api-assets.clashofclans.com/badges/70/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png",
      large: "https://api-assets.clashofclans.com/badges/512/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png"
    },
    clanLevel: 25,
    attacks: 48,
    stars: 86,
    destructionPercentage: 99.15,
    members: [
      {
        tag: "#9PRQL200",
        name: "ClashMaster_TR",
        mapPosition: 1,
        townhallLevel: 18,
        attacks: [
          { attackerTag: "#9PRQL200", defenderTag: "#OPP_1", stars: 3, destructionPercentage: 100, order: 12, duration: 155 },
          { attackerTag: "#9PRQL200", defenderTag: "#OPP_2", stars: 3, destructionPercentage: 100, order: 24, duration: 168 }
        ],
        bestOpponentAttack: {
          attackerTag: "#OPP_1",
          defenderTag: "#9PRQL200",
          stars: 2,
          destructionPercentage: 82,
          order: 18
        }
      },
      {
        tag: "#8YURQ821",
        name: "OttomanEmperor",
        mapPosition: 2,
        townhallLevel: 18,
        attacks: [
          { attackerTag: "#8YURQ821", defenderTag: "#OPP_3", stars: 3, destructionPercentage: 100, order: 8, duration: 148 },
          { attackerTag: "#8YURQ821", defenderTag: "#OPP_4", stars: 3, destructionPercentage: 100, order: 30, duration: 175 }
        ]
      }
    ]
  },
  opponent: {
    tag: "#99VVRRR0",
    name: "TOKYO ESPORTS",
    badgeUrls: {
      small: "https://api-assets.clashofclans.com/badges/70/4nQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N.png",
      large: "https://api-assets.clashofclans.com/badges/512/4nQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N.png"
    },
    clanLevel: 24,
    attacks: 46,
    stars: 82,
    destructionPercentage: 97.80
  }
};

const mockWarLog = [
  {
    result: "win",
    endTime: "2026-08-21T14:00:00.000Z",
    teamSize: 30,
    clan: { tag: "#2PP8RGLV", name: "ANATOLIA WARRIORS", clanLevel: 25, stars: 89, destructionPercentage: 99.6, attacks: 60, expEarned: 360 },
    opponent: { tag: "#8J00KKL", name: "Nordic Kings", clanLevel: 23, stars: 82, destructionPercentage: 96.1 }
  },
  {
    result: "win",
    endTime: "2026-08-19T14:00:00.000Z",
    teamSize: 30,
    clan: { tag: "#2PP8RGLV", name: "ANATOLIA WARRIORS", clanLevel: 25, stars: 90, destructionPercentage: 100.0, attacks: 60, expEarned: 370 },
    opponent: { tag: "#77VVDDL", name: "Paris Elite", clanLevel: 22, stars: 79, destructionPercentage: 92.4 }
  },
  {
    result: "win",
    endTime: "2026-08-17T14:00:00.000Z",
    teamSize: 30,
    clan: { tag: "#2PP8RGLV", name: "ANATOLIA WARRIORS", clanLevel: 25, stars: 87, destructionPercentage: 98.4, attacks: 58, expEarned: 340 },
    opponent: { tag: "#55AABBL", name: "Berlin Raiders", clanLevel: 24, stars: 85, destructionPercentage: 97.2 }
  },
  {
    result: "lose",
    endTime: "2026-08-15T14:00:00.000Z",
    teamSize: 30,
    clan: { tag: "#2PP8RGLV", name: "ANATOLIA WARRIORS", clanLevel: 24, stars: 86, destructionPercentage: 97.5, attacks: 57, expEarned: 110 },
    opponent: { tag: "#11CCDDL", name: "Seoul Dragons", clanLevel: 25, stars: 88, destructionPercentage: 99.4 }
  }
];

const mockClansList = [
  {
    tag: "#2PP8RGLV",
    name: "ANATOLIA WARRIORS",
    clanLevel: 25,
    clanPoints: 65450,
    members: 49,
    requiredTrophies: 4800,
    warFrequency: "always",
    warWinStreak: 21,
    warWins: 678,
    location: { name: "Türkiye", countryCode: "TR" },
    badgeUrls: {
      small: "https://api-assets.clashofclans.com/badges/70/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png"
    }
  },
  {
    tag: "#99VVRRR0",
    name: "TURKISH LEGION",
    clanLevel: 22,
    clanPoints: 61200,
    members: 47,
    requiredTrophies: 4200,
    warFrequency: "always",
    warWinStreak: 9,
    warWins: 512,
    location: { name: "Türkiye", countryCode: "TR" },
    badgeUrls: {
      small: "https://api-assets.clashofclans.com/badges/70/4nQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N.png"
    }
  },
  {
    tag: "#8LLPP001",
    name: "ISTANBUL ACADEMY",
    clanLevel: 19,
    clanPoints: 56200,
    members: 50,
    requiredTrophies: 3500,
    warFrequency: "moreThanOncePerWeek",
    warWinStreak: 5,
    warWins: 410,
    location: { name: "Türkiye", countryCode: "TR" },
    badgeUrls: {
      small: "https://api-assets.clashofclans.com/badges/70/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png"
    }
  },
  {
    tag: "#GLOBAL001",
    name: "Dark Nebula",
    clanLevel: 27,
    clanPoints: 71200,
    members: 50,
    requiredTrophies: 5200,
    warFrequency: "always",
    warWinStreak: 35,
    warWins: 920,
    location: { name: "International", countryCode: "INT" },
    badgeUrls: {
      small: "https://api-assets.clashofclans.com/badges/70/hQ_8vQ0P_H7wN0750H_zQ3B6U7955F1w11N_0sK7H1Q.png"
    }
  }
];

const mockRankings = {
  players: [
    { rank: 1, tag: "#9PRQL200", name: "ClashMaster_TR", trophies: 6380, expLevel: 285, townHallLevel: 18, attackWins: 445, defenseWins: 98, clan: { name: "ANATOLIA WARRIORS", tag: "#2PP8RGLV" } },
    { rank: 2, tag: "#88KLP001", name: "Klaus_Clash", trophies: 6320, expLevel: 290, townHallLevel: 18, attackWins: 410, defenseWins: 92, clan: { name: "Dark Nebula", tag: "#GLOBAL001" } },
    { rank: 3, tag: "#77VVP002", name: "Eric_OneHive", trophies: 6275, expLevel: 275, townHallLevel: 18, attackWins: 395, defenseWins: 78, clan: { name: "OneHive Prime", tag: "#ONE001" } },
    { rank: 4, tag: "#66MNP003", name: "Goku_Super", trophies: 6210, expLevel: 270, townHallLevel: 18, attackWins: 375, defenseWins: 70, clan: { name: "TOKYO ESPORTS", tag: "#99VVRRR0" } },
    { rank: 5, tag: "#55QRP004", name: "SultanSuleyman", trophies: 6150, expLevel: 258, townHallLevel: 18, attackWins: 350, defenseWins: 64, clan: { name: "ANATOLIA WARRIORS", tag: "#2PP8RGLV" } }
  ],
  clans: [
    { rank: 1, tag: "#GLOBAL001", name: "Dark Nebula", clanPoints: 71200, clanLevel: 27, members: 50, location: { name: "International" } },
    { rank: 2, tag: "#2PP8RGLV", name: "ANATOLIA WARRIORS", clanPoints: 65450, clanLevel: 25, members: 49, location: { name: "Türkiye" } },
    { rank: 3, tag: "#ONE001", name: "OneHive Prime", clanPoints: 64200, clanLevel: 26, members: 50, location: { name: "United States" } },
    { rank: 4, tag: "#99VVRRR0", name: "TOKYO ESPORTS", clanPoints: 62800, clanLevel: 24, members: 48, location: { name: "Japan" } },
    { rank: 5, tag: "#EUR005", name: "Viking Dynasty", clanPoints: 61400, clanLevel: 23, members: 50, location: { name: "Norway" } }
  ]
};

const mockGoldPass = {
  season: "August 2026",
  startTime: "2026-08-01T08:00:00.000Z",
  endTime: "2026-08-31T08:00:00.000Z",
  skinName: "Anime Queen (Legendary Hero Skin)",
  perks: [
    { title: "1 Gem Donation", desc: "Donate troops and spells to clan mates for just 1 Gem" },
    { title: "20% Builder Boost", desc: "Reduce building upgrade times and resource costs by 20%" },
    { title: "20% Research Boost", desc: "Reduce laboratory upgrade times and resource costs by 20%" },
    { title: "20% Training Boost", desc: "Reduce troop training and spell brewing times by 20%" },
    { title: "Season Bank Multiplier", desc: "Hold up to 35M Gold, 35M Elixir and 350k Dark Elixir" }
  ],
  rewards: [
    { tier: 1, free: "50,000 Gold", pass: "1-Gem Donation Perk" },
    { tier: 5, free: "Resource Potion", pass: "Builder Potion" },
    { tier: 10, free: "100 Gems", pass: "Book of Fighting" },
    { tier: 15, free: "Power Potion", pass: "Book of Spells" },
    { tier: 20, free: "Hero Potion", pass: "Book of Building" },
    { tier: 25, free: "Rune of Gold", pass: "Book of Heroes" },
    { tier: 30, free: "1,500,000 Elixir", pass: "Anime Queen Skin" }
  ]
};

module.exports = {
  mockPlayer,
  mockClan,
  mockCurrentWar,
  mockWarLog,
  mockClansList,
  mockRankings,
  mockGoldPass
};
