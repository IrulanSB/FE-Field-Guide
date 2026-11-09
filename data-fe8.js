/* Fire Emblem 8 (The Sacred Stones) — data pack.
   Sources: Fire Emblem Wiki (fireemblemwiki.org), Serenes Forest (serenesforest.net). */

window.FE8 = {
  id: "fe8",
  title: "Fire Emblem: The Sacred Stones",
  short: "FE8",
  year: 2004,
  platform: "Game Boy Advance",
  modes: [
    { id: "eirika", name: "Eirika Route" },
    { id: "ephraim", name: "Ephraim Route" }
  ],

  order: {
    eirika: ["p8", "c1", "c2", "c3", "c4", "c5", "c5x", "c6", "c7", "c8", "c9a", "c10a", "c11a", "c12a", "c13a", "c14a", "c15", "c16", "c17", "c18", "c19", "c20", "f1", "f2"],
    ephraim: ["p8", "c1", "c2", "c3", "c4", "c5", "c5x", "c6", "c7", "c8", "c9b", "c10b", "c11b", "c12b", "c13b", "c14b", "c15", "c16", "c17", "c18", "c19", "c20", "f1", "f2"]
  },

  chapters: [
    { id: "p8", modes: ["eirika", "ephraim"], num: "P", title: "The Fall of Renais", gaiden: false,
      obj: "Defeat O'Neill", deploy: "Eirika, Seth.",
      brief: "Tutorial. Seth hands Eirika the Rapier before the map.",
      items: [
        { t: "Eirika and Seth join", k: "recruit", u: "eirika", d: "Automatically at start." },
        { t: "Rapier", k: "item", d: "From Seth before the battle." }
      ] },
    { id: "c1", modes: ["eirika", "ephraim"], num: "1", title: "Escape!", gaiden: false,
      obj: "Seize the castle", deploy: "Eirika, Seth, Franz, Gilliam.",
      brief: "Franz and Gilliam join on turn 2; Vanessa and Moulder at the end.",
      items: [
        { t: "Franz and Gilliam join", k: "recruit", u: "franz", d: "Automatically on turn 2." },
        { t: "Vanessa and Moulder join", k: "recruit", u: "vanessa", d: "Automatically at the end of the chapter." },
        { t: "5,000G", k: "event", d: "Automatic at end of chapter." }
      ] },
    { id: "c2", modes: ["eirika", "ephraim"], num: "2", title: "The Protected", gaiden: false,
      obj: "Rout the enemy", deploy: "Eirika, Seth, Franz, Gilliam, Vanessa, Moulder.",
      brief: "Ross and Garcia are NPCs. Talk to them or keep both alive.",
      items: [
        { t: "Ross joins", k: "recruit", u: "ross", d: "NPC; talk with Eirika, or keep him and Garcia alive." },
        { t: "Garcia joins", k: "recruit", u: "garcia", d: "NPC; talk with Ross, or keep both alive." },
        { t: "Red Gem", k: "village", d: "North-western village." },
        { t: "Elixir", k: "village", d: "North-eastern village." },
        { t: "Pure Water", k: "village", d: "Southern village." }
      ] },
    { id: "c3", modes: ["eirika", "ephraim"], num: "3", title: "The Bandits of Borgo", gaiden: false,
      obj: "Seize the throne", deploy: "Bring Colm's talker (Neimi) and a chest opener.",
      brief: "Neimi joins at start. Colm is an NPC — talk with Neimi or keep both alive.",
      items: [
        { t: "Neimi joins", k: "recruit", u: "neimi", d: "Automatically at start." },
        { t: "Colm joins", k: "recruit", u: "colm", d: "NPC; talk with Neimi, or keep both alive." },
        { t: "Javelin", k: "chest", d: "Southern chest." },
        { t: "Iron Lance", k: "chest", d: "Northern left chest." },
        { t: "Hand Axe", k: "chest", d: "Northern middle chest." },
        { t: "Iron Sword", k: "chest", d: "Northern right chest." }
      ] },
    { id: "c4", modes: ["eirika", "ephraim"], num: "4", title: "Ancient Horrors", gaiden: false,
      obj: "Rout the enemy", deploy: "Artur and Lute join here.",
      brief: "Lute is in the south-west village (or joins at the end).",
      items: [
        { t: "Artur joins", k: "recruit", u: "artur", d: "Automatically at start." },
        { t: "Lute joins", k: "recruit", u: "lute", d: "Visit the south-west village, or finish the chapter." },
        { t: "Iron Axe", k: "village", d: "Northern village." }
      ] },
    { id: "c5", modes: ["eirika", "ephraim"], num: "5", title: "The Empire's Reach", gaiden: false,
      obj: "Defeat Saar", deploy: "Natasha talks to Joshua.",
      brief: "Visit every village for the Guiding Ring. Joshua needs Natasha.",
      side: { id: "c5x", title: "5x Unbroken Heart", req: "Automatic after this chapter." },
      items: [
        { t: "Natasha joins", k: "recruit", u: "natasha", d: "Automatically at start." },
        { t: "Joshua joins", k: "recruit", u: "joshua", d: "Enemy; talk with Natasha." },
        { t: "Dragonshield", k: "village", d: "Southernmost village." },
        { t: "Armorslayer", k: "village", d: "East-central village." },
        { t: "Secret Book", k: "village", d: "West-central village." },
        { t: "Torch", k: "village", d: "Northernmost village." },
        { t: "Guiding Ring", k: "event", d: "End of chapter if every village was visited." }
      ] },
    { id: "c5x", modes: ["eirika", "ephraim"], num: "5x", title: "Unbroken Heart", gaiden: true, mandatory: true,
      base: "c5", req: "Automatic after Chapter 5.", obj: "Seize the throne", deploy: "Ephraim's group only.",
      brief: "You control Ephraim, Forde, Kyle and Orson. Two chests.",
      items: [
        { t: "Ephraim, Forde, Kyle and Orson join", k: "recruit", u: "ephraim", d: "Automatically at start." },
        { t: "Elixir", k: "chest", d: "Left chest." },
        { t: "Killer Lance", k: "chest", d: "Right chest." }
      ] },
    { id: "c6", modes: ["eirika", "ephraim"], num: "6", title: "Victims of War", gaiden: false,
      obj: "Defeat Novala", deploy: "Fast units to save the civilians.",
      brief: "Keep every civilian alive for an Orion's Bolt.",
      items: [
        { t: "Antitoxin", k: "village", d: "Village." },
        { t: "Orion's Bolt", k: "event", d: "End of chapter if all civilians survived." }
      ],
      warnings: ["Civilian deaths cost you the Orion's Bolt."] },
    { id: "c7", modes: ["eirika", "ephraim"], num: "7", title: "Waterside Renvall", gaiden: false,
      obj: "Seize the gate", deploy: "Thief for the Energy Ring steal.",
      brief: "Knight Crest drops from Murray. Energy Ring can be stolen.",
      items: [
        { t: "Knight Crest", k: "drop", d: "Dropped by Murray." },
        { t: "Energy Ring", k: "drop", d: "Steal from an enemy Mage." }
      ] },
    { id: "c8", modes: ["eirika", "ephraim"], num: "8", title: "It's a Trap!", gaiden: false,
      obj: "Seize the throne", deploy: "Chest opener essential — three chests.",
      brief: "Three chests. After this chapter you choose Eirika or Ephraim's route.",
      items: [
        { t: "Angelic Robe", k: "chest", d: "Lone eastern chest." },
        { t: "Silver Sword", k: "chest", d: "Left western chest." },
        { t: "Elysian Whip", k: "chest", d: "Right western chest." }
      ],
      warnings: ["Three chests and only one Thief — plan your route through the map."] },

    /* ---- Eirika route ---- */
    { id: "c9a", modes: ["eirika"], num: "9A", title: "Distant Blade", gaiden: false,
      obj: "Rout the enemy", deploy: "Franz or Eirika for Amelia; visit both villages.",
      brief: "Tana joins. Amelia can be recruited, and leaves on turn 12 if ignored.",
      items: [
        { t: "Tana joins", k: "recruit", u: "tana", d: "Automatically at start." },
        { t: "Amelia joins", k: "recruit", u: "amelia", d: "Enemy; talk with Franz or Eirika." },
        { t: "Dragonshield", k: "village", d: "Western village." },
        { t: "Rapier", k: "village", d: "Eastern village." },
        { t: "Angelic Robe", k: "event", d: "End of chapter if every village was visited." },
        { t: "Speedwing", k: "drop", d: "Steal from Amelia, or recruit her." },
        { t: "Ocean Seal", k: "drop", d: "Dropped by an enemy Pirate." }
      ] },
    { id: "c10a", modes: ["eirika"], num: "10A", title: "Revolt at Carcino", gaiden: false,
      obj: "Seize the gate", deploy: "Innes must be kept alive; Gerik and Tethys are linked.",
      brief: "Innes, Gerik and Tethys join; Marisa needs Gerik.",
      items: [
        { t: "Innes joins", k: "recruit", u: "innes", d: "NPC; talk with Tana or Eirika, or keep him alive." },
        { t: "Gerik joins", k: "recruit", u: "gerik", d: "NPC; talk with Innes or Tethys, or keep him alive." },
        { t: "Tethys joins", k: "recruit", u: "tethys", d: "NPC; talk with Gerik or Innes, or keep her alive." },
        { t: "Marisa joins", k: "recruit", u: "marisa", d: "Enemy; talk with Gerik." },
        { t: "Guiding Ring", k: "drop", d: "Dropped by Pablo." }
      ],
      warnings: ["If Tethys dies, Gerik leaves. If Gerik dies, Tethys leaves."] },
    { id: "c11a", modes: ["eirika"], num: "11A", title: "Creeping Darkness", gaiden: false,
      obj: "Rout the enemy", deploy: "L'Arachel and Dozla must survive to join.",
      brief: "Three chests. Recruit L'Arachel and Dozla.",
      items: [
        { t: "L'Arachel joins", k: "recruit", u: "larachel", d: "NPC; talk with Eirika, or keep her alive." },
        { t: "Dozla joins", k: "recruit", u: "dozla", d: "NPC; talk with L'Arachel, or keep him alive." },
        { t: "Secret Book", k: "chest", d: "Eastern chest." },
        { t: "Short Spear", k: "chest", d: "Centre chest." },
        { t: "Restore", k: "chest", d: "Western chest." }
      ] },
    { id: "c12a", modes: ["eirika"], num: "12A", title: "Village of Silence", gaiden: false,
      obj: "Rout the enemy", deploy: "Saleh joins; Ewan is in the north-west village.",
      brief: "Barrier in the northern village. Ewan joins from the village or at the end.",
      items: [
        { t: "Saleh joins", k: "recruit", u: "saleh", d: "Automatically at start." },
        { t: "Ewan joins", k: "recruit", u: "ewan", d: "Visit the north-west village, or finish the chapter." },
        { t: "Barrier", k: "village", d: "Northern village." }
      ] },
    { id: "c13a", modes: ["eirika"], num: "13A", title: "Hamill Canyon", gaiden: false,
      obj: "Survive 11 turns or defeat Aias", deploy: "Eirika talks to Cormag.",
      brief: "Cormag appears on turn 5. Amelia can be recruited here if missed.",
      items: [
        { t: "Cormag joins", k: "recruit", u: "cormag", d: "Enemy on turn 5; talk with Eirika." },
        { t: "Amelia joins (if missed)", k: "recruit", u: "amelia", d: "Enemy; talk with Franz or Eirika." },
        { t: "Knight Crest", k: "drop", d: "Dropped by Aias." },
        { t: "Body Ring", k: "drop", d: "Steal from an enemy Brigand." },
        { t: "Elysian Whip", k: "drop", d: "Dropped by Cormag, or recruit him." },
        { t: "5,000G", k: "event", d: "Automatic at end of chapter." }
      ] },
    { id: "c14a", modes: ["eirika"], num: "14A", title: "Queen of White Dunes", gaiden: false,
      obj: "Seize the throne", deploy: "L'Arachel talks to Rennac for free.",
      brief: "Rennac carries the Member Card. Recruit him with L'Arachel to save 9,980G. Secret shop.",
      items: [
        { t: "Rennac joins", k: "recruit", u: "rennac", d: "Enemy; talk with L'Arachel (free) or Eirika (costs 9,980G)." },
        { t: "Member Card", k: "drop", d: "Steal from Rennac, or recruit him." },
        { t: "Energy Ring", k: "chest", d: "Right chest in the southern room." },
        { t: "Dragonspear", k: "chest", d: "Left chest in the southern room." },
        { t: "Guiding Ring", k: "chest", d: "Lone chest in the south-eastern room." },
        { t: "Spear", k: "chest", d: "Lower chest in the north-eastern room." },
        { t: "Hammerne", k: "chest", d: "Upper chest in the north-eastern room." },
        { t: "10,000G", k: "chest", d: "Lone chest in the western room (Western version)." },
        { t: "Audhulma and Excalibur", k: "event", d: "Automatic at end of chapter." },
        { t: "Secret shop", k: "shop", d: "Needs the Member Card." }
      ] },

    /* ---- Ephraim route ---- */
    { id: "c9b", modes: ["ephraim"], num: "9B", title: "Fort Rigwald", gaiden: false,
      obj: "Seize the throne", deploy: "Three chests; Amelia can be recruited.",
      brief: "Gheb drops a Killer Axe. Three chests in the fort.",
      items: [
        { t: "Tana joins", k: "recruit", u: "tana", d: "Automatically at start." },
        { t: "Amelia joins", k: "recruit", u: "amelia", d: "Enemy; talk with Franz or Ephraim." },
        { t: "Restore", k: "chest", d: "Left chest." },
        { t: "2,500G", k: "chest", d: "Middle chest." },
        { t: "Ocean Seal", k: "chest", d: "Right chest." },
        { t: "Killer Axe", k: "drop", d: "Dropped by Gheb." },
        { t: "Speedwing", k: "drop", d: "Steal from Amelia, or recruit her." }
      ] },
    { id: "c10b", modes: ["ephraim"], num: "10B", title: "Turning Traitor", gaiden: false,
      obj: "Protect Duessel for 10 turns, or defeat Beran", deploy: "Ephraim talks to Cormag.",
      brief: "Duessel must survive. Cormag defects if talked to.",
      items: [
        { t: "Duessel joins", k: "recruit", u: "duessel", d: "NPC; talk with Ephraim, or keep him alive." },
        { t: "Cormag joins", k: "recruit", u: "cormag", d: "Enemy; talk with Duessel or Tana." },
        { t: "Hero Crest", k: "village", d: "Southern village." },
        { t: "Elysian Whip", k: "drop", d: "Dropped by Cormag, or recruit him." },
        { t: "Knight Crest", k: "event", d: "End of chapter if all NPCs survived." }
      ],
      warnings: ["Duessel dying is a defeat condition."] },
    { id: "c11b", modes: ["ephraim"], num: "11B", title: "Phantom Ship", gaiden: false,
      obj: "Rout the enemy", deploy: "L'Arachel and Dozla appear on turn 5.",
      brief: "Short Spear from the boss. Recruit L'Arachel and Dozla.",
      items: [
        { t: "L'Arachel joins", k: "recruit", u: "larachel", d: "NPC on turn 5; talk with Ephraim, or keep her alive." },
        { t: "Dozla joins", k: "recruit", u: "dozla", d: "NPC on turn 5; talk with L'Arachel, or keep him alive." },
        { t: "Short Spear", k: "drop", d: "Dropped by the boss Deathgoyle." }
      ] },
    { id: "c12b", modes: ["ephraim"], num: "12B", title: "Landing at Taizel", gaiden: false,
      obj: "Defeat the monster boss", deploy: "Ewan is in the far north house; Marisa needs Ewan.",
      brief: "Marisa defects if Ewan talks to her, or if both survive.",
      items: [
        { t: "Ewan joins", k: "recruit", u: "ewan", d: "Visit the house to the far north." },
        { t: "Marisa joins", k: "recruit", u: "marisa", d: "Enemy; talk with Ewan, or keep both alive." },
        { t: "Elfire", k: "drop", d: "Dropped by an enemy Mage." },
        { t: "Guiding Ring", k: "drop", d: "Dropped by an enemy Shaman." },
        { t: "Elixir", k: "drop", d: "Steal from Marisa, or recruit her." }
      ] },
    { id: "c13b", modes: ["ephraim"], num: "13B", title: "Fluorspar's Oath", gaiden: false,
      obj: "Rout the enemy", deploy: "Two villages; Gerik and Tethys join at start.",
      brief: "Barrier and Talisman from the villages.",
      items: [
        { t: "Gerik joins", k: "recruit", u: "gerik", d: "Automatically at start." },
        { t: "Tethys joins", k: "recruit", u: "tethys", d: "Automatically at start." },
        { t: "Barrier", k: "village", d: "Western village." },
        { t: "Talisman", k: "village", d: "Eastern village." },
        { t: "Energy Ring", k: "drop", d: "Dropped by an enemy Troubadour." },
        { t: "Dragonspear", k: "drop", d: "Dropped by an enemy Cavalier." }
      ] },
    { id: "c14b", modes: ["ephraim"], num: "14B", title: "Father and Son", gaiden: false,
      obj: "Seize the throne", deploy: "L'Arachel talks to Rennac for free.",
      brief: "Rennac carries the Member Card. Five chests and two sacred weapons.",
      items: [
        { t: "Rennac joins", k: "recruit", u: "rennac", d: "Enemy; talk with L'Arachel (free) or Ephraim (costs 9,980G)." },
        { t: "Member Card", k: "drop", d: "Steal from Rennac, or recruit him." },
        { t: "Guiding Ring", k: "chest", d: "Left chest in the southern room." },
        { t: "10,000G", k: "chest", d: "Middle chest in the southern room." },
        { t: "Hammerne", k: "chest", d: "Right chest in the southern room." },
        { t: "Spear", k: "chest", d: "North-eastern chest." },
        { t: "Angelic Robe", k: "chest", d: "North-western chest." },
        { t: "Knight Crest", k: "drop", d: "Dropped by Vigarde." },
        { t: "Gleipnir and Garm", k: "event", d: "Automatic at end of chapter." }
      ] },

    /* ---- Shared post-split ---- */
    { id: "c15", modes: ["eirika", "ephraim"], num: "15", title: "Scorched Sand", gaiden: false,
      obj: "Rout the enemy", deploy: "Thief for the desert items; both lords return.",
      brief: "Nine hidden items in the sand. Fili Shield and Hoplon Guard drop from the bosses.",
      items: [
        { t: "Ephraim, Duessel and Knoll join", k: "recruit", u: "ephraim", d: "Eirika route: automatically on turn 1." },
        { t: "Eirika, Saleh and Innes join", k: "recruit", u: "eirika", d: "Ephraim route: automatically on turn 1." },
        { t: "Fili Shield", k: "drop", d: "Dropped by Valter." },
        { t: "Hoplon Guard", k: "drop", d: "Dropped by Caellach." },
        { t: "Master Seal", k: "village", d: "Village." },
        { t: "Warp", k: "item", d: "Hidden in the sand." },
        { t: "Silence", k: "item", d: "Hidden in the sand." },
        { t: "Silver Card", k: "item", d: "Hidden in the sand." },
        { t: "Body Ring", k: "item", d: "Hidden in the sand." },
        { t: "Wyrmslayer", k: "item", d: "Hidden in the sand." },
        { t: "Killer Bow", k: "item", d: "Hidden in the sand." },
        { t: "Swiftsole", k: "item", d: "Hidden in the sand." },
        { t: "Metis's Tome", k: "item", d: "Hidden in the sand." },
        { t: "Eclipse", k: "item", d: "Hidden in the sand." }
      ] },
    { id: "c16", modes: ["eirika", "ephraim"], num: "16", title: "Ruled by Madness", gaiden: false,
      obj: "Seize the throne", deploy: "Myrrh joins; four chests.",
      brief: "Myrrh joins from the preparations screen. Sieglinde and Siegmund at the end.",
      items: [
        { t: "Myrrh joins", k: "recruit", u: "myrrh", d: "From the character select screen once the chapter begins." },
        { t: "Tomahawk", k: "chest", d: "Lone western chest." },
        { t: "5,000G", k: "chest", d: "Bottom eastern chest." },
        { t: "Knight Crest", k: "chest", d: "Middle eastern chest." },
        { t: "Talisman", k: "chest", d: "Upper eastern chest." },
        { t: "Hero Crest", k: "drop", d: "Dropped by an enemy Hero (Eirika) or Warrior (Ephraim)." },
        { t: "Sieglinde and Siegmund", k: "event", d: "Automatic at end of chapter." },
        { t: "Lunar Brace", k: "event", d: "Automatic at end of chapter." }
      ] },
    { id: "c17", modes: ["eirika", "ephraim"], num: "17", title: "River of Regrets", gaiden: false,
      obj: "Defeat Lyon", deploy: "Talk to Syrene with Tana, Vanessa or Innes.",
      brief: "Syrene joins. Rescue staff if she and all civilians survive.",
      items: [
        { t: "Syrene joins", k: "recruit", u: "syrene", d: "NPC; talk with Tana, Vanessa or Innes, or keep her alive." },
        { t: "Rescue", k: "event", d: "End of chapter if Syrene was recruited and all civilians survived." },
        { t: "Brave Axe", k: "drop", d: "Dropped by an enemy Hero." },
        { t: "Guiding Ring", k: "drop", d: "Dropped by an enemy Mage." },
        { t: "Fimbulvetr", k: "drop", d: "Dropped by an enemy Sage." },
        { t: "Nidhogg and Vidofnir", k: "event", d: "Automatic at end of chapter." }
      ] },
    { id: "c18", modes: ["eirika", "ephraim"], num: "18", title: "Two Faces of Evil", gaiden: false,
      obj: "Rout the enemy", deploy: "Monster map; bring sacred weapons.",
      brief: "No chests or villages. Just clear the map.",
      items: [] },
    { id: "c19", modes: ["eirika", "ephraim"], num: "19", title: "Last Hope", gaiden: false,
      obj: "Protect Mansel for 13 turns, or defeat Riev", deploy: "Six NPCs must survive for the Light Brand.",
      brief: "Five chests. Secret shop. Ivaldi and Latona at the end.",
      items: [
        { t: "Runesword", k: "chest", d: "Left chest in the western room." },
        { t: "Speedwing", k: "chest", d: "Middle chest in the western room." },
        { t: "Fenrir", k: "chest", d: "Right chest in the western room." },
        { t: "Bolting", k: "chest", d: "Bottom chest in the eastern room." },
        { t: "5,000G", k: "chest", d: "Middle chest in the eastern room." },
        { t: "Fortify", k: "chest", d: "Upper chest in the eastern room." },
        { t: "Aura", k: "drop", d: "Dropped by Riev." },
        { t: "Light Brand", k: "event", d: "End of chapter if six NPC units survive." },
        { t: "Ivaldi and Latona", k: "event", d: "Automatic at end of chapter." },
        { t: "Secret shop", k: "shop", d: "Needs the Member Card." }
      ],
      warnings: ["Mansel dying is a defeat condition."] },
    { id: "c20", modes: ["eirika", "ephraim"], num: "20", title: "Darkling Woods", gaiden: false,
      obj: "Seize the gate", deploy: "Long monster map; bring ranged and healing.",
      brief: "Lots of drops, no chests. Morva and Riev are the bosses.",
      items: [
        { t: "Killing Edge", k: "drop", d: "Dropped by an enemy Wight." },
        { t: "Swordslayer", k: "drop", d: "Dropped by an enemy Maelduin." },
        { t: "Spear", k: "drop", d: "Dropped by an enemy Wight." },
        { t: "Elixir", k: "drop", d: "Dropped by an enemy Maelduin." }
      ] },
    { id: "f1", modes: ["eirika", "ephraim"], num: "Final", title: "Sacred Stone (part 1)", gaiden: false,
      obj: "Defeat Lyon", deploy: "Final party; two chests.",
      brief: "Lyon first. Two chests before you finish him.",
      items: [
        { t: "Master Seal", k: "chest", d: "Western chest." },
        { t: "Angelic Robe", k: "chest", d: "Eastern chest." }
      ],
      warnings: ["Defeating Lyon ends the chapter — loot the chests first."] },
    { id: "f2", modes: ["eirika", "ephraim"], num: "Final", title: "Sacred Stone (part 2)", gaiden: false,
      obj: "Defeat Fomortiis", deploy: "Whatever survived part 1.",
      brief: "Fomortiis. Use the sacred weapons and Myrrh.",
      items: [] }
  ],

  dungeons: [
    { id: "t1", title: "Tower of Valni — Floor 1", dungeon: true, modes: ["eirika", "ephraim"], num: "T1", obj: "Clear all enemies", brief: "Unlocked after Chapter 8. Basic monster floor.", items: [] },
    { id: "t2", title: "Tower of Valni — Floor 2", dungeon: true, modes: ["eirika", "ephraim"], num: "T2", obj: "Clear all enemies", brief: "Unlocked after Chapter 9A/9B.", items: [] },
    { id: "t3", title: "Tower of Valni — Floor 3", dungeon: true, modes: ["eirika", "ephraim"], num: "T3", obj: "Clear all enemies", brief: "Clearing this unlocks Caellach in the Creature Campaign.", items: [{ t: "Caellach (Creature Campaign)", k: "event", d: "Unlocked by clearing this floor after beating the game." }] },
    { id: "t4", title: "Tower of Valni — Floor 4", dungeon: true, modes: ["eirika", "ephraim"], num: "T4", obj: "Clear all enemies", brief: "Chests with D-level items and gold.", items: [] },
    { id: "t5", title: "Tower of Valni — Floor 5", dungeon: true, modes: ["eirika", "ephraim"], num: "T5", obj: "Clear all enemies", brief: "Higher chest quality; good early grinding.", items: [] },
    { id: "t6", title: "Tower of Valni — Floor 6", dungeon: true, modes: ["eirika", "ephraim"], num: "T6", obj: "Clear all enemies", brief: "Clearing this unlocks Orson.", items: [{ t: "Orson (Creature Campaign)", k: "event", d: "Unlocked by clearing this floor after beating the game." }] },
    { id: "t7", title: "Tower of Valni — Floor 7", dungeon: true, modes: ["eirika", "ephraim"], num: "T7", obj: "Clear all enemies", brief: "Unlocked after Chapter 15. Boss can drop a stat booster.", items: [] },
    { id: "t8", title: "Tower of Valni — Floor 8", dungeon: true, modes: ["eirika", "ephraim"], num: "T8", obj: "Clear all enemies", brief: "Final floor. Clearing it unlocks Ismaire; three clears unlock Selena.", items: [
      { t: "Ismaire (Creature Campaign)", k: "event", d: "Clear the tower once." },
      { t: "Selena (Creature Campaign)", k: "event", d: "Clear the tower three times." },
      { t: "Master Seal / stat booster", k: "drop", d: "Chance drop from the Cyclops boss." }
    ] },
    { id: "l1", title: "Lagdou Ruins — Floor 1", dungeon: true, modes: ["eirika", "ephraim"], num: "L1", obj: "Clear all enemies", brief: "Unlocked after Chapter 19. Ten floors, no saving between them.", items: [] },
    { id: "l2", title: "Lagdou Ruins — Floor 2", dungeon: true, modes: ["eirika", "ephraim"], num: "L2", obj: "Clear all enemies", brief: "Chests with D-level items and gold.", items: [] },
    { id: "l3", title: "Lagdou Ruins — Floor 3", dungeon: true, modes: ["eirika", "ephraim"], num: "L3", obj: "Clear all enemies", brief: "Monster density rises; bring Sacred weapons.", items: [] },
    { id: "l4", title: "Lagdou Ruins — Floor 4", dungeon: true, modes: ["eirika", "ephraim"], num: "L4", obj: "Clear all enemies", brief: "Stat booster drops become common.", items: [] },
    { id: "l5", title: "Lagdou Ruins — Floor 5", dungeon: true, modes: ["eirika", "ephraim"], num: "L5", obj: "Clear all enemies", brief: "Clearing this unlocks Glen.", items: [{ t: "Glen (Creature Campaign)", k: "event", d: "Unlocked by clearing this floor after beating the game." }] },
    { id: "l6", title: "Lagdou Ruins — Floor 6", dungeon: true, modes: ["eirika", "ephraim"], num: "L6", obj: "Clear all enemies", brief: "Defeat 200+ enemies in one run for Hayden.", items: [{ t: "Hayden (Creature Campaign)", k: "event", d: "Defeat 200+ enemies in a single ruins run." }] },
    { id: "l7", title: "Lagdou Ruins — Floor 7", dungeon: true, modes: ["eirika", "ephraim"], num: "L7", obj: "Clear all enemies", brief: "Clearing this unlocks Valter.", items: [{ t: "Valter (Creature Campaign)", k: "event", d: "Unlocked by clearing this floor after beating the game." }] },
    { id: "l8", title: "Lagdou Ruins — Floor 8", dungeon: true, modes: ["eirika", "ephraim"], num: "L8", obj: "Clear all enemies", brief: "Late-floor monsters; Master Seals can drop.", items: [] },
    { id: "l9", title: "Lagdou Ruins — Floor 9", dungeon: true, modes: ["eirika", "ephraim"], num: "L9", obj: "Clear all enemies", brief: "One floor from the end; heal before descending.", items: [] },
    { id: "l10", title: "Lagdou Ruins — Floor 10", dungeon: true, modes: ["eirika", "ephraim"], num: "L10", obj: "Clear all enemies", brief: "Final floor. Clearing it unlocks Fado; three clears unlock Lyon.", items: [
      { t: "Fado (Creature Campaign)", k: "event", d: "Clear the ruins once." },
      { t: "Lyon (Creature Campaign)", k: "event", d: "Clear the ruins three times." }
    ] }
  ],

  units: [
    { id: "eirika", name: "Eirika", cls: "Lord → Great Lord", tier: "A", join: "Prologue", aff: "Light", promos: ["Great Lord (Solar Brace)"], note: "Fast, accurate, fragile. Mandatory.", build: "Sieglinde late. Rapier for armour. Solar Brace at level 10+." },
    { id: "ephraim", name: "Ephraim", cls: "Lord → Great Lord", tier: "A", join: "Ch.5x / 8", aff: "Fire", promos: ["Great Lord (Lunar Brace)"], note: "High strength and defence; the better combat lord.", build: "Siegmund late. Reginleif for armour. Lunar Brace at level 10+." },
    { id: "seth", name: "Seth", cls: "Paladin", tier: "S", join: "Prologue", aff: "Anima", promos: [], note: "Pre-promoted and carries the whole game.", build: "Silver Lance, Javelin, Iron Sword. Never bench him." },
    { id: "franz", name: "Franz", cls: "Cavalier → Paladin / Great Knight", tier: "S", join: "Ch.1", aff: "Light", promos: ["Paladin", "Great Knight"], note: "Best growth unit in the game.", build: "Knight Crest. Paladin for speed, Great Knight for axes." },
    { id: "gilliam", name: "Gilliam", cls: "Knight → General / Great Knight", tier: "A", join: "Ch.1", aff: "Thunder", promos: ["General", "Great Knight"], note: "Armour wall; slow.", build: "Knight Crest. General for defence, Great Knight for mobility." },
    { id: "vanessa", name: "Vanessa", cls: "Pegasus Knight → Falcon Knight / Wyvern Knight", tier: "S", join: "Ch.1", aff: "Anima", promos: ["Falcon Knight", "Wyvern Knight"], note: "Best flier; carries maps.", build: "Elysian Whip. Slim Lance, Javelin. Angelic Robe if fragile." },
    { id: "moulder", name: "Moulder", cls: "Priest → Bishop / Sage", tier: "A", join: "Ch.1", aff: "Anima", promos: ["Bishop", "Sage"], note: "Your first healer; sturdy for a priest.", build: "Guiding Ring. Mend, Physic, Barrier." },
    { id: "ross", name: "Ross", cls: "Journeyman → Fighter → Warrior / Hero", tier: "B", join: "Ch.2", aff: "Fire", promos: ["Warrior", "Hero"], note: "Trainee: promotes twice. Slow start, strong finish.", build: "Trainee seal at 10, then Hero Crest. Ocean Seal route needs a Pirate." },
    { id: "garcia", name: "Garcia", cls: "Fighter → Warrior / Hero", tier: "B", join: "Ch.2", aff: "Fire", promos: ["Warrior", "Hero"], note: "Hits hard, low speed.", build: "Hero Crest. Iron Axe, Hand Axe." },
    { id: "neimi", name: "Neimi", cls: "Archer → Sniper / Ranger", tier: "B", join: "Ch.3", aff: "Fire", promos: ["Sniper", "Ranger"], note: "Fragile archer; supports Colm.", build: "Orion's Bolt. Killer Bow." },
    { id: "colm", name: "Colm", cls: "Thief → Rogue / Assassin", tier: "B", join: "Ch.3", aff: "Light", promos: ["Rogue", "Assassin"], note: "Chests and steals; combat is a bonus.", build: "Ocean Seal. Lockpick is his job." },
    { id: "artur", name: "Artur", cls: "Monk → Bishop / Sage", tier: "A", join: "Ch.4", aff: "Ice", promos: ["Bishop", "Sage"], note: "High magic, good staff access.", build: "Guiding Ring. Lightning, Shine, Physic." },
    { id: "lute", name: "Lute", cls: "Mage → Sage / Mage Knight", tier: "A", join: "Ch.4", aff: "Anima", promos: ["Sage", "Mage Knight"], note: "Best raw magic growth in the game.", build: "Guiding Ring. Fire, Thunder, Elfire." },
    { id: "natasha", name: "Natasha", cls: "Cleric → Bishop / Valkyrie", tier: "A", join: "Ch.5", aff: "Ice", promos: ["Bishop", "Valkyrie"], note: "Recruits Joshua; solid healer.", build: "Guiding Ring. Mend, Physic, Restore." },
    { id: "joshua", name: "Joshua", cls: "Myrmidon → Swordmaster / Assassin", tier: "A", join: "Ch.5", aff: "Wind", promos: ["Swordmaster", "Assassin"], note: "Fast, high crit, low defence.", build: "Hero Crest. Killing Edge." },
    { id: "forde", name: "Forde", cls: "Cavalier → Paladin / Great Knight", tier: "A", join: "Ch.5x / 8", aff: "Wind", promos: ["Paladin", "Great Knight"], note: "Balanced cavalier; good resist.", build: "Knight Crest. Iron Lance, Javelin." },
    { id: "kyle", name: "Kyle", cls: "Cavalier → Paladin / Great Knight", tier: "A", join: "Ch.5x / 8", aff: "Ice", promos: ["Paladin", "Great Knight"], note: "Strong, slower than Forde.", build: "Knight Crest. Steel Lance, Javelin." },
    { id: "tana", name: "Tana", cls: "Pegasus Knight → Falcon Knight / Wyvern Knight", tier: "S", join: "Ch.9", aff: "Wind", promos: ["Falcon Knight", "Wyvern Knight"], note: "Second excellent flier.", build: "Elysian Whip. Slim Lance, Javelin." },
    { id: "amelia", name: "Amelia", cls: "Recruit → Knight → General / Great Knight", tier: "B", join: "Ch.9A / 9B / 13A", aff: "Thunder", promos: ["General", "Great Knight"], note: "Trainee: promotes twice. Joins late but grows fast.", build: "Trainee seal, then Knight Crest. General for defence." },
    { id: "innes", name: "Innes", cls: "Sniper", tier: "A", join: "Ch.10A / 15", aff: "Ice", promos: [], note: "Accurate pre-promoted archer.", build: "Silver Bow, Killer Bow." },
    { id: "gerik", name: "Gerik", cls: "Mercenary → Hero / Ranger", tier: "S", join: "Ch.10A / 13B", aff: "Thunder", promos: ["Hero", "Ranger"], note: "Best mercenary in the game.", build: "Hero Crest. Killing Edge, Iron Blade." },
    { id: "tethys", name: "Tethys", cls: "Dancer", tier: "S", join: "Ch.10A / 13B", aff: "Fire", promos: [], note: "Refresh is a free turn every turn.", build: "Boots. Keep her behind the line." },
    { id: "marisa", name: "Marisa", cls: "Myrmidon → Swordmaster / Assassin", tier: "A", join: "Ch.10A / 12B", aff: "Ice", promos: ["Swordmaster", "Assassin"], note: "Fast swordfighter; joins late.", build: "Hero Crest. Killing Edge." },
    { id: "larachel", name: "L'Arachel", cls: "Troubadour → Valkyrie / Mage Knight", tier: "A", join: "Ch.11A / 11B", aff: "Light", promos: ["Valkyrie", "Mage Knight"], note: "Mounted healer; recruits Rennac for free.", build: "Guiding Ring. Mend, Physic, Barrier." },
    { id: "dozla", name: "Dozla", cls: "Berserker", tier: "B", join: "Ch.11A / 11B", aff: "Thunder", promos: [], note: "Pre-promoted berserker; huge damage.", build: "Killer Axe, Iron Axe." },
    { id: "saleh", name: "Saleh", cls: "Sage", tier: "S", join: "Ch.12A / 15", aff: "Wind", promos: [], note: "Pre-promoted with great staff access.", build: "Elfire, Physic, Barrier. Warp if you have it." },
    { id: "ewan", name: "Ewan", cls: "Pupil → Mage → Sage / Mage Knight", tier: "B", join: "Ch.12A / 12B", aff: "Light", promos: ["Sage", "Mage Knight"], note: "Trainee: promotes twice. Very late.", build: "Trainee seal, then Guiding Ring." },
    { id: "cormag", name: "Cormag", cls: "Wyvern Rider → Wyvern Lord / Wyvern Knight", tier: "S", join: "Ch.10B / 13A", aff: "Fire", promos: ["Wyvern Lord", "Wyvern Knight"], note: "Flying tank with huge strength.", build: "Elysian Whip. Iron Lance, Javelin." },
    { id: "rennac", name: "Rennac", cls: "Rogue", tier: "B", join: "Ch.14A / 14B", aff: "Dark", promos: [], note: "Thief with the Member Card; expensive to hire with Eirika.", build: "Lockpick. Talk with L'Arachel." },
    { id: "duessel", name: "Duessel", cls: "Great Knight", tier: "S", join: "Ch.10B / 15", aff: "Anima", promos: [], note: "Pre-promoted tank; carries the mid-game.", build: "Silver Axe, Javelin, Iron Lance." },
    { id: "knoll", name: "Knoll", cls: "Shaman → Druid / Summoner", tier: "A", join: "Ch.15", aff: "Dark", promos: ["Druid", "Summoner"], note: "Dark magic and staves; fragile.", build: "Guiding Ring. Flux, Luna, Nosferatu." },
    { id: "myrrh", name: "Myrrh", cls: "Manakete", tier: "S", join: "Ch.16", aff: "Wind", promos: [], note: "Flying dragon; limited dragonstone uses.", build: "Dragonstone. Keep her away from anti-dragon weapons." },
    { id: "syrene", name: "Syrene", cls: "Falcon Knight", tier: "A", join: "Ch.17", aff: "Thunder", promos: [], note: "Late pre-promoted flier; Rescue staff tied to her.", build: "Silver Lance, Javelin." },
    { id: "caellach", name: "Caellach", cls: "Hero", tier: "C", join: "Creature Campaign", aff: "Fire", promos: [], note: "Bonus unit. Tower floor 3.", build: "Silver Axe, Killing Edge." },
    { id: "orson", name: "Orson", cls: "Paladin", tier: "C", join: "Creature Campaign", aff: "Dark", promos: [], note: "Bonus unit. Tower floor 6.", build: "Silver Lance." },
    { id: "riev", name: "Riev", cls: "Bishop", tier: "C", join: "Creature Campaign", aff: "Dark", promos: [], note: "Bonus unit. 200 kills in one tower run.", build: "Aura, Fortify." },
    { id: "ismaire", name: "Ismaire", cls: "Swordmaster", tier: "C", join: "Creature Campaign", aff: "Light", promos: [], note: "Bonus unit. Clear the tower once.", build: "Killing Edge." },
    { id: "selena", name: "Selena", cls: "Mage Knight", tier: "C", join: "Creature Campaign", aff: "Ice", promos: [], note: "Bonus unit. Clear the tower three times.", build: "Bolting, Elfire." },
    { id: "glen", name: "Glen", cls: "Wyvern Lord", tier: "C", join: "Creature Campaign", aff: "Thunder", promos: [], note: "Bonus unit. Lagdou floor 5.", build: "Silver Lance, Javelin." },
    { id: "hayden", name: "Hayden", cls: "Ranger", tier: "C", join: "Creature Campaign", aff: "Wind", promos: [], note: "Bonus unit. 200 kills in one ruins run.", build: "Silver Bow, Killer Bow." },
    { id: "valter", name: "Valter", cls: "Wyvern Knight", tier: "C", join: "Creature Campaign", aff: "Fire", promos: [], note: "Bonus unit. Lagdou floor 7.", build: "Silver Lance, Killer Lance." },
    { id: "fado", name: "Fado", cls: "General", tier: "C", join: "Creature Campaign", aff: "Anima", promos: [], note: "Bonus unit. Clear the ruins once.", build: "Silver Lance, Spear." },
    { id: "lyon", name: "Lyon", cls: "Necromancer", tier: "C", join: "Creature Campaign", aff: "Dark", promos: [], note: "Bonus unit. Clear the ruins three times.", build: "Naglfar, Luna." }
  ],

  supports: [],

  exploits: [
    { name: "Enemy control glitch (Mine glitch)", cat: "glitch", risk: "Medium",
      what: "Take control of the enemy army for one turn. Trade items between enemies, disarm bosses, or walk a boss's weapon onto a weak enemy so it drops.",
      steps: [
        "Get a Mine. FE7: Ch.13 village, 16x/17x with a Caelin soldier alive, or steal one in 18x/19x, 26x/28x or 27x/29x. FE8: buy or find Mines in the Tower and late chapters.",
        "Place the Mine on a tile an enemy will walk over during the enemy phase.",
        "Let the enemy step on it. While the mine's damage effect is playing — after the flash, before the next enemy moves — soft-reset with A+B+Start+Select (or power off).",
        "Reload the save. Your turn is still active, and every red unit is now selectable.",
        "Use it to move items between enemies, trigger villages, or send a boss's weapon to a weak unit that will drop it."
      ],
      warn: "Promoting an enemy unit freezes the game in the US/EU versions. In the European version it is safe.",
      video: "https://www.youtube.com/results?search_query=fire+emblem+mine+glitch+enemy+control",
      chapters: ["l6", "whereabouts", "imprisoner", "night", "cog", "t1", "l1"] },
    { name: "Arena abuse", cat: "tactic", risk: "Low",
      what: "Infinite EXP and gold from a safe arena, as long as you can heal between rounds.",
      steps: [
        "Find an arena map — FE8 has arenas in mid-game chapters.",
        "Park a healer and a strong unit next to the arena.",
        "Bet the minimum on every round so a loss costs little.",
        "Heal between fights and repeat until the unit promotes or you run out of patience."
      ],
      warn: "Arena losses still kill the unit on classic rules. Bet low until you know the matchup.",
      video: "", chapters: ["fourfang", "c14a", "c14b"] },
    { name: "Boss abuse", cat: "tactic", risk: "Low",
      what: "Farm a boss who cannot damage your unit, using the fort or throne's healing to reset the fight.",
      steps: [
        "Find a boss on a throne or fort with low damage against one of your units.",
        "Remove your unit's weapon so it cannot kill the boss.",
        "End turn repeatedly, letting the boss attack into your defence.",
        "Heal as needed. Every round is free EXP for the unit being hit."
      ],
      warn: "Watch weapon uses and the turn count if a gaiden is still live.",
      video: "", chapters: [] },
    { name: "Support grinding", cat: "tactic", risk: "None",
      what: "Build support points without fighting by ending turns with two units adjacent.",
      steps: [
        "Pick a defensive map with no reinforcements bearing down.",
        "Park the pair adjacent on a fort or in a corner.",
        "End turn repeatedly. Points accrue every turn they stay adjacent.",
        "Repeat until the support conversation appears, then trigger it before moving on."
      ],
      warn: "Supports unlock as the story progresses; the cap is five levels per unit.",
      video: "", chapters: [] },
    { name: "Save-state RNG rigging", cat: "emulator", risk: "None",
      what: "Reroll level-ups, hits and misses by saving before the roll and reloading.",
      steps: [
        "Save state immediately before the combat or level-up.",
        "If the result is bad, load the state and repeat.",
        "For level-ups, burn a different number of RNs first (move a unit, open a menu) to change the outcome.",
        "Once you have the result you want, save again."
      ],
      warn: "This changes nothing in the game data, but it removes all tension from the run.",
      video: "", chapters: [] },
    { name: "Warp and Rescue skips", cat: "tactic", risk: "None",
      what: "Use Warp and Rescue staves to move a lord onto the throne or gate and end the map early.",
      steps: [
        "Get Warp (FE7: Ch.27 village; FE8: desert in Ch.15) and a staff user with the rank for it.",
        "Move the lord as far as possible, then Warp them the rest of the way.",
        "Seize on the same turn if the objective is a throne or gate.",
        "Rescue can pull a unit out of danger or ferry them across a wall."
      ],
      warn: "Skips cost you chests, villages and drops. Only do it after the loot is secured.",
      video: "", chapters: ["cog", "c15"] }
  ],

  strategy: {
    route: [
      "Recruit Ross and Garcia in Ch.2, Colm with Neimi in Ch.3, and Joshua with Natasha in Ch.5.",
      "Visit every village in Ch.5 — the Guiding Ring is the reward for all four.",
      "5x is mandatory. You control Ephraim's group; chests hold an Elixir and a Killer Lance.",
      "Keep every civilian alive in Ch.6 for the Orion's Bolt.",
      "Before Ch.8, decide your route: Eirika gets Innes, Gerik and Tethys early; Ephraim gets Duessel and Cormag early.",
      "Recruit Rennac with L'Arachel, never Eirika — she pays 9,980G for the Member Card.",
      "In Ch.15, dig every sand tile: Warp, Silver Card, Swiftsole and Metis's Tome are all buried there.",
      "Recruit Syrene in Ch.17 and keep all civilians alive for the Rescue staff.",
      "Beat the game, then use the Tower of Valni and Lagdou Ruins to unlock the ten Creature Campaign units."
    ],
    tiers: {
      S: ["Seth", "Franz", "Vanessa", "Tana", "Gerik", "Cormag", "Saleh", "Duessel", "Tethys", "Myrrh"],
      A: ["Eirika", "Ephraim", "Gilliam", "Moulder", "Artur", "Lute", "Natasha", "Joshua", "Forde", "Kyle", "Marisa", "L'Arachel", "Innes", "Knoll", "Syrene"],
      B: ["Ross", "Garcia", "Neimi", "Colm", "Amelia", "Ewan", "Dozla", "Rennac"],
      C: ["Caellach", "Orson", "Riev", "Ismaire", "Selena", "Glen", "Hayden", "Valter", "Fado", "Lyon"]
    },
    tiersNote: "Efficiency-first, same caveat as FE7: this is a judgment call, not a fact.",
    promotions: [
      { item: "Master Seal", units: "Any base class at level 10+", to: "Branch promotion (choose one of two classes)" },
      { item: "Guiding Ring", units: "Mage, Monk, Shaman, Cleric, Troubadour", to: "Sage, Bishop, Druid, Valkyrie, Mage Knight" },
      { item: "Hero Crest", units: "Mercenary, Myrmidon, Fighter", to: "Hero, Swordmaster, Warrior, Ranger" },
      { item: "Knight Crest", units: "Cavalier, Knight", to: "Paladin, Great Knight, General" },
      { item: "Orion's Bolt", units: "Archer, Nomad", to: "Sniper, Ranger" },
      { item: "Elysian Whip", units: "Pegasus Knight, Wyvern Rider", to: "Falcon Knight, Wyvern Lord, Wyvern Knight" },
      { item: "Ocean Seal", units: "Pirate, Thief", to: "Berserker, Rogue, Assassin" },
      { item: "Solar Brace", units: "Eirika", to: "Great Lord" },
      { item: "Lunar Brace", units: "Ephraim", to: "Great Lord" },
      { item: "Trainee seal", units: "Ross, Amelia, Ewan", to: "First promotion, then a normal class change" }
    ],
    boosters: [
      { item: "Angelic Robe", effect: "+7 HP", best: "Vanessa, Tana or another fragile flier" },
      { item: "Energy Ring", effect: "+2 Str/Mag", best: "Franz, Gilliam or Lute" },
      { item: "Secret Book", effect: "+2 Skill", best: "Garcia or a low-hit axe user" },
      { item: "Speedwings", effect: "+2 Speed", best: "Gilliam, Garcia or Duessel" },
      { item: "Goddess Icon", effect: "+2 Luck", best: "Anyone you rely on to dodge" },
      { item: "Dragonshield", effect: "+2 Def", best: "Gilliam or Duessel" },
      { item: "Talisman", effect: "+2 Res", best: "A physical unit who eats magic" },
      { item: "Swiftsole", effect: "+2 Move", best: "Tethys, or a knight you want to move" },
      { item: "Body Ring", effect: "+2 Con", best: "A fast unit using heavy weapons" },
      { item: "Metis's Tome", effect: "+5% all growths", best: "A trainee or a long-term project" }
    ],
    mechanics: [
      { h: "Branching promotion", p: "At level 10 a Master Seal offers two classes. Choose per unit; the choice is permanent. Falcon Knight is faster, Wyvern Knight is stronger and flies." },
      { h: "Trainees", p: "Ross, Amelia and Ewan promote once with a trainee seal, then again with a normal seal. Two promotions means two extra stat boosts." },
      { h: "Monsters", p: "Sacred weapons (Sieglinde, Siegmund, Audhulma, Excalibur, Garm, Gleipnir, Ivaldi, Latona, Nidhogg, Vidofnir) deal bonus damage to monsters. Myrrh's dragonstone does too." },
      { h: "Doubling", p: "Same as FE7: Attack Speed 4+ over the enemy doubles. Weight minus Constitution still matters." },
      { h: "Weapon triangle", p: "Sword > Axe > Lance > Sword, with +1 might and +15 hit for advantage." },
      { h: "Tower and Ruins", p: "You can retreat between floors but not save mid-run in the Ruins. Clear a full run for the bonus characters." },
      { h: "Skirmishes", p: "Monster encounters on the world map are repeatable, free EXP. They scale with your progress and can be used to grind supports or levels." }
    ]
  }
};
