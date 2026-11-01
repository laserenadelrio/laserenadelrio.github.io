// Novedades de la carta digital: lo que se viene, la semana fija y el Club La Serena. Se editan a mano.
// Cada evento aparece desde "mostrar" y desaparece solo al día siguiente de "hasta" (fechas año-mes-día).
// "wa" es el mensaje que le queda escrito al cliente en WhatsApp al tocar el botón.

var WHATSAPP = "5491153349375";
var INSTAGRAM = "https://instagram.com/laserenadelrio";
var CANAL_WHATSAPP = ""; // link del Canal de WhatsApp, cuando esté creado

var EVENTOS = [
  { mostrar: "2026-10-24", dia: "2026-10-31", hasta: "2026-10-31", fecha: "Sábado 31/10 · todo el día", tag: "Para los chicos",
    t: "Halloween en La Serena", s: "Caramelos para los chicos de la apertura al cierre. ¡Vengan disfrazados!",
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el sábado 31/10." },
  { mostrar: "2026-10-30", dia: "2026-11-04", hasta: "2026-11-04", fecha: "Miércoles 4/11 · de 20 a 00 h", tag: "Se estrena",
    t: "Pizza libre al horno de barro", s: "Porciones de muzzarella, napolitana, fugazzeta y caprese que van saliendo del horno. Bebida aparte.",
    precio: "$20.000 por persona", boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar para la pizza libre del miércoles 4/11." },
  { mostrar: "2026-10-30", dia: "2026-11-05", hasta: "2026-11-05", fecha: "Jueves 5/11 · desde las 20 h", tag: "Se estrena",
    t: "Jueves de truco", s: "Mesas con mazo y anotador, entrada libre. Traé a tu pareja de truco y jugá en la cabaña.",
    precio: "Promo picada + 2 latas de Imperial $40.000", boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para la noche de truco del jueves 5/11." },
  { mostrar: "2026-10-30", dia: "2026-11-19", hasta: "2026-11-19", cierre: "2026-11-18", fecha: "Jueves 19/11 · 20 h", tag: "Torneo",
    t: "Copa La Serena de truco", sub: "TBT · Torneo Bimestral de Truco · 1.ª edición",
    s: "Por parejas, sin flor y todo a un partido. Al menos un mayor de 18 por pareja. Inscripción del 5/11 al 18/11.",
    precio: "$40.000 por pareja, con picada + 2 latas de Imperial", urgente: "Cupos limitados: solo 16 parejas",
    boton: "Quiero anotar mi pareja", wa: "¡Hola! Quiero anotar a mi pareja en la Copa La Serena de truco del jueves 19/11." },
  // Confirmar el feriado del 9/11 antes de que aparezca (se muestra desde el 2/11).
  { mostrar: "2026-11-02", dia: "2026-11-09", hasta: "2026-11-09", fecha: "Lunes 9/11 · feriado", tag: "Abrimos",
    t: "Feriado criollo", s: "Adelantamos el Día de la Tradición con empanadas de carne a cuchillo, pastelitos y mazos en las mesas. El martes 10 cerramos.",
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el lunes 9/11." },
  { mostrar: "2026-10-30", dia: "2026-11-17", hasta: "2026-11-17", fecha: "Martes 17/11 · de 17 h al cierre", tag: "Se estrena",
    t: "Martes de vermut", s: "Vermut Carpano con soda o la bandeja vermutera para compartir, con botella, sifones, hielo y cítricos. Y la promo bandeja + picadita.",
    precio: "Vaso $7.000 · Bandeja $25.000", boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar para el martes de vermut." },
  { mostrar: "2026-11-16", dia: "2026-11-23", hasta: "2026-11-23", fecha: "Lunes 23/11 · feriado", tag: "Abrimos",
    t: "Abrimos el feriado", s: "El lunes 23/11 te esperamos como siempre, de 10 a 01 h. El martes 24 cerramos.",
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el lunes 23/11." },
  { mostrar: "2026-11-20", dia: "2026-11-29", hasta: "2026-11-29", fecha: "Domingo 29/11", tag: "Día del Ñoqui",
    t: "Ñoquis del 29", s: "Ñoquis caseros y el billete bajo el plato, para que no falte la plata.",
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el domingo 29/11." },
  { mostrar: "2026-11-20", dia: "2026-12-05", hasta: "2026-12-08", fecha: "Del sábado 5 al martes 8/12", tag: "Aniversario",
    t: "¡La Serena cumple 3 años!", s: "Brindis ¡Sláinte! a las 21 h, torta por mesa y empanadas de carne a $2.000, como en 2023, de 20 a 21 h. El lunes 7 abrimos.",
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el aniversario de La Serena." }
];

// La semana fija. "desde": si todavía no arrancó, se muestra la fecha de estreno.
var SEMANA = [
  { dia: "Martes", hora: "de 17 h al cierre", t: "Martes de vermut", s: "Vaso con soda $7.000 · Bandeja vermutera para compartir $25.000", desde: "2026-11-17", estilo: "barro" },
  { dia: "Miércoles", hora: "de 20 a 00 h", t: "Pizza libre al horno de barro", s: "Porciones que van saliendo del horno. Bebida aparte.", precio: "$20.000", chico: "por persona", desde: "2026-11-04", estilo: "oro" },
  { dia: "Jueves", hora: "desde las 20 h", t: "Noche de truco", s: "Mesas con mazo y anotador. Entrada libre.", precio: "$40.000", chico: "promo picada + 2 latas de Imperial", desde: "2026-11-05" }
];

// Club La Serena. Antes de "lanzamiento" se muestra como "se viene" y se anotan por WhatsApp.
var CLUB = {
  lanzamiento: "2026-12-05",
  previa: "Arranca el sábado 5/12, con el aniversario. Anotate ya y sé de los primeros Serenos: hay sorpresa para los primeros socios.",
  beneficios: [
    { ic: "☕", t: "Café, té o limonada de cortesía", s: "En cada visita, si la mesa consume $25.000 por cada socio que lo pide (el mínimo puede actualizarse)." },
    { ic: "🌧", t: "Cartón Sudestada", s: "Los días de lluvia, un sello y un pastelito por visita con consumo. Al quinto sello, pizza + Heineken de litro." },
    { ic: "🎂", t: "Tu cumple en La Serena", s: "Postre con vela de regalo la semana de tu cumpleaños, con consumo en la mesa." },
    { ic: "🃏", t: "Primero en la Copa", s: "Prioridad para anotarte en el Torneo Bimestral de Truco." }
  ],
  wa: "¡Hola! Quiero hacerme socio del Club La Serena. Mi nombre es: "
};
