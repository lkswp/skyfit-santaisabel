/* Skyfit Santa Isabel — app.js
   Monta o site a partir de data/plano.js, cuida das rotas (#criador), do checklist e das animações. */
(function () {
  "use strict";

  var PLANO = window.SKY_PLANO;
  var PEOPLE = PLANO.pessoas.slice().sort(function (a, b) { return a.dia - b.dia; });
  var MM = String(PLANO.mesIndex + 1).padStart(2, "0");

  // ?motion=off desliga as animações (para teste). Por decisão do cliente elas rodam mesmo com "reduzir movimento" ligado.
  var motionOff = /[?&]motion=off/.test(location.search);
  var hasGsap = !motionOff && typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  var wide = window.matchMedia("(min-width: 1024px)");
  var canHover = window.matchMedia("(hover: hover)").matches;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var app = $("#app");
  var lenis = null, current = null, started = false, clockTimer = null, spy = null, online = false;

  /* ---------- Utilidades ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function date(d) { return pad(d) + "/" + MM; }
  function fill(s, p) { return esc(s).replace(/\{CUPOM\}/g, '<span class="cp">' + esc(p.cupom) + "</span>"); }
  function plain(s, p) { return s.replace(/\{CUPOM\}/g, p.cupom); }
  function initials(p) { return p.nome.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join(""); }
  function midnight() { var t = new Date(); t.setHours(0, 0, 0, 0); return t; }
  function daysTo(d) { return Math.round((new Date(PLANO.ano, PLANO.mesIndex, d) - midnight()) / 864e5); }
  function countdown(d) {
    var n = daysTo(d);
    return n > 1 ? "faltam " + n + " dias" : n === 1 ? "é amanhã" : n === 0 ? "é hoje" : "já foi ao ar";
  }
  function store(key, value) {
    try {
      if (value === undefined) return JSON.parse(localStorage.getItem(key) || "{}");
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
    return {};
  }
  function toast(msg) {
    var t = $("#toast"); t.textContent = msg; t.classList.add("on");
    clearTimeout(toast.h); toast.h = setTimeout(function () { t.classList.remove("on"); }, 2000);
  }
  function tasksFor(p) {
    var t = [
      { g: "Reels", id: "r1", t: "Reels gravado", due: "até " + date(p.dia - 3) },
      { g: "Reels", id: "r2", t: "Enviado para aprovação", due: "até " + date(p.dia - 1) },
      { g: "Reels", id: "r3", t: "Reels no ar, com a academia marcada", due: date(p.dia) }
    ];
    PLANO.semanas.forEach(function (w, i) {
      t.push({ g: "Stories", id: "s" + i + "a", t: w[0] + ": primeira sequência", due: w[1] });
      t.push({ g: "Stories", id: "s" + i + "b", t: w[0] + ": segunda sequência", due: w[1] });
    });
    return t;
  }
  var ICON = {
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.600-7 10-7 10z"/></svg>',
    bubble: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.600 7.100L4 20l1-4.600A8 8 0 1 1 21 12z"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M22 3L10 14M22 3l-7 19-5-8-8-5z"/></svg>'
  };

  /* ---------- Topo e rodapé ---------- */
  function renderNav() {
    $("#topNav").innerHTML = PEOPLE.map(function (p) {
      return '<a href="#' + p.slug + '"' + (current === p ? ' aria-current="page"' : "") + ">" + esc(p.curto) + (p.black && current !== p ? "<i></i>" : "") + "</a>";
    }).join("");
    var on = $("#topNav [aria-current]");
    if (on) on.scrollIntoView({ block: "nearest", inline: "center" });
  }
  $("#footMes").textContent = PLANO.mesNome + " de " + PLANO.ano;
  $("#footIg").textContent = "@" + PLANO.instagram;
  $("#footIg").href = "https://www.instagram.com/" + PLANO.instagram + "/";

  /* ---------- Início ---------- */
  function calendarHtml() {
    var first = (new Date(PLANO.ano, PLANO.mesIndex, 1).getDay() + 6) % 7;
    var days = new Date(PLANO.ano, PLANO.mesIndex + 1, 0).getDate();
    var now = new Date(), same = now.getFullYear() === PLANO.ano && now.getMonth() === PLANO.mesIndex;
    var by = {}; PEOPLE.forEach(function (p) { by[p.dia] = p; });
    var startStories = parseInt(PLANO.semanas[0][1], 10);
    var end = new Date(PLANO.oferta.fim).getDate();
    var cells = "";
    for (var i = 0; i < first; i++) cells += '<div class="day empty"></div>';
    for (var d = 1; d <= days; d++) {
      var dow = (first + d - 1) % 7, p = by[d];
      var cls = ["day"];
      if (same && now.getDate() === d) cls.push("today");
      if (same && d < now.getDate()) cls.push("past");
      if (p) {
        cls.push("post"); if (p.black) cls.push("black");
        cells += '<a class="' + cls.join(" ") + '" href="#' + p.slug + '" aria-label="' + esc(p.nome) + " posta o Reels em " + date(d) + '"><span>' + pad(d) + "</span><small>" + esc(p.curto) + "</small></a>";
        continue;
      }
      if (d === end) cls.push("end");
      var dot = d >= startStories && (dow === 0 || dow === 2 || dow === 4);
      cells += '<div class="' + cls.join(" ") + '"><span>' + pad(d) + "</span>" + (dot ? '<i class="dot"></i>' : "<i></i>") + "</div>";
    }
    return '<div class="cal-dow">' + ["seg", "ter", "qua", "qui", "sex", "sáb", "dom"].map(function (x) { return "<span>" + x + "</span>"; }).join("") + "</div>" +
      '<div class="cal-grid">' + cells + "</div>" +
      '<div class="cal-key"><span><i class="k-red"></i>Reels que anuncia a oferta</span><span><i></i>Reels do criador</span><span><i class="k-dot"></i>Dia bom para Stories</span><span><i class="k-end"></i>Fim da ' + esc(PLANO.oferta.nome) + "</span></div>";
  }

  function homeHtml() {
    var o = PLANO.oferta;
    return '' +
    '<section class="hero" id="inicio">' +
      '<h1 class="display hero-title" data-fit="300">' +
        '<span class="line"><span>Black</span></span>' +
        '<span class="line l2"><span>Novem<span class="slash">/</span>ber</span></span>' +
      "</h1>" +
      '<div class="hero-foot">' +
        '<p class="lede" data-in>O plano de conteúdo dos criadores da Skyfit Santa Isabel. Um Reels por pessoa, cada um num dia, e Stories toda semana com o cupom.</p>' +
        '<div class="clock" data-in><span class="small">A ' + esc(o.nome) + " acaba em</span>" +
          '<div class="clock-digits num" id="clock" aria-live="off"><span><b>00</b><small>dias</small></span><span><b>00</b><small>horas</small></span><span><b>00</b><small>min</small></span><span class="sec"><b>00</b><small>seg</small></span></div></div>' +
      "</div>" +
    "</section>" +

    '<section class="manifesto"><p class="manifesto-text" id="manifesto">' + esc(PLANO.manifesto) + "</p></section>" +

    '<section class="agenda" id="agenda">' +
      '<div class="agenda-head"><h2 class="h2" data-title>Quem posta quando</h2><p class="lede" data-rv>Cada Reels sai num dia diferente. Toque no seu nome para abrir o seu plano.</p></div>' +
      '<div class="rail" id="rail">' + PEOPLE.map(function (p) {
        return '<a class="slot" href="#' + p.slug + '">' +
          '<div class="slot-top"><span class="slot-day num">' + pad(p.dia) + '</span><span class="slot-when"><b>' + esc(p.semana) + "</b>" + esc(PLANO.mesNome.toLowerCase()) + "<br>" + countdown(p.dia) + "</span></div>" +
          '<div class="slot-name">' + esc(p.nome) + "<small>@" + esc(p.arroba) + " · " + esc(p.seguidores) + (p.nova ? " · nova no time" : "") + "</small></div>" +
          '<div class="slot-reel"><span class="flag' + (p.black ? "" : " plain") + '">' + (p.black ? "Anuncia a " + esc(o.nome) : "Não fala de preço") + "</span><br>" + esc(p.reels.titulo) + "</div>" +
        "</a>";
      }).join("") + "</div>" +
      '<div class="rail-controls"><span class="num" id="railCount">01 / ' + pad(PEOPLE.length) + '</span><div class="rail-bar"><i id="railBar"></i></div><span>role para ver todos</span></div>' +
    "</section>" +

    '<section class="oferta" id="oferta">' +
      '<div class="tag" data-rv><span class="tag-name">' + esc(o.nome) + ", a oferta do mês</span>" +
        '<div class="tag-price"><small>R$</small><span id="tagNum" class="num">' + esc(o.preco) + "</span></div>" +
        '<span class="tag-sub">no primeiro mês</span></div>' +
      '<div><h2 class="h2" data-title>O que pode ser dito sobre a oferta</h2>' +
        '<dl class="rules" data-stg style="margin-top:clamp(24px,3vw,44px)">' + o.regras.map(function (r) { return "<div><dt>" + esc(r[0]) + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl>" +
        '<p class="care" data-rv>' + esc(o.cuidado) + "</p></div>" +
    "</section>" +

    '<section class="combinado" id="combinado">' +
      '<h2 class="h2" data-title>O combinado do mês</h2>' +
      '<dl class="terms" data-stg>' + PLANO.combinado.map(function (c) { return "<div><dt>" + esc(c[0]) + "</dt><dd>" + esc(c[1]) + "</dd></div>"; }).join("") + "</dl>" +
    "</section>" +

    '<section class="calendar" id="calendario">' +
      '<div class="calendar-copy"><h2 class="h2" data-title>' + esc(PLANO.mesNome) + ", dia a dia</h2><p class=\"lede\" data-rv>Os dias em destaque são os de Reels. Stories podem sair em qualquer dia, inclusive no mesmo dia do Reels de outra pessoa.</p></div>" +
      '<div data-rv>' + calendarHtml() + "</div>" +
    "</section>";
  }

  /* ---------- Página do criador ---------- */
  function creatorHtml(p) {
    var r = p.reels, tasks = tasksFor(p), done = store("skyfit-" + PLANO.mes + "-" + p.slug);
    var names = p.nome.split(/\s+/);
    var others = PEOPLE.filter(function (x) { return x !== p; });
    var kinds = ["", "s-red", "s-bone", "", "s-red"];
    return '' +
    '<section class="chead">' +
      '<a class="back" href="#">' + ICON.back + "Todos os criadores</a>" +
      '<h1 class="display chead-title" data-fit="230">' + names.map(function (n) { return '<span class="line"><span>' + esc(n) + "</span></span>"; }).join("") + "</h1>" +
      '<div class="chead-meta" data-in><a href="https://www.instagram.com/' + esc(p.arroba) + '/" target="_blank" rel="noopener">@' + esc(p.arroba) + "</a><span>" + esc(p.seguidores) + " seguidores</span>" + (p.nova ? '<span class="new">Nova no time</span>' : "") + "<span>" + esc(p.nicho) + "</span></div>" +
      '<div class="chead-grid">' +
        '<div class="when" data-in><div class="when-top"><span class="when-day num">' + pad(p.dia) + '</span><div class="when-info"><span>Seu Reels vai ao ar</span><b>' + esc(p.semana) + ", " + date(p.dia) + '</b><span class="cd">' + countdown(p.dia) + "</span></div></div>" +
          '<div class="steps"><div><span>Gravar</span><b>até ' + date(p.dia - 3) + "</b></div><div><span>Aprovação</span><b>até " + date(p.dia - 1) + "</b></div><div><span>No ar</span><b>" + date(p.dia) + "</b></div></div></div>" +
        '<div class="ticket" data-in><div class="ticket-main"><span>Seu cupom na Skyfit</span><b class="ticket-code">' + esc(p.cupom) + "</b>" +
          (p.cupomPendente ? '<span class="ticket-note">Cupom a confirmar com a academia</span>' : "<span>Falado e escrito em todo conteúdo</span>") + "</div>" +
          '<div class="ticket-stub"><button type="button" class="btn btn-small" data-copy="' + esc(p.cupom) + '" data-msg="Cupom ' + esc(p.cupom) + ' copiado">' + ICON.copy + "Copiar</button></div></div>" +
      "</div>" +
    "</section>" +

    '<nav class="crail" aria-label="Seções do plano"><button type="button" data-sec="perfil" class="on">Perfil</button><button type="button" data-sec="reels">Reels</button><button type="button" data-sec="stories">Stories</button><button type="button" data-sec="checklist">Checklist</button>' +
      '<span class="crail-prog"><span class="bar"><i id="pbar"></i></span><span id="ptxt">0/' + tasks.length + "</span></span></nav>" +

    '<section class="csec" id="perfil"><div class="perfil-grid">' +
      '<div><div class="csec-head"><h2 class="h2" data-title>O que vimos no seu perfil</h2></div><div class="notes" data-stg>' + p.leitura.map(function (l) { return "<p>" + esc(l) + "</p>"; }).join("") + "</div></div>" +
      '<div class="tone" data-rv><span>O tom dos seus conteúdos da Skyfit</span><p>' + esc(p.tom) + "</p></div>" +
    "</div></section>" +

    '<section class="csec" id="reels">' +
      '<div class="csec-head"><h2 class="h2" data-title>O seu Reels</h2><span class="postline" data-rv>Postar ' + esc(p.semana) + ", " + date(p.dia) + (p.black ? " · anuncia a " + esc(PLANO.oferta.nome) : "") + "</span></div>" +
      '<div class="reels-grid">' +
        '<div class="phone" id="phone" role="img" aria-label="Como o Reels aparece no celular"><div class="screen"><span class="notch"></span>' +
          '<div class="sc-top"><span>Reels</span></div>' +
          '<div class="sc-text"><span>' + esc(r.tela) + "</span></div>" +
          '<div class="sc-side">' + ICON.heart + ICON.bubble + ICON.send + "</div>" +
          '<div class="sc-bottom"><div class="sc-who"><span class="mono">' + initials(p) + "</span><b>" + esc(p.arroba) + "</b><i>Seguir</i></div><div class=\"sc-cap\">" + fill(r.legenda, p) + "</div></div>" +
          '<div class="sc-prog"><i></i></div></div></div>' +
        '<div class="script">' +
          '<div class="script-title" data-rv><h3 class="h3">' + esc(r.titulo) + "</h3><p>" + esc(r.formato) + "</p></div>" +
          '<div class="block sell" data-rv><span class="k">Por que esse vídeo vende</span><p>' + esc(r.venda) + "</p></div>" +
          '<div class="block hook" data-rv><span class="k">Os três primeiros segundos</span><p>' + fill(r.gancho, p) + "</p></div>" +
          '<ol class="scenes" data-stg>' + r.cenas.map(function (c) { return "<li><b>" + esc(c[0]) + "</b><p>" + fill(c[1], p) + "</p></li>"; }).join("") + "</ol>" +
          '<div class="pair" data-rv><div class="block"><span class="k">Onde gravar</span><p>' + esc(r.onde) + '</p></div><div class="block"><span class="k">Chamada final</span><p>' + fill(r.chamada, p) + "</p></div></div>" +
          '<div class="caption" data-rv><span class="small">Legenda pronta</span><p>' + fill(r.legenda, p) + '</p><button type="button" class="btn btn-small" data-copy="' + esc(plain(r.legenda, p)) + '" data-msg="Legenda copiada">' + ICON.copy + "Copiar legenda</button></div>" +
          '<div class="block" data-rv><span class="k">Um cuidado na gravação</span><p>' + esc(r.dica) + "</p></div>" +
        "</div>" +
      "</div>" +
    "</section>" +

    '<section class="csec" id="stories">' +
      '<div class="csec-head"><h2 class="h2" data-title>Seus Stories</h2><p class="lede" data-rv>No mínimo duas sequências por semana. Repita e alterne as ideias. Toda sequência termina com <span class="cp">' + esc(p.cupom) + "</span> falado e escrito na tela, e com a @" + esc(PLANO.instagram) + " marcada.</p></div>" +
      '<div class="stories-row" id="storiesRow" tabindex="0" aria-label="Ideias de Stories">' + p.stories.map(function (s, i) {
        return '<article class="story ' + kinds[i % kinds.length] + '"><div class="segs">' + [0, 1, 2, 3, 4].map(function (k) { return '<i class="' + (k <= i ? "on" : "") + '"></i>'; }).join("") + "</div>" +
          '<div class="who"><span class="mono">' + initials(p) + "</span><span>" + esc(p.arroba) + "</span><small>ideia " + (i + 1) + "</small></div>" +
          "<h4>" + esc(s[0]) + '</h4><div class="what">' + esc(s[1]) + '</div><div class="say">' + fill(s[2], p) + '</div><div class="stk">' + esc(p.cupom) + "</div></article>";
      }).join("") + "</div>" +
      '<p class="hint">Arraste para o lado para ver as cinco ideias.</p>' +
      '<div class="week" data-stg><div><b>Seg</b><p>Prova: você treinando ou a estrutura, com o cupom.</p></div><div><b>Qua</b><p>Desculpa: enquete ou caixinha, respondida da academia.</p></div><div><b>Sex</b><p>Oferta: ' + esc(PLANO.oferta.frase.toLowerCase()) + " até " + esc(PLANO.oferta.fimTexto) + ", com o cupom.</p></div></div>" +
    "</section>" +

    '<section class="csec" id="checklist">' +
      '<div class="check-grid">' +
        '<div class="ring" data-rv><h2 class="h2">Seu checklist</h2><div class="ring-wrap"><svg viewBox="0 0 160 160"><circle class="bg" cx="80" cy="80" r="70"/><circle class="fg" id="ringfg" cx="80" cy="80" r="70" stroke-dasharray="439.82" stroke-dashoffset="439.82"/></svg><div class="ring-pc" id="ringpc">0%</div></div><p class="small" id="syncst">Fica salvo neste aparelho.</p></div>' +
        '<div class="tasks">' + ["Reels", "Stories"].map(function (g) {
          return '<div class="tgroup" data-rv><h3>' + g + "<small>" + (g === "Reels" ? "um vídeo" : "duas sequências por semana") + "</small></h3>" + tasks.filter(function (t) { return t.g === g; }).map(function (t) {
            return '<label class="task"><input type="checkbox" id="ck-' + p.slug + "-" + t.id + '" data-task="' + t.id + '"' + (done[t.id] ? " checked" : "") + '><span class="box">' + ICON.check + '</span><span class="tx">' + esc(t.t) + '</span><span class="due">' + esc(t.due) + "</span></label>";
          }).join("") + "</div>";
        }).join("") + "</div>" +
      "</div>" +
    "</section>" +

    '<section class="others"><h2 class="h2" data-title>Os outros Reels do mês</h2><div class="others-list" data-stg>' + others.map(function (o) {
      return '<a href="#' + o.slug + '"><span class="d num">' + pad(o.dia) + '</span><span class="n">' + esc(o.nome) + '</span><span class="t">' + esc(o.reels.titulo) + "</span></a>";
    }).join("") + "</div></section>";
  }

  /* ---------- Checklist ---------- */
  var API = "/api/checklist";
  function updateProgress() {
    var all = $$("[data-task]"), n = all.filter(function (x) { return x.checked; }).length, tot = all.length;
    var pct = tot ? Math.round(n / tot * 100) : 0;
    var set = function (id, fn) { var el = document.getElementById(id); if (el) fn(el); };
    set("pbar", function (el) { el.style.width = pct + "%"; });
    set("ptxt", function (el) { el.textContent = n + "/" + tot; });
    set("ringfg", function (el) { el.style.strokeDashoffset = 439.82 * (1 - pct / 100); });
    set("ringpc", function (el) { el.textContent = pct + "%"; });
  }
  function saveRemote(slug, task, done) {
    if (!online) return;
    fetch(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ mes: PLANO.mes, slug: slug, task: task, done: done }) })
      .then(function (r) { if (!r.ok) throw new Error(); })
      .catch(function () { toast("Não salvou. Confira a internet e marque de novo."); });
  }
  function syncChecklist(p) {
    fetch(API + "?mes=" + encodeURIComponent(PLANO.mes) + "&slug=" + encodeURIComponent(p.slug), { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j || !j.tasks || current !== p) return;
        online = true;
        var key = "skyfit-" + PLANO.mes + "-" + p.slug, local = store(key);
        $$("[data-task]").forEach(function (el) {
          var id = el.dataset.task;
          if (id in j.tasks) el.checked = !!j.tasks[id];
          else if (local[id]) saveRemote(p.slug, id, true);
          local[id] = el.checked;
        });
        store(key, local);
        updateProgress();
        var st = $("#syncst"); if (st) st.textContent = "Fica salvo, e a gestão acompanha por aqui.";
      })
      .catch(function () {});
  }

  /* ---------- Relógio da oferta ---------- */
  function startClock() {
    clearInterval(clockTimer);
    var box = $("#clock"); if (!box) return;
    var cells = $$("b", box), end = new Date(PLANO.oferta.fim).getTime();
    function tick() {
      var s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      var v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      cells.forEach(function (c, i) { c.textContent = pad(v[i]); });
    }
    tick(); clockTimer = setInterval(tick, 1000);
  }

  /* ---------- Títulos que ocupam a largura ---------- */
  function fitTitles() {
    $$("[data-fit]").forEach(function (el) {
      var max = parseFloat(el.dataset.fit), cs = getComputedStyle(el.parentNode);
      var box = el.parentNode.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      el.style.fontSize = "100px";
      var widest = 0;
      $$(".line > span", el).forEach(function (s) { s.style.display = "inline-block"; widest = Math.max(widest, s.getBoundingClientRect().width); s.style.display = ""; });
      if (!widest) return;
      el.style.fontSize = Math.min(max, Math.floor(box / widest * 100 * 0.985)) + "px";
    });
  }

  /* ---------- Animações ---------- */
  function splitWords(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(function (w) { return '<span class="w">' + esc(w) + "</span>"; }).join(" ");
    return $$(".w", el);
  }
  function killMotion() {
    if (!hasGsap) return;
    ScrollTrigger.getAll().forEach(function (t) { t.kill(); });
    // Só o que está dentro da página: a abertura e o topo têm animações próprias.
    gsap.killTweensOf($$("*", app));
  }
  function revealCommon() {
    $$("[data-title]").forEach(function (el) {
      el.innerHTML = '<span class="line"><span>' + el.innerHTML + "</span></span>";
      gsap.from(el.firstChild.firstChild, { yPercent: 110, duration: 1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    $$("[data-rv]").forEach(function (el) {
      gsap.from(el, { y: 44, autoAlpha: 0, duration: .9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });
    $$("[data-stg]").forEach(function (box) {
      gsap.from(box.children, { y: 36, autoAlpha: 0, duration: .8, ease: "power3.out", stagger: .09, scrollTrigger: { trigger: box, start: "top 88%", once: true } });
    });
  }
  function enterHead(delay) {
    var tl = gsap.timeline({ delay: delay || 0 });
    tl.from($$("h1 .line > span", app), { yPercent: 112, duration: 1.1, ease: "power4.out", stagger: .09 })
      .from($$("[data-in]", app), { y: 26, autoAlpha: 0, duration: .8, ease: "power3.out", stagger: .1 }, "-=.7");
    return tl;
  }
  function motionHome(delay) {
    enterHead(delay);
    gsap.to(".hero-title", { yPercent: -14, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

    var words = splitWords($("#manifesto"));
    gsap.fromTo(words, { opacity: .13 }, { opacity: 1, ease: "none", stagger: .1, scrollTrigger: { trigger: "#manifesto", start: "top 78%", end: "bottom 52%", scrub: true } });

    var rail = $("#rail"), sec = $("#agenda");
    if (wide.matches) {
      sec.classList.add("is-pinned");
      var dist = function () { return Math.max(0, rail.scrollWidth - window.innerWidth); };
      gsap.to(rail, {
        x: function () { return -dist(); }, ease: "none",
        scrollTrigger: {
          trigger: sec, start: "top top+=57", end: function () { return "+=" + dist(); }, pin: true, scrub: .7, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: function (st) {
            gsap.set("#railBar", { scaleX: st.progress });
            $("#railCount").textContent = pad(Math.min(PEOPLE.length, 1 + Math.round(st.progress * (PEOPLE.length - 1)))) + " / " + pad(PEOPLE.length);
          }
        }
      });
    } else {
      gsap.from($$(".slot", rail), { y: 60, autoAlpha: 0, duration: .9, ease: "power3.out", stagger: .1, scrollTrigger: { trigger: rail, start: "top 86%", once: true } });
    }
    $$(".slot-day", rail).forEach(function (el) {
      var to = parseInt(el.textContent, 10), o = { v: 0 };
      gsap.to(o, { v: to, duration: 1.2, ease: "power2.out", onUpdate: function () { el.textContent = pad(Math.round(o.v)); }, scrollTrigger: { trigger: el, start: "top 92%", once: true } });
    });

    var tag = $("#tagNum"), price = { v: 99.9 }, target = parseFloat(PLANO.oferta.preco.replace(",", "."));
    gsap.to(price, { v: target, duration: 1.8, ease: "power3.out", onUpdate: function () { tag.textContent = price.v.toFixed(2).replace(".", ","); }, scrollTrigger: { trigger: tag, start: "top 85%", once: true } });

    gsap.from($$(".cal-grid .day:not(.empty)"), { scale: .5, autoAlpha: 0, duration: .5, ease: "back.out(2)", stagger: .014, scrollTrigger: { trigger: ".cal-grid", start: "top 85%", once: true } });
    revealCommon();
  }
  function motionCreator(delay) {
    enterHead(delay);
    var day = $(".when-day"), to = parseInt(day.textContent, 10), o = { v: 0 };
    gsap.to(o, { v: to, duration: 1.3, delay: (delay || 0) + .3, ease: "power2.out", onUpdate: function () { day.textContent = pad(Math.round(o.v)); } });
    gsap.from(".ticket", { rotate: -5, transformOrigin: "0% 100%", duration: 1.1, delay: (delay || 0) + .4, ease: "elastic.out(1, .55)" });

    var phone = $("#phone");
    gsap.from(phone, { y: 90, rotate: -5, autoAlpha: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: phone, start: "top 88%", once: true } });
    gsap.from(".sc-text span", { scale: .4, autoAlpha: 0, duration: .7, ease: "back.out(2)", scrollTrigger: { trigger: phone, start: "top 70%", once: true } });
    gsap.from($$(".sc-side svg"), { scale: 0, duration: .5, ease: "back.out(3)", stagger: .1, scrollTrigger: { trigger: phone, start: "top 66%", once: true } });

    gsap.from($$(".story"), { x: 120, rotate: 6, autoAlpha: 0, duration: .9, ease: "power3.out", stagger: .09, scrollTrigger: { trigger: "#storiesRow", start: "top 86%", once: true } });
    gsap.from($$(".task"), { x: -24, autoAlpha: 0, duration: .6, ease: "power3.out", stagger: .05, scrollTrigger: { trigger: ".tasks", start: "top 86%", once: true } });
    revealCommon();
  }

  function setupSpy() {
    if (spy) window.removeEventListener("scroll", spy);
    var last = "", ticking = false;
    function update() {
      ticking = false;
      var secs = $$(".csec"); if (!secs.length) return;
      var cur = secs[0].id, line = window.innerHeight * .35;
      secs.forEach(function (s) { if (s.getBoundingClientRect().top <= line) cur = s.id; });
      if (cur === last) return; last = cur;
      $$(".crail [data-sec]").forEach(function (b) {
        var on = b.dataset.sec === cur; b.classList.toggle("on", on);
        if (on) b.scrollIntoView({ block: "nearest", inline: "center" });
      });
    }
    spy = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", spy, { passive: true });
  }

  /* ---------- Rotas ---------- */
  function render(first) {
    var slug = location.hash.replace(/^#/, "");
    var p = PEOPLE.filter(function (x) { return x.slug === slug; })[0] || null;
    current = p;
    killMotion();
    app.innerHTML = p ? creatorHtml(p) : homeHtml();
    document.title = p ? p.curto + ": plano de " + PLANO.mesNome.toLowerCase() + " · Skyfit Santa Isabel" : "Skyfit Santa Isabel: plano de conteúdo de " + PLANO.mesNome.toLowerCase();
    renderNav();
    fitTitles();
    // A fonte pode chegar depois da primeira medida.
    [250, 900, 2200].forEach(function (ms) { setTimeout(fitTitles, ms); });
    if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0);
    if (p) { updateProgress(); setupSpy(); syncChecklist(p); } else startClock();
    if (hasGsap) {
      gsap.set(app, { autoAlpha: 1, y: 0 });
      (p ? motionCreator : motionHome)(first ? 0 : .05);
      ScrollTrigger.refresh();
    }
  }
  function go() {
    if (!hasGsap || !started) { render(false); return; }
    gsap.to(app, { autoAlpha: 0, y: -16, duration: .22, ease: "power2.in", onComplete: function () { render(false); } });
  }

  /* ---------- Abertura ---------- */
  function intro() {
    var start = $("#start");
    function done() { document.body.classList.remove("is-loading"); start.remove(); started = true; if (lenis) lenis.start(); }
    if (!hasGsap) { render(true); done(); return; }
    var num = $("#startNum"), o = { v: 99.9 }, target = parseFloat(PLANO.oferta.preco.replace(",", "."));
    gsap.set(app, { autoAlpha: 0 });
    var tl = gsap.timeline();
    tl.to(o, { v: target, duration: 1.25, ease: "power3.inOut", onUpdate: function () { num.textContent = o.v.toFixed(2).replace(".", ","); } })
      .to("#startBar", { scaleX: 1, duration: 1.25, ease: "power3.inOut" }, 0)
      .to(".start-price", { color: "#e3141c", duration: .25 }, 1.15)
      .to(".start-price", { scale: 1.06, duration: .18, yoyo: true, repeat: 1, ease: "power2.out" }, 1.2)
      .add(function () { render(true); }, 1.55)
      .to(start, { yPercent: -100, duration: .9, ease: "power4.inOut", onComplete: done }, 1.6);
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("click", function (e) {
    var c = e.target.closest("[data-copy]");
    if (c) {
      var msg = c.dataset.msg || "Copiado";
      (navigator.clipboard ? navigator.clipboard.writeText(c.dataset.copy) : Promise.reject()).then(function () { toast(msg); }, function () { toast("Não deu para copiar. Selecione o texto e copie."); });
      if (hasGsap) gsap.fromTo(c, { scale: .9 }, { scale: 1, duration: .5, ease: "elastic.out(1, .5)" });
      return;
    }
    var s = e.target.closest("[data-sec]");
    if (s) {
      var el = document.getElementById(s.dataset.sec); if (!el) return;
      if (lenis) lenis.scrollTo(el, { offset: -100, duration: 1.1 }); else el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
  document.addEventListener("change", function (e) {
    var t = e.target.closest("[data-task]"); if (!t || !current) return;
    var key = "skyfit-" + PLANO.mes + "-" + current.slug, st = store(key);
    st[t.dataset.task] = t.checked; store(key, st);
    saveRemote(current.slug, t.dataset.task, t.checked);
    updateProgress();
    if (t.checked) toast("Marcado como feito");
  });
  window.addEventListener("hashchange", go);
  var resizeTimer;
  window.addEventListener("resize", function () { clearTimeout(resizeTimer); resizeTimer = setTimeout(function () { fitTitles(); if (hasGsap) ScrollTrigger.refresh(); }, 150); });
  if (wide.addEventListener) wide.addEventListener("change", function () { if (started) render(false); });
  // A fonte só começa a baixar quando a página é montada; quando chegar, os títulos são medidos de novo.
  function refit() { fitTitles(); if (hasGsap) ScrollTrigger.refresh(); }
  if (document.fonts) {
    if (document.fonts.addEventListener) document.fonts.addEventListener("loadingdone", refit);
    if (document.fonts.load) document.fonts.load('800 100px "Archivo"').then(refit, function () {});
  }

  /* ---------- Início de tudo ---------- */
  if (hasGsap) {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof window.Lenis !== "undefined" && canHover) {
      lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      lenis.stop();
    }
  }
  intro();
})();
