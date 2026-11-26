// "De tetera en tetera": el juego de la oca de La Serena (pedido de Marcos, 26/11/2026; versión 2 del mismo día).
// Más corto (30 casillas) y cada casilla hace algo. Tablero en zigzag, de abajo hacia arriba, como una escalera.
// Idea tomada del PEXA: juntar tréboles 🍀 (un recurso) que te salvan de las casillas malas.
// Cómo se juega: cada uno tira el dado y avanza. Al caer, aparece la tarjeta de la casilla con lo que pasa.
// Gana el primero que llega justo a la 30 (la pizza sale del horno); si se pasa, rebota.
// Las casillas ⭐ sacan una tarjeta de HISTORIAS: cosas que pasan de verdad en La Serena.
// >>> Para sumar historias nuevas, agregar una fila a HISTORIAS: [texto, efecto].
//     Efecto: número (avanza o retrocede), "turno" (pierde un turno), "tira" (tira de nuevo) o "trebol" (gana un trébol).
(function () {
  var U = JUEGOS.util;
  var HISTORIAS = [
    ["Pasó Vitico a saludar y se quedó a tocar un tema en el deck. Todos aplauden.", "tira"],
    ["Vitico pasó a saludar y te dedicó una canción.", 2],
    ["Alguien pidió 10 kg de rúcula para un martes de lluvia. ¡Casaló!", -3],
    ["Cargaste el pedido de muzzarella dos veces. ¡Casaló!", -2],
    ["Llegó el chacal de la cabaña, otra vez con una acompañante nueva. Te distraés mirando.", -2],
    ["El chacal de la cabaña dejó buena propina.", 2],
    ["Te mandaron al rancho a buscar servilletas y volviste con todo lo que faltaba.", 3],
    ["Fuiste al rancho a buscar la sal y no la encontrás por ningún lado.", "turno"],
    ["En el rancho encontraste un trébol de cuatro hojas entre las cajas.", "trebol"],
    ["Otra reseña de cinco estrellas que nombra a Nazarena.", 3],
    ["Horacio llegó con las papas.", 2],
    ["Joaco cantó envido desde la caja y ganó la mano.", "tira"],
    ["Gaby sacó una Mila La Serena perfecta.", 3],
    ["Se terminó la muzzarella en pleno servicio: compra de emergencia.", -2],
    ["Se cortó el gas y hubo que cerrar la noche.", "turno"],
    ["Feriado sorpresa por la visita del Papa: abrimos igual.", "tira"],
    ["Hoy se cocina con equipo reducido: se apagan platos en Fudo.", -1],
    ["Se llenó el deck un domingo de sol.", 2],
    ["Un turista se sacó una foto con la tetera gigante de la vereda.", 1],
    ["Halloween: caramelos para todos los chicos.", "trebol"],
    ["Martes de vermut: un Kit Vermutero para la mesa.", 1]
  ];
  // Las 30 casillas. ef: "tetera" (salta a la próxima y tira), número (avanza o retrocede), {a: casilla} (va a esa casilla),
  // "tira", "turno", "trebol", "hist", "chacal". malo: 1 = un trébol te salva.
  var CAS = [null,
    { ic: "⚓", t: "Salida", d: "El muelle de la Victorica. ¡Arranca el viaje!" },
    { ic: "⭐", t: "Historia", ef: "hist" },
    { ic: "🍀", t: "Trébol", d: "Encontraste un trébol en el cantero de la vereda.", ef: "trebol" },
    { ic: "🫖", t: "Tetera", ef: "tetera" },
    { ic: "🎸", t: "Vitico", d: "Pasó Vitico a saludar y armó una zapada en el deck.", ef: "tira" },
    { ic: "📦", t: "El rancho", d: "Te mandaron al rancho a buscar la yerba y no volvés más.", ef: "turno", malo: 1 },
    { ic: "⭐", t: "Historia", ef: "hist" },
    { ic: "⛵", t: "Lancha", d: "Te subís a la lancha colectiva: de muelle a muelle y tiro porque me lleva la corriente.", ef: { a: 17, tira: 1 } },
    { ic: "🫖", t: "Tetera", ef: "tetera" },
    { ic: "🍕", t: "Pizza libre", d: "Miércoles de PIZZA LIBRE: comés rápido y seguís viaje.", ef: 2 },
    { ic: "⭐", t: "Historia", ef: "hist" },
    { ic: "🍀", t: "Trébol", d: "Un cliente te regaló un trébol de cuatro hojas.", ef: "trebol" },
    { ic: "🌊", t: "Crecida", d: "El agua tapó la costanera y hay que dar la vuelta.", ef: { a: 10 }, malo: 1 },
    { ic: "⭐", t: "Historia", ef: "hist" },
    { ic: "🫖", t: "Tetera", ef: "tetera" },
    { ic: "🐺", t: "El chacal", d: "El chacal de la cabaña te cambia de mesa: cambiás de lugar con el que va último (y si el último sos vos, con el que va primero).", ef: "chacal" },
    { ic: "⚓", t: "Muelle", d: "Llega la lancha justo cuando llegás vos.", ef: "tira" },
    { ic: "⭐", t: "Historia", ef: "hist" },
    { ic: "🍀", t: "Trébol", d: "Te tocó el trébol de la suerte.", ef: "trebol" },
    { ic: "🔒", t: "Lunes cerrado", d: "Llegaste un lunes y está cerrado.", ef: "turno", malo: 1 },
    { ic: "🫖", t: "Tetera", ef: "tetera" },
    { ic: "🍺", t: "Happy hour", d: "Happy hour de 17 a 20: dos Imperial y a seguir.", ef: 3 },
    { ic: "⭐", t: "Historia", ef: "hist" },
    { ic: "🌧️", t: "Sudestada", d: "Se largó la sudestada y te volaron las servilletas.", ef: { a: 14 }, malo: 1 },
    { ic: "🍀", t: "Trébol", d: "Un trébol más para la colección.", ef: "trebol" },
    { ic: "⭐", t: "Historia", ef: "hist" },
    { ic: "🫖", t: "Tetera", d: "La última tetera, la gigante de la vereda.", ef: "tira" },
    { ic: "🤦", t: "¡Casaló!", d: "Pediste 40 kg de rúcula para un lunes cerrado. ¡Casaló!", ef: { a: 23 }, malo: 1 },
    { ic: "⭐", t: "Historia", ef: "hist" },
    { ic: "🍕", t: "¡Llegada!", d: "¡La pizza sale del horno!" }
  ];
  var META = 30, MAXT = 3;
  var TETERAS = [4, 9, 15, 21, 27];
  var FICHAS = [["🛖", "Cabaña", "#23402e"], ["🍕", "Pizza", "#a8502a"], ["🍺", "Birra", "#b8862b"], ["🥟", "Empanada", "#4a7a8c"]];
  // Zigzag de 6 columnas y 5 filas: la 1 abajo a la izquierda, la 30 arriba a la izquierda.
  function lugar(i) { var r = Math.floor((i - 1) / 6), k = (i - 1) % 6; return [r % 2 ? 5 - k : k, 4 - r]; }
  function tipo(i) {
    var q = CAS[i];
    if (i === 1) return "sa"; if (i === META) return "me";
    if (q.ef === "tetera" || i === 27) return "te"; if (q.ef === "hist") return "hi"; if (q.ef === "trebol") return "tr";
    return q.malo ? "ma" : "bu";
  }
  function efTexto(ef) {
    if (ef === "tira") return "Tirás de nuevo."; if (ef === "turno") return "Perdés un turno."; if (ef === "trebol") return "Ganás un trébol 🍀.";
    if (typeof ef === "number") return ef > 0 ? "Avanzás " + ef + "." : "Retrocedés " + (-ef) + ".";
    if (ef && ef.a) return "Vas a la " + ef.a + (ef.tira ? " y tirás de nuevo." : ".");
    return "";
  }

  function oca(c) {
    var n = 2, bot = false, pos, espera, treb, turno, fin, ocupado = false;
    c.innerHTML = '<div class="jg oc"><h3>De tetera en tetera</h3><div class="bj">El juego de la oca de La Serena. Tirá el dado, avanzá y mirá qué te toca en cada casilla. Gana el primero que llega a la pizza 🍕 de la 30.</div>' +
      '<div class="modos"><button type="button" data-n="1">Contra la casa</button><button type="button" data-n="2" class="on">2</button><button type="button" data-n="3">3</button><button type="button" data-n="4">4</button></div>' +
      U.cartelHTML() + '<div class="jug"></div>' +
      '<div class="otb"><svg class="fl" viewBox="0 0 600 500"></svg><div class="tb"></div><div class="ocv"></div></div>' +
      '<div class="ocd"><button type="button" class="tirar"><span class="dado">🎲</span> Tirar el dado</button></div>' +
      '<div class="msg"></div>' + U.finHTML() +
      '<details class="ayu" open><summary>Cómo se juega</summary><ul>' +
      '<li>Por turno, tirás el dado y avanzás. Al caer, aparece la tarjeta de la casilla. <b>Tocá cualquier casilla</b> para ver qué hace.</li>' +
      '<li>🫖 <b>Teteras</b>: "De tetera en tetera y tiro porque me toca": saltás a la próxima tetera y tirás otra vez.</li>' +
      '<li>🍀 <b>Tréboles</b>: te los guardás (hasta 3). Si caés en una casilla mala (roja), un trébol te salva.</li>' +
      '<li>⭐ <b>Historias de La Serena</b>: sacás una tarjeta con algo que pasó de verdad.</li>' +
      '<li>🍕 <b>Llegada</b>: hay que llegar justo a la 30; si te pasás, rebotás para atrás.</li></ul></details></div>';
    var tb = c.querySelector(".tb"), fl = c.querySelector(".fl"), ov = c.querySelector(".ocv"), jugEl = c.querySelector(".jug"),
        msg = c.querySelector(".msg"), f = c.querySelector(".fin"), btn = c.querySelector(".tirar"), dado = c.querySelector(".dado");

    function nombre(j) { return bot ? (j === 0 ? "Vos" : "La casa") : FICHAS[j][1]; }
    function dibujar() {
      var h = "";
      for (var i = 1; i <= META; i++) {
        var p = lugar(i), q = CAS[i];
        h += '<button type="button" class="ca ' + tipo(i) + '" data-i="' + i + '" style="grid-column:' + (p[0] + 1) + ';grid-row:' + (p[1] + 1) + '">' +
          '<b>' + i + '</b><i>' + q.ic + '</i><small>' + q.t + '</small><span class="fs"></span></button>';
      }
      tb.innerHTML = h;
      // Flechas: saltos para adelante (dorado) y para atrás (rojo).
      function cen(i) { var p = lugar(i); return [p[0] * 100 + 50, p[1] * 100 + 50]; }
      var sal = [[4, 9], [9, 15], [15, 21], [21, 27], [8, 17]], vue = [[13, 10], [24, 14], [28, 23]], s = "";
      function flecha(a, b, cl) {
        var A = cen(a), B = cen(b), mx = (A[0] + B[0]) / 2 + (A[1] === B[1] ? 0 : 40), my = (A[1] + B[1]) / 2 - (A[1] === B[1] ? 45 : 0);
        return '<path class="' + cl + '" d="M' + A[0] + ' ' + (A[1] - 8) + ' Q' + mx + ' ' + my + ' ' + B[0] + ' ' + (B[1] + 8) + '" marker-end="url(#pf-' + cl + ')"/>';
      }
      sal.forEach(function (x) { s += flecha(x[0], x[1], "ad"); });
      vue.forEach(function (x) { s += flecha(x[0], x[1], "at"); });
      fl.innerHTML = '<defs><marker id="pf-ad" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#b8862b"/></marker>' +
        '<marker id="pf-at" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#c0503a"/></marker></defs>' + s;
      pintar();
    }
    function pintar() {
      tb.querySelectorAll(".fs").forEach(function (s) { s.innerHTML = ""; });
      for (var j = 0; j < n; j++) tb.querySelector('[data-i="' + pos[j] + '"] .fs').insertAdjacentHTML("beforeend",
        '<em style="background:' + FICHAS[j][2] + '"' + (j === turno && !fin ? ' class="ya"' : '') + '>' + FICHAS[j][0] + '</em>');
      jugEl.innerHTML = pos.map(function (p, j) {
        return '<span class="' + (j === turno && !fin ? "on" : "") + '" style="--c:' + FICHAS[j][2] + '"><em>' + FICHAS[j][0] + '</em>' + nombre(j) +
          ' <small>· casilla ' + p + '</small> <b>' + (treb[j] ? "🍀".repeat(treb[j]) : "") + '</b>' + (espera[j] ? ' <i>⏸</i>' : '') + '</span>';
      }).join("");
      var fi = '<span class="fi">' + FICHAS[turno][0] + '</span>';
      U.turnoCartel(c, fi + (bot ? (turno === 0 ? "Te toca a vos" : "Tira la casa…") : "Le toca a " + FICHAS[turno][1].toLowerCase()), fin ? "nada" : ["", "barro", "oro", ""][turno]);
      btn.disabled = fin || ocupado || (bot && turno === 1);
    }
    function nueva() {
      pos = []; espera = []; treb = []; turno = 0; fin = false; ocupado = false;
      for (var j = 0; j < n; j++) { pos.push(1); espera.push(0); treb.push(0); }
      msg.textContent = ""; ov.innerHTML = ""; ov.classList.remove("on"); f.classList.remove("on"); dibujar();
    }
    function mover(j, a, luego) {
      var paso = pos[j] < a ? 1 : -1;
      (function sig() {
        if (pos[j] === a) return luego();
        pos[j] += paso; pintar(); setTimeout(sig, 140);
      })();
    }
    function saltar(j, a, luego) { setTimeout(function () { pos[j] = a; pintar(); luego(); }, 250); }
    function tirar() {
      if (fin || ocupado) return;
      ocupado = true; ov.classList.remove("on"); pintar();
      var k = 0, d;
      dado.classList.add("gira");
      (function rueda() {
        d = 1 + Math.floor(Math.random() * 6); dado.textContent = "⚀⚁⚂⚃⚄⚅"[d - 1];
        if (++k < 8) return setTimeout(rueda, 70);
        dado.classList.remove("gira");
        var j = turno, dest = pos[j] + d;
        msg.innerHTML = FICHAS[j][0] + " " + nombre(j) + " sacó un <b>" + d + "</b>.";
        if (dest > META) {
          var reb = META - (dest - META);
          msg.innerHTML += " Se pasó y rebota a la " + reb + ".";
          mover(j, META, function () { setTimeout(function () { mover(j, reb, function () { caer(j); }); }, 250); });
        } else mover(j, dest, function () { caer(j); });
      })();
    }
    // La tarjeta de la casilla: qué pasa y el botón para seguir.
    function tarjeta(j, q, titulo, texto, efecto, luego) {
      var esBot = bot && j === 1;
      ov.innerHTML = '<div class="tj ' + tipo(pos[j]) + '"><span>Casilla ' + pos[j] + ' · ' + FICHAS[j][0] + ' ' + nombre(j) + '</span><i>' + q.ic + '</i><h4>' + titulo + '</h4>' +
        (texto ? '<p>' + texto + '</p>' : '') + (efecto ? '<b>' + efecto + '</b>' : '') +
        (esBot ? '' : '<button type="button">Seguir</button>') + '</div>';
      ov.classList.add("on");
      var hecho = false;
      function ok() { if (hecho) return; hecho = true; ov.classList.remove("on"); luego(); }
      if (esBot) setTimeout(ok, 2200); else ov.querySelector("button").addEventListener("click", ok);
    }
    function caer(j) {
      var p = pos[j], q = CAS[p];
      if (p === META) {
        fin = true; ocupado = false; pintar();
        tarjeta(j, q, "¡" + (bot ? (j === 0 ? "Ganaste vos" : "Ganó la casa") : "Ganó " + FICHAS[j][1].toLowerCase()) + "!", q.d, "", function () {});
        msg.innerHTML += " 🍕 ¡La pizza sale del horno!"; f.classList.add("on"); if (!(bot && j === 1)) U.festejo();
        return;
      }
      var ef = q.ef, titulo = q.t, texto = q.d || "";
      if (ef === "hist") {
        var h = HISTORIAS[Math.floor(Math.random() * HISTORIAS.length)];
        ef = h[1]; titulo = "Historias de La Serena"; texto = h[0];
      }
      if (ef === "tetera") {
        var prox = TETERAS[TETERAS.indexOf(p) + 1];
        ef = { a: prox, tira: 1 }; titulo = "Tetera"; texto = "De tetera en tetera y tiro porque me toca.";
      }
      var malo = q.malo || ef === "turno" || (typeof ef === "number" && ef < 0);
      if (malo && treb[j] > 0) {
        treb[j]--;
        return tarjeta(j, q, titulo, texto, "¡Usaste un trébol 🍀 y te salvaste!", function () { fin_(j, false); });
      }
      if (ef === "chacal") {
        var otros = pos.map(function (x, k) { return k; }).filter(function (k) { return k !== j; });
        var ult = otros.reduce(function (a, k) { return pos[k] < pos[a] ? k : a; }, otros[0]);
        var pri = otros.reduce(function (a, k) { return pos[k] > pos[a] ? k : a; }, otros[0]);
        var con = pos[j] <= pos[ult] ? pri : ult;
        return tarjeta(j, q, titulo, texto, "Cambiás de lugar con " + FICHAS[con][0] + " " + nombre(con).toLowerCase() + ".", function () {
          var t = pos[j]; pos[j] = pos[con]; pos[con] = t; pintar(); setTimeout(function () { fin_(j, false); }, 300);
        });
      }
      tarjeta(j, q, titulo, texto, efTexto(ef), function () {
        if (ef === "tira") return fin_(j, true);
        if (ef === "turno") { espera[j] = 1; return fin_(j, false); }
        if (ef === "trebol") { if (treb[j] < MAXT) treb[j]++; return fin_(j, false); }
        if (typeof ef === "number") return mover(j, Math.max(1, Math.min(META - 1, p + ef)), function () { fin_(j, false); });
        if (ef && ef.a) return saltar(j, ef.a, function () { fin_(j, !!ef.tira); });
        fin_(j, false);
      });
    }
    function fin_(j, otra) {
      ocupado = false;
      if (!otra) {
        for (var k = 0; k < n; k++) {
          turno = (turno + 1) % n;
          if (espera[turno] > 0) { espera[turno]--; msg.innerHTML = FICHAS[turno][0] + " " + nombre(turno) + " pierde este turno."; continue; }
          break;
        }
      }
      pintar();
      if (bot && turno === 1 && !fin) setTimeout(tirar, 900);
    }
    // Tocar una casilla muestra qué hace.
    tb.addEventListener("click", function (e) {
      var b = e.target.closest(".ca"); if (!b || ocupado || ov.classList.contains("on") && !fin) return;
      var i = +b.getAttribute("data-i"), q = CAS[i], ef = q.ef, d = q.d || "";
      if (ef === "hist") d = "Sacás una tarjeta con algo que pasó de verdad en La Serena.";
      if (ef === "tetera") d = "De tetera en tetera y tiro porque me toca: saltás a la " + TETERAS[TETERAS.indexOf(i) + 1] + " y tirás de nuevo.";
      var e2 = ef === "chacal" || ef === "hist" || ef === "tetera" ? "" : efTexto(ef);
      msg.innerHTML = q.ic + " <b>Casilla " + i + " · " + q.t + "</b>: " + d + (e2 ? " " + e2 : "") + (q.malo ? " <i>(un trébol te salva)</i>" : "");
    });
    btn.addEventListener("click", function () { if (!(bot && turno === 1)) tirar(); });
    c.querySelectorAll(".modos button").forEach(function (b) {
      b.addEventListener("click", function () {
        var v = +b.getAttribute("data-n"); bot = v === 1; n = bot ? 2 : v;
        c.querySelectorAll(".modos button").forEach(function (x) { x.classList.toggle("on", x === b); }); nueva();
      });
    });
    c.querySelector(".otra").addEventListener("click", nueva);
    nueva();
  }

  var css = document.createElement("style");
  css.textContent = [
    ".oc .modos { flex-wrap: wrap; }",
    ".oc .jug { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 10px; }",
    ".oc .jug span { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; font-weight: 600; padding: 4px 10px 4px 4px; border-radius: 999px; background: #fffaf0; box-shadow: inset 0 0 0 1.5px var(--linea); color: var(--tinta); }",
    ".oc .jug span.on { box-shadow: inset 0 0 0 2.5px var(--c); }",
    ".oc .jug em { font-style: normal; width: 24px; height: 24px; border-radius: 50%; background: var(--c); display: flex; align-items: center; justify-content: center; font-size: 13px; }",
    ".oc .jug small { font-weight: 400; color: var(--gris); }",
    ".oc .jug b { font-size: 11px; letter-spacing: -2px; }",
    ".oc .otb { position: relative; width: min(360px, 94vw); aspect-ratio: 6 / 5; margin: 10px auto 0; padding: 4px; border-radius: 12px; background: var(--verde); box-sizing: border-box; }",
    ".oc .tb { position: absolute; inset: 4px; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); grid-template-rows: repeat(5, minmax(0, 1fr)); gap: 3px; }",
    ".oc .fl { position: absolute; inset: 4px; width: calc(100% - 8px); height: calc(100% - 8px); z-index: 2; pointer-events: none; }",
    ".oc .fl path { fill: none; stroke-width: 4; stroke-dasharray: 8 7; stroke-linecap: round; opacity: .7; }",
    ".oc .fl path.ad { stroke: #b8862b; }",
    ".oc .fl path.at { stroke: #c0503a; }",
    ".oc .ca { position: relative; font: inherit; border: none; padding: 0; cursor: pointer; background: #fffaf0; border-radius: 6px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 0; overflow: hidden; color: var(--tinta); }",
    ".oc .ca b { position: absolute; top: 2px; left: 4px; font: 700 9.5px Bahnschrift, sans-serif; color: rgba(42,37,32,.55); }",
    ".oc .ca i { font-style: normal; font-size: 19px; line-height: 1; margin-top: 4px; }",
    ".oc .ca small { font-size: 8.5px; font-weight: 700; line-height: 1.05; margin-top: 3px; max-width: 100%; padding: 0 2px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }",
    ".oc .ca.te { background: #f3e1b3; }",
    ".oc .ca.hi { background: #fff1c9; }",
    ".oc .ca.tr { background: #cfe5c6; }",
    ".oc .ca.bu { background: #e6efe0; }",
    ".oc .ca.ma { background: #f3c9bb; }",
    ".oc .ca.sa { background: #fffaf0; }",
    ".oc .ca.me { background: var(--oro); }",
    ".oc .ca .fs { position: absolute; inset: 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1px; z-index: 3; }",
    ".oc .ca .fs em { font-style: normal; font-size: 13px; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 4px rgba(0,0,0,.5); border: 2px solid #fffaf0; }",
    ".oc .ca .fs:empty { display: none; }",
    ".oc .ca .fs em.ya { animation: late .8s ease-in-out infinite; }",
    ".oc .ocv { position: absolute; inset: 0; z-index: 5; display: none; align-items: center; justify-content: center; background: rgba(20,32,24,.55); border-radius: 12px; }",
    ".oc .ocv.on { display: flex; }",
    ".oc .tj { width: 78%; background: #fffaf0; border-radius: 14px; padding: 12px 14px 14px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,.35); animation: pone .3s ease-out; border-top: 8px solid var(--verde); }",
    ".oc .tj.ma { border-top-color: #c0503a; } .oc .tj.te, .oc .tj.me { border-top-color: var(--oro); } .oc .tj.tr { border-top-color: #6aa55a; } .oc .tj.hi { border-top-color: #e9b949; }",
    ".oc .tj span { font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: var(--gris); font-weight: 700; }",
    ".oc .tj i { display: block; font-style: normal; font-size: 34px; line-height: 1.1; margin-top: 4px; }",
    ".oc .tj h4 { font-family: Georgia, serif; font-size: 19px; color: var(--verde); margin: 2px 0 0; }",
    ".oc .tj p { font-size: 14px; line-height: 1.35; margin: 6px 0 0; }",
    ".oc .tj b { display: block; margin-top: 8px; font-size: 15px; color: #8a5a12; }",
    ".oc .tj button { margin-top: 10px; font: inherit; font-weight: 700; font-size: 15px; border: none; border-radius: 10px; background: var(--verde); color: var(--papel); padding: 8px 22px; cursor: pointer; }",
    ".oc .ocd { margin-top: 12px; }",
    ".oc .tirar { font: inherit; font-weight: 700; font-size: 16px; border: none; border-radius: 12px; background: var(--oro); color: #1d2e22; padding: 11px 22px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; }",
    ".oc .tirar:disabled { background: var(--linea); color: var(--gris); cursor: default; }",
    ".oc .dado { font-size: 26px; line-height: 1; display: inline-block; }",
    ".oc .dado.gira { animation: rueda .25s linear infinite; }",
    ".oc .msg { font-size: 15px; line-height: 1.4; min-height: 1.4em; }",
    ".oc .ayu { text-align: left; max-width: 360px; margin: 14px auto 0; font-size: 13.5px; color: var(--tinta); }",
    ".oc .ayu summary { cursor: pointer; font-weight: 600; color: var(--verde); }",
    ".oc .ayu li { margin: 5px 0 0 16px; line-height: 1.4; }"
  ].join("\n");
  document.head.appendChild(css);
  JUEGOS.extra.oca = oca;
})();
