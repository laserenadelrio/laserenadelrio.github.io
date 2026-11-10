// Novedades de la carta digital: lo que se viene, la semana fija y el Club La Serena. Se editan a mano.
// Cada evento aparece en el carrusel desde "mostrar" y desaparece solo al día siguiente de "hasta" (fechas año-mes-día).
// En el calendario aparece siempre, aunque todavía no haya llegado "mostrar".
// "wa" es el mensaje que le queda escrito al cliente en WhatsApp al tocar el botón.
// Al tocar la tarjeta se abre el detalle:
//   foto: productos de Fudo de los que se toma la foto (la primera que tenga) · info: renglones con datos útiles
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
    t: "Pizza libre al horno de barro", s: "Porciones de muzzarella, napolitana, fugazzeta y caprese que van saliendo del horno. Bebida aparte.",
    precio: "20.000 por persona", foto: ["PIZZA MUZZARELLA"], hora: ["20:00", "00:00"],
    info: ["Las porciones van saliendo del horno de barro y pasan por las mesas: comés hasta que digas basta.", "Muzzarella, napolitana, fugazzeta y caprese, al azar.", "La bebida va aparte.", "Después del estreno, todos los miércoles de 20 a 00 h."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar para la pizza libre del miércoles 4/11." },
  { mostrar: "2026-10-30", dia: "2026-11-05", hasta: "2026-11-05", fecha: "Jueves 5/11 · desde las 20 h", tag: "Se estrena", ic: "🃏", de: "truco",
    t: "Jueves de truco", s: "Mesas con mazo y anotador, entrada libre. Traé a tu pareja de truco y jugá en la cabaña.",
    precio: "Promo picada + 2 latas de Imperial 40.000", foto: ["TABLA DE PICADA"], hora: ["20:00", "01:00"],
    info: ["Mazo y anotador en la mesa. La entrada es libre.", "Para acompañar, la promo picada + 2 latas de Imperial.", "Después del estreno, todos los jueves desde las 20 h.", "El jueves 19/11 es la Copa La Serena: anotá a tu pareja."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para la noche de truco del jueves 5/11." },
  { mostrar: "2026-10-30", dia: "2026-11-19", hasta: "2026-11-19", cierre: "2026-11-18", fecha: "Jueves 19/11 · 20 h", tag: "Torneo", ic: "🏆", de: "truco",
    t: "Copa La Serena de truco", sub: "TBT · Torneo Bimestral de Truco · 1.ª edición",
    s: "Por parejas, sin flor y todo a un partido. Al menos un mayor de 18 por pareja. Inscripción del 5/11 al 18/11.",
    precio: "9.000 por pareja, con una lata de Imperial para cada uno", urgente: "Cupos limitados: solo 16 parejas", foto: ["CERVEZA IMPERIAL LAGER 473ML", "TABLA DE PICADA"], hora: ["20:00", "01:00"],
    info: ["Inscripción del jueves 5/11 al miércoles 18/11, por WhatsApp. Se paga por transferencia al anotarte.", "9.000 por pareja, con una lata de Imperial para cada uno.", "16 parejas, adentro del salón. Sin flor y todo a un partido.", "Al menos un mayor de 18 por pareja.", "Campeones: un sixpack de Imperial para cada uno y un voucher por pizza + cerveza de litro. Subcampeones: el voucher.", "Se juega cada dos meses: la próxima, en enero."],
    boton: "Quiero anotar mi pareja", wa: "¡Hola! Quiero anotar a mi pareja en la Copa La Serena de truco del jueves 19/11." },
  // Confirmar el feriado del 9/11 antes de que aparezca (se muestra desde el 2/11).
  { mostrar: "2026-11-02", dia: "2026-11-09", hasta: "2026-11-09", fecha: "Lunes 9/11 · feriado", tag: "Abrimos", ic: "🧉",
    t: "Feriado criollo", s: "Adelantamos el Día de la Tradición con empanadas de carne a cuchillo, pastelitos y mazos en las mesas. El martes 10 cerramos.",
    foto: ["EMPANADA CARNE CUCHILLO", "PASTELITOS"],
    info: ["El lunes feriado abrimos de 10 a 01 h.", "Empanadas de carne a cuchillo y pastelitos de membrillo o batata.", "Mazos en las mesas para el truco.", "El martes 10 cerramos."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el lunes 9/11." },
  { mostrar: "2026-10-30", dia: "2026-11-17", hasta: "2026-11-17", fecha: "Martes 17/11 · de 17 h al cierre", tag: "Se estrena", ic: "🍷", de: "vermut",
    t: "Martes de vermut", s: "Vermut Carpano con soda o la bandeja vermutera para compartir, con botella, sifones, hielo y cítricos. Y la promo bandeja + picadita.",
    precio: "Vaso 7.000 · Bandeja 25.000 · Promo bandeja + picada 50.000", foto: ["VERMUT ROSSO CON SODA", "TABLA DE PICADA"], hora: ["17:00", "01:00"],
    info: ["Vaso de Carpano rosso o bianco con soda: 7.000.", "Bandeja vermutera para compartir, con botella, sifones, hielo y cítricos: 25.000.", "Promo bandeja + picada: 50.000.", "Después del estreno, todos los martes de 17 h al cierre (el martes 24/11 cerramos)."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar para el martes de vermut." },
  { mostrar: "2026-11-16", dia: "2026-11-23", hasta: "2026-11-23", fecha: "Lunes 23/11 · feriado", tag: "Abrimos", ic: "⭐",
    t: "Abrimos el feriado", s: "El lunes 23/11 te esperamos como siempre, de 10 a 01 h. El martes 24 cerramos.",
    info: ["El lunes feriado abrimos de 10 a 01 h, con la carta completa.", "El martes 24 cerramos."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el lunes 23/11." },
  { mostrar: "2026-11-20", dia: "2026-11-29", hasta: "2026-11-29", fecha: "Domingo 29/11", tag: "Día del Ñoqui", ic: "🍝",
    t: "Ñoquis del 29", s: "Ñoquis caseros y el billete bajo el plato, para que no falte la plata.",
    foto: ["ÑOQUIS"],
    info: ["Ñoquis caseros con bolognesa, fileto, crema o rosa.", "No te olvides del billete bajo el plato."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el domingo 29/11." },
  { mostrar: "2026-11-20", dia: "2026-12-05", hasta: "2026-12-08", fecha: "Del sábado 5 al martes 8/12", tag: "Aniversario", ic: "🎉",
    t: "¡La Serena cumple 3 años!", s: "Brindis ¡Sláinte! a las 21 h, torta por mesa y empanadas de carne a $2.000, como en 2023, de 20 a 21 h. El lunes 7 abrimos.",
    foto: ["EMPANADA CARNE CUCHILLO"],
    info: ["Festejamos del sábado 5 al martes 8/12.", "Empanadas de carne a 2.000, como en 2023, de 20 a 21 h.", "Brindis ¡Sláinte! a las 21 h y torta por mesa.", "El lunes 7 y el martes 8 son feriado y abrimos. El miércoles 9 cerramos.", "Arranca el Club La Serena: hacete socio."],
    boton: "Reservá tu mesa", wa: "¡Hola! Quiero reservar una mesa para el aniversario de La Serena." }
];

// Para el calendario: lunes feriados en los que abrimos y días que cerramos (el franco después del feriado).
var ABRIMOS = ["2026-11-09", "2026-11-23", "2026-12-07"];
var CERRAMOS = ["2026-11-10", "2026-11-24", "2026-12-09"];

// La semana fija. "desde": si todavía no arrancó, se muestra la fecha de estreno.
var SEMANA = [
  { id: "vermut", ic: "🍷", dia: "Martes", hora: "de 17 h al cierre", t: "Martes de vermut", s: "Vaso con soda 7.000 · Bandeja vermutera para compartir 25.000", precio: "50.000", chico: "promo bandeja + picada", desde: "2026-11-17", estilo: "barro" },
  { id: "pizza", ic: "🍕", dia: "Miércoles", hora: "de 20 a 00 h", t: "Pizza libre al horno de barro", s: "Van saliendo porciones de muzzarella, napolitana, fugazzeta y caprese. Bebida aparte.", precio: "20.000", chico: "por persona", desde: "2026-11-04", estilo: "oro" },
  { id: "truco", ic: "🃏", dia: "Jueves", hora: "desde las 20 h", t: "Noche de truco", s: "Mesas con mazo y anotador. Entrada libre.", precio: "40.000", chico: "promo picada + 2 latas de Imperial", desde: "2026-11-05" }
];

// Menú del día (martes a viernes, hasta las 17 h): se despliega en la tarjeta de la promo. Dos platos por día.
var MENU_DIA = [
  { dia: "Martes", platos: ["Tallarines con salsa parisienne", "Bondiola a la mostaza con batatas fritas"] },
  { dia: "Miércoles", platos: ["Arroz amarillo con pollo", "Carne al horno con papas españolas"] },
  { dia: "Jueves", platos: ["Pollo caprese con papas rústicas", "Revuelto gramajo"] },
  { dia: "Viernes", platos: ["Calzone napolitano", "Pollo al curry con papas bravas"] }
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
