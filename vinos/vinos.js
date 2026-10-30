// Arma la carta de vinos a partir de la categoría de Fudo que tenga "vino" en el nombre.
// Agrupa por palabras del nombre; si un vino cae mal, se le pone grupo fijo en datos/ajustes.js.

var GRUPOS = ["Por copa", "Tintos", "Blancos, rosados y dulces", "Espumantes", "Sidra", "Más vinos"];

function grupoDe(n) {
  if (/COPA/.test(n)) return "Por copa";
  if (/SIDRA/.test(n)) return "Sidra";
  if (/BRUT|ESPUMANTE|CHAMPA|NATURE|SPUMANTE/.test(n)) return "Espumantes";
  if (/DULCE|ROS[EÉ]|ROSADO|BLANCO|CHARDONNAY|SAUVIGNON|TORRONT|VIOGNIER|RIESLING|SEM[IÍ]LL|CHENIN/.test(n)) return "Blancos, rosados y dulces";
  if (/MALBEC|CABERNET|MERLOT|SYRAH|SHIRAZ|BONARDA|TINTO|PINOT NOIR|BLEND|TEMPRANILLO|PETIT|TANNAT|CRIOLLA/.test(n)) return "Tintos";
  return "Más vinos";
}

var VINOS = [], DESCORCHE = null, ACTUALIZADA = FUDO.actualizado;
(function () {
  var cat = FUDO.categorias.filter(function (c) { return /vino/i.test(c.nombre); })[0];
  if (!cat) return;
  var porGrupo = {};
  cat.productos.forEach(function (p) {
    var v = producto(cat.nombre, p);
    if (!v) return;
    if (/DESCORCHE/.test(v.clave)) { DESCORCHE = v.precio; return; }
    var g = v.grupo || grupoDe(v.clave);
    (porGrupo[g] = porGrupo[g] || []).push(v);
  });
  GRUPOS.forEach(function (g) {
    if (porGrupo[g]) VINOS.push({ grupo: g, items: porGrupo[g].sort(function (x, y) { return x.precio - y.precio; }) });
  });
})();
