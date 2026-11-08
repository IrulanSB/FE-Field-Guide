/* Fire Emblem 7 (The Blazing Blade) — data pack.
   Sources: Fire Emblem Wiki (fireemblemwiki.org), Serenes Forest (serenesforest.net).
   Each item carries a source tag: "few" = Fire Emblem Wiki, "sf" = Serenes Forest.
   Anything guide-dependent that differs by difficulty is marked verify:true. */

window.FE7 = {
  id: "fe7",
  title: "Fire Emblem: The Blazing Blade",
  short: "FE7",
  year: 2003,
  platform: "Game Boy Advance",
  modes: [
    { id: "lyn", name: "Lyn Mode" },
    { id: "eliwood", name: "Eliwood Mode" },
    { id: "hector", name: "Hector Mode" }
  ],

  order: {
    lyn: ["p", "l1", "l2", "l3", "l4", "l5", "l6", "l7", "l7x", "l8", "l9", "l10"],
    eliwood: ["c11", "c12", "c13", "c13x", "c14", "noble", "whereabouts", "port", "pirate", "dread", "imprisoner", "dragon", "newresolve", "kinship", "living", "genesis", "fourfang", "unfulfilled", "paleflower", "bbd", "night", "cog", "valorous", "sands", "prep", "vod", "light1", "light2"],
    hector: ["c11h", "c12", "c13", "c13x", "c14", "talons", "noble", "whereabouts", "port", "pirate", "dread", "imprisoner", "glimpse", "dragon", "newresolve", "kinship", "living", "genesis", "fourfang", "crazed", "unfulfilled", "paleflower", "bbd", "night", "cog", "berserker", "sands", "prep", "vod", "value", "light1", "light2"]
  },

  chapters: [
    /* ---------------- LYN MODE ---------------- */
    {
      id: "p", modes: ["lyn"], num: "P", title: "A Girl from the Plains", gaiden: false,
      obj: "Seize the gate", deploy: "Lyn alone.",
      brief: "Tutorial. Move Lyn onto the gate. Nothing missable.",
      items: [
        { t: "Lyn joins", k: "recruit", u: "lyn", d: "Automatically." }
      ]
    },
    {
      id: "l1", modes: ["lyn"], num: "1", title: "Footsteps of Fate", gaiden: false,
      obj: "Rout the enemy", deploy: "Lyn, Sain, Kent.",
      brief: "Sain and Kent arrive. Teach the weapon triangle here.",
      items: [
        { t: "Sain and Kent join", k: "recruit", u: "sain", d: "Automatically at start." },
        { t: "Iron Sword", k: "item", d: "Automatic after Sain's first attack — Normal Mode only.", verify: true }
      ]
    },
    {
      id: "l2", modes: ["lyn"], num: "2", title: "Sword of Spirits", gaiden: false,
      obj: "Seize the throne", deploy: "Lyn, Sain, Kent.",
      brief: "Boss has high avoid on a throne. Use the Mani Katti you get at the end.",
      items: [
        { t: "Mani Katti", k: "item", d: "Automatic at end of chapter." },
        { t: "Vulnerary", k: "drop", d: "Dropped by Glass." }
      ]
    },
    {
      id: "l3", modes: ["lyn"], num: "3", title: "Band of Mercenaries", gaiden: false,
      obj: "Rout the enemy", deploy: "Lyn, Sain, Kent.",
      brief: "Wil's village is in the south-west; he also auto-joins on turn 3.",
      items: [
        { t: "Florina joins", k: "recruit", u: "florina", d: "Automatically at start." },
        { t: "Wil joins", k: "recruit", u: "wil", d: "Visit the south-west village, or automatically on turn 3." },
        { t: "2,000G", k: "village", d: "Northern village." }
      ]
    },
    {
      id: "l4", modes: ["lyn"], num: "4", title: "In Occupation's Shadow", gaiden: false,
      obj: "Protect Natalie for 7 turns", deploy: "Lyn, Sain, Kent, Florina, Wil.",
      brief: "Natalie dying is a defeat condition, not just a side objective.",
      items: [
        { t: "Dorcas joins", k: "recruit", u: "dorcas", d: "Talk with Lyn, or finish the chapter without killing him." },
        { t: "Iron Axe", k: "drop", d: "Dropped by an enemy Brigand (unavoidable on Normal)." }
      ],
      warnings: ["Natalie must survive — she is a defeat condition."]
    },
    {
      id: "l5", modes: ["lyn"], num: "5", title: "Beyond the Borders", gaiden: false,
      obj: "Rout the enemy", deploy: "Lyn, Sain, Kent, Florina, Wil, Dorcas.",
      brief: "Serra is an NPC — talk with Lyn. Erk joins with her.",
      items: [
        { t: "Serra joins", k: "recruit", u: "serra", d: "NPC; talk with Lyn, or finish the chapter." },
        { t: "Erk joins", k: "recruit", u: "erk", d: "Joins together with Serra." },
        { t: "Iron Sword", k: "drop", d: "Dropped by an enemy Brigand." }
      ]
    },
    {
      id: "l6", modes: ["lyn"], num: "6", title: "Blood of Pride", gaiden: false,
      obj: "Trigger three switches", deploy: "Full Lyn squad.",
      brief: "Two chests and a village. Matthew joins from the north village or turn 3.",
      items: [
        { t: "Rath joins", k: "recruit", u: "rath", d: "Automatically at start." },
        { t: "Matthew joins", k: "recruit", u: "matthew", d: "Visit one of the northern villages, or automatically on turn 3." },
        { t: "Angelic Robe", k: "chest", d: "Chest." },
        { t: "Armorslayer", k: "chest", d: "Chest." },
        { t: "Door Key", k: "village", d: "Central village." },
        { t: "5,000G", k: "event", d: "Automatic at end of chapter." }
      ]
    },
    {
      id: "l7", modes: ["lyn"], num: "7", title: "Siblings Abroad", gaiden: false,
      obj: "Defeat Heintz", deploy: "Full Lyn squad.",
      brief: "Finish within 15 turns to unlock 7x. Nils and Lucius join automatically.",
      turn: { limit: 15, unlocks: "7x", label: "Finish within 15 turns" },
      items: [
        { t: "Nils joins", k: "recruit", u: "nils", d: "Automatically at start." },
        { t: "Lucius joins", k: "recruit", u: "lucius", d: "Automatically at start." },
        { t: "Pure Water", k: "village", d: "Northern village." },
        { t: "Iron Lance", k: "drop", d: "Dropped by an enemy Brigand." }
      ],
      warnings: ["Over 15 turns and 7x is gone for this run."]
    },
    {
      id: "l7x", modes: ["lyn"], num: "7x", title: "The Black Shadow", gaiden: true, base: "l7", req: "Finish Chapter 7 within 15 turns.",
      obj: "Rout the enemy", deploy: "Lyn, Sain, Kent, Florina, Wil, Dorcas, Serra, Erk, Rath, Matthew, Nils, Lucius.",
      brief: "Optional. One chest, several steals.",
      items: [
        { t: "Hammer", k: "chest", d: "Lone chest." },
        { t: "Lockpick", k: "drop", d: "Steal from the enemy Thief." }
      ]
    },
    {
      id: "l8", modes: ["lyn"], num: "8", title: "Vortex of Strategy", gaiden: false,
      obj: "Rout the enemy", deploy: "Lyn squad (Matthew unavailable).",
      brief: "One village, one item. Fog on higher difficulty.",
      items: [
        { t: "Lancereaver", k: "village", d: "Village." }
      ]
    },
    {
      id: "l9", modes: ["lyn"], num: "9", title: "A Grim Reunion", gaiden: false,
      obj: "Seize the gate", deploy: "Full Lyn squad.",
      brief: "Wallace joins automatically. One village.",
      items: [
        { t: "Wallace joins", k: "recruit", u: "wallace", d: "Automatically at start." },
        { t: "Torch", k: "village", d: "Village." }
      ]
    },
    {
      id: "l10", modes: ["lyn"], num: "10", title: "The Distant Plains", gaiden: false,
      obj: "Seize the gate", deploy: "Full Lyn squad.",
      brief: "Last Lyn chapter. Nils must be level 7 by the end for Hector's 19xx much later.",
      items: [
        { t: "Energy Ring", k: "village", d: "Southern village." }
      ],
      warnings: ["Nils must reach level 7 by the end of this chapter to unlock 19xx in Hector Mode."]
    },

    /* ---------------- SHARED MAIN STORY ---------------- */
    {
      id: "c11", modes: ["eliwood"], num: "11", title: "Taking Leave", gaiden: false,
      obj: "Seize the gate", deploy: "Eliwood, Marcus, Lowen, Rebecca.",
      brief: "First Eliwood chapter. One village, and the whole starting squad.",
      items: [
        { t: "Eliwood, Marcus, Lowen, Rebecca join", k: "recruit", u: "eliwood", d: "Automatically at start." },
        { t: "Dorcas and Bartre join", k: "recruit", u: "dorcas", d: "Appear on turn 2." },
        { t: "Dragonshield", k: "village", d: "Village." }
      ]
    },
    {
      id: "c11h", modes: ["hector"], num: "11", title: "Another Journey", gaiden: false,
      obj: "Defeat Wire", deploy: "Hector, Matthew.",
      brief: "Hector's opening chapter. One chest with a Red Gem.",
      items: [
        { t: "Hector and Matthew join", k: "recruit", u: "hector", d: "Automatically at start." },
        { t: "Red Gem", k: "chest", d: "Chest." }
      ]
    },
    {
      id: "c12", modes: ["eliwood", "hector"], num: "12", numH: "12", title: "Birds of a Feather", gaiden: false,
      obj: "Rout the enemy", deploy: "Whatever you have.",
      brief: "Secret Book village. The other lord joins mid-map.",
      items: [
        { t: "Hector and Oswin join", k: "recruit", u: "hector", d: "Eliwood Mode: appear on turn 3.", m: ["eliwood"] },
        { t: "Eliwood's squad joins", k: "recruit", u: "eliwood", d: "Hector Mode: Eliwood, Marcus, Lowen, Rebecca, Bartre, Dorcas, Serra, Oswin at start.", m: ["hector"] },
        { t: "Secret Book", k: "village", d: "Village." }
      ]
    },
    {
      id: "c13", modes: ["eliwood", "hector"], num: "13", numH: "13", title: "In Search of Truth", gaiden: false,
      obj: "Seize the gate", deploy: "Lords + Matthew (for Guy).",
      brief: "The north village unlocks 13x AND holds the Torch. Guy needs Matthew.",
      side: { id: "c13x", title: "13x The Peddler Merlinus", req: "Visit the northern village in this chapter." },
      items: [
        { t: "Guy joins", k: "recruit", u: "guy", d: "Enemy; talk with Matthew." },
        { t: "Torch", k: "village", d: "Northern village — also unlocks 13x." },
        { t: "Mine", k: "village", d: "Southern village." }
      ]
    },
    {
      id: "c13x", modes: ["eliwood", "hector"], num: "13x", numH: "13x", title: "The Peddler Merlinus", gaiden: true, base: "c13", req: "Visit the northern village in Chapter 13.",
      obj: "Protect Merlinus for 7 turns", deploy: "Fast units; Merlinus must survive.",
      brief: "Merlinus joins permanently. Protect him for 7 turns.",
      items: [
        { t: "Merlinus joins", k: "recruit", u: "merlinus", d: "Automatically at start (and survives into the main campaign)." },
        { t: "5,000G", k: "village", d: "Village." }
      ],
      warnings: ["Merlinus dying is a defeat condition."]
    },
    {
      id: "c14", modes: ["eliwood", "hector"], num: "14", numH: "14", title: "False Friends", gaiden: false,
      obj: "Rout the enemy", deploy: "Priscilla's village is the priority.",
      brief: "Priscilla is in the southern village. Erk joins her (or via Serra).",
      items: [
        { t: "Priscilla joins", k: "recruit", u: "priscilla", d: "Visit the southern village, or joins with Erk." },
        { t: "Erk joins", k: "recruit", u: "erk", d: "NPC; talk with Serra or Priscilla." },
        { t: "Iron Blade", k: "village", d: "Northern village." },
        { t: "Silver Lance", k: "drop", d: "Dropped by Erik — Normal Mode only." },
        { t: "Horseslayer", k: "drop", d: "Dropped by Erik — Hard Mode." }
      ]
    },
    {
      id: "talons", modes: ["hector"], num: "15", title: "Talons Alight", gaiden: false,
      obj: "Defend the throne for 7 turns", deploy: "Hector Mode only. Hold the throne room.",
      brief: "Hector-exclusive defence map. Two chests and Sealen's drop.",
      items: [
        { t: "Silver Axe", k: "chest", d: "Left chest." },
        { t: "Mend", k: "chest", d: "Right chest." },
        { t: "Dragonshield", k: "drop", d: "Dropped by Sealen — Hard Mode only." },
        { t: "Steel Bow", k: "drop", d: "Dropped by Sealen — Normal Mode." },
        { t: "Longbow", k: "drop", d: "Dropped by Sealen — Normal Mode." }
      ]
    },
    {
      id: "noble", modes: ["eliwood", "hector"], num: "15", numH: "16", title: "Noble Lady of Caelin", gaiden: false,
      obj: "Seize the gate", deploy: "Lords; Lyn's squad joins at start.",
      brief: "Two villages; Red Gem and Heavy Spear. Lyn, Kent, Sain, Wil and Florina rejoin.",
      items: [
        { t: "Lyn, Kent, Sain, Wil, Florina join", k: "recruit", u: "lyn", d: "Automatically at start." },
        { t: "Red Gem", k: "village", d: "South-western village." },
        { t: "Heavy Spear", k: "village", d: "Southern village." }
      ]
    },
    {
      id: "whereabouts", modes: ["eliwood", "hector"], num: "16", numH: "17", title: "Whereabouts Unknown", gaiden: false,
      obj: "Seize the throne", deploy: "Priscilla is required for Raven; Raven for Lucius.",
      brief: "Four chests, including Hero Crest and Knight Crest. Caelin soldiers decide 16x and bonus items.",
      side: { id: "port", title: "16x/17x The Port of Badon", req: "At least one Caelin soldier alive at the end of this chapter." },
      turn: { limit: null, unlocks: null, label: "" },
      items: [
        { t: "Raven joins", k: "recruit", u: "raven", d: "Enemy; talk with Priscilla." },
        { t: "Lucius joins", k: "recruit", u: "lucius", d: "NPC; talk with Raven." },
        { t: "Unlock", k: "chest", d: "Left southern chest." },
        { t: "Hero Crest", k: "chest", d: "Right southern chest." },
        { t: "Knight Crest", k: "chest", d: "Left northern chest." },
        { t: "Silver Sword", k: "chest", d: "Right northern chest." },
        { t: "Mine", k: "event", d: "End of chapter if 1 Caelin soldier survived." },
        { t: "Light Rune", k: "event", d: "End of chapter if 2 Caelin soldiers survived." },
        { t: "Red Gem", k: "event", d: "End of chapter if 3 Caelin soldiers survived." }
      ],
      warnings: ["Kill the boss early and the soldiers may die — check them before you seize."]
    },
    {
      id: "port", modes: ["eliwood", "hector"], num: "16x", numH: "17x", title: "The Port of Badon", gaiden: true, base: "whereabouts", req: "Keep at least one Caelin soldier alive in Chapter 16E/17H.",
      obj: "Speak with Fargus", deploy: "Thief/Matthew for steals; do not attack Fargus.",
      brief: "Four villages, four items. Canas is in a village. Attacking Fargus fails the chapter.",
      items: [
        { t: "Canas joins", k: "recruit", u: "canas", d: "Visit one of the villages." },
        { t: "Short Bow", k: "village", d: "Middle village." },
        { t: "Lancereaver", k: "village", d: "North-western village." },
        { t: "Devil Axe", k: "village", d: "South-eastern village." },
        { t: "Sleep", k: "village", d: "Western village." }
      ],
      warnings: ["Do not attack Fargus — it ends the chapter in failure."]
    },
    {
      id: "pirate", modes: ["eliwood", "hector"], num: "17", numH: "18", title: "Pirate Ship", gaiden: false,
      obj: "Survive 11 turns or defeat Zoldam", deploy: "Fliers and ranged units; low terrain.",
      brief: "Guiding Ring is the headline item. Fog of war on some difficulties.",
      items: [
        { t: "Guiding Ring", k: "drop", d: "Dropped by an enemy Shaman (Normal), or steal from Zoldam (Hard)." },
        { t: "Longsword", k: "drop", d: "Dropped by an enemy Mercenary." },
        { t: "Pure Water", k: "drop", d: "Dropped by an enemy Mercenary — Normal only." },
        { t: "Red Gem", k: "drop", d: "Dropped by an enemy Archer — Normal only." },
        { t: "Flux", k: "drop", d: "Dropped by an enemy Shaman — Hard only." },
        { t: "Speedwings", k: "drop", d: "Steal from Zoldam — Normal only." },
        { t: "Elysian Whip", k: "drop", d: "Steal from an enemy Pegasus Knight — Hector Hard Mode only.", verify: true }
      ]
    },
    {
      id: "dread", modes: ["eliwood", "hector"], num: "18", numH: "19", title: "The Dread Isle", gaiden: false,
      obj: "Defeat Uhai", deploy: "Fliers; Dart and Fiora join here.",
      brief: "Finish within 15 turns for 18x/19x. Orion's Bolt drops from Uhai.",
      side: { id: "imprisoner", title: "18x/19x Imprisoner of Magic", req: "Complete this chapter within 15 turns." },
      turn: { limit: 15, unlocks: "18x/19x", label: "Finish within 15 turns" },
      items: [
        { t: "Dart joins", k: "recruit", u: "dart", d: "Automatically at start, if you visited 16x/17x and he survived." },
        { t: "Fiora joins", k: "recruit", u: "fiora", d: "NPC on turn 3; talk with Florina." },
        { t: "Orion's Bolt", k: "drop", d: "Dropped by Uhai." },
        { t: "Torch", k: "drop", d: "Dropped by an enemy Nomad." },
        { t: "Longbow", k: "drop", d: "Dropped by an enemy Nomad — Normal only." },
        { t: "Nosferatu", k: "drop", d: "Dropped by an enemy Shaman — Normal only." }
      ],
      warnings: ["Over 15 turns and Imprisoner of Magic is lost."]
    },
    {
      id: "imprisoner", modes: ["eliwood", "hector"], num: "18x", numH: "19x", title: "Imprisoner of Magic", gaiden: true, base: "dread", req: "Finish Chapter 18E/19H within 15 turns.",
      obj: "Seize the gate", deploy: "High-res units; Kishuna nullifies magic nearby.",
      brief: "Goddess Icon in the ruins. Silver Card can be stolen from Aion on Hard.",
      items: [
        { t: "Goddess Icon", k: "item", d: "Visit the ruins." },
        { t: "Silver Card", k: "drop", d: "Steal from Aion — Hard Mode only." },
        { t: "Elysian Whip", k: "drop", d: "Steal from an enemy Pegasus Knight — Eliwood Hard Mode only.", verify: true }
      ]
    },
    {
      id: "glimpse", modes: ["hector"], num: "19x pt 2", title: "A Glimpse in Time", gaiden: true, base: "imprisoner", req: "Nils at level 7 by the end of Lyn Mode, and defeat Kishuna in 19x.",
      obj: "Seize the throne", deploy: "Fast units; enemy thieves race you to chests.",
      brief: "Hector-only. Requires Nils level 7 at end of Lyn Mode AND Kishuna defeated in 19x.",
      items: [
        { t: "Talisman", k: "chest", d: "Lone northern chest." },
        { t: "Eclipse", k: "chest", d: "Left southern chest — beat the enemy Thief to it." },
        { t: "Dragonshield", k: "chest", d: "Right southern chest — beat the enemy Thief to it, or steal it back." }
      ],
      warnings: ["Enemy Thieves open the southern chests. Kill or block them fast."]
    },
    {
      id: "dragon", modes: ["eliwood", "hector"], num: "19", numH: "20", title: "Dragon's Gate", gaiden: false,
      obj: "Seize the throne", deploy: "Thief required: Member Card is stolen here.",
      brief: "Steal the Member Card from the enemy Thief — this is your secret-shop key.",
      items: [
        { t: "Legault joins", k: "recruit", u: "legault", d: "Enemy on turn 2; talk with your main lord or Lyn." },
        { t: "Member Card", k: "drop", d: "Steal from the enemy Thief — required for every secret shop." },
        { t: "Brave Bow", k: "chest", d: "Lone chest in the south-western room." },
        { t: "Blue Gem", k: "chest", d: "Left chest in the north-western room." },
        { t: "Luna", k: "chest", d: "Right chest in the north-western room." },
        { t: "Guiding Ring", k: "chest", d: "Bottom chest in the eastern room — beat Legault or another Thief to it." },
        { t: "Barrier", k: "chest", d: "Upper chest in the eastern room — beat the Thieves to it." },
        { t: "Secret shop (north-west)", k: "shop", d: "Top-left, right corner of the grassy strip between the throne room and the two-chest chamber. Needs the Member Card." },
        { t: "Secret shop (south-east)", k: "shop", d: "Very bottom-right, the lone forest tile in the corner. Needs the Member Card." },
        { t: "Light Rune", k: "drop", d: "Steal from Legault, or recruit him — Eliwood's tale." },
        { t: "Chest Key x2", k: "drop", d: "Steal from Legault before he opens a chest, or recruit him — Hector's tale." },
        { t: "Halberd", k: "drop", d: "Dropped by Cameron — Normal only." },
        { t: "Elixir", k: "drop", d: "Dropped by Cameron — Hard only." }
      ],
      warnings: ["The Member Card is the single most missable item in the game. Steal it before the Thief escapes.", "Legault races you to the eastern chests. Reach him or the chests first."]
    },
    {
      id: "newresolve", modes: ["eliwood", "hector"], num: "20", numH: "21", title: "New Resolve", gaiden: false,
      obj: "Defeat Oleg", deploy: "Four villages, so bring mounted units.",
      brief: "Four villages: Restore, Light Rune, Elysian Whip, Wyrmslayer. Ninian joins.",
      items: [
        { t: "Ninian joins", k: "recruit", u: "ninian", d: "Automatically at start." },
        { t: "Restore", k: "village", d: "Top western village." },
        { t: "Light Rune", k: "village", d: "Bottom western village." },
        { t: "Elysian Whip", k: "village", d: "North-eastern village." },
        { t: "Wyrmslayer", k: "village", d: "South-eastern village." },
        { t: "Hero Crest", k: "drop", d: "Steal from Oleg." }
      ]
    },
    {
      id: "kinship", modes: ["eliwood", "hector"], num: "21", numH: "22", title: "Kinship's Bond", gaiden: false,
      obj: "Protect Nils for 11 turns, or defeat Eubans", deploy: "Heath and Rath need specific talkers.",
      brief: "Secret shop in the top-left, left of the pillar. Two chests. Rath needs Lyn, Heath needs a lord/Lyn/Ninian.",
      items: [
        { t: "Isadora joins", k: "recruit", u: "isadora", d: "Automatically at start." },
        { t: "Rath joins", k: "recruit", u: "rath", d: "NPC; talk with Lyn." },
        { t: "Heath joins", k: "recruit", u: "heath", d: "Enemy; talk with Eliwood, Hector, Lyn or Ninian." },
        { t: "10,000G", k: "chest", d: "Upper chest." },
        { t: "Brave Axe", k: "chest", d: "Lower chest." },
        { t: "Secret shop", k: "shop", d: "Top-left of the map, left of the pillar. Needs the Member Card." }
      ],
      warnings: ["Nils dying is a defeat condition."]
    },
    {
      id: "living", modes: ["eliwood", "hector"], num: "22", numH: "23", title: "Living Legend", gaiden: false,
      obj: "Rout the enemy", deploy: "Thief for sand digging; Hawkeye must be talked to.",
      brief: "Six hidden items in the sand. Recruiting Hawkeye unlocks 22x/23x.",
      side: { id: "genesis", title: "22x/23x Genesis", req: "Recruit Hawkeye by talking to him, keep him alive, and gain 700+ total EXP this chapter." },
      items: [
        { t: "Hawkeye joins", k: "recruit", u: "hawkeye", d: "NPC on turn 2; talk with your main lord." },
        { t: "Hero Crest", k: "item", d: "Hidden treasure in the sand." },
        { t: "Light Brand", k: "item", d: "Hidden treasure in the sand." },
        { t: "Filla's Might", k: "item", d: "Hidden treasure in the sand." },
        { t: "Eclipse", k: "item", d: "Hidden treasure in the sand." },
        { t: "Ocean Seal", k: "item", d: "Hidden treasure in the sand." },
        { t: "Body Ring", k: "item", d: "Hidden treasure in the sand." },
        { t: "Luna", k: "drop", d: "Dropped by an enemy Shaman (Normal / Eliwood Hard)." },
        { t: "Afa's Drops", k: "event", d: "End of chapter if you do NOT play 22x/23x and Mark is present.", verify: true }
      ]
    },
    {
      id: "genesis", modes: ["eliwood", "hector"], num: "22x", numH: "23x", title: "Genesis", gaiden: true, base: "living", req: "Recruit Hawkeye by talking to him, keep him alive, and gain 700+ EXP in Chapter 22E/23H.",
      obj: "Rout the enemy", deploy: "Mixed; Kishuna's aura shuts down magic.",
      brief: "Kishuna chapter. Attacking him spawns reinforcements with silver weapons.",
      items: [
        { t: "Silver Bow", k: "drop", d: "Reinforcement Archer after Kishuna's door opens." },
        { t: "Silver Sword", k: "drop", d: "Reinforcement Mercenary." },
        { t: "Silver Lance", k: "drop", d: "Reinforcement Knight." },
        { t: "Silver Axe", k: "drop", d: "Reinforcement Fighter." },
        { t: "Berserk", k: "chest", d: "South-eastern chest." },
        { t: "Secret Book", k: "chest", d: "South middle chest." },
        { t: "Silver Blade", k: "chest", d: "South-western chest." },
        { t: "Afa's Drops", k: "event", d: "End of chapter if Mark is present." }
      ]
    },
    {
      id: "fourfang", modes: ["eliwood", "hector"], num: "23", numH: "24", title: "Four-Fanged Offense", gaiden: false,
      obj: "Defeat Linus (or Lloyd)", deploy: "Dart for Geitz; Lyn/Kent/Sain/Florina/Wil for Wallace.",
      brief: "Two versions. Lords' combined level 50+ gives Linus and Geitz; 49 or less gives Lloyd and Wallace.",
      branch: "fourfang",
      items: [
        { t: "Geitz joins (Linus version)", k: "recruit", u: "geitz", d: "Enemy; talk with Dart. Requires lords' combined level 50+." },
        { t: "Wallace joins (Lloyd version)", k: "recruit", u: "wallace", d: "NPC; talk with Lyn, Kent, Sain, Florina or Wil. Lords' combined level 49 or lower." },
        { t: "Orion's Bolt (Linus)", k: "village", d: "Village due west of the arena." },
        { t: "Silence (Linus)", k: "village", d: "Village due west of the northern armory." },
        { t: "Earth Seal (Linus)", k: "village", d: "South-eastern village." },
        { t: "Silence (Lloyd)", k: "village", d: "Northern village." },
        { t: "Earth Seal (Lloyd)", k: "village", d: "Southern village." }
      ]
    },
    {
      id: "crazed", modes: ["hector"], num: "25", title: "Crazed Beast", gaiden: false,
      obj: "Earn three points", deploy: "Hector Mode only; Farina costs 20,000G.",
      brief: "Hector-exclusive. Earn 3 points to win. Farina appears on turn 5.",
      items: [
        { t: "Farina joins", k: "recruit", u: "farina", d: "NPC on turn 5; let her talk to Hector and pay 20,000G." },
        { t: "Elysian Whip", k: "village", d: "Village." },
        { t: "Divine", k: "drop", d: "Dropped by an enemy Monk." }
      ]
    },
    {
      id: "unfulfilled", modes: ["eliwood", "hector"], num: "24", numH: "26", title: "Unfulfilled Heart", gaiden: false,
      obj: "Survive 11 turns", deploy: "Pent and Louise arrive; protect them.",
      brief: "Heaven Seal at the start if Hawkeye was not defeated earlier. Hammerne village.",
      items: [
        { t: "Pent and Louise join", k: "recruit", u: "pent", d: "Automatically at start." },
        { t: "Heaven Seal", k: "event", d: "At the start, if Hawkeye was not defeated before Four-Fanged Offense.", verify: true },
        { t: "Hammerne", k: "village", d: "Village." },
        { t: "Knight Crest", k: "drop", d: "Steal from an enemy Cavalier (Normal / Eliwood Hard)." },
        { t: "Luna", k: "drop", d: "Dropped by an enemy Shaman (Normal / Hector Hard)." }
      ],
      warnings: ["Pent dying is a defeat condition. Keep him out of the front line."]
    },
    {
      id: "paleflower", modes: ["eliwood", "hector"], num: "25", numH: "27", title: "Pale Flower of Darkness", gaiden: false,
      obj: "Seize the throne (Kenneth) or rout (Jerme)", deploy: "Your choice of Karel or Harken depends on the counters below.",
      brief: "Version is decided by EXP earned by magic units (Serra, Erk, Priscilla, Lucius) vs physical units (Dorcas, Bartre, Guy, Raven). Karel vs Harken is a separate counter.",
      branch: "paleflower",
      items: [
        { t: "Karel joins", k: "recruit", u: "karel", d: "NPC on turn 10; main lord or Lyn talks. Kenneth: defeat 2+ promoted enemies (only the north-west Druid/Sniper, south-west Sage/General and centre Bishop count). Jerme: open 4+ doors." },
        { t: "Harken joins", k: "recruit", u: "harken", d: "Enemy on turn 10; Eliwood, Marcus, Lowen, Hector, Oswin or Isadora talks. Kenneth: defeat fewer than 2 promoted enemies. Jerme: open fewer than 4 doors." },
        { t: "Guiding Ring (Kenneth)", k: "chest", d: "Upper-left chest." },
        { t: "Blue Gem (Kenneth)", k: "chest", d: "Centre chest." },
        { t: "Talisman (Kenneth)", k: "chest", d: "Bottom-right chest." },
        { t: "Talisman (Jerme)", k: "chest", d: "Chest in the northern room." },
        { t: "White Gem (Jerme)", k: "chest", d: "Left chest in the centre room." },
        { t: "Bolting (Jerme)", k: "chest", d: "Right chest in the centre room." },
        { t: "Hero Crest (Jerme)", k: "chest", d: "Chest in the bottom room." }
      ]
    },
    {
      id: "bbd", modes: ["eliwood", "hector"], num: "26", numH: "28", title: "Battle before Dawn", gaiden: false,
      obj: "Protect Zephiel for 15 turns", deploy: "Fast units to reach Zephiel; Nino must talk to Jaffar.",
      brief: "Four chests with the game's best gear. Nino talking to Jaffar unlocks 26x/28x.",
      side: { id: "night", title: "26x/28x Night of Farewells", req: "Recruit Nino, have her talk to Jaffar, and both survive." },
      items: [
        { t: "Nino joins", k: "recruit", u: "nino", d: "NPC; talk with your main lord or Lyn." },
        { t: "Jaffar joins", k: "recruit", u: "jaffar", d: "Automatic if Nino talked to him and both survived." },
        { t: "Boots", k: "chest", d: "Left chest in the western room." },
        { t: "Brave Lance", k: "chest", d: "Right chest in the western room." },
        { t: "Rescue", k: "chest", d: "Left chest in the eastern room." },
        { t: "Delphi Shield", k: "chest", d: "Right chest in the eastern room." },
        { t: "Heaven Seal", k: "event", d: "Automatic at end of chapter." }
      ],
      warnings: ["Zephiel dying is a defeat condition.", "Nino must survive and talk to Jaffar."]
    },
    {
      id: "night", modes: ["eliwood", "hector"], num: "26x", numH: "28x", title: "Night of Farewells", gaiden: true, base: "bbd", req: "Recruit Nino, have her talk to Jaffar, and keep both alive.",
      obj: "Seize the throne", deploy: "Fliers strongly recommended; Mercurius-style chest race.",
      brief: "Fell Contract drops from Sonia. Four chests on the north-east island. Jaffar joins here if he survived Battle before Dawn.",
      items: [
        { t: "Fell Contract", k: "drop", d: "Dropped by Sonia." },
        { t: "Fenrir", k: "chest", d: "Left chest on the north-eastern island." },
        { t: "Thor's Ire", k: "chest", d: "Middle chest on the north-eastern island." },
        { t: "Recover", k: "chest", d: "Right chest on the north-eastern island." },
        { t: "Speedwings", k: "chest", d: "Lone chest on the southern island." }
      ]
    },
    {
      id: "cog", modes: ["eliwood", "hector"], num: "27", numH: "29", title: "Cog of Destiny", gaiden: false,
      obj: "Rout the enemy", deploy: "Vaida appears; the village has Warp.",
      brief: "Warp is in the village. Vaida is recruited if she survived 24/26.",
      items: [
        { t: "Vaida joins", k: "recruit", u: "vaida", d: "Enemy; talk with your main lord, provided she survived Ch.24/26." },
        { t: "Warp", k: "village", d: "Village." },
        { t: "Iron Rune", k: "drop", d: "Dropped by Lloyd or Linus." },
        { t: "Guiding Ring", k: "drop", d: "Steal from an enemy Sniper — Normal only." }
      ]
    },
    {
      id: "valorous", modes: ["eliwood", "hector"], num: "28", numH: "30", title: "Valorous Roland", gaiden: false,
      obj: "Claim a space", deploy: "Nils replaces Ninian for this chapter.",
      brief: "No villages. Georg drops a Tomahawk.",
      items: [
        { t: "Tomahawk", k: "drop", d: "Dropped by Georg." },
        { t: "Elixir", k: "drop", d: "Dropped by an enemy Warrior." },
        { t: "Rapier", k: "drop", d: "Dropped by an enemy Myrmidon." }
      ]
    },
    {
      id: "berserker", modes: ["hector"], num: "30", title: "The Berserker", gaiden: false,
      obj: "Claim a space", deploy: "Hector Mode only; Nils replaces Ninian.",
      brief: "Three chests, including a second Wolf Beil. Oswin and Merlinus are unavailable.",
      items: [
        { t: "Wolf Beil", k: "chest", d: "North-eastern chest." },
        { t: "Pure Water", k: "chest", d: "South-central chest." },
        { t: "Elixir", k: "chest", d: "South-western chest." },
        { t: "Wolf Beil", k: "drop", d: "Dropped by an enemy Fighter — Normal only." },
        { t: "Tomahawk", k: "drop", d: "Dropped by Kaim." }
      ]
    },
    {
      id: "sands", modes: ["eliwood", "hector"], num: "29", numH: "31", title: "Sands of Time", gaiden: false,
      obj: "Defend the throne for 11 turns", deploy: "Warp user for the secret shop; strong fliers.",
      brief: "Three chests. Secret shop sits outside the walls and needs Warp.",
      items: [
        { t: "Dragonshield", k: "chest", d: "Left chest in the northern room." },
        { t: "White Gem", k: "chest", d: "Right chest in the northern room." },
        { t: "Body Ring", k: "chest", d: "Lone southern chest." },
        { t: "Secret shop", k: "shop", d: "Bottom-left 2x2 plains outside the castle walls — requires Warp. Stocks all five promotion seals." },
        { t: "Swordslayer", k: "drop", d: "Dropped by an enemy Sniper — Normal only." }
      ]
    },
    {
      id: "prep", modes: ["eliwood", "hector"], num: "29x", numH: "31x", title: "Battle Preparations", gaiden: true, base: "sands", req: "Automatically available after Chapter 29E/31H.",
      obj: "Survive 5 turns", deploy: "Shopping chapter — bring your wallet.",
      brief: "Always available. 30,000G at the start, every armory in one place, and Karla in Hector Mode.",
      items: [
        { t: "30,000G", k: "event", d: "Automatic at the start." },
        { t: "Karla joins", k: "recruit", u: "karla", d: "Hector Mode only. Bartre must be a level 5+ Warrior and talk to her; both must survive a round of combat.", m: ["hector"] }
      ]
    },
    {
      id: "vod", modes: ["eliwood", "hector"], num: "30", numH: "32", title: "Victory or Death", gaiden: false,
      obj: "Seize the gate", deploy: "Renault is in the north-west ruins — reach him within 11 turns.",
      brief: "Renault joins from the NW ruins. Secret shop top-right. Hector: finish within 20 turns for 32x.",
      side: { id: "value", title: "32x The Value of Life", req: "Hector Mode only: complete this chapter within 20 turns.", mode: "hector" },
      turn: { limit: 20, unlocks: "32x", label: "Hector Mode only: finish within 20 turns for 32x" },
      items: [
        { t: "Renault joins", k: "recruit", u: "renault", d: "Visit the most north-western ruins within 11 turns." },
        { t: "Earth Seal", k: "event", d: "Automatic at the start." },
        { t: "Talisman", k: "ruin", d: "South-eastern ruins." },
        { t: "Set's Litany", k: "ruin", d: "Central ruins." },
        { t: "Secret shop", k: "shop", d: "Top-right of the map, the single plains tile between the forest and thicket. Stocks Earth Seal, Fell Contract, Ocean Seal." }
      ]
    },
    {
      id: "value", modes: ["hector"], num: "32x", title: "The Value of Life", gaiden: true, base: "vod", req: "Hector Mode only: finish Chapter 32 within 20 turns.",
      obj: "Kill Kishuna", deploy: "Hector Mode only, unlocked by finishing Ch.32 within 20 turns.",
      brief: "Two chests and a Runesword drop.",
      items: [
        { t: "Runesword", k: "chest", d: "Western chest." },
        { t: "Fortify", k: "chest", d: "Eastern chest." },
        { t: "Runesword", k: "drop", d: "Dropped by an enemy Swordmaster — Normal only." }
      ]
    },
    {
      id: "light1", modes: ["eliwood", "hector"], num: "Final", title: "Light (part 1)", gaiden: false,
      obj: "Defeat Nergal", deploy: "Deploy your strongest 12; Athos joins.",
      brief: "Every enemy commander drops a legendary weapon. Kill all of them before Nergal dies.",
      items: [
        { t: "Athos joins", k: "recruit", u: "athos", d: "Automatically at start." },
        { t: "Gespenst", k: "drop", d: "Dropped by an enemy Druid." },
        { t: "Luce", k: "drop", d: "Dropped by Kenneth." },
        { t: "Regal Blade", k: "drop", d: "Dropped by Lloyd." },
        { t: "Basilikos", k: "drop", d: "Dropped by Brendan." },
        { t: "Rex Hasta", k: "drop", d: "Dropped by Darin." },
        { t: "Excalibur", k: "drop", d: "Dropped by Ursula." },
        { t: "Rienfleche", k: "drop", d: "Dropped by Uhai." }
      ],
      warnings: ["Killing Nergal ends the chapter — collect every drop first."]
    },
    {
      id: "light2", modes: ["eliwood", "hector"], num: "Final", title: "Light (part 2)", gaiden: false,
      obj: "Kill the dragon", deploy: "Only units deployed in part 1 are available.",
      brief: "Final map. Use the legendary weapons you collected.",
      items: []
    }
  ],

  units: [
    { id: "eliwood", name: "Eliwood", cls: "Lord → Knight Lord", tier: "B", join: "Ch.11 E / 12 H", mode: "both", aff: "Anima", note: "Mandatory, balanced, promotes late.", build: "Durandal at the end. Rapier for armour. Promote with the Heaven Seal." },
    { id: "lyn", name: "Lyn", cls: "Lord → Blade Lord", tier: "B", join: "Lyn Mode / Ch.15 E / 16 H", mode: "both", aff: "Wind", note: "Fast but fragile; Sol Katti is late.", build: "Mani Katti early, Sol Katti late. Keep her away from lances." },
    { id: "hector", name: "Hector", cls: "Lord → Great Lord", tier: "A", join: "Ch.12 E / 11 H", mode: "both", aff: "Thunder", note: "Best physical wall in the game.", build: "Armads at the end. Give him the first Heaven Seal in Hector Mode." },
    { id: "sain", name: "Sain", cls: "Cavalier → Paladin", tier: "S", join: "Lyn Mode / Ch.15 E / 16 H", mode: "both", aff: "Wind", note: "Huge strength and mobility; a core unit all game.", build: "Knight Crest. Iron Lance, Javelin, Killer Lance." },
    { id: "kent", name: "Kent", cls: "Cavalier → Paladin", tier: "A", join: "Lyn Mode / Ch.15 E / 16 H", mode: "both", aff: "Anima", note: "The steadier cavalier: skill and speed over raw strength.", build: "Knight Crest. Iron Lance, Javelin." },
    { id: "florina", name: "Florina", cls: "Pegasus Knight → Falcon Knight", tier: "S", join: "Lyn Mode / Ch.15 E / 16 H", mode: "both", aff: "Light", note: "Best flier in the game; carries entire maps.", build: "Elysian Whip. Slim Lance, Javelin. Angelic Robe if she is fragile." },
    { id: "wil", name: "Wil", cls: "Archer → Sniper", tier: "C", join: "Lyn Mode / Ch.15 E / 16 H", mode: "both", aff: "Wind", note: "Slow, accurate archer with low strength.", build: "Orion's Bolt. Steel Bow, Killer Bow." },
    { id: "marcus", name: "Marcus", cls: "Paladin", tier: "S", join: "Ch.11 E / 12 H", mode: "both", aff: "Ice", note: "Pre-promoted and still excellent. Ignore the tier-list snobbery.", build: "Silver Lance, Javelin, Iron Sword. Use him to carry the early game." },
    { id: "lowen", name: "Lowen", cls: "Cavalier → Paladin", tier: "A", join: "Ch.11 E / 12 H", mode: "both", aff: "Fire", note: "Bulky cavalier, low speed.", build: "Knight Crest. Iron/Steel Lance, Javelin." },
    { id: "rebecca", name: "Rebecca", cls: "Archer → Sniper", tier: "C", join: "Ch.11 E / 12 H", mode: "both", aff: "Fire", note: "Fast archer, poor strength.", build: "Orion's Bolt. Killer Bow." },
    { id: "dorcas", name: "Dorcas", cls: "Fighter → Warrior", tier: "C", join: "Lyn Mode / Ch.11 E", mode: "both", aff: "Fire", note: "Slow, hits hard.", build: "Hero Crest. Iron Axe, Hand Axe." },
    { id: "bartre", name: "Bartre", cls: "Fighter → Warrior", tier: "C", join: "Ch.11 E / 12 H", mode: "both", aff: "Thunder", note: "Needed at level 5 Warrior for Karla in Hector Mode.", build: "Hero Crest. Brave Axe if you have one." },
    { id: "oswin", name: "Oswin", cls: "Knight → General", tier: "A", join: "Ch.12 E / 12 H", mode: "both", aff: "Anima", note: "Armour wall; slow.", build: "Knight Crest. Javelin, Iron Lance." },
    { id: "serra", name: "Serra", cls: "Cleric → Bishop", tier: "B", join: "Lyn Mode / Ch.13 E", mode: "both", aff: "Thunder", note: "Fast, fragile healer.", build: "Guiding Ring. Mend, Physic." },
    { id: "matthew", name: "Matthew", cls: "Thief", tier: "C", join: "Lyn Mode / Ch.13 E", mode: "both", aff: "Wind", note: "Chests and steals; combat is a bonus.", build: "No promotion. Lockpick is his job." },
    { id: "guy", name: "Guy", cls: "Myrmidon → Swordmaster", tier: "B", join: "Ch.13", mode: "both", aff: "Fire", note: "Fast swordfighter, low strength.", build: "Hero Crest. Killing Edge." },
    { id: "merlinus", name: "Merlinus", cls: "Transporter", tier: "C", join: "Ch.13x", mode: "both", aff: "Dark", note: "Convoy on legs. Keep him out of combat.", build: "None. Never deploy him in a fight." },
    { id: "erk", name: "Erk", cls: "Mage → Sage", tier: "B", join: "Lyn Mode / Ch.14", mode: "both", aff: "Thunder", note: "Reliable early mage.", build: "Guiding Ring. Thunder, Elfire, Physic." },
    { id: "priscilla", name: "Priscilla", cls: "Troubadour → Valkyrie", tier: "A", join: "Ch.14", mode: "both", aff: "Wind", note: "Mounted healer — the best utility unit in the game.", build: "Guiding Ring. Mend, Physic, Barrier." },
    { id: "raven", name: "Raven", cls: "Mercenary → Hero", tier: "S", join: "Ch.16 E / 17 H", mode: "both", aff: "Ice", note: "Outstanding combat from the moment he joins.", build: "Hero Crest. Killing Edge, Iron Blade." },
    { id: "lucius", name: "Lucius", cls: "Monk → Bishop", tier: "B", join: "Ch.16 E / 17 H", mode: "both", aff: "Light", note: "High magic, frail.", build: "Guiding Ring. Lightning, Shine, Physic." },
    { id: "canas", name: "Canas", cls: "Shaman → Druid", tier: "A", join: "Ch.16x / 17x", mode: "both", aff: "Anima", note: "Dark magic, Luna, and staves after promotion.", build: "Guiding Ring. Flux, Luna, Nosferatu." },
    { id: "dart", name: "Dart", cls: "Pirate → Berserker", tier: "B", join: "Ch.18 E / 19 H", mode: "both", aff: "Fire", note: "Huge damage, poor accuracy.", build: "Ocean Seal. Iron Axe, Hand Axe." },
    { id: "fiora", name: "Fiora", cls: "Pegasus Knight → Falcon Knight", tier: "B", join: "Ch.18 E / 19 H", mode: "both", aff: "Wind", note: "Second flier; squishier than Florina.", build: "Elysian Whip. Slim Lance, Javelin." },
    { id: "legault", name: "Legault", cls: "Thief", tier: "C", join: "Ch.19 E / 20 H", mode: "both", aff: "Ice", note: "Better thief than Matthew; no promotion.", build: "Lockpick. Steal everything." },
    { id: "ninian", name: "Ninian", cls: "Dancer", tier: "S", join: "Ch.20 E / 21 H", mode: "both", aff: "Ice", note: "Refresh is the strongest action in the game.", build: "Boots. Keep her behind the line forever." },
    { id: "isadora", name: "Isadora", cls: "Paladin", tier: "B", join: "Ch.21 E / 22 H", mode: "both", aff: "Dark", note: "Fast, fragile pre-promote.", build: "Silver Sword, Javelin." },
    { id: "heath", name: "Heath", cls: "Wyvern Rider → Wyvern Lord", tier: "A", join: "Ch.21 E / 22 H", mode: "both", aff: "Thunder", note: "Flying tank with axes after promotion.", build: "Elysian Whip. Iron Lance, Javelin." },
    { id: "rath", name: "Rath", cls: "Nomad → Nomadic Trooper", tier: "B", join: "Lyn Mode / Ch.21 E / 22 H", mode: "both", aff: "Dark", note: "Mounted bow, good mobility.", build: "Orion's Bolt. Iron Bow, Short Bow." },
    { id: "hawkeye", name: "Hawkeye", cls: "Berserker", tier: "A", join: "Ch.22 E / 23 H", mode: "both", aff: "Wind", note: "Pre-promoted, tanky, accurate.", build: "Killer Axe, Iron Axe." },
    { id: "geitz", name: "Geitz", cls: "Warrior", tier: "A", join: "Ch.23 E / 24 H (Linus)", mode: "both", aff: "Thunder", note: "Strong pre-promote with bows and axes.", build: "Brave Bow, Killer Axe." },
    { id: "wallace", name: "Wallace", cls: "General", tier: "C", join: "Lyn Mode / Ch.23 E / 24 H (Lloyd)", mode: "both", aff: "Thunder", note: "Slow armour; needs boots to matter.", build: "Silver Lance, Javelin." },
    { id: "farina", name: "Farina", cls: "Pegasus Knight → Falcon Knight", tier: "B", join: "Ch.25 H", mode: "hector", aff: "Anima", note: "Costs 20,000G. Third flier.", build: "Elysian Whip. Slim Lance, Javelin." },
    { id: "pent", name: "Pent", cls: "Sage", tier: "S", join: "Ch.24 E / 26 H", mode: "both", aff: "Ice", note: "Joins strong and never stops being useful.", build: "Elfire, Physic, Barrier, Warp." },
    { id: "louise", name: "Louise", cls: "Sniper", tier: "B", join: "Ch.24 E / 26 H", mode: "both", aff: "Light", note: "Accurate bow, low strength.", build: "Silver Bow, Killer Bow." },
    { id: "karel", name: "Karel", cls: "Swordmaster", tier: "C", join: "Ch.25 E / 27 H", mode: "both", aff: "Light", note: "Great stats, no time to grow.", build: "Killing Edge, Wo Dao." },
    { id: "harken", name: "Harken", cls: "Hero", tier: "S", join: "Ch.25 E / 27 H", mode: "both", aff: "Fire", note: "Best pre-promote in the game.", build: "Brave Sword, Killer Axe." },
    { id: "nino", name: "Nino", cls: "Mage → Sage", tier: "B", join: "Ch.26 E / 28 H", mode: "both", aff: "Fire", note: "Superb growths, joins far too late.", build: "Guiding Ring if you commit. Elfire, Luna." },
    { id: "jaffar", name: "Jaffar", cls: "Assassin", tier: "B", join: "Ch.26x / 28x", mode: "both", aff: "Ice", note: "Silencer and huge stats, no growth time.", build: "Killing Edge, Silver Sword." },
    { id: "vaida", name: "Vaida", cls: "Wyvern Lord", tier: "A", join: "Ch.27 E / 29 H", mode: "both", aff: "Fire", note: "Flying tank; joins late but ready.", build: "Silver Lance, Javelin, Killer Lance." },
    { id: "nils", name: "Nils", cls: "Bard", tier: "B", join: "Lyn Mode / Ch.28 E / 30 H", mode: "both", aff: "—", note: "Refresh, but only in chapters where Ninian is absent.", build: "None. Refresh every turn." },
    { id: "karla", name: "Karla", cls: "Swordmaster", tier: "C", join: "Ch.31x H", mode: "hector", aff: "Dark", note: "Requires a level 5+ Warrior Bartre.", build: "Killing Edge." },
    { id: "renault", name: "Renault", cls: "Bishop", tier: "C", join: "Ch.30 E / 32 H", mode: "both", aff: "Anima", note: "Joins at the very end; staffbot.", build: "Fortify, Physic." },
    { id: "athos", name: "Athos", cls: "Archsage", tier: "B", join: "Final", mode: "both", aff: "—", note: "One chapter only, but a monster for it.", build: "Forblaze, Aureola, Luna." }
  ],

  supports: [],

  strategy: {
    route: [
      "Lyn Mode first: finish Ch.7 within 15 turns for 7x, and get Nils to level 7 by Ch.10 for Hector's 19xx later.",
      "Visit the northern village in Ch.13 for 13x (Merlinus) — every run, no exceptions.",
      "Keep at least one Caelin soldier alive in Ch.16/17 for the Port of Badon and Canas.",
      "Finish the Dread Isle within 15 turns for Imprisoner of Magic and the Goddess Icon.",
      "Steal the Member Card in Dragon's Gate. It unlocks every secret shop in the game.",
      "Recruit Hawkeye by talking to him in Living Legend, keep him alive, and earn 700 EXP there for Genesis.",
      "Push the three lords to a combined level of 50 by the end of Ch.22/23 to get Linus and Geitz.",
      "In Ch.25/27, defeat fewer than 2 promoted enemies (Kenneth) or open fewer than 4 doors (Jerme) for Harken — the better unit.",
      "Recruit Nino in Battle before Dawn and have her talk to Jaffar. Both must survive for Night of Farewells.",
      "Finish Victory or Death within 20 turns in Hector Mode for 32x."
    ],
    tiers: {
      S: ["Marcus", "Sain", "Florina", "Raven", "Pent", "Ninian", "Harken"],
      A: ["Hector", "Kent", "Canas", "Priscilla", "Heath", "Hawkeye", "Vaida", "Oswin", "Lowen", "Geitz"],
      B: ["Eliwood", "Lyn", "Fiora", "Rath", "Lucius", "Dart", "Jaffar", "Nino", "Isadora", "Legault", "Farina", "Guy", "Serra", "Erk", "Athos", "Nils", "Louise"],
      C: ["Rebecca", "Wil", "Dorcas", "Bartre", "Matthew", "Wallace", "Renault", "Karla", "Karel", "Merlinus"]
    },
    tiersNote: "Practical, efficiency-first ranking. Accuracy of the ranking is a judgment call, not a fact.",
    promotions: [
      { item: "Knight Crest", units: "Cavalier, Knight", to: "Paladin, General" },
      { item: "Hero Crest", units: "Mercenary, Myrmidon, Fighter", to: "Hero, Swordmaster, Warrior" },
      { item: "Guiding Ring", units: "Mage, Monk, Shaman, Cleric, Troubadour", to: "Sage, Bishop, Druid, Bishop, Valkyrie" },
      { item: "Orion's Bolt", units: "Archer, Nomad", to: "Sniper, Nomadic Trooper" },
      { item: "Elysian Whip", units: "Pegasus Knight, Wyvern Rider", to: "Falcon Knight, Wyvern Lord" },
      { item: "Ocean Seal", units: "Pirate", to: "Berserker" },
      { item: "Fell Contract", units: "Thief", to: "Assassin" },
      { item: "Heaven Seal", units: "Lord", to: "Special lord class" },
      { item: "Earth Seal", units: "Any base class except Lord, Pirate, Thief", to: "Same as their normal promotion" }
    ],
    boosters: [
      { item: "Angelic Robe", effect: "+7 HP", best: "Florina, Priscilla or another fragile unit" },
      { item: "Energy Ring", effect: "+2 Str/Mag", best: "Sain, Raven or Canas" },
      { item: "Secret Book", effect: "+2 Skill", best: "Dart or another low-hit unit" },
      { item: "Speedwings", effect: "+2 Speed", best: "Lowen, Oswin or Hector" },
      { item: "Goddess Icon", effect: "+2 Luck", best: "Anyone you rely on for dodging" },
      { item: "Dragonshield", effect: "+2 Def", best: "Hector or Oswin" },
      { item: "Talisman", effect: "+2 Res", best: "A physical unit who eats magic" },
      { item: "Boots", effect: "+2 Move", best: "Ninian, or Hector if you want a mobile wall" },
      { item: "Body Ring", effect: "+2 Con", best: "A fast unit using heavy weapons" },
      { item: "Afa's Drops", effect: "+5% all growths", best: "A long-term project, not a pre-promote" }
    ],
    mechanics: [
      { h: "Doubling", p: "You double when your Attack Speed exceeds the enemy's by 4 or more. Attack Speed = Speed − max(0, Weapon Weight − Constitution). Heavy weapons silently cost you doubles." },
      { h: "Weapon triangle", p: "Sword beats Axe, Axe beats Lance, Lance beats Sword. Advantage gives +1 might and +15 hit; disadvantage gives −1 might and −15 hit." },
      { h: "Magic triangle", p: "Anima beats Light, Light beats Dark, Dark beats Anima. Same +1/−1 might and +15/−15 hit." },
      { h: "Rescue and drop", p: "A unit with higher Constitution can carry a smaller ally. Use it to pull units out of range or ferry them across the map." },
      { h: "Dancers", p: "Ninian and Nils grant a second action. That is effectively a free turn for your best unit every turn." },
      { h: "Supports", p: "Each unit can hold 5 support levels total; an A support costs 3 of them. Bonuses apply within 3 tiles. Supports do not build during Lyn Mode." },
      { h: "Fog of war", p: "Torches and the Torch staff extend vision. Thieves see further for free." },
      { h: "True hit", p: "Displayed hit rates above 50 are closer to certain than they look, and below 50 are worse. Do not trust a 70%." }
    ]
  }
};
