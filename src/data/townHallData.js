/**
 * Clash of Clans Town Hall Central Data System
 * Full support for Town Hall 1 through Town Hall 18
 * Easily extensible for future levels (e.g. TH19)
 */

const townHallData = {
  1: {
    level: 1,
    name: { tr: "Belediye Binası 1", az: "Bələdiyyə Binası 1", en: "Town Hall 1" },
    image: "/images/assets/town_hall_1.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "0 Parça", az: "0 Ədəd", en: "0 Pieces" },
    heroes: { tr: "Kahraman Yok", az: "Qəhrəman Yoxdur", en: "No Heroes" },
    spell: { tr: "Büyü Fabrikası Yok", az: "Sehr Fabriki Yoxdur", en: "No Spells" },
    def: { tr: "Top (Cannon)", az: "Top (Cannon)", en: "Cannon" },
    description: {
      tr: "Köyünüzün kalbi. 1. seviyede temel binaları ve ilk topunuzu inşa edebilirsiniz.",
      az: "Kəndinizin ürəyi. 1-ci səviyyədə əsas binaları və ilk topunuzu qura bilərsiniz.",
      en: "The heart of your village. At level 1, you can build basic structures and your first cannon."
    }
  },
  2: {
    level: 2,
    name: { tr: "Belediye Binası 2", az: "Bələdiyyə Binası 2", en: "Town Hall 2" },
    image: "/images/assets/town_hall_2.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "25 Parça (Lvl 2)", az: "25 Ədəd (Lvl 2)", en: "25 Pieces (Lvl 2)" },
    heroes: { tr: "Kahraman Yok", az: "Qəhrəman Yoxdur", en: "No Heroes" },
    spell: { tr: "Büyü Fabrikası Yok", az: "Sehr Fabriki Yoxdur", en: "No Spells" },
    def: { tr: "Okçu Kulesi (Archer Tower)", az: "Oxçu Qülləsi", en: "Archer Tower" },
    description: {
      tr: "Okçu Kulesi ve ilk savunma duvarlarınızı açarak köyünüzü korumaya başlayın.",
      az: "Oxçu qülləsi və ilk müdafiə divarlarınızı açaraq kəndinizi qorumağa başlayın.",
      en: "Unlock the Archer Tower and your first defensive walls to protect your village."
    }
  },
  3: {
    level: 3,
    name: { tr: "Belediye Binası 3", az: "Bələdiyyə Binası 3", en: "Town Hall 3" },
    image: "/images/assets/town_hall_3.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "50 Parça (Lvl 3)", az: "50 Ədəd (Lvl 3)", en: "50 Pieces (Lvl 3)" },
    heroes: { tr: "Kahraman Yok", az: "Qəhrəman Yoxdur", en: "No Heroes" },
    spell: { tr: "Büyü Fabrikası Yok", az: "Sehr Fabriki Yoxdur", en: "No Spells" },
    def: { tr: "Havan (Mortar)", az: "Minaatan (Mortar)", en: "Mortar" },
    description: {
      tr: "Havan kilidini açarak düşman kara birliklerine toplu alan hasarı verin.",
      az: "Minaatan kilidini açaraq düşmən quru qoşunlarına sahə zərəri vurun.",
      en: "Unlock the Mortar to deal massive splash damage to enemy ground troops."
    }
  },
  4: {
    level: 4,
    name: { tr: "Belediye Binası 4", az: "Bələdiyyə Binası 4", en: "Town Hall 4" },
    image: "/images/assets/town_hall_4.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "75 Parça (Lvl 4)", az: "75 Ədəd (Lvl 4)", en: "75 Pieces (Lvl 4)" },
    heroes: { tr: "Kahraman Yok", az: "Qəhrəman Yoxdur", en: "No Heroes" },
    spell: { tr: "Büyü Fabrikası Yok", az: "Sehr Fabriki Yoxdur", en: "No Spells" },
    def: { tr: "Hava Savunması (Air Defense)", az: "Hava Hücumundan Müdafiə", en: "Air Defense" },
    description: {
      tr: "Hava Savunması ile köyünüzü uçan düşman birimlerine karşı güvenceye alın.",
      az: "Hava müdafiəsi ilə kəndinizi uçan düşmən qoşunlarına qarşı güvənə alın.",
      en: "Fortify your skies against aerial attackers with the Air Defense."
    }
  },
  5: {
    level: 5,
    name: { tr: "Belediye Binası 5", az: "Bələdiyyə Binası 5", en: "Town Hall 5" },
    image: "/images/assets/town_hall_5.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "100 Parça (Lvl 5)", az: "100 Ədəd (Lvl 5)", en: "100 Pieces (Lvl 5)" },
    heroes: { tr: "Kahraman Yok", az: "Qəhrəman Yoxdur", en: "No Heroes" },
    spell: { tr: "Yıldırım Büyüsü (Lightning)", az: "İldırım Sehri (Lightning)", en: "Lightning Spell" },
    def: { tr: "Büyücü Kulesi (Wizard Tower)", az: "Cadugər Qülləsi", en: "Wizard Tower" },
    description: {
      tr: "Büyü Fabrikası ve Büyücü Kulesi açılır. İlk büyünüz olan Yıldırım Büyüsünü kullanabilirsiniz.",
      az: "Sehr Fabriki və Cadugər Qülləsi açılır. İlk sehriniz olan İldırım Sehrini istifadə edə bilərsiniz.",
      en: "Unlock the Spell Factory and Wizard Tower. Brew your first Lightning Spells."
    }
  },
  6: {
    level: 6,
    name: { tr: "Belediye Binası 6", az: "Bələdiyyə Binası 6", en: "Town Hall 6" },
    image: "/images/assets/town_hall_6.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "125 Parça (Lvl 6)", az: "125 Ədəd (Lvl 6)", en: "125 Pieces (Lvl 6)" },
    heroes: { tr: "Kahraman Yok", az: "Qəhrəman Yoxdur", en: "No Heroes" },
    spell: { tr: "Şifa Büyüsü (Healing Spell)", az: "Şəfa Sehri (Healing)", en: "Healing Spell" },
    def: { tr: "Hava Patlatıcı (Air Sweeper)", az: "Hava Üfürücü", en: "Air Sweeper" },
    description: {
      tr: "Şifa Büyüsü ile ordunuzu savaş alanında iyileştirin, Hava Patlatıcı ile uçan düşmanları püskürtün.",
      az: "Şəfa Sehri ilə ordunuzu döyüşdə sağaldın, Hava Üfürücü ilə uçan düşmənləri uzaqlaşdırın.",
      en: "Heal your army with Healing Spells and push back air troops using the Air Sweeper."
    }
  },
  7: {
    level: 7,
    name: { tr: "Belediye Binası 7", az: "Bələdiyyə Binası 7", en: "Town Hall 7" },
    image: "/images/assets/town_hall_7.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "175 Parça (Lvl 7)", az: "175 Ədəd (Lvl 7)", en: "175 Pieces (Lvl 7)" },
    heroes: { tr: "Barbar Kral: 5", az: "Barbar Kral: 5", en: "Barbarian King: 5" },
    spell: { tr: "Öfke Büyüsü (Rage Spell)", az: "Qəzəb Sehri (Rage)", en: "Rage Spell" },
    def: { tr: "Gizli Tesla (Hidden Tesla)", az: "Gizli Tesla", en: "Hidden Tesla" },
    description: {
      tr: "Kara İksir çağı başlıyor! İlk kahramanınız olan Barbar Kralı uyandırın ve Öfke Büyüsü ile ordunuzu güçlendirin.",
      az: "Qara İksir dövrü başlayır! İlk qəhrəmanınız Barbar Kralı oyadın və Qəzəb Sehri ilə ordunuzu gücləndirin.",
      en: "The Dark Elixir era begins! Awaken your first hero, the Barbarian King, and unleash the Rage Spell."
    }
  },
  8: {
    level: 8,
    name: { tr: "Belediye Binası 8", az: "Bələdiyyə Binası 8", en: "Town Hall 8" },
    image: "/images/assets/town_hall_8.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "225 Parça (Lvl 8)", az: "225 Ədəd (Lvl 8)", en: "225 Pieces (Lvl 8)" },
    heroes: { tr: "Barbar Kral: 10", az: "Barbar Kral: 10", en: "Barbarian King: 10" },
    spell: { tr: "Zehir & Deprem Büyüsü", az: "Zəhər & Zəlzələ Sehri", en: "Poison & Earthquake" },
    def: { tr: "Bomba Kulesi (Bomb Tower)", az: "Bomba Qülləsi", en: "Bomb Tower" },
    description: {
      tr: "Kara Büyü Fabrikası, Zehir Büyüsü, Deprem Büyüsü ve Bomba Kulesi ile taktiksel derinlik kazanın.",
      az: "Qara Sehr Fabriki, Zəhər Sehri, Zəlzələ Sehri və Bomba Qülləsi ilə taktiki üstünlük qazanın.",
      en: "Dark Spell Factory, Poison Spell, Earthquake Spell, and Bomb Tower bring deeper tactical mastery."
    }
  },
  9: {
    level: 9,
    name: { tr: "Belediye Binası 9", az: "Bələdiyyə Binası 9", en: "Town Hall 9" },
    image: "/images/assets/town_hall_9.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "250 Parça (Lvl 9)", az: "250 Ədəd (Lvl 9)", en: "250 Pieces (Lvl 9)" },
    heroes: { tr: "Kral: 30, Kraliçe: 30", az: "Kral: 30, Qadın Qəhrəman: 30", en: "King: 30, Queen: 30" },
    spell: { tr: "Atlama & Acele Büyüsü", az: "Tullanma & Tələsmə Sehri", en: "Jump & Haste Spell" },
    def: { tr: "X-Yayı (X-Bow)", az: "X-Yay (X-Bow)", en: "X-Bow" },
    description: {
      tr: "Okçu Kraliçe ve X-Yayı çağı! Clash dünyasının en efsanevi rekabet seviyelerinden biri.",
      az: "Oxçu Qadın Qəhrəman və X-Yay dövrü! Clash dünyasının ən əfsanəvi mərhələlərindən biri.",
      en: "Archer Queen and X-Bow era! One of the most iconic milestone levels in Clash history."
    }
  },
  10: {
    level: 10,
    name: { tr: "Belediye Binası 10", az: "Bələdiyyə Binası 10", en: "Town Hall 10" },
    image: "/images/assets/town_hall_10.png",
    weapon: { tr: "Savunma Silahı Yok", az: "Müdafiə Silahı Yoxdur", en: "No Weapon" },
    walls: { tr: "275 Parça (Lvl 10)", az: "275 Ədəd (Lvl 10)", en: "275 Pieces (Lvl 10)" },
    heroes: { tr: "Kral: 40, Kraliçe: 40", az: "Kral: 40, Qadın Qəhrəman: 40", en: "King: 40, Queen: 40" },
    spell: { tr: "Dondurma & Yarasa Büyüsü", az: "Dondurma & Yarasa Sehri", en: "Freeze & Bat Spell" },
    def: { tr: "Cehennem Kulesi (Inferno Tower)", az: "Cəhənnəm Qülləsi", en: "Inferno Tower" },
    description: {
      tr: "Lav temalı tasarım ve Cehennem Kuleleri ile en dayanıklı tank birliklerini bile eritin.",
      az: "Lava dizaynı və Cəhənnəm Qüllələri ilə ən güclü tank qoşunlarını belə əridin.",
      en: "Molten lava theme and Inferno Towers melt down the toughest enemy tanks."
    }
  },
  11: {
    level: 11,
    name: { tr: "Belediye Binası 11", az: "Bələdiyyə Binası 11", en: "Town Hall 11" },
    image: "/images/assets/town_hall_11.png",
    weapon: { tr: "Savunma Silahı Yok (Kartal Topu)", az: "Müdafiə Silahı Yoxdur (Qartal Topu)", en: "No Weapon (Eagle Artillery Era)" },
    walls: { tr: "300 Parça (Lvl 11)", az: "300 Ədəd (Lvl 11)", en: "300 Pieces (Lvl 11)" },
    heroes: { tr: "Kral: 50, Kraliçe: 50, Koruyucu: 20", az: "Kral: 50, Qadın Qəhrəman: 50, Qoruyucu: 20", en: "King: 50, Queen: 50, Warden: 20" },
    spell: { tr: "Klon Büyüsü (Clone Spell)", az: "Klon Sehri (Clone)", en: "Clone Spell" },
    def: { tr: "Kartal Topu (Eagle Artillery)", az: "Qartal Topu (Eagle Artillery)", en: "Eagle Artillery" },
    description: {
      tr: "Büyük Koruyucu ve tüm haritayı hedef alan kudretli Kartal Topu köyünüze katılır.",
      az: "Böyük Qoruyucu və bütün xəritəni hədəf alan qüdrətli Qartal Topu kəndinizə qoşulur.",
      en: "The Grand Warden and map-wide Eagle Artillery join your village forces."
    }
  },
  12: {
    level: 12,
    name: { tr: "Belediye Binası 12", az: "Bələdiyyə Binası 12", en: "Town Hall 12" },
    image: "/images/assets/town_hall_12.png",
    weapon: { tr: "Giga Tesla (5 Yıldız)", az: "Giga Tesla (5 Ulduz)", en: "Giga Tesla (5 Stars)" },
    walls: { tr: "300 Parça (Lvl 12)", az: "300 Ədəd (Lvl 12)", en: "300 Pieces (Lvl 12)" },
    heroes: { tr: "Kral: 65, Kraliçe: 65, Koruyucu: 40", az: "Kral: 65, Qadın Qəhrəman: 65, Qoruyucu: 40", en: "King: 65, Queen: 65, Warden: 40" },
    spell: { tr: "İskelet Büyüsü & Kuşatma Makineleri", az: "Skelet Sehri & Mühasirə Maşınları", en: "Skeleton Spell & Siege Machines" },
    def: { tr: "Kuşatma Atölyesi (Siege Workshop)", az: "Mühasirə Emalatxanası", en: "Siege Workshop" },
    description: {
      tr: "İlk silahlı Belediye Binası! Giga Tesla kendini savunur ve Kuşatma Makineleri orduya katılır.",
      az: "İlk silahlı Bələdiyyə Binası! Giga Tesla özünü müdafiə edir və Mühasirə Maşınları orduya qatılır.",
      en: "The first armed Town Hall! The Giga Tesla defends the core, unlocking Siege Machines."
    }
  },
  13: {
    level: 13,
    name: { tr: "Belediye Binası 13", az: "Bələdiyyə Binası 13", en: "Town Hall 13" },
    image: "/images/assets/town_hall_13.png",
    weapon: { tr: "Giga Cehennem (Buz Yavaşlatma)", az: "Giga Cəhənnəm (Buz Yavaşlatma)", en: "Giga Inferno (Ice Slowdown)" },
    walls: { tr: "300 Parça (Lvl 13)", az: "300 Ədəd (Lvl 13)", en: "300 Pieces (Lvl 13)" },
    heroes: { tr: "Kral: 75, Kraliçe: 75, Koruyucu: 50, Şampiyon: 25", az: "Kral: 75, Qadın Qəhrəman: 75, Qoruyucu: 50, Çempion: 25", en: "King: 75, Queen: 75, Warden: 50, Champion: 25" },
    spell: { tr: "Görünmezlik Büyüsü (Invisibility)", az: "Görünməzlik Sehri", en: "Invisibility Spell" },
    def: { tr: "Kaya Fırlatıcı (Scattershot)", az: "Daş Atan (Scattershot)", en: "Scattershot" },
    description: {
      tr: "Kraliyet Şampiyonu, Kaya Fırlatıcılar ve patladığında alanı donduran Giga Cehennem!",
      az: "Kraliyyət Çempionu, Daş Atanlar və partlayanda ətrafı donduran Giga Cəhənnəm!",
      en: "Royal Champion, Scattershots, and the freezing Giga Inferno make their debut."
    }
  },
  14: {
    level: 14,
    name: { tr: "Belediye Binası 14", az: "Bələdiyyə Binası 14", en: "Town Hall 14" },
    image: "/images/assets/town_hall_14.png",
    weapon: { tr: "Giga Cehennem & Zehir Havuzu", az: "Giga Cəhənnəm & Zəhər Gölü", en: "Giga Inferno & Poison Bomb" },
    walls: { tr: "325 Parça (Lvl 14)", az: "325 Ədəd (Lvl 14)", en: "325 Pieces (Lvl 14)" },
    heroes: { tr: "Kral: 80, Kraliçe: 80, Koruyucu: 55, Şampiyon: 30", az: "Kral: 80, Qadın Qəhrəman: 80, Qoruyucu: 55, Çempion: 30", en: "King: 80, Queen: 80, Warden: 55, Champion: 30" },
    spell: { tr: "Geri Çağırma Büyüsü (Recall)", az: "Geri Çağırma Sehri", en: "Recall Spell" },
    def: { tr: "Evcil Hayvan Kulübesi (Pet House)", az: "Ev Heyvanları Yuvası", en: "Pet House" },
    description: {
      tr: "Orman temalı tasarım, kahraman evcil hayvanları (L.A.S.S.I, Electro Owl, Mighty Yak, Unicorn).",
      az: "Meşə dizaynı, qəhrəman ev heyvanları (L.A.S.S.I, Electro Owl, Mighty Yak, Unicorn).",
      en: "Jungle theme, Hero Pets (L.A.S.S.I, Electro Owl, Mighty Yak, Unicorn), and toxic poison death damage."
    }
  },
  15: {
    level: 15,
    name: { tr: "Belediye Binası 15", az: "Bələdiyyə Binası 15", en: "Town Hall 15" },
    image: "/images/assets/town_hall_15.png",
    weapon: { tr: "Giga Cehennem & Zehir Bulutu", az: "Giga Cəhənnəm & Zəhər Buludu", en: "Giga Inferno & Poison Cloud" },
    walls: { tr: "325 Parça (Lvl 15)", az: "325 Ədəd (Lvl 15)", en: "325 Pieces (Lvl 15)" },
    heroes: { tr: "Kral: 90, Kraliçe: 90, Koruyucu: 65, Şampiyon: 40", az: "Kral: 90, Qadın Qəhrəman: 90, Qoruyucu: 65, Çempion: 40", en: "King: 90, Queen: 90, Warden: 65, Champion: 40" },
    spell: { tr: "Aşırı Büyüme (Overgrowth)", az: "Həddindən Artıq Böyümə", en: "Overgrowth Spell" },
    def: { tr: "Monolit & Büyü Kulesi (Spell Tower)", az: "Monolit & Sehr Qülləsi", en: "Monolith & Spell Tower" },
    description: {
      tr: "Sihirli ay tutulması teması. Monolit ve Büyü Kuleleri ile savunmada büyüleyici güç.",
      az: "Sehrli ay tutulması mövzusu. Monolit və Sehr Qüllələri ilə yüksək müdafiə gücü.",
      en: "Magic eclipse theme. Monolith and Spell Towers bring supreme arcane defense."
    }
  },
  16: {
    level: 16,
    name: { tr: "Belediye Binası 16", az: "Bələdiyyə Binası 16", en: "Town Hall 16" },
    image: "/images/assets/town_hall_16.png",
    weapon: { tr: "Giga Cehennem & Doğa Enerjisi", az: "Giga Cəhənnəm & Təbiət Enerjisi", en: "Giga Inferno & Nature Blast" },
    walls: { tr: "325 Parça (Lvl 16)", az: "325 Ədəd (Lvl 16)", en: "325 Pieces (Lvl 16)" },
    heroes: { tr: "Kral: 95, Kraliçe: 95, Koruyucu: 70, Şampiyon: 45", az: "Kral: 95, Qadın Qəhrəman: 95, Qoruyucu: 70, Çempion: 45", en: "King: 95, Queen: 95, Warden: 70, Champion: 45" },
    spell: { tr: "Kahraman Ekipman Sistemi", az: "Qəhrəman Təchizat Sistemi", en: "Hero Equipment Era" },
    def: { tr: "Birleşik Savunmalar (Merged Defenses)", az: "Birləşdirilmiş Müdafiələr", en: "Merged Defenses (Ricochet & Multi-Archer)" },
    description: {
      tr: "Doğa ve güneş enerjisi. Birleşik Okçu Kuleleri ve Birleşik Toplar ile devrim niteliğinde savunma.",
      az: "Təbiət və günəş enerjisi. Birləşdirilmiş Oxçu Qüllələri və Toplar ilə inqilabi müdafiə.",
      en: "Nature and solar power. Merged Archer Towers and Cannons transform defense strategies."
    }
  },
  17: {
    level: 17,
    name: { tr: "Belediye Binası 17", az: "Bələdiyyə Binası 17", en: "Town Hall 17" },
    image: "/images/assets/town_hall_17.png",
    weapon: { tr: "İmza Silahı: Kartal Topu Savunma Çekirdeği", az: "İmza Silahı: Qartal Topu Müdafiə Nüvəsi", en: "Signature Weapon: Eagle Core Defense" },
    walls: { tr: "325 Parça (Lvl 17)", az: "325 Ədəd (Lvl 17)", en: "325 Pieces (Lvl 17)" },
    heroes: { tr: "Kral: 100, Kraliçe: 100, Koruyucu: 75, Şampiyon: 50, Minyon Prensi: 40", az: "Kral: 100, Qadın Qəhrəman: 100, Qoruyucu: 75, Çempion: 50, Minyon Şahzadəsi: 40", en: "King: 100, Queen: 100, Warden: 75, Champion: 50, Minion Prince: 40" },
    spell: { tr: "Aşırı Şarj Binalar & Minyon Prensi", az: "Super Şarj Binalar & Minyon Şahzadəsi", en: "Supercharge Buildings & Minion Prince" },
    def: { tr: "Birleşik Çoklu Havan & Gelişmiş Savunma", az: "Birləşdirilmiş Minaatan & Güclü Müdafiə", en: "Merged Multi-Mortar & Supercharged Core" },
    description: {
      tr: "Obsidyen ve altın enerjisi. Belediye Binası içine entegre edilmiş doğrudan Kartal Topu ateşleme sistemi.",
      az: "Obsidian və qızıl enerjisi. Bələdiyyə Binası daxilinə inteqrasiya edilmiş birbaşa Qartal Topu atəş sistemi.",
      en: "Obsidian and gold energy. Features an integrated Eagle Artillery core fired directly from Town Hall."
    }
  },
  18: {
    level: 18,
    name: { tr: "Belediye Binası 18", az: "Bələdiyyə Binası 18", en: "Town Hall 18" },
    image: "/images/assets/town_hall_18.png",
    weapon: { tr: "İmza Silahı: Astral Kristal Nova & Kozmik Dalga", az: "İmza Silahı: Astral Kristal Nova & Kosmik Dalğa", en: "Signature Weapon: Astral Crystal Nova & Cosmic Pulse" },
    walls: { tr: "350 Parça (Lvl 18)", az: "350 Ədəd (Lvl 18)", en: "350 Pieces (Lvl 18)" },
    heroes: { tr: "Kral: 105, Kraliçe: 105, Koruyucu: 80, Şampiyon: 55, Minyon Prensi: 45", az: "Kral: 105, Qadın Qəhrəman: 105, Qoruyucu: 80, Çempion: 55, Minyon Şahzadəsi: 45", en: "King: 105, Queen: 105, Warden: 80, Champion: 55, Minion Prince: 45" },
    spell: { tr: "Kozmik Çarpıtma & Astral Koruma", az: "Kosmik Əyilmə & Astral Qoruma", en: "Cosmic Warp & Astral Aegis" },
    def: { tr: "Astral Taret & Boyutlararası Savunma Çekirdeği", az: "Astral Qüllə & Ölçülərarası Müdafiə Nüvəsi", en: "Astral Turret & Interdimensional Defense Core" },
    description: {
      tr: "Kozmik Clash çağı! En üst seviye Belediye Binası 18; yıkıcı Astral Nova ışınları, 350 seviye 18 duvar ve maksimum kahraman gücü sunar.",
      az: "Kosmik Clash dövrü! Ən yüksək səviyyəli Bələdiyyə Binası 18; dağıdıcı Astral Nova şüaları, 350 səviyyə 18 divar və maksimum qəhrəman gücü təqdim edir.",
      en: "The Cosmic Clash era! The ultimate Town Hall 18 features destructive Astral Nova pulses, 350 level 18 walls, and maximum hero firepower."
    }
  }
};

const MAX_TOWN_HALL_LEVEL = 18;
const MIN_TOWN_HALL_LEVEL = 1;

function getTownHall(level) {
  const lvl = Math.max(MIN_TOWN_HALL_LEVEL, Math.min(MAX_TOWN_HALL_LEVEL, parseInt(level) || MAX_TOWN_HALL_LEVEL));
  return townHallData[lvl] || townHallData[MAX_TOWN_HALL_LEVEL];
}

function getAllTownHalls() {
  return Object.values(townHallData);
}

module.exports = {
  townHallData,
  MAX_TOWN_HALL_LEVEL,
  MIN_TOWN_HALL_LEVEL,
  getTownHall,
  getAllTownHalls
};
