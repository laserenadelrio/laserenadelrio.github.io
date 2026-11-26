// Lucky, el duende de La Serena (nombre elegido por Marcos el 26/11/2026). Calcado del dibujo de Marcos
// (Drive, FOTOS GENERAL, PHOTO-2026-03-03): galera verde que se abre un poco arriba, banda marrón con hebilla
// amarilla grande, ala finita y larga, barba colorada sin contorno (como el lápiz), cara corrida a la derecha,
// guiño, ceja levantada, nariz en gancho y sonrisa de costado. La pipa del original se cambia por un trébol.
// DUENDE.svg({ cara, boca, linea, parte }) devuelve el SVG (lienzo de 300x300):
//   cara: "guino" (la del dibujo), "contento", "sorpresa"
//   boca: "trebol" (la de la comunicación), "pipa" (solo para el archivo del dibujo original), "sonrisa"
//   linea: true para la versión de colorear (solo trazo, sin color)
//   parte: "todo" (por defecto), "asoma" (galera y ojos: se asoma desde atrás de algo), "sombrero" (solo la galera), "copa" (solo la copa, sin ala)
// DUENDE.formas tiene las formas sueltas (las usa colorear.js, copiadas).
(function () {
  var C = { galera: "#4c9656", galeraOsc: "#2f6b3a", banda: "#7b4a2c", hebilla: "#f2cf3a", barba: "#e27b44", barbaOsc: "#c25f2c",
            piel: "#f8dcc6", ojo: "#5b88a6", trebol: "#3f8a4c", pipa: "#8b5a2b", trazo: "#262220" };
  var F = {
    barba: "M49 146 C44 180 43 218 55 240 C70 266 102 283 143 286 C186 285 222 267 238 239 C249 214 251 180 247 146 Z",
    cara: "M98 146 C93 170 86 196 89 207 C91 214 95 217 101 220 C120 228 138 232 152 231 C172 229 186 221 195 211 C205 200 210 190 208 179 C206 168 200 158 197 146 Z",
    copa: "M80 36 Q78 24 92 23 Q152 19 212 15 Q226 14 225 27 L217 145 L81 147 Z",
    banda: "M82 116 Q150 112 217 114 L217 137 Q150 135 81 139 Z",
    hebilla: "M133 111 h33 a7 7 0 0 1 7 7 v19 a7 7 0 0 1 -7 7 h-33 a7 7 0 0 1 -7 -7 v-19 a7 7 0 0 1 7 -7 Z M137 118 v19 h25 v-19 Z",
    ala: "M14 147 Q150 155 286 141 Q150 149 14 147 Z",
    ojoAbierto: "M164 173 Q175 165 188 172 Q176 179 164 173 Z",
    guino: "M111 179 Q123 167 135 176",
    cejaGuino: "M109 163 Q121 158 134 155",
    ceja: "M169 156 Q180 157 188 166",
    nariz: "M157 178 Q149 181 144 186 M143 194 Q156 202 166 186",
    boca: "M108 203 Q150 215 193 204",
    hoyuelo: "M111 193 Q105 198 108 204"
  };
  var n = 0;
  function svg(o) {
    o = o || {};
    var cara = o.cara || "guino", boca = o.boca || "trebol", L = !!o.linea, parte = o.parte || "todo";
    function f(c) { return L ? "#ffffff" : c; }
    var s = ' stroke="' + C.trazo + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"';
    var sl = ' fill="none"' + s;
    // Barba: sin contorno negro, con un borde punteado más oscuro que imita el lápiz.
    var barba = L ? '<path d="' + F.barba + '" fill="#fff"' + s + '/>' :
      '<filter id="lapiz' + (++n) + '" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter>' +
      '<path d="' + F.barba + '" fill="' + C.barba + '" filter="url(#lapiz' + n + ')"/>';
    var piel = '<path d="' + F.cara + '" fill="' + f(C.piel) + '"' + s + '/>';
    var ojos;
    if (cara === "contento") ojos = '<path d="M111 178 Q123 167 135 176 M164 175 Q176 165 188 174"' + sl + '/>';
    else if (cara === "sorpresa") ojos = '<ellipse cx="123" cy="173" rx="8" ry="9" fill="#fff"' + s + '/><ellipse cx="176" cy="172" rx="8" ry="9" fill="#fff"' + s + '/>' +
      '<circle cx="123" cy="174" r="4" fill="' + (L ? C.trazo : C.ojo) + '"/><circle cx="176" cy="173" r="4" fill="' + (L ? C.trazo : C.ojo) + '"/>';
    else ojos = '<path d="' + F.guino + '"' + sl + '/><path d="' + F.cejaGuino + '"' + sl + '/>' +
      '<path d="' + F.ojoAbierto + '" fill="#fff"' + s + '/><circle cx="172" cy="172.5" r="4" fill="' + (L ? "none" : C.ojo) + '"' + (L ? s : '') + '/>' +
      (L ? '' : '<circle cx="172" cy="172.5" r="1.7" fill="' + C.trazo + '"/><circle cx="174" cy="171" r="1.1" fill="#fff"/>') +
      '<path d="' + F.ceja + '"' + sl + '/>';
    var nariz = '<path d="' + F.nariz + '"' + sl + '/>';
    var sonrisa = cara === "sorpresa" ? '<ellipse cx="150" cy="210" rx="7" ry="6.5" fill="' + f("#7a3a2a") + '"' + s + '/>' :
      '<path d="' + F.boca + '"' + sl + '/><path d="' + F.hoyuelo + '"' + sl + '/>';
    var extra = "";
    if (boca === "pipa") extra = '<path d="M172 207 Q195 204 214 195" fill="none" stroke="' + C.trazo + '" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M172 207 Q195 204 214 195" fill="none" stroke="' + f(C.pipa) + '" stroke-width="4.4" stroke-linecap="round"/>' +
      '<path d="M211 184 Q210 203 224 203 Q237 202 236 182 Q224 178 211 184 Z" fill="' + f(C.pipa) + '"' + s + '/>';
    else if (boca === "trebol" && cara !== "sorpresa") extra = '<path d="M186 205 Q200 202 210 193"' + sl.replace('stroke="' + C.trazo + '"', 'stroke="' + (L ? C.trazo : C.galeraOsc) + '"') + '/>' +
      '<g transform="translate(216 186) rotate(20)" fill="' + f(C.trebol) + '"' + s.replace("2.4", "1.8") + '>' +
      '<ellipse cx="-5.5" cy="-5.5" rx="5.5" ry="6.5" transform="rotate(-45 -5.5 -5.5)"/><ellipse cx="5.5" cy="-5.5" rx="5.5" ry="6.5" transform="rotate(45 5.5 -5.5)"/>' +
      '<ellipse cx="-5.5" cy="5.5" rx="5.5" ry="6.5" transform="rotate(45 -5.5 5.5)"/><ellipse cx="5.5" cy="5.5" rx="5.5" ry="6.5" transform="rotate(-45 5.5 5.5)"/></g>';
    var galera = '<path d="' + F.copa + '" fill="' + f(C.galera) + '"' + s + '/>' +
      '<path d="' + F.banda + '" fill="' + f(C.banda) + '"' + s + '/>' +
      '<path fill-rule="evenodd" d="' + F.hebilla + '" fill="' + f(C.hebilla) + '"' + s + '/>' +
      '<path d="' + F.ala + '" fill="' + f(C.galeraOsc) + '"' + s + '/>';
    var vb = parte === "sombrero" ? "10 8 280 146" : parte === "copa" ? "74 10 156 118" : parte === "asoma" ? "0 0 300 184" : "0 0 300 300";
    var cuerpo = parte === "sombrero" || parte === "copa" ? "" : barba + piel + ojos + (parte === "asoma" ? "" : nariz + sonrisa + extra);
    if (parte === "asoma") cuerpo = barba + piel + ojos + nariz;
    return '<svg viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg"' + (o.attrs || "") + '>' + cuerpo + galera + '</svg>';
  }
  window.DUENDE = { svg: svg, colores: C, formas: F, nombre: "Lucky" };
})();
