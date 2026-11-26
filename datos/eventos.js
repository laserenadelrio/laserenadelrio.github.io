// Novedades de la carta digital: lo que se viene, la semana fija y el Club La Serena. Se editan a mano.
// Cada evento aparece en el carrusel desde "mostrar" y desaparece solo al día siguiente de "hasta" (fechas año-mes-día).
// En el calendario aparece siempre, aunque todavía no haya llegado "mostrar".
// "wa" es el mensaje que le queda escrito al cliente en WhatsApp al tocar el botón.
// Al tocar la tarjeta se abre el detalle:
//   foto: productos de Fudo de los que se toma la foto (la primera que tenga), o una foto propia ("fotos/eventos/....jpg")
//   credito: "Foto: @usuario" si la foto es de un fotógrafo · info: renglones con datos útiles
//   hora: ["desde", "hasta"] para agendarlo en el calendario del celular (sin hora, se agenda el día entero)
//   ic: dibujito para el calendario · de: la noche fija de la semana que ese día reemplaza (pizza, truco o vermut)

var WHATSAPP = "5491153349375";
var INSTAGRAM = "https://instagram.com/laserenadelrio";
var CANAL_WHATSAPP = "https://whatsapp.com/channel/0029Vb9djBYDjiOZkeMTCH1S"; // link del Canal de WhatsApp (va en el Club y al pie)

var EVENTOS = [
  { mostrar: "2026-10-24", dia: "2026-10-31", hasta: "2026-10-31", fecha: "Sábado 31/10 · todo el día", tag: "Para los chicos", ic: "🎃",
    t: "Halloween en La Serena", s: "Caramelos para los chicos de la apertura al cierre. ¡Vengan disfrazados!",
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el sábado 31/10." },
  { mostrar: "2026-10-30", dia: "2026-11-04", hasta: "2026-11-04", fecha: "Miércoles 4/11 · de 20 a 00 h", tag: "Se estrena", ic: "🍕", de: "pizza",
    t: "PIZZA LIBRE", s: "Porciones de muzzarella, napolitana, fugazzeta y caprese que van saliendo del horno. Bebida aparte.",
    precio: "20.000 por persona", foto: ["PIZZA MUZZARELLA"], hora: ["20:00", "00:00"],
    info: ["Las porciones van saliendo del horno de barro y pasan por las mesas: comés hasta que digas basta.", "Muzzarella, napolitana, fugazzeta y caprese, al azar.", "La bebida va aparte.", "Después del estreno, todos los miércoles de 20 a 00 h."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar para la pizza libre del miércoles 4/11." },
  { mostrar: "2026-10-30", dia: "2026-11-05", hasta: "2026-11-05", fecha: "Jueves 5/11 · desde las 20 h", tag: "Se estrena", ic: "🃏", de: "truco",
    t: "Jueves de truco", s: "Mesas con mazo y anotador, entrada libre. Traé a tu pareja de truco y jugá en la cabaña.",
    precio: "Happy hour de latas toda la noche: 2 Imperial 9.000", foto: ["CERVEZA IMPERIAL LAGER 473ML"], hora: ["20:00", "01:00"],
    info: ["Mazo y anotador en la mesa. La entrada es libre.", "Happy hour de latas toda la noche: 2 latas de Imperial 9.000.", "Después del estreno, todos los jueves desde las 20 h."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para la noche de truco del jueves 5/11." },
  // Copa La Serena de truco del 19/11: SUSPENDIDA el 17/11 (no se anotó nadie; se pasa para más adelante). El jueves 19 es noche de truco normal.
  // Confirmar el feriado del 9/11 antes de que aparezca (se muestra desde el 2/11).
  { mostrar: "2026-11-02", dia: "2026-11-09", hasta: "2026-11-09", fecha: "Lunes 9/11 · feriado", tag: "Abrimos", ic: "🧉",
    t: "Feriado criollo", s: "Adelantamos el Día de la Tradición con empanadas de carne a cuchillo, pastelitos y mazos en las mesas. El martes 10 cerramos.",
    foto: ["EMPANADA CARNE CUCHILLO", "PASTELITOS"],
    info: ["El lunes feriado abrimos de 10 a 01 h.", "Empanadas de carne a cuchillo y pastelitos de membrillo o batata.", "Mazos en las mesas para el truco.", "El martes 10 cerramos."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el lunes 9/11." },
  // El estreno del Martes de vermut (17/11) se sacó de Fechas especiales el 14/11 (pedido de Marcos): ya está en las noches fijas de la semana.
  { mostrar: "2026-11-16", dia: "2026-11-23", hasta: "2026-11-23", fecha: "Lunes 23/11 · feriado", tag: "Abrimos", ic: "⭐",
    t: "Abrimos el feriado", s: "El lunes 23/11 te esperamos como siempre, de 10 a 01 h. El martes 24 cerramos.",
    info: ["El lunes feriado abrimos de 10 a 01 h, con la carta completa.", "El martes 24 cerramos."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el lunes 23/11." },
  { mostrar: "2026-11-20", dia: "2026-11-29", hasta: "2026-11-29", fecha: "Domingo 29/11", tag: "Día del Ñoqui", ic: "🍝",
    t: "Ñoquis del 29", s: "Ñoquis caseros y el billete bajo el plato, para que no falte la plata.",
    foto: ["fotos/eventos/noquis.jpg"],
    info: ["Ñoquis caseros con bolognesa, fileto, crema o rosa.", "No te olvides del billete bajo el plato."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el domingo 29/11." },
  { mostrar: "2026-11-26", dia: "2026-12-03", hasta: "2026-12-03", fecha: "Jueves 3/12 · desde las 20 h", tag: "Se estrena", ic: "🎲", de: "juegos",
    t: "Jueves de Juegos", s: "Cartas, dados y reglamentos en la mesa. Truco, chinchón, generala y más.",
    precio: "Happy hour de latas toda la noche: 2 Imperial 9.000", foto: ["fotos/eventos/jueves-de-juegos.jpg"], hora: ["20:00", "01:00"],
    info: ["Truco, chinchón, podrida, carioca, generala y desconfío.", "Se juega por la gloria, nunca por plata.", "Después del estreno, todos los jueves desde las 20 h."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el Jueves de Juegos del 3/12." },
  { mostrar: "2026-11-20", dia: "2026-12-05", hasta: "2026-12-08", fecha: "Del sábado 5 al martes 8/12", tag: "Aniversario", ic: "🎉",
    t: "¡La Serena cumple 3 años!", s: "Brindis ¡Sláinte! a las 21 h, torta por mesa y empanadas de carne a $2.000, como en 2023, de 20 a 21 h. El lunes 7 abrimos.",
    foto: ["fotos/eventos/aniversario-cabana.jpg"], credito: "Foto: @sebastian_penna",
    info: ["Festejamos del sábado 5 al martes 8/12.", "Empanadas de carne a 2.000, como en 2023, de 20 a 21 h.", "Brindis ¡Sláinte! a las 21 h y torta por mesa.", "El lunes 7 y el martes 8 son feriado y abrimos. El miércoles 9 cerramos.", "Arranca el Club La Serena: hacete socio."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el aniversario de La Serena." }
];

// Para el calendario: lunes feriados en los que abrimos y días que cerramos (el franco después del feriado).
var ABRIMOS = ["2026-11-09", "2026-11-23", "2026-12-07"];
var CERRAMOS = ["2026-11-10", "2026-11-24", "2026-12-09"];

// La semana fija: va en "Se viene", una columna por día. "desde": si todavía no arrancó, se muestra la fecha de estreno.
// precios: [texto chico, precio] (sin "$").
var SEMANA = [
  { id: "vermut", ic: "🍷", dia: "Martes", hora: "de 17 h al cierre", t: "Vermut", s: "Vaso o Kit Vermutero", precios: [["Vaso con soda", "7.000"], ["Kit Vermutero", "25.000"]], desde: "2026-11-17", estilo: "barro" },
  { id: "pizza", ic: "🍕", dia: "Miércoles", hora: "de 20 a 00 h", t: "PIZZA LIBRE", s: "Porciones al horno de barro. Bebida aparte.", precios: [["Por persona", "20.000"]], desde: "2026-11-04", estilo: "oro" },
  { id: "truco", ic: "🃏", dia: "Jueves", hora: "desde las 20 h", t: "Truco", s: "Mazo y anotador en la mesa. Happy hour de latas toda la noche.", precios: [["2 latas de Imperial", "9.000"]], desde: "2026-11-05", hasta: "2026-12-02", ocultar: "2026-11-26" },
  // Desde el 3/12 los jueves pasan a ser "Jueves de Juegos" (aprobado por Marcos el 17/11). Aparece en la grilla desde el 26/11, con "Arranca el 3/12".
  { id: "juegos", ic: "🎲", dia: "Jueves", hora: "desde las 20 h", t: "Jueves de Juegos", s: "Cartas, dados y reglamentos en la mesa.", precios: [["2 latas de Imperial", "9.000"]], desde: "2026-12-03", mostrar: "2026-11-26" }
];

// Menú del día (martes a viernes, hasta las 17 h): se despliega en la tarjeta de la promo. Dos platos por día, cada uno con su foto (en fotos/menu-dia/).
var MENU_DIA = [
  { dia: "Martes", platos: ["Tallarines con salsa parisienne", "Bondiola a la mostaza con batatas fritas"], fotos: ["fotos/menu-dia/tallarines-parisienne.jpg", "fotos/menu-dia/bondiola-mostaza.jpg"] },
  { dia: "Miércoles", platos: ["Arroz amarillo con pollo", "Carne al horno con papas españolas"], fotos: ["fotos/menu-dia/arroz-amarillo-pollo.jpg", "fotos/menu-dia/carne-al-horno.jpg"] },
  { dia: "Jueves", platos: ["Pollo caprese con papas rústicas", "Revuelto gramajo"], fotos: ["fotos/menu-dia/pollo-caprese.jpg", "fotos/menu-dia/revuelto-gramajo.jpg"] },
  { dia: "Viernes", platos: ["Calzone napolitano", "Pollo al curry con papas bravas"], fotos: ["fotos/menu-dia/calzone-napolitano.jpg", "fotos/menu-dia/pollo-curry.jpg"] }
];

// Club La Serena. Antes de "lanzamiento" se muestra como "se viene" y se anotan por WhatsApp.
var CLUB = {
  lanzamiento: "2026-12-05",
  previa: "Arranca el sábado 5/12, con el aniversario. Anotate ya y sé de los primeros Serenos: hay sorpresa para los primeros socios.",
  beneficios: [
    { ic: "☕", t: "Café, té o limonada de cortesía", s: "En cada visita, cuando el socio consume $25.000 (el mínimo puede actualizarse)." },
    { ic: "🌧", t: "Cartón Sudestada", s: "Te damos un cartoncito para sellar: los días de lluvia, un sello y un pastelito por visita con consumo. Al quinto sello, pizza + Heineken de litro." },
    { ic: "🎂", t: "Tu cumple en La Serena", s: "Postre con vela de regalo la semana de tu cumpleaños, con consumo en la mesa." },
    { ic: "🃏", t: "Primero en la Copa", s: "Prioridad para anotarte en el Torneo Bimestral de Truco." }
  ],
  wa: "¡Hola! Quiero hacerme socio del Club La Serena. Mi nombre es: "
};
