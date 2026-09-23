(function () {
  const DATA = window.BLOOM_DATA;
  const FOCUS_PRESETS = ["Videogames", "Espaco", "Dinossauros", "Trens", "Animes", "Futebol", "Outro"];
  const KEY = "bloomquest-save-v1";

  const state = {
    name: "",
    focus: "",
    coins: 0,
    level: 1,
    qIndex: 0,
    lives: 3,
    medals: {},
    inventory: { shield: 0, boost: 0, skip: 0 },
    usedHint: false,
    awaiting: false,
    started: false
  };

  const el = (id) => document.getElementById(id);
  const screens = {
    welcome: el("screenWelcome"),
    map: el("screenMap"),
    quiz: el("screenQuiz"),
    shop: el("screenShop"),
    album: el("screenAlbum"),
    lore: el("screenLore"),
    win: el("screenWin")
  };

  function save() {
    localStorage.setItem(KEY, JSON.stringify({
      name: state.name,
      focus: state.focus,
      coins: state.coins,
      level: state.level,
      medals: state.medals,
      inventory: state.inventory,
      started: state.started
    }));
  }

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      Object.assign(state, s);
    } catch (e) { /* ignore */ }
  }

  function showScreen(name) {
    Object.values(screens).forEach((n) => n.classList.remove("active"));
    screens[name].classList.add("active");
    el("hud").hidden = name === "welcome";
    updateHud();
  }

  function toast(msg) {
    const t = el("toast");
    t.textContent = msg;
    t.classList.add("show");
    el("live").textContent = msg;
    setTimeout(() => t.classList.remove("show"), 2200);
  }

  function modal(title, text, cb) {
    el("modalTitle").textContent = title;
    el("modalText").textContent = text;
    el("overlay").classList.add("show");
    const ok = el("modalOk");
    const handler = () => {
      el("overlay").classList.remove("show");
      ok.removeEventListener("click", handler);
      if (cb) cb();
    };
    ok.addEventListener("click", handler);
    ok.focus();
  }

  function updateHud() {
    el("playerNameHud").textContent = state.name || "Jogador";
    el("coinsHud").textContent = String(state.coins);
    const got = Object.keys(state.medals).length;
    el("medalsHud").textContent = got + "/6";
  }

  function withFocus(text) {
    return String(text).replaceAll("{FOCUS}", state.focus || "seu hiperfoco");
  }

  function currentQs() {
    return DATA.bank[state.level];
  }

  function currentQ() {
    return currentQs()[state.qIndex];
  }

  function renderFocusChips() {
    const box = el("focusChips");
    box.innerHTML = "";
    FOCUS_PRESETS.forEach((f) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = f;
      b.addEventListener("click", () => {
        [...box.children].forEach((c) => c.classList.remove("active"));
        b.classList.add("active");
        if (f === "Outro") {
          el("focusOtherWrap").hidden = false;
          el("focusOther").focus();
          state.focus = "";
        } else {
          el("focusOtherWrap").hidden = true;
          state.focus = f;
        }
      });
      box.appendChild(b);
    });
  }

  function renderMap() {
    el("checkpointBadge").textContent = "Checkpoint " + Math.max(0, state.level - 1);
    const path = el("towerPath");
    path.innerHTML = "";
    DATA.levels.forEach((lv) => {
      const locked = lv.id > state.level;
      const done = Boolean(state.medals[lv.id]);
      const current = lv.id === state.level && !done;
      const btn = document.createElement("button");
      btn.className = "tower" + (locked ? " locked" : "") + (done ? " done" : "") + (current ? " current" : "");
      btn.disabled = locked;
      btn.innerHTML =
        '<svg class="tower-ico" viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="18" width="40" height="36" rx="8" fill="' +
        (done ? "#059669" : current ? "#F59E0B" : "#2563EB") +
        '"/><rect x="26" y="38" width="12" height="16" fill="#FEF3C7"/></svg>' +
        "<div><h3>Nivel " + lv.id + " · " + lv.name + "</h3><p>" + lv.floor + "</p></div>" +
        '<span class="badge">' + (done ? "OK" : locked ? "Trancado" : "Abrir") + "</span>";
      btn.addEventListener("click", () => startLevel(lv.id));
      path.appendChild(btn);
    });
  }

  function renderShop() {
    const grid = el("shopGrid");
    grid.innerHTML = "";
    DATA.shop.forEach((item) => {
      const b = document.createElement("button");
      b.className = "shop-item";
      b.innerHTML =
        '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><circle cx="12" cy="12" r="8"/></svg>' +
        "<div><h3>" + item.name + "</h3><p>" + item.desc + "</p></div>" +
        '<span class="price">' + item.cost + " moedas</span>";
      b.addEventListener("click", () => buy(item));
      grid.appendChild(b);
    });
  }

  function renderAlbum() {
    const grid = el("albumGrid");
    grid.innerHTML = "";
    DATA.levels.forEach((lv) => {
      const got = Boolean(state.medals[lv.id]);
      const d = document.createElement("div");
      d.className = "medal" + (got ? " got" : "");
      d.innerHTML = "<h3>" + lv.medal + "</h3><p>" + (got ? "Conquistada" : "Ainda nao") + "</p>";
      grid.appendChild(d);
    });
  }

  function renderLore() {
    const list = el("loreList");
    list.innerHTML = "";
    DATA.levels.forEach((lv) => {
      const open = lv.id <= state.level || state.medals[lv.id];
      const d = document.createElement("div");
      d.className = "lore-card";
      d.innerHTML = "<h3>" + lv.floor + "</h3><p>" + (open ? lv.lore : "Este andar ainda esta fechado.") + "</p>";
      list.appendChild(d);
    });
  }

  function startLevel(id) {
    if (id > state.level) return;
    state.level = id;
    state.qIndex = 0;
    state.lives = 3;
    state.usedHint = false;
    state.awaiting = false;
    showScreen("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    const qs = currentQs();
    const q = currentQ();
    const lv = DATA.levels[state.level - 1];
    el("quizTitle").textContent = "Nivel " + state.level + " · " + lv.name;
    el("quizMeta").textContent = "Pergunta " + (state.qIndex + 1) + "/" + qs.length;
    el("progLabel").textContent = "Andar " + state.level;
    el("livesLabel").textContent = "Tentativas neste item: " + state.lives;
    el("progBar").style.width = Math.round((state.qIndex / qs.length) * 100) + "%";
    el("quizBubble").textContent = "Uma pergunta por vez. Tente primeiro.";
    el("qText").textContent = withFocus(q.q);
    el("qFeedback").className = "feedback";
    el("qFeedback").textContent = "";
    el("btnNext").hidden = true;
    el("btnSubmitWrite").hidden = q.type !== "write";
    el("qWriteWrap").hidden = q.type !== "write";
    el("qWrite").value = "";
    el("btnHint").disabled = false;
    state.usedHint = false;
    state.awaiting = false;

    const box = el("qOptions");
    box.innerHTML = "";
    if (q.type === "mc") {
      q.options.forEach((opt, i) => {
        const b = document.createElement("button");
        b.className = "opt";
        b.textContent = withFocus(opt);
        b.addEventListener("click", () => answerMc(i, b));
        box.appendChild(b);
      });
    }

    const skipBtn = el("btnSkip");
    if (skipBtn) {
      skipBtn.hidden = !(state.inventory.skip > 0 && state.level < 6);
    }
  }

  function spendCoins(n) {
    if (state.coins < n) {
      toast("Moedas insuficientes. Acerte para ganhar mais.");
      return false;
    }
    state.coins -= n;
    updateHud();
    save();
    return true;
  }

  function gainCoins(n) {
    if (state.inventory.boost > 0) {
      n *= 2;
      state.inventory.boost -= 1;
      toast("Boost ativo: moedas em dobro!");
    }
    state.coins += n;
    updateHud();
    save();
  }

  function showFeedback(ok, text) {
    const f = el("qFeedback");
    f.className = "feedback show " + (ok ? "ok" : "no");
    f.textContent = text;
    el("live").textContent = text;
  }

  function answerMc(i, btn) {
    if (state.awaiting) return;
    const q = currentQ();
    if (i === q.answer) {
      state.awaiting = true;
      btn.classList.add("correct");
      [...el("qOptions").children].forEach((c) => { c.disabled = true; });
      const coins = 10 + (state.usedHint ? 0 : 4);
      gainCoins(coins);
      showFeedback(true, "Acertou! " + q.why + " +" + coins + " moedas.");
      el("btnNext").hidden = false;
      el("btnHint").disabled = true;
    } else {
      failAttempt(btn);
    }
  }

  function failAttempt(btn) {
    if (btn) btn.classList.add("wrong");
    const q = currentQ();
    if (state.inventory.shield > 0) {
      state.inventory.shield -= 1;
      toast("Escudo Safe-Fail usou 1 carga. Sem perda.");
    } else {
      state.coins = Math.max(0, state.coins - 1);
    }
    state.lives -= 1;
    el("livesLabel").textContent = "Tentativas neste item: " + Math.max(0, state.lives);
    updateHud();
    save();
    showFeedback(false, "Quase. Pista: " + withFocus(q.retry));
    if (state.lives <= 0) {
      state.lives = 3;
      showFeedback(false, "Checkpoint salvo. Nova pergunta do mesmo nivel. Pista: " + withFocus(q.hint));
      rotateQuestion();
    }
  }

  function rotateQuestion() {
    const qs = currentQs();
    state.qIndex = (state.qIndex + 1) % qs.length;
    setTimeout(renderQuestion, 900);
  }

  function passQuestion() {
    const qs = currentQs();
    if (state.qIndex + 1 >= qs.length) {
      completeLevel();
    } else {
      state.qIndex += 1;
      renderQuestion();
    }
  }

  function completeLevel() {
    state.medals[state.level] = true;
    gainCoins(15);
    const lv = DATA.levels[state.level - 1];
    if (state.level >= 6) {
      save();
      showScreen("win");
      el("winText").textContent = state.name + ", voce zerou a Torre da Lingua. Hiperfoco: " + state.focus + ".";
      return;
    }
    state.level += 1;
    state.qIndex = 0;
    save();
    modal("Checkpoint!", "Medalha: " + lv.medal + ". O proximo andar abriu. +15 moedas.", () => {
      showScreen("map");
      renderMap();
    });
  }

  function buy(item) {
    if (!spendCoins(item.cost)) return;
    if (item.type === "hint") {
      const q = screens.quiz.classList.contains("active") ? currentQ() : null;
      if (!q) {
        state.coins += item.cost;
        toast("Abra um andar para usar a dica.");
        updateHud();
        return;
      }
      showFeedback(false, "Dica: " + withFocus(q.hint));
      state.usedHint = true;
      toast("Dica comprada.");
    } else {
      state.inventory[item.type] += 1;
      toast(item.name + " no inventario.");
    }
    save();
    updateHud();
  }

  function gradeWrite(text) {
    const q = currentQ();
    const t = text.trim().toLowerCase();
    if (t.length < 8) return false;
    if (q.need === "aposto explicativo") {
      return /,.+,/.test(text);
    }
    if (q.need === "vocativo") {
      const f = (state.focus || "").toLowerCase();
      const called = f && t.includes(f.toLowerCase());
      return called && (text.includes(",") || text.includes("!"));
    }
    if (q.need === "coordenada adversativa") {
      return /(mas|porém|porem|contudo|todavia|entretanto)/i.test(text);
    }
    return false;
  }

  function submitWrite() {
    if (state.awaiting) return;
    const q = currentQ();
    const val = el("qWrite").value;
    if (gradeWrite(val)) {
      state.awaiting = true;
      gainCoins(16);
      showFeedback(true, "Criacao aceita! " + q.why + " +16 moedas.");
      el("btnNext").hidden = false;
      el("btnSubmitWrite").hidden = true;
      el("btnHint").disabled = true;
    } else {
      failAttempt(null);
    }
  }

  el("btnStart").addEventListener("click", () => {
    const name = el("nameInput").value.trim();
    if (!name) {
      toast("Escreva seu nome.");
      el("nameInput").focus();
      return;
    }
    if (el("focusOtherWrap").hidden === false) {
      state.focus = el("focusOther").value.trim();
    }
    if (!state.focus) {
      toast("Escolha um hiperfoco.");
      return;
    }
    state.name = name;
    state.started = true;
    state.coins = 12;
    state.level = 1;
    save();
    modal("Bem-vindo, " + name + "!", "Safe-fail ligado. Errar so da pista. 6 andares. Hiperfoco: " + state.focus + ".", () => {
      showScreen("map");
      renderMap();
    });
  });

  el("btnMap").addEventListener("click", () => { showScreen("map"); renderMap(); });
  el("btnShop").addEventListener("click", () => { showScreen("shop"); renderShop(); });
  el("btnAlbum").addEventListener("click", () => { showScreen("album"); renderAlbum(); });
  el("btnLore").addEventListener("click", () => { showScreen("lore"); renderLore(); });
  el("btnNext").addEventListener("click", passQuestion);
  el("btnSubmitWrite").addEventListener("click", submitWrite);
  el("btnHint").addEventListener("click", () => {
    const q = currentQ();
    if (!q) return;
    if (!spendCoins(8)) return;
    state.usedHint = true;
    showFeedback(false, "Dica: " + withFocus(q.hint));
  });
  el("btnSkip").addEventListener("click", () => {
    if (state.level >= 6) {
      toast("Pulo nao vale no andar Criar.");
      return;
    }
    if (state.inventory.skip < 1) {
      toast("Compre o pulo na loja.");
      return;
    }
    state.inventory.skip -= 1;
    save();
    toast("Pulo usado. Proxima pergunta.");
    passQuestion();
  });
  el("btnReplay").addEventListener("click", () => {
    state.level = 1;
    state.qIndex = 0;
    state.medals = {};
    state.coins = 12;
    state.inventory = { shield: 0, boost: 0, skip: 0 };
    save();
    showScreen("map");
    renderMap();
  });

  document.querySelectorAll("[data-back]").forEach((b) => {
    b.addEventListener("click", () => { showScreen("map"); renderMap(); });
  });

  el("qWrite").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) submitWrite();
  });

  renderFocusChips();
  load();
  if (state.started && state.name) {
    showScreen("map");
    renderMap();
  }
})();
