const LEVEL_META = {
  beginner: { number: 1, title: "Principiante", subtitle: "El jardín de las palabras", icon: "🌱", color: "#ff6b8b" },
  intermediate: { number: 2, title: "Intermedio", subtitle: "La biblioteca de aventuras", icon: "🚀", color: "#6c4ee8" },
  advanced: { number: 3, title: "Avanzado", subtitle: "El estudio de las grandes ideas", icon: "🏆", color: "#087f8c" },
};

const LANGUAGE_ASSET_BASE = "/worlds/language/official";

const LEVEL_IMAGES = {
  beginner: `${LANGUAGE_ASSET_BASE}/language-level-beginner.png`,
  intermediate: `${LANGUAGE_ASSET_BASE}/language-level-intermediate.png`,
  advanced: `${LANGUAGE_ASSET_BASE}/language-level-advanced.png`,
};

const UNIT_IMAGES = {
  beginner: [
    "language-vocales.png",
    "language-abecedario.png",
    "language-consonantes.png",
    "language-silabas.png",
    "language-palabras.png",
    "language-signos-basicos.png",
    "language-comunicacion.png",
  ],
  intermediate: [
    "language-articulos.png",
    "language-sustantivos.png",
    "language-verbos.png",
    "language-adjetivos.png",
    "language-pronombres.png",
    "language-gramatica.png",
    "language-separacion-silabica.png",
  ],
  advanced: [
    "language-ortografia.png",
    "language-acentuacion.png",
    "language-comprension-lectora.png",
    "language-tipos-textos.png",
    "language-parrafos.png",
    "language-narraciones.png",
    "language-ortografia-avanzada.png",
  ],
};

const topics = {
  beginner: [
    ["Vocales", "Escucha y reconoce a, e, i, o, u", "Las vocales pueden sonar solas y viven dentro de casi todas las palabras.", ["A|Avión|Empieza con a.", "E|Elefante|Empieza con e.", "I|Isla|Empieza con i.", "O-U|Oso y uva|Comienzan con vocal."], "Toca una vocal.", "E", ["M", "E", "P"]],
    ["Abecedario", "Descubre las letras y su orden", "El abecedario reúne las letras que usamos para leer, escribir y ordenar palabras.", ["A|Primera letra|A inicia el abecedario.", "Ñ|Letra especial|La ñ pertenece al español.", "M|Mayúscula|Se usa al iniciar nombres.", "m|Minúscula|Aparece dentro de muchas palabras."], "¿Cuántas letras tiene el abecedario español?", "27", ["26", "27", "28"]],
    ["Consonantes", "Combina sonidos para crear palabras", "Las consonantes se unen con vocales para formar sílabas claras y fáciles de leer.", ["M + A|MA|La m se une con a.", "P + E|PE|La p se une con e.", "S + O|SO|La s se une con o.", "L + U|LU|La l se une con u."], "Toca una consonante.", "M", ["A", "M", "E"]],
    ["Sílabas", "Da palmadas y separa palabras", "Una sílaba es cada golpe de voz que sentimos al pronunciar una palabra.", ["CA-SA|Dos sílabas|Casa tiene dos golpes.", "PE-LO-TA|Tres sílabas|Pelota tiene tres partes.", "SOL|Una sílaba|Sol se dice en un golpe.", "MA-RI-PO-SA|Cuatro sílabas|Mariposa tiene cuatro partes."], "Separa casa.", "ca-sa", ["cas-a", "ca-sa", "c-a-sa"]],
    ["Palabras", "Une letras y comunica ideas", "Las palabras tienen significado. Con ellas nombramos, contamos, pedimos y compartimos ideas.", ["S-O-L|SOL|Tres letras forman una palabra.", "CA + SA|CASA|Dos sílabas forman casa.", "ÁRBOL|Nombre|Nombra una planta.", "CORRER|Acción|Dice lo que alguien hace."], "Toca la palabra correcta.", "CASA", ["ASAC", "CASA", "SACA"]],
    ["Signos básicos", "Lee con pausas y emoción", "Los signos nos dicen cuándo pausar, preguntar, terminar una idea o mostrar emoción.", ["Hola.|Punto|Cierra una oración.", "Pan, leche y fruta.|Coma|Separa elementos.", "¿Cómo estás?|Pregunta|Abre y cierra una pregunta.", "¡Qué alegría!|Admiración|Expresa emoción."], "¿Qué signo cierra una pregunta?", "?", [".", "?", ","]],
    ["Comunicación", "Comprende emisor, mensaje y contexto", "La comunicación ocurre cuando alguien comparte un mensaje y otra persona lo recibe.", ["Emisor|Origen|Produce el mensaje.", "Receptor|Destino|Interpreta el mensaje.", "Canal|Medio|Transporta la información.", "Contexto|Situación|Ayuda a comprender."], "¿Quién recibe el mensaje?", "receptor", ["emisor", "receptor", "canal"]],
  ],
  intermediate: [
    ["Artículos", "Acompaña correctamente al sustantivo", "Los artículos acompañan al sustantivo y ayudan a indicar género y número.", ["el libro|Masculino singular|El acompaña a libro.", "la luna|Femenino singular|La acompaña a luna.", "los lápices|Plural|Los indica más de uno.", "unas flores|Indefinido|Unas acompaña a flores."], "Completa: ___ casa", "la", ["el", "la", "los"]],
    ["Sustantivos", "Nombra personas, animales, lugares y cosas", "Los sustantivos nombran personas, animales, lugares, objetos e ideas.", ["Ana|Persona|Es un nombre propio.", "perro|Animal|Es un sustantivo común.", "Guatemala|Lugar|Se escribe con mayúscula.", "amistad|Idea|Nombra algo que sentimos."], "Toca un sustantivo.", "escuela", ["corre", "escuela", "alegre"]],
    ["Verbos", "Reconoce acciones y estados", "Los verbos dicen qué hace, siente o es una persona, animal o cosa.", ["cantar|Acción|La niña puede cantar.", "somos|Estado|Nosotros somos amigos.", "jugó|Pasado|La acción ya ocurrió.", "leeremos|Futuro|La acción ocurrirá después."], "Toca un verbo.", "saltar", ["mesa", "saltar", "azul"]],
    ["Adjetivos", "Añade cualidades a los nombres", "Los adjetivos describen cómo es un sustantivo: color, tamaño, forma o estado.", ["flor roja|Color|Roja describe a flor.", "árbol alto|Tamaño|Alto describe al árbol.", "cuento divertido|Cualidad|Divertido describe al cuento.", "agua fría|Estado|Fría describe al agua."], "¿Qué palabra describe a gato?", "juguetón", ["corre", "juguetón", "parque"]],
    ["Pronombres", "Evita repeticiones al comunicar", "Los pronombres sustituyen nombres para que las oraciones no repitan la misma palabra.", ["Ana lee. Ella sonríe.|Ella|Sustituye a Ana.", "Luis y yo: nosotros|Nosotros|Incluye a quien habla.", "Tú escribes|Tú|Se refiere a quien escucha.", "Ellos juegan|Ellos|Sustituye a varios."], "Sustituye María por un pronombre.", "ella", ["él", "ella", "nosotros"]],
    ["Gramática básica", "Construye oraciones completas", "Una oración comunica una idea completa con sujeto y predicado.", ["El quetzal vuela.|Oración|Comunica una idea completa.", "El quetzal|Sujeto|Indica de quién hablamos.", "vuela alto|Predicado|Explica la acción.", "María y José leen.|Sujeto compuesto|Dos personas realizan la acción."], "En «La niña canta», ¿cuál es el sujeto?", "La niña", ["canta", "La niña", "niña canta"]],
    ["Separación silábica", "Reconoce golpes de voz", "Separar sílabas ayuda a leer, pronunciar y dividir palabras correctamente.", ["ven-ta-na|Tres sílabas|Cada parte tiene vocal.", "ciu-dad|Diptongo|Iu permanece unido.", "ma-íz|Hiato|Las vocales se separan.", "trans-por-te|Grupo consonántico|Se conserva la pronunciación."], "Separa ventana.", "ven-ta-na", ["ve-ntana", "ven-ta-na", "vent-an-a"]],
  ],
  advanced: [
    ["Ortografía", "Escribe palabras con claridad", "La ortografía ayuda a escribir palabras correctas para que otros comprendan nuestro mensaje.", ["biblioteca|B correcta|Se escribe con b.", "viaje|V y j|Cada sonido tiene su grafía.", "hacer|H inicial|La h no suena.", "queso|QU|Ante e usamos qu."], "¿Cuál está bien escrita?", "biblioteca", ["viblioteca", "biblioteca", "bivlioteca"]],
    ["Acentuación básica", "Encuentra la sílaba fuerte", "La acentuación marca qué sílaba suena más fuerte y cuándo usamos tilde.", ["canción|Aguda|Lleva tilde al terminar en n.", "árbol|Grave|Lleva tilde por su terminación.", "música|Esdrújula|Siempre lleva tilde.", "casa|Grave sin tilde|Termina en vocal."], "¿Cuál palabra lleva tilde?", "canción", ["casa", "canción", "libro"]],
    ["Comprensión intermedia", "Busca pistas dentro de un texto", "Comprender es encontrar personajes, lugar, orden, idea principal y detalles.", ["Título|Anticipación|Da una pista del tema.", "Primero-después|Secuencia|Ordena acontecimientos.", "Idea principal|Centro|Resume lo más importante.", "Detalle|Apoyo|Explica la idea."], "¿Qué expresa lo más importante de un texto?", "idea principal", ["un detalle", "idea principal", "la última palabra"]],
    ["Tipos de textos", "Reconoce para qué fue escrito", "Cada texto tiene un propósito: narrar, informar, explicar pasos, describir o convencer.", ["Cuento|Narrativo|Relata acontecimientos.", "Noticia|Informativo|Comunica hechos.", "Receta|Instructivo|Ordena pasos.", "Descripción|Descriptivo|Explica características."], "¿Qué tipo de texto indica pasos?", "instructivo", ["narrativo", "instructivo", "poético"]],
    ["Párrafos", "Organiza una idea y sus detalles", "Un párrafo reúne oraciones sobre una misma idea y termina con punto.", ["Oración temática|Inicio|Presenta la idea central.", "Detalles|Desarrollo|Amplían la información.", "Conectores|Unión|Relacionan oraciones.", "Punto final|Cierre|Termina el párrafo."], "¿Qué comparte un párrafo?", "una misma idea", ["una misma idea", "muchos temas sin relación", "solo preguntas"]],
    ["Narraciones", "Crea historias con inicio, nudo y desenlace", "Una narración cuenta hechos con personajes, lugar, tiempo y un conflicto.", ["Inicio|Presentación|Conocemos personajes y lugar.", "Nudo|Problema|Aparece un reto.", "Desenlace|Solución|Se resuelve el conflicto.", "Narrador|Voz|Cuenta lo sucedido."], "¿Dónde aparece el problema?", "nudo", ["inicio", "nudo", "título"]],
    ["Ortografía avanzada", "Revisa casos especiales", "La ortografía avanzada compara palabras parecidas y ayuda a revisar mejor los textos.", ["haber / a ver|Homófonos|Tienen funciones diferentes.", "porque / por qué|Uso|Pregunta y explicación cambian.", "gente|G suave|Se escribe con g.", "revisión|S y tilde|Se comprueba al editar."], "Completa: No fui ___ estaba enfermo.", "porque", ["por qué", "porque", "porqué"]],
  ],
};

const mechanics = ["word-builder", "sentence-puzzle", "syllable-wheel", "classification", "memory", "story-editor", "accent-lab"];
const gameTitles = ["Elige la tarjeta", "Ordena la idea", "Gira la sílaba", "Clasifica rápido", "Memoria visual", "Taller de frases", "Busca la pista"];
const distractors = ["Pista falsa", "Otra opción", "Intenta de nuevo"];

const makeUnit = (raw, level, index) => {
  const [title, subtitle, teaching, samples, question, answer, options] = raw;
  const examples = samples.map((sample) => {
    const [visual, exampleTitle, text] = sample.split("|");
    return { visual, title: exampleTitle, text };
  });
  const intro = [
    teaching,
    "Mira las pistas, toca las tarjetas y escucha a Lumi cuando necesites ayuda.",
    "El reto es corto: elegir, unir y comprobar sin memorizar bloques largos.",
  ];
  const practice = [
    { prompt: question, answer, options },
    { prompt: `Une la pista con ${title}.`, answer: examples[0].visual, options: [examples[0].visual, examples[1].visual, distractors[index % distractors.length]] },
    { prompt: "Toca el nombre de esta unidad.", answer: title, options: [title, examples[2].title, examples[3].title] },
  ];
  const game = examples.slice(0, 4).map((example, gameIndex) => ({
    prompt: `${["Toca", "Encuentra", "Elige", "Marca"][gameIndex]}: ${example.title}`,
    answer: example.visual,
    options: [example.visual, examples[(gameIndex + 1) % 4].visual, examples[(gameIndex + 2) % 4].visual],
  }));
  const quiz = [
    { question, answer, options },
    ...examples.slice(0, 4).map((example, quizIndex) => ({
      question: `Toca el ejemplo de «${example.title}».`,
      answer: example.visual,
      options: [example.visual, examples[(quizIndex + 1) % 4].visual, examples[(quizIndex + 2) % 4].visual],
    })),
  ];
  return {
    id: index + 1,
    level,
    slug: title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-"),
    title,
    subtitle,
    teaching,
    icon: LEVEL_META[level].icon,
    color: LEVEL_META[level].color,
    xp: 200,
    stars: 3,
    mechanic: mechanics[index % mechanics.length],
    gameTitle: gameTitles[index % gameTitles.length],
    intro,
    examples,
    practice,
    game,
    quiz,
    image: `${LANGUAGE_ASSET_BASE}/${UNIT_IMAGES[level][index]}`,
  };
};

export const languageLevels = Object.fromEntries(
  Object.entries(topics).map(([level, units]) => [
    level,
    { id: level, ...LEVEL_META[level], image: LEVEL_IMAGES[level], units: units.map((unit, index) => makeUnit(unit, level, index)) },
  ])
);

export const getLanguageLevel = (level) => languageLevels[level] || languageLevels.beginner;
export const getLanguageUnit = (level, id) => getLanguageLevel(level).units.find((unit) => unit.id === Number(id)) || getLanguageLevel(level).units[0];
