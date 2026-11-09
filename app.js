/* FE7 Field Guide — app logic. No dependencies. */
(function () {
  "use strict";

  var GAMES = [window.FE7, window.FE8, window.FE9].filter(Boolean);
  var DATA = GAMES[0];
  var LSKEY = "fe7fg.v3";
  var TABS = ["chapters", "recruits", "items", "gaidens", "supports", "roster", "team", "audit", "search", "exploits", "strategy"];
  var KIND_LABEL = { recruit: "Recruit", village: "Village", chest: "Chest", drop: "Drop", item: "Found", shop: "Secret shop", ruin: "Ruins", event: "Event" };
  var BOOSTERS = ["Angelic Robe", "Energy Ring", "Secret Book", "Speedwings", "Goddess Icon", "Dragonshield", "Talisman", "Boots", "Swiftsole", "Body Ring", "Afa's Drops", "Metis's Tome"];

  function gameById(id) {
    for (var i = 0; i < GAMES.length; i++) if (GAMES[i].id === id) return GAMES[i];
    return GAMES[0];
  }
  function setGame(id) {
    state.game = id || "fe7";
    DATA = gameById(state.game);
  }
  function switchGame(id) {
    if (!GAMES.some(function (g) { return g.id === id; })) return;
    state.lastRun[state.game] = state.active;
    setGame(id);
    var cand = state.lastRun[id];
    var mine = state.runs.filter(function (r) { return r.game === id; });
    if (!cand || !mine.some(function (r) { return r.id === cand; })) cand = mine.length ? mine[mine.length - 1].id : null;
    state.active = cand;
    state.ui.sel = null;
    save(); render();
  }

  /* ---------------- state ---------------- */
  var state = load();
  var pendingClose = null;
  var pendingRecruit = null;
  if (!state || !state.runs) state = { runs: [], active: null, game: "fe7", lastRun: {}, settings: {}, ui: { tab: "chapters", sel: null, recFilter: "all", itemFilter: "all", suppFilter: "rec", search: "" } };
  if (!state.ui) state.ui = { tab: "chapters", sel: null, recFilter: "all", itemFilter: "all", suppFilter: "rec", search: "" };
  if (!state.game) state.game = "fe7";
  if (!state.lastRun) state.lastRun = {};
  if (!state.settings) state.settings = {};
  if (state.settings.spoilers === undefined) state.settings.spoilers = false;
  if (state.settings.lore === undefined) state.settings.lore = true;
  if (state.settings.boss === undefined) state.settings.boss = true;
  if (state.settings.death === undefined) state.settings.death = true;
  if (state.settings.endings === undefined) state.settings.endings = true;
  if (state.settings.plans === undefined) state.settings.plans = true;
  if (state.settings.strategy === undefined) state.settings.strategy = true;
  if (state.settings.steals === undefined) state.settings.steals = true;
  if (state.settings.turnByTurn === undefined) state.settings.turnByTurn = true;
  if (state.settings.planStyle === undefined) state.settings.planStyle = "completionist";
  if (!state.settingsVersion || state.settingsVersion < 4) {
    state.settings.spoilers = false;
    state.settings.lore = true;
    state.settings.boss = true;
    state.settings.death = true;
    state.settings.endings = true;
    state.settings.plans = true;
    state.settings.steals = true;
    state.settingsVersion = 4;
  }
  migrate();
  applyLore(window.FE7, window.FE7_LORE, window.FE7_UNIT_LORE);
  applyLore(window.FE8, window.FE8_LORE, window.FE8_UNIT_LORE);
  applyPlans(window.FE7, window.FE7_PLANS);
  applyPlans(window.FE8, window.FE8_PLANS);
  setGame(state.game);
  if (!state.active || !state.runs.filter(function (r) { return r.id === state.active && r.game === state.game; }).length) {
    state.active = state.lastRun[state.game] || null;
  }

  function load() {
    try {
      var raw = localStorage.getItem(LSKEY) || localStorage.getItem("fe7fg.v2");
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function save() {
    try { localStorage.setItem(LSKEY, JSON.stringify(state)); } catch (e) { toast("Could not save — storage full or blocked"); }
  }
  function uid() { return Math.random().toString(36).slice(2, 9); }

  function newRun(name, mode, diff, game) {
    var g = game || state.game || "fe7";
    var gm = gameById(g);
    var first = chaptersFor(mode)[0] || gm.chapters[0];
    return {
      id: uid(), name: name || "New run", mode: mode, diff: diff || "Normal", game: g,
      created: Date.now(), chapterId: first ? first.id : "",
      checked: {}, turns: {}, notes: {}, roster: {}, team: [], boosters: {}, branches: {}, reached: {}, supports: {}, levels: {}, promos: {}, seen: {}, done: {},
      playedModes: [mode]
    };
  }
  function migrate() {
    state.runs.forEach(function (r) {
      r.game = r.game || "fe7";
      r.checked = r.checked || {}; r.turns = r.turns || {}; r.notes = r.notes || {};
      r.roster = r.roster || {}; r.team = r.team || []; r.boosters = r.boosters || {};
      r.branches = r.branches || {}; r.reached = r.reached || {}; r.supports = r.supports || {};
      r.levels = r.levels || {}; r.promos = r.promos || {}; r.seen = r.seen || {}; r.done = r.done || {};
      if (!r.playedModes || !r.playedModes.length) {
        r.playedModes = [r.mode];
        if (r.game === "fe7" && r.mode === "eliwood") {
          var lynIds = (window.FE7.order.lyn || []);
          var playedLyn = Object.keys(r.checked).some(function (k) { return lynIds.indexOf(k.split(":")[0]) >= 0; });
          if (playedLyn) r.playedModes = ["lyn", "eliwood"];
        }
      }
    });
  }
  function run() {
    var found = state.runs.filter(function (r) { return r.id === state.active; })[0];
    if (found && found.game !== state.game) return null;
    return found || null;
  }

  /* ---------------- data helpers ---------------- */
  function chaptersFor(mode) {
    var ids = DATA.order[mode] || [];
    return ids.map(chById).filter(Boolean);
  }
  function chById(id) {
    for (var i = 0; i < DATA.chapters.length; i++) if (DATA.chapters[i].id === id) return DATA.chapters[i];
    var d = DATA.dungeons || [];
    for (var j = 0; j < d.length; j++) if (d[j].id === id) return d[j];
    return null;
  }
  function firstChapter(mode) { return chaptersFor(mode)[0] || null; }
  function orderIndex(mode, id) { return (DATA.order[mode] || []).indexOf(id); }
  function before(mode, aId, bId) { return orderIndex(mode, aId) < orderIndex(mode, bId); }
  function unitById(id) {
    for (var i = 0; i < DATA.units.length; i++) if (DATA.units[i].id === id) return DATA.units[i];
    return null;
  }
  function supportsFor() {
    if (DATA.id === "fe8") return (window.FE8_SUPPORTS && window.FE8_SUPPORTS.pairs) || [];
    if (DATA.id === "fe7") return window.FE7_SUPPORTS || [];
    return [];
  }
  function unitByName(name) {
    var n = String(name).toLowerCase();
    for (var i = 0; i < DATA.units.length; i++) if (DATA.units[i].name.toLowerCase() === n) return DATA.units[i];
    return null;
  }
  function unitsForItem(it) {
    var out = [], seen = {};
    var text = (it.t + " " + (it.d || "")).toLowerCase();
    DATA.units.forEach(function (u) {
      var hit = it.u === u.id;
      if (!hit && u.name.length > 3 && text.indexOf(u.name.toLowerCase()) >= 0) hit = true;
      if (hit && !seen[u.id]) { seen[u.id] = 1; out.push(u); }
    });
    return out;
  }
  function numFor(ch, mode) {
    if (mode === "hector" && ch.numH) return ch.numH;
    return ch.num;
  }
  function chapterHref(ch) {
    return "https://fireemblemwiki.org/w/index.php?search=" + encodeURIComponent(ch.title);
  }

  function exploitsFor(ch) {
    return (DATA.exploits || []).filter(function (e) { return (e.chapters || []).indexOf(ch.id) >= 0; });
  }

  function campaignBars(r) {
    if (DATA.id !== "fe7") return "";
    var order = ["lyn", "eliwood", "hector"];
    var modes = (r.playedModes && r.playedModes.length ? r.playedModes : [r.mode]).filter(function (m) { return order.indexOf(m) >= 0; });
    if (!modes.length) modes = [r.mode];
    modes.sort(function (a, b) { return order.indexOf(a) - order.indexOf(b); });
    var rows = "";
    modes.forEach(function (m) {
      var list = chaptersFor(m);
      var d = 0, t = 0;
      list.forEach(function (c) { var p = progress(c, r); d += p.done; t += p.total; });
      var pct = t ? Math.round(d / t * 100) : 0;
      rows += '<div class="camp"><span class="k">' + esc(modeName(m)) + '</span>' +
        '<span class="bar"><i style="width:' + pct + '%"></i></span>' +
        '<span class="n">' + d + "/" + t + '</span></div>';
    });
    return '<div class="campaign">' + rows + '</div>';
  }

  function itemKey(ch, i) { return ch.id + ":" + i; }



  function diffHidden(it, r) {
    if (!r || !it.d) return false;
    var d = it.d;
    var hard = r.diff === "Hard";
    if (/Hector Hard Mode only/i.test(d) && !(r.mode === "hector" && hard)) return true;
    if (/Eliwood Hard Mode only/i.test(d) && !(r.mode === "eliwood" && hard)) return true;
    var hasN = /Normal/i.test(d), hasH = /Hard/i.test(d);
    if (hasH && !hasN && !hard) return true;
    if (hasN && !hasH && hard) return true;
    return false;
  }

  function branchFilter(ch, r) {
    var br = r && r.branches ? r.branches : {};
    var mode = r ? r.mode : null;
    return ch.items.map(function (it, i) {
      if (it.m && mode && it.m.indexOf(mode) < 0) return null;
      if (diffHidden(it, r)) return null;
      if (ch.branch === "fourfang") {
        if (br.fourfang === "linus" && /\(Lloyd\)/.test(it.t)) return null;
        if (br.fourfang === "lloyd" && /\(Linus\)/.test(it.t)) return null;
      }
      if (ch.branch === "paleflower") {
        if (br.paleflower === "kenneth" && /\(Jerme\)/.test(it.t)) return null;
        if (br.paleflower === "jerme" && /\(Kenneth\)/.test(it.t)) return null;
      }
      return { it: it, i: i };
    }).filter(Boolean);
  }

  function isChecked(r, ch, i) { return !!(r && r.checked[itemKey(ch, i)]); }
  function checkState(r, ch, i) {
    var v = r && r.checked[itemKey(ch, i)];
    return v === true ? "done" : v === "assumed" ? "assumed" : "";
  }
  function toggleItem(r, ch, i) {
    var k = itemKey(ch, i);
    if (r.checked[k]) delete r.checked[k]; else r.checked[k] = true;
  }
  function progress(ch, r) {
    var done = !!(r.done && r.done[ch.id]);
    return { done: done ? 1 : 0, total: 1, pct: done ? 100 : 0, assumed: 0 };
  }
  function chapterDone(ch, r) { return !!(r.done && r.done[ch.id]); }

  function turnLimitApplies(ch, r) {
    if (!ch.turn || !ch.turn.limit) return false;
    if (ch.id === "vod" && r.mode !== "hector") return false;
    return true;
  }
  function turnStatus(ch, r) {
    if (!turnLimitApplies(ch, r)) return null;
    var lim = ch.turn.limit;
    var v = r.turns[ch.id];
    if (!v) return { cls: "", txt: "Enter your final turn count to check " + ch.turn.unlocks + "." };
    if (v <= lim) return { cls: "ok", txt: "Turn " + v + " of " + lim + " — " + ch.turn.unlocks + " unlocked, " + (lim - v + 1) + " turns spare." };
    return { cls: "bad", txt: "Turn " + v + " — over the limit of " + lim + ". " + ch.turn.unlocks + " is lost for this run." };
  }
  function gaidenLost(ch, r) {
    if (!ch.base) return false;
    var b = chById(ch.base);
    if (!b || !turnLimitApplies(b, r)) return false;
    var v = r.turns[b.id];
    return !!v && v > b.turn.limit;
  }

  function nowItem(r) {
    var ch = chById(r.chapterId) || firstChapter(r.mode);
    var all = branchFilter(ch, r);
    var open = all.filter(function (x) { return checkState(r, ch, x.i) !== "done" && checkState(r, ch, x.i) !== "assumed"; });
    var assumed = all.filter(function (x) { return checkState(r, ch, x.i) === "assumed"; });
    if (open.length) return { ch: ch, item: open[0].it, assumed: false, remaining: open.length };
    if (assumed.length) return { ch: ch, item: assumed[0].it, assumed: true, remaining: assumed.length };
    return { ch: ch, item: null, assumed: false, remaining: 0 };
  }

  /* ---------------- rendering ---------------- */
  var app = document.getElementById("app");
  var sheet = document.getElementById("sheet");
  var toastEl = document.getElementById("toast");
  var toastTimer;

  function toast(msg, actionLabel, actionFn) {
    toastEl.innerHTML = "";
    var span = document.createElement("span");
    span.textContent = msg;
    toastEl.appendChild(span);
    if (actionLabel) {
      var b = document.createElement("button");
      b.textContent = actionLabel;
      b.addEventListener("click", function () {
        toastEl.hidden = true;
        if (actionFn) actionFn();
      });
      toastEl.appendChild(b);
    }
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, actionLabel ? 6000 : 2200);
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function render() {
    setGame(state.game);
    var r = run();
    renderGames();
    document.getElementById("runChip").innerHTML = r
      ? "<b>" + esc(r.name) + "</b>"
      : "No run";
    if (!r) { app.innerHTML = welcome(); return; }
    var primary = ["chapters", "roster", "team", "supports"];
    document.querySelectorAll("#tabs button").forEach(function (b) {
      var on = b.dataset.tab === state.ui.tab || (b.dataset.tab === "more" && primary.indexOf(state.ui.tab) < 0);
      b.classList.toggle("active", on);
    });
    var html = "";
    try {
      switch (state.ui.tab) {
        case "chapters": html = viewChapters(r); break;
        case "recruits": html = viewRecruits(r); break;
        case "items": html = viewItems(r); break;
        case "gaidens": html = viewGaidens(r); break;
        case "supports": html = viewSupports(r); break;
        case "roster": html = viewRoster(r); break;
        case "team": html = viewTeam(r); break;
        case "search": html = viewSearch(r); break;
        case "exploits": html = viewExploits(r); break;
        case "strategy": html = viewStrategy(); break;
        case "more": html = viewMore(r); break;
        default: html = viewChapters(r);
      }
    } catch (e) {
      html = '<div class="empty"><b>This screen failed to render</b>' + esc(e.message) + '</div>';
    }
    app.innerHTML = html;
    document.body.classList.toggle("detail-mode", state.ui.tab === "chapters" && !!state.ui.sel);
  }

  function renderGames() {
    var el = document.getElementById("games");
    if (!el) return;
    el.innerHTML = GAMES.map(function (g) {
      var ready = g.ready !== false && g.chapters && g.chapters.length;
      return '<button data-game="' + g.id + '" class="' + (state.game === g.id ? "on" : "") + (ready ? "" : " off") + '">' + esc(g.short) + '</button>';
    }).join("");
  }

  function modeName(m) { for (var i = 0; i < DATA.modes.length; i++) if (DATA.modes[i].id === m) return DATA.modes[i].name; return m; }

  function welcome() {
    if (DATA.ready === false || !DATA.chapters.length) {
      return (
        '<div class="card pad stack" style="max-width:520px;margin:30px auto">' +
        '<div class="kicker">' + esc(DATA.short) + '</div>' +
        '<h2 class="title">' + esc(DATA.title) + '</h2>' +
        '<p class="muted small">This slot is wired up with the same schema as ' + esc(GAMES[0].short) + ' and ' + esc(GAMES[1] ? GAMES[1].short : "") + ', but the data has not been written yet.</p>' +
        '<button class="btn" data-act="game" data-id="fe7">Back to FE7</button>' +
        '</div>'
      );
    }
    var defMode = DATA.id === "fe8" ? "eirika" : "eliwood";
    var defName = DATA.short + " " + (DATA.id === "fe8" ? "Eirika" : "Eliwood");
    return (
      '<div class="card pad stack" style="max-width:520px;margin:30px auto">' +
      '<div class="kicker">' + esc(DATA.title) + '</div>' +
      '<h2 class="title">' + esc(DATA.short) + ', tracked properly.</h2>' +
      '<p class="muted small">Every chapter, recruit, chest, village, gaiden, secret shop and support pair — with turn-limit checks, auto-advance and an audit that tells you what you may have missed.</p>' +
      '<hr class="sep">' +
      '<div class="kicker">Start a run</div>' +
      '<label class="small muted">Name</label>' +
      '<input class="search" id="newName" value="' + esc(defName) + '" />' +
      '<div class="row" style="gap:8px">' +
      '<select class="search" id="newMode" style="flex:1">' +
      DATA.modes.map(function (m) { return '<option value="' + m.id + '"' + ((state.ui.lastMode || defMode) === m.id ? " selected" : "") + '>' + m.name + '</option>'; }).join("") +
      '</select>' +
      '<select class="search" id="newDiff" style="width:130px">' +
      '<option>Normal</option><option>Hard</option>' +
      '</select>' +
      '</div>' +
      '<button class="btn gold wide" data-act="create-run">Create run</button>' +
      '<p class="tiny dim">Progress is stored on this device. You can export it from the run menu.</p>' +
      '</div>'
    );
  }

  /* ---------------- chapters ---------------- */
  function viewChapters(r) {
    var list = chaptersFor(r.mode);
    var desktop = window.matchMedia("(min-width:900px)").matches;
    var cur = chById(r.chapterId) || chaptersFor(r.mode)[0];
    var html = "";
    html += campaignBars(r);
    if (desktop) {
      html += '<div class="split">';
      html += '<div class="chlist"><div class="chhead"><span class="h">' + esc(modeName(r.mode)) + ' · ' + list.length + ' chapters</span></div>';
      list.forEach(function (ch) {
        var done = chapterDone(ch, r);
        var lost = gaidenLost(ch, r) || (turnLimitApplies(ch, r) && r.turns[ch.id] > ch.turn.limit);
        var sel = r.chapterId === ch.id ? " sel" : "";
        var tag = ch.gaiden ? '<span class="tag miss">G</span>' : "";
        var ex = exploitsFor(ch).length ? '<span class="tag exploit">⚡</span>' : "";
        var stb = stealsFor(ch).length ? '<span class="tag exploit">S</span>' : "";
        html += '<div class="ch"><button class="chrow' + sel + '" data-act="open-ch" data-id="' + ch.id + '">' +
          '<span class="num">' + esc(numFor(ch, r.mode)) + '</span>' +
          '<span class="nm">' + esc(ch.title) + '</span>' + tag + ex + stb +
          '<span class="pr' + (done ? " full" : "") + '">' + (done ? "✓" : "—") + '</span>' +
          '<span class="dot ' + (lost ? "lost" : done ? "full" : "") + '"></span>' +
          '</button></div>';
      });
      if (DATA.dungeons && DATA.dungeons.length) {
        html += '<div class="chhead" style="padding-top:16px"><span class="h">Post-game</span></div>';
        DATA.dungeons.forEach(function (ch) {
          var done = chapterDone(ch, r);
          var sel = r.chapterId === ch.id ? " sel" : "";
          html += '<div class="ch"><button class="chrow' + sel + '" data-act="open-ch" data-id="' + ch.id + '">' +
            '<span class="num">' + esc(ch.num) + '</span>' +
            '<span class="nm">' + esc(ch.title.replace(/^(Tower of Valni|Lagdou Ruins) — /, "")) + '</span>' +
            '<span class="pr' + (done ? " full" : "") + '">' + (done ? "✓" : "—") + '</span>' +
            '<span class="dot ' + (done ? "full" : "") + '"></span>' +
            '</button></div>';
        });
      }
      html += '</div>';
      html += '<div class="detail">' + chapterDetail(cur, r) + '</div>';
      html += '</div>';
    } else {
      html += '<div class="detail mobileDetail">' + chapterDetail(cur, r) + '</div>';
    }
    return html;
  }

  function chapterDetail(ch, r) {
    var p = progress(ch, r);
    var h = "";
    h += '<div class="dhead">' +
      '<button class="btn ghost iconBtn back" data-act="back" aria-label="Back">←</button>' +
      '<div style="flex:1"><div class="kicker">Chapter ' + esc(numFor(ch, r.mode)) + (ch.gaiden ? " · Side quest" : "") + '</div>' +
      '<h2>' + esc(ch.title) + '</h2></div>' +
      '<button class="btn ghost" data-act="ch-menu" data-id="' + ch.id + '" style="min-height:34px;padding:0 10px">•••</button>' +
      '</div>';
    h += '<div class="obj"><b style="color:var(--text)">Objective:</b> ' + esc(ch.obj) + '</div>';

    if (ch.side && (!ch.side.mode || ch.side.mode === r.mode)) {
      h += '<div class="turnbox" style="border-color:rgba(200,162,74,.3)">' +
        '<div class="lbl">Unlocks</div>' +
        '<div style="font-size:13.5px"><b>' + esc(ch.side.title) + '</b><br><span class="muted">' + esc(ch.side.req) + '</span></div>' +
        '</div>';
    }

    if (ch.gaiden && ch.req) {
      h += '<div class="turnbox"><div class="lbl">Unlock condition</div><div style="font-size:13.5px">' + esc(ch.req) + '</div></div>';
    }

    if (turnLimitApplies(ch, r)) {
      var ts = turnStatus(ch, r);
      h += '<div class="turnbox"><div class="lbl">Turn check</div>' +
        '<div class="turnrow"><input type="number" inputmode="numeric" min="1" max="99" data-turn="' + ch.id + '" value="' + (r.turns[ch.id] || "") + '" placeholder="—">' +
        '<span class="small muted">' + esc(ch.turn.label || ("finish within " + ch.turn.limit + " turns")) + '</span></div>' +
        (ts ? '<div class="tstate ' + ts.cls + '">' + esc(ts.txt) + '</div>' : "") +
        '</div>';
    }

    var rw = rosterWarnings(ch, r);
    if (rw.length) {
      h += '<div class="conflict"><b>Roster warning</b>' +
        rw.map(function (w) { return '<div class="small">' + esc(w) + '</div>'; }).join("") + '</div>';
    }

    h += renderFullClear(ch, r);

    if (state.settings.spoilers && ch.deploy) h += '<div class="small muted" style="margin:-4px 0 10px"><b style="color:var(--text);font-weight:600">Bring:</b> ' + esc(ch.deploy) + '</div>';
    if (state.settings.spoilers && ch.brief) h += '<p class="brief">' + esc(ch.brief) + '</p>';

    h += renderPlan(ch, r);
    h += renderTalks(ch);
    h += renderLore(ch);

    if (state.settings.spoilers) {
      var exs = exploitsFor(ch);
      if (exs.length) {
        h += '<div class="sect"><div class="sectH"><h4>Exploits available here</h4></div>';
        exs.forEach(function (e, n) {
          h += '<div class="auditRow"><div style="flex:1"><div style="font-size:13.5px">⚡ ' + esc(e.name) + '</div>' +
            '<div class="tiny muted">' + esc(e.what) + '</div></div>' +
            '<button class="btn ghost small go" data-act="exploit" data-i="' + DATA.exploits.indexOf(e) + '">Steps</button></div>';
        });
        h += '</div>';
      }
    }

    if (ch.id === r.chapterId) {
      h += '<div style="margin:16px 0 4px"><button class="btn gold wide" data-act="next-chapter" data-id="' + ch.id + '">Next chapter →</button></div>';
    }

    h += '<div class="notes"><div class="lbl">Notes</div>' +
      '<textarea data-notes="' + ch.id + '" placeholder="What happened? Who got what?">' + esc(r.notes[ch.id] || "") + '</textarea></div>';

    h += '<div class="row wrap" style="margin-top:14px;gap:8px">' +
      '<a class="btn ghost small" target="_blank" rel="noopener" href="' + chapterHref(ch) + '">Source: Fire Emblem Wiki</a>' +
      '<a class="btn ghost small" target="_blank" rel="noopener" href="https://serenesforest.net/blazing-sword/">Serenes Forest</a>' +
      '</div>';
    return h;
  }

  /* ---------------- recruits ---------------- */
  function recruitRows(r) {
    var out = [];
    chaptersFor(r.mode).forEach(function (ch) {
      branchFilter(ch, r).forEach(function (x) {
        if (x.it.k !== "recruit") return;
        var u = x.it.u ? unitById(x.it.u) : null;
        out.push({ ch: ch, item: x.it, i: x.i, unit: u });
      });
    });
    return out;
  }
  function unitStatus(r, u) {
    if (!u) return "";
    var s = r.roster[u.id];
    return s || "";
  }

  function viewRecruits(r) {
    var rows = recruitRows(r);
    var f = state.ui.recFilter;
    var counts = { all: rows.length, got: 0, open: 0, lost: 0 };
    rows.forEach(function (row) {
      var st = unitStatus(r, row.unit);
      var got = st === "core" || st === "bench";
      var dead = st === "dead";
      if (got) counts.got++; else if (dead) counts.lost++; else counts.open++;
    });
    var shown = rows.filter(function (row) {
      var st = unitStatus(r, row.unit);
      var got = st === "core" || st === "bench";
      var dead = st === "dead";
      if (f === "got") return got;
      if (f === "open") return !got && !dead;
      if (f === "lost") return dead || (!got && before(r.mode, row.ch.id, r.chapterId));
      return true;
    });

    var h = '<div class="spread" style="margin-bottom:10px"><div><div class="kicker">Recruits</div><h2 class="title">' + counts.got + " of " + counts.all + '</h2></div></div>';
    h += '<div class="filters">' +
      ['all|All ' + counts.all, 'open|Still open ' + counts.open, 'got|Recruited ' + counts.got, 'lost|Missed / dead ' + counts.lost].map(function (x) {
        var p = x.split("|");
        return '<button class="' + (f === p[0] ? "on" : "") + '" data-act="rec-filter" data-v="' + p[0] + '">' + p[1] + '</button>';
      }).join("") + '</div>';

    h += '<div class="ulist">';
    shown.forEach(function (row) {
      var u = row.unit;
      var st = unitStatus(r, u);
      var dead = st === "dead";
      var got = st === "core" || st === "bench";
      var tier = u ? u.tier.toLowerCase() : "b";
      var stateTxt = dead ? '<span class="tag lost">Dead</span>' : got ? '<span class="tag rec">Recruited</span>' : '<span class="tag">Open</span>';
      h += '<div class="u t-' + tier + (dead ? " dead" : "") + '" data-act="unit" data-u="' + (u ? u.id : "") + '">' +
        '<div class="badge">' + esc(u ? initials(u.name) : "?") + '</div>' +
        '<div style="flex:1;min-width:0"><div class="nm">' + esc(u ? u.name : row.item.t) + '</div>' +
        '<div class="sub">Ch.' + esc(numFor(row.ch, r.mode)) + ' · ' + esc(u ? u.cls : "") + '</div>' +
        '<div class="sub" style="color:var(--dim)">' + esc(row.item.d || "") + '</div></div>' +
        '<div class="right">' + stateTxt + '<div class="tiny dim" style="margin-top:4px">' + esc(u ? u.tier + "-tier" : "") + '</div></div>' +
        '</div>';
    });
    if (!shown.length) h += '<div class="empty"><b>Nothing here</b>Change the filter.</div>';
    h += '</div>';
    return h;
  }
  function initials(name) {
    var parts = String(name).split(" ");
    if (parts.length === 1) return name.slice(0, 2);
    return parts[0][0] + parts[1][0];
  }

  /* ---------------- items ---------------- */
  function viewItems(r) {
    var rows = [];
    chaptersFor(r.mode).forEach(function (ch) {
      branchFilter(ch, r).forEach(function (x) {
        if (["village", "chest", "drop", "item", "shop", "ruin"].indexOf(x.it.k) < 0) return;
        rows.push({ ch: ch, item: x.it, i: x.i });
      });
    });
    var f = state.ui.itemFilter || "all";
    var shown = f === "shops" ? rows.filter(function (row) { return row.item.k === "shop"; }) : rows;
    var h = '<div class="spread" style="margin-bottom:10px"><div><div class="kicker">Items &amp; treasure</div><h2 class="title">' + rows.length + ' entries</h2></div></div>';
    h += '<div class="filters">' +
      [['all', 'All'], ['shops', 'Secret shops']].map(function (x) {
        return '<button class="' + (f === x[0] ? "on" : "") + '" data-act="item-filter" data-v="' + x[0] + '">' + x[1] + '</button>';
      }).join("") + '</div>';
    h += '<div class="ulist">';
    shown.forEach(function (row) {
      h += '<div class="u" data-act="jump" data-id="' + row.ch.id + '">' +
        '<div class="badge" style="background:var(--surface3);color:var(--dim)">•</div>' +
        '<div style="flex:1;min-width:0"><div class="nm">' + esc(row.item.t) + '</div>' +
        '<div class="sub">Ch.' + esc(numFor(row.ch, r.mode)) + ' ' + esc(row.ch.title) + '</div>' +
        (row.item.d ? '<div class="sub" style="color:var(--dim)">' + esc(row.item.d) + '</div>' : "") + '</div>' +
        '<span class="tag">' + (KIND_LABEL[row.item.k] || row.item.k) + '</span>' +
        '</div>';
    });
    if (!shown.length) h += '<div class="empty"><b>Nothing here</b>Try a different filter.</div>';
    h += '</div>';
    return h;
  }

  /* ---------------- gaidens ---------------- */
  function viewGaidens(r) {
    var rows = chaptersFor(r.mode).filter(function (c) { return c.gaiden; });
    var h = '<div class="kicker">Side quests</div><h2 class="title" style="margin-bottom:4px">Optional chapters</h2>' +
      '<p class="muted small" style="margin-bottom:14px">A side quest is offered at the end of its base chapter. If the condition failed, it is gone for the run.</p>';
    h += '<div class="ulist">';
    rows.forEach(function (ch) {
      var lost = gaidenLost(ch, r);
      var played = !!r.reached[ch.id];
      var req = ch.req || "Check the previous chapter's conditions.";
      h += '<div class="u" style="align-items:flex-start;flex-direction:column;gap:6px">' +
        '<div class="spread" style="width:100%"><div class="row"><span class="tag ' + (lost ? "lost" : played ? "rec" : "miss") + '">' + (lost ? "Lost" : played ? "Played" : ch.mandatory ? "Mandatory" : "Optional") + '</span>' +
        '<b style="font-size:14px">' + esc(numFor(ch, r.mode)) + ' ' + esc(ch.title) + '</b></div>' +
        '<button class="btn ghost small" data-act="jump" data-id="' + ch.id + '" style="min-height:30px;padding:0 9px">Open</button></div>' +
        '<div class="small muted">' + esc(req) + '</div>' +
        (!played && !lost && !ch.mandatory ? '<button class="btn small" data-act="mark-reached" data-id="' + ch.id + '">I played this</button>' : "") +
        '</div>';
    });
    h += '</div>';
    return h;
  }
  function previousId(mode, id) {
    var idx = orderIndex(mode, id);
    return idx > 0 ? DATA.order[mode][idx - 1] : null;
  }

  /* ---------------- supports ---------------- */
  function viewSupports(r) {
    var f = state.ui.suppFilter;
    var rosterIds = Object.keys(r.roster).filter(function (k) { return r.roster[k] === "core" || r.roster[k] === "bench"; });
    var avail = {};
    if (rosterIds.length) rosterIds.forEach(function (k) { avail[k] = true; });
    else {
      DATA.units.forEach(function (u) { if (u.tier === "S" || u.tier === "A") avail[u.id] = true; });
    }
    var recSet = {};
    DATA.units.forEach(function (u) { if (u.tier === "S" || u.tier === "A") recSet[u.id] = true; });

    var all = supportsFor();
    var pairs = all.filter(function (p) {
      if (f === "rec") return recSet[p.a] && recSet[p.b];
      if (f === "avail") return avail[p.a] && avail[p.b];
      return true;
    });

    var ids = {};
    pairs.forEach(function (p) { ids[p.a] = 1; ids[p.b] = 1; });
    var list = Object.keys(ids).map(function (id) { return unitById(id) || { id: id, name: id, tier: "B" }; });
    list.sort(function (a, b) { return a.name.localeCompare(b.name); });

    var h = '<div class="kicker">Supports</div><h2 class="title" style="margin-bottom:2px">The 5-level budget</h2>' +
      '<p class="muted small" style="margin-bottom:12px">C costs 1 level, B costs 2, A costs 3. Every unit can hold 5 levels total. Tap a cell to set the rank.</p>';
    var recs = recommendSupportPairs(r, 6);
    if (recs.length) {
      h += '<div class="card" style="margin-bottom:12px;background:var(--surface2)"><div class="kicker">Recommended A-ranks</div>' +
        recs.map(function (x) { return '<div class="small" style="margin-top:4px">' + esc(x.a.name) + " × " + esc(x.b.name) + '</div>'; }).join("") + '</div>';
    }
    h += '<div class="filters">' +
      [['rec', 'High value'], ['avail', 'My roster'], ['all', 'All pairs']].map(function (x) {
        return '<button class="' + (f === x[0] ? "on" : "") + '" data-act="supp-filter" data-v="' + x[0] + '">' + x[1] + '</button>';
      }).join("") + '</div>';

    if (!list.length) return h + '<div class="empty"><b>No pairs</b>Set some units to core or bench in Roster.</div>';

    h += '<div class="matrixWrap"><table class="mx"><thead><tr><th class="corner"></th>' +
      list.map(function (u) { return '<th class="colh" title="' + esc(u.name) + '">' + esc(u.name.slice(0, 4)) + '</th>'; }).join("") + '</tr></thead><tbody>';
    list.forEach(function (row) {
      h += '<tr><th class="rowh">' + esc(row.name) + ' <span class="dim">' + esc(levelsUsed(r, row.id) ? levelsUsed(r, row.id) + "/5" : "") + '</span></th>';
      list.forEach(function (col) {
        var p = findPair(row.id, col.id);
        if (!p || row.id === col.id) { h += '<td class="dim">·</td>'; return; }
        var rank = r.supports ? 0 : 0;
        var key = pairKey(p.a, p.b);
        var rankVal = (r.supports && r.supports[key]) || 0;
        var cls = rankVal === 3 ? "a" : rankVal === 2 ? "b" : rankVal === 1 ? "c" : "";
        var dim = (f === "all" && !(avail[row.id] && avail[col.id])) ? " dim" : "";
        var rec = (recSet[row.id] || recSet[col.id]) ? " rec" : "";
        h += '<td><button class="mxbtn ' + cls + dim + rec + '" data-act="pair" data-a="' + row.id + '" data-b="' + col.id + '">' +
          (rankVal === 3 ? "A" : rankVal === 2 ? "B" : rankVal === 1 ? "C" : "") + '</button></td>';
      });
      h += '</tr>';
    });
    h += '</tbody></table></div>';

    var over = DATA.units.filter(function (u) { return levelsUsed(r, u.id) > 5; });
    if (over.length) h += '<div class="conflict" style="margin-top:12px"><b>Over budget</b><div class="small">' + over.map(function (u) { return esc(u.name) + " (" + levelsUsed(r, u.id) + "/5)"; }).join(", ") + '</div></div>';

    var ends = [];
    Object.keys(r.supports || {}).forEach(function (k) {
      if (r.supports[k] === 3) {
        var p = k.split("|");
        var a = unitById(p[0]), b = unitById(p[1]);
        if (a && b) ends.push(esc(a.name) + " × " + esc(b.name));
      }
    });
    var core = DATA.units.filter(function (u) { return r.roster[u.id] === "core"; });
    var unpaired = core.filter(function (u) { return levelsUsed(r, u.id) < 3; });
    h += '<div class="sect"><div class="sectH"><h4>Planned A-ranks</h4></div>';
    if (ends.length) h += '<div class="small" style="line-height:1.9">' + ends.map(function (e) { return "♥ " + e; }).join("<br>") + '</div>';
    else h += '<div class="small muted">No A-rank set yet. Tap a cell in the matrix and choose A.</div>';
    if (unpaired.length) h += '<div class="small dim" style="margin-top:8px">Core units without an A-rank: ' + unpaired.map(function (u) { return esc(u.name); }).join(", ") + '</div>';
    h += '</div>';
    return h;
  }
  function pairKey(a, b) { return [a, b].sort().join("|"); }
  function findPair(a, b) {
    var list = supportsFor();
    for (var i = 0; i < list.length; i++) {
      var p = list[i];
      if ((p.a === a && p.b === b) || (p.a === b && p.b === a)) return p;
    }
    return null;
  }
  function levelsUsed(r, id) {
    if (!r.supports) return 0;
    var n = 0;
    Object.keys(r.supports).forEach(function (k) {
      var parts = k.split("|");
      if (parts.indexOf(id) >= 0) n += r.supports[k];
    });
    return n;
  }
  var BONUS = {
    fire: { atk: .5, hit: 2.5, avo: 2.5, crit: 2.5 },
    thunder: { def: .5, avo: 2.5, crit: 2.5, ddg: 2.5 },
    wind: { atk: .5, hit: 2.5, crit: 2.5, ddg: 2.5 },
    ice: { def: .5, hit: 2.5, avo: 2.5, ddg: 2.5 },
    dark: { hit: 2.5, avo: 2.5, crit: 2.5, ddg: 2.5 },
    light: { atk: .5, def: .5, hit: 2.5, crit: 2.5 },
    anima: { atk: .5, def: .5, avo: 2.5, ddg: 2.5 }
  };
  function supportBonus(a, b, rank) {
    var A = BONUS[String(a).toLowerCase()] || {}, B = BONUS[String(b).toLowerCase()] || {};
    var t = {};
    ["atk", "def", "hit", "avo", "crit", "ddg"].forEach(function (k) { t[k] = ((A[k] || 0) + (B[k] || 0)) * rank; });
    return t;
  }

  /* ---------------- roster ---------------- */
  function viewRoster(r) {
    var units = DATA.units.slice().sort(function (a, b) {
      var t = "SABC".indexOf(a.tier) - "SABC".indexOf(b.tier);
      return t !== 0 ? t : a.name.localeCompare(b.name);
    });
    var h = '<div class="kicker">Roster</div><h2 class="title" style="margin-bottom:2px">Your army</h2>' +
      '<p class="muted small" style="margin-bottom:12px">Core = deployed regularly. Bench = recruited but not used. Dead greys out their remaining unlocks.</p>';
    h += '<div class="ulist">';
    units.forEach(function (u) {
      var st = r.roster[u.id] || "";
      var meta = u.cls + (r.levels[u.id] ? " · Lv " + r.levels[u.id] : "") + (r.promos[u.id] ? " · " + r.promos[u.id] : "");
      var label = st === "core" ? '<span class="tag rec">Core</span>' : st === "bench" ? '<span class="tag">Bench</span>' : st === "dead" ? '<span class="tag lost">Dead</span>' : '<span class="tag">Not set</span>';
      h += '<div class="u t-' + u.tier.toLowerCase() + (st === "dead" ? " dead" : "") + '" data-act="unit" data-u="' + u.id + '">' +
        '<div class="badge">' + esc(initials(u.name)) + '</div>' +
        '<div style="flex:1;min-width:0"><div class="nm">' + esc(u.name) + '</div>' +
        '<div class="sub">' + esc(meta) + '</div></div>' +
        '<div class="right">' + label + '<div class="tiny dim" style="margin-top:4px">' + esc(u.tier) + '</div></div>' +
        '</div>';
    });
    h += '</div>';
    return h;
  }

  /* ---------------- team ---------------- */
  function promoItem(u) {
    var c = u.cls.split("→")[0].trim();
    if (DATA.id === "fe8") {
      if (/Journeyman|Recruit|Pupil|Trainee/.test(c)) return "Trainee seal";
      if (u.id === "eirika") return "Solar Brace";
      if (u.id === "ephraim") return "Lunar Brace";
      if (!u.promos || !u.promos.length) return "—";
      return "Master Seal";
    }
    if (/Cavalier|Knight/.test(c)) return "Knight Crest";
    if (/Mercenary|Myrmidon|Fighter/.test(c)) return "Hero Crest";
    if (/Mage|Monk|Shaman|Cleric|Troubadour/.test(c)) return "Guiding Ring";
    if (/Archer|Nomad/.test(c)) return "Orion's Bolt";
    if (/Pegasus|Wyvern/.test(c)) return "Elysian Whip";
    if (/Pirate/.test(c)) return "Ocean Seal";
    if (/Thief/.test(c)) return "Fell Contract";
    if (/Lord/.test(c)) return "Heaven Seal";
    return "—";
  }
  function viewTeam(r) {
    var core = r.team.map(unitById).filter(Boolean);
    var byItem = {};
    core.forEach(function (u) {
      var it = promoItem(u);
      if (it === "—") return;
      (byItem[it] = byItem[it] || []).push(u);
    });
    var conflicts = Object.keys(byItem).filter(function (k) {
      if (k === "Master Seal" || k === "Trainee seal") return false;
      return byItem[k].length > 1;
    });

    var h = '<div class="kicker">Team planner</div><h2 class="title" style="margin-bottom:2px">' + core.length + ' of 12</h2>' +
      '<p class="muted small" style="margin-bottom:12px">Pick your core in Roster, then set a unit to Core. Promotion needs and booster assignments are tracked here.</p>';

    conflicts.forEach(function (k) {
      h += '<div class="conflict"><b>' + esc(k) + ' conflict</b><div class="small">' +
        byItem[k].map(function (u) { return esc(u.name); }).join(" and ") + ' both need one. Decide the order before you promote.</div></div>';
    });

    h += '<div class="ulist">';
    core.forEach(function (u) {
      var need = promoItem(u);
      var chosen = r.promos[u.id];
      var warn = byItem[need] && byItem[need].length > 1 && need !== "Master Seal" && need !== "Trainee seal";
      h += '<div class="slot" data-act="unit" data-u="' + u.id + '">' +
        '<div class="badge" style="width:26px;height:26px;border-radius:7px;display:grid;place-items:center;background:var(--gold);color:#171307;font-size:11px;font-weight:700">' + esc(initials(u.name)) + '</div>' +
        '<div style="flex:1"><div class="nm" style="font-size:13.5px">' + esc(u.name) + (r.levels[u.id] ? ' <span class="tiny dim">Lv ' + r.levels[u.id] + '</span>' : "") + '</div>' +
        '<div class="tiny muted">' + esc(chosen || u.cls) + '</div></div>' +
        '<span class="need' + (warn ? " warn" : "") + '">' + esc(chosen || need) + '</span></div>';
    });
    if (!core.length) h += '<div class="empty"><b>No core yet</b>Open Roster and set a few units to Core.</div>';
    h += '</div>';

    var needs = core.filter(function (u) { return promoItem(u) !== "—" && !r.promos[u.id]; });
    if (needs.length) {
      h += '<div class="sect"><div class="sectH"><h4>Still needs a promotion item</h4></div>';
      needs.forEach(function (u) {
        var low = u.tier === "C" ? ' <span class="tag verify">Tier C</span>' : '';
        h += '<div class="auditRow"><div style="flex:1"><div style="font-size:13px">' + esc(u.name) + low + '</div>' +
          '<div class="tiny muted">' + esc(promoItem(u)) + ' · ' + esc(u.cls) + '</div></div>' +
          '<span class="tag">' + (r.levels[u.id] ? "Lv " + r.levels[u.id] : "—") + '</span></div>';
      });
      h += '</div>';
    }
    var noPromo = core.filter(function (u) { return promoItem(u) !== "—" && !r.promos[u.id] && u.tier === "C"; });
    if (noPromo.length) h += '<div class="small" style="color:#DFAE5C;margin-top:8px">' + esc(noPromo.map(function (u) { return u.name; }).join(", ")) + ' are Tier C — a seal here is a deliberate choice, not an accident.</div>';

    var idx = orderIndex(r.mode, r.chapterId);
    var target = Math.max(1, Math.min(20, Math.round(Math.max(0, idx) * 0.55) + 1));
    if (core.length) {
      h += '<div class="sect"><div class="sectH"><h4>Training · target Lv ' + target + '</h4></div>';
      core.forEach(function (u) {
        var lv = r.levels[u.id];
        var behind = lv && lv < target - 2;
        h += '<div class="auditRow"><div style="flex:1"><div style="font-size:13px">' + esc(u.name) + '</div>' +
          '<div class="tiny muted">' + (lv ? "Lv " + lv : "level not set") + ' · target ' + target + '</div></div>' +
          (behind ? '<span class="tag verify">Behind</span>' : lv ? '<span class="tag rec">On curve</span>' : '<span class="tag">—</span>') + '</div>';
      });
      h += '</div>';
    }

    h += '<div class="sect"><div class="sectH"><h4>Stat boosters</h4></div>';
    BOOSTERS.forEach(function (b) {
      h += '<div class="row" style="padding:7px 0;border-bottom:1px solid var(--line)">' +
        '<div style="flex:1;font-size:13px">' + esc(b) + '</div>' +
        '<select data-booster="' + esc(b) + '" style="min-height:34px;background:var(--surface2);border:1px solid var(--line);color:var(--text);border-radius:8px;padding:0 8px;font:inherit;font-size:12px">' +
        '<option value="">—</option>' +
        core.map(function (u) { return '<option value="' + u.id + '"' + (r.boosters[b] === u.id ? " selected" : "") + '>' + esc(u.name) + '</option>'; }).join("") +
        '</select></div>';
    });
    h += '</div>';
    h += '<div class="small muted" style="margin-top:12px">Not sure who gets what? See Strategy → Stat boosters.</div>';
    return h;
  }

  /* ---------------- audit ---------------- */
  function viewAudit(r) {
    var cur = r.chapterId;
    var missing = [];
    chaptersFor(r.mode).forEach(function (ch) {
      if (!before(r.mode, ch.id, cur)) return;
      branchFilter(ch, r).forEach(function (x) {
        if (isChecked(r, ch, x.i)) return;
        if (["recruit", "chest", "village", "shop", "ruin"].indexOf(x.it.k) < 0) return;
        missing.push({ ch: ch, item: x.it, i: x.i });
      });
    });
    var assumed = [];
    chaptersFor(r.mode).forEach(function (ch) {
      branchFilter(ch, r).forEach(function (x) {
        if (checkState(r, ch, x.i) === "assumed") assumed.push({ ch: ch, item: x.it, i: x.i });
      });
    });
    var lost = chaptersFor(r.mode).filter(function (ch) { return gaidenLost(ch, r); });
    var branchOpen = [];
    if (orderIndex(r.mode, "fourfang") >= 0 && orderIndex(r.mode, r.chapterId) >= orderIndex(r.mode, "fourfang") && !r.branches.fourfang) branchOpen.push({ id: "fourfang", txt: "Geitz / Wallace — decides recruits and villages in Four-Fanged Offense." });
    if (orderIndex(r.mode, "paleflower") >= 0 && orderIndex(r.mode, r.chapterId) >= orderIndex(r.mode, "paleflower") && !r.branches.paleflower) branchOpen.push({ id: "paleflower", txt: "Kenneth / Jerme — decides which version of Pale Flower of Darkness you play." });

    var h = '<div class="kicker">Run check</div><h2 class="title" style="margin-bottom:2px">Up to Ch.' + esc(numFor(chById(cur) || firstChapter(r.mode), r.mode)) + '</h2>' +
      '<p class="muted small" style="margin-bottom:14px">Everything below is either unrecorded or assumed during catch-up. Nothing here is certain — it is a prompt to check your save.</p>';

    h += '<div class="card" style="margin-bottom:12px"><div class="row spread"><div><div class="kicker">Gaps</div><div style="font-size:22px;font-weight:650">' + missing.length + '</div></div>' +
      '<div class="right" style="text-align:right"><div class="kicker">Assumed</div><div style="font-size:22px;font-weight:650">' + assumed.length + '</div></div>' +
      '<div style="text-align:right"><div class="kicker">Lost</div><div style="font-size:22px;font-weight:650;color:var(--danger)">' + lost.length + '</div></div></div></div>';

    if (branchOpen.length) {
      h += '<div class="sect"><div class="sectH"><h4>Open decisions</h4></div>';
      branchOpen.forEach(function (b) {
        h += '<div class="auditRow"><div style="flex:1"><div style="font-size:13.5px">' + esc(b.txt) + '</div></div>' +
          '<button class="btn small go" data-act="branch" data-v="' + b.id + '">Answer</button></div>';
      });
      h += '</div>';
    }

    if (missing.length) {
      h += '<div class="sect"><div class="sectH"><h4>No record</h4></div>';
      missing.slice(0, 20).forEach(function (m, n) {
        h += '<div class="auditRow"><div class="n">' + (n + 1) + '</div><div style="flex:1"><div style="font-size:13.5px">' + esc(m.item.t) + '</div>' +
          '<div class="tiny muted">Ch.' + esc(numFor(m.ch, r.mode)) + ' ' + esc(m.ch.title) + '</div></div>' +
          '<button class="btn ghost small go" data-act="jump" data-id="' + m.ch.id + '">→</button></div>';
      });
      if (missing.length > 20) h += '<div class="small dim" style="padding-top:8px">' + (missing.length - 20) + ' more not shown.</div>';
      h += '</div>';
    }

    if (assumed.length) {
      h += '<div class="sect"><div class="sectH"><h4>Assumed during catch-up</h4></div>' +
        '<div class="small muted" style="margin-bottom:6px">You bulk-marked these. Confirm the ones that matter.</div>';
      assumed.slice(0, 14).forEach(function (m) {
        h += '<div class="auditRow"><div style="flex:1"><div style="font-size:13.5px">' + esc(m.item.t) + '</div>' +
          '<div class="tiny muted">Ch.' + esc(numFor(m.ch, r.mode)) + ' ' + esc(m.ch.title) + '</div></div>' +
          '<button class="btn small go" data-act="confirm" data-ch="' + m.ch.id + '" data-i="' + m.i + '">Confirm</button>' +
          '<button class="btn ghost small go" data-act="reject" data-ch="' + m.ch.id + '" data-i="' + m.i + '">No</button></div>';
      });
      if (assumed.length > 14) h += '<div class="small dim" style="padding-top:8px">' + (assumed.length - 14) + ' more.</div>';
      h += '</div>';
    }

    if (lost.length) {
      h += '<div class="sect"><div class="sectH"><h4>Lost</h4></div>';
      lost.forEach(function (ch) {
        var b = ch.base ? chById(ch.base) : null;
        var why = b && b.turn
          ? "Turn " + r.turns[b.id] + " of " + b.turn.limit + " — this side quest is gone."
          : (ch.req || "");
        h += '<div class="auditRow"><div style="flex:1"><div style="font-size:13.5px;color:#F0A3A3">' + esc(numFor(ch, r.mode)) + ' ' + esc(ch.title) + '</div>' +
          '<div class="tiny muted">' + esc(why) + '</div></div>' +
          '<button class="btn ghost small go" data-act="jump" data-id="' + ch.id + '">→</button></div>';
      });
      h += '</div>';
    }

    if (!missing.length && !assumed.length && !lost.length && !branchOpen.length) {
      h += '<div class="empty"><b>Nothing flagged</b>Either you are perfect or you have not ticked much yet.</div>';
    }
    return h;
  }

  /* ---------------- search ---------------- */
  function viewSearch(r) {
    var q = (state.ui.search || "").trim().toLowerCase();
    var h = '<div class="kicker">Search</div><h2 class="title" style="margin-bottom:10px">Find anything</h2>' +
      '<input class="search" id="q" placeholder="Knight Crest, Canas, secret shop…" value="' + esc(q) + '" autocomplete="off">';
    if (!q) return h + '<div class="empty" style="padding-top:26px"><b>Type to search</b>Items, chapters, units, supports.</div>';

    var res = [];
    chaptersFor(r.mode).forEach(function (ch) {
      if ((ch.title + " " + ch.num + " " + ch.obj).toLowerCase().indexOf(q) >= 0) res.push({ t: "Ch." + numFor(ch, r.mode) + " " + ch.title, s: ch.obj, ch: ch });
      if (ch.lore && (ch.title + " " + ch.lore).toLowerCase().indexOf(q) >= 0) res.push({ t: "Lore — " + ch.title, s: "Chapter lore", ch: ch, jump: true });
      (ch.talks || []).forEach(function (t) {
        if ((t.who + " " + (t.sum || "") + " " + (t.trig || "")).toLowerCase().indexOf(q) >= 0) {
          res.push({ t: "Talk — " + t.who, s: "Ch." + numFor(ch, r.mode) + " · " + (TALK_LABEL[t.k] || t.k), ch: ch, jump: true });
        }
      });
      branchFilter(ch, r).forEach(function (x) {
        if ((x.it.t + " " + (x.it.d || "")).toLowerCase().indexOf(q) >= 0) res.push({ t: x.it.t, s: "Ch." + numFor(ch, r.mode) + " · " + (KIND_LABEL[x.it.k] || x.it.k), ch: ch });
      });
    });
    DATA.units.forEach(function (u) {
      if ((u.name + " " + u.cls + " " + u.note + " " + (u.bio || "")).toLowerCase().indexOf(q) >= 0) res.push({ t: u.name, s: u.cls + " · " + u.tier + "-tier", unit: u });
    });

    h += '<div style="margin-top:12px">';
    if (!res.length) h += '<div class="empty"><b>No match</b>Try a shorter word.</div>';
    res.slice(0, 40).forEach(function (x) {
      var act = x.unit ? "unit" : x.jump ? "jump-open" : "jump";
      h += '<div class="res row" data-act="' + act + '" ' + (x.unit ? 'data-u="' + x.unit.id + '"' : 'data-id="' + x.ch.id + '"') + '>' +
        '<div style="flex:1"><div style="font-size:13.5px">' + esc(x.t) + '</div><div class="tiny muted">' + esc(x.s) + '</div></div><span class="dim">→</span></div>';
    });
    h += '</div>';
    return h;
  }

  /* ---------------- more ---------------- */
  function viewMore(r) {
    var items = [["recruits", "Recruits"], ["items", "Items"], ["gaidens", "Gaidens"], ["search", "Search"], ["exploits", "Exploits"], ["strategy", "Strategy"]];
    var h = '<div class="kicker">More</div><h2 class="title" style="margin-bottom:12px">Reference</h2><div class="ulist">';
    items.forEach(function (x) {
      h += '<button class="u" style="width:100%;text-align:left" data-act="tab" data-v="' + x[0] + '">' +
        '<div style="flex:1"><div class="nm">' + x[1] + '</div></div><span class="dim">→</span></button>';
    });
    h += '<button class="u" style="width:100%;text-align:left" data-act="open-settings">' +
      '<div style="flex:1"><div class="nm">Settings</div></div><span class="dim">→</span></button>';
    h += '</div>';
    return h;
  }


  function viewStrategy() {
    var s = DATA.strategy;
    var h = '<div class="strat"><div class="kicker">Strategy</div><h2 class="title">How to play it well</h2>' +
      '<p class="muted small">Efficiency and reliability, not turn-count perfection. Highest difficulty assumed.</p>';

    h += '<h3>Max-content route</h3><ol>' + s.route.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ol>';

    h += '<h3>Tier list</h3><p class="small dim">' + esc(s.tiersNote) + '</p>';
    ["S", "A", "B", "C"].forEach(function (k) {
      h += '<div class="tierRow"><div class="k">' + k + '</div><div style="flex:1;font-size:13.5px">' + esc(s.tiers[k].join(", ")) + '</div></div>';
    });

    h += '<h3>Promotion items</h3><table class="plain"><thead><tr><th>Item</th><th>Promotes</th><th>Into</th></tr></thead><tbody>';
    s.promotions.forEach(function (p) { h += '<tr><td>' + esc(p.item) + '</td><td>' + esc(p.units) + '</td><td>' + esc(p.to) + '</td></tr>'; });
    h += '</tbody></table>';

    h += '<h3>Stat boosters</h3><table class="plain"><thead><tr><th>Item</th><th>Effect</th><th>Best on</th></tr></thead><tbody>';
    s.boosters.forEach(function (b) { h += '<tr><td>' + esc(b.item) + '</td><td>' + esc(b.effect) + '</td><td>' + esc(b.best) + '</td></tr>'; });
    h += '</tbody></table>';

    h += '<h3>Mechanics that actually decide maps</h3>';
    s.mechanics.forEach(function (m) { h += '<p><b style="color:var(--text)">' + esc(m.h) + '.</b> ' + esc(m.p) + '</p>'; });

    h += '<h3>Mistakes to avoid</h3><ul>' +
      (DATA.id === "fe8"
        ? "<li>Ignoring Seth. He can carry the first ten chapters almost alone.</li>" +
          "<li>Skipping the villages in Ch.5 — the Guiding Ring needs all four.</li>" +
          "<li>Paying 9,980G to Eirika's Rennac instead of talking with L'Arachel.</li>" +
          "<li>Forgetting the sand items in Ch.15. Warp and the Silver Card are buried there.</li>" +
          "<li>Letting civilians die in Ch.6 or Ch.17 and losing the reward.</li>" +
          "<li>Promoting a trainee before level 10, or forgetting they promote twice.</li>"
        : "<li>Benching Marcus because he is pre-promoted. He is your best unit for ten chapters.</li>" +
          "<li>Training everyone. Pick 10–12 and feed them.</li>" +
          "<li>Using steel and silver for everything. Iron is accurate and cheap.</li>" +
          "<li>Ignoring weapon weight — it silently removes your doubles.</li>" +
          "<li>Letting a thief leave with the Member Card, a promotion seal, or a chest item.</li>" +
          "<li>Killing a recruitable enemy before checking the recruit list.</li>" +
          "<li>Rushing the turn-limited chapters without checking the timer.</li>") +
      '</ul></div>';
    return h;
  }

  /* ---------------- exploits ---------------- */
  function riskClass(r) {
    var s = String(r || "").toLowerCase();
    if (s === "high") return "high";
    if (s === "medium") return "medium";
    if (s === "low") return "low";
    return "none";
  }
  function exploitCard(e) {
    var h = '<div class="exCard"><div class="row spread" style="align-items:flex-start">' +
      '<div><h3>' + esc(e.name) + '</h3><div class="tiny muted">' + esc(e.what) + '</div></div>' +
      '<span class="risk ' + riskClass(e.risk) + '">' + esc(e.risk || "none") + '</span></div>';
    if (e.steps && e.steps.length) {
      h += '<ol>' + e.steps.map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + '</ol>';
    }
    if (e.warn) h += '<div class="warn">⚠ ' + esc(e.warn) + '</div>';
    if (e.video) h += '<div style="margin-top:8px"><a class="tiny" href="' + esc(e.video) + '" target="_blank" rel="noopener">Watch a demonstration →</a></div>';
    h += '</div>';
    return h;
  }
  function viewExploits(r) {
    var list = DATA.exploits || [];
    var f = state.ui.exFilter || "all";
    var shown = list.filter(function (e) {
      if (f === "tactic") return e.cat === "tactic";
      if (f === "glitch") return e.cat !== "tactic";
      if (f === "emulator") return e.cat === "emulator";
      return true;
    });
    var h = '<div class="kicker">Exploits</div><h2 class="title" style="margin-bottom:2px">' + esc(DATA.short) + ' cheese</h2>' +
      '<p class="muted small" style="margin-bottom:12px">Legal tactics and genuine glitches, separated. Risk ratings are about your save, not your honour.</p>';
    h += '<div class="filters">' +
      [["all", "All"], ["tactic", "Legit tactics"], ["glitch", "Glitches"], ["emulator", "Emulator"]].map(function (x) {
        return '<button class="' + (f === x[0] ? "on" : "") + '" data-act="ex-filter" data-v="' + x[0] + '">' + x[1] + '</button>';
      }).join("") + '</div>';
    if (!shown.length) return h + '<div class="empty"><b>Nothing here</b>Try another filter.</div>';
    var tactics = shown.filter(function (e) { return e.cat === "tactic"; });
    var glitches = shown.filter(function (e) { return e.cat !== "tactic"; });
    if (tactics.length) {
      h += '<div class="sect"><div class="sectH"><h4>Legit but optimal</h4></div>';
      tactics.forEach(function (e) { h += exploitCard(e); });
      h += '</div>';
    }
    if (glitches.length) {
      h += '<div class="sect"><div class="sectH"><h4>Glitches &amp; emulator tricks</h4></div>';
      glitches.forEach(function (e) { h += exploitCard(e); });
      h += '</div>';
    }
    return h;
  }
  function exploitSheet(i) {
    var e = (DATA.exploits || [])[i];
    if (!e) return;
    openSheet(e.name, '<div class="stack">' + exploitCard(e) + '</div>');
  }

  /* ---------------- talks & lore ---------------- */
  var TALK_LABEL = { recruit: "Recruit", npc: "NPC", unit: "Unit", boss: "Boss", event: "Event", death: "Death" };

  function applyLore(game, lore, unitLore) {
    if (!game) return;
    var chapters = (game.chapters || []).concat(game.dungeons || []);
    chapters.forEach(function (c) {
      var x = lore && lore[c.id];
      if (!x) return;
      if (x.lore) c.lore = x.lore;
      if (x.talks) c.talks = x.talks;
      if (x.trivia) c.trivia = x.trivia;
    });
    if (unitLore) (game.units || []).forEach(function (u) {
      var x = unitLore[u.id];
      if (x) { if (x.bio) u.bio = x.bio; if (x.death) u.death = x.death; if (x.endings) u.endings = x.endings; if (x.theme) u.theme = x.theme; }
    });
  }

  function applyPlans(game, plans) {
    if (!game || !plans) return;
    (game.chapters || []).concat(game.dungeons || []).forEach(function (c) {
      if (plans[c.id]) c.plan = plans[c.id];
    });
  }

  function visibleTalks(ch) {
    if (!state.settings.spoilers) return [];
    return (ch.talks || []).filter(function (t) {
      if (t.k === "boss" && !state.settings.boss) return false;
      if (t.k === "death" && !state.settings.death) return false;
      return true;
    });
  }

  function renderTalks(ch) {
    var talks = visibleTalks(ch);
    if (!talks.length) return "";
    var groups = {};
    talks.forEach(function (t, i) { (groups[t.k] = groups[t.k] || []).push({ t: t, i: i }); });
    var h = '<details class="loreBox"' + (state.ui.openTalks === ch.id ? " open" : "") + '><summary class="loreSum">Talks &amp; events · ' + talks.length + '</summary>';
    ["recruit", "npc", "unit", "boss", "event", "death"].forEach(function (k) {
      if (!groups[k]) return;
      h += '<div class="talkGroup"><div class="talkH">' + esc(TALK_LABEL[k] || k) + '</div>';
      groups[k].forEach(function (g) {
        var t = g.t;
        var seen = run() && run().seen && run().seen[ch.id + ":" + g.i];
        h += '<div class="talkRow"><button class="talkTick' + (seen ? " on" : "") + '" data-act="seen" data-ch="' + ch.id + '" data-i="' + g.i + '" aria-label="Mark seen">' + (seen ? "✓" : "○") + '</button>' +
          '<div style="flex:1"><div class="talkWho">' + esc(t.who) + (t.miss ? ' <span class="tag miss">Missable</span>' : "") + (t.verify ? ' <span class="tag verify">Verify</span>' : "") + '</div>' +
          (t.sum ? '<div class="talkSum">' + esc(t.sum) + '</div>' : "") +
          (t.trig ? '<div class="talkTrig">' + esc(t.trig) + '</div>' : "") +
          '</div></div>';
      });
      h += '</div>';
    });
    h += '</details>';
    return h;
  }

  function rosterWarnings(ch, r) {
    var out = [];
    var text = [ch.obj, ch.brief, ch.deploy, (ch.warnings || []).join(" "), ch.plan ? JSON.stringify(ch.plan) : ""].join(" ");
    DATA.units.forEach(function (u) {
      if (r.roster[u.id] === "dead" && text.indexOf(u.name) >= 0) out.push(u.name + " is dead — steps naming them are unavailable.");
    });
    var thieves = DATA.units.filter(function (u) { return /thief|rogue|assassin/i.test(u.cls); });
    var aliveThieves = thieves.filter(function (u) { return r.roster[u.id] === "core" || r.roster[u.id] === "bench"; });
    if ((ch.items || []).some(function (i) { return i.k === "chest"; }) && !aliveThieves.length) {
      out.push("This chapter has chests and no thief is in your roster. " + (thieves.length ? "Available: " + thieves.map(function (u) { return u.name; }).join(", ") + "." : ""));
    }
    if (/healer|staff/i.test(text) && !DATA.units.some(function (u) { return /cleric|priest|troubadour|monk|mage|shaman/i.test(u.cls) && (r.roster[u.id] === "core" || r.roster[u.id] === "bench"); })) {
      out.push("The plan assumes healing and no staff unit is in your roster.");
    }
    return out;
  }

  function stealsFor(ch) {
    return (ch.items || []).filter(function (it) { return /steal/i.test(it.d || ""); });
  }
  function isKeyItem(t) { return /seal|card|boots|crest|ring|whip|bolt|contract|robe|drops|gem|shield|tome|staff|book|icon|wings|talisman/i.test(t); }
  function isRareItem(t) { return /killer|silver|brave|rune|regal|divine|aura|luce|excalibur|gespenst|basilikos|rex hasta|rienfleche|sol katti|durandal|armads|forblaze|aureola|legendary/i.test(t); }
  function isPriorityItem(t) { return isKeyItem(t) || isRareItem(t); }

  function deriveBring(ch) {
    var out = ["Healer"];
    if ((ch.items || []).some(function (i) { return i.k === "chest"; })) out.push("Thief + Chest Keys");
    if ((ch.items || []).some(function (i) { return i.k === "village"; })) out.push("Mounted units for villages");
    if ((ch.items || []).some(function (i) { return i.k === "shop"; })) out.push("Member Card");
    if (ch.turn && ch.turn.limit) out.push("Fast units — turn limit");
    return out.join(" · ");
  }
  function deriveSteps(ch, r) {
    var s = [];
    if (ch.obj) s.push("Objective: " + ch.obj + ".");
    if (ch.side && (!ch.side.mode || ch.side.mode === r.mode)) s.push("Unlock " + ch.side.title + " — " + ch.side.req);
    if (turnLimitApplies(ch, r)) s.push(ch.turn.label || ("Finish within " + ch.turn.limit + " turns."));
    if ((ch.items || []).some(function (i) { return i.k === "chest"; })) s.push("Open every chest before you kill the boss.");
    if ((ch.items || []).some(function (i) { return i.k === "village"; })) s.push("Reach the villages before enemy thieves or the boss trigger the end.");
    if (ch.branch) s.push("Record the branch decision so the checklist matches your map.");
    return s;
  }
  function deriveBoss(ch) {
    var drop = (ch.items || []).filter(function (i) { return /^Dropped by/i.test(i.d || ""); })[0];
    if (!drop) return "";
    return "Boss drop: " + drop.t + " — " + drop.d + ".";
  }
  function planFor(ch, r) {
    var p = ch.plan || {};
    return {
      style: "completionist",
      styleNote: p.completionist || "Completionist: every village, chest, recruit, steal and side objective before you close the chapter.",
      deploy: p.deploy || ch.deploy || "",
      bring: p.bring || deriveBring(ch),
      steps: p.steps || deriveSteps(ch, r),
      threats: p.threats || ch.warnings || [],
      boss: p.boss || deriveBoss(ch),
      exp: p.exp || "",
      fallback: p.fallback || ""
    };
  }

  function fullClearList(ch, r) {
    var kinds = { village: "Villages", chest: "Chests", recruit: "Recruits", item: "Found", ruin: "Ruins", shop: "Shops" };
    var groups = {};
    branchFilter(ch, r).forEach(function (x) {
      if (!kinds[x.it.k]) return;
      (groups[x.it.k] = groups[x.it.k] || []).push({ it: x.it, i: x.i });
    });
    return groups;
  }

  function recommendSupportPairs(r, limit) {
    var list = supportsFor();
    var roster = Object.keys(r.roster).filter(function (k) { return r.roster[k] === "core" || r.roster[k] === "bench"; });
    var useRoster = roster.length > 0;
    var out = [];
    list.forEach(function (p) {
      var a = unitById(p.a), b = unitById(p.b);
      if (!a || !b) return;
      if (useRoster && (roster.indexOf(p.a) < 0 || roster.indexOf(p.b) < 0)) return;
      if (!useRoster && !((a.tier === "S" || a.tier === "A") && (b.tier === "S" || b.tier === "A"))) return;
      if (r.supports && r.supports[pairKey(p.a, p.b)]) return;
      var score = (4 - "SABC".indexOf(a.tier)) + (4 - "SABC".indexOf(b.tier));
      out.push({ a: a, b: b, score: score });
    });
    out.sort(function (x, y) { return y.score - x.score; });
    return out.slice(0, limit || 6);
  }


  function supportIdeas(r) {
    var roster = Object.keys(r.roster).filter(function (k) { return r.roster[k] === "core" || r.roster[k] === "bench"; });
    if (roster.length < 2) return [];
    var out = [];
    var list = supportsFor();
    for (var i = 0; i < list.length && out.length < 2; i++) {
      var p = list[i];
      if (roster.indexOf(p.a) < 0 || roster.indexOf(p.b) < 0) continue;
      if (r.supports && r.supports[pairKey(p.a, p.b)]) continue;
      var ua = unitById(p.a), ub = unitById(p.b);
      if (ua && ub) out.push(ua.name + " × " + ub.name);
    }
    return out;
  }

  function renderPlan(ch, r) {
    if (!state.settings.spoilers || !state.settings.plans) {
      return '<div class="planBlock"><div class="loreBody"><p class="dim" style="margin:0">Spoilers hidden — turn them on in Settings to show the optimal plan.</p></div></div>';
    }
    if (!ch.obj && !ch.items.length) return "";
    var p = planFor(ch, r);
    var h = '<div class="planBlock"><div class="planHead">Optimal plan · Completionist</div><div class="loreBody">';
    if (p.styleNote) h += '<p class="planStyle">' + esc(p.styleNote) + '</p>';
    var groups = fullClearList(ch, r);
    var groupKeys = Object.keys(groups);
    if (groupKeys.length) {
      h += '<div class="planSec"><b>Full clear</b><ul>';
      groupKeys.forEach(function (k) {
        groups[k].forEach(function (x) {
          var done = isChecked(r, ch, x.i);
          h += '<li>' + (done ? "✓ " : "○ ") + '<span class="dim">' + esc(({ village: "Village", chest: "Chest", recruit: "Recruit", item: "Found", ruin: "Ruins", shop: "Shop" })[k]) + ':</span> ' + esc(x.it.t) + '</li>';
        });
      });
      h += '</ul></div>';
    }
    if (p.deploy) h += '<p><b>Deploy:</b> ' + esc(p.deploy) + '</p>';
    if (p.bring) h += '<p><b>Bring:</b> ' + esc(p.bring) + '</p>';
    if (p.steps && p.steps.length) {
      h += '<div class="planSec"><b>Steps</b><ol>' + p.steps.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ol></div>';
    }
    if (p.threats && p.threats.length) {
      h += '<div class="planSec"><b>Threats</b><ul>' + p.threats.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + '</ul></div>';
    }
    if (p.boss) h += '<p><b>Boss:</b> ' + esc(p.boss) + '</p>';
    if (p.exp) h += '<p><b>EXP:</b> ' + esc(p.exp) + '</p>';
    var ci = orderIndex(r.mode, ch.id);
    if (ci >= 0 && r.team && r.team.length) {
      var lvlTarget = Math.max(1, Math.min(20, Math.round(ci * 0.55) + 1));
      h += '<p><b>Training:</b> keep your core within 2 levels of Lv ' + lvlTarget + '.</p>';
    }
    var priorities = branchFilter(ch, r).filter(function (x) { return isKeyItem(x.it.t) && !isChecked(r, ch, x.i); }).map(function (x) { return x.it.t; });
    if (priorities.length) h += '<p><b>Priorities:</b> ' + esc(priorities.slice(0, 6).join(" · ")) + '</p>';
    if (turnLimitApplies(ch, r)) {
      h += '<p><b>Turn target:</b> ' + esc("finish within " + ch.turn.limit + " turns for " + ch.turn.unlocks + ".") + '</p>';
    } else {
      h += '<p><b>Turn target:</b> no deadline on this map.</p>';
    }
    var ideas = supportIdeas(r);
    if (ideas.length) h += '<p><b>Supports to build:</b> ' + esc(ideas.join(" · ")) + '</p>';
    var st = stealsFor(ch);
    var sd = ((window.STEALDATA || {})[DATA.id === "fe8" ? "fe8" : "fe7"] || {})[ch.id] || [];
    if (state.settings.steals && sd.length) {
      var sorted = sd.slice().sort(function (a, b) {
        var ap = a.items.some(isPriorityItem) ? 0 : 1, bp = b.items.some(isPriorityItem) ? 0 : 1;
        if (ap !== bp) return ap - bp;
        return (a.spd || 99) - (b.spd || 99);
      });
      h += '<div class="planSec"><b>Steal before you kill · ' + sd.length + ' carrier' + (sd.length === 1 ? "" : "s") + '</b>' +
        '<div class="tiny muted" style="margin:2px 0 5px">Enemy Speed is listed. Your thief needs a higher Speed and enough Constitution for the item weight.</div><ul>';
      sorted.slice(0, 12).forEach(function (e) {
        h += '<li><b>' + esc(e.n) + '</b> <span class="dim">' + esc(e.c) + '</span>' +
          (e.spd !== null ? ' · Spd ' + e.spd : "") + ' — ' + esc(e.items.join(", ")) +
          (e.items.some(isPriorityItem) ? ' <span class="tag miss">Priority</span>' : '') + '</li>';
      });
      if (sorted.length > 12) h += '<li class="dim">…and ' + (sorted.length - 12) + ' more carriers.</li>';
      h += '</ul></div>';
    } else if (state.settings.steals && st.length) {
      h += '<div class="planSec"><b>Steal before you kill</b><div class="tiny muted" style="margin:2px 0 5px">Steal works when your Speed is higher than the target\'s and your Constitution covers the item\'s weight. Promoted thieves count.</div><ul>';
      st.forEach(function (it) {
        h += '<li>' + esc(it.t) + ' — ' + esc(it.d.replace(/^Steal from\s*/i, "from ")) + (isKeyItem(it.t) ? ' <span class="tag miss">Priority</span>' : '') + '</li>';
      });
      h += '</ul></div>';
    }
    if (p.fallback) h += '<p><b>If it goes wrong:</b> ' + esc(p.fallback) + '</p>';
    h += '</div></div>';
    return h;
  }

  function renderFullClear(ch, r) {
    var kinds = { village: "Village", chest: "Chest", recruit: "Recruit", item: "Found", ruin: "Ruins", shop: "Shop" };
    var items = branchFilter(ch, r).filter(function (x) { return kinds[x.it.k]; });
    if (!items.length) return "";
    var h = '<div class="sect"><div class="sectH"><h4>Full clear · ' + items.length + '</h4></div><ul class="fcList">';
    items.forEach(function (x) {
      var rec = x.it.k === "recruit" && unitsForItem(x.it).length
        ? ' <button class="btn ghost tiny" data-act="recruit-now" data-ch="' + ch.id + '" data-i="' + x.i + '">Recruited</button>'
        : "";
      h += '<li><span class="tag">' + esc(kinds[x.it.k]) + '</span> <span>' + esc(x.it.t) + '</span>' + rec + '</li>';
    });
    h += '</ul></div>';
    return h;
  }


  function renderLore(ch) {
    if (!state.settings.spoilers) return "";
    var h = "";
    if (ch.lore && state.settings.lore) {
      h += '<details class="loreBox"' + (state.ui.openLore === ch.id ? " open" : "") + '><summary class="loreSum">Lore</summary>' +
        '<div class="loreBody">' + ch.lore.split(/\n\n+/).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div></details>';
    }
    if (ch.trivia) {
      h += '<details class="loreBox"><summary class="loreSum">Did you know</summary><div class="loreBody"><p>' + esc(ch.trivia) + '</p></div></details>';
    }
    return h;
  }


  function openSheet(title, body) {
    document.getElementById("sheetTitle").textContent = title;
    document.getElementById("sheetBody").innerHTML = body;
    sheet.hidden = false;
    document.body.classList.add("sheet-open");
  }
  function closeSheet() {
    sheet.hidden = true;
    document.body.classList.remove("sheet-open");
  }

  function settingsSheet() {
    var s = state.settings;
    var body = '<div class="stack"><p class="small muted" style="margin:0">Global settings — one set for every run and both games.</p>' +
      '<button class="btn ' + (s.spoilers ? "gold" : "") + ' wide" data-act="toggle-setting" data-v="spoilers">Spoilers: ' + (s.spoilers ? "Open" : "Hidden") + '</button>' +
      '<div class="kicker" style="margin-top:10px">Advanced</div>' +
      '<div class="row wrap" style="gap:6px">' +
      [["lore", "Lore"], ["boss", "Boss quotes"], ["death", "Death quotes"], ["endings", "Endings"], ["plans", "Optimal plans"], ["steals", "Steal list"]].map(function (x) {
        var on = s[x[0]] && s.spoilers;
        return '<button class="btn ' + (on ? "gold" : "") + '" data-act="toggle-setting" data-v="' + x[0] + '"' + (s.spoilers ? "" : ' style="opacity:.45"') + '>' + x[1] + ': ' + (s[x[0]] ? "On" : "Off") + '</button>';
      }).join("") + '</div></div>';
    openSheet("Settings", body);
  }

  function runSheet() {
    var r = run();
    var body = "";
    if (r) {
      body += '<div class="stack">' +
        '<div><div class="kicker">Current run</div><div style="font-size:16px;font-weight:600">' + esc(r.name) + '</div>' +
        '<div class="small muted">' + esc(modeName(r.mode)) + ' · ' + esc(r.diff) + ' · started ' + new Date(r.created).toLocaleDateString() + '</div></div>' +
        '<div class="row" style="gap:8px"><button class="btn" data-act="rename-run" style="flex:1">Rename</button>' +
        '<button class="btn danger" data-act="delete-run">Delete</button></div>' +
        '<hr class="sep">' +
        '<div class="kicker">Switch run</div>';
      state.runs.forEach(function (x) {
        body += '<button class="btn wide" style="justify-content:space-between" data-act="switch-run" data-id="' + x.id + '">' +
          '<span>' + esc(x.name) + '</span><span class="tiny dim">' + esc(modeName(x.mode)) + '</span></button>';
      });
      body += '<hr class="sep"><button class="btn gold wide" data-act="new-run">New run</button>' +
        '<button class="btn wide" data-act="open-settings" style="margin-top:8px">Settings</button>' +
        '<div class="row" style="gap:8px;margin-top:10px"><button class="btn wide" data-act="export">Export</button><button class="btn wide" data-act="import">Import</button></div>' +
        '<p class="tiny dim">Export writes a JSON file of every run. Import replaces everything on this device.</p>' +
        '</div>';
    } else {
      body = '<button class="btn gold wide" data-act="new-run">New run</button>';
    }
    openSheet("Runs", body);
  }

  function newRunSheet() {
    var dm = DATA.id === "fe8" ? "eirika" : "eliwood";
    openSheet("New run",
      '<div class="stack">' +
      '<div class="tiny muted">' + esc(DATA.title) + '</div>' +
      '<div><div class="kicker">Name</div><input class="search" id="nName" value="' + esc(DATA.short + " " + (DATA.id === "fe8" ? "Eirika" : "Eliwood")) + '"></div>' +
      '<div class="row" style="gap:8px"><div style="flex:1"><div class="kicker">Mode</div>' +
      '<select class="search" id="nMode">' + DATA.modes.map(function (m) { return '<option value="' + m.id + '"' + ((state.ui.lastMode || dm) === m.id ? " selected" : "") + '>' + m.name + '</option>'; }).join("") + '</select></div>' +
      '<div style="width:120px"><div class="kicker">Difficulty</div><select class="search" id="nDiff"><option>Normal</option><option>Hard</option></select></div></div>' +
      '<button class="btn gold wide" data-act="create-run">Create</button></div>');
  }

  function recruitSheet(units) {
    var r = run();
    pendingRecruit = units.map(function (u) { return u.id; });
    var rows = units.map(function (u) {
      var cur = r.roster[u.id] || "";
      return '<div class="row" style="gap:8px;padding:8px 0;border-bottom:1px solid var(--line)">' +
        '<div style="flex:1"><div style="font-size:13.5px;font-weight:600">' + esc(u.name) + '</div>' +
        (cur ? '<div class="tiny" style="color:#DFAE5C">Currently ' + esc(cur) + '</div>' : '<div class="tiny dim">New</div>') + '</div>' +
        '<input class="lvlInput" type="number" min="1" max="20" placeholder="Lv" data-rlvl="' + u.id + '">' +
        '<select data-rstatus="' + u.id + '" style="min-height:36px;background:var(--surface2);border:1px solid var(--line);color:var(--text);border-radius:8px;padding:0 8px;font:inherit;font-size:12px">' +
        (cur ? '<option value="keep" selected>Keep ' + esc(cur) + '</option>' : '') +
        '<option value="bench"' + (!cur ? " selected" : "") + '>Bench</option>' +
        '<option value="core">Core</option>' +
        '<option value="dead">Dead</option>' +
        '</select></div>';
    }).join("");
    openSheet("Recruited",
      '<div class="stack"><p class="small muted" style="margin:0">' + units.length + ' unit' + (units.length === 1 ? "" : "s") + '. They go to the bench unless you choose otherwise.</p>' +
      rows +
      '<button class="btn gold wide" data-act="apply-recruit">Add to roster</button></div>');
  }


  function unitSheet(id) {
    var r = run();
    var u = unitById(id);
    if (!r || !u) return;
    var st = r.roster[u.id] || "";
    var body = '<div class="stack">' +
      '<div><div class="kicker">' + esc(u.tier) + '-tier · ' + esc(u.cls) + '</div>' +
      '<h3 style="font-size:19px;margin:2px 0 4px">' + esc(u.name) + '</h3>' +
      '<div class="small muted">Joins: ' + esc(u.join) + (u.aff && u.aff !== "—" ? " · Affinity: " + esc(u.aff) : "") + '</div></div>' +
      (u.bio ? '<p class="bioText">' + esc(u.bio) + '</p>' : "") +
      '<p style="font-size:13.5px;color:#C9D0DB">' + esc(u.note) + '</p>' +
      '<div class="card" style="background:var(--surface2)"><div class="kicker">Build</div><div class="small" style="margin-top:4px">' + esc(u.build) + '</div></div>' +
      '<div class="row" style="gap:10px;align-items:center"><div><div class="kicker">Level</div>' +
      '<input class="lvlInput" type="number" min="1" max="20" data-lvl="' + u.id + '" value="' + (r.levels[u.id] || "") + '"></div>' +
      '<div style="flex:1"><div class="kicker">Status</div>' +
      '<div class="row wrap" style="gap:6px">' +
      [["core", "Core"], ["bench", "Bench"], ["dead", "Dead"], ["", "Clear"]].map(function (x) {
        return '<button class="btn ' + (st === x[0] ? "gold" : "") + '" data-act="set-roster" data-u="' + u.id + '" data-v="' + x[0] + '">' + x[1] + '</button>';
      }).join("") + '</div></div></div>';
    var promos = (u.promos && u.promos.length) ? u.promos : (u.cls.indexOf("→") >= 0 ? [u.cls.split("→")[1].trim()] : []);
    if (promos.length) {
      body += '<div><div class="kicker" style="margin-bottom:5px">Promotion branch</div><div class="row wrap" style="gap:6px">' +
        promos.map(function (p) {
          return '<button class="btn ' + (r.promos[u.id] === p ? "gold" : "") + '" data-act="set-promo" data-u="' + u.id + '" data-v="' + esc(p) + '">' + esc(p) + '</button>';
        }).join("") + '</div>';
      var table = (window.PROMO && window.PROMO[DATA.id]) || {};
      body += '<div class="promoGains">' + promos.map(function (p) {
        var key = p.replace(/\s*\(.*\)$/, "");
        var info = table[key];
        var caps = ((window.CAPDATA || {})[DATA.id] || {})[key];
        if (!caps && key === "Wyvern Knight") caps = ((window.CAPDATA || {})[DATA.id] || {})["Wyvern Knight (The Sacred Stones)"];
        var capText = "";
        if (caps) {
          var parts = [];
          ["hp", "str", "skl", "spd", "luck", "def", "res"].forEach(function (k) {
            if (caps[k] !== undefined) parts.push(({ hp: "HP", str: "Str", skl: "Skl", spd: "Spd", luck: "Lck", def: "Def", res: "Res" })[k] + " " + caps[k]);
          });
          if (parts.length) capText = ' · Caps: ' + parts.join(" / ");
        }
        return '<div class="tiny muted"><b style="color:var(--text)">' + esc(p) + '</b>' + (info ? ' · ' + esc(info.g) + (info.w ? ' · ' + esc(info.w) : '') : '') + esc(capText) + '</div>';
      }).join("") + '</div>';
      if (/Journeyman|Recruit|Pupil/.test(u.cls)) {
        body += '<div class="small" style="color:#DFAE5C;margin-top:4px">Trainee: first promotion at level 10 (trainee seal or automatic), then a normal seal at level 10+.</div>';
      }
    }
    if (u.death) {
      body += '<details class="loreBox"><summary class="loreSum">Death quote</summary><div class="loreBody"><p>' + esc(u.death) + '</p></div></details>';
    }
    if (u.endings && u.endings.length && state.settings.spoilers && state.settings.endings) {
      body += '<details class="loreBox"><summary class="loreSum">Paired endings · ' + u.endings.length + '</summary><div class="loreBody">' +
        u.endings.map(function (e) { return "<p>" + esc(e) + "</p>"; }).join("") + '</div></details>';
    }
    body += '</div>';
    openSheet(u.name, body);
  }

  function pairSheet(a, b) {
    var r = run();
    var p = findPair(a, b);
    if (!r || !p) return;
    r.supports = r.supports || {};
    var ua = unitById(a), ub = unitById(b);
    var key = pairKey(a, b);
    var rank = r.supports[key] || 0;
    var b1 = supportBonus(ua.aff, ub.aff, 1);
    var b3 = supportBonus(ua.aff, ub.aff, 3);
    var body = '<div class="stack">' +
      '<div><div class="kicker">Support</div><h3 style="font-size:18px;margin:2px 0 4px">' + esc(ua.name) + " × " + esc(ub.name) + '</h3>' +
      '<div class="small muted">Starts at ' + p.start + ' points · +' + p.growth + ' per turn adjacent · C 80 / B 160 / A 240</div></div>' +
      ((ua.theme || ub.theme) ? '<div class="small" style="color:#C9D0DB">' +
        (ua.theme ? '<div><b>' + esc(ua.name) + ':</b> ' + esc(ua.theme) + '</div>' : '') +
        (ub.theme ? '<div><b>' + esc(ub.name) + ':</b> ' + esc(ub.theme) + '</div>' : '') + '</div>' : '') +
      '<div class="card" style="background:var(--surface2)"><div class="kicker">Bonuses</div>' +
      '<div class="small" style="margin-top:4px">C: ' + fmtBonus(b1) + '</div>' +
      '<div class="small">A: ' + fmtBonus(b3) + '</div></div>' +
      '<div class="kicker">Rank</div>' +
      '<div class="row wrap" style="gap:6px">' +
      [[1, "C"], [2, "B"], [3, "A"], [0, "Clear"]].map(function (x) {
        return '<button class="btn ' + (rank === x[0] ? "gold" : "") + '" data-act="set-rank" data-a="' + a + '" data-b="' + b + '" data-r="' + x[0] + '">' + x[1] + '</button>';
      }).join("") + '</div>' +
      '<div class="small muted">' + esc(ua.name) + ': ' + levelsUsed(r, a) + '/5 levels used. ' + esc(ub.name) + ': ' + levelsUsed(r, b) + '/5.</div>' +
      '</div>';
    openSheet("Support", body);
  }
  function fmtBonus(b) {
    var out = [];
    if (b.atk) out.push("Atk +" + Math.floor(b.atk));
    if (b.def) out.push("Def +" + Math.floor(b.def));
    if (b.hit) out.push("Hit +" + Math.floor(b.hit));
    if (b.avo) out.push("Avo +" + Math.floor(b.avo));
    if (b.crit) out.push("Crit +" + Math.floor(b.crit));
    if (b.ddg) out.push("Ddg +" + Math.floor(b.ddg));
    return out.filter(function (x) { return !/\+0$/.test(x); }).join(" · ") || "—";
  }

  function catchUpSheet() {
    var r = run();
    var list = chaptersFor(r.mode);
    var body = '<p class="small muted" style="margin-bottom:10px">Pick the chapter you are about to play. Everything before it is marked <b>assumed</b>, so the audit can show you what to double-check.</p><div class="stack">';
    list.forEach(function (ch) {
      body += '<button class="btn wide" style="justify-content:space-between" data-act="do-catchup" data-id="' + ch.id + '">' +
        '<span>Ch.' + esc(numFor(ch, r.mode)) + ' ' + esc(ch.title) + '</span><span class="tiny dim">' + esc(ch.num) + '</span></button>';
    });
    body += '</div>';
    openSheet("Catch up", body);
  }

  function branchSheet(which) {
    var r = run();
    if (!r) return;
    if (which === "fourfang") {
      openSheet("Four-Fanged Offense",
        '<p class="small muted" style="margin-bottom:10px">Which version did you get?</p>' +
        '<div class="stack">' +
        '<button class="btn wide" data-act="set-branch" data-v="fourfang" data-x="linus"><span>Linus — lords total level 50+ → Geitz</span></button>' +
        '<button class="btn wide" data-act="set-branch" data-v="fourfang" data-x="lloyd"><span>Lloyd — lords total level 49 or lower → Wallace</span></button>' +
        '</div>');
    } else {
      openSheet("Pale Flower of Darkness",
        '<p class="small muted" style="margin-bottom:10px">The map version is decided by EXP earned by magic units (Serra, Erk, Priscilla, Lucius) versus physical units (Dorcas, Bartre, Guy, Raven). Karel/Harken is a separate counter.</p>' +
        '<div class="stack">' +
        '<button class="btn wide" data-act="set-branch" data-v="paleflower" data-x="kenneth"><span>Kenneth — magic EXP ≥ physical → chests</span></button>' +
        '<button class="btn wide" data-act="set-branch" data-v="paleflower" data-x="jerme"><span>Jerme — physical EXP > magic</span></button>' +
        '</div>');
    }
  }

  function pickerSheet() {
    var r = run();
    var list = chaptersFor(r.mode).concat(DATA.dungeons || []);
    var body = '<div class="stack">' + list.map(function (c) {
      return '<button class="btn wide" style="justify-content:space-between" data-act="go-chapter" data-id="' + c.id + '">' +
        '<span>' + esc(c.num || "") + ' ' + esc(c.title) + '</span>' +
        (chapterDone(c, r) ? '<span class="tag rec">✓</span>' : "") + '</button>';
    }).join("") + '</div>';
    openSheet("Choose chapter", body);
  }

  function chMenu(id) {
    var ch = chById(id), r = run();
    openSheet("Ch." + numFor(ch, r.mode) + " " + ch.title,
      '<div class="stack">' +
      '<button class="btn wide" data-act="set-current" data-id="' + id + '">Set as my current chapter</button>' +
      '<button class="btn wide" data-act="checkall" data-id="' + id + '">Mark everything done</button>' +
      '<button class="btn wide" data-act="clear" data-id="' + id + '">Clear all ticks</button>' +
      '<div class="small muted">Chapter ' + esc(ch.num) + ' · ' + (ch.gaiden ? "Side quest" : "Main story") + '</div>' +
      '</div>');
  }

  /* ---------------- auto-advance, gaiden offers, handoff ---------------- */
  function listFor(r) { return chaptersFor(r.mode); }

  function nextPlayable(r, fromCh, skipGaidens) {
    var list = listFor(r);
    var idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].id === fromCh.id) idx = i;
    if (idx < 0) return null;
    for (var j = idx + 1; j < list.length; j++) {
      var c = list[j];
      if (c.gaiden && (skipGaidens || gaidenLost(c, r))) continue;
      return c;
    }
    return null;
  }

  function moveTo(ch, prev) {
    var r = run();
    var from = prev !== undefined ? prev : r.chapterId;
    r.chapterId = ch.id;
    state.ui.sel = ch.id;
    state.ui.tab = "chapters";
    save(); render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast("Moved to Ch." + numFor(ch, r.mode), "Undo", function () {
      r.chapterId = from; state.ui.sel = from; save(); render();
    });
  }

  function afterClose(ch) {
    var r = run();
    if (DATA.id === "fe7" && r.mode === "lyn" && ch.id === "l10") { handoffSheet(); return; }
    if (DATA.id === "fe8" && ch.id === "c8") { routeSheet(); return; }
    var next = nextPlayable(r, ch, false);
    if (!next) { completionSheet(); return; }
    if (next.gaiden && !next.mandatory && !r.reached[next.id]) { gaidenSheet(next); return; }
    moveTo(next);
  }

  function routeSheet() {
    var r = run();
    openSheet("Choose your route",
      '<p style="margin:0 0 12px">Chapter 8 is the split. Eirika gets Innes, Gerik and Tethys early; Ephraim gets Duessel and Cormag early. The other lord returns in Chapter 15.</p>' +
      '<div class="stack">' +
      '<button class="btn ' + (r.mode === "eirika" ? "gold" : "") + '" data-act="set-route" data-v="eirika">Eirika Route — Distant Blade</button>' +
      '<button class="btn ' + (r.mode === "ephraim" ? "gold" : "") + '" data-act="set-route" data-v="ephraim">Ephraim Route — Fort Rigwald</button>' +
      '</div>');
  }

  function gaidenSheet(next) {
    var r = run();
    openSheet("Side quest unlocked",
      '<p style="margin:0 0 12px">' + esc(next.req || "A side quest is available.") + '</p>' +
      '<div class="stack">' +
      '<button class="btn gold wide" data-act="play-gaiden" data-id="' + next.id + '">Play ' + esc(numFor(next, r.mode)) + ' ' + esc(next.title) + '</button>' +
      '<button class="btn wide" data-act="skip-gaiden" data-id="' + next.id + '">Skip to the next story chapter</button>' +
      '</div>');
  }

  function completionSheet() {
    var r = run();
    r.complete = true; save();
    var chapters = listFor(r);
    var done = chapters.filter(function (c) { return chapterDone(c, r); }).length;
    var missed = chapters.filter(function (c) { return !chapterDone(c, r); }).map(function (c) { return numFor(c, r.mode) + " " + c.title; });
    var extra = "";
    if (DATA.id === "fe7" && r.mode === "eliwood") {
      extra = '<button class="btn wide" data-act="start-hector">Start Hector Mode</button>';
    }
    openSheet("Run complete",
      '<div class="card" style="background:var(--surface2)"><div class="kicker">' + esc(DATA.short) + ' · ' + esc(modeName(r.mode)) + '</div>' +
      '<div style="font-size:26px;font-weight:650;margin:4px 0">' + done + " / " + chapters.length + '</div>' +
      '<div class="small muted">chapters closed</div></div>' +
      '<div class="small" style="margin-top:10px">' + (missed.length ? "Still unrecorded: " + esc(missed.slice(0, 8).join(", ")) + (missed.length > 8 ? "…" : "") : "Nothing unrecorded. Clean run.") + '</div>' +
      '<div class="stack" style="margin-top:12px">' + extra + '<button class="btn wide" data-act="close-sheet">Done</button></div>');
  }

  function handoffSheet() {
    var r = run();
    var lyn = chaptersFor("lyn");
    var recruits = [], deaths = [], gaidens = [];
    lyn.forEach(function (c) {
      branchFilter(c, r).forEach(function (x) {
        if (x.it.k === "recruit" && isChecked(r, c, x.i)) recruits.push(x.it.t);
      });
      if (c.gaiden) gaidens.push(c.title + " — " + (r.reached[c.id] ? "played" : gaidenLost(c, r) ? "lost" : "not played"));
    });
    Object.keys(r.roster).forEach(function (u) {
      if (r.roster[u] === "dead") { var un = unitById(u); deaths.push(un ? un.name : u); }
    });
    var items = 0;
    lyn.forEach(function (c) {
      branchFilter(c, r).forEach(function (x) { if (x.it.k !== "recruit" && isChecked(r, c, x.i)) items++; });
    });
    var nils = r.levels["nils"] || "";
    openSheet("Lyn Mode complete",
      '<p style="margin:0 0 10px">Eliwood Mode begins at Ch.11. Here is what carries over.</p>' +
      '<div class="card" style="background:var(--surface2);margin-bottom:10px">' +
      '<div class="small"><b>Recruited:</b> ' + esc(recruits.join(", ") || "none recorded") + '</div>' +
      '<div class="small" style="margin-top:4px"><b>Items collected:</b> ' + items + '</div>' +
      '<div class="small" style="margin-top:4px"><b>Deaths:</b> ' + esc(deaths.join(", ") || "none") + '</div>' +
      '<div class="small" style="margin-top:4px"><b>Gaidens:</b> ' + esc(gaidens.join(" · ") || "none") + '</div>' +
      '</div>' +
      '<div class="kicker">Nils level at the end of Ch.10</div>' +
      '<div class="row" style="gap:8px;margin:6px 0 10px"><input class="lvlInput" id="nilsLvl" type="number" min="1" max="20" value="' + nils + '">' +
      '<span class="small muted">Needs level 7 for Hector Mode 19xx.</span></div>' +
      '<div id="nilsWarn" class="small" style="color:#DFAE5C;margin-bottom:10px"></div>' +
      '<button class="btn gold wide" data-act="do-handoff">Continue to Eliwood Ch.11</button>');
    var lv = document.getElementById("nilsLvl");
    if (lv) lv.addEventListener("input", function () {
      var v = parseInt(lv.value, 10);
      document.getElementById("nilsWarn").textContent = (v && v < 7) ? "Below 7 — 19xx will be locked in Hector Mode." : "";
    });
  }


  document.addEventListener("click", function (e) {
    var gt = e.target.closest("[data-game]");
    if (gt) { switchGame(gt.dataset.game); return; }
    var t = e.target.closest("[data-act]");
    if (!t) {
      if (e.target.closest("[data-close]")) closeSheet();
      return;
    }
    var act = t.dataset.act;
    var r = run();

    switch (act) {
      case "game": switchGame(t.dataset.id); break;
      case "play-gaiden": {
        var g = chById(t.dataset.id);
        if (g) { r.reached[g.id] = true; closeSheet(); moveTo(g); }
        break;
      }
      case "skip-gaiden": {
        var gg = chById(t.dataset.id);
        var nx = gg ? nextPlayable(r, gg, true) : null;
        closeSheet();
        if (nx) moveTo(nx); else completionSheet();
        break;
      }
      case "close-sheet": closeSheet(); break;
      case "start-hector": {
        var nr = newRun("Hector " + r.diff, "hector", r.diff, "fe7");
        state.runs.push(nr);
        state.active = nr.id; state.lastRun["fe7"] = nr.id;
        state.ui.tab = "chapters"; state.ui.sel = null;
        save(); closeSheet(); render();
        toast("Hector Mode started");
        break;
      }
      case "do-handoff": {
        var lv = document.getElementById("nilsLvl");
        if (lv && lv.value) r.levels["nils"] = parseInt(lv.value, 10);
        Object.keys(r.roster).forEach(function (u) { if (r.roster[u] === "dead") r.roster[u] = "bench"; });
        r.mode = "eliwood"; r.chapterId = "c11"; r.complete = false;
        r.playedModes = r.playedModes || ["lyn"];
        if (r.playedModes.indexOf("eliwood") < 0) r.playedModes.push("eliwood");
        state.ui.sel = "c11"; state.ui.tab = "chapters";
        save(); closeSheet(); render();
        toast("Eliwood Mode begins");
        break;
      }
      case "open-ch":
        r.chapterId = t.dataset.id;
        state.ui.tab = "chapters";
        save(); render();
        break;
      case "back":
        pickerSheet();
        break;
      case "go-chapter":
        r.chapterId = t.dataset.id;
        state.ui.tab = "chapters";
        save(); closeSheet(); render();
        break;
      case "jump":
        r.chapterId = t.dataset.id; state.ui.tab = "chapters"; save(); closeSheet(); render();
        break;
      case "next-chapter": {
        var nc = chById(t.dataset.id);
        r.done[nc.id] = true;
        save();
        var nx = nextPlayable(r, nc, false);
        if (nx && nx.gaiden && !nx.mandatory && !r.reached[nx.id]) { gaidenSheet(nx); break; }
        if (nx) moveTo(nx, nc.id); else completionSheet();
        break;
      }
      case "recruit-now": {
        var rc = chById(t.dataset.ch);
        var ri = parseInt(t.dataset.i, 10);
        var ru = unitsForItem(rc.items[ri]);
        if (ru.length) recruitSheet(ru);
        break;
      }
      case "toggle": {
        var ch = chById(t.dataset.ch);
        var i = +t.dataset.i;
        var key = itemKey(ch, i);
        if (!r.checked[key]) {
          var list = branchFilter(ch, r);
          var remaining = list.filter(function (x) { return !isChecked(r, ch, x.i) && itemKey(ch, x.i) !== key; });
          var hasSide = ch.side && (!ch.side.mode || ch.side.mode === r.mode);
          var risk = (hasSide || turnLimitApplies(ch, r)) && !gaidenLost(ch, r) && !(turnLimitApplies(ch, r) && r.turns[ch.id] > ch.turn.limit);
          if (remaining.length === 0 && risk) {
            pendingClose = { ch: ch.id, i: i };
            closeSheet();
            var locks = [];
            if (hasSide) locks.push(ch.side.title);
            if (turnLimitApplies(ch, r)) locks.push("the turn limit for " + ch.turn.unlocks);
            openSheet("Close Ch." + numFor(ch, r.mode) + "?",
              '<p style="margin:0 0 12px">That was the last item. Marking it done means you are leaving this chapter.</p>' +
              '<div class="card" style="background:var(--surface2);margin-bottom:12px"><div class="kicker">You can lose</div>' +
              '<div class="small" style="margin-top:4px">' + locks.map(esc).join("<br>") + '</div></div>' +
              '<div class="row" style="gap:8px"><button class="btn gold" style="flex:1" data-act="confirm-close">Mark chapter done</button>' +
              '<button class="btn" style="flex:1" data-act="cancel-close">Go back</button></div>');
            return;
          }
        }
        toggleItem(r, ch, i);
        var itm = ch.items[i];
        var nowChecked = !!r.checked[key];
        if (itm && itm.k === "recruit") {
          var recUnits = unitsForItem(itm);
          if (nowChecked && recUnits.length) { save(); recruitSheet(recUnits); break; }
          if (!nowChecked) { recUnits.forEach(function (u) { delete r.roster[u.id]; }); }
        }
        save();
        if (chapterDone(ch, r)) { afterClose(ch); }
        else { render(); }
        break;
      }
      case "confirm-close": {
        if (pendingClose) {
          var pc = chById(pendingClose.ch);
          r.checked[itemKey(pc, pendingClose.i)] = true;
          pendingClose = null;
          save();
          afterClose(pc);
        }
        break;
      }
      case "cancel-close": {
        pendingClose = null; closeSheet(); render();
        break;
      }
      case "toggle-jump":
        state.ui.sel = t.dataset.ch; state.ui.tab = "chapters"; render();
        break;
      case "checkall": {
        var c2 = chById(t.dataset.id);
        branchFilter(c2, r).forEach(function (x) { r.checked[itemKey(c2, x.i)] = true; });
        save(); closeSheet(); afterClose(c2);
        break;
      }
      case "clear": {
        var c3 = chById(t.dataset.id);
        branchFilter(c3, r).forEach(function (x) { delete r.checked[itemKey(c3, x.i)]; });
        save(); closeSheet(); render();
        break;
      }
      case "set-current":
        r.chapterId = t.dataset.id; save(); closeSheet(); render(); toast("You are here: Ch." + numFor(chById(t.dataset.id), r.mode));
        break;
      case "catchup": catchUpSheet(); break;
      case "do-catchup": {
        var target = chById(t.dataset.id);
        var ti = orderIndex(r.mode, target.id);
        DATA.order[r.mode].slice(0, ti).forEach(function (id) {
          var ch4 = chById(id);
          branchFilter(ch4, r).forEach(function (x) {
            var k = itemKey(ch4, x.i);
            if (!r.checked[k]) r.checked[k] = "assumed";
          });
        });
        r.chapterId = target.id;
        save(); closeSheet(); render();
        toast("Caught up to Ch." + numFor(target, r.mode));
        break;
      }
      case "ch-menu": chMenu(t.dataset.id); break;
      case "branch": branchSheet(t.dataset.v); break;
      case "set-branch": {
        r.branches[t.dataset.v] = t.dataset.x; save(); closeSheet(); render();
        toast("Branch recorded");
        break;
      }
      case "mark-reached": r.reached[t.dataset.id] = true; save(); render(); break;
      case "rec-filter": state.ui.recFilter = t.dataset.v; save(); render(); break;
      case "item-filter": state.ui.itemFilter = t.dataset.v; save(); render(); break;
      case "supp-filter": state.ui.suppFilter = t.dataset.v; save(); render(); break;
      case "ex-filter": state.ui.exFilter = t.dataset.v; save(); render(); break;
      case "exploit": exploitSheet(+t.dataset.i); break;
      case "seen": {
        var sk = t.dataset.ch + ":" + t.dataset.i;
        r.seen = r.seen || {};
        if (r.seen[sk]) delete r.seen[sk]; else r.seen[sk] = true;
        save(); render();
        break;
      }
      case "jump-open":
        state.ui.openLore = t.dataset.id;
        state.ui.openTalks = t.dataset.id;
        state.ui.sel = t.dataset.id;
        state.ui.tab = "chapters";
        closeSheet(); save(); render();
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "open-settings": settingsSheet(); break;
      case "tab": state.ui.tab = t.dataset.v; save(); render(); break;
      case "toggle-setting": {
        var sv = t.dataset.v;
        state.settings[sv] = !state.settings[sv];
        save(); render(); settingsSheet();
        break;
      }
      case "set-style": {
        state.settings.planStyle = t.dataset.v;
        save(); render(); settingsSheet();
        break;
      }
      case "unit":
        if (t.dataset.u) unitSheet(t.dataset.u);
        break;
      case "pair": pairSheet(t.dataset.a, t.dataset.b); break;
      case "set-rank": {
        var key = pairKey(t.dataset.a, t.dataset.b);
        var rr = +t.dataset.r;
        r.supports = r.supports || {};
        if (rr === 0) delete r.supports[key]; else r.supports[key] = rr;
        save(); closeSheet(); render();
        if (rr && (levelsUsed(r, t.dataset.a) > 5 || levelsUsed(r, t.dataset.b) > 5)) toast("Over the 5-level budget");
        break;
      }
      case "set-route": {
        r.mode = t.dataset.v;
        var target = t.dataset.v === "eirika" ? "c9a" : "c9b";
        save(); closeSheet();
        moveTo(chById(target), r.chapterId);
        break;
      }
      case "apply-recruit": {
        if (!pendingRecruit) break;
        pendingRecruit.forEach(function (id) {
          var sel = document.querySelector('[data-rstatus="' + id + '"]');
          if (sel && sel.value && sel.value !== "keep") r.roster[id] = sel.value;
          var lv = document.querySelector('[data-rlvl="' + id + '"]');
          if (lv && lv.value) {
            var n = parseInt(lv.value, 10);
            if (!isNaN(n) && n > 0) r.levels[id] = n;
          }
        });
        pendingRecruit = null;
        save(); closeSheet(); render();
        break;
      }
      case "set-promo": {
        r.promos[t.dataset.u] = t.dataset.v;
        save(); closeSheet(); render();
        break;
      }
      case "set-roster": {
        var u = t.dataset.u, v = t.dataset.v;
        if (v === "") delete r.roster[u]; else r.roster[u] = v;
        if (v === "core" && r.team.indexOf(u) < 0) r.team.push(u);
        if (v !== "core") r.team = r.team.filter(function (x) { return x !== u; });
        save(); closeSheet(); render();
        break;
      }
      case "confirm": r.checked[t.dataset.ch + ":" + t.dataset.i] = true; save(); render(); break;
      case "reject": delete r.checked[t.dataset.ch + ":" + t.dataset.i]; save(); render(); break;
      case "run": runSheet(); break;
      case "switch-run": state.active = t.dataset.id; state.lastRun[state.game] = t.dataset.id; save(); closeSheet(); render(); break;
      case "new-run": newRunSheet(); break;
      case "create-run": {
        var name = (document.getElementById("nName") || document.getElementById("newName"));
        var mode = (document.getElementById("nMode") || document.getElementById("newMode"));
        var diff = (document.getElementById("nDiff") || document.getElementById("newDiff"));
        var nr = newRun(name ? name.value : "New run", mode ? mode.value : "eliwood", diff ? diff.value : "Normal", state.game);
        state.ui.lastMode = nr.mode;
        state.runs.push(nr); state.active = nr.id;
        state.lastRun[state.game] = nr.id;
        save(); closeSheet(); render(); break;
      }
      case "rename-run": {
        var nn = prompt("Run name", r.name);
        if (nn) { r.name = nn; save(); render(); closeSheet(); }
        break;
      }
      case "delete-run": {
        if (!confirm("Delete this run and all its ticks?")) return;
        state.runs = state.runs.filter(function (x) { return x.id !== r.id; });
        if (state.lastRun[state.game] === r.id) delete state.lastRun[state.game];
        state.active = state.runs.filter(function (x) { return x.game === state.game; })[0];
        state.active = state.active ? state.active.id : null;
        state.ui.sel = null;
        save(); closeSheet(); render();
        break;
      }
      case "export": {
        var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "fe7-field-guide-progress.json";
        a.click();
        setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
        break;
      }
      case "import": {
        var inp = document.createElement("input");
        inp.type = "file"; inp.accept = "application/json";
        inp.onchange = function () {
          var f = inp.files[0]; if (!f) return;
          var fr = new FileReader();
          fr.onload = function () {
            try {
              var j = JSON.parse(fr.result);
              if (!j.runs) throw new Error("bad file");
              state = j; save(); closeSheet(); render(); toast("Imported");
            } catch (err) { toast("That file did not parse"); }
          };
          fr.readAsText(f);
        };
        inp.click();
        break;
      }
    }
  });

  document.addEventListener("input", function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.notes) {
      var r = run();
      r.notes[el.dataset.notes] = el.value;
      save();
    }
    if (el.id === "q") {
      state.ui.search = el.value;
      var r2 = run();
      app.innerHTML = viewSearch(r2);
      var inp = document.getElementById("q");
      if (inp) { inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
    }
  });

  document.addEventListener("change", function (e) {
    var el = e.target;
    if (el.dataset && el.dataset.turn) {
      var r = run();
      var v = parseInt(el.value, 10);
      if (!isNaN(v) && v > 0) r.turns[el.dataset.turn] = v; else delete r.turns[el.dataset.turn];
      save(); render();
    }
    if (el.dataset && el.dataset.lvl) {
      var rl = run();
      var lv = parseInt(el.value, 10);
      if (!isNaN(lv) && lv > 0) rl.levels[el.dataset.lvl] = lv; else delete rl.levels[el.dataset.lvl];
      save();
    }
    if (el.dataset && el.dataset.booster) {
      var r3 = run();
      if (el.value) r3.boosters[el.dataset.booster] = el.value; else delete r3.boosters[el.dataset.booster];
      save();
    }
    if (el.id === "nMode") {
      var nm = document.getElementById("nName");
      if (nm && / run$/.test(nm.value)) nm.value = modeName(el.value) + " run";
    }
  });

  document.getElementById("runChip").addEventListener("click", runSheet);
  document.getElementById("gear").addEventListener("click", settingsSheet);
  document.getElementById("tabs").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-tab]");
    if (!b) return;
    state.ui.tab = b.dataset.tab;
    if (state.ui.tab !== "chapters") { state.ui.sel = null; }
    save();
    render();
    window.scrollTo({ top: 0 });
  });

  /* ---------------- service worker ---------------- */
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("sw.js").then(function (reg) {
      reg.addEventListener("updatefound", function () {
        var w = reg.installing;
        if (!w) return;
        w.addEventListener("statechange", function () {
          if (w.state === "installed" && navigator.serviceWorker.controller) toast("Content updated — reopen to apply");
        });
      });
    }).catch(function () {});
  }

  render();
})();
