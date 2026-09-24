/* ============================================================
   CONTENIDO DEL JUEGO — Cuñape Monona
   Actualiza este archivo cada mes. No hace falta tocar
   trivia.html, admin.html ni index.html para nada de esto.
   ============================================================ */

// Cuántas preguntas se juegan por ronda (se eligen al azar de todo el banco)
const ROUND_SIZE = 10;

// Banco de preguntas — puedes agregar, quitar o editar las que quieras.
// "correct" es el TEXTO exacto de la respuesta correcta (debe coincidir
// con una de las strings en "options").
// Este banco tiene 20 preguntas "normales" (dato → pregunta) y las
// mismas 20 en versión "invertida" (definición → cuál es la palabra/dato),
// para que la ronda se sienta distinta aunque toque el mismo tema dos veces.
const TRIVIA_QUESTIONS = [
  // ---------- CULTURA GENERAL (normales) ----------
  { q: "¿Cómo se le dice cariñosamente a la gente de Santa Cruz de la Sierra?", options: ["Cambas", "Paceños", "Chapacos", "Vallunos"], correct: "Cambas" },
  { q: "¿Con qué ingrediente principal se prepara el cuñape?", options: ["Harina de trigo", "Almidón de yuca y queso", "Maíz molido", "Arroz"], correct: "Almidón de yuca y queso" },
  { q: "¿Cómo se llama la fiesta más grande y colorida de Santa Cruz, con comparsas y corsos?", options: ["Carnaval cruceño", "Alasitas", "Entrada del Gran Poder", "Fiesta de la Cruz"], correct: "Carnaval cruceño" },
  { q: "¿Qué instrumento es infaltable en las comparsas del carnaval cruceño?", options: ["Charango", "Tambor y bombo", "Zampoña", "Acordeón"], correct: "Tambor y bombo" },
  { q: "¿Cuál es la bebida tradicional de Santa Cruz?", options: ["Chicha camba", "Singani puro", "Api", "Mocochinchi"], correct: "Chicha camba" },
  { q: "¿Cómo se conoce popularmente a un cruceño muy identificado con sus costumbres?", options: ["Camba de pura cepa", "Kolla", "Guaraní", "Chaqueño"], correct: "Camba de pura cepa" },
  { q: "El cuñape es pariente cercano de un pan de queso muy conocido en Brasil, ¿cómo se llama?", options: ["Pão de queijo", "Broa", "Focaccia", "Baguette"], correct: "Pão de queijo" },
  { q: "¿De qué está hecho tradicionalmente el masaco cruceño?", options: ["Plátano o yuca majada con charque", "Arroz con pollo", "Papa con queso", "Maíz con carne"], correct: "Plátano o yuca majada con charque" },
  { q: "¿Cómo se llama el ritmo musical y baile más característico del oriente boliviano (Santa Cruz, Beni y Pando)?", options: ["Taquirari", "Cueca", "Morenada", "Tinku"], correct: "Taquirari" },
  { q: "¿Cuál es el traje típico de la mujer camba?", options: ["Tipoy", "Pollera", "Chuspa", "Poncho"], correct: "Tipoy" },

  // ---------- HISTORIA Y GEOGRAFÍA (normales) ----------
  { q: "¿Quién fundó Santa Cruz de la Sierra?", options: ["Ñuflo de Chávez", "Simón Bolívar", "Ignacio Warnes", "Cañoto"], correct: "Ñuflo de Chávez" },
  { q: "¿Cuántas provincias tiene el departamento de Santa Cruz?", options: ["15", "9", "12", "20"], correct: "15" },
  { q: "¿Qué municipio está en la carretera entre Santa Cruz y Montero?", options: ["Warnes", "Cotoca", "Portachuelo", "El Torno"], correct: "Warnes" },
  { q: "¿Quién fue \"Cañoto\"?", options: ["Un guerrillero y músico, compañero de Ignacio Warnes", "Un cacique guaraní", "El fundador de la ciudad", "Un gobernador colonial"], correct: "Un guerrillero y músico, compañero de Ignacio Warnes" },

  // ---------- JERGAS CAMBAS (normales: palabra → significado) ----------
  { q: "¿Qué significa \"pinchulear\"?", options: ["Arreglarse o vestirse con esmero", "Enojarse fuerte", "Comer rápido", "Caminar despacio"], correct: "Arreglarse o vestirse con esmero" },
  { q: "¿Qué es el \"tapeque\"?", options: ["La provisión de comida para un viaje", "Un tipo de baile", "Una herramienta de labranza", "Un juego infantil"], correct: "La provisión de comida para un viaje" },
  { q: "En los juegos infantiles, ¿qué significa pedir \"cómper\"?", options: ["Pedir una pausa momentánea", "Pedir la revancha", "Cambiar de equipo", "Terminar el juego"], correct: "Pedir una pausa momentánea" },
  { q: "¿Qué es el \"curucusí\"?", options: ["Un insecto que brilla de noche", "Un pájaro cantor", "Una fruta silvestre", "Un tipo de hormiga"], correct: "Un insecto que brilla de noche" },
  { q: "¿Cómo se le dice a un niño pequeño en el campo cruceño?", options: ["Velatacú", "Tibibi", "Jenecherú", "Pichiró"], correct: "Velatacú" },
  { q: "¿Qué significa que algo tenga sabor \"pichiró\"?", options: ["Áspero, como fruta verde sin madurar", "Muy dulce", "Salado en exceso", "Sin sabor"], correct: "Áspero, como fruta verde sin madurar" },

  // ---------- CULTURA GENERAL (invertidas: definición → palabra/dato) ----------
  { q: "¿A quién se le dice \"camba\"?", options: ["A la gente de Santa Cruz de la Sierra", "A la gente de La Paz", "A la gente de Cochabamba", "A la gente de Potosí"], correct: "A la gente de Santa Cruz de la Sierra" },
  { q: "¿Qué es el cuñape?", options: ["Un pan hecho con almidón de yuca y queso", "Un pan de harina de trigo", "Un dulce de maíz", "Una empanada de carne"], correct: "Un pan hecho con almidón de yuca y queso" },
  { q: "¿Qué es el Carnaval Cruceño?", options: ["La fiesta más grande y colorida de Santa Cruz, con comparsas y corsos", "Una feria agropecuaria", "Una procesión religiosa", "Un festival de música andina"], correct: "La fiesta más grande y colorida de Santa Cruz, con comparsas y corsos" },
  { q: "¿Para qué sirven el tambor y el bombo en las comparsas?", options: ["Marcan el ritmo del carnaval cruceño", "Anuncian la misa", "Acompañan peleas de gallos", "Se usan solo en funerales"], correct: "Marcan el ritmo del carnaval cruceño" },
  { q: "¿Qué es la chicha camba?", options: ["Una bebida refrescante y dulce, típica de Santa Cruz", "Un plato de yuca", "Un tejido artesanal", "Una danza típica"], correct: "Una bebida refrescante y dulce, típica de Santa Cruz" },
  { q: "¿Qué significa que a alguien le digan \"camba de pura cepa\"?", options: ["Que está muy identificado con las costumbres cruceñas", "Que nació fuera de Santa Cruz", "Que es extranjero", "Que no conoce las tradiciones"], correct: "Que está muy identificado con las costumbres cruceñas" },
  { q: "¿Qué es el pão de queijo brasileño?", options: ["El pariente cercano del cuñape", "Un tipo de empanada", "Un dulce navideño", "Una bebida fermentada"], correct: "El pariente cercano del cuñape" },
  { q: "¿Qué es el masaco?", options: ["Plátano o yuca majada con charque", "Arroz con pollo", "Papa con queso", "Maíz con carne"], correct: "Plátano o yuca majada con charque" },
  { q: "¿Qué es el taquirari?", options: ["El ritmo musical y baile más característico del oriente boliviano", "Un instrumento musical", "Una comida típica", "Un tejido tradicional"], correct: "El ritmo musical y baile más característico del oriente boliviano" },
  { q: "¿Qué es el tipoy?", options: ["El vestido tradicional de la mujer camba", "Un sombrero típico", "Una manta bordada", "Una pollera andina"], correct: "El vestido tradicional de la mujer camba" },

  // ---------- HISTORIA Y GEOGRAFÍA (invertidas) ----------
  { q: "¿Qué hizo Ñuflo de Chávez en 1561?", options: ["Fundó Santa Cruz de la Sierra", "Fundó La Paz", "Ganó la independencia", "Escribió la primera constitución"], correct: "Fundó Santa Cruz de la Sierra" },
  { q: "¿En cuántas provincias está dividido el departamento de Santa Cruz?", options: ["15", "9", "12", "20"], correct: "15" },
  { q: "¿Dónde queda el municipio de Warnes?", options: ["En la carretera entre Santa Cruz y Montero", "Camino a Vallegrande", "Cerca de la frontera con Brasil", "En la Chiquitania"], correct: "En la carretera entre Santa Cruz y Montero" },
  { q: "¿Quién fue un guerrillero y músico, compañero de Ignacio Warnes en la independencia?", options: ["Cañoto", "Ñuflo de Chávez", "Un cacique guaraní", "Un gobernador colonial"], correct: "Cañoto" },

  // ---------- JERGAS CAMBAS (invertidas: significado → palabra) ----------
  { q: "¿Cómo se dice \"arreglarse con esmero\" en jerga camba?", options: ["Pinchulear", "Curucusí", "Pichiró", "Velatacú"], correct: "Pinchulear" },
  { q: "¿Cómo le dicen a la provisión de comida para un viaje?", options: ["Tapeque", "Cómper", "Jenecherú", "Tibibi"], correct: "Tapeque" },
  { q: "En los juegos infantiles, ¿qué palabra se usa para pedir una pausa?", options: ["Cómper", "Tapeque", "Velatacú", "Curucusí"], correct: "Cómper" },
  { q: "¿Cómo se le dice al insecto que brilla de noche (tipo luciérnaga)?", options: ["Curucusí", "Pichiró", "Tibibi", "Jenecherú"], correct: "Curucusí" },
  { q: "¿Cómo le dicen a un niño pequeño en el campo cruceño?", options: ["Velatacú", "Pinchulear", "Tapeque", "Cómper"], correct: "Velatacú" },
  { q: "¿Cómo se dice cuando una fruta tiene sabor áspero por no madurar?", options: ["Pichiró", "Curucusí", "Velatacú", "Tibibi"], correct: "Pichiró" },
];

// ---------- Premios de la ruleta ----------
// 8 casillas. Puedes repetir el mismo premio varias veces para que
// tenga más probabilidad de salir. Cada premio tiene un ícono (emoji,
// fácil de cambiar) y un color propio.
const WHEEL_PRIZES = [
  { name: "Mini Abre Fácil", icon: "🥐", color: "#1E92D1" },
  { name: "Mini Abre Fácil", icon: "🥐", color: "#F8B001" },
  { name: "Taza Monona",     icon: "☕", color: "#6E240D" },
  { name: "Mini Abre Fácil", icon: "🥐", color: "#2288C2" },
  { name: "Mini Abre Fácil", icon: "🥐", color: "#F8AF37" },
  { name: "Cuñape Tradicional", icon: "🌟", color: "#166695" },
  { name: "Mini Abre Fácil", icon: "🥐", color: "#C98A0E" },
  { name: "Mini Abre Fácil", icon: "🥐", color: "#0B4A66" },
];

// ---------- Redes sociales ----------
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/profile.php?id=61556627785184",
  tiktok: "https://www.tiktok.com/@monona.tradicional.bo",
};
