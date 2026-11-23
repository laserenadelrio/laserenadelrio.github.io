// Juegos para la mesa (pedido de Marcos del 23/11/2026).
// Este archivo se descarga recién cuando alguien abre un juego: no pesa en la carga de la carta.
// Juegos: ta-te-ti (cabaña contra trébol), ahorcado versión sudestada y memotest de la carta.
// JUEGOS.abrir(id, contenedor) dibuja el juego dentro de la hoja que sube desde abajo.
(function () {
  var RESENA = "https://g.page/r/CQ9DtrWkzZs1EAE/review";

  // Estilos propios de los juegos (se agregan una sola vez).
  var css = document.createElement("style");
  css.textContent = [
    ".jg { padding: 18px 16px 4px; text-align: center; }",
    ".jg h3 { margin-top: 0 !important; padding: 0 44px; }",
    ".jg .bj { color: var(--gris); font-size: 14px; margin-top: 4px; line-height: 1.4; }",
    ".jg .modos { display: flex; gap: 8px; justify-content: center; margin-top: 12px; }",
    ".jg .modos button, .jg .otra { font: inherit; font-size: 14px; font-weight: 600; border-radius: 999px; padding: 7px 14px; border: 1.5px solid var(--verde); background: transparent; color: var(--verde); cursor: pointer; }",
    ".jg .modos button.on { background: var(--verde); color: var(--papel); }",
    ".jg .marc { display: flex; justify-content: center; gap: 18px; margin-top: 12px; font-family: Bahnschrift, sans-serif; font-size: 15px; color: var(--verde); }",
    ".jg .marc span { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; }",
    ".jg .marc span.turno { background: var(--oro); color: #1d2e22; }",
    ".jg .marc svg { width: 20px; height: 20px; }",
    ".jg .msg { min-height: 24px; margin-top: 12px; font-family: Georgia, serif; font-size: 19px; color: var(--verde); }",
    ".jg .fin { margin-top: 10px; display: none; }",
    ".jg .fin.on { display: block; }",
    ".jg .fin .res { display: block; margin-top: 10px; font-size: 13.5px; color: var(--gris); }",
    ".jg .fin .res a { color: var(--verde); font-weight: 600; }",
    /* Ta-te-ti */
    ".ttt { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: min(300px, 86vw); margin: 14px auto 0; }",
    ".ttt button { aspect-ratio: 1; border: 2px solid var(--linea); border-radius: 14px; background: #fffaf0; cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 14%; }",
    ".ttt button svg { width: 100%; height: 100%; }",
    ".ttt button.gana { background: #f0e2bf; border-color: var(--oro); }",
    /* Ahorcado de la sudestada */
    ".ah svg.rio { width: min(280px, 80vw); height: auto; margin: 10px auto 0; display: block; }",
    ".ah .pal { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-size: 25px; letter-spacing: 0.14em; color: var(--verde); margin-top: 8px; word-break: break-word; line-height: 1.5; }",
    ".ah .pal .w { display: inline-block; white-space: nowrap; margin: 0 0.45em; }",
    ".ah .pista { font-size: 13px; color: var(--oro); letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; margin-top: 4px; }",
    ".ah .teclas { display: grid; grid-template-columns: repeat(9, 1fr); gap: 5px; margin: 12px auto 0; max-width: 420px; }",
    ".ah .teclas button { font: inherit; font-weight: 700; font-size: 15px; padding: 9px 0; border-radius: 8px; border: 1px solid var(--linea); background: #fffaf0; color: var(--tinta); cursor: pointer; }",
    ".ah .teclas button:disabled { opacity: 0.35; cursor: default; }",
    ".ah .teclas button.si { background: var(--verde); color: var(--papel); opacity: 1; }",
    ".ah .secreta { display: flex; gap: 8px; margin: 12px auto 0; max-width: 360px; }",
    ".ah .secreta input { flex: 1; min-width: 0; font: inherit; font-size: 16px; padding: 9px 12px; border: 1px solid var(--linea); border-radius: 10px; background: var(--crema2); }",
    ".ah .secreta button { font: inherit; font-weight: 700; border: none; border-radius: 10px; background: var(--oro); color: #1d2e22; padding: 0 14px; cursor: pointer; }",
    /* Memotest */
    ".mm { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; width: min(340px, 90vw); margin: 14px auto 0; }",
    ".mm button { aspect-ratio: 3 / 4; border: none; border-radius: 10px; cursor: pointer; font-size: 30px; background: var(--verde); color: var(--oro); position: relative; transition: transform .25s; font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif; }",
    ".mm button .do { display: block; width: 46%; margin: 0 auto; opacity: .9; }",
    ".mm button .do svg { width: 100%; height: auto; display: block; }",
    ".mm button.vista, .mm button.hecha { background: #fffaf0; border: 2px solid var(--linea); transform: rotateY(180deg); }",
    ".mm button.vista .do, .mm button.hecha .do { display: none; }",
    ".mm button span { display: none; transform: rotateY(180deg); }",
    ".mm button.vista span, .mm button.hecha span { display: inline; }",
    ".mm button.hecha { border-color: var(--oro); opacity: .85; }"
  ].join("\n");
  document.head.appendChild(css);

  function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstChild; }
  function azar(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  // Al terminar una partida: jugar otra y, con suerte, una reseña.
  function finHTML() {
    return '<div class="fin"><button class="otra" type="button">Jugar otra</button>' +
      '<span class="res">¿La están pasando bien en la cabaña? <a href="' + RESENA + '" target="_blank" rel="noopener">Contalo en Google</a> ⭐</span></div>';
  }

  // Fichas: la cabaña (techo alpino con ventanita) y el trébol de cuatro hojas.
  var CAB = '<svg viewBox="0 0 40 40" aria-label="Cabaña"><path d="M4 34 L20 5 L36 34" fill="none" stroke="#23402e" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/><rect x="16" y="21" width="8" height="9" fill="none" stroke="#23402e" stroke-width="2.6"/></svg>';
  var TRE = '<svg viewBox="0 0 40 40" aria-label="Trébol"><g fill="#b8862b"><ellipse cx="13.5" cy="13.5" rx="6.6" ry="7.6" transform="rotate(-45 13.5 13.5)"/><ellipse cx="26.5" cy="13.5" rx="6.6" ry="7.6" transform="rotate(45 26.5 13.5)"/><ellipse cx="13.5" cy="26.5" rx="6.6" ry="7.6" transform="rotate(45 13.5 26.5)"/><ellipse cx="26.5" cy="26.5" rx="6.6" ry="7.6" transform="rotate(-45 26.5 26.5)"/></g><path d="M22 23 C25 28 27 32 28 37" fill="none" stroke="#b8862b" stroke-width="2.4" stroke-linecap="round"/></svg>';

  // ---------- TA-TE-TI: cabaña contra trébol ----------
  function tateti(c) {
    var modo = "dos", tablero, turno, fin, pts = { C: 0, T: 0 }, empieza = "C";
    c.innerHTML = '<div class="jg"><h3>Ta-te-ti</h3><div class="bj">La cabaña contra el trébol. Tres en línea gana.</div>' +
      '<div class="modos"><button type="button" data-m="dos" class="on">De a dos</button><button type="button" data-m="bot">Contra la casa</button></div>' +
      '<div class="marc"><span data-j="C">' + CAB + '<b>0</b></span><span data-j="T">' + TRE + '<b>0</b></span></div>' +
      '<div class="ttt"></div><div class="msg"></div>' + finHTML() + '</div>';
    var g = c.querySelector(".ttt"), msg = c.querySelector(".msg"), f = c.querySelector(".fin");
    var L = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function ganador(t) { for (var i = 0; i < L.length; i++) { var a = L[i]; if (t[a[0]] && t[a[0]] === t[a[1]] && t[a[1]] === t[a[2]]) return a; } return null; }
    function dibujar() {
      g.innerHTML = tablero.map(function (v, i) { return '<button type="button" data-i="' + i + '" aria-label="Casilla ' + (i + 1) + '">' + (v === "C" ? CAB : v === "T" ? TRE : "") + '</button>'; }).join("");
      c.querySelectorAll(".marc span").forEach(function (s) { var j = s.getAttribute("data-j"); s.classList.toggle("turno", !fin && j === turno); s.querySelector("b").textContent = pts[j]; });
    }
    function nueva() { tablero = ["", "", "", "", "", "", "", "", ""]; turno = empieza; fin = false; empieza = empieza === "C" ? "T" : "C"; msg.textContent = ""; f.classList.remove("on"); dibujar(); if (modo === "bot" && turno === "T") setTimeout(jugadaBot, 450); }
    function jugar(i) {
      if (fin || tablero[i]) return;
      tablero[i] = turno;
      var w = ganador(tablero);
      if (w) {
        fin = true; pts[turno]++; dibujar();
        w.forEach(function (k) { g.children[k].classList.add("gana"); });
        msg.textContent = modo === "bot" ? (turno === "C" ? "¡Le ganaste a la casa! 🎉" : "Ganó la casa. ¿La revancha?") : (turno === "C" ? "¡Ganó la cabaña!" : "¡Ganó el trébol! ¡Sláinte!");
        f.classList.add("on"); return;
      }
      if (tablero.every(Boolean)) { fin = true; dibujar(); msg.textContent = "Empate. Como el río: tranqui."; f.classList.add("on"); return; }
      turno = turno === "C" ? "T" : "C"; dibujar();
      if (modo === "bot" && turno === "T") setTimeout(jugadaBot, 450);
    }
    // La casa juega bien pero no perfecto: gana si puede, tapa si hace falta y a veces se distrae.
    function jugadaBot() {
      if (fin) return;
      var libres = tablero.map(function (v, i) { return v ? -1 : i; }).filter(function (i) { return i >= 0; });
      function busca(j) { for (var k = 0; k < libres.length; k++) { var t = tablero.slice(); t[libres[k]] = j; if (ganador(t)) return libres[k]; } return -1; }
      var i = busca("T");
      if (i < 0 && Math.random() < 0.85) i = busca("C");
      if (i < 0 && !tablero[4] && Math.random() < 0.7) i = 4;
      if (i < 0) i = libres[Math.floor(Math.random() * libres.length)];
      jugar(i);
    }
    g.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b || (modo === "bot" && turno === "T")) return; jugar(+b.getAttribute("data-i")); });
    c.querySelectorAll(".modos button").forEach(function (b) {
      b.addEventListener("click", function () {
        modo = b.getAttribute("data-m"); pts = { C: 0, T: 0 }; empieza = "C";
        c.querySelectorAll(".modos button").forEach(function (x) { x.classList.toggle("on", x === b); }); nueva();
      });
    });
    c.querySelector(".otra").addEventListener("click", nueva);
    nueva();
  }

  // ---------- AHORCADO, versión sudestada: con cada error sube el río ----------
  var PALABRAS = [
    ["HORNO DE BARRO", "La Serena"], ["CABAÑA", "La Serena"], ["PIZZA LIBRE", "Los miércoles"], ["NOCHE DE TRUCO", "Los jueves"],
    ["VERMUT", "Los martes"], ["SUDESTADA", "El río"], ["PASEO VICTORICA", "Tigre"], ["DELTA", "El río"], ["RIO LUJAN", "El río"],
    ["EMPANADA DE CARNE", "La carta"], ["MILANESA NAPOLITANA", "La carta"], ["LIMONADA", "La carta"], ["PROVOLETA", "La carta"],
    ["FUGAZZETA", "La carta"], ["MUZZARELLA", "La carta"], ["CHOCOTORTA", "La carta"], ["MEDIALUNAS", "La carta"], ["SUBMARINO", "La carta"],
    ["TREBOL", "Suerte irlandesa"], ["SLAINTE", "Brindis irlandés"], ["CHINCHON", "Jueves de juegos"], ["GENERALA", "Jueves de juegos"],
    ["LANCHA COLECTIVA", "Tigre"], ["REMO", "Tigre"], ["PUERTO DE FRUTOS", "Tigre"], ["MATE", "Clásico"], ["DECK", "La Serena"], ["TETERA", "En la vereda"]
  ];
  var MAX = 6;
  function sinAcento(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function rio(errores) {
    // El agua sube de a un escalón por error; con 6 llega al techo de la cabaña.
    var nivel = 150 - errores * 17, ola = "M0 " + nivel + " q 17.5 -6 35 0 t 35 0 t 35 0 t 35 0 t 35 0 t 35 0 t 35 0 t 35 0 V 170 H 0 Z";
    return '<svg class="rio" viewBox="0 0 280 170" aria-hidden="true">' +
      '<rect width="280" height="170" rx="14" fill="#fbf7ee"/>' +
      // La cabaña: solo el techo alpino hasta el piso, con su ventanita (como en el logo).
      '<path d="M76 150 L140 34 L204 150" fill="#f6f0e4" stroke="#23402e" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<rect x="128" y="100" width="24" height="28" fill="none" stroke="#23402e" stroke-width="3.5"/>' +
      '<line x1="62" y1="150" x2="218" y2="150" stroke="#a8502a" stroke-width="3"/>' +
      '<path d="' + ola + '" fill="rgba(70,120,140,.55)" style="transition: d .5s"/>' +
      '<text x="270" y="22" text-anchor="end" font-family="Bahnschrift, sans-serif" font-size="14" fill="#776e63">' + (MAX - errores) + ' de ' + MAX + '</text></svg>';
  }
  function ahorcado(c) {
    var modo = "casa", pal, pista, usadas, errores, fin;
    c.innerHTML = '<div class="jg ah"><h3>Ahorcado de la sudestada</h3><div class="bj">Adiviná la palabra antes de que el río tape la cabaña.</div>' +
      '<div class="modos"><button type="button" data-m="casa" class="on">Palabras de la casa</button><button type="button" data-m="dos">Una de ustedes</button></div>' +
      '<div class="zona"></div><div class="msg"></div>' + finHTML() + '</div>';
    var z = c.querySelector(".zona"), msg = c.querySelector(".msg"), f = c.querySelector(".fin");
    function limpia(s) { return sinAcento(s.toUpperCase()).replace(/[^A-ZÑ ]/g, "").replace(/\s+/g, " ").trim(); }
    function empezar(p, pi) {
      pal = limpia(p); pista = pi; usadas = {}; errores = 0; fin = false; msg.textContent = ""; f.classList.remove("on");
      var letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
      z.innerHTML = '<div class="dib"></div><div class="pista">' + pista + '</div><div class="pal"></div><div class="teclas">' +
        letras.map(function (l) { return '<button type="button" data-l="' + l + '">' + l + '</button>'; }).join("") + '</div>';
      z.querySelector(".teclas").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b && !b.disabled) probar(b.getAttribute("data-l"), b); });
      pintar();
    }
    function pintar() {
      z.querySelector(".dib").innerHTML = rio(errores);
      // Cada palabra en su bloque, así se ve dónde termina una y empieza la otra.
      z.querySelector(".pal").innerHTML = pal.split(" ").map(function (w) {
        return '<span class="w">' + w.split("").map(function (l) { return usadas[l] || fin ? l : "_"; }).join(" ") + '</span>';
      }).join("");
    }
    function probar(l, b) {
      if (fin) return;
      usadas[l] = 1; b.disabled = true;
      if (pal.indexOf(l) >= 0) b.classList.add("si"); else errores++;
      var completa = pal.replace(/ /g, "").split("").every(function (x) { return usadas[x]; });
      if (completa) { fin = true; msg.textContent = "¡Bien ahí! La cabaña sigue seca ☀️"; f.classList.add("on"); }
      else if (errores >= MAX) { fin = true; msg.textContent = "¡Sudestada! Era: " + pal; f.classList.add("on"); }
      pintar();
    }
    function deLaCasa() { var p = PALABRAS[Math.floor(Math.random() * PALABRAS.length)]; empezar(p[0], p[1]); }
    // De a dos: uno escribe la palabra sin que el otro mire y le pasa el celular.
    function secreta() {
      msg.textContent = ""; f.classList.remove("on");
      z.innerHTML = '<div class="bj" style="margin-top:14px">Uno escribe la palabra sin que el otro mire y después le pasa el celular.</div>' +
        '<form class="secreta"><input type="password" autocomplete="off" maxlength="30" placeholder="Palabra secreta" aria-label="Palabra secreta"><button type="submit">Listo</button></form>';
      var fo = z.querySelector("form"), inp = fo.querySelector("input");
      fo.addEventListener("submit", function (e) { e.preventDefault(); var v = limpia(inp.value); if (v.replace(/ /g, "").length < 2) { inp.focus(); return; } empezar(v, "Palabra secreta"); });
    }
    c.querySelectorAll(".modos button").forEach(function (b) {
      b.addEventListener("click", function () { modo = b.getAttribute("data-m"); c.querySelectorAll(".modos button").forEach(function (x) { x.classList.toggle("on", x === b); }); modo === "casa" ? deLaCasa() : secreta(); });
    });
    c.querySelector(".otra").addEventListener("click", function () { modo === "casa" ? deLaCasa() : secreta(); });
    deLaCasa();
  }

  // ---------- MEMOTEST de la carta: de a dos, por turnos ----------
  var FICHAS = ["🍕", "🥟", "🍋", "🍺", "☕", "🍰", "🧉", "🍔"];
  function memotest(c) {
    var cartas, abiertas, turno, pts, bloqueo, hechas;
    c.innerHTML = '<div class="jg"><h3>Memotest</h3><div class="bj">Por turnos: si encontrás el par, seguís jugando.</div>' +
      '<div class="marc"><span data-j="0">Jugador 1 · <b>0</b></span><span data-j="1">Jugador 2 · <b>0</b></span></div>' +
      '<div class="mm"></div><div class="msg"></div>' + finHTML() + '</div>';
    var g = c.querySelector(".mm"), msg = c.querySelector(".msg"), f = c.querySelector(".fin");
    function marcador() { c.querySelectorAll(".marc span").forEach(function (s) { var j = +s.getAttribute("data-j"); s.classList.toggle("turno", hechas < FICHAS.length && j === turno); s.querySelector("b").textContent = pts[j]; }); }
    function nueva() {
      cartas = azar(FICHAS.concat(FICHAS)); abiertas = []; turno = 0; pts = [0, 0]; bloqueo = false; hechas = 0;
      msg.textContent = ""; f.classList.remove("on");
      g.innerHTML = cartas.map(function (x, i) { return '<button type="button" data-i="' + i + '" aria-label="Carta ' + (i + 1) + '"><i class="do">' + TRE + '</i><span>' + x + '</span></button>'; }).join("");
      marcador();
    }
    g.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b || bloqueo || b.classList.contains("vista") || b.classList.contains("hecha")) return;
      b.classList.add("vista"); abiertas.push(b);
      if (abiertas.length < 2) return;
      var a = abiertas[0], d = abiertas[1]; abiertas = [];
      if (cartas[+a.getAttribute("data-i")] === cartas[+d.getAttribute("data-i")]) {
        a.classList.replace("vista", "hecha"); d.classList.replace("vista", "hecha"); pts[turno]++; hechas++; marcador();
        if (hechas === FICHAS.length) {
          msg.textContent = pts[0] === pts[1] ? "¡Empate! Se pide otra ronda." : "¡Ganó el jugador " + (pts[0] > pts[1] ? 1 : 2) + "! 🎉";
          f.classList.add("on");
        }
      } else {
        bloqueo = true;
        setTimeout(function () { a.classList.remove("vista"); d.classList.remove("vista"); turno = 1 - turno; bloqueo = false; marcador(); }, 900);
      }
    });
    c.querySelector(".otra").addEventListener("click", nueva);
    nueva();
  }

  window.JUEGOS = {
    abrir: function (id, cont) { ({ tateti: tateti, ahorcado: ahorcado, memotest: memotest }[id] || tateti)(cont); }
  };
})();
