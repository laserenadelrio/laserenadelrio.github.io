// Cómo se arma la carta digital, al estilo de la carta física. Los precios y las fotos salen solos de Fudo.
// Cada fila junta uno o más productos de Fudo: ["texto", "NOMBRE EN FUDO"].
//   t: título fijo de la fila · d: descripción corta · lista: muestra los textos como variedades
//   sep: separador de los textos (" · " si no se dice) · star: preferido de la casa · foto: producto del que se toma la foto
// Si un producto se saca de Fudo, desaparece solo de su fila. Si se agrega uno nuevo, aparece al final de su categoría.

// Tarjetas de promos (la clave es el nombre en Fudo). Una promo nueva en Fudo aparece sola con su texto de Fudo.
var PROMOS = {
  "PROMO PIZZA + HEINEKEN": { estilo: "destacada", tag: "Todas las noches · de 20 a 00 h", t: "Pizza + <b>Heineken de litro de regalo</b>",
    s: "Pizza muzzarella o napolitana al horno de barro, para compartir.", fotos: ["PIZZA MUZZARELLA", "CERVEZA HEINEKEN DE LITRO"] },
  "MENU DEL DIA": { estilo: "verde", tag: "Martes a viernes · hasta las 17 h", t: "Menú del día", s: "Un plato distinto cada día, con bebida y café o postre." },
  "PROMO CAFE": { estilo: "verde", tag: "Promo café", t: "Café + 2 medialunas, budín, pastelito o tostaditas", s: "" },
  "HAPPY HOUR TRAGOS": { estilo: "oro", tag: "Happy hour · 17 a 20 h", t: "2 tragos", s: "Combiná fernet, gin tonic o Campari." },
  "HAPPY HOUR CERVEZA": { estilo: "oro", tag: "Happy hour · 17 a 20 h", t: "2 latas de Imperial", s: "De 473 ml." },
  "PROMO CERVEZA + FRITAS": { tag: "Para picar", t: "Papas fritas + 2 latas de Imperial", s: "Latas de 473 ml.", fotos: ["CERVEZA IMPERIAL LAGER 473ML"] },
  "PROMO CERVEZA + FRITAS CHEDDAR Y BACON": { tag: "Para picar", t: "Papas con cheddar y bacon + 2 latas de Imperial", s: "Latas de 473 ml.", fotos: ["PAPAS FRITAS CON CHEDDAR Y BACON", "CERVEZA IMPERIAL LAGER 473ML"] },
  "PROMO RABAS + PAPAS + CERVEZA": { tag: "Pican 3", t: "Rabas + papas fritas + Imperial de litro", s: "" },
  "10% EN EFECTIVO": { estilo: "cash", t: "<b>10% off</b> pagando en efectivo", s: "En consumos desde $20.000. No acumulable con otras promos." }
};

// Martes de vermut: recuadro al principio de Tragos. El precio de "otros días" del vaso sale de Fudo.
var VERMUT = { desde: "2026-11-17", vasoMartes: 7000, vasoFudo: "VERMUT ROSSO CON SODA", bandejaMartes: 25000, bandeja: 30000, bandejaPicadita: 50000 };

// Guarniciones a elección (recuadro al principio de Milanesas y Wraps). Por defecto salen con papas fritas.
var GUARNICIONES = "Papas fritas, puré de papas, calabazas asadas, ensalada mixta o coleslaw";

var CARTA = [
  { fudo: "ENTRADAS", filas: [
    { items: [["Tabla de picada", "TABLA DE PICADA"]], d: "Fiambres y quesos. Comen 2, pican 4", star: 1 },
    { items: [["Provoleta La Serena", "PROVOLETA LA SERENA"]], d: "Rellena con jamón crudo y tomates confitados", star: 1 },
    { items: [["Provoleta", "PROVOLETA"]], d: "Cherry, rúcula y orégano" },
    { items: [["Rabas", "RABAS"]] },
    { items: [["Tortilla de papa", "TORTILLA DE PAPA"]] },
    { items: [["Chicken fingers", "CHICKEN FINGERS"]], d: "5 bastoncitos, con barbacoa" },
    { items: [["Muzzarellitas", "MUZZARELLITAS"]], d: "4 bastones, con fileto" },
    { items: [["Papas con cheddar y bacon", "PAPAS FRITAS CON CHEDDAR Y BACON"]] },
    { items: [["Papas fritas", "PAPAS FRITAS PORCION"], ["con provenzal", "PAPAS FRITAS CON PROVENZAL"]] },
    { items: [["Panera extra", "PANERA EXTRA"]], d: "Con salsita del día" }
  ] },
  { fudo: "PRINCIPALES", nota: "Todos sin TACC en sus ingredientes", filas: [
    { sub: "Del horno de barro" },
    { items: [["Bondiola a la mostaza", "BONDIOLA A LA MOSTAZA"]], d: "Braseada a fuego lento, con batatas fritas", star: 1 },
    { items: [["Tapa de nalga", "TAPA DE NALGA"]], d: "A fuego lento, con papas fritas y coleslaw" },
    { sub: "Carnes y aves" },
    { items: [["Bife de chorizo", "BIFE DE CHORIZO"]], d: "Papas rústicas, ensalada y criolla", star: 1 },
    { items: [["Matambre a la pizza", "MATAMBRE A LA PIZZA"]], d: "Con papas fritas" },
    { items: [["Pollo al champi", "POLLO AL CHAMPI CON PAPAS ESPANOLAS"]], d: "Con papas españolas" },
    { items: [["Pollo al verdeo", "POLLO AL VERDEO CON PAPAS ESPANOLAS"]], d: "Con papas españolas" },
    { items: [["Chicken grill al limón", "CHICKEN GRILL AL LIMON"]], d: "Con calabazas asadas" },
    { items: [["Sugerencia del chef", "SUGERENCIA DEL CHEF"]], d: "Cada día algo distinto, consultá" },
    { sub: "Risottos" },
    { items: [["Risotto de pollo o calabaza", "RISOTTO"]] },
    { items: [["Risotto especial", "RISOTTO ESPECIAL"]], d: "Champi o cuatro quesos" }
  ] },
  { fudo: "PASTAS CASERAS", filas: [
    { items: [["Sorrentinos de jamón y queso", "SORRENTINOS CASEROS"]], d: "Con salsa rosa" },
    { items: [["Raviolones de verdura y ricota", "RAVIOLONES DE VERDURA"]], d: "Con fileto o mixta" },
    { items: [["Canelones de verdura y muzzarella", "CANELONES DE VERDURA Y MUZZARELLA"]], d: "Fileto, crema o rosa" },
    { items: [["Fideos cinta", "FIDEOS CINTA CASEROS"]], d: "Fileto, crema o rosa" },
    { items: [["Fideos cinta especiales", "FIDEOS CINTA ESPECIALES"]], d: "Champis, bolognesa, cuatro quesos o parisienne", star: 1 },
    { items: [["Ñoquis", "ÑOQUIS"]], d: "Bolognesa, fileto, crema o rosa" }
  ] },
  { fudo: "PIZZA", nota: "Al horno de barro", modo: "mosaico", estrellas: ["PIZZA RUCULA Y JAMON CRUDO"],
    notas: { "PIZZA MITAD Y MITAD": "Dos gustos en una", "CALZONE NAPOLITANO": "Queso, tomate, morrón y huevo", "CALZONE CAPRESSE": "Queso, tomate y albahaca" } },
  { fudo: "EMPANADAS", modo: "empanadas", estrellas: ["EMPANADA CARNE CUCHILLO"] },
  { fudo: "MILANESAS", nota: "Con guarnición a elección", guarnicion: 1, filas: [
    { items: [["Mila La Serena", "MILA LA SERENA"]], d: "Nuestra especialidad: de ternera, con fideos a la crema y parmesano", star: 1 },
    { sub: "De ternera · de pollo" },
    { t: "Milanesa", items: [["", "MILANESA DE TERNERA"], ["", "MILANESA DE POLLO"]] },
    { t: "Napolitana", items: [["", "MILANESA NAPOLITANA"], ["", "MILANESA DE POLLO NAPOLITANA"]], star: 1 },
    { t: "A caballo", items: [["", "MILANESA A CABALLO"], ["", "MILANESA DE POLLO A CABALLO"]] },
    { t: "Olivia", items: [["", "MILANESA OLIVIA"], ["", "MILANESA DE POLLO OLIVIA"]], d: "Acelga a la crema y muzzarella" },
    { t: "Milanga del Viejo", items: [["", "MILANGA DEL VIEJO"], ["", "MILANGA DEL VIEJO (DE POLLO)"]], d: "Cuatro quesos, con puré" },
    { sub: "Al pan" },
    { items: [["Sándwich de milanesa completo", "SANDWICH DE MILANESA COMPLETO"]], d: "Lechuga, tomate, jamón, queso y huevo" }
  ] },
  { fudo: "HAMBURGUESAS", nota: "En pan de papa, con papas fritas", filas: [
    { sub: "Simple · doble" },
    { t: "Cheeseburger", items: [["", "CHEESEBURGER SIMPLE"], ["", "CHEESEBURGER DOBLE"]], d: "Cheddar fundido" },
    { t: "Classic", items: [["", "CLASSIC BURGER SIMPLE"], ["", "CLASSIC BURGER DOBLE"]], d: "Jamón, queso, lechuga y tomate" },
    { t: "BBQ", items: [["", "BBQ BURGER SIMPLE"], ["", "BBQ BURGER DOBLE"]], d: "Cheddar, bacon y barbacoa" },
    { t: "Cebollita", items: [["", "CEBOLLITA BURGER SIMPLE"], ["", "CEBOLLITA BURGER DOBLE"]], d: "Queso, cebolla caramelizada y huevo frito" },
    { t: "Blue", items: [["", "BLUE BURGER SIMPLE"], ["", "BLUE BURGER DOBLE"]], d: "Queso azul, muzzarella y cebolla caramelizada" },
    { t: "Cochiloca", items: [["", "COCHILOCA BURGER SIMPLE"], ["", "COCHILOCA BURGER DOBLE"]], d: "Bondiola braseada, cheddar, bacon y ketchup", star: 1 },
    { items: [["Medallón adicional", "ADICIONAL MEDALLON"]], d: "Solo para valientes" }
  ] },
  { fudo: "WRAPS", nota: "Con guarnición a elección", guarnicion: 1, filas: [
    { items: [["Bondiola", "WRAP DE BONDIOLA"]], d: "Cebolla caramelizada, barbacoa y muzzarella", star: 1 },
    { items: [["Pollo", "WRAP DE POLLO"]], d: "Suprema, morrón, cebolla, verdeo y muzzarella" },
    { items: [["Caesar", "WRAP CAESAR"]], d: "Suprema, lechuga, parmesano y aderezo caesar" },
    { items: [["Carne", "WRAP DE CARNE"]], d: "Tapa de nalga, morrón, cebolla y muzzarella" },
    { items: [["De la Vieja", "WRAP DE LA VIEJA"]], d: "Pollo, queso azul, morrón y muzzarella" },
    { items: [["Vegetariano", "WRAP VEGETARIANO"]], d: "Acelga, morrón, zanahoria y muzzarella" },
    { items: [["Vegano", "WRAP VEGANO"]], d: "Zucchini, berenjena, zanahoria, morrón y cebolla" }
  ] },
  { fudo: "ENSALADAS", nota: "Sin TACC en sus ingredientes, salvo la Caesar", filas: [
    { items: [["La Serena", "ENSALADA LA SERENA 🌱"]], d: "Rúcula, calabaza, sardo, cajú y mostaza dulce", star: 1 },
    { items: [["Pollos Hermanos", "ENSALADA POLLOS HERMANOS"]], d: "Verdes, cherry, rabanito, hinojo y chicken grill" },
    { items: [["Vegetariana", "ENSALADA VEGETARIANA"]], d: "Verdes, calabaza, naranja, rabanitos y tomate" },
    { items: [["Caesar", "ENSALADA CAESAR"], ["con pollo", "ENSALADA CAESAR CON POLLO"]] },
    { items: [["Mixta", "ENSALADA MIXTA"]], d: "Lechuga, tomate y cebolla" }
  ] },
  { fudo: "MENU INFANTIL", nota: "Con Cepita de 200 ml", filas: [
    { items: [["Cheeseburger kids", "CHEESEBURGER KIDS"]], d: "Con papas fritas" },
    { items: [["Nuggets kids", "NUGGETS KIDS"]], d: "6 nuggets con papas fritas" },
    { items: [["Fideos con tuco", "FIDEOS CON TUCO KIDS"]] }
  ] },
  { fudo: "CAFETERIA", filas: [
    { items: [["Café en pocillo", "CAFE EN POCILLO"]] },
    { items: [["Café en jarrito", "CAFE EN JARRITO"]] },
    { items: [["Café con leche", "CAFE CON LECHE"], ["Café doble", "CAFE DOBLE"]] },
    { items: [["Capuccino", "CAPUCCINO"]] },
    { items: [["Café especial", "CAFE ESPECIAL"]], d: "Con dulce de leche", star: 1 },
    { items: [["Café irlandés", "CAFE IRLANDES"]], d: "Con una medida de whiskey" },
    { items: [["Café helado", "VASO DE CAFE HELADO"]], d: "Con una bocha de helado" },
    { items: [["Mate cocido", "MATE COCIDO"]] },
    { items: [["Nesquik", "CHOCOLATADA NESQUIK"]], d: "En taza" },
    { items: [["Té", "TE"], ["Té con leche", "TE CON LECHE"]] },
    { items: [["Submarino", "SUBMARINO"]] },
    { items: [["Exprimido de naranja", "EXPRIMIDO DE NARANJA"]] },
    { t: "Licuado", items: [["banana", "LICUADO DE BANANA"], ["frutilla", "LICUADO DE FRUTILLA"]], lista: 1 },
    { t: "Licuado especial", items: [["frutilla y naranja", "LICUADO DE FRUTILLA CON JUGO DE NARANJA"], ["maracuyá y naranja", "LICUADO DE MARACUYA Y NARANJA"], ["frutos rojos", "LICUADO DE FRUTOS ROJOS"]], lista: 1 },
    { items: [["Agua caliente pal mate", "AGUA CALIENTE PAL MATE"]] },
    { items: [["Yerba Primicia", "YERBA PRIMICIA"]], d: "El paquete. Si la comprás, el agua caliente va de regalo" }
  ] },
  { fudo: "COSAS SALADAS", filas: [
    { items: [["Medialuna", "MEDIALUNA"], ["con jamón y queso", "MEDIALUNA CON JAMON Y QUESO"]] },
    { items: [["Tostaditas", "TOSTADITAS"]], d: "Mermelada casera y queso crema" },
    { items: [["Huevos revueltos", "HUEVOS REVUELTOS"]], d: "Con tostadas y queso crema" },
    { items: [["Avocado toast", "AVOCADO TOAST"]], d: "Huevos revueltos, tostadas, queso crema y palta", star: 1 },
    { sub: "Tostados: elegí pan ciabattiggia XL o pan árabe" },
    { t: "Tostado de queso y tomate", items: [["", "TOSTADO XL DE QUESO Y TOMATE"], ["", "TOSTADO ARABE DE QUESO Y TOMATE"]] },
    { t: "Tostado de jamón y queso", items: [["", "TOSTADO XL DE JAMON Y QUESO"], ["", "TOSTADO ARABE DE JAMON Y QUESO"]], foto: "TOSTADO ARABE DE JAMON Y QUESO" },
    { t: "Tostado completo", items: [["", "TOSTADO XL DE JAMON, QUESO, TOMATE Y HUEVO"]], d: "Jamón, queso, tomate y huevo · solo en pan ciabattiggia XL" }
  ] },
  { fudo: "COSAS DULCES Y POSTRES", filas: [
    { items: [["Pastelito", "PASTELITOS"]], d: "Membrillo o batata" },
    { items: [["Budín del día", "BUDIN DEL DIA"]] },
    { items: [["Flan con dulce de leche", "FLAN CON DULCE DE LECHE"]], star: 1 },
    { items: [["Chocotorta", "COCHOTORTA"], ["media", "MEDIA CHOCOTORTA"]], d: "La de la casa, para compartir", star: 1 },
    { items: [["Panqueques de dulce de leche", "PANQUEQUES DE DULCE DE LECHE"]] },
    { items: [["Apple crumble", "APPLE CRUMBLE"], ["con helado", "APPLE CRUMBLE CON HELADO"]] },
    { items: [["Brownie", "BROWNIE"], ["con helado", "BROWNIE CON HELADO"]] },
    { items: [["Bocha de helado", "BOCHA DE HELADO"]], d: "Crema americana" }
  ] },
  { fudo: "BEBIDAS", filas: [
    { items: [["Jarra de limonada", "JARRA DE LIMONADA"]], d: "Con menta y jengibre", star: 1 },
    { items: [["Vaso de limonada", "VASO DE LIMONADA"]], d: "Con menta y jengibre" },
    { items: [["Vaso de naranjada", "VASO DE NARANJADA"]] },
    { items: [["Jungle juice", "JUNGLE JUICE"]], d: "Naranja, maracuyá, menta y almíbar" },
    { t: "Línea Coca-Cola · 600 ml", items: [["Coca-Cola", "COCA-COLA ORIGINAL 600ML"], ["Zero", "COCA-COLA ZERO 600ML"], ["Light", "COCA-COLA LIGHT 600ML"], ["Sprite", "SPRITE 600ML"], ["Sprite Zero", "SPRITE ZERO 600ML"], ["Fanta", "FANTA 600ML"]], lista: 1 },
    { t: "Aquarius · 600 ml", items: [["manzana", "AQUARIUS MANZANA 600ML"], ["uva verde", "AQUARIUS UVA VERDE 600ML"], ["pera", "AQUARIUS PERA 600ML"], ["pomelo", "AQUARIUS POMELO 600ML"], ["pomelo rosado", "AQUARIUS POMELO ROSADO 600ML"]], lista: 1 },
    { t: "Powerade · 500 ml", items: [["manzana", "POWERADE MANZANA 500ML"], ["cool citrus", "POWERADE COOL CITRUS 500ML"]], lista: 1 },
    { items: [["7UP Free", "7UP FREE BOTELLA 500ML"]], d: "500 ml" },
    { items: [["Levité", "AGUA SABORIZADA LEVITE 500ML"]], d: "Manzana · 500 ml" },
    { items: [["Tónica Cunnington", "CUNNINGTON TONICA 500ML"]], d: "500 ml" },
    { items: [["Agua sin gas", "AGUA SIN GAS"]] },
    { t: "Smartwater · 591 ml", items: [["sin gas", "AGUA SMARTWATER S/ GAS 591ML"], ["con gas", "AGUA SMARTWATER C/ GAS 591ML"]], lista: 1 },
    { items: [["Soda en sifón", "SODA EN SIFON"]] }
  ] },
  { fudo: "CERVEZA", filas: [
    { sub: "De litro" },
    { items: [["Heineken", "CERVEZA HEINEKEN DE LITRO"]] },
    { items: [["Grolsch", "CERVEZA GROLSCH DE LITRO"], ["Miller", "CERVEZA MILLER DE LITRO"], ["Imperial Golden", "CERVEZA IMPERIAL GOLDEN DE LITRO"], ["Imperial Lager", "CERVEZA IMPERIAL LAGER DE LITRO"]], sep: ", ", foto: "CERVEZA IMPERIAL LAGER DE LITRO" },
    { sub: "Latas de 473 ml" },
    { t: "Antares", items: [["Session IPA", "CERVEZA ANTARES SESSION IPA 473CC"], ["IPA lupulada", "CERVEZA ANTARES IPA LUPULADA 473CC"], ["Honey", "CERVEZA ANTARES HONEY 473CC"], ["XPA", "CERVEZA ANTARES XPA 473CC"]], lista: 1 },
    { items: [["Heineken", "CERVEZA HEINEKEN 473ML"], ["Grolsch", "CERVEZA GROLSCH 473ML"]] },
    { t: "Línea Imperial", items: [["Lager", "CERVEZA IMPERIAL LAGER 473ML"], ["Golden", "CERVEZA IMPERIAL GOLDEN 473ML"], ["Roja", "CERVEZA IMPERIAL ROJA 473ML"], ["IPA", "CERVEZA IMPERIAL IPA 473ML"], ["APA", "CERVEZA IMPERIAL APA 473ML"], ["Stout", "CERVEZA IMPERIAL STOUT 473ML"]], lista: 1 },
    { items: [["Miller", "CERVEZA MILLER 473ML"], ["Warsteiner", "CERVEZA WARSTEINER 473ML"]] }
  ] },
  { fudo: "TRAGOS", vermut: 1, filas: [
    { items: [["Fernet", "FERNET CON COCA"], ["Campari", "CAMPARI CON NARANJA"], ["Aperol", "APEROL SPRITZ"], ["gin tonic", "GIN TONIC"], ["Gancia", "GANCIA"]], sep: ", " },
    { items: [["Caipiroska", "CAIPIROSKA"], ["Caipirinha", "CAIPIRINHA"]] },
    { items: [["Daiquiri de frutilla", "DAIQUIRI DE FRUTILLA"], ["Negroni", "NEGRONI"], ["Jungle juice con vodka", "JUNGLE JUICE CON VODKA"]], sep: ", " },
    { items: [["Whiskey Johnnie Walker Red Label", "WHISKEY JOHNNIE WALKER RED LABEL"]], d: "Medida" }
  ], usa: ["VERMUT ROSSO CON SODA", "VERMUT BIANCO CON SODA"] },
  { fudo: "VINOS Y ESPUMANTES", soloFilas: 1, vinos: 1, filas: [
    { t: "Copa de vino tinto o blanco", items: [["", "COPA DE VINO TINTO"], ["", "COPA DE VINO BLANCO"]] },
    { items: [["Sidra 1888", "SIDRA 1888 473ML"]], d: "Lata de 473 ml" },
    { items: [["Descorche", "DESCORCHE"]], d: "¿Traés tu vino?" }
  ] }
];
