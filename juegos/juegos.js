// Juegos para la mesa (pedido de Marcos del 23/11/2026).
// Este archivo se descarga recién cuando alguien abre un juego: no pesa en la carga de la carta.
// Juegos: ta-te-ti (cabaña contra tetera), ahorcado versión sudestada, memotest de la carta (23/11),
// cuatro en línea, ¿qué plato es? y generala con la promo del Jueves de Juegos (también del 23/11).
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
    // El turno lo marca el cartel grande; el marcador queda solo con los puntos.
    ".jg .marc span.turno { background: none; }",
    ".jg .marc svg { width: 20px; height: 20px; }",
    ".jg .msg { min-height: 24px; margin-top: 12px; font-family: Georgia, serif; font-size: 19px; color: var(--verde); }",
    ".jg .fin { margin-top: 10px; display: none; }",
    ".jg .fin.on { display: block; }",
    ".jg .fin .res { display: block; margin-top: 10px; font-size: 13.5px; color: var(--gris); }",
    ".jg .fin .res a { color: var(--verde); font-weight: 600; }",
    /* Ta-te-ti */
    // Ta-te-ti sobre el dibujo del "#". Las fichas van posicionadas encima de la celda: no pueden agrandarla.
    ".ttt { position: relative; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr)); width: min(290px, 80vw); aspect-ratio: 1; margin: 14px auto 0; }",
    ".ttt .hash { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }",
    ".ttt button { position: relative; min-width: 0; min-height: 0; border: none; background: transparent; padding: 0; margin: 0; cursor: pointer; border-radius: 12px; -webkit-tap-highlight-color: transparent; }",
    ".ttt button svg { position: absolute; left: 17%; top: 17%; width: 66%; height: 66%; }",
    ".ttt button.nueva svg { animation: pone .25s ease-out; }",
    ".confeti i svg { width: 100%; height: 100%; display: block; }",
    ".ttt button.gana::before { content: ''; position: absolute; inset: 9%; border-radius: 50%; background: rgba(184,134,43,.28); }",
    ".ttt button.gana svg, .c4 button.gana svg { animation: late .55s ease-in-out 4; }",
    "@keyframes pone { from { transform: scale(.3); opacity: 0; } }",
    "@keyframes late { 50% { transform: scale(1.22); } }",
    /* Cartel de turno: bien visible, cambia de color según a quién le toca */
    ".tbw { margin-top: 12px; min-height: 44px; }",
    ".turnob { display: inline-flex; align-items: center; gap: 9px; padding: 7px 16px 7px 8px; border-radius: 999px; font-size: 16px; font-weight: 700; background: var(--verde); color: var(--papel); box-shadow: 0 3px 10px rgba(31,58,43,.25); }",
    ".turnob.oro { background: var(--oro); color: #1d2e22; }",
    ".turnob.barro { background: var(--barro); }",
    ".turnob.rio { background: #4a7a8c; }",
    ".turnob.nada { visibility: hidden; }",
    ".turnob .fi { width: 30px; height: 30px; border-radius: 50%; background: #fffaf0; display: flex; align-items: center; justify-content: center; flex: none; font-family: Bahnschrift, sans-serif; color: var(--verde); }",
    ".turnob .fi svg { width: 22px; height: 22px; }",
    ".turnob.cambia { animation: cambia .4s ease-out; }",
    "@keyframes cambia { 0% { transform: scale(.7); opacity: .3; } 70% { transform: scale(1.08); } }",
    /* Festejo al ganar: papelitos y tréboles que caen */
    ".confeti { position: fixed; inset: 0; pointer-events: none; z-index: 30; overflow: hidden; }",
    ".confeti i { position: absolute; top: -40px; display: block; animation: cae linear forwards; }",
    "@keyframes cae { to { transform: translateY(110vh) rotate(720deg); } }",
    /* Ahorcado de la sudestada */
    ".ah svg.rio { width: min(280px, 80vw); height: auto; margin: 10px auto 0; display: block; }",
    ".ah .pal { font-family: Bahnschrift, 'Segoe UI', sans-serif; font-size: 25px; letter-spacing: 0.14em; color: var(--verde); margin-top: 8px; word-break: break-word; line-height: 1.5; }",
    ".ah .vidas { margin-top: 8px; }",
    ".ah .vidas .aros { display: flex; justify-content: center; gap: 6px; }",
    ".ah .vidas .aros svg { width: 26px; height: 26px; }",
    ".ah .vidas .vt { font-size: 15px; color: var(--verde); margin-top: 4px; }",
    ".ah .vidas .vt b { font-family: Bahnschrift, sans-serif; font-size: 18px; }",
    ".ah .vidas.poca .vt { color: var(--barro); font-weight: 600; }",
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
    ".mm button { aspect-ratio: 3 / 4; border: none; border-radius: 10px; cursor: pointer; font-size: 30px; background: var(--verde); color: var(--oro); position: relative; overflow: hidden; padding: 0; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif; }",
    ".mm button .do { display: block; width: 46%; opacity: .9; }",
    ".mm button .do svg { width: 100%; height: auto; display: block; }",
    ".mm button img, .mm button span, .mm button em { display: none; }",
    ".mm button.vista, .mm button.hecha { background: #fffaf0; box-shadow: inset 0 0 0 2px var(--linea); animation: gira .25s ease-out; }",
    "@keyframes gira { from { transform: scaleX(0.1); } }",
    ".mm button.vista .do, .mm button.hecha .do { display: none; }",
    ".mm button.vista img, .mm button.hecha img { display: block; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }",
    ".mm button.vista span, .mm button.hecha span { display: inline; }",
    // Cuando se encuentra el par, se ve el nombre del plato abajo de la foto.
    ".mm button.hecha { box-shadow: inset 0 0 0 3px var(--oro); }",
    /* Cuatro en línea */
    ".c4 { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; background: var(--verde); padding: 7px; border-radius: 14px; width: min(340px, 90vw); margin: 14px auto 0; }",
    ".c4 button { position: relative; aspect-ratio: 1; min-width: 0; border: none; border-radius: 50%; background: #fffaf0; padding: 0; margin: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }",
    ".c4 button svg { position: absolute; left: 15%; top: 15%; width: 70%; height: 70%; }",
    ".c4 button.cae svg { animation: caeficha .35s ease-in; }",
    "@keyframes caeficha { from { transform: translateY(-500%); } }",
    ".c4 button.gana { background: #f0e2bf; box-shadow: 0 0 0 3px var(--oro); }",
    /* ¿Qué plato es? */
    ".qp .marc { gap: 10px; }",
    ".qp .qf { width: min(340px, 90vw); aspect-ratio: 4 / 3; margin: 12px auto 0; border-radius: 14px; overflow: hidden; background: #ece2cd; }",
    ".qp .qf img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s, filter .5s; }",
    ".qp .qv { font-size: 14px; color: var(--verde); margin-top: 8px; min-height: 20px; }",
    ".qp .alejar, .qp .sig { font: inherit; font-size: 14px; font-weight: 600; margin-top: 8px; border-radius: 999px; padding: 7px 14px; border: 1.5px solid var(--verde); background: transparent; color: var(--verde); cursor: pointer; }",
    ".qp .sig { background: var(--oro); border-color: var(--oro); color: #1d2e22; margin-top: 10px; }",
    ".qp .qo { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px auto 0; max-width: 380px; }",
    ".qp .qo button { font: inherit; font-size: 14.5px; font-weight: 600; padding: 11px 8px; border-radius: 12px; border: 1.5px solid var(--linea); background: #fffaf0; color: var(--tinta); cursor: pointer; line-height: 1.25; }",
    ".qp .qo button.si { background: var(--verde); color: var(--papel); border-color: var(--verde); }",
    ".qp .qo button.no { background: var(--barro); color: var(--papel); border-color: var(--barro); }",
    ".qp .qo button:disabled { cursor: default; }",
    /* Generala */
    ".ge .promoj { background: var(--verde); color: var(--papel); border-radius: 14px; padding: 12px 14px; margin: 12px auto 0; max-width: 420px; text-align: left; position: relative; }",
    ".ge .promoj::before { content: ''; position: absolute; inset: 5px; border: 1px solid rgba(184,134,43,.55); border-radius: 10px; pointer-events: none; }",
    ".ge .promoj .pt { font-family: Georgia, serif; font-size: 18px; color: var(--oro); }",
    ".ge .promoj .ps { font-size: 13.5px; line-height: 1.45; color: #e9e1cf; margin-top: 4px; }",
    ".ge .promoj .btn { margin-top: 10px; font-size: 14px; padding: 9px 12px; position: relative; }",
    ".ge .modos { align-items: center; }",
    ".ge .modos .ml { font-size: 14px; color: var(--gris); }",
    ".ge .modos button { padding: 6px 13px; }",
    ".ge .gt { margin-top: 6px; font-size: 14px; color: var(--gris); min-height: 18px; }",
    ".ge .plan th.yo.c0 { background: var(--verde); color: var(--papel); }",
    ".ge .plan th.yo.c2 { background: var(--barro); color: var(--papel); }",
    ".ge .plan th.yo.c3 { background: #4a7a8c; color: var(--papel); }",
    ".ge .dados { display: flex; justify-content: center; gap: 7px; margin-top: 10px; }",
    ".ge .dados button { width: 56px; border: none; background: none; padding: 0; cursor: pointer; display: flex; flex-direction: column; align-items: center; }",
    ".ge .dados button svg { width: 56px; height: 56px; display: block; }",
    ".ge .dados button.gu svg rect { fill: #f0e2bf; stroke: #b8862b; stroke-width: 7; }",
    ".ge .dados button i { font-style: normal; font-size: 10px; font-weight: 700; color: var(--oro); margin-top: 2px; white-space: nowrap; }",
    ".ge .ayuda { font-size: 13px; color: var(--gris); margin-top: 10px; }",
    ".ge .dados button.rueda svg { animation: rueda .35s ease-out; }",
    "@keyframes rueda { from { transform: rotate(-200deg) scale(.6); } }",
    ".ge .tirar { font: inherit; font-weight: 700; font-size: 15px; margin-top: 12px; border: none; border-radius: 10px; background: var(--oro); color: #1d2e22; padding: 11px 22px; cursor: pointer; }",
    ".ge .tirar:disabled { background: var(--linea); color: var(--gris); cursor: default; }",
    ".ge .plan table { width: 100%; max-width: 420px; margin: 12px auto 0; border-collapse: collapse; font-size: 14px; }",
    ".ge .plan th, .ge .plan td { border-bottom: 1px dotted #cdbd9f; padding: 5px 4px; text-align: center; }",
    ".ge .plan td:first-child { text-align: left; color: var(--tinta); white-space: nowrap; }",
    ".ge .plan th { font-family: Bahnschrift, sans-serif; color: var(--gris); font-weight: 600; }",
    ".ge .plan th.yo { color: #1d2e22; background: var(--oro); border-radius: 6px 6px 0 0; }",
    ".ge .plan td { font-family: Bahnschrift, sans-serif; color: var(--verde); font-weight: 600; }",
    ".ge .plan td.tacha { color: #b3a68e; }",
    ".ge .plan td button { font: inherit; font-size: 13px; border-radius: 999px; padding: 3px 9px; cursor: pointer; border: 1.5px solid var(--verde); background: var(--verde); color: var(--papel); }",
    ".ge .plan td button.ta { background: transparent; color: var(--gris); border-color: var(--linea); }",
    ".ge .plan tr.tt td { border-bottom: none; border-top: 2px solid var(--oro); font-size: 15px; }",
    ".mm button.hecha em { display: block; position: absolute; left: 0; right: 0; bottom: 0; background: rgba(31,58,43,.88); color: var(--papel); font: 600 10.5px/1.2 'Segoe UI', system-ui, sans-serif; font-style: normal; padding: 4px 3px; text-align: center; }"
  ].join("\n");
  document.head.appendChild(css);

  function el(html) { var d = document.createElement("div"); d.innerHTML = html; return d.firstChild; }
  function azar(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  // Al terminar una partida: jugar otra y, con suerte, una reseña.
  function finHTML() {
    return '<div class="fin"><button class="otra" type="button">Jugar otra</button>' +
      '<span class="res">¿La están pasando bien en la cabaña? <a href="' + RESENA + '" target="_blank" rel="noopener">Contalo en Google</a> ⭐</span></div>';
  }

  // Cartel de turno: el texto, el ícono y el color de quien juega. Se anima solo cuando cambia el turno.
  function turnoCartel(el, html, clase) {
    var b = el.querySelector(".turnob"), nuevo = clase + "|" + html;
    if (b.getAttribute("data-k") === nuevo) return;
    b.setAttribute("data-k", nuevo);
    b.className = "turnob " + clase; b.innerHTML = html;
    if (clase !== "nada") { void b.offsetWidth; b.classList.add("cambia"); }
  }
  function cartelHTML() { return '<div class="tbw"><div class="turnob nada"></div></div>'; }
  // Festejo: papelitos dorados, verdes y crema, y algunos tréboles, que caen por la pantalla.
  function festejo() {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var cont = document.createElement("div"), cols = ["#b8862b", "#23402e", "#f6f0e4", "#a8502a", "#d9b25a"], h = "";
    cont.className = "confeti";
    for (var i = 0; i < 44; i++) {
      var x = Math.random() * 100, d = 1.6 + Math.random() * 1.6, r = Math.random() * 0.6, s = 7 + Math.random() * 9;
      var esTrebol = i % 6 === 0;
      h += '<i style="left:' + x + '%;animation-duration:' + d + 's;animation-delay:' + r + 's;' +
        (esTrebol ? 'width:' + (s + 8) + 'px;height:' + (s + 8) + 'px">' + TRE : 'width:' + s + 'px;height:' + (s * 0.6) + 'px;background:' + cols[i % cols.length] + ';border-radius:2px">') + '</i>';
    }
    cont.innerHTML = h;
    document.body.appendChild(cont);
    setTimeout(function () { cont.remove(); }, 3600);
  }

  // Fichas: la cabaña (techo alpino con ventanita) y la tetera gigante de la vereda. El trébol queda para el dorso del memotest.
  var TET = '<svg viewBox="0 0 40 40" aria-label="Tetera"><g fill="#b8862b"><circle cx="20" cy="9.5" r="2.4"/><path d="M11.5 16.5 Q20 9.5 28.5 16.5 Z"/><ellipse cx="20" cy="24.5" rx="11.5" ry="9"/><rect x="12.5" y="32" width="15" height="3" rx="1.2"/></g>' +
    '<g fill="none" stroke="#b8862b" stroke-linecap="round"><path d="M9.5 23 C5.5 22.5 4 18 2.8 13.5" stroke-width="3.4"/><path d="M31 18.5 C38 18 38 31 30.5 30" stroke-width="2.8"/></g></svg>';
  var CAB = '<svg viewBox="0 0 40 40" aria-label="Cabaña"><path d="M4 34 L20 5 L36 34" fill="none" stroke="#23402e" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/><rect x="16" y="21" width="8" height="9" fill="none" stroke="#23402e" stroke-width="2.6"/></svg>';
  var TRE = '<svg viewBox="0 0 40 40" aria-label="Trébol"><g fill="#b8862b"><ellipse cx="13.5" cy="13.5" rx="6.6" ry="7.6" transform="rotate(-45 13.5 13.5)"/><ellipse cx="26.5" cy="13.5" rx="6.6" ry="7.6" transform="rotate(45 26.5 13.5)"/><ellipse cx="13.5" cy="26.5" rx="6.6" ry="7.6" transform="rotate(45 13.5 26.5)"/><ellipse cx="26.5" cy="26.5" rx="6.6" ry="7.6" transform="rotate(-45 26.5 26.5)"/></g><path d="M22 23 C25 28 27 32 28 37" fill="none" stroke="#b8862b" stroke-width="2.4" stroke-linecap="round"/></svg>';

  // ---------- TA-TE-TI: cabaña contra tetera ----------
  // El "#" del ta-te-ti, con trazo a mano alzada.
  var HASH = '<svg class="hash" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#23402e" stroke-width="3.2" stroke-linecap="round">' +
    '<path d="M33.5 3 C34.6 35 32.4 66 33.8 97"/><path d="M66.5 3 C65.4 36 67.6 64 66.2 97"/><path d="M3 33.5 C35 32.4 66 34.6 97 33.2"/><path d="M3 66.5 C36 67.6 64 65.4 97 66.8"/></g></svg>';
  // Texto del cartel de turno en los juegos de cabaña contra tetera.
  function cartelCT(turno, modo, plural) {
    if (modo === "bot") return turno === "C" ? ['<span class="fi">' + CAB + '</span>Te toca a vos', ""] : ['<span class="fi">' + TET + '</span>Piensa la casa…', "oro"];
    return turno === "C" ? ['<span class="fi">' + CAB + '</span>Le toca a ' + (plural ? "las cabañas" : "la cabaña"), ""] : ['<span class="fi">' + TET + '</span>Le toca a ' + (plural ? "las teteras" : "la tetera"), "oro"];
  }
  function tateti(c) {
    var modo = "dos", tablero, turno, fin, pts = { C: 0, T: 0 }, empieza = "C", ultima = -1;
    c.innerHTML = '<div class="jg"><h3>Ta-te-ti</h3><div class="bj">La cabaña contra la tetera. Tres en línea gana.</div>' +
      '<div class="modos"><button type="button" data-m="dos" class="on">De a dos</button><button type="button" data-m="bot">Contra la casa</button></div>' +
      '<div class="marc"><span data-j="C">' + CAB + '<b>0</b></span><span data-j="T">' + TET + '<b>0</b></span></div>' + cartelHTML() +
      '<div class="ttt"></div><div class="msg"></div>' + finHTML() + '</div>';
    var g = c.querySelector(".ttt"), msg = c.querySelector(".msg"), f = c.querySelector(".fin");
    var L = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    function ganador(t) { for (var i = 0; i < L.length; i++) { var a = L[i]; if (t[a[0]] && t[a[0]] === t[a[1]] && t[a[1]] === t[a[2]]) return a; } return null; }
    function dibujar() {
      g.innerHTML = HASH + tablero.map(function (v, i) { return '<button type="button" data-i="' + i + '" aria-label="Casilla ' + (i + 1) + '"' + (i === ultima ? ' class="nueva"' : '') + '>' + (v === "C" ? CAB : v === "T" ? TET : "") + '</button>'; }).join("");
      c.querySelectorAll(".marc span").forEach(function (s) { var j = s.getAttribute("data-j"); s.classList.toggle("turno", !fin && j === turno); s.querySelector("b").textContent = pts[j]; });
      var ct = cartelCT(turno, modo); turnoCartel(c, ct[0], fin ? "nada" : ct[1]);
    }
    function nueva() { tablero = ["", "", "", "", "", "", "", "", ""]; ultima = -1; turno = empieza; fin = false; empieza = empieza === "C" ? "T" : "C"; msg.textContent = ""; f.classList.remove("on"); dibujar(); if (modo === "bot" && turno === "T") setTimeout(jugadaBot, 650); }
    function jugar(i) {
      if (fin || tablero[i]) return;
      tablero[i] = turno; ultima = i;
      var w = ganador(tablero);
      if (w) {
        fin = true; pts[turno]++; dibujar();
        var cel = g.querySelectorAll("button"); w.forEach(function (k) { cel[k].classList.add("gana"); });
        msg.textContent = modo === "bot" ? (turno === "C" ? "¡Le ganaste a la casa! 🎉" : "Ganó la casa. ¿La revancha?") : (turno === "C" ? "¡Ganó la cabaña! 🎉" : "¡Ganó la tetera! ¡Sláinte! 🎉");
        if (!(modo === "bot" && turno === "T")) festejo();
        f.classList.add("on"); return;
      }
      if (tablero.every(Boolean)) { fin = true; dibujar(); msg.textContent = "Empate. Como el río: tranqui."; f.classList.add("on"); return; }
      turno = turno === "C" ? "T" : "C"; dibujar();
      if (modo === "bot" && turno === "T") setTimeout(jugadaBot, 650);
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
    ["LANCHA COLECTIVA", "Tigre"], ["REMO", "Tigre"], ["PUERTO DE FRUTOS", "Tigre"], ["MATE", "Clásico"], ["DECK", "La Serena"], ["TETERA", "En la vereda"],
    // Más platos de la carta (23/11)
    ["TORTILLA DE PAPA", "La carta"], ["RISOTTO DE CALABAZA", "La carta"], ["SORRENTINOS", "La carta"], ["RAVIOLONES", "La carta"], ["CHURRASQUITOS", "La carta"],
    ["MATAMBRE A LA PIZZA", "La carta"], ["PANQUEQUES", "La carta"], ["FLAN CON DULCE DE LECHE", "La carta"], ["AVOCADO TOAST", "La carta"], ["CHICKEN FINGERS", "La carta"],
    ["WRAP DE BONDIOLA", "La carta"], ["CALZONE", "La carta"], ["CAPUCCINO", "La carta"], ["BROWNIE CON HELADO", "La carta"], ["BONDIOLA A LA MOSTAZA", "La carta"],
    ["MILANGA DEL VIEJO", "La carta"], ["PASTELITOS", "La carta"], ["TABLA DE PICADA", "La carta"], ["RABAS", "La carta"], ["CANELONES", "La carta"],
    ["MILA LA SERENA", "La carta"], ["TOSTADO", "La carta"], ["EXPRIMIDO DE NARANJA", "La carta"], ["ÑOQUIS", "La carta"]
  ];
  var MAX = 6;
  function sinAcento(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function rio(errores) {
    // La cabaña está sobre pilotes, como en el Delta. El agua sube un escalón por error
    // y con el último error llega justo al piso de la cabaña (y = 112).
    var PISO = 112, FONDO = 184, nivel = FONDO - errores * (FONDO - PISO) / MAX;
    var ola = "M0 " + nivel + " q 17.5 -5 35 0 t 35 0 t 35 0 t 35 0 t 35 0 t 35 0 t 35 0 t 35 0 V 196 H 0 Z";
    return '<svg class="rio" viewBox="0 0 280 196" aria-hidden="true">' +
      '<rect width="280" height="196" rx="14" fill="#fbf7ee"/>' +
      // Pilotes y piso de madera.
      '<g stroke="#a8502a" stroke-width="4" stroke-linecap="round"><line x1="92" y1="' + PISO + '" x2="92" y2="192"/><line x1="140" y1="' + PISO + '" x2="140" y2="192"/><line x1="188" y1="' + PISO + '" x2="188" y2="192"/></g>' +
      '<line x1="66" y1="' + PISO + '" x2="214" y2="' + PISO + '" stroke="#a8502a" stroke-width="5" stroke-linecap="round"/>' +
      // La cabaña: solo el techo alpino hasta el piso, con su ventanita (como en el logo).
      '<path d="M78 ' + (PISO - 3) + ' L140 12 L202 ' + (PISO - 3) + '" fill="#f6f0e4" stroke="#23402e" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<rect x="128" y="64" width="24" height="28" fill="none" stroke="#23402e" stroke-width="3.5"/>' +
      '<path d="' + ola + '" fill="rgba(70,120,140,.6)"/>' +
      (errores >= MAX ? '<text x="140" y="160" text-anchor="middle" font-family="Georgia, serif" font-size="17" fill="#fbf7ee">¡El agua llegó al piso!</text>' : '') +
      '</svg>';
  }
  // Oportunidades que quedan: en texto y con salvavidas (dorados los que quedan, grises los usados).
  function vidas(errores) {
    var q = MAX - errores;
    var t = q === 0 ? "No quedan oportunidades" : q === 1 ? "¡Te queda <b>1</b> oportunidad!" : "Te quedan <b>" + q + "</b> oportunidades";
    var aros = "";
    for (var i = 0; i < MAX; i++) {
      var ok = i < q;
      aros += '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="' + (ok ? "#b8862b" : "#d8ccb6") + '" stroke-width="5"/>' +
        (ok ? '<g stroke="#f6f0e4" stroke-width="2.2"><line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/></g>' : '') + '</svg>';
    }
    return '<div class="vidas' + (q <= 2 ? ' poca' : '') + '"><div class="aros">' + aros + '</div><div class="vt">' + t + '</div></div>';
  }
  function ahorcado(c) {
    var modo = "casa", pal, pista, usadas, errores, fin;
    c.innerHTML = '<div class="jg ah"><h3>Ahorcado de la sudestada</h3><div class="bj">Adiviná la palabra antes de que el río llegue al piso de la cabaña.</div>' +
      '<div class="modos"><button type="button" data-m="casa" class="on">Palabras de la casa</button><button type="button" data-m="dos">Una de ustedes</button></div>' +
      '<div class="zona"></div><div class="msg"></div>' + finHTML() + '</div>';
    var z = c.querySelector(".zona"), msg = c.querySelector(".msg"), f = c.querySelector(".fin");
    // Saca tildes pero deja la Ñ (CABAÑA, ÑOQUIS).
    function limpia(s) { return sinAcento(s.toUpperCase().replace(/Ñ/g, "\u0001")).replace(/\u0001/g, "Ñ").replace(/[^A-ZÑ ]/g, "").replace(/\s+/g, " ").trim(); }
    function empezar(p, pi) {
      pal = limpia(p); pista = pi; usadas = {}; errores = 0; fin = false; msg.textContent = ""; f.classList.remove("on");
      var letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
      z.innerHTML = '<div class="dib"></div><div class="pista">' + pista + '</div><div class="pal"></div><div class="teclas">' +
        letras.map(function (l) { return '<button type="button" data-l="' + l + '">' + l + '</button>'; }).join("") + '</div>';
      z.querySelector(".teclas").addEventListener("click", function (e) { var b = e.target.closest("button"); if (b && !b.disabled) probar(b.getAttribute("data-l"), b); });
      pintar();
    }
    function pintar() {
      z.querySelector(".dib").innerHTML = rio(errores) + vidas(errores);
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
      if (completa) { fin = true; msg.textContent = "¡Bien ahí! La cabaña sigue seca ☀️"; f.classList.add("on"); festejo(); }
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
  // Los platos salen con su foto de Fudo (la misma de la carta): [nombre en Fudo, cómo se muestra, familia].
  // Si un plato se saca de Fudo o no tiene foto, no entra (ej.: si las pizzas están desactivadas, salen solas).
  // La familia sirve para variar: en el memotest no van más de 2 de la misma y en ¿Qué plato es? las opciones son de familias distintas.
  var PLATOS = [
    ["MILA LA SERENA", "Mila La Serena", "mila"], ["MILANESA NAPOLITANA", "Milanesa napolitana", "mila"], ["MILANESA A CABALLO", "Milanesa a caballo", "mila"],
    ["MILANGA DEL VIEJO", "Milanga del viejo", "mila"], ["MILANESA OLIVIA", "Milanesa Olivia", "mila"],
    ["EMPANADA CARNE CUCHILLO", "Empanada de carne", "empanada"], ["EMPANADA BONDIOLA", "Empanada de bondiola", "empanada"], ["EMPANADA CAPRESE", "Empanada caprese", "empanada"],
    ["EMPANADA CEBOLLA CARAMELIZADA", "Empanada de cebolla caramelizada", "empanada"],
    ["PIZZA MUZZARELLA", "Pizza muzzarella", "pizza"], ["PIZZA NAPOLITANA", "Pizza napolitana", "pizza"], ["PIZZA RUCULA, CHERRY Y PARMESANO", "Pizza rúcula y cherry", "pizza"],
    ["PIZZA CUATRO QUESOS", "Pizza cuatro quesos", "pizza"], ["PIZZA CEBOLLA CARAMELIZADA Y QUESO AZUL", "Pizza de cebolla y queso azul", "pizza"], ["CALZONE NAPOLITANO", "Calzone napolitano", "pizza"],
    ["WRAP DE BONDIOLA", "Wrap de bondiola", "wrap"], ["WRAP CAESAR", "Wrap Caesar", "wrap"], ["WRAP VEGETARIANO", "Wrap vegetariano", "wrap"],
    ["PROVOLETA LA SERENA", "Provoleta La Serena", "provo"], ["PROVOLETA", "Provoleta", "provo"], ["RABAS", "Rabas", "rabas"], ["TORTILLA DE PAPA", "Tortilla de papa", "tortilla"],
    ["CHICKEN FINGERS", "Chicken fingers", "fritos"], ["MUZZARELLITAS", "Muzzarellitas", "fritos"], ["PAPAS FRITAS CON CHEDDAR Y BACON", "Papas con cheddar y bacon", "fritos"],
    ["TABLA DE PICADA", "Tabla de picada", "picada"],
    ["BARBECUE RIBS", "Ribs a la barbacoa", "cerdo"], ["BONDIOLA A LA MOSTAZA", "Bondiola a la mostaza", "cerdo"], ["MATAMBRE A LA PIZZA", "Matambre a la pizza", "carne"],
    ["BIFE DE CHORIZO", "Bife de chorizo", "carne"], ["CHURRASQUITOS DE CUADRIL", "Churrasquitos de cuadril", "carne"], ["TAPA DE NALGA", "Tapa de nalga", "carne"],
    ["POLLO AL VERDEO CON PAPAS ESPAÑOLAS", "Pollo al verdeo", "pollo"], ["CHICKEN GRILL AL LIMON", "Chicken grill al limón", "pollo"],
    ["RISOTTO DE CALABAZA", "Risotto de calabaza", "risotto"], ["RISOTTO CHAMPIGNON", "Risotto de champiñones", "risotto"], ["RISOTTO 4 QUESOS", "Risotto cuatro quesos", "risotto"],
    ["SORRENTINOS CASEROS", "Sorrentinos caseros", "pasta"], ["RAVIOLONES DE VERDURA", "Raviolones de verdura", "pasta"], ["FIDEOS CINTA CASEROS", "Fideos cinta caseros", "pasta"],
    ["CANELONES DE VERDURA Y MUZZARELLA", "Canelones de verdura", "pasta"], ["ÑOQUIS CUATRO QUESOS", "Ñoquis cuatro quesos", "pasta"],
    ["ENSALADA LA SERENA", "Ensalada La Serena", "ensalada"], ["ENSALADA CAESAR CON POLLO", "Ensalada Caesar", "ensalada"], ["ENSALADA POLLOS HERMANOS", "Ensalada Pollos Hermanos", "ensalada"],
    ["AVOCADO TOAST", "Avocado toast", "desayuno"], ["HUEVOS REVUELTOS", "Huevos revueltos", "desayuno"], ["TOSTADO XL DE JAMON Y QUESO", "Tostado de jamón y queso", "tostado"],
    ["MEDIALUNA CON JAMON Y QUESO", "Medialuna de jamón y queso", "tostado"],
    ["COCHOTORTA", "Chocotorta", "postre"], ["BROWNIE CON HELADO", "Brownie con helado", "postre"], ["FLAN CON DULCE DE LECHE", "Flan con dulce de leche", "postre"],
    ["PANQUEQUES DE DULCE DE LECHE", "Panqueques con dulce de leche", "postre"], ["PASTELITOS", "Pastelitos", "postre"],
    ["SUBMARINO", "Submarino", "cafe"], ["CAPUCCINO", "Capuccino", "cafe"], ["LICUADO DE FRUTILLA", "Licuado de frutilla", "jugo"], ["EXPRIMIDO DE NARANJA", "Exprimido de naranja", "jugo"],
    ["JARRA DE LIMONADA", "Limonada", "jugo"], ["CAIPIROSKA", "Caipiroska", "trago"]
  ];
  // Elige n platos al azar, con 2 como mucho de la misma familia.
  function variados(lista, n) {
    var out = [], cuenta = {};
    var mezcla = azar(lista.slice());
    mezcla.forEach(function (p) { if (out.length < n && (cuenta[p.fa] || 0) < 2) { out.push(p); cuenta[p.fa] = (cuenta[p.fa] || 0) + 1; } });
    // Si no alcanza con esa regla (pocos platos con foto), se completa con los que quedan.
    mezcla.forEach(function (p) { if (out.length < n && out.indexOf(p) < 0) out.push(p); });
    return out;
  }
  var EMOJIS = [["🍕", "Pizza"], ["🥟", "Empanada"], ["🍋", "Limonada"], ["🍺", "Cerveza"], ["☕", "Café"], ["🍰", "Postre"], ["🧉", "Mate"], ["🍔", "Hamburguesa"]];
  var PARES = 8;
  function fotosFudo() {
    var mapa = {};
    ((window.FUDO && FUDO.categorias) || []).forEach(function (cat) {
      (cat.productos || []).forEach(function (p) { if (p.foto) mapa[p.nombre.replace(/[^\wÑ ,]/g, "").replace(/\s+/g, " ").trim().toUpperCase()] = p.foto; });
    });
    return PLATOS.filter(function (p) { return mapa[p[0]]; }).map(function (p) { return { foto: mapa[p[0]], n: p[1], fa: p[2] }; });
  }
  function memotest(c) {
    var cartas, abiertas, turno, pts, bloqueo, hechas, FICHAS;
    c.innerHTML = '<div class="jg"><h3>Memotest</h3><div class="bj">Por turnos: si encontrás el par, seguís jugando.</div>' +
      '<div class="marc"><span data-j="0">Jugador 1 · <b>0</b></span><span data-j="1">Jugador 2 · <b>0</b></span></div>' + cartelHTML() +
      '<div class="mm"></div><div class="msg"></div>' + finHTML() + '</div>';
    var g = c.querySelector(".mm"), msg = c.querySelector(".msg"), f = c.querySelector(".fin");
    function marcador() {
      c.querySelectorAll(".marc span").forEach(function (s) { var j = +s.getAttribute("data-j"); s.classList.toggle("turno", hechas < PARES && j === turno); s.querySelector("b").textContent = pts[j]; });
      turnoCartel(c, '<span class="fi">' + (turno + 1) + '</span>Le toca al jugador ' + (turno + 1), hechas >= PARES ? "nada" : turno ? "oro" : "");
    }
    function nueva() {
      // 8 platos al azar; si faltan fotos, se completa con emojis.
      var fotos = variados(fotosFudo(), PARES);
      FICHAS = fotos.concat(EMOJIS.slice(0, PARES - fotos.length).map(function (e) { return { emoji: e[0], n: e[1] }; }));
      FICHAS.forEach(function (x) { if (x.foto) new Image().src = x.foto; }); // se precargan para que no aparezcan en blanco al dar vuelta
      cartas = azar(FICHAS.map(function (x, k) { return k; }).concat(FICHAS.map(function (x, k) { return k; })));
      abiertas = []; turno = 0; pts = [0, 0]; bloqueo = false; hechas = 0;
      msg.textContent = ""; f.classList.remove("on");
      g.innerHTML = cartas.map(function (k, i) {
        var x = FICHAS[k];
        return '<button type="button" data-i="' + i + '" aria-label="Carta ' + (i + 1) + '"><i class="do">' + TRE + '</i>' +
          (x.foto ? '<img alt="" src="' + x.foto + '">' : '<span>' + x.emoji + '</span>') + '<em>' + x.n + '</em></button>';
      }).join("");
      marcador();
    }
    g.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b || bloqueo || b.classList.contains("vista") || b.classList.contains("hecha")) return;
      b.classList.add("vista"); abiertas.push(b);
      if (abiertas.length < 2) return;
      var a = abiertas[0], d = abiertas[1]; abiertas = [];
      if (cartas[+a.getAttribute("data-i")] === cartas[+d.getAttribute("data-i")]) {
        a.classList.replace("vista", "hecha"); d.classList.replace("vista", "hecha"); pts[turno]++; hechas++; marcador();
        msg.textContent = "¡Par! " + FICHAS[cartas[+a.getAttribute("data-i")]].n;
        if (hechas === PARES) {
          msg.textContent = pts[0] === pts[1] ? "¡Empate! Se pide otra ronda." : "¡Ganó el jugador " + (pts[0] > pts[1] ? 1 : 2) + "! 🎉";
          if (pts[0] !== pts[1]) festejo();
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

  // ---------- CUATRO EN LÍNEA: cabañas contra teteras ----------
  function cuatro(c) {
    var FIL = 6, COL = 7, modo = "dos", t, turno, fin, pts = { C: 0, T: 0 }, empieza = "C", ultima = null;
    c.innerHTML = '<div class="jg"><h3>Cuatro en línea</h3><div class="bj">Cabañas contra teteras. Tocá una columna y la ficha cae hasta abajo. Cuatro seguidas gana.</div>' +
      '<div class="modos"><button type="button" data-m="dos" class="on">De a dos</button><button type="button" data-m="bot">Contra la casa</button></div>' +
      '<div class="marc"><span data-j="C">' + CAB + '<b>0</b></span><span data-j="T">' + TET + '<b>0</b></span></div>' + cartelHTML() +
      '<div class="c4"></div><div class="msg"></div>' + finHTML() + '</div>';
    var g = c.querySelector(".c4"), msg = c.querySelector(".msg"), f = c.querySelector(".fin");
    function fila(tab, col) { for (var r = FIL - 1; r >= 0; r--) if (!tab[r][col]) return r; return -1; }
    // Devuelve las casillas ganadoras si la ficha en (r, col) hizo cuatro en línea.
    function linea(tab, r, col) {
      var j = tab[r][col], dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
      for (var d = 0; d < dirs.length; d++) {
        var cel = [[r, col]];
        [1, -1].forEach(function (s) {
          var rr = r + dirs[d][0] * s, cc = col + dirs[d][1] * s;
          while (rr >= 0 && rr < FIL && cc >= 0 && cc < COL && tab[rr][cc] === j) { cel.push([rr, cc]); rr += dirs[d][0] * s; cc += dirs[d][1] * s; }
        });
        if (cel.length >= 4) return cel;
      }
      return null;
    }
    function dibujar(gana) {
      var h = "";
      for (var r = 0; r < FIL; r++) for (var k = 0; k < COL; k++) {
        var v = t[r][k], esG = gana && gana.some(function (x) { return x[0] === r && x[1] === k; });
        var cae = ultima && ultima[0] === r && ultima[1] === k;
        h += '<button type="button" data-c="' + k + '" aria-label="Columna ' + (k + 1) + '" class="' + (esG ? 'gana' : '') + (cae ? ' cae' : '') + '">' + (v === "C" ? CAB : v === "T" ? TET : "") + '</button>';
      }
      g.innerHTML = h;
      c.querySelectorAll(".marc span").forEach(function (s) { var j = s.getAttribute("data-j"); s.classList.toggle("turno", !fin && j === turno); s.querySelector("b").textContent = pts[j]; });
      var ct = cartelCT(turno, modo, true); turnoCartel(c, ct[0], fin ? "nada" : ct[1]);
    }
    function nueva() {
      t = []; for (var r = 0; r < FIL; r++) t.push(["", "", "", "", "", "", ""]);
      ultima = null; turno = empieza; empieza = empieza === "C" ? "T" : "C"; fin = false; msg.textContent = ""; f.classList.remove("on"); dibujar();
      if (modo === "bot" && turno === "T") setTimeout(jugadaBot, 700);
    }
    function jugar(col) {
      if (fin) return;
      var r = fila(t, col); if (r < 0) return;
      t[r][col] = turno; ultima = [r, col];
      var w = linea(t, r, col);
      if (w) {
        fin = true; pts[turno]++; dibujar(w);
        msg.textContent = modo === "bot" ? (turno === "C" ? "¡Le ganaste a la casa! 🎉" : "Ganó la casa. ¿La revancha?") : (turno === "C" ? "¡Ganaron las cabañas! 🎉" : "¡Ganaron las teteras! 🎉");
        if (!(modo === "bot" && turno === "T")) festejo();
        f.classList.add("on"); return;
      }
      if (t[0].every(Boolean)) { fin = true; dibujar(); msg.textContent = "Empate: se llenó el tablero."; f.classList.add("on"); return; }
      turno = turno === "C" ? "T" : "C"; dibujar();
      if (modo === "bot" && turno === "T") setTimeout(jugadaBot, 700);
    }
    // La casa: gana si puede, tapa casi siempre, no regala una jugada ganadora y prefiere el centro.
    function jugadaBot() {
      if (fin) return;
      var libres = []; for (var k = 0; k < COL; k++) if (fila(t, k) >= 0) libres.push(k);
      function gana(j, k) { var r = fila(t, k); t[r][k] = j; var w = linea(t, r, k); t[r][k] = ""; return !!w; }
      function regala(k) { var r = fila(t, k); if (r <= 0) return false; t[r][k] = "T"; var x = gana("C", k); t[r][k] = ""; return x; }
      var col = libres.filter(function (k) { return gana("T", k); })[0];
      if (col === undefined && Math.random() < 0.9) col = libres.filter(function (k) { return gana("C", k); })[0];
      if (col === undefined) {
        var seguras = libres.filter(function (k) { return !regala(k); }), op = seguras.length ? seguras : libres;
        op.sort(function (a, b) { return Math.abs(a - 3) - Math.abs(b - 3) + (Math.random() - 0.5) * 2.2; });
        col = op[0];
      }
      jugar(col);
    }
    g.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b || (modo === "bot" && turno === "T")) return; jugar(+b.getAttribute("data-c")); });
    c.querySelectorAll(".modos button").forEach(function (b) {
      b.addEventListener("click", function () {
        modo = b.getAttribute("data-m"); pts = { C: 0, T: 0 }; empieza = "C";
        c.querySelectorAll(".modos button").forEach(function (x) { x.classList.toggle("on", x === b); }); nueva();
      });
    });
    c.querySelector(".otra").addEventListener("click", nueva);
    nueva();
  }

  // ---------- ¿QUÉ PLATO ES?: la foto arranca de muy cerca y borrosa ----------
  // 5 rondas. Si acertás de entrada valen 3 puntos; cada vez que alejás la foto, vale uno menos.
  var ZOOM = [3.4, 2.1, 1], BLUR = [7, 3, 0];
  function quePlato(c) {
    var lista = fotosFudo(), RONDAS = 5, rondas, ronda, puntos, etapa, actual, origen, listo;
    if (lista.length < 4) { c.innerHTML = '<div class="jg"><h3>¿Qué plato es?</h3><div class="bj">Hoy no pudimos cargar las fotos de la carta. Probá en un rato.</div></div>'; return; }
    lista.forEach(function (p) { new Image().src = p.foto; });
    c.innerHTML = '<div class="jg qp"><h3>¿Qué plato es?</h3><div class="bj">Mirá la foto de cerca y adiviná el plato de la carta. Cuanto antes aciertes, más puntos.</div>' +
      '<div class="marc"><span class="ron"></span><span class="pun"></span></div>' +
      '<div class="qf"><img alt=""></div><div class="qv"></div>' +
      '<button type="button" class="alejar">🔍 Alejar la foto (vale un punto menos)</button>' +
      '<div class="qo"></div><div class="msg"></div><button type="button" class="sig">Siguiente plato ›</button>' + finHTML() + '</div>';
    var img = c.querySelector(".qf img"), qo = c.querySelector(".qo"), msg = c.querySelector(".msg"), f = c.querySelector(".fin"),
      alejar = c.querySelector(".alejar"), sig = c.querySelector(".sig");
    function vale() { return 3 - etapa; }
    function foto() {
      img.style.transformOrigin = origen;
      img.style.transform = "scale(" + ZOOM[etapa] + ")";
      img.style.filter = "blur(" + BLUR[etapa] + "px)";
      c.querySelector(".qv").innerHTML = listo ? "" : "Si acertás ahora: <b>" + vale() + (vale() === 1 ? " punto" : " puntos") + "</b>";
      alejar.style.display = listo || etapa >= 2 ? "none" : "";
    }
    function marcador() { c.querySelector(".ron").textContent = "Plato " + Math.min(ronda + 1, RONDAS) + " de " + RONDAS; c.querySelector(".pun").innerHTML = "Puntos: <b>" + puntos + "</b>"; }
    function mostrar() {
      actual = rondas[ronda]; etapa = 0; listo = false;
      origen = (25 + Math.random() * 50) + "% " + (25 + Math.random() * 50) + "%";
      // Sin destello: la foto nueva se esconde, se acerca y se borronea sin animación,
      // y recién cuando terminó de cargar se muestra (ya de cerca).
      img.style.transition = "none"; img.style.opacity = "0";
      foto(); void img.offsetWidth;
      img.onload = function () { img.style.opacity = "1"; setTimeout(function () { img.style.transition = ""; }, 50); };
      img.src = actual.foto;
      marcador(); msg.textContent = ""; sig.style.display = "none";
      // Opciones de otras familias (no tres pizzas juntas), así se adivina por el plato y no por el detalle.
      var otras = [], usadas = {}; usadas[actual.fa] = 1;
      azar(lista.filter(function (p) { return p.n !== actual.n; })).forEach(function (p) { if (otras.length < 3 && !usadas[p.fa]) { otras.push(p); usadas[p.fa] = 1; } });
      azar(lista.filter(function (p) { return p.n !== actual.n && otras.indexOf(p) < 0; })).forEach(function (p) { if (otras.length < 3) otras.push(p); });
      qo.innerHTML = azar(otras.concat([actual])).map(function (p) { return '<button type="button">' + p.n + '</button>'; }).join("");
    }
    function nueva() { rondas = variados(lista, RONDAS); ronda = 0; puntos = 0; f.classList.remove("on"); mostrar(); }
    qo.addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b || listo) return;
      listo = true;
      var ok = b.textContent === actual.n, gano = ok ? vale() : 0;
      puntos += gano; etapa = 2; foto(); marcador();
      qo.querySelectorAll("button").forEach(function (x) { if (x.textContent === actual.n) x.classList.add("si"); else if (x === b) x.classList.add("no"); x.disabled = true; });
      msg.textContent = ok ? "¡Bien! " + actual.n + " (+" + gano + ")" : "Era: " + actual.n;
      if (ronda + 1 < RONDAS) sig.style.display = "";
      else {
        var fr = puntos >= 13 ? "¡Sos de la casa!" : puntos >= 8 ? "¡Muy bien! Conocés la carta." : "Te faltan probar unos cuantos platos 😉";
        setTimeout(function () { msg.textContent = "Sumaste " + puntos + " de " + (RONDAS * 3) + ". " + fr; f.classList.add("on"); if (puntos >= 8) festejo(); }, 1300);
      }
    });
    alejar.addEventListener("click", function () { if (!listo && etapa < 2) { etapa++; foto(); } });
    sig.addEventListener("click", function () { ronda++; mostrar(); });
    c.querySelector(".otra").addEventListener("click", nueva);
    nueva();
  }

  // ---------- GENERALA con dados en pantalla (reglas de la casa, las del reglamento del Jueves de Juegos) ----------
  var CATS = [["1", "Al 1"], ["2", "Al 2"], ["3", "Al 3"], ["4", "Al 4"], ["5", "Al 5"], ["6", "Al 6"], ["E", "Escalera"], ["F", "Full"], ["P", "Póker"], ["G", "Generala"], ["D", "Doble generala"]];
  var PIPS = { 1: [[50, 50]], 2: [[28, 28], [72, 72]], 3: [[28, 28], [50, 50], [72, 72]], 4: [[28, 28], [72, 28], [28, 72], [72, 72]],
    5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]], 6: [[28, 25], [72, 25], [28, 50], [72, 50], [28, 75], [72, 75]] };
  function dado(v) {
    return '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="5" y="5" width="90" height="90" rx="18" fill="#fffaf0" stroke="#23402e" stroke-width="5"/>' +
      (v ? PIPS[v].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="9" fill="#23402e"/>'; }).join("") :
        '<text x="50" y="64" text-anchor="middle" font-family="Georgia, serif" font-size="40" fill="#d8ccb6">?</text>') + '</svg>';
  }
  // Puntos de un casillero con estos dados. servido = salió en el primer tiro. tieneG = ya anotó 50 en generala.
  function puntaje(cat, d, servido, tieneG) {
    var cnt = [0, 0, 0, 0, 0, 0, 0]; d.forEach(function (x) { cnt[x]++; });
    var vals = cnt.slice(1).filter(Boolean).sort();
    if (/^[1-6]$/.test(cat)) return cnt[+cat] * +cat;
    var u = d.slice().sort().join("");
    if (cat === "E") return (u === "12345" || u === "23456" || u === "13456") ? 20 + (servido ? 5 : 0) : 0;
    if (cat === "F") return vals.join(",") === "2,3" ? 30 + (servido ? 5 : 0) : 0;
    if (cat === "P") return cnt.some(function (n) { return n >= 4; }) ? 40 + (servido ? 5 : 0) : 0;
    if (cat === "G") return cnt.some(function (n) { return n === 5; }) ? 50 : 0;
    if (cat === "D") return cnt.some(function (n) { return n === 5; }) && tieneG ? 100 : 0;
    return 0;
  }
  function promoJueves() {
    var hoy = new Date(), estreno = new Date(2026, 11, 3);
    var cuando = hoy < estreno ? "Arranca el <b>jueves 3 de diciembre</b>, desde las 20 h." : "<b>Todos los jueves</b>, desde las 20 h.";
    return '<div class="promoj"><div class="pt">🎲 Jueves de Juegos en La Serena</div><div class="ps">' + cuando +
      ' Truco, chinchón, podrida, carioca, generala y desconfío, con cartas, dados y anotador en la mesa. Se juega por la gloria, nunca por plata.</div>' +
      '<a class="btn" href="https://wa.me/5491153349375?text=%C2%A1Hola!%20Quiero%20reservar%20una%20mesa%20para%20el%20Jueves%20de%20Juegos" target="_blank" rel="noopener">Reservá tu mesa para el jueves</a></div>';
  }
  function generala(c) {
    var n = 2, plan, jug, dados, guard, tiro, fin;
    c.innerHTML = '<div class="jg ge"><h3>Generala</h3><div class="bj">Tres tiros por turno. Tocá los dados que querés guardar y volvé a tirar el resto.</div>' + promoJueves() +
      '<div class="modos"><span class="ml">Jugadores:</span>' + [1, 2, 3, 4].map(function (k) { return '<button type="button" data-n="' + k + '"' + (k === 2 ? ' class="on"' : '') + '>' + k + '</button>'; }).join("") + '</div>' +
      cartelHTML() + '<div class="gt"></div><div class="dados"></div><button type="button" class="tirar">Tirar los dados</button>' +
      '<div class="msg"></div><div class="plan"></div>' + finHTML() + '</div>';
    var gt = c.querySelector(".gt"), gd = c.querySelector(".dados"), bt = c.querySelector(".tirar"), msg = c.querySelector(".msg"), gp = c.querySelector(".plan"), f = c.querySelector(".fin");
    function nombre(j) { return n === 1 ? "Tu" : "J" + (j + 1); }
    function tot(j) { return CATS.reduce(function (s, k) { return s + (plan[j][k[0]] || 0); }, 0); }
    function nueva() {
      plan = []; for (var j = 0; j < n; j++) plan.push({});
      jug = 0; fin = false; f.classList.remove("on"); msg.textContent = ""; turnoNuevo();
    }
    function turnoNuevo() { dados = [0, 0, 0, 0, 0]; guard = [false, false, false, false, false]; tiro = 0; pintar(); }
    function pintar() {
      // Cada jugador tiene su color en el cartel y en su columna de la planilla.
      turnoCartel(c, '<span class="fi">' + (jug + 1) + '</span>' + (n === 1 ? "Tu turno" : "Le toca al jugador " + (jug + 1)), fin ? "nada" : ["", "oro", "barro", "rio"][jug]);
      gt.innerHTML = fin ? "" : "Tiro <b>" + tiro + "</b> de 3";
      gd.innerHTML = dados.map(function (v, i) { return '<button type="button" data-i="' + i + '" class="' + (guard[i] ? 'gu' : '') + '"' + (!tiro || fin ? ' disabled' : '') + '>' + dado(v) + (guard[i] ? '<i>✔ guardado</i>' : '') + '</button>'; }).join("");
      bt.disabled = fin || tiro >= 3; bt.textContent = tiro === 0 ? "Tirar los dados" : tiro >= 3 ? "Anotá en la planilla" : "Tirar de nuevo (" + (3 - tiro) + ")";
      var h = (tiro && !fin ? '<div class="ayuda">Tocá un casillero de la planilla para anotar' + (tiro < 3 ? ', o volvé a tirar' : '') + '.</div>' : '') + '<table><tr><th></th>' + plan.map(function (p, j) { return '<th class="' + (j === jug && !fin ? 'yo c' + j : '') + '">' + nombre(j) + '</th>'; }).join("") + '</tr>';
      CATS.forEach(function (k) {
        h += '<tr><td>' + k[1] + '</td>' + plan.map(function (p, j) {
          if (p[k[0]] !== undefined) return '<td class="' + (p[k[0]] ? '' : 'tacha') + '">' + (p[k[0]] || "✕") + '</td>';
          if (j !== jug || fin || !tiro) return '<td></td>';
          var v = puntaje(k[0], dados, tiro === 1, p.G === 50);
          return '<td><button type="button" data-k="' + k[0] + '" class="' + (v ? 'an' : 'ta') + '">' + (v ? v : "tachar") + '</button></td>';
        }).join("") + '</tr>';
      });
      h += '<tr class="tt"><td>Total</td>' + plan.map(function (p, j) { return '<td>' + tot(j) + '</td>'; }).join("") + '</tr></table>';
      gp.innerHTML = h;
    }
    function terminar(texto, empate) { fin = true; msg.innerHTML = texto; f.classList.add("on"); pintar(); if (!empate) festejo(); }
    bt.addEventListener("click", function () {
      if (fin || tiro >= 3) return;
      dados = dados.map(function (v, i) { return guard[i] ? v : 1 + Math.floor(Math.random() * 6); });
      tiro++; msg.textContent = ""; pintar();
      gd.querySelectorAll("button:not(.gu)").forEach(function (b) { b.classList.add("rueda"); });
      if (tiro === 1 && dados.every(function (v) { return v === dados[0]; })) {
        terminar("¡GENERALA SERVIDA! " + (n === 1 ? "Ganaste en el acto 🎉" : "Gana el jugador " + (jug + 1) + " en el acto 🎉"));
      }
    });
    gd.addEventListener("click", function (e) { var b = e.target.closest("button"); if (!b || b.disabled) return; var i = +b.getAttribute("data-i"); guard[i] = !guard[i]; pintar(); });
    gp.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-k]"); if (!b || fin) return;
      var k = b.getAttribute("data-k");
      plan[jug][k] = puntaje(k, dados, tiro === 1, plan[jug].G === 50);
      if (plan[jug][k] === 50 && k === "G") msg.textContent = "¡Generala!";
      var completo = plan.every(function (p) { return CATS.every(function (x) { return p[x[0]] !== undefined; }); });
      if (completo) {
        var ts = plan.map(function (p, j) { return tot(j); }), max = Math.max.apply(null, ts), ganan = ts.map(function (v, j) { return v === max ? j + 1 : 0; }).filter(Boolean);
        terminar(n === 1 ? "Hiciste <b>" + max + "</b> puntos. ¿Lo superás el jueves?" : ganan.length > 1 ? "¡Empate con " + max + " puntos!" : "¡Ganó el jugador " + ganan[0] + " con " + max + " puntos! 🎉", n > 1 && ganan.length > 1);
        return;
      }
      jug = (jug + 1) % n; turnoNuevo();
    });
    c.querySelectorAll(".modos button").forEach(function (b) {
      b.addEventListener("click", function () { n = +b.getAttribute("data-n"); c.querySelectorAll(".modos button").forEach(function (x) { x.classList.toggle("on", x === b); }); nueva(); });
    });
    c.querySelector(".otra").addEventListener("click", nueva);
    nueva();
  }

  // Juegos de la segunda tanda (26/11): cada uno en su archivo (juegos/<id>.js), que se baja recién al abrirlo.
  // El archivo se registra en JUEGOS.extra[id] y usa las herramientas comunes de JUEGOS.util.
  var PROPIOS = { tateti: tateti, ahorcado: ahorcado, memotest: memotest, cuatro: cuatro, plato: quePlato, generala: generala };
  var APARTE = { colorear: 1, rompe: 1, oca: 1, duende: 1 };
  window.JUEGOS = {
    extra: {},
    util: { el: el, azar: azar, finHTML: finHTML, festejo: festejo, cartelHTML: cartelHTML, turnoCartel: turnoCartel, fotosFudo: fotosFudo, variados: variados, CAB: CAB, TET: TET, TRE: TRE, RESENA: RESENA },
    abrir: function (id, cont) {
      if (PROPIOS[id]) return PROPIOS[id](cont);
      if (!APARTE[id]) return tateti(cont);
      if (JUEGOS.extra[id]) return JUEGOS.extra[id](cont);
      var s = document.createElement("script");
      s.src = "juegos/" + id + ".js?v=3";
      s.onload = function () { if (JUEGOS.extra[id] && document.body.contains(cont)) { JUEGOS.extra[id](cont); if (JUEGOS.alAbrir) JUEGOS.alAbrir(id, cont); } };
      s.onerror = function () { cont.innerHTML = '<div class="jg" style="padding:40px 16px">No se pudo cargar el juego. Probá de nuevo.</div>'; };
      document.head.appendChild(s);
    }
  };
})();
