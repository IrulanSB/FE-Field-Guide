/* FE8 talks, lore, bios, endings and dungeon floor lore. */

window.FE8_LORE = {
  p8: {
    lore: "Grado's army invades Renais without warning. King Fado holds the castle while Eirika and Seth escape; the Sacred Stone of Renais is shattered.",
    talks: [
      { k: "event", who: "Seth → Eirika", sum: "Seth makes her leave her father and flee east toward Frelia.", trig: "Start of chapter" }
    ]
  },
  c1: {
    lore: "Eirika's party runs for the Frelian border, picking up Franz and Gilliam. Frelia's princess Tana is a childhood friend waiting on the other side.",
    trivia: "This is the only chapter where Seth is guaranteed to be at full strength; he carries the early game."
  },
  c2: {
    lore: "Frelia's border is raided by bandits while Ross and Garcia defend a village. Both can be recruited if they survive.",
    talks: [
      { k: "recruit", who: "Eirika → Ross", sum: "Ross insists on repaying his father's kindness by fighting.", trig: "Talk with Ross" },
      { k: "recruit", who: "Ross → Garcia", sum: "Garcia is wounded; Ross begs him to stop fighting.", trig: "Talk with Garcia" }
    ]
  },
  c3: {
    lore: "The bandit Bazba has taken Borgo Ridge. Neimi's village was raided, and Colm went ahead alone to get her things back.",
    talks: [
      { k: "recruit", who: "Neimi → Colm", sum: "Neimi scolds Colm for running off, then forgives him instantly.", trig: "Talk with Colm" }
    ]
  },
  c4: {
    lore: "Monsters — the first sign that something is wrong with the world — rise from an old battlefield. Artur and Lute join the march.",
    trivia: "This is the first appearance of monsters; Sacred weapons deal bonus damage to them."
  },
  c5: {
    lore: "Grado's general Saar holds a border fort. Natasha, a cleric fleeing Grado, and Joshua, a mercenary, can both be won over here.",
    talks: [
      { k: "recruit", who: "Natasha → Joshua", sum: "Joshua flips a coin on whether to join; Natasha's conviction wins the toss.", trig: "Talk with Joshua" }
    ],
    trivia: "Visit all four villages for the Guiding Ring — the only one you get this early."
  },
  c5x: {
    lore: "Ephraim, separated from Eirika, attacks Renvall with Forde, Kyle and Orson. Orson's loyalty will not survive the war.",
    trivia: "Orson does not return in Chapter 8 — only Ephraim, Forde and Kyle do."
  },
  c6: {
    lore: "The bandit Novala is raiding villages and blaming the war. Eirika's party escorts civilians out of the fighting.",
    talks: [
      { k: "event", who: "Civilians", sum: "Each civilian saved contributes to the Orion's Bolt reward.", trig: "Keep all civilians alive", miss: true }
    ]
  },
  c7: {
    lore: "Murray holds Renvall's water gate. Inside, Eirika hopes to find her brother.",
    trivia: "The Knight Crest from Murray is your first promotion item."
  },
  c8: {
    lore: "Tirado springs a trap, but Ephraim arrives and the twins are reunited. From here the army chooses whose route to follow.",
    talks: [
      { k: "unit", who: "Eirika ↔ Ephraim", sum: "The twins compare what has happened and divide the work ahead.", trig: "Automatic at chapter start" }
    ],
    trivia: "The route choice at the end of this chapter determines your next six maps and several recruits."
  },
  c9a: {
    lore: "Eirika marches through Carcino to draw Grado away from Ephraim. Tana joins, and the trainee Amelia can be persuaded to desert.",
    talks: [
      { k: "recruit", who: "Franz or Eirika → Amelia", sum: "Amelia realises she is fighting for the wrong side.", trig: "Talk with Amelia before turn 12" }
    ]
  },
  c10a: {
    lore: "Carcino's council has split; Pablo sells the city to Grado. Innes and his mercenaries arrive to help.",
    talks: [
      { k: "recruit", who: "Tana or Eirika → Innes", sum: "Innes pretends he did not need rescuing.", trig: "Talk with Innes" },
      { k: "recruit", who: "Innes or Tethys → Gerik", sum: "Gerik agrees to fight for Eirika's cause.", trig: "Talk with Gerik" },
      { k: "recruit", who: "Gerik → Marisa", sum: "Gerik talks his old comrade out of Grado's service.", trig: "Talk with Marisa" }
    ]
  },
  c11a: {
    lore: "Rausten's princess L'Arachel hunts monsters for sport and joins the war. The village of Caer Pelyn is silent — and full of the dead.",
    talks: [
      { k: "recruit", who: "Eirika → L'Arachel", sum: "L'Arachel declares herself the army's moral compass.", trig: "Talk with L'Arachel" },
      { k: "recruit", who: "L'Arachel → Dozla", sum: "Dozla follows his princess into the fight.", trig: "Talk with Dozla" }
    ]
  },
  c12a: {
    lore: "Saleh, a sage of Caer Pelyn, guides the army through the mountains. Ewan, a young pupil, begs to be taken on as a student.",
    talks: [
      { k: "recruit", who: "Ewan → Saleh", sum: "Ewan asks to study under Saleh; Saleh reluctantly agrees.", trig: "After both join", verify: true }
    ]
  },
  c13a: {
    lore: "At Hamill Canyon, Cormag learns that his brother Glen was killed — and that Grado's court is lying about why.",
    talks: [
      { k: "recruit", who: "Eirika → Cormag", sum: "Cormag turns on Grado to avenge his brother.", trig: "Cormag appears on turn 5" }
    ]
  },
  c14a: {
    lore: "In Jehanna's desert palace, Queen Ismaire is dead and Carlyle has gone mad with grief. Rennac is looting the treasury.",
    talks: [
      { k: "recruit", who: "L'Arachel → Rennac", sum: "Rennac joins to escape L'Arachel's lectures — and because she is right.", trig: "Talk with Rennac (free). Eirika must pay 9,980G." }
    ]
  },
  c9b: {
    lore: "Ephraim pushes into Grado itself and storms Fort Rigwald. Gheb, a Grado commander, holds the fort and its chests.",
    talks: [
      { k: "recruit", who: "Franz or Ephraim → Amelia", sum: "Amelia deserts Grado after seeing the war up close.", trig: "Talk with Amelia" }
    ]
  },
  c10b: {
    lore: "Duessel, one of Grado's Imperial Three, refuses to serve the court's new orders. Cormag must choose between his king and his conscience.",
    talks: [
      { k: "recruit", who: "Ephraim → Duessel", sum: "Duessel chooses loyalty to Grado's people over its throne.", trig: "Talk with Duessel" },
      { k: "recruit", who: "Duessel or Tana → Cormag", sum: "Cormag defects after hearing the truth about Glen.", trig: "Talk with Cormag" }
    ]
  },
  c11b: {
    lore: "Ephraim's ship is boarded by the phantom ship of the Black Fang's remnants. L'Arachel and Dozla arrive to help.",
    talks: [
      { k: "recruit", who: "Ephraim → L'Arachel", sum: "L'Arachel announces she is joining whether he likes it or not.", trig: "L'Arachel appears on turn 5" },
      { k: "recruit", who: "L'Arachel → Dozla", sum: "Dozla follows her aboard.", trig: "Talk with Dozla" }
    ]
  },
  c12b: {
    lore: "At Taizel, Marisa leads a Grado company while Ewan tries to talk her out of it.",
    talks: [
      { k: "recruit", who: "Ewan → Marisa", sum: "Ewan begs Marisa to stop fighting for Grado.", trig: "Talk with Marisa" }
    ]
  },
  c13b: {
    lore: "Selena, one of the Imperial Three, defends Fluorspar's Oath. She knows the court is rotten and serves it anyway.",
    talks: [
      { k: "boss", who: "Ephraim → Selena", sum: "Selena says she would rather die loyal than live a traitor.", trig: "Battle quote" }
    ]
  },
  c14b: {
    lore: "Ephraim confronts Vigarde, the emperor he once served — and finds a puppet animated by the Sacred Stone of Grado.",
    talks: [
      { k: "recruit", who: "L'Arachel → Rennac", sum: "Rennac joins to escape her lectures.", trig: "Talk with Rennac (free). Ephraim must pay 9,980G." },
      { k: "boss", who: "Ephraim → Vigarde", sum: "Ephraim realises the emperor is already dead.", trig: "Battle quote" }
    ]
  },
  c15: {
    lore: "The twins reunite in the Jehanna desert. Valter and Caellach ambush them, and the Sacred Stones' true purpose begins to surface.",
    talks: [
      { k: "unit", who: "Eirika ↔ Ephraim", sum: "The twins divide the army again, this time for the march on Grado.", trig: "Automatic at start" },
      { k: "boss", who: "Eirika → Valter", sum: "Valter taunts her about the hunt he has made of her.", trig: "Battle quote" },
      { k: "boss", who: "Joshua → Caellach", sum: "Two mercenaries settle an old rivalry.", trig: "Battle quote" }
    ]
  },
  c16: {
    lore: "Orson has taken Renais's castle and kept a corpse of his wife at the table. The twins put him down and claim the Sacred Twins' weapons.",
    talks: [
      { k: "boss", who: "Eirika/Ephraim → Orson", sum: "Orson insists his wife is still alive.", trig: "Battle quote" }
    ]
  },
  c17: {
    lore: "Lyon, the gentle prince of Grado, has become the Demon King's vessel. He kills his own father's memory and flees to Darkling Woods.",
    talks: [
      { k: "recruit", who: "Tana/Vanessa/Innes → Syrene", sum: "Syrene joins the rearguard protecting the civilians.", trig: "Talk with Syrene" },
      { k: "boss", who: "Eirika/Ephraim → Lyon", sum: "Lyon apologises and asks them to stop him.", trig: "Battle quote" }
    ]
  },
  c18: {
    lore: "The Darkling Woods are full of monsters drawn by the Demon King's awakening. There is no loot here — only the road to Rausten.",
    trivia: "No chests or villages; this is a pure rout map. Bring Sacred weapons."
  },
  c19: {
    lore: "Rausten's last stand. Riev, a Grado bishop, besieges the palace while Mansel holds the Sacred Stone.",
    talks: [
      { k: "boss", who: "Lords → Riev", sum: "Riev gloats that the Demon King is already awake.", trig: "Battle quote" }
    ]
  },
  c20: {
    lore: "Morva, the ancient guardian of Darkling Woods, is consumed by the Demon King's power. The army cuts through to the final shrine.",
    trivia: "Morva is a dragon; Sacred weapons and Myrrh are your best answer."
  },
  f1: {
    lore: "Lyon makes his last stand inside the shrine, holding the ruined Sacred Stone of Grado.",
    talks: [
      { k: "boss", who: "Eirika/Ephraim → Lyon", sum: "Lyon thanks them for coming, then lets the Demon King take him.", trig: "Battle quote" }
    ]
  },
  f2: {
    lore: "Fomortiis, the Demon King, rises in his true form. The Sacred Stones' power and the twins' weapons are the only things that can end him.",
    trivia: "Only units deployed in part 1 can fight the final boss."
  },

  t1: { lore: "The Tower of Valni is a Frelian training tower that fills with monsters after the war begins." },
  t2: { lore: "Each floor is a single room; clear it to descend or retreat to the world map." },
  t3: { lore: "The third floor is where the Creature Campaign begins to pay out characters." },
  t4: { lore: "Chests on the middle floors hold D-level weapons and gold — enough to replace broken gear." },
  t5: { lore: "Floor 5 is the usual early grinding spot: dense monsters and short walks." },
  t6: { lore: "Floor 6 unlocks Orson for the Creature Campaign." },
  t7: { lore: "Floor 7 opens after Chapter 15 and starts dropping stat boosters." },
  t8: { lore: "The top floor's Cyclops can drop a Master Seal or a stat booster." },
  l1: { lore: "The Lagdou Ruins are Jehanna's buried fortress, unlocked after Chapter 19." },
  l2: { lore: "There is no saving between floors. A death sends the whole run back." },
  l3: { lore: "Monster density climbs sharply; bring Sacred weapons and a healer." },
  l4: { lore: "Stat booster drops become common on the middle floors." },
  l5: { lore: "Floor 5 unlocks Glen for the Creature Campaign." },
  l6: { lore: "Two hundred kills in a single run unlocks Hayden." },
  l7: { lore: "Floor 7 unlocks Valter." },
  l8: { lore: "Master Seals can drop here; the ruins are the best place to finish promotions." },
  l9: { lore: "One floor from the end. Heal and re-equip before descending." },
  l10: { lore: "The final floor. Clear it once for Fado, three times for Lyon." }
};

window.FE8_UNIT_LORE = {
  eirika: { bio: "Princess of Renais, gentle and conscientious, forced to become a commander after her kingdom falls.", theme: "Duty, her brother, and learning that kindness can be a weapon.", death: "Eirika falls, and Renais loses its princess.", endings: ["Eirika and Seth — the knight stays at her side as both protector and partner.", "Eirika and Innes — Frelia and Renais are joined by marriage.", "Eirika and Saleh — she visits Caer Pelyn often, and eventually stays.", "Eirika and Forde — the cavalier's quiet humour wins her over."] },
  ephraim: { bio: "Prince of Renais, a front-line fighter who would rather take a fortress than govern one.", theme: "Proving himself, his sister, and growing into a king.", death: "Ephraim falls, and Renais loses its prince.", endings: ["Ephraim and Tana — Frelia's princess drags him back to court.", "Ephraim and L'Arachel — the two most stubborn people in Magvel marry.", "Ephraim and Myrrh — the dragon girl stays with him in Renais."] },
  seth: { bio: "A paladin of Renais and Eirika's sworn protector. Calm, relentless, and the best unit in the game.", theme: "Duty, the king he failed, and Eirika." },
  franz: { bio: "A young cavalier of Renais, eager and hard-working, with the best growths in the army.", theme: "Living up to Seth, and his brother Forde." },
  gilliam: { bio: "A knight of Frelia, slow to move and impossible to shift.", theme: "Steadiness, and the men he protects." },
  vanessa: { bio: "A Pegasus knight of Frelia and Syrene's younger sister.", theme: "Her sister, her duty, and being underestimated." },
  moulder: { bio: "A priest of Frelia and the army's first healer, built like a wall.", theme: "Faith, and keeping reckless young people alive." },
  ross: { bio: "Garcia's son, a trainee who insists on fighting beside his father.", theme: "Proving he is not a child." },
  garcia: { bio: "A former gladiator turned woodcutter, and Ross's father.", theme: "His son, his past, and putting down the axe." },
  neimi: { bio: "A village archer and Colm's childhood friend, easily frightened but a crack shot.", theme: "Courage, Colm, and her grandmother." },
  colm: { bio: "A thief from Neimi's village, quick with his hands and quicker with excuses.", theme: "Neimi, and proving he is more than a thief." },
  artur: { bio: "A monk of the Elimine Church, gentle and severe in equal measure.", theme: "Faith, and the monsters the church cannot explain." },
  lute: { bio: "A prodigy mage who narrates her own brilliance and occasionally lives up to it.", theme: "Knowledge, and being taken seriously." },
  natasha: { bio: "A cleric who fled Grado after witnessing the court's experiments.", theme: "Faith, courage, and speaking truth to power." },
  joshua: { bio: "A mercenary who fights for coin and flips a coin to decide anything else.", theme: "Luck, his mother, and choosing a side." },
  forde: { bio: "A cavalier of Renais and Franz's elder brother, relaxed to the point of irresponsibility.", theme: "His brother, and growing up." },
  kyle: { bio: "A cavalier of Renais, serious and dependable, and Forde's opposite.", theme: "Duty, and his friendship with Forde." },
  tana: { bio: "Princess of Frelia, a cheerful flier who treats war like an adventure until it isn't.", theme: "Her brother Innes, and growing up fast." },
  amelia: { bio: "A Grado trainee who joined the army to avenge her mother and finds she cannot hate the enemy.", theme: "Grief, and choosing not to fight." },
  innes: { bio: "Prince of Frelia and a master archer, proud and desperate to be seen as equal to Ephraim.", theme: "Pride, his sister, and living up to his father." },
  gerik: { bio: "Leader of a mercenary company, calm and competent, with a soft spot for strays.", theme: "His company, Tethys, and Marisa." },
  tethys: { bio: "A dancer and Gerik's adopted sister, who reads people better than anyone.", theme: "Gerik, Marisa, and keeping the company together." },
  marisa: { bio: "A myrmidon known as the Crimson Flash, quiet and lethally precise.", theme: "Gerik's company, and a place to belong." },
  larachel: { bio: "Princess of Rausten, a self-appointed crusader against evil with more courage than sense.", theme: "Faith, her parents, and doing the right thing loudly." },
  dozla: { bio: "L'Arachel's guardian, a berserker who treats every battle like a festival.", theme: "L'Arachel, and loyalty." },
  saleh: { bio: "A sage of Caer Pelyn and Ewan's reluctant teacher.", theme: "The village, his duty, and the price of power." },
  ewan: { bio: "A young pupil who talks his way into the army and into Saleh's tutelage.", theme: "Curiosity, and growing up too fast." },
  cormag: { bio: "A Grado wyvern rider whose brother Glen was killed by his own side.", theme: "Glen, loyalty, and revenge." },
  rennac: { bio: "A Rogue and professional thief who would rather be paid than lectured.", theme: "Money, freedom, and L'Arachel." },
  duessel: { bio: "One of Grado's Imperial Three, an old soldier who chooses his people over his emperor.", theme: "Loyalty, honour, and the country he failed." },
  knoll: { bio: "A Grado dark mage who helped create the Demon King's vessel and cannot forgive himself.", theme: "Guilt, atonement, and Lyon." },
  myrrh: { bio: "The last dragon of Magvel, a child in years but ancient in power.", theme: "Her father Morva, and a world that fears dragons." },
  syrene: { bio: "A Falcon Knight of Frelia and Vanessa's elder sister.", theme: "Her sister, and the civilians she protects." },
  caellach: { bio: "A Grado mercenary who rose to command through ruthlessness.", theme: "Ambition, and the men he climbed over." },
  orson: { bio: "A Renais knight who betrayed his kingdom for the corpse of his wife.", theme: "Grief, obsession, and what loyalty is worth." },
  riev: { bio: "A Grado bishop who serves the Demon King for the promise of power.", theme: "Ambition, and the void he worships." },
  ismaire: { bio: "Queen of Jehanna, killed defending her country's Sacred Stone.", theme: "Duty, her son, and Jehanna." },
  selena: { bio: "One of Grado's Imperial Three, a mage knight who serves a court she knows is corrupt.", theme: "Loyalty, pride, and the impossibility of leaving." },
  glen: { bio: "Cormag's elder brother and a Grado wyvern lord, killed by his own side.", theme: "Honour, Cormag, and the truth about Grado." },
  hayden: { bio: "A Frelian ranger and one of the kingdom's most trusted commanders.", theme: "Frelia, the throne, and the next generation." },
  valter: { bio: "A Grado wyvern knight known as the Moonstone, sadistic and obsessed with Eirika.", theme: "Cruelty, the hunt, and his own reputation." },
  fado: { bio: "King of Renais, who held the castle so his children could escape.", theme: "Fatherhood, duty, and the kingdom he left them." },
  lyon: { bio: "Prince of Grado, a gentle scholar who tried to save his country and invited the Demon King in.", theme: "Grief, ambition, and the friend he betrayed." }
};
