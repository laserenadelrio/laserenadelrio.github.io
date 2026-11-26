// ¿Dónde está Lucky? (pedido de Marcos, 26/11/2026). Lucky, el duende de La Serena, se esconde en fotos de la casa.
// Cada partida son 5 fotos. En cada foto hay escondites pensados a mano (ESCONDITES): detrás de un balde, en la boca
// del horno, entre la rúcula... Lucky se asoma desde atrás de algo, así que se ve solo la galera y los ojos, o solo la galera.
//   Fácil: se asoma (galera y ojos).   Medio: solo la galera, algo transparente.   Difícil: solo la copa (sin ala), casi del color de la foto.
// Si se toca mal, suma 3 segundos. Para sumar escondites: x e y son el punto (en % de la foto) donde está el borde del que
// se asoma; s es el ancho de la galera en % de la foto; r es el giro; "solo" = ahí va siempre solo la galera.
// Las fotos son las del rompecabezas (juegos/fotos/). El dibujo de Lucky sale de duende-svg.js.
(function () {
  var U = JUEGOS.util;
  var ESCONDITES = {
    "fachada": { luz: "brightness(.85) sepia(.2)", lugares: [
      { x: 31, y: 46, s: 6, t: "en la ventanita de la cabaña" },
      { x: 47, y: 80, s: 7, t: "atrás de las plantas" },
      { x: 34, y: 19, s: 5, solo: 1, t: "arriba del techo" },
      { x: 67.5, y: 73.5, s: 4.5, t: "atrás del cartel del estacionamiento" },
      { x: 62, y: 13, s: 6, r: -15, solo: 1, t: "entre las hojas" },
      { x: 13, y: 90, s: 6, t: "entre las macetas" }] },
    "deck-lleno": { luz: "brightness(.9) sepia(.15)", lugares: [
      { x: 55.5, y: 84, s: 6, t: "en el balde de hielo" },
      { x: 22, y: 28.5, s: 5, solo: 1, t: "arriba de una viga" },
      { x: 8, y: 65, s: 7, t: "atrás de una silla" },
      { x: 67, y: 51, s: 5, t: "atrás de la baranda" },
      { x: 61.5, y: 44.5, s: 4, solo: 1, t: "en la costanera" }] },
    "salon": { luz: "brightness(.95)", lugares: [
      { x: 63, y: 51, s: 6, t: "atrás de la torta" },
      { x: 12, y: 23, s: 6, t: "atrás de la barra" },
      { x: 42, y: 28, s: 4, solo: 1, t: "en la ventana" },
      { x: 88, y: 6, s: 5, solo: 1, t: "en una viga del techo" },
      { x: 37, y: 42, s: 6, t: "atrás de una copa de helado" }] },
    "limonadas": { luz: "brightness(.92)", lugares: [
      { x: 64, y: 13, s: 5, solo: 1, t: "al lado de la mora" },
      { x: 70, y: 42, s: 7, t: "entre los dos vasos" },
      { x: 15, y: 86, s: 6, solo: 1, t: "en la bandeja" },
      { x: 39, y: 20, s: 5, t: "atrás de la frutilla" },
      { x: 92, y: 40, s: 5, t: "atrás de la botella de agua" }] },
    "picada": { luz: "brightness(.95)", lugares: [
      { x: 60, y: 25, s: 5, solo: 1, t: "entre el jamón crudo" },
      { x: 72, y: 34, s: 5, t: "atrás de un tomatito" },
      { x: 85, y: 86, s: 6, r: 20, solo: 1, t: "en la mesa de madera" },
      { x: 10, y: 60, s: 5, solo: 1, t: "arriba del salame" },
      { x: 50, y: 22, s: 6, t: "atrás de la tabla" }] },
    "deck-rio": { luz: "brightness(.95)", lugares: [
      { x: 15, y: 17, s: 6, solo: 1, t: "arriba de la espuma del submarino" },
      { x: 62, y: 40, s: 6, t: "atrás del brownie" },
      { x: 36, y: 27, s: 5, t: "entre las plantas" },
      { x: 72, y: 27, s: 4, t: "atrás de una mesa del deck" },
      { x: 70, y: 58, s: 5, solo: 1, t: "abajo de la servilleta" }] },
    "empanadas": { luz: "brightness(.9) sepia(.15)", lugares: [
      { x: 12, y: 31, s: 6, solo: 1, t: "entre dos empanadas" },
      { x: 45, y: 33, s: 6, t: "atrás del repulgue" },
      { x: 92, y: 74, s: 5, solo: 1, t: "en la tabla" },
      { x: 72, y: 62, s: 5, solo: 1, t: "en la parte dorada" },
      { x: 40, y: 81, s: 6, t: "atrás de la última empanada" }] },
    "horno": { luz: "brightness(.85) sepia(.15)", lugares: [
      { x: 66, y: 21, s: 6, t: "en la boca del horno" },
      { x: 58, y: 47, s: 6, t: "entre el perejil" },
      { x: 29, y: 59, s: 6, t: "atrás de la cazuela" },
      { x: 86, y: 72, s: 5, solo: 1, t: "en la servilleta" },
      { x: 8, y: 55, s: 5, solo: 1, t: "en el plato de al lado" }] },
    "pizza-crudo": { luz: "brightness(.95)", lugares: [
      { x: 25, y: 75, s: 5, solo: 1, t: "entre la rúcula" },
      { x: 66, y: 55, s: 5, solo: 1, t: "al lado de una aceituna" },
      { x: 91, y: 25, s: 5, solo: 1, t: "en la pala" },
      { x: 50, y: 92, s: 6, t: "atrás del borde de la pizza" },
      { x: 44, y: 30, s: 5, solo: 1, t: "entre las hojas verdes" }] }
  };
  var FOTOS = Object.keys(ESCONDITES);
  JUEGOS.duendeEscondites = ESCONDITES;
  // [nombre, multiplicador de tamaño, parte]
  // [nombre, tamaño, parte, opacidad, color apagado]. Camuflado (26/11, Marcos: "sigue siendo fácil"): en Medio va solo la galera,
  // un poco transparente; en Difícil solo asoma la copa (sin ala), más chica y casi del color de la foto.
  var NIVELES = [["Fácil", 1.8, "asoma", 1, 1], ["Medio", 1.5, "sombrero", 0.85, 0.75], ["Difícil", 1.8, "copa", 0.72, 0.55]];
  var RONDAS = 5;

  function juego(c) {
    var nivel = NIVELES[0], ronda, t0, penal, reloj, fotos, fin, lugar;
    c.innerHTML = '<div class="jg dn"><h3>¿Dónde está Lucky?</h3><div class="bj">Lucky, el duende de la cabaña, se esconde en cada foto. Se asoma desde atrás de algo: a veces se le ve solo la galera. Tocalo cuando lo encuentres. Si tocás mal, suma 3 segundos.</div>' +
      '<div class="modos">' + NIVELES.map(function (n, i) { return '<button type="button" data-n="' + i + '"' + (i ? '' : ' class="on"') + '>' + n[0] + '</button>'; }).join("") + '</div>' +
      '<div class="dni"><span class="rd"></span><span class="rl">0:00</span></div>' +
      '<div class="dnf"><img alt=""><div class="cap"></div></div><div class="msg"></div>' + U.finHTML() +
      '<div class="dnp">' + DUENDE.svg({ cara: "guino", boca: "trebol" }) + '<span>Este es Lucky. ¡Encontralo!</span></div></div>';
    var cont = c.querySelector(".dnf"), img = cont.querySelector("img"), cap = cont.querySelector(".cap"), msg = c.querySelector(".msg"), f = c.querySelector(".fin");

    function nueva() {
      clearInterval(reloj); ronda = 0; penal = 0; fin = false; t0 = Date.now();
      fotos = U.azar(FOTOS.slice()).slice(0, RONDAS);
      reloj = setInterval(tic, 500); f.classList.remove("on"); msg.textContent = ""; poner();
    }
    function tic() { var s = Math.round((Date.now() - t0) / 1000) + penal; c.querySelector(".rl").textContent = Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
    function poner() {
      var foto = fotos[ronda], E = ESCONDITES[foto];
      c.querySelector(".rd").textContent = "Foto " + (ronda + 1) + " de " + RONDAS;
      img.src = "juegos/fotos/" + foto + ".jpg";
      cap.innerHTML = foto === "fachada" ? '<span class="cr">Foto: @sebastian_penna</span>' : "";
      lugar = E.lugares[Math.floor(Math.random() * E.lugares.length)];
      var parte = lugar.solo && nivel[2] === "asoma" ? "sombrero" : nivel[2];
      var w = lugar.s * nivel[1];  // ancho de la galera (de punta a punta del ala) en % de la foto
      // Cada parte tiene su proporción (alto/ancho del dibujo recortado): galera 280x146, asomado 300x184.
      var ancho = parte === "sombrero" ? w : parte === "copa" ? w * 156 / 280 : w * 300 / 280;
      var alto = ancho * (parte === "sombrero" ? 146 / 280 : parte === "copa" ? 118 / 156 : 184 / 300);
      var caras = ["guino", "contento", "sorpresa"], cara = caras[Math.floor(Math.random() * 3)];
      var espejo = Math.random() < 0.5 ? -1 : 1;
      cap.insertAdjacentHTML("beforeend", '<b class="du" style="left:' + (lugar.x - ancho / 2) + '%;top:' + (lugar.y - alto) + '%;width:' + ancho + '%;height:' + alto + '%;' +
        'transform:rotate(' + (lugar.r || 0) + 'deg) scaleX(' + espejo + ');opacity:' + nivel[3] + ';filter:' + (E.luz || "") + ' saturate(' + nivel[4] + ')">' +
        DUENDE.svg({ cara: cara, boca: "trebol", parte: parte, attrs: ' preserveAspectRatio="none"' }) + '</b>');
    }
    cont.addEventListener("click", function (e) {
      if (fin) return;
      var du = cap.querySelector(".du"), r = du.getBoundingClientRect(), m = 8;
      if (e.clientX >= r.left - m && e.clientX <= r.right + m && e.clientY >= r.top - m && e.clientY <= r.bottom + m) {
        du.classList.add("ok"); fin = true;
        msg.textContent = "¡Ahí estaba, " + lugar.t + "! 🍀";
        setTimeout(function () {
          ronda++; fin = false;
          if (ronda < RONDAS) { poner(); return; }
          fin = true; clearInterval(reloj); tic();
          msg.innerHTML = "¡Encontraste a Lucky en las " + RONDAS + " fotos! Tiempo: <b>" + c.querySelector(".rl").textContent + "</b> 🎉";
          f.classList.add("on"); U.festejo();
        }, 1400);
      } else {
        penal += 3; tic(); msg.textContent = "Ahí no está… (+3 segundos)";
        var p = document.createElement("span"); p.className = "mal"; var rc = cont.getBoundingClientRect();
        p.style.left = (e.clientX - rc.left) + "px"; p.style.top = (e.clientY - rc.top) + "px"; cont.appendChild(p); setTimeout(function () { p.remove(); }, 600);
      }
    });
    c.querySelectorAll(".modos button").forEach(function (b) {
      b.addEventListener("click", function () { nivel = NIVELES[+b.getAttribute("data-n")]; c.querySelectorAll(".modos button").forEach(function (x) { x.classList.toggle("on", x === b); }); nueva(); });
    });
    c.querySelector(".otra").addEventListener("click", nueva);
    nueva();
  }

  var css = document.createElement("style");
  css.textContent = [
    ".dn .dni { display: flex; justify-content: space-between; width: min(340px, 90vw); margin: 10px auto 0; font-size: 14px; color: var(--gris); }",
    ".dn .dni .rl { font-family: Bahnschrift, sans-serif; font-size: 16px; color: var(--verde); }",
    ".dn .dnf { position: relative; width: min(340px, 90vw); aspect-ratio: 1; margin: 6px auto 0; border-radius: 12px; overflow: hidden; background: #ece2cd; cursor: crosshair; -webkit-tap-highlight-color: transparent; }",
    ".dn .dnf img { width: 100%; height: 100%; object-fit: cover; display: block; }",
    ".dn .cap { position: absolute; inset: 0; }",
    ".dn .cap > * { position: absolute; display: block; }",
    ".dn .cap svg { width: 100%; height: 100%; display: block; }",
    ".dn .cap .du { transform-origin: 50% 100%; }",
    ".dn .cap .cr { right: 6px; bottom: 5px; font-size: 10.5px; color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,.8); pointer-events: none; }",
    ".dn .cap .du.ok { opacity: 1 !important; filter: none !important; }",
    ".dn .cap .du.ok svg { animation: encontrado .9s ease-out; filter: drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px #e9b949); }",
    "@keyframes encontrado { 40% { transform: scale(1.8); } }",
    ".dn .mal { position: absolute; width: 30px; height: 30px; margin: -15px 0 0 -15px; border-radius: 50%; border: 3px solid #d9534f; animation: mal .6s ease-out forwards; pointer-events: none; }",
    "@keyframes mal { to { transform: scale(1.6); opacity: 0; } }",
    ".dn .dnp { display: flex; align-items: center; gap: 10px; justify-content: center; margin-top: 12px; font-size: 13.5px; color: var(--gris); }",
    ".dn .dnp svg { width: 50px; height: 50px; }"
  ].join("\n");
  document.head.appendChild(css);

  // Primero se baja el dibujo de Lucky y después se arma el juego.
  JUEGOS.extra.duende = function (c) {
    if (window.DUENDE) return juego(c);
    var s = document.createElement("script"); s.src = "juegos/duende-svg.js?v=3";
    s.onload = function () { juego(c); if (JUEGOS.alAbrir) JUEGOS.alAbrir("duende", c); };
    document.head.appendChild(s);
  };
})();
