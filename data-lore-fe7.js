/* FE7 talks, lore, bios and endings.
   Lore is written from the game's own story; talk triggers are the in-game Talk command.
   Entries marked verify:true are the ones most likely to differ by mode or version. */

window.FE7_LORE = {
  p: {
    lore: "Lyn, the last survivor of the Lorca tribe, finds a wounded tactician on the Sacae plains and defends a village from brigands. The tactician — Mark — stays at her side for the rest of her journey.",
    trivia: "The tactician's name and gender are chosen at the start, and a tactician with an A support in Lyn Mode appears in a bonus scene later."
  },
  l1: {
    lore: "Sain and Kent, knights of Caelin, are searching for their liege's granddaughter. They recognise Lyn's ring and ask her to return to Caelin with them.",
    talks: [
      { k: "event", who: "Sain → Lyn", sum: "Sain flirts outrageously; Lyn is unimpressed.", trig: "Start of chapter" }
    ]
  },
  l2: {
    lore: "In Bulgar, the mercenary Glass has stolen a shrine's sacred blade. Lyn wins back the Mani Katti — a sword that chooses its own wielder.",
    trivia: "The Mani Katti is one of the few weapons in the game that can only be used by one character."
  },
  l3: {
    lore: "The bandit Migal raids a village and captures Florina, a Pegasus knight of Ilia. Rescuing her gives Lyn her first flier.",
    talks: [
      { k: "recruit", who: "Florina → Lyn", sum: "Florina is terrified of men but trusts Lyn immediately.", trig: "Automatic at the start" }
    ]
  },
  l4: {
    lore: "Dorcas sold his sword to bandits to pay for his wife Natalie's medicine. Natalie is in the village; if she survives, Dorcas can be persuaded to leave the bandits and join Lyn.",
    talks: [
      { k: "npc", who: "Dorcas ↔ Natalie", sum: "Natalie begs Dorcas to stop fighting for the bandits and come home. He promises this is the last job.", trig: "After recruiting Dorcas, before Natalie dies or the chapter ends", miss: true }
    ],
    trivia: "Natalie dying is a defeat condition, not just a side objective — the chapter ends if she falls."
  },
  l5: {
    lore: "Caelin's border is held by Lundgren's men. Serra, a cleric of the Elimine Church, and Erk, a mage in her care, join the group.",
    talks: [
      { k: "recruit", who: "Lyn → Serra", sum: "Serra talks her way into the army.", trig: "Talk with Serra" },
      { k: "unit", who: "Serra → Erk", sum: "Serra orders Erk around; he is long-suffering.", trig: "After both join" }
    ]
  },
  l6: {
    lore: "To reach Caelin the party must cross the mountains. Rath, a Sacaean nomad, and Matthew, a thief, join.",
    talks: [
      { k: "recruit", who: "Matthew → Lyn", sum: "Matthew offers his services as a thief and a gossip.", trig: "North village or turn 3" }
    ]
  },
  l7: {
    lore: "Nils, a bard, and Lucius, a monk, are fleeing the Black Fang. The assassins pursue them, and Lyn's group is drawn into a wider conspiracy.",
    trivia: "Nils and Ninian are the only dancers in the game; only one of them is available at a time."
  },
  l7x: {
    lore: "In the Black Fang's hideout, Lyn finds evidence that the assassins are being paid from inside Caelin. The shadow behind them is Lundgren.",
    talks: [
      { k: "event", who: "Nils → Lyn", sum: "Nils explains that the Black Fang are hunting him and his sister.", trig: "Start of chapter" }
    ]
  },
  l8: {
    lore: "Lundgren's mercenaries block the pass. A Lancereaver is hidden in the village.",
    trivia: "The Lancereaver reverses the weapon triangle — it is strong against lances and weak against axes."
  },
  l9: {
    lore: "Wallace, a knight of Caelin, joins. He was disgraced for defending the wrong side and wants to redeem himself.",
    talks: [
      { k: "recruit", who: "Wallace → Lyn", sum: "Wallace pledges his lance to Lyn's cause.", trig: "Automatic at start" }
    ]
  },
  l10: {
    lore: "Lundgren has seized Caelin and poisoned Marquess Hausen. Lyn defeats him and is recognised as the marquess's granddaughter.",
    trivia: "Nils must reach level 7 by the end of this chapter to unlock Hector Mode's 19xx."
  },
  c11: {
    lore: "Eliwood, heir of Pherae, leaves home to find his missing father Elbert. Marcus, Lowen, Rebecca, Dorcas and Bartre ride with him.",
    trivia: "Eliwood Mode is the default campaign; Hector Mode unlocks after clearing it."
  },
  c11h: {
    lore: "Hector, heir of Ostia, leaves to find his friend Eliwood. Matthew reports that Eliwood has gone missing, and Hector follows.",
    trivia: "Hector's tale has extra chapters and two exclusive recruits: Farina and Karla."
  },
  c12: {
    lore: "Eliwood and Hector meet on the road and join forces against Zagan's bandits. The two lords' friendship is the spine of the campaign.",
    talks: [
      { k: "unit", who: "Hector ↔ Eliwood", sum: "The two argue about who is rescuing whom, then agree to travel together.", trig: "After both are deployed" }
    ]
  },
  c13: {
    lore: "At Castle Santaruz, Marquess Helman is dying — Ephidel of the Black Fang has already abandoned him. Helman warns that Darin of Laus knows the truth.",
    talks: [
      { k: "recruit", who: "Matthew → Guy", sum: "Matthew convinces the myrmidon Guy to switch sides.", trig: "Talk with Guy" },
      { k: "boss", who: "Eliwood/Hector → Boies", sum: "Boies boasts that the lords will never reach the castle.", trig: "Battle quote" }
    ]
  },
  c13x: {
    lore: "Merlinus, a travelling peddler, is caught between the armies. Protecting him for seven turns earns him a permanent place in the convoy.",
    trivia: "This is the only chapter where Merlinus can permanently die; afterwards he retreats instead."
  },
  c14: {
    lore: "Erik of Laus has thrown in with the Black Fang. Priscilla, a troubadour searching for her brother, joins Eliwood's group.",
    talks: [
      { k: "recruit", who: "Serra → Erk", sum: "Erk is relieved to see a familiar face.", trig: "Talk with Erk" },
      { k: "unit", who: "Priscilla → Erk", sum: "Priscilla asks Erk about her brother Raven.", trig: "After both join" }
    ]
  },
  talons: {
    lore: "Hector's group holds a throne room against Sealen's assassins. A short defensive chapter.",
    trivia: "Talons Alight only exists in Hector Mode; Eliwood Mode has Noble Lady of Caelin here instead."
  },
  noble: {
    lore: "Lyn's Caelin forces join the main army. Marquess Bauker holds the castle for Laus.",
    talks: [
      { k: "unit", who: "Lyn ↔ Eliwood", sum: "Lyn thanks Eliwood for coming to Caelin's aid.", trig: "After both are deployed" }
    ]
  },
  whereabouts: {
    lore: "Raven, a mercenary with a grudge against Ostia, and Lucius, the monk who follows him, are found in a Caelin castle. Caelin soldiers can be saved for extra rewards.",
    talks: [
      { k: "recruit", who: "Priscilla → Raven", sum: "Priscilla recognises the brother she has been searching for.", trig: "Talk with Raven" },
      { k: "recruit", who: "Raven → Lucius", sum: "Lucius refuses to leave Raven's side.", trig: "Talk with Lucius" },
      { k: "event", who: "Caelin soldiers", sum: "Each surviving soldier gives a bonus item at the end: Mine, Light Rune, Red Gem.", trig: "End of chapter", miss: true }
    ]
  },
  port: {
    lore: "At Badon, the pirate captain Fargus will ferry the army to the Dread Isle — if he is not attacked. Canas, a scholar of dark magic, is in the village.",
    talks: [
      { k: "recruit", who: "Canas → lords", sum: "Canas introduces himself and offers his dark magic.", trig: "Visit a village" },
      { k: "unit", who: "Dart → Fargus", sum: "Dart greets his old captain and vouches for the army.", trig: "Before speaking to Fargus", verify: true }
    ],
    trivia: "Attacking Fargus fails the chapter. The villages hold a Short Bow, Lancereaver, Devil Axe and Sleep."
  },
  pirate: {
    lore: "Zoldam's pirates attack the ship in fog. Survive eleven turns, or kill the boss.",
    trivia: "The Guiding Ring is the real prize here — it promotes your first mage or cleric."
  },
  dread: {
    lore: "The Dread Isle is the Black Fang's island fortress. Dart and Fiora join; Uhai holds the landing.",
    talks: [
      { k: "recruit", who: "Florina → Fiora", sum: "The two Pegasus sisters are reunited.", trig: "Fiora appears on turn 3" },
      { k: "boss", who: "Lords → Uhai", sum: "Uhai warns that the Black Fang are not the true enemy.", trig: "Battle quote" }
    ]
  },
  imprisoner: {
    lore: "Kishuna, a morph, nullifies magic around him. Aion guards the gate; the ruins hold a Goddess Icon.",
    trivia: "Kishuna cannot be killed here — he retreats. Defeating him in 19x unlocks Hector's 19xx."
  },
  glimpse: {
    lore: "Hector's group sees a vision of the Scouring — the war between humans and dragons a thousand years ago.",
    trivia: "This chapter is Hector Mode only and requires Nils at level 7 plus Kishuna defeated in 19x."
  },
  dragon: {
    lore: "The Dragon's Gate is where Nergal intends to open a way for dragons. Legault defects from the Black Fang, and the Member Card is stolen here.",
    talks: [
      { k: "recruit", who: "Lord/Lyn → Legault", sum: "Legault decides the Black Fang has rotted and changes sides.", trig: "Talk with Legault" },
      { k: "boss", who: "Lords → Darin", sum: "Darin realises he has been used by Nergal.", trig: "Battle quote" }
    ],
    trivia: "The Member Card is the most missable item in the game — it unlocks every secret shop."
  },
  newresolve: {
    lore: "The army regroups after the Dread Isle. Ninian joins, and Oleg's mercenaries hold four villages.",
    trivia: "Four villages means four items; bring mounted units or fliers."
  },
  kinship: {
    lore: "Nils is hunted by Eubans; the army must protect him for eleven turns. Heath, a wyvern rider, can be turned.",
    talks: [
      { k: "recruit", who: "Lyn → Rath", sum: "Rath returns to Lyn's side.", trig: "Talk with Rath" },
      { k: "recruit", who: "Lords/Lyn/Ninian → Heath", sum: "Heath questions his orders and defects.", trig: "Talk with Heath" }
    ]
  },
  living: {
    lore: "In the Nabata desert, Hawkeye guards a village and the hidden treasure under the sand. Recruiting him opens the way to Genesis.",
    talks: [
      { k: "recruit", who: "Main lord → Hawkeye", sum: "Hawkeye tests the lord's intentions before joining.", trig: "Hawkeye appears on turn 2" },
      { k: "event", who: "Sand tiles", sum: "Six hidden items: Hero Crest, Light Brand, Filla's Might, Eclipse, Ocean Seal, Body Ring.", trig: "Search the sand with a thief" }
    ]
  },
  genesis: {
    lore: "Kishuna reappears. Attacking him triggers reinforcements with silver weapons; the chests hold Berserk, a Secret Book and a Silver Blade.",
    trivia: "Afa's Drops are awarded at the end if Mark is present."
  },
  fourfang: {
    lore: "The Four Fangs — Lloyd, Linus, Ursula and Jerme — close in. The lords' combined level decides whether Linus or Lloyd leads the attack.",
    talks: [
      { k: "recruit", who: "Dart → Geitz", sum: "Dart talks the mercenary Geitz into joining.", trig: "Linus version only" },
      { k: "recruit", who: "Lyn/Kent/Sain/Florina/Wil → Wallace", sum: "Wallace returns to the army.", trig: "Lloyd version only" },
      { k: "boss", who: "Lords → Linus/Lloyd", sum: "The Fang commander mocks the lords' ideals.", trig: "Battle quote" }
    ]
  },
  crazed: {
    lore: "Hector's group fights Pascal's mercenaries for control of three points. Farina, a pegasus knight, will join for 20,000G.",
    talks: [
      { k: "recruit", who: "Farina → Hector", sum: "Farina negotiates her fee before joining.", trig: "Turn 5; costs 20,000G" }
    ]
  },
  unfulfilled: {
    lore: "Vaida's wyverns attack while Pent and Louise arrive. Survive eleven turns; the village holds Hammerne.",
    trivia: "If Hawkeye was not defeated earlier, the Heaven Seal arrives at the start of this chapter."
  },
  paleflower: {
    lore: "The Black Fang fortress in Bern. Kenneth or Jerme commands, and Karel or Harken can be recruited on turn ten.",
    talks: [
      { k: "recruit", who: "Main lord or Lyn → Karel", sum: "Karel joins if he is impressed by your kill count.", trig: "Turn 10; defeat 2+ promoted enemies (Kenneth) or open 4+ doors (Jerme)" },
      { k: "recruit", who: "Eliwood/Marcus/Lowen/Hector/Oswin/Isadora → Harken", sum: "Harken stands down and joins.", trig: "Turn 10; the opposite counter to Karel" }
    ]
  },
  bbd: {
    lore: "Zephiel, the boy prince of Bern, is targeted by the Black Fang. Protect him for fifteen turns and Nino can talk Jaffar into defecting.",
    talks: [
      { k: "recruit", who: "Main lord or Lyn → Nino", sum: "Nino asks the army to save Jaffar.", trig: "Talk with Nino" },
      { k: "recruit", who: "Nino → Jaffar", sum: "Jaffar lowers his blade and protects Nino.", trig: "Both must survive the chapter" },
      { k: "boss", who: "Lords → Ursula", sum: "Ursula taunts the lords about the Black Fang's reach.", trig: "Battle quote" }
    ]
  },
  night: {
    lore: "Sonia's morphs hold an island fortress. Jaffar joins, and Sonia drops the Fell Contract.",
    talks: [
      { k: "boss", who: "Lords → Sonia", sum: "Sonia reveals how little she thinks of the morphs she commands.", trig: "Battle quote" }
    ]
  },
  cog: {
    lore: "The army marches on the Shrine of Seals. Lloyd or Linus commands the last of the Four Fangs; the village holds Warp.",
    talks: [
      { k: "recruit", who: "Main lord → Vaida", sum: "Vaida, impressed by the army, offers her wyvern.", trig: "Talk with Vaida" },
      { k: "unit", who: "Nino → Lloyd", sum: "Nino begs Lloyd to stop. He refuses — and begins moving from his throne.", trig: "Nino must be deployed; changes boss behaviour", verify: true }
    ]
  },
  valorous: {
    lore: "A sacred trial at the Shrine of Seals. Nils replaces Ninian; Georg guards the seal.",
    trivia: "Ninian is unavailable here, so Nils is the dancer for this chapter."
  },
  berserker: {
    lore: "Hector's group crosses the mountains; Kaim's berserkers hold the pass. A second Wolf Beil is in the chests.",
    trivia: "Oswin and Merlinus are unavailable in this chapter."
  },
  sands: {
    lore: "The army defends a castle for eleven turns against Denning's morphs. A secret shop outside the walls needs Warp.",
    trivia: "The secret shop sells every promotion seal in the game."
  },
  prep: {
    lore: "A shopping chapter before the final battle. 30,000G, every armory, and Karla in Hector Mode.",
    talks: [
      { k: "recruit", who: "Bartre → Karla", sum: "Karla accepts Bartre's challenge and joins if both survive a round.", trig: "Hector Mode; Bartre must be a level 5+ Warrior" }
    ]
  },
  vod: {
    lore: "Nergal's morphs assault the castle. Renault can be recruited from the north-west ruins; the secret shop is in the top-right.",
    talks: [
      { k: "recruit", who: "Main lord → Renault", sum: "Renault, a bishop haunted by his past, agrees to fight.", trig: "Visit the north-west ruins within 11 turns" }
    ]
  },
  value: {
    lore: "Kishuna's final hiding place. Kill him for the side quest's reward.",
    trivia: "This is Hector Mode's last side quest, unlocked by finishing Ch.32 within 20 turns."
  },
  light1: {
    lore: "Nergal's fortress. The commanders of the Black Fang return as morphs, each carrying a legendary weapon.",
    talks: [
      { k: "unit", who: "Lyn ↔ Eliwood", sum: "The two lords admit how much they have relied on each other.", trig: "Final chapter, deploy both" },
      { k: "unit", who: "Eliwood ↔ Hector", sum: "Hector and Eliwood renew the promise they made at the start.", trig: "Final chapter, deploy both" },
      { k: "boss", who: "Athos → Nergal", sum: "Athos confronts the friend he failed to save.", trig: "Battle quote" }
    ]
  },
  light2: {
    lore: "The dragon Nergal summoned. Only the legendary weapons and Athos's magic can bring it down.",
    trivia: "Only units deployed in part 1 can fight the dragon."
  }
};

window.FE7_UNIT_LORE = {
  lyn: { bio: "The last of the Lorca tribe, raised on the Sacae plains by her grandfather. She is blunt, proud and quick to defend the defenceless.", theme: "Family, duty, and proving herself as a leader.", death: "Lyn falls, and the plains lose their last daughter of the Lorca.", endings: ["Lyn and Rath — returns to Sacae with Rath and rebuilds the Lorca.", "Lyn and Kent — Kent gives up his knighthood to stay with her.", "Lyn and Florina — the two live quietly together in Caelin.", "Lyn and Eliwood — she becomes Lady of Caelin and a close ally of Pherae.", "Lyn and Hector — the most argumentative and most enduring pair in the army."] },
  eliwood: { bio: "Heir of Pherae and son of Marquess Elbert. He is gentle, conscientious and a far better politician than he believes.", theme: "His father, his duty, and learning that kindness is not weakness.", death: "Eliwood falls before he can bring his father home.", endings: ["Eliwood and Ninian — the dragon girl stays, and Pherae gains a gentle lady.", "Eliwood and Lyn — a marriage that unites Pherae and Caelin.", "Eliwood and Fiora — the Pegasus knight settles in Pherae."] },
  hector: { bio: "Heir of Ostia and Eliwood's oldest friend. Blunt, impatient, and constitutionally incapable of leaving a friend in trouble.", theme: "Loyalty, grief for his brother Uther, and growing into rule.", death: "Hector falls, and Ostia is left without its heir.", endings: ["Hector and Lyn — she rules Caelin at his side.", "Hector and Florina — the general and the flier settle down.", "Hector and Farina — the two mercenary souls find common ground."] },
  sain: { bio: "A knight of Caelin with more charm than sense. A capable cavalier who flirts with every woman he meets.", theme: "Bravery, bravado, and the friendship with Kent." },
  kent: { bio: "A knight of Caelin and Sain's long-suffering partner. Serious, dutiful and quietly kind.", theme: "Duty against his own wants, and keeping Sain alive." },
  florina: { bio: "A Pegasus knight of Ilia who is afraid of men. She is a superb flier once she trusts someone.", theme: "Fear, homesickness, and finding a place to belong." },
  wil: { bio: "A cheerful archer from Pherae who joined the army for adventure.", theme: "Growing up, and proving archers matter." },
  dorcas: { bio: "A woodcutter who took a mercenary contract to pay for his wife Natalie's medicine.", theme: "Natalie, poverty, and the shame of fighting for the wrong people.", endings: ["Dorcas and Natalie — he returns home for good."] },
  serra: { bio: "A cleric of the Elimine Church with an inexhaustible opinion of herself. Underneath the chatter she is brave and loyal.", theme: "Faith, attention-seeking, and genuine kindness." },
  erk: { bio: "A young mage apprenticed to Pent. He is patient, precise and permanently exasperated by Serra.", theme: "Mentorship, duty, and learning to stand on his own." },
  matthew: { bio: "A thief in Ostia's service and one of Hector's closest friends. Cheerful on the surface, grieving underneath.", theme: "Leila, loyalty to Ostia, and revenge." },
  rath: { bio: "A Sacaean nomad of the Kutolah who speaks little and rides better than anyone.", theme: "Exile, tribe, and returning to Sacae." },
  nils: { bio: "A bard and Ninian's brother, able to refresh allies with his music. He is hiding a dragon's true nature.", theme: "His sister, the Dragon's Gate, and a home they cannot return to." },
  lucius: { bio: "A monk raised in the Elimine Church, gentle and devout, travelling with Raven for reasons he rarely explains.", theme: "Faith, Raven, and surviving cruelty without becoming cruel." },
  wallace: { bio: "A knight of Caelin who took the blame for a massacre he did not commit. He wants only to be useful again.", theme: "Honour, disgrace, and redemption." },
  marcus: { bio: "A veteran paladin of Pherae and Eliwood's guardian. He has seen too many young lords die and refuses to see another.", theme: "Mentorship, age, and the weight of surviving." },
  lowen: { bio: "A cavalier of Pherae, steady and unglamorous, and a surprisingly good cook.", theme: "Self-doubt, and proving reliability is a virtue." },
  rebecca: { bio: "A Pheraean archer whose family fostered Nino. She is quick, stubborn and devoted to her brothers.", theme: "Family, and proving herself despite her youth." },
  bartre: { bio: "A fighter from Bern, loud and simple, searching for his daughter Fir's mother.", theme: "Fatherhood, strength, and Karla." },
  oswin: { bio: "A knight of Ostia and Hector's protector. He is immovable in every sense.", theme: "Duty to Hector, and the limits of loyalty." },
  guy: { bio: "A Sacaean myrmidon who left his tribe to prove himself with a sword.", theme: "Pride, swordsmanship, and belonging." },
  merlinus: { bio: "A peddler who becomes the army's convoy. He is not a fighter and knows it.", theme: "Survival, commerce, and being useful without a weapon." },
  priscilla: { bio: "A troubadour raised in Etruria, searching for the brother taken from her as a child.", theme: "Raven, adoption, and the family she chooses." },
  raven: { bio: "A mercenary born to a Cornwell noble family destroyed by Ostia. He is cold, competent and consumed by revenge.", theme: "Revenge, Priscilla, and learning to let go." },
  canas: { bio: "A scholar of dark magic from the Nabata desert, polite to a fault and oblivious to danger.", theme: "Knowledge, family, and the temptation of dark magic." },
  dart: { bio: "A pirate of Fargus's crew with no memory of his past before the sea.", theme: "Memory, the sea, and the family he cannot recall." },
  fiora: { bio: "A Pegasus knight of Ilia and Florina's elder sister, professional to a fault.", theme: "Her sisters, duty, and the cost of mercenary work." },
  legault: { bio: "A Black Fang thief who defects when the organisation turns on itself.", theme: "Betrayal, survival, and choosing a side." },
  ninian: { bio: "A dancer with dragon blood, Nils's sister, and the emotional centre of Eliwood's story.", theme: "Her brother, the Dragon's Gate, and Eliwood." },
  isadora: { bio: "A paladin of Pherae and one of Marquess Elbert's most trusted knights.", theme: "Duty, grief, and serving the next generation." },
  heath: { bio: "A Bernese wyvern rider who begins to question the orders he is given.", theme: "Loyalty to Bern against loyalty to what is right." },
  hawkeye: { bio: "A berserker of Nabata and guardian of the desert village of Arcadia.", theme: "Guardianship, the desert, and the dragons he protects." },
  geitz: { bio: "A mercenary who fights for whoever pays — until Dart reminds him what friendship is worth.", theme: "Money, purpose, and choosing a cause." },
  farina: { bio: "A Pegasus knight of Ilia who charges by the job and negotiates hard.", theme: "Money, her sisters, and learning to stay." },
  pent: { bio: "A sage of Etruria, Louise's husband, and one of the strongest mages in the army.", theme: "Marriage, scholarship, and responsibility." },
  louise: { bio: "A sniper of Etruria and Pent's wife, calm and lethally accurate.", theme: "Pent, family, and keeping her husband grounded." },
  karel: { bio: "A swordmaster known as the Sword Demon, seeking worthy opponents.", theme: "Violence, family, and the search for a reason to stop." },
  harken: { bio: "A hero of Elibe who served the wrong master and carries the guilt of it.", theme: "Guilt, loyalty, and starting over." },
  nino: { bio: "A young mage raised by the Black Fang, cheerful despite everything.", theme: "Her adoptive family, Jaffar, and choosing her own life." },
  jaffar: { bio: "The Black Fang's Angel of Death, raised to kill and given no reason to stop.", theme: "Nino, violence, and learning to be human." },
  vaida: { bio: "A wyvern lord of Bern, proud and direct, who respects strength above rank.", theme: "Pride, duty, and the wyverns she leads." },
  karla: { bio: "A swordmaster and Karel's sister, living in his shadow.", theme: "Her brother, her blade, and Bartre." },
  renault: { bio: "A bishop who once served Nergal and has spent years trying to atone.", theme: "Guilt, faith, and the cost of survival." },
  athos: { bio: "One of the eight legends who defeated the dragons a thousand years ago.", theme: "History, sacrifice, and the friends he outlived." }
};
