/* Promotion gains. FE7 values are exact from Fire Emblem Wiki's class-change table.
   FE8 branch values are approximate where the source lists version/sex variants. */
window.PROMO = {
  fe7: {
    "Knight Lord": { g: "HP +4 · Str +2 · Skl +0 · Spd +1 · Def +1 · Res +3 · Mov +2 · Con +2", w: "Lance D" },
    "Great Lord": { g: "HP +3 · Str +0 · Skl +2 · Spd +3 · Def +1 · Res +5 · Con +2", w: "Sword D" },
    "Blade Lord": { g: "HP +3 · Str +2 · Skl +2 · Spd +0 · Def +3 · Res +5 · Mov +1 · Con +1", w: "Bow D" },
    "Paladin": { g: "HP +2 · Str +1 · Skl +1 · Spd +1 · Def +2 · Res +1 · Mov +1 · Con +2", w: "Sword +30 · Lance +30 · Axe E" },
    "General": { g: "HP +4 · Str +2 · Skl +2 · Spd +3 · Def +2 · Res +3 · Mov +1 · Con +2", w: "Lance +30 · Axe E" },
    "Hero": { g: "HP +4 · Str +0 · Skl +2 · Spd +2 · Def +2 · Res +2 · Mov +1 · Con +1", w: "Sword +40 · Axe E" },
    "Warrior": { g: "HP +3 · Str +1 · Skl +2 · Spd +0 · Def +3 · Res +3 · Mov +1 · Con +2", w: "Axe +40 · Bow E" },
    "Swordmaster": { g: "HP +5 · Str +2 · Skl +0 · Spd +0 · Def +2 · Res +1 · Mov +1 · Con +1", w: "Sword +40" },
    "Falcoknight": { g: "HP +5 · Str +2 · Skl +0 · Spd +0 · Def +2 · Res +2 · Mov +1 · Con +1", w: "Sword E · Lance +40" },
    "Wyvern Lord": { g: "HP +4 · Str +0 · Skl +2 · Spd +2 · Def +0 · Res +2 · Mov +1 · Con +1", w: "Sword E · Lance +40" },
    "Sniper": { g: "HP +3 · Str +1 · Skl +2 · Spd +2 · Def +2 · Res +3 · Mov +1 · Con +1", w: "Bow +40" },
    "Nomadic Trooper": { g: "HP +3 · Str +2 · Skl +1 · Spd +1 · Def +3 · Res +3 · Mov +1 · Con +1", w: "Sword E · Bow +40" },
    "Sage": { g: "HP +4 · Str +1 · Skl +0 · Spd +0 · Def +3 · Res +3 · Mov +1 · Con +1", w: "Anima +40 · Staff E" },
    "Bishop": { g: "HP +3 · Str +1 · Skl +2 · Spd +1 · Def +2 · Res +2 · Mov +1 · Con +1", w: "Light D · Staff +40" },
    "Druid": { g: "HP +4 · Str +0 · Skl +0 · Spd +3 · Def +2 · Res +2 · Mov +1 · Con +1", w: "Dark +40 · Staff E" },
    "Valkyrie": { g: "HP +3 · Str +2 · Skl +1 · Spd +0 · Def +2 · Res +3 · Mov +1 · Con +1", w: "Anima E · Staff +40" },
    "Berserker": { g: "HP +4 · Str +1 · Skl +1 · Spd +1 · Def +2 · Res +2 · Mov +1 · Con +3", w: "Axe +40" },
    "Assassin": { g: "HP +3 · Str +1 · Skl +0 · Spd +0 · Def +2 · Res +2 · Con +0", w: "Sword +30" }
  },
  fe8: {
    "Great Lord": { g: "Eirika: HP +4 · Str +2 · Skl +2 · Spd +1 · Def +3 · Res +5 · Mov +2 · Con +2 / Ephraim: HP +4 · Str +2 · Skl +3 · Spd +2 · Def +2 · Res +5 · Mov +2 · Con +2", w: "Sword or Lance" },
    "Paladin": { g: "HP +2 · Str +1 · Skl +1 · Spd +1 · Def +2 · Res +1 · Mov +1 · Con +2 (approx)", w: "Swords" },
    "Great Knight": { g: "HP +3 · Str +2 · Skl +1 · Spd +2 · Def +2 · Res +1 · Mov −1 · Con +4 (approx)", w: "Axes D" },
    "General": { g: "HP +3 · Str +2 · Skl +2 · Spd +3 · Def +2 · Res +3 · Mov +1 · Con +1 (approx)", w: "Lance +40 · Axe E" },
    "Sniper": { g: "HP +3 · Str +2 · Skl +2 · Spd +2 · Def +2 · Res +2 · Mov +1 · Con +1 (approx)", w: "Bow +40" },
    "Ranger": { g: "HP +3 · Str +2 · Skl +1 · Spd +1 · Def +3 · Res +3 · Mov +1 · Con +2 (approx)", w: "Sword D" },
    "Hero": { g: "HP +4 · Str +1 · Skl +2 · Spd +2 · Def +2 · Res +2 · Mov +1 · Con +1 (approx)", w: "Sword +40 · Axe D" },
    "Warrior": { g: "HP +3 · Str +1 · Skl +2 · Spd +0 · Def +3 · Res +3 · Mov +1 · Con +2 (approx)", w: "Axe +40 · Bow E" },
    "Berserker": { g: "HP +4 · Str +1 · Skl +1 · Spd +1 · Def +2 · Res +2 · Mov +1 · Con +3 (approx)", w: "Axe +40" },
    "Rogue": { g: "HP +2 · Str +1 · Skl +1 · Def +2 · Res +2 · Con +1 (approx)", w: "—" },
    "Assassin": { g: "HP +3 · Str +1 · Def +2 · Res +2 · Con +2 (approx)", w: "Sword +30" },
    "Swordmaster": { g: "HP +4 · Str +2 · Skl +1 · Def +2 · Res +1 · Mov +1 · Con +1 (approx)", w: "Sword +40" },
    "Mage Knight": { g: "HP +4 · Str +2 · Skl +1 · Def +2 · Res +2 · Mov +1 · Con +2 (approx)", w: "Anima +40 · Staff D" },
    "Sage": { g: "HP +4 · Str +1 · Skl +1 · Def +3 · Res +3 · Mov +1 · Con +1 (approx)", w: "Anima +40 · Light D · Staff D" },
    "Bishop": { g: "HP +3 · Str +1 · Skl +2 · Spd +1 · Def +2 · Res +2 · Mov +1 · Con +1 (approx)", w: "Light D · Staff +40" },
    "Valkyrie": { g: "HP +3 · Str +2 · Skl +1 · Def +2 · Res +3 · Mov +1 · Con +1 (approx)", w: "Light D" },
    "Druid": { g: "HP +4 · Skl +0 · Spd +3 · Def +2 · Res +2 · Mov +1 · Con +1 (approx)", w: "Dark +40 · Staff E" },
    "Summoner": { g: "HP +3 · Skl +1 · Spd +3 · Def +1 · Res +3 · Mov +1 · Con +1 (approx)", w: "Dark +40 · Staff E" },
    "Falcoknight": { g: "HP +5 · Str +2 · Spd +2 · Def +2 · Res +2 · Mov +1 · Con +1 (approx)", w: "Sword E · Lance +40" },
    "Wyvern Knight": { g: "HP +3 · Str +2 · Skl +1 · Spd +2 · Def +1 · Res +1 · Con +4 (approx)", w: "Lance +40" },
    "Wyvern Lord": { g: "HP +4 · Str +2 · Skl +2 · Def +2 · Mov +1 · Con +1 (approx)", w: "Sword D · Lance +40" }
  }
};
