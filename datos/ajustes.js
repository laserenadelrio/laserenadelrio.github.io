// Cómo se muestra la carta. Los productos y precios salen solos de Fudo (datos/fudo.js);
// acá solo se corrige la presentación. Lo usan la carta completa y la carta de vinos.

// Nombres de categorías más lindos (la clave es el nombre en Fudo, en mayúsculas).
var CATEGORIAS = {
  "PIZZA": "Pizzas",
  "CERVEZA": "Cervezas",
  "COSAS DULCES Y POSTRES": "Dulces y postres",
  "MENU INFANTIL": "Menú infantil",
  "CAFETERIA": "Cafetería",
  "VINOS Y ESPUMANTES": "Vinos"
};

// Ajustes por producto (la clave es el nombre en Fudo, en mayúsculas):
// nombre lindo, nota corta, ocultar, o grupo fijo en la carta de vinos.
var AJUSTES = {
  "10% EN EFECTIVO": { nombre: "10% pagando en efectivo" },
  "COPA DE VINO TINTO": { nombre: "Copa de vino tinto" },
  "COPA DE VINO BLANCO": { nombre: "Copa de vino blanco" },
  "SIDRA 1888 473ML": { nombre: "Sidra 1888", nota: "lata de 473 ml" },
  "LOS ARBOLES CHARDONNAY": { nombre: "Los Árboles Chardonnay", nota: "Navarro Correas · Valle de Uco" },
  "FOND DE CAVE MALBEC": { nota: "Trapiche · Mendoza" },
  "DON DAVID MALBEC": { nota: "El Esteco · Cafayate, Salta" },
  "TRAPICHE MEDALLA MALBEC 2023": { nota: "Mendoza" },
  "ALARIS DULCE COSECHA": { nota: "Trapiche · Mendoza" }
  // Ejemplos: "ALGO": { ocultar: true }   ·   "UN VINO": { grupo: "Tintos" }
};

// Sin TACC en sus ingredientes (criterio del dueño, 27/10): todos los Principales,
// las Ensaladas salvo la Caesar, y el Brownie.
function sinTacc(categoria, nombre) {
  if (/^PRINCIPALES$/.test(categoria)) return true;
  if (/^ENSALADAS$/.test(categoria)) return !/CAESAR|CESAR/.test(nombre);
  return /BROWNIE/.test(nombre);
}

// Tildes que Fudo no tiene (palabra en minúscula -> con tilde).
var TILDES = { menu: "menú", dia: "día", cafe: "café", jamon: "jamón", limon: "limón", budin: "budín", te: "té",
  arboles: "árboles", sifon: "sifón", pure: "puré", rucula: "rúcula", maracuya: "maracuyá", arabe: "árabe",
  irlandes: "irlandés", sandwich: "sándwich", rustica: "rústica", rusticas: "rústicas", atun: "atún", brocoli: "brócoli",
  champinones: "champiñones", melon: "melón", salmon: "salmón", espanolas: "españolas", nuggets: "nuggets" };

// "MILANESA A CABALLO" -> "Milanesa a Caballo"; deja tal cual lo que tiene números (2023, 473ML).
function lindo(n) {
  var chicas = { de: 1, del: 1, y: 1, la: 1, las: 1, los: 1, el: 1, a: 1, al: 1, con: 1, o: 1, en: 1, e: 1 };
  return n.toLowerCase().split(/\s+/).map(function (p, i) {
    if (/\d/.test(p)) return p;
    var t = TILDES[p] || p;
    if (i > 0 && chicas[p]) return t;
    return t.charAt(0).toUpperCase() + t.slice(1);
  }).join(" ");
}

function precio(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }

function nombreCategoria(c) { return CATEGORIAS[c.nombre.toUpperCase()] || lindo(c.nombre); }

// Producto listo para mostrar, o null si está oculto.
function producto(categoria, p) {
  var clave = p.nombre.toUpperCase(), a = AJUSTES[clave] || {};
  if (a.ocultar) return null;
  return { clave: clave, nombre: a.nombre || lindo(p.nombre), nota: a.nota || "", desc: p.desc, precio: p.precio, foto: p.foto,
           grupo: a.grupo, stacc: sinTacc(categoria.toUpperCase(), clave) };
}

// Direcciones públicas (para los QR y los links entre páginas).
var URL_CARTA = "https://laserenadelrio.github.io/";
var URL_CARTA_VINOS = "https://laserenadelrio.github.io/vinos/";
