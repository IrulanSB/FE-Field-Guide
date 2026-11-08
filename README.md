# FE7 Field Guide

A phone-first, offline checklist and strategy guide for **Fire Emblem: The Blazing Blade** (FE7, GBA, 2003).

Built because the game silently deletes content: gaidens expire on turn limits, recruits walk off the map, the Member Card gets carried away by a thief, and the support system quietly caps every unit at five levels.

## What it does

- **Every chapter** for Lyn, Eliwood and Hector modes, including all side quests.
- **Per-item checkboxes** for recruits, villages, chests, notable drops, ruins, and secret shops.
- **Turn tracking** that checks gaiden conditions as you enter your final turn count (Ch.7, Dread Isle, Victory or Death).
- **Branch handling** — Four-Fanged Offense (Geitz/Wallace) and Pale Flower of Darkness (Kenneth/Jerme) change the checklist downstream.
- **Multiple isolated runs** with name, mode and difficulty.
- **Catch-up** that marks earlier chapters as *assumed* instead of done, so the audit can ask you to confirm the important ones.
- **Audit** listing unrecorded, assumed and permanently lost content.
- **Recruits, items, gaidens, roster, team planner** with promotion-item conflicts and stat-booster assignments.
- **Full support matrix** — every legal pair, with the real 5-level budget and computed C/B/A bonuses.
- **Search** across items, chapters and units.
- **Strategy** — max-content route, tier list, promotions, boosters, mechanics, common mistakes.
- **Works offline** after first load, installs to the iOS home screen.

## Deploy

1. Create a GitHub repository (e.g. `fe7`).
2. Upload every file in this folder to the repository root.
3. Repo → **Settings → Pages** → Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`.
4. Wait a minute. Your URL is `https://<username>.github.io/<repo>/`.
5. Open `install.html`, paste that URL, and scan the QR code with your phone.

No build step, no dependencies, no server.

## Install on iPhone

1. Open the URL in **Safari** (not Chrome).
2. Share → **Add to Home Screen**.
3. Open it once with signal so the service worker caches everything.
4. It now works in airplane mode.

## Files

| File | Purpose |
|---|---|
| `index.html` | App shell |
| `app.css` | Dark theme, dense mobile layout, two-pane desktop layout |
| `app.js` | State, rendering, turn logic, audit, supports, search |
| `data-fe7.js` | All FE7 content |
| `data-supports.js` | Generated support pair chart (Serenes Forest) |
| `data-fe8.js` | Reserved slot for Sacred Stones |
| `sw.js` | Offline cache. **Bump `CACHE` after editing content.** |
| `manifest.json` | Home-screen metadata |
| `icon.svg`, `icon-180.png` | App icon |
| `install.html` | QR + install steps |

## Data accuracy

Content is cross-checked against:

- [Fire Emblem Wiki](https://fireemblemwiki.org) — chapter item tables, side quest requirements, recruit conditions.
- [Serenes Forest](https://serenesforest.net/blazing-sword/) — recruitment chart, support points and affinities, item effects.

Where guides disagree or a detail depends on difficulty, the entry carries a **Verify** badge rather than a confident claim. Difficulty-specific entries are filtered automatically from the item text (`Normal Mode only`, `Hard Mode only`, `Hector Hard Mode only`), so the checklist reflects the run you selected.

Tier list and "build" advice are judgment calls, not facts; they are labelled as such in the Strategy tab.

## Progress storage

Runs live in `localStorage` on the device, keyed `fe7fg.v2`. The run menu has **Export** (JSON) and **Import** to move progress between phone and desktop. Deleting site data in Safari will erase it — export first if it matters.

## Adding FE8 later

`data-fe8.js` mirrors the shell. Add chapters, units and supports with the same schema, then add an order array and a game switcher. The FE7 pack is self-contained, so nothing else needs to change.

## License / attribution

Unofficial fan project. Fire Emblem and its characters belong to Nintendo / Intelligent Systems. No game art or ROM data is included. Guide data is attributed to the sources above.
