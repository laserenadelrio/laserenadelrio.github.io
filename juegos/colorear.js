// Colorear (pedido de Marcos, 26/11/2026). Dibujos de La Serena en línea para pintar desde el celu.
// Dos herramientas: balde (se toca una zona y se pinta entera) y pincel (a mano alzada, tres grosores), más goma y deshacer.
// "Guardar mi dibujo" arma una imagen 1080x1350 con el logo, lista para subir a historias etiquetando a @laserenadelrio.
// Para sumar un dibujo: agregar un objeto a DIBUJOS con t (título) y z (zonas pintables, elementos SVG en un lienzo de 300x300).
// Las zonas se dibujan en orden: las de más abajo en la lista quedan arriba. "d" son líneas de detalle que no se pintan.
(function () {
  var U = JUEGOS.util;
  var DIBUJOS = [
    { id: "cabana", t: "La cabaña", z: [
      '<rect x="0" y="0" width="300" height="300"/>',
      '<circle cx="246" cy="56" r="22"/>',
      '<path d="M18 70 q10 -16 28 -8 q10 -14 26 -2 q16 0 14 14 h-68 q-8 -2 0 -4z"/>',
      '<path d="M0 226 Q150 210 300 228 L300 300 L0 300 Z"/>',
      '<path d="M0 266 Q40 256 75 264 T150 264 T225 264 T300 262 L300 300 L0 300 Z"/>',
      '<rect x="40" y="168" width="11" height="62"/>',
      '<circle cx="45" cy="140" r="36"/>',
      '<rect x="256" y="180" width="11" height="52"/>',
      '<ellipse cx="262" cy="148" rx="30" ry="42"/>',
      '<path d="M150 42 L240 226 L60 226 Z"/>',
      '<path d="M150 82 L214 222 L86 222 Z"/>',
      '<rect x="134" y="112" width="32" height="38"/>',
      '<rect x="137" y="176" width="26" height="46"/>',
      '<rect x="52" y="222" width="196" height="12"/>'
    ], d: '<path d="M150 112 V150 M134 131 H166 M110 170 H190 M100 192 H200 M95 207 H205" /><circle cx="157" cy="200" r="1.8"/>' },
    { id: "tetera", t: "La tetera gigante", z: [
      '<rect x="0" y="0" width="300" height="300"/>',
      '<rect x="0" y="236" width="300" height="64"/>',
      '<path d="M88 150 C52 148 40 112 28 84 L44 76 C56 104 66 128 94 128 Z"/>',
      '<path fill-rule="evenodd" d="M206 128 C262 122 266 210 204 206 L204 188 C240 190 238 142 206 146 Z"/>',
      '<ellipse cx="150" cy="170" rx="72" ry="60"/>',
      '<path d="M96 122 Q150 70 204 122 Z"/>',
      '<circle cx="150" cy="86" r="12"/>',
      '<rect x="100" y="222" width="100" height="18" rx="6"/>',
      '<circle cx="52" cy="258" r="9"/>', '<circle cx="250" cy="262" r="9"/>'
    ], d: '<path d="M112 168 q10 -14 20 0 q10 14 20 0 q10 -14 20 0 q10 14 20 0"/><path d="M110 196 Q150 214 190 196 M124 122 Q150 112 176 122"/>' },
    { id: "horno", t: "El horno de barro", z: [
      '<rect x="0" y="0" width="300" height="300"/>',
      '<rect x="140" y="60" width="20" height="34"/>',
      '<rect x="44" y="222" width="212" height="44"/>',
      '<path d="M62 222 Q62 92 150 88 Q238 92 238 222 Z"/>',
      '<path d="M116 222 L116 178 Q150 140 184 178 L184 222 Z"/>',
      '<path d="M134 222 C126 202 140 196 138 180 C150 192 146 170 158 162 C158 182 172 186 166 204 C172 200 176 210 168 222 Z"/>',
      '<ellipse cx="80" cy="282" rx="26" ry="8"/>', '<ellipse cx="220" cy="282" rx="26" ry="8"/>'
    ], d: '<path d="M150 58 C138 44 160 34 148 18 M162 56 C170 44 160 36 168 26"/><path d="M44 244 H256 M80 222 V244 M130 222 V244 M180 222 V244 M230 222 V244 M60 244 V266 M105 244 V266 M155 244 V266 M205 244 V266 M90 150 q8 -6 16 0 M196 130 q8 -6 16 0 M200 180 q8 -6 16 0"/>' },
    { id: "pizza", t: "La pizza", z: [
      '<rect x="0" y="0" width="300" height="300"/>',
      '<rect x="230" y="138" width="62" height="24" rx="12"/>',
      '<circle cx="140" cy="150" r="122"/>',
      '<circle cx="140" cy="150" r="104"/>',
      '<circle cx="140" cy="150" r="90"/>',
      '<circle cx="100" cy="110" r="14"/>', '<circle cx="176" cy="104" r="14"/>', '<circle cx="190" cy="176" r="14"/>', '<circle cx="104" cy="196" r="14"/>', '<circle cx="146" cy="150" r="14"/>',
      '<circle cx="130" cy="92" r="6"/>', '<circle cx="80" cy="150" r="6"/>', '<circle cx="164" cy="214" r="6"/>', '<circle cx="210" cy="136" r="6"/>',
      '<ellipse cx="146" cy="120" rx="12" ry="6" transform="rotate(-30 146 120)"/>', '<ellipse cx="116" cy="164" rx="12" ry="6" transform="rotate(40 116 164)"/>', '<ellipse cx="170" cy="150" rx="12" ry="6" transform="rotate(10 170 150)"/>'
    ], d: '<path d="M140 60 V240 M50 150 H230 M76 86 L204 214 M204 86 L76 214"/>' },
    { id: "rio", t: "El río", z: [
      '<rect x="0" y="0" width="300" height="300"/>',
      '<circle cx="62" cy="62" r="26"/>',
      '<path d="M170 64 q12 -20 34 -10 q14 -16 32 0 q20 0 16 18 h-84 q-10 -2 2 -8z"/>',
      '<path d="M0 150 Q80 136 150 146 Q220 154 300 140 L300 172 L0 172 Z"/>',
      '<path d="M30 150 q0 -40 22 -44 q22 4 22 44 z"/>', '<path d="M236 146 q0 -34 20 -38 q20 4 20 38 z"/>',
      '<rect x="0" y="170" width="300" height="130"/>',
      '<path d="M66 216 L234 216 L218 246 L84 246 Z"/>',
      '<rect x="96" y="188" width="104" height="28" rx="4"/>',
      '<rect x="106" y="194" width="18" height="14"/>', '<rect x="132" y="194" width="18" height="14"/>', '<rect x="158" y="194" width="18" height="14"/>',
      '<rect x="182" y="176" width="10" height="12"/>'
    ], d: '<path d="M20 266 q14 -8 28 0 M200 276 q14 -8 28 0 M120 284 q14 -8 28 0 M110 100 l10 -6 l10 6 M136 86 l8 -5 l8 5 M70 232 H230"/>' },
    // Lucky, el duende de La Serena (la mascota, 26/11): las mismas formas de duende-svg.js (lienzo de 300x300).
    { id: "duende", t: "Lucky, el duende", z: [
      '<rect x="0" y="0" width="300" height="300"/>',
      '<path d="M49 146 C44 180 43 218 55 240 C70 266 102 283 143 286 C186 285 222 267 238 239 C249 214 251 180 247 146 Z"/>',
      '<path d="M98 146 C93 170 86 196 89 207 C91 214 95 217 101 220 C120 228 138 232 152 231 C172 229 186 221 195 211 C205 200 210 190 208 179 C206 168 200 158 197 146 Z"/>',
      '<path d="M164 173 Q175 165 188 172 Q176 179 164 173 Z"/>',
      '<circle cx="172" cy="172.5" r="4"/>',
      '<path d="M80 36 Q78 24 92 23 Q152 19 212 15 Q226 14 225 27 L217 145 L81 147 Z"/>',
      '<path d="M82 116 Q150 112 217 114 L217 137 Q150 135 81 139 Z"/>',
      '<path fill-rule="evenodd" d="M133 111 h33 a7 7 0 0 1 7 7 v19 a7 7 0 0 1 -7 7 h-33 a7 7 0 0 1 -7 -7 v-19 a7 7 0 0 1 7 -7 Z M137 118 v19 h25 v-19 Z"/>',
      '<path d="M14 147 Q150 155 286 141 Q150 149 14 147 Z"/>',
      '<ellipse transform="translate(216 186) rotate(20)" cx="-5.5" cy="-5.5" rx="5.5" ry="6.5"/>',
      '<ellipse transform="translate(216 186) rotate(20)" cx="5.5" cy="-5.5" rx="5.5" ry="6.5"/>',
      '<ellipse transform="translate(216 186) rotate(20)" cx="-5.5" cy="5.5" rx="5.5" ry="6.5"/>',
      '<ellipse transform="translate(216 186) rotate(20)" cx="5.5" cy="5.5" rx="5.5" ry="6.5"/>'
    ], d: '<path d="M111 179 Q123 167 135 176 M109 163 Q121 158 134 155 M169 156 Q180 157 188 166 M157 178 Q149 181 144 186 M143 194 Q156 202 166 186 M108 203 Q150 215 193 204 M111 193 Q105 198 108 204 M186 205 Q200 202 210 193"/>' },
    { id: "trebol", t: "El trébol de la suerte", z: [
      '<rect x="0" y="0" width="300" height="300"/>',
      '<path fill-rule="evenodd" d="M150 14 A136 136 0 1 1 149.9 14 Z M150 34 A116 116 0 1 0 150.1 34 Z"/>',
      '<path d="M156 160 C176 200 190 230 206 262 L194 266 C180 236 164 204 146 166 Z"/>',
      '<ellipse cx="114" cy="114" rx="38" ry="46" transform="rotate(-45 114 114)"/>',
      '<ellipse cx="186" cy="114" rx="38" ry="46" transform="rotate(45 186 114)"/>',
      '<ellipse cx="114" cy="186" rx="38" ry="46" transform="rotate(45 114 186)"/>',
      '<ellipse cx="186" cy="186" rx="38" ry="46" transform="rotate(-45 186 186)"/>',
      '<circle cx="150" cy="150" r="12"/>'
    ], d: '<path d="M150 150 L100 100 M150 150 L200 100 M150 150 L100 200 M150 150 L200 200"/>' },
    // Hoja en blanco (pedido de Marcos, 26/11): para dibujar a mano alzada. Arranca con el pincel.
    { id: "blanco", t: "Hoja en blanco", libre: 1, titulo: "Mi dibujo", z: ['<rect x="0" y="0" width="300" height="300"/>'], d: "" }
  ];
  var COLORES = ["#1f3a2b", "#3f7a4f", "#8cbf6a", "#b8862b", "#e9b949", "#f6f0e4", "#ffffff", "#a8502a",
                 "#d9534f", "#f08aa6", "#9b6bb5", "#4a7a8c", "#7fb0c2", "#8b5a2b", "#c8a27a", "#2a2520"];
  var GROSOR = { fino: 4, medio: 10, grueso: 22 };

  function colorear(c) {
    var dib = DIBUJOS[0], color = COLORES[4], herr = "balde", grosor = "medio", historial = [];
    c.innerHTML = '<div class="jg co"><h3>Colorear</h3><div class="bj">Elegí un dibujo, un color y pintá. Con el balde se pinta una zona entera. O elegí la hoja en blanco y dibujá lo que quieras.</div>' +
      '<div class="cod">' + DIBUJOS.map(function (d, i) { return '<button type="button" data-d="' + i + '"' + (i ? '' : ' class="on"') + '>' + (d.libre ? "✏️ " : "") + d.t + '</button>'; }).join("") + '</div>' +
      '<div class="cow"><svg class="fil" viewBox="0 0 300 300"></svg><canvas></canvas><svg class="lin" viewBox="0 0 300 300"></svg></div>' +
      '<div class="coh"><button type="button" data-h="balde" class="on">🪣 Balde</button><button type="button" data-h="pincel">🖌️ Pincel</button><button type="button" data-h="goma">🧽 Goma</button>' +
      '<button type="button" data-u="1">↶ Deshacer</button></div>' +
      '<div class="cog"><span>Trazo:</span>' + Object.keys(GROSOR).map(function (k) { return '<button type="button" data-g="' + k + '"' + (k === grosor ? ' class="on"' : '') + '><i style="width:' + (GROSOR[k] / 1.6 + 4) + 'px;height:' + (GROSOR[k] / 1.6 + 4) + 'px"></i>' + k + '</button>'; }).join("") + '</div>' +
      '<div class="cop">' + COLORES.map(function (k) { return '<button type="button" data-c="' + k + '" style="background:' + k + '"' + (k === color ? ' class="on"' : '') + ' aria-label="Color"></button>'; }).join("") + '</div>' +
      '<div class="coa"><button type="button" class="otra" data-a="limpiar">Empezar de nuevo</button><button type="button" class="gu" data-a="guardar">Guardar mi dibujo</button></div>' +
      '<div class="bj" style="margin-top:8px">Si lo subís a tus historias, etiquetanos: <b>@laserenadelrio</b> 🍀</div></div>';
    var fil = c.querySelector(".fil"), lin = c.querySelector(".lin"), cv = c.querySelector("canvas"), cx = cv.getContext("2d"), wrap = c.querySelector(".cow");

    function cargar(i) {
      dib = DIBUJOS[i]; historial = [];
      fil.innerHTML = dib.z.map(function (z, k) { return z.replace(/^<(\w+)/, '<$1 data-z="' + k + '" fill="#ffffff"'); }).join("");
      lin.innerHTML = '<g fill="none" stroke="#2a2520" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">' + dib.z.slice(1).join("").replace(/fill="[^"]*"/g, "") + dib.d + '</g>';
      tam(); cx.clearRect(0, 0, cv.width, cv.height);
      if (dib.libre) modoHerr("pincel");
    }
    function tam() {
      var r = wrap.getBoundingClientRect(), k = window.devicePixelRatio || 1;
      if (cv.width !== Math.round(r.width * k)) { cv.width = Math.round(r.width * k); cv.height = Math.round(r.width * k); }
    }
    // Balde: pinta la zona tocada.
    fil.addEventListener("click", function (e) {
      if (herr !== "balde") return;
      var z = e.target.closest("[data-z]"); if (!z) return;
      historial.push({ t: "f", z: z, antes: z.getAttribute("fill") });
      z.setAttribute("fill", color);
    });
    // Pincel y goma: se dibuja en el lienzo, entre las zonas y las líneas.
    var pinta = false, ult = null;
    function pos(e) { var r = cv.getBoundingClientRect(), k = cv.width / r.width; return [(e.clientX - r.left) * k, (e.clientY - r.top) * k]; }
    cv.addEventListener("pointerdown", function (e) {
      if (herr === "balde") return;
      tam(); pinta = true; ult = pos(e); cv.setPointerCapture(e.pointerId);
      historial.push({ t: "p", img: cx.getImageData(0, 0, cv.width, cv.height) });
      if (historial.length > 25) historial.splice(0, historial.length - 25);
      trazo(ult, ult); e.preventDefault();
    });
    cv.addEventListener("pointermove", function (e) { if (!pinta) return; var p = pos(e); trazo(ult, p); ult = p; e.preventDefault(); });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (n) { cv.addEventListener(n, function () { pinta = false; }); });
    function trazo(a, b) {
      var k = cv.width / 300;
      cx.globalCompositeOperation = herr === "goma" ? "destination-out" : "source-over";
      cx.strokeStyle = color; cx.lineCap = "round"; cx.lineJoin = "round"; cx.lineWidth = GROSOR[grosor] * k * (herr === "goma" ? 1.6 : 1);
      cx.beginPath(); cx.moveTo(a[0], a[1]); cx.lineTo(b[0] + 0.01, b[1]); cx.stroke();
    }
    function modoHerr(h) {
      herr = h; wrap.classList.toggle("dibuja", h !== "balde");
      c.querySelectorAll(".coh [data-h]").forEach(function (x) { x.classList.toggle("on", x.getAttribute("data-h") === h); });
    }
    c.querySelector(".coh").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      if (b.getAttribute("data-u")) {
        var u = historial.pop(); if (!u) return;
        if (u.t === "f") u.z.setAttribute("fill", u.antes); else cx.putImageData(u.img, 0, 0);
        return;
      }
      modoHerr(b.getAttribute("data-h"));
    });
    c.querySelector(".cog").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return; grosor = b.getAttribute("data-g");
      c.querySelectorAll(".cog button").forEach(function (x) { x.classList.toggle("on", x === b); });
      if (herr === "balde") modoHerr("pincel");
    });
    c.querySelector(".cop").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return; color = b.getAttribute("data-c");
      c.querySelectorAll(".cop button").forEach(function (x) { x.classList.toggle("on", x === b); });
      if (herr === "goma") modoHerr("balde");
    });
    c.querySelector(".cod").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      c.querySelectorAll(".cod button").forEach(function (x) { x.classList.toggle("on", x === b); });
      cargar(+b.getAttribute("data-d"));
    });
    c.querySelector('[data-a="limpiar"]').addEventListener("click", function () { cargar(DIBUJOS.indexOf(dib)); });
    c.querySelector('[data-a="guardar"]').addEventListener("click", guardar);

    // Arma la imagen para compartir: fondo crema, el dibujo y el pie con el logo.
    function svgImg(svgEl) {
      return new Promise(function (ok) {
        var s = new XMLSerializer().serializeToString(svgEl).replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900"');
        var im = new Image(); im.onload = function () { ok(im); };
        im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
      });
    }
    function guardar() {
      var W = 1080, H = 1350, out = document.createElement("canvas"); out.width = W; out.height = H;
      var o = out.getContext("2d");
      o.fillStyle = "#f6f0e4"; o.fillRect(0, 0, W, H);
      o.strokeStyle = "#1f3a2b"; o.lineWidth = 10; o.strokeRect(30, 30, W - 60, H - 60);
      o.strokeStyle = "#b8862b"; o.lineWidth = 3; o.strokeRect(48, 48, W - 96, H - 96);
      o.fillStyle = "#1f3a2b"; o.textAlign = "center";
      o.font = "italic 58px Georgia, serif"; o.fillText(dib.titulo || dib.t, W / 2, 150);
      Promise.all([svgImg(fil), svgImg(lin)]).then(function (ims) {
        o.drawImage(ims[0], 90, 200, 900, 900);
        o.drawImage(cv, 90, 200, 900, 900);
        o.drawImage(ims[1], 90, 200, 900, 900);
        o.font = "600 40px 'Segoe UI', sans-serif"; o.fillStyle = "#b8862b"; o.fillText("Pintado en La Serena", W / 2, 1180);
        o.font = "34px 'Segoe UI', sans-serif"; o.fillStyle = "#1f3a2b"; o.fillText("@laserenadelrio · Tigre", W / 2, 1235);
        out.toBlob(function (blob) {
          var nombre = "mi-dibujo-la-serena.png", f = window.File ? new File([blob], nombre, { type: "image/png" }) : null;
          if (f && navigator.canShare && navigator.canShare({ files: [f] })) {
            navigator.share({ files: [f], title: "Pintado en La Serena", text: "Lo pinté en La Serena 🍀 @laserenadelrio" }).catch(function () {});
          } else {
            var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nombre; document.body.appendChild(a); a.click(); a.remove();
          }
          U.festejo();
        }, "image/png");
      });
    }
    cargar(0);
    window.addEventListener("resize", function () { if (document.body.contains(cv)) { var g = cx.getImageData(0, 0, cv.width, cv.height); tam(); cx.putImageData(g, 0, 0); } });
  }

  var css = document.createElement("style");
  css.textContent = [
    ".co .cod { display: flex; gap: 6px; overflow-x: auto; padding: 10px 2px 4px; scrollbar-width: none; }",
    ".co .cod button, .co .coh button, .co .cog button { font: inherit; font-size: 13.5px; font-weight: 600; white-space: nowrap; border-radius: 999px; padding: 6px 12px; border: 1.5px solid var(--verde); background: transparent; color: var(--verde); cursor: pointer; }",
    ".co .cod button.on, .co .coh button.on, .co .cog button.on { background: var(--verde); color: var(--papel); }",
    ".co .cow { position: relative; width: min(340px, 88vw); aspect-ratio: 1; margin: 10px auto 0; border-radius: 12px; overflow: hidden; box-shadow: 0 0 0 1.5px var(--linea); background: #fff; touch-action: manipulation; }",
    ".co .cow svg, .co .cow canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }",
    ".co .cow canvas { pointer-events: none; }",
    ".co .cow.dibuja canvas { pointer-events: auto; touch-action: none; }",
    ".co .cow .lin { pointer-events: none; }",
    ".co .fil [data-z] { cursor: pointer; transition: fill .15s; }",
    ".co .coh, .co .cog { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 10px; align-items: center; }",
    ".co .cog span { font-size: 13px; color: var(--gris); }",
    ".co .cog i { display: inline-block; border-radius: 50%; background: currentColor; margin-right: 6px; vertical-align: middle; }",
    ".co .cop { display: grid; grid-template-columns: repeat(8, 1fr); gap: 6px; max-width: 340px; margin: 12px auto 0; }",
    ".co .cop button { aspect-ratio: 1; border-radius: 50%; border: 2px solid rgba(0,0,0,.15); cursor: pointer; padding: 0; }",
    ".co .cop button.on { box-shadow: 0 0 0 3px var(--papel), 0 0 0 5px var(--oro); transform: scale(1.08); }",
    ".co .coa { display: flex; gap: 8px; justify-content: center; margin-top: 12px; flex-wrap: wrap; }",
    ".co .coa .gu { font: inherit; font-weight: 700; font-size: 14px; border: none; border-radius: 999px; background: var(--oro); color: #1d2e22; padding: 8px 16px; cursor: pointer; }"
  ].join("\n");
  document.head.appendChild(css);
  JUEGOS.extra.colorear = colorear;
  JUEGOS.colorearDibujos = DIBUJOS; // para sumar el dibujo de la mascota desde otro archivo
})();
