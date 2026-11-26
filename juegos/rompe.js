// Rompecabezas (pedido de Marcos, 26/11/2026). Fotos de La Serena y de platos de Fudo.
// Niveles: para chicos 3x3 y 4x4 con piezas cuadradas; para grandes 5x5 y 6x6 con piezas de encastre.
// Las piezas se arrastran con el dedo desde la bandeja de abajo y encajan solas cuando quedan cerca de su lugar.
// Fotos propias en juegos/fotos/ (900x900). Para sumar una: agregarla a FOTOS con [archivo, título, crédito].
(function () {
  var U = JUEGOS.util;
  var FOTOS = [
    ["fachada", "La cabaña", "Foto: @sebastian_penna"], ["deck-lleno", "El deck lleno", ""], ["pizza-crudo", "Pizza de rúcula y crudo", ""],
    ["empanadas", "Empanadas", ""], ["limonadas", "Limonadas de frutos rojos", ""], ["picada", "La picada", ""],
    ["horno", "Cazuela del horno de barro", ""], ["deck-rio", "Merienda en el deck", ""], ["salon", "Postres frente al río", ""]
  ];
  var NIVELES = [["Chicos", 3, 0], ["Fácil", 4, 0], ["Grandes", 5, 1], ["Expertos", 6, 1]];

  // Borde de una pieza: de P a Q, con encastre hacia afuera (s=1), hacia adentro (s=-1) o recto (s=0).
  function borde(P, Q, s) {
    var dx = Q[0] - P[0], dy = Q[1] - P[1], L = Math.sqrt(dx * dx + dy * dy), d = [dx / L, dy / L], n = [d[1], -d[0]];
    function p(u, v) { return (P[0] + d[0] * u * L + n[0] * v * L).toFixed(2) + " " + (P[1] + d[1] * u * L + n[1] * v * L).toFixed(2); }
    if (!s) return " L" + p(1, 0);
    var a = 0.24 * s;
    return " L" + p(0.36, 0) + " C" + p(0.42, 0) + " " + p(0.28, a) + " " + p(0.5, a) + " C" + p(0.72, a) + " " + p(0.58, 0) + " " + p(0.64, 0) + " L" + p(1, 0);
  }

  function rompe(c) {
    var fotos = FOTOS.map(function (f) { return { src: "juegos/fotos/" + f[0] + ".jpg", t: f[1], cr: f[2] }; });
    U.variados(U.fotosFudo(), 6).forEach(function (p) { fotos.push({ src: p.foto, t: p.n, cr: "" }); });
    var foto = fotos[0], nivel = NIVELES[0], t0 = 0, reloj = null, piezas = [], puestas = 0, fin = false;
    c.innerHTML = '<div class="jg rp"><h3>Rompecabezas</h3><div class="bj">Elegí una foto y el nivel. Arrastrá las piezas desde abajo hasta su lugar.</div>' +
      '<div class="rpf">' + fotos.map(function (f, i) { return '<button type="button" data-f="' + i + '"' + (i ? '' : ' class="on"') + ' aria-label="' + f.t + '"><img alt="" loading="lazy" src="' + f.src + '"></button>'; }).join("") + '</div>' +
      '<div class="modos">' + NIVELES.map(function (n, i) { return '<button type="button" data-n="' + i + '"' + (i ? '' : ' class="on"') + '>' + n[0] + '</button>'; }).join("") + '</div>' +
      '<div class="rpi"><span class="tt"></span><span class="rl">0:00</span><span class="ayu">👁 Tocá el tablero para ver la foto</span></div>' +
      '<div class="rpw"></div><div class="msg"></div>' + U.finHTML() + '</div>';
    var w = c.querySelector(".rpw"), msg = c.querySelector(".msg"), f = c.querySelector(".fin"), verT = null;

    function armar() {
      fin = false; puestas = 0; msg.textContent = ""; f.classList.remove("on");
      clearInterval(reloj); t0 = 0; c.querySelector(".rl").textContent = "0:00";
      c.querySelector(".tt").textContent = foto.t + (foto.cr ? " · " + foto.cr : "");
      var W = Math.min(340, Math.round(window.innerWidth * 0.86)), n = nivel[1], cel = W / n, m = nivel[2] ? cel * 0.26 : 0, T = Math.round(W * 0.95);
      w.style.width = W + "px"; w.style.height = (W + T + 10) + "px";
      w.innerHTML = '<div class="tab" style="width:' + W + 'px;height:' + W + 'px"><div class="fan" style="background-image:url(\'' + foto.src + '\')"></div></div>';
      // La foto no se ve (pedido de Marcos, 26/11): al tocar el tablero aparece un ratito.
      w.querySelector(".tab").addEventListener("click", function () {
        if (fin) return; var fa = w.querySelector(".fan"); fa.classList.add("ver");
        clearTimeout(verT); verT = setTimeout(function () { fa.classList.remove("ver"); }, 1800);
      });
      // Encastres al azar: H[r][c] es el borde de abajo de la pieza (r,c); V[r][c], el de la derecha.
      var H = [], V = [];
      for (var r = 0; r < n; r++) { H.push([]); V.push([]); for (var k = 0; k < n; k++) { H[r].push(nivel[2] && r < n - 1 ? (Math.random() < 0.5 ? 1 : -1) : 0); V[r].push(nivel[2] && k < n - 1 ? (Math.random() < 0.5 ? 1 : -1) : 0); } }
      piezas = [];
      var uid = Date.now(), orden = U.azar(Array.apply(null, Array(n * n)).map(function (_, i) { return i; }));
      orden.forEach(function (i, j) {
        var r = Math.floor(i / n), k = i % n, S = cel + 2 * m;
        var a = [m, m], b = [m + cel, m], cc = [m + cel, m + cel], d = [m, m + cel];
        var path = "M" + a[0] + " " + a[1] + borde(a, b, r ? -H[r - 1][k] : 0) + borde(b, cc, V[r][k]) + borde(cc, d, H[r][k]) + borde(d, a, k ? -V[r][k - 1] : 0) + " Z";
        var id = "rp" + uid + "-" + i;
        var el = U.el('<div class="pz" style="width:' + S + 'px;height:' + S + 'px"><svg viewBox="0 0 ' + S + ' ' + S + '" width="' + S + '" height="' + S + '">' +
          '<defs><clipPath id="' + id + '"><path d="' + path + '"/></clipPath></defs>' +
          '<image href="' + foto.src + '" x="' + (m - k * cel) + '" y="' + (m - r * cel) + '" width="' + W + '" height="' + W + '" preserveAspectRatio="xMidYMid slice" clip-path="url(#' + id + ')"/>' +
          '<path class="ag" d="' + path + '" fill="transparent" stroke="rgba(42,37,32,.55)" stroke-width="1.2"/></svg></div>');
        var p = { el: el, x0: k * cel - m, y0: r * cel - m, S: S };
        // Lugar inicial en la bandeja, de abajo del tablero.
        p.x = Math.random() * (W - S + 2 * m) - m; p.y = W + 10 + Math.random() * Math.max(10, T - S);
        poner(p); el.style.zIndex = 10 + j; w.appendChild(el); piezas.push(p);
        arrastrar(p, cel);
      });
    }
    function poner(p) { p.el.style.transform = "translate(" + p.x.toFixed(1) + "px," + p.y.toFixed(1) + "px)"; }
    var zTop = 1000;
    function arrastrar(p, cel) {
      var ag = p.el.querySelector(".ag"), ini = null;
      ag.addEventListener("pointerdown", function (e) {
        if (p.ok || fin) return;
        if (!t0) { t0 = Date.now(); reloj = setInterval(tic, 1000); }
        ini = [e.clientX - p.x, e.clientY - p.y]; ag.setPointerCapture(e.pointerId);
        p.el.style.zIndex = ++zTop; p.el.classList.add("lev"); e.preventDefault();
      });
      ag.addEventListener("pointermove", function (e) { if (!ini) return; p.x = e.clientX - ini[0]; p.y = e.clientY - ini[1]; poner(p); e.preventDefault(); });
      function suelta() {
        if (!ini) return; ini = null; p.el.classList.remove("lev");
        if (Math.abs(p.x - p.x0) < cel * 0.28 && Math.abs(p.y - p.y0) < cel * 0.28) {
          p.x = p.x0; p.y = p.y0; poner(p); p.ok = true; p.el.classList.add("ok"); p.el.style.zIndex = 5; puestas++;
          if (puestas === piezas.length) termino();
        }
      }
      ag.addEventListener("pointerup", suelta); ag.addEventListener("pointercancel", suelta);
    }
    function seg() { return t0 ? Math.round((Date.now() - t0) / 1000) : 0; }
    function mmss(s) { return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
    function tic() { c.querySelector(".rl").textContent = mmss(seg()); }
    function termino() {
      fin = true; clearInterval(reloj); tic();
      w.querySelector(".fan").classList.add("ver"); w.classList.add("listo"); w.style.height = w.style.width; // se va la bandeja vacía
      msg.textContent = "¡Lo armaste en " + mmss(seg()) + "! 🎉"; f.classList.add("on"); U.festejo();
    }
    c.querySelector(".rpf").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return; foto = fotos[+b.getAttribute("data-f")];
      c.querySelectorAll(".rpf button").forEach(function (x) { x.classList.toggle("on", x === b); }); armar();
    });
    c.querySelectorAll(".modos button").forEach(function (b) {
      b.addEventListener("click", function () { nivel = NIVELES[+b.getAttribute("data-n")]; c.querySelectorAll(".modos button").forEach(function (x) { x.classList.toggle("on", x === b); }); armar(); });
    });
    c.querySelector(".otra").addEventListener("click", armar);
    armar();
  }

  var css = document.createElement("style");
  css.textContent = [
    ".rp .rpf { display: flex; gap: 6px; overflow-x: auto; padding: 10px 2px 4px; scrollbar-width: none; }",
    ".rp .rpf button { flex: none; width: 52px; height: 52px; border-radius: 10px; overflow: hidden; padding: 0; border: 2px solid transparent; cursor: pointer; background: #ece2cd; }",
    ".rp .rpf button.on { border-color: var(--oro); box-shadow: 0 0 0 2px var(--papel) inset; }",
    ".rp .rpf img { width: 100%; height: 100%; object-fit: cover; display: block; }",
    ".rp .modos { flex-wrap: wrap; }",
    ".rp .rpi { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; width: min(340px, 86vw); margin: 10px auto 0; font-size: 13px; color: var(--gris); }",
    ".rp .rpi .rl { font-family: Bahnschrift, sans-serif; font-size: 16px; color: var(--verde); }",
    ".rp .rpw { position: relative; margin: 8px auto 0; touch-action: none; user-select: none; -webkit-user-select: none; }",
    ".rp .tab { position: absolute; left: 0; top: 0; border-radius: 6px; background: #ece2cd; box-shadow: inset 0 0 0 1.5px var(--linea); overflow: hidden; }",
    ".rp .fan { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; transition: opacity .35s; }",
    ".rp .fan.ver { opacity: 1; }",
    ".rp .tab { cursor: zoom-in; }",
    ".rp .rpi .ayu { width: 100%; text-align: center; }",
    ".rp .rpw::after { content: 'Piezas'; position: absolute; left: 0; right: 0; bottom: -2px; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: #b9ab92; pointer-events: none; }",
    ".rp .pz { position: absolute; left: 0; top: 0; pointer-events: none; will-change: transform; }",
    ".rp .pz svg { display: block; overflow: visible; }",
    ".rp .pz .ag { pointer-events: all; cursor: grab; }",
    ".rp .pz.lev svg { filter: drop-shadow(0 6px 8px rgba(0,0,0,.35)); }",
    ".rp .pz.ok .ag { stroke: rgba(42,37,32,.12); cursor: default; pointer-events: none; }",
    ".rp .rpw.listo .pz .ag { stroke: transparent; }"
  ].join("\n");
  document.head.appendChild(css);
  JUEGOS.extra.rompe = rompe;
})();
