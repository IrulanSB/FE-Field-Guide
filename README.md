# Fire Emblem Field Guide

**Live: https://irulansb.github.io/FE-Field-Guide/**

A phone-first, offline checklist and strategy guide for **Fire Emblem: The Blazing Blade** (FE7) and **Fire Emblem: The Sacred Stones** (FE8). Path of Radiance (FE9) is wired up and waiting for its data pass.

Built because these games silently delete content: gaidens expire on turn limits, recruits walk off the map, the Member Card gets carried away by a thief, and the support system quietly caps every unit at five levels.

## What it does

### Both games

- **Per-item checkboxes** for recruits, villages, chests, notable drops, ruins and secret shops.
- **Multiple isolated runs** with name, mode and difficulty, stored per game.
- **Auto-advance** — closing a chapter moves the pin to the next one, opens it, and offers **Undo** in a toast.
- **Gaiden offers** — when a side quest unlocks, a modal asks whether to play it or skip to the next story chapter.
- **Catch-up** that marks earlier chapters as *assumed* instead of done, so the audit can ask you to confirm the important ones.
- **Audit** listing unrecorded, assumed and permanently lost content.
- **Recruits, items, gaidens, roster, team planner** with promotion-item conflicts and stat-booster assignments.
- **Full support matrix** — every legal pair, with the real 5-level budget and computed C/B/A bonuses.
- **Levels and promotion branches** tracked per unit.
- **Exploits tab** — legal tactics and genuine glitches, separated, with step-by-step instructions, risk ratings and per-chapter badges.
- **Search** across items, chapters and units.
- **Works offline** after first load, installs to the iOS home screen.

### FE7 specifics

- Lyn, Eliwood and Hector campaigns; **one run carries Lyn Mode into Eliwood** with a handoff summary (recruits, deaths, gaidens, items, Nils' level check).
- Turn checks for Ch.7, the Dread Isle and Victory or Death.
- Branch handling for Geitz/Wallace and Kenneth/Jerme.
- Block-and-confirm when closing a chapter that still has something to lose.
- Enemy-control (Mine) glitch, arena abuse, boss abuse, support grinding, save-state RNG and Warp skips.

### FE8 specifics

- **Eirika and Ephraim routes**, chosen at the Chapter 8 split and changeable from the route sheet.
- **Branching promotions** recorded per unit (e.g. Franz → Paladin or Great Knight).
- **Tower of Valni (8 floors)** and **Lagdou Ruins (10 floors)** as a post-game section.
- **Creature Campaign** unlocks and the ten bonus characters.
- **Trainee tracking** for Ross, Amelia and Ewan.
- Enemy-control glitch, arena abuse, boss abuse, save states and skirmish farming.

## Install on iPhone

1. Open the live URL in **Safari** (not Chrome).
2. Share → **Add to Home Screen**.
3. Open it once with signal so the service worker caches everything.
4. It now works in airplane mode.

Or open `install.html` for a QR code.

## Deploy

This repo is already deployed. To rebuild from a fork:

1. Create a GitHub repository.
2. Upload every file to the repository root.
3. Repo → **Settings → Pages** → Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`.
4. Your URL is `https://<username>.github.io/<repo>/`.

## Files

| File | Purpose |
|---|---|
| `index.html` | App shell and game switcher |
| `app.css` | Dark theme, dense mobile layout, two-pane desktop layout |
| `app.js` | State, rendering, auto-advance, handoff, audit, supports, exploits |
| `data-fe7.js` | FE7 chapters, units, exploits, strategy |
| `data-supports.js` | FE7 support chart (Serenes Forest) |
| `data-fe8.js` | FE8 chapters, units, dungeons, exploits, strategy |
| `data-fe8-supports.js` | FE8 support chart and affinities |
| `data-fe9.js` | Path of Radiance placeholder |
| `sw.js` | Offline cache. **Bump `CACHE` after editing content.** |
| `manifest.json` | Home-screen metadata |
| `icon.svg`, `icon-180.png`, `qr.png` | Icons and install QR |
| `install.html` | QR + install steps |

## Data accuracy

Cross-checked against:

- [Fire Emblem Wiki](https://fireemblemwiki.org) — chapter item tables, side quest requirements, recruit conditions, Tower/Lagdou floors.
- [Serenes Forest](https://serenesforest.net) — recruitment charts, support points and affinities, item data.

Where guides disagree or a detail depends on difficulty, the entry carries a **Verify** badge rather than a confident claim. Difficulty-specific entries are filtered automatically from their own text (`Normal Mode only`, `Hard Mode only`, `Hector Hard Mode only`).

Tier lists and build advice are judgment calls, labelled as such.

## Progress storage

Runs live in `localStorage`, keyed `fe7fg.v3` (with a fallback read of `fe7fg.v2`). The run menu has **Export** (JSON) and **Import** to move progress between phone and desktop. Deleting site data in Safari erases it — export first if it matters.

## Adding FE9

`data-fe9.js` has the same schema but `ready: false`. Add chapters, units, supports and exploits, set an order array, and the shell will pick it up.
