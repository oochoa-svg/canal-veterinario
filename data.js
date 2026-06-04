// ============================================================
// ARCHIVO DE CONTENIDO — Editá acá para actualizar el sitio
// ============================================================
//
// ┌──────────────────────────────────────────────────────────┐
// │  CÓMO ACTUALIZAR EL SITIO (no necesitás Cloud Shell)      │
// │                                                          │
// │  1. Editá este archivo (en GitHub.com, ícono lápiz)      │
// │  2. Abajo de todo: "Commit changes"                      │
// │  3. El sitio se publica SOLO en 1-2 minutos              │
// │     (lo hace GitHub Actions -> Firebase, automático)     │
// │                                                          │
// │  NUNCA edites .github/workflows/deploy.yml               │
// │  Ese archivo dispara el deploy y es sensible a los       │
// │  espacios. Si se rompe, el sitio deja de publicarse.     │
// └──────────────────────────────────────────────────────────┘
//
// ── AGREGAR UNA PRÓXIMA CHARLA EN VIVO ──────────────────────
//   Buscá el array PROXIMAS_CHARLAS y agregá un bloque:
//     {
//       titulo: "Nombre de la charla",
//       disertante: "Nombre Apellido",
//       fecha: "2026-07-15",            // YYYY-MM-DD (o "" si no querés mostrarla)
//       dia: "Lunes 15 de julio",       // texto libre
//       hora: "",
//       categoria: "pequeños-animales", // pequeños-animales | bovinos | equinos | no-convencionales
//     },
//
// ── PASAR UNA CHARLA YA DADA A "GRABACIONES" ────────────────
//   Borrala de PROXIMAS_CHARLAS y agregala en GRABACIONES con
//   un id nuevo (el próximo libre es el 151):
//     {
//       id: 143,
//       titulo: "Nombre de la charla",
//       disertante: "Nombre Apellido",
//       fecha: "",
//       categoria: "pequeños-animales",
//       subcategoria: "Neurología",      // opcional
//       descripcion: "",
//       imagen: "",
//       duracion: "",
//     },
//
// ── CAMBIAR DATOS GENERALES (WhatsApp, sponsor, etc.) ───────
//   Todo está acá abajo en SITE_CONFIG.
// ============================================================

const SITE_CONFIG = {
  nombre: "Canal Veterinario",
  subtitulo: "Capacitación veterinaria profesional",
  telegramLink: "https://t.me/CANALVETCURSOS",
  instagram: "https://instagram.com/canalveterinario",

  // ── WhatsApp para consultas (poné tu número con código de país, sin + ni espacios) ──
  whatsapp: "5491131761770",
  whatsappMensaje: "Hola! Quiero más información sobre las suscripciones del Canal Veterinario",

  // ── Formulario de inscripción (Google Forms) ──
  formulario: "https://docs.google.com/forms/d/e/1FAIpQLSdskfP8fwAPF4qaEzPiKmUcLxFOW3OGJj9jpbEEEoGMqHl-Mw/viewform",

  // ── Cada cuántos segundos reaparece el cartel de suscripción (0 = desactivado) ──
  popupCadaSegundos: 200,

  // ── Sponsor (banner fijo) ──
  sponsorNombre: "Laboratorio Buenos Aires — LBsAs",
  sponsorSlogan: "Diagnóstico Veterinario",
  sponsorTel: "011 4573-3731",
  sponsorWA: "5491159540359",
  sponsorDir: "Av. De los Constituyentes 4884, CABA",
  sponsorEmail: "laboratoriobuenosaires@hotmail.com",

  // ── Contacto para nuevos sponsors y colaboradores ──
  contactoSponsor: "5491131761770",
  contactoColaborador: "5491131761770",
};

// ============================================================
// PLANES DE SUSCRIPCIÓN — editá precios y links acá
// ============================================================

const PLANES = [
  {
    id: "basica",
    nombre: "Básica",
    destacado: false,
    precioARS: "5.300",
    precioUSD: "10",
    ideal: "Ideal para estudiantes y veterinarios recién recibidos",
    beneficios: [
      "Acceso a charlas del mes actual + anterior",
      "Charlas en vivo incluidas",
      "Comunidad en Telegram",
    ],
    linkMercadoPago: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848eba1011018ec4e6a7f40858",
    linkPayPal: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-32347768RK031242LMZN2W3A&utm_source=bio_libre&utm_medium=Referral&utm_campaign=general_link",
  },
  {
    id: "premium",
    nombre: "Premium",
    destacado: true,
    precioARS: "8.600",
    precioUSD: "15",
    ideal: "Ideal para actualización profesional continua",
    beneficios: [
      "Acceso a TODAS las charlas (130+)",
      "Todas las grabaciones del archivo histórico",
      "Charlas en vivo incluidas",
      "Comunidad en Telegram",
    ],
    linkMercadoPago: "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380849082b3f601909378c89f04f6",
    linkPayPal: "https://www.paypal.com/webapps/billing/plans/subscribe?plan_id=P-84P62261SM765833JM2HJN3Q&utm_source=bio_libre&utm_medium=Referral&utm_campaign=general_link",
  },
];

// ============================================================
// PRÓXIMAS CHARLAS EN VIVO
// ============================================================

const PROXIMAS_CHARLAS = [
  {
    titulo: "Hipotiroidismo — Parte 2",
    disertante: "Dra. Carolina Vecino",
    fecha: "2026-06-08",
    dia: "Lunes 8 de junio",
    hora: "",
    imagen: "",
    categoria: "pequeños-animales",
  },
  {
    titulo: "Gingivoestomatitis crónica felina y Calicivirus — Tratamientos Parte 2",
    disertante: "Dra. Natalia Luka",
    fecha: "2026-06-15",
    dia: "Lunes 15 de junio",
    hora: "",
    imagen: "img/natalia-luka.jpg",
    categoria: "pequeños-animales",
  },
  {
    titulo: "Histopatología veterinaria: el puente entre la clínica y el diagnóstico definitivo",
    disertante: "Matías Caverzan",
    fecha: "2026-06-17",
    dia: "Miércoles 17 de junio",
    hora: "",
    imagen: "",
    categoria: "pequeños-animales",
  },
  {
    titulo: "Biomecánica aplicada a las fases del paso en caballos. Parte 1",
    disertante: "Vet. José Adrián Iranzo",
    fecha: "2026-06-22",
    dia: "Lunes 22 de junio",
    hora: "",
    imagen: "",
    categoria: "equinos",
  },
  {
    titulo: "Técnica quirúrgica aséptica: Asepsia y antisepsia",
    disertante: "Vet. Georgina Soledad Castro",
    fecha: "2026-06-24",
    dia: "Miércoles 24 de junio",
    hora: "",
    imagen: "img/georgina-castro.jpg",
    categoria: "pequeños-animales",
  },
  {
    titulo: "Mastectomía: Errores más frecuentes y conceptos quirúrgicos de resolución",
    disertante: "Damián Barón",
    fecha: "2026-06-29",
    dia: "Lunes 29 de junio",
    hora: "",
    imagen: "img/damian-baron.jpg",
    categoria: "pequeños-animales",
  },
];

// ============================================================
// GRABACIONES DISPONIBLES — Charlas ya realizadas
// ============================================================

const GRABACIONES = [

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — NEUROLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 1,
    titulo: "El paciente neurológico en pequeños animales",
    disertante: "Esp. Vet. Matías D'Elia",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Neurología",
    descripcion: "",
    imagen: "img/matias-delia.jpg",
    duracion: "",
  },
  {
    id: 2,
    titulo: "Aproximación al paciente con crisis convulsivas. Parte 1",
    disertante: "Esp. Vet. Matías D'Elia",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Neurología",
    descripcion: "",
    imagen: "img/matias-delia.jpg",
    duracion: "",
  },
  {
    id: 3,
    titulo: "Aproximación al paciente con crisis convulsivas. Parte 2",
    disertante: "Esp. Vet. Matías D'Elia",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Neurología",
    descripcion: "",
    imagen: "img/matias-delia.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — OFTALMOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 4,
    titulo: "Anatomía clínica del ojo. Parte 1",
    disertante: "Santiago Parrinello",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/parrinello.png",
    duracion: "",
  },
  {
    id: 5,
    titulo: "Anatomía clínica del ojo. Parte 2",
    disertante: "Santiago Parrinello",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/parrinello.png",
    duracion: "",
  },
  {
    id: 6,
    titulo: "Consulta oftalmológica: ¿cómo la realizamos?",
    disertante: "Santiago Parrinello",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/parrinello.png",
    duracion: "",
  },
  {
    id: 7,
    titulo: "Ojo rojo como punto de partida de las enfermedades oftalmológicas",
    disertante: "Santiago Parrinello",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/parrinello.png",
    duracion: "",
  },
  {
    id: 8,
    titulo: "Manejo clínico de las úlceras de córnea. Parte 1",
    disertante: "Santiago Parrinello",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/parrinello.png",
    duracion: "",
  },
  {
    id: 9,
    titulo: "Manejo clínico inicial de las úlceras de córnea. Parte 2",
    disertante: "Santiago Parrinello",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/parrinello.png",
    duracion: "",
  },
  {
    id: 10,
    titulo: "Importancia de la intervención del globo ocular y sus efectos",
    disertante: "Santiago Parrinello",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/parrinello.png",
    duracion: "",
  },
  {
    id: 11,
    titulo: "Neurooftalmología para la clínica diaria. Parte 1",
    disertante: "Santiago Parrinello",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/parrinello.png",
    duracion: "",
  },
  {
    id: 12,
    titulo: "Enfermedades de la retina",
    disertante: "Vet. Fabio Arturo Moreno",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/fabian-moreno.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — ENFERMEDADES INFECCIOSAS
  // ──────────────────────────────────────────────
  {
    id: 13,
    titulo: "Esporotricosis zoonótica. Parte 1",
    disertante: "Dr. Alejandro Etchecopaz",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Enfermedades infecciosas",
    descripcion: "",
    imagen: "img/alejandro-etchecopaz.jpg",
    duracion: "",
  },
  {
    id: 14,
    titulo: "Esporotricosis zoonótica. Parte 2",
    disertante: "Dr. Alejandro Etchecopaz",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Enfermedades infecciosas",
    descripcion: "",
    imagen: "img/alejandro-etchecopaz.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — CLÍNICA GENERAL / EMERGENCIAS
  // ──────────────────────────────────────────────
  {
    id: 15,
    titulo: "Uroabdomen: ¿sabemos cómo tratar esta urgencia?",
    disertante: "Vet. Juan Pablo Reina",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Clínica general / Emergencias",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 16,
    titulo: "Emergencias: diagnóstico, tratamiento y urgencias",
    disertante: "Vet. Fabio Arturo Moreno",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Clínica general / Emergencias",
    descripcion: "",
    imagen: "img/fabian-moreno.png",
    duracion: "",
  },
  {
    id: 17,
    titulo: "Emergencias: manejando al paciente felino crítico. Parte 2",
    disertante: "Vet. Fabio Arturo Moreno",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Clínica general / Emergencias",
    descripcion: "",
    imagen: "img/fabian-moreno.png",
    duracion: "",
  },
  {
    id: 18,
    titulo: "Manejo del paciente felino crítico",
    disertante: "Vet. Celeste Maistruarena",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Clínica general / Emergencias",
    descripcion: "",
    imagen: "img/celeste-maistruarena.jpg",
    duracion: "",
  },
  {
    id: 19,
    titulo: "Ictericia en gatos",
    disertante: "Vet. Brenda Viñas",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Clínica general / Emergencias",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — LABORATORIO / DIAGNÓSTICO
  // ──────────────────────────────────────────────
  {
    id: 20,
    titulo: "Interpretación de los exámenes hepáticos",
    disertante: "MV. Carlos A. Fernández",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Laboratorio / Diagnóstico",
    descripcion: "",
    imagen: "img/carlos-fernandez.png",
    duracion: "",
  },
  {
    id: 21,
    titulo: "Pruebas de laboratorio para el diagnóstico de enfermedades renales. Parte 1",
    disertante: "MV. Carlos A. Fernández",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Laboratorio / Diagnóstico",
    descripcion: "",
    imagen: "img/carlos-fernandez.png",
    duracion: "",
  },
  {
    id: 22,
    titulo: "Pruebas de laboratorio para el diagnóstico de enfermedades renales. Parte 2",
    disertante: "MV. Carlos A. Fernández",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Laboratorio / Diagnóstico",
    descripcion: "",
    imagen: "img/carlos-fernandez.png",
    duracion: "",
  },
  {
    id: 23,
    titulo: "Manejo del hemograma y sus aplicaciones prácticas",
    disertante: "MV. Carlos A. Fernández",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Laboratorio / Diagnóstico",
    descripcion: "",
    imagen: "img/carlos-fernandez.png",
    duracion: "",
  },
  {
    id: 24,
    titulo: "Cómo y cuándo solicitar exámenes complementarios y sus condiciones prácticas",
    disertante: "MV. Carlos A. Fernández",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Laboratorio / Diagnóstico",
    descripcion: "",
    imagen: "img/carlos-fernandez.png",
    duracion: "",
  },
  {
    id: 25,
    titulo: "Análisis de orina: fundamentos y aplicaciones",
    disertante: "MV. Soledad Varela",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Laboratorio / Diagnóstico",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 26,
    titulo: "Manejo de afecciones",
    disertante: "Vet. Celeste Maistruarena",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Laboratorio / Diagnóstico",
    descripcion: "",
    imagen: "img/celeste-maistruarena.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — CARDIOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 27,
    titulo: "Cardiología: diagnóstico por imagen",
    disertante: "Vet. Nicolás Porta",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Cardiología",
    descripcion: "",
    imagen: "img/nicolas-porta.png",
    duracion: "",
  },
  {
    id: 28,
    titulo: "La Rutina Cardiológica: cómo ordenar el estudio del corazón en consulta diaria",
    disertante: "Vet. Nicolás Porta",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Cardiología",
    descripcion: "",
    imagen: "img/nicolas-porta.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — URINARIO / NEFROLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 29,
    titulo: "Enfermedad del tracto urinario inferior del gato. Parte 1",
    disertante: "Esp. MV. Viviana H. Ruidiaz",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Urinario / Nefrología",
    descripcion: "",
    imagen: "img/viviana-ruidiaz.jpg",
    duracion: "",
  },
  {
    id: 30,
    titulo: "Enfermedad del tracto urinario inferior del gato. Parte 2",
    disertante: "Esp. MV. Viviana H. Ruidiaz",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Urinario / Nefrología",
    descripcion: "",
    imagen: "img/viviana-ruidiaz.jpg",
    duracion: "",
  },
  {
    id: 31,
    titulo: "La falla renal aguda en el pequeño felino",
    disertante: "Esp. MV. Viviana H. Ruidiaz",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Urinario / Nefrología",
    descripcion: "",
    imagen: "img/viviana-ruidiaz.jpg",
    duracion: "",
  },
  {
    id: 32,
    titulo: "Enfermedad renal crónica con estadificación",
    disertante: "Vet. Celeste Maistruarena",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Urinario / Nefrología",
    descripcion: "",
    imagen: "img/celeste-maistruarena.jpg",
    duracion: "",
  },
  {
    id: 33,
    titulo: "Enfermedad renal del felino",
    disertante: "Vet. Fabio Arturo Moreno",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Urinario / Nefrología",
    descripcion: "",
    imagen: "img/fabian-moreno.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — NUTRICIÓN CLÍNICA
  // ──────────────────────────────────────────────
  {
    id: 34,
    titulo: "Nutrición clínica: manejo de la alimentación",
    disertante: "Vet. Brenda Viñas",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Nutrición clínica",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 35,
    titulo: "Intervenciones nutricionales en la enfermedad renal crónica",
    disertante: "Vet. Brenda Viñas",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Nutrición clínica",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 36,
    titulo: "Nutrición en el paciente oncológico y la Carbonitrato Rehabilitación",
    disertante: "Vet. Brenda Viñas",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Nutrición clínica",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 37,
    titulo: "Manejo nutricional y alimentación para profesionales",
    disertante: "Vet. Brenda Viñas",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Nutrición clínica",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 38,
    titulo: "Nutrición y microbioma: rol en las hepatopatías",
    disertante: "Vet. Brenda Viñas",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Nutrición clínica",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 39,
    titulo: "Alimentación y suplementos para mascotas",
    disertante: "Vet. Brenda Viñas",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Nutrición clínica",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — FARMACOLOGÍA / ANESTESIA / ANALGESIA
  // ──────────────────────────────────────────────
  {
    id: 40,
    titulo: "Farmacología: protocolos anestésicos",
    disertante: "Mv. Esp. Eduarda Esjaita",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Farmacología / Anestesia / Analgesia",
    descripcion: "",
    imagen: "img/eduarda-esjaita.jpg",
    duracion: "",
  },
  {
    id: 41,
    titulo: "¿Cómo mejorar la calidad del sueño anestésico en animales?",
    disertante: "Mv. Esp. Eduarda Esjaita",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Farmacología / Anestesia / Analgesia",
    descripcion: "",
    imagen: "img/eduarda-esjaita.jpg",
    duracion: "",
  },
  {
    id: 42,
    titulo: "Manejo del paciente diabético. Parte 1",
    disertante: "Dra. Carolina Vecino",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Farmacología / Anestesia / Analgesia",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 43,
    titulo: "Manejo del paciente diabético. Parte 2",
    disertante: "Dra. Carolina Vecino",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Farmacología / Anestesia / Analgesia",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 44,
    titulo: "Antibióticos en pequeños y felinos: generalidades y clasificación. Parte 1",
    disertante: "Vet. Ximena Doxandabarat",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Farmacología / Anestesia / Analgesia",
    descripcion: "",
    imagen: "img/ximena-doxandabarat.jpg",
    duracion: "",
  },
  {
    id: 45,
    titulo: "Antibióticos en pequeños y felinos: generalidades y clasificación. Parte 2",
    disertante: "Vet. Ximena Doxandabarat",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Farmacología / Anestesia / Analgesia",
    descripcion: "",
    imagen: "img/ximena-doxandabarat.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — ORTOPEDIA / REHABILITACIÓN
  // ──────────────────────────────────────────────
  {
    id: 46,
    titulo: "Rehabilitación en pequeños animales",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Ortopedia / Rehabilitación",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },
  {
    id: 47,
    titulo: "Rehabilitación de ligamento cruzado en perros. Parte 1",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Ortopedia / Rehabilitación",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },
  {
    id: 48,
    titulo: "Rehabilitación de ligamento cruzado en perros. Parte 2",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Ortopedia / Rehabilitación",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },
  {
    id: 49,
    titulo: "Uso de ortesis. Parte 1",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Ortopedia / Rehabilitación",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },
  {
    id: 50,
    titulo: "Carritos ortopédicos",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Ortopedia / Rehabilitación",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },
  {
    id: 51,
    titulo: "Lesiones en rodilla: ruptura de ligamento cruzado y luxación patelar",
    disertante: "Dr. Jonatan Bolaños",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Ortopedia / Rehabilitación",
    descripcion: "",
    imagen: "img/jonathan-bolanos.jpg",
    duracion: "",
  },
  {
    id: 52,
    titulo: "Displasia de codo",
    disertante: "Dr. Jonatan Bolaños",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Ortopedia / Rehabilitación",
    descripcion: "",
    imagen: "img/jonathan-bolanos.jpg",
    duracion: "",
  },
  {
    id: 53,
    titulo: "Caninos ortopédicos",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Ortopedia / Rehabilitación",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — ENDOCRINOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 54,
    titulo: "Cetoacidosis diabética",
    disertante: "Dra. Carolina Vecino",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Endocrinología",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 55,
    titulo: "Enfermedad de Addison",
    disertante: "Dra. Carolina Vecino",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Endocrinología",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — ONCOLOGÍA / DERMATOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 56,
    titulo: "Mastocitoma canino",
    disertante: "Vet. Matías Caverzan",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oncología / Dermatología",
    descripcion: "",
    imagen: "img/matias-caverzan.jpg",
    duracion: "",
  },
  {
    id: 57,
    titulo: "Carcinoma de células escamosas: desde la histopatología a la clínica",
    disertante: "Vet. Matías Caverzan",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Oncología / Dermatología",
    descripcion: "",
    imagen: "img/matias-caverzan.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — IMAGENOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 58,
    titulo: "Topografía de la cavidad abdominal para ultrasonografía",
    disertante: "Esp. Vet. Sabrina E. Vega",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Imagenología",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 59,
    titulo: "Ecografía como método diagnóstico en pacientes con vómito y diarrea. Parte 1",
    disertante: "Esp. Vet. Sabrina E. Vega",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Imagenología",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 60,
    titulo: "Ecografía como método diagnóstico en pacientes con vómito y diarrea. Parte 2",
    disertante: "Esp. Vet. Sabrina E. Vega",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Imagenología",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 61,
    titulo: "Ultrasonografía diagnóstica en felinos con clínica",
    disertante: "Esp. Vet. Sabrina E. Vega",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Imagenología",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 62,
    titulo: "Neurodiagnóstico por resonancia magnética",
    disertante: "Ramiro Vidal y Piero Lovecchio",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Imagenología",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — CIRUGÍA
  // ──────────────────────────────────────────────
  {
    id: 63,
    titulo: "Aproximación a la cirugía reconstructiva",
    disertante: "Vet. Leonardo Madriaga",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Cirugía",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 64,
    titulo: "Colgajos de patrón axial de tronco y extremidades",
    disertante: "Vet. Leonardo Madriaga",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Cirugía",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // PEQUEÑOS ANIMALES — INFECTOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 65,
    titulo: "Claves para comprender el ViLeF",
    disertante: "Vet. Ximena Doxandabarat",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Infectología",
    descripcion: "",
    imagen: "img/ximena-doxandabarat.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // EQUINOS — ANATOMÍA / BIOMECÁNICA / APARATO LOCOMOTOR
  // ──────────────────────────────────────────────
  {
    id: 66,
    titulo: "Repaso anatómico de las estructuras músculo-tendinosas más importantes en equino",
    disertante: "Dr. Carlos Blanco",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anatomía / Biomecánica / Aparato locomotor",
    descripcion: "",
    imagen: "img/carlos-blanco.png",
    duracion: "",
  },
  {
    id: 67,
    titulo: "Aparato de sostén y fibroelástico del equino",
    disertante: "Dr. Carlos Blanco",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anatomía / Biomecánica / Aparato locomotor",
    descripcion: "",
    imagen: "img/carlos-blanco.png",
    duracion: "",
  },
  {
    id: 68,
    titulo: "Anatomía del aparato locomotor y neurovascular transrectal. Parte 1",
    disertante: "Vet. José Adrián Iranzo",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anatomía / Biomecánica / Aparato locomotor",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 69,
    titulo: "Anatomía del aparato locomotor y neurovascular transrectal. Parte 2",
    disertante: "Vet. José Adrián Iranzo",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anatomía / Biomecánica / Aparato locomotor",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 70,
    titulo: "Anatomía y biomecánica del aparato locomotor en equinos. Parte 1",
    disertante: "Vet. Verónica Riveros",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anatomía / Biomecánica / Aparato locomotor",
    descripcion: "",
    imagen: "img/veronica-riveros.jpg",
    duracion: "",
  },
  {
    id: 71,
    titulo: "Anatomía y biomecánica del aparato locomotor en equinos. Parte 2",
    disertante: "Vet. Verónica Riveros",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anatomía / Biomecánica / Aparato locomotor",
    descripcion: "",
    imagen: "img/veronica-riveros.jpg",
    duracion: "",
  },
  {
    id: 72,
    titulo: "Región cervical del equino: anatomía, biomecánica, síndrome cérvico-torácico braquial y complejo de malformación cervical equina. Parte 1",
    disertante: "Vet. José Adrián Iranzo",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anatomía / Biomecánica / Aparato locomotor",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 73,
    titulo: "Región cervical del equino: anatomía, biomecánica, síndrome cérvico-torácico braquial y complejo de malformación cervical equina. Parte 2",
    disertante: "Vet. José Adrián Iranzo",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anatomía / Biomecánica / Aparato locomotor",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // EQUINOS — DIAGNÓSTICO POR IMÁGENES
  // ──────────────────────────────────────────────
  {
    id: 74,
    titulo: "Diagnóstico ecográfico de las patologías del pie equino. Parte 1",
    disertante: "Vet. Valeria Arpon",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Diagnóstico por imágenes",
    descripcion: "",
    imagen: "img/valeria-arpon.jpg",
    duracion: "",
  },
  {
    id: 75,
    titulo: "Diagnóstico ecográfico de las patologías del pie equino. Parte 2",
    disertante: "Vet. Valeria Arpon",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Diagnóstico por imágenes",
    descripcion: "",
    imagen: "img/valeria-arpon.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // EQUINOS — ANESTESIA / SEDACIÓN / FARMACOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 76,
    titulo: "Fármacos para sedación, analgesia y anestesia en equinos. Parte 1",
    disertante: "Med. Vet. Rocío Paola Álvarez",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anestesia / Sedación / Farmacología",
    descripcion: "",
    imagen: "img/rocio-alvarez.png",
    duracion: "",
  },
  {
    id: 77,
    titulo: "Fármacos para sedación, analgesia y anestesia en equinos. Parte 2",
    disertante: "Med. Vet. Rocío Paola Álvarez",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anestesia / Sedación / Farmacología",
    descripcion: "",
    imagen: "img/rocio-alvarez.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // EQUINOS — REHABILITACIÓN / DEPORTE / TERAPIAS
  // ──────────────────────────────────────────────
  {
    id: 78,
    titulo: "Introducción a las corrientes eléctricas en equinos. Parte 1",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Rehabilitación / Deporte / Terapias",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },
  {
    id: 79,
    titulo: "Introducción a las corrientes eléctricas en equinos. Parte 2",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Rehabilitación / Deporte / Terapias",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },
  {
    id: 80,
    titulo: "Fisioterapia en el equino deportivo. Parte 1",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Rehabilitación / Deporte / Terapias",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },
  {
    id: 81,
    titulo: "Iluminando las claudicaciones oscuras. Parte 1",
    disertante: "Vet. José Adrián Iranzo",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Rehabilitación / Deporte / Terapias",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 82,
    titulo: "Iluminando las claudicaciones oscuras. Parte 2",
    disertante: "Vet. José Adrián Iranzo",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Rehabilitación / Deporte / Terapias",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // EQUINOS — TERAPIAS COMPLEMENTARIAS
  // ──────────────────────────────────────────────
  {
    id: 83,
    titulo: "Introducción a las terapias complementarias afines al equino",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Terapias complementarias",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },
  {
    id: 84,
    titulo: "Terapias complementarias en equinos. Parte 2",
    disertante: "Vet. Florencia de Priede",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Terapias complementarias",
    descripcion: "",
    imagen: "img/florencia-de-priede.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // EQUINOS — VÍAS AÉREAS / ENDOSCOPÍA / LARINGE
  // ──────────────────────────────────────────────
  {
    id: 85,
    titulo: "Endoscopia como herramienta diagnóstica en equinos con diferentes problemas en las vías aéreas",
    disertante: "Mv. Esp. Ramón Andrés López",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Vías aéreas / Endoscopía / Laringe",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 86,
    titulo: "Resolución diagnóstica por endoscopía de vías aéreas",
    disertante: "Mv. Esp. Ramón Andrés López",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Vías aéreas / Endoscopía / Laringe",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 87,
    titulo: "Endoscopía de las vías aéreas superiores en equinos",
    disertante: "Vet. Fabio Arturo Moreno",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Vías aéreas / Endoscopía / Laringe",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 88,
    titulo: "Endoscopía Gástrica en equinos",
    disertante: "Vet. Fabio Arturo Moreno",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Vías aéreas / Endoscopía / Laringe",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // EQUINOS — REPRODUCCIÓN
  // ──────────────────────────────────────────────
  {
    id: 89,
    titulo: "Manejo reproductivo de la yegua",
    disertante: "Mv. Esp. Juan Manuel Oliden",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Reproducción",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // EQUINOS — OFTALMOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 90,
    titulo: "Déficit visual en equino",
    disertante: "Dr. Gustavo Zapata",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Oftalmología",
    descripcion: "",
    imagen: "img/gustavo-zapata.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // EQUINOS — ODONTOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 91,
    titulo: "Conceptos básicos de odontología en equinos",
    disertante: "MV. Miguel A. Mathius",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Odontología",
    descripcion: "",
    imagen: "img/miguel.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // BOVINOS — CLÍNICA / EMERGENCIAS / MANEJO SANITARIO
  // ──────────────────────────────────────────────
  {
    id: 92,
    titulo: "Diagnóstico y tratamiento de diarreas en terneros",
    disertante: "MV. Juan Duque",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Clínica / Emergencias / Manejo sanitario",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 94,
    titulo: "Principios generales en enfermedades en bovinos",
    disertante: "MV. Juan Duque",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Clínica / Emergencias / Manejo sanitario",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 95,
    titulo: "Enfermedades infecciosas de la hacienda bovina",
    disertante: "MV. Juan Duque",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Clínica / Emergencias / Manejo sanitario",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // BOVINOS — REPRODUCCIÓN / OBSTETRICIA
  // ──────────────────────────────────────────────
  {
    id: 96,
    titulo: "Atención del parto con patología",
    disertante: "Mv. Lucio Campora",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Reproducción / Obstetricia",
    descripcion: "",
    imagen: "img/lucio-campora.png",
    duracion: "",
  },
  {
    id: 98,
    titulo: "Manejo de la actividad en reproducción bovina",
    disertante: "Mv. Lucio Campora",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Reproducción / Obstetricia",
    descripcion: "",
    imagen: "img/lucio-campora.png",
    duracion: "",
  },
  {
    id: 100,
    titulo: "Enfermedades uterinas, manejo del endometrio y descarga vaginal",
    disertante: "Mv. Lucio Campora",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Reproducción / Obstetricia",
    descripcion: "",
    imagen: "img/lucio-campora.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // MAYO 2026
  // ──────────────────────────────────────────────
  {
    id: 101,
    titulo: "Gingivoestomatitis crónica felina y Calicivirus — Fisiopatología. Parte 1",
    disertante: "Dra. Natalia Luka",
    fecha: "2026-05-11",
    categoria: "pequeños-animales",
    subcategoria: "Medicina interna",
    descripcion: "Rol del Calicivirus en la gingivoestomatitis crónica felina: mecanismos inmunológicos y fisiopatología.",
    imagen: "img/natalia-luka.jpg",
    duracion: "",
  },
  {
    id: 102,
    titulo: "Hipotiroidismo canino — Parte 1",
    disertante: "Dra. Carolina Vecino",
    fecha: "2026-05-18",
    categoria: "pequeños-animales",
    subcategoria: "Endocrinología",
    descripcion: "Fisiopatología, presentación clínica y diagnóstico del hipotiroidismo canino.",
    imagen: "",
    duracion: "",
  },
  {
    id: 103,
    titulo: "Linfoma canino: puntos clave",
    disertante: "Dra. Fernanda Ferreira",
    fecha: "2026-05-20",
    categoria: "pequeños-animales",
    subcategoria: "Oncología",
    descripcion: "Clasificación, diagnóstico citológico/histológico, estadificación y opciones terapéuticas actuales.",
    imagen: "img/fernanda-ferreira.jpg",
    duracion: "",
  },
  {
    id: 104,
    titulo: "Principios del manejo transfusional en felinos",
    disertante: "Dra. Celeste Maistruarena",
    fecha: "2026-05-25",
    categoria: "pequeños-animales",
    subcategoria: "Medicina de urgencias",
    descripcion: "Indicaciones, grupos sanguíneos felinos, técnica de transfusión y monitoreo de complicaciones.",
    imagen: "img/celeste-maistruarena.jpg",
    duracion: "",
  },
  {
    id: 105,
    titulo: "Enfermedades metabólicas carenciales en bovinos — Región central",
    disertante: "Dr. Germán Cantón",
    fecha: "2026-05-26",
    categoria: "bovinos",
    subcategoria: "Nutrición y metabolismo",
    descripcion: "Diagnóstico y manejo de las principales carencias minerales y vitamínicas en rodeos de la región central de Argentina.",
    imagen: "img/german-canton.jpg",
    duracion: "",
  },
  {
    id: 106,
    titulo: "El ABC del virus en la diarrea viral bovina",
    disertante: "Dr. Darío Malacari",
    fecha: "2026-05-31",
    categoria: "bovinos",
    subcategoria: "Enfermedades infecciosas",
    descripcion: "Fundamentos virológicos de la DVB: agente, patogenia y estrategias de control.",
    imagen: "img/dario-malacari.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // BOVINOS — PRODUCCIÓN DEL RODEO
  // ──────────────────────────────────────────────
  {
    id: 107,
    titulo: "Sanidad y producción en el feedlot. Parte 1",
    disertante: "Med. Vet. Fernando Grippaldi",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 108,
    titulo: "Sanidad y producción en el feedlot. Parte 2",
    disertante: "Med. Vet. Fernando Grippaldi",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 109,
    titulo: "Sanidad y producción en el feedlot. Parte 3",
    disertante: "Med. Vet. Fernando Grippaldi",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 110,
    titulo: "Cesárea precoz",
    disertante: "Med. Vet. Fernando Grippaldi",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 111,
    titulo: "Manejo en la ganadería. Parte 1",
    disertante: "Mv. Lucio Campora",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "img/lucio-campora.png",
    duracion: "",
  },
  {
    id: 112,
    titulo: "Manejo en la ganadería. Parte 2",
    disertante: "Mv. Lucio Campora",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "img/lucio-campora.png",
    duracion: "",
  },
  {
    id: 113,
    titulo: "Corrección integral del rodeo de cría, tambero y ganadería",
    disertante: "Mv. Lucio Campora",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "img/lucio-campora.png",
    duracion: "",
  },
  {
    id: 114,
    titulo: "Manejo de la regulación del seguimiento comunal de la ganadería y plan maestro",
    disertante: "Mv. Lucio Campora",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "img/lucio-campora.png",
    duracion: "",
  },
  {
    id: 115,
    titulo: "Manejo táctico-dinámico. Parte 1",
    disertante: "Med. Vet. Fernando Grippaldi",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 116,
    titulo: "Corrección integral en rodeo de cría. Parte 2",
    disertante: "MV. Juan Duque",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Producción del rodeo",
    descripcion: "",
    imagen: "",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // BOVINOS — METABOLISMO / NUTRICIÓN / FISIOPATOLOGÍA
  // ──────────────────────────────────────────────
  {
    id: 117,
    titulo: "Fisiopatología de la vaca en el período periparto",
    disertante: "Mv. Lucio Campora",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Metabolismo / Nutrición / Fisiopatología",
    descripcion: "",
    imagen: "img/lucio-campora.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // NO CONVENCIONALES — GENERALIDADES
  // ──────────────────────────────────────────────
  {
    id: 118,
    titulo: "Ser veterinario de especies no tradicionales en una clínica privada",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Generalidades",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },
  {
    id: 119,
    titulo: "Laboratorio en la clínica de exóticos",
    disertante: "Juan Carlos Troiano",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Generalidades",
    descripcion: "",
    imagen: "img/juan-carlos-troiano.png",
    duracion: "",
  },
  {
    id: 120,
    titulo: "Toma de muestras sanguíneas en animales no tradicionales",
    disertante: "Juan Carlos Troiano",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Generalidades",
    descripcion: "",
    imagen: "img/juan-carlos-troiano.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // NO CONVENCIONALES — PEQUEÑOS MAMÍFEROS
  // ──────────────────────────────────────────────
  {
    id: 121,
    titulo: "Medicina en conejillos de oveja",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Pequeños mamíferos",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },
  {
    id: 122,
    titulo: "Aproximación a la medicina en peludismo",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Pequeños mamíferos",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },
  {
    id: 123,
    titulo: "Medicina en erizo pigmeo africano",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Pequeños mamíferos",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },
  {
    id: 124,
    titulo: "Patologías dentales en conejos y roedores",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Pequeños mamíferos",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },
  {
    id: 125,
    titulo: "Medicina en erizo pigmeo africano. Parte 2",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Pequeños mamíferos",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },
  {
    id: 126,
    titulo: "Patologías frecuentes en la clínica de hurones domésticos",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Pequeños mamíferos",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // NO CONVENCIONALES — REPTILES
  // ──────────────────────────────────────────────
  {
    id: 127,
    titulo: "Medicina en erizo, Anestesia y cirugía",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Reptiles",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },
  {
    id: 128,
    titulo: "Casos quirúrgicos en reptiles. Parte 1",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Reptiles",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },
  {
    id: 129,
    titulo: "Principios de anestesia y cirugía en serpientes y lagartos. Parte 3",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Reptiles",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // NO CONVENCIONALES — AVES
  // ──────────────────────────────────────────────
  {
    id: 130,
    titulo: "Actualización en psitácidos",
    disertante: "MV. Nicolás Cohen",
    fecha: "",
    categoria: "no-convencionales",
    subcategoria: "Aves",
    descripcion: "",
    imagen: "img/nicolas-cohen.png",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // ABRIL 2026
  // ──────────────────────────────────────────────
  {
    id: 131,
    titulo: "Ingreso inteligente al Feedlot: manejo sanitario y adaptación — Parte 2",
    disertante: "Med. Vet. Fernando Grippaldi",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Nutrición y metabolismo",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 132,
    titulo: "Ultrasonografía de la región ventral del cuello: Ecografía normal — Parte 2",
    disertante: "Esp. Vet. Sabrina E. Vega",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Diagnóstico por imágenes",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 133,
    titulo: "Manejo del rodeo de cría: Charla desde la experiencia a campo",
    disertante: "Paula Lorena Sosa Kardel",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Reproducción",
    descripcion: "",
    imagen: "img/paula-sosa-kardel.jpg",
    duracion: "",
  },
  {
    id: 134,
    titulo: "Ultrasonografía de la región ventral del cuello: Ecografía patológica — Parte 3",
    disertante: "Esp. Vet. Sabrina E. Vega",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Diagnóstico por imágenes",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 135,
    titulo: "Parvovirus en caninos y felinos: interpretación y diagnóstico",
    disertante: "Darío Malacari",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Enfermedades infecciosas",
    descripcion: "",
    imagen: "img/dario-malacari.jpg",
    duracion: "",
  },
  {
    id: 136,
    titulo: "Displasia de codo: diagnóstico y abordaje clínico",
    disertante: "Jonathan Bolaños",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Cirugía / Traumatología",
    descripcion: "",
    imagen: "img/jonathan-bolanos.jpg",
    duracion: "",
  },
  {
    id: 137,
    titulo: "PIF: claves prácticas en diagnóstico y tratamiento para el veterinario clínico",
    disertante: "Gabriela Despuys",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Enfermedades infecciosas",
    descripcion: "",
    imagen: "img/gabriela-despuys.jpg",
    duracion: "",
  },

  // ──────────────────────────────────────────────
  // FEBRERO 2026
  // ──────────────────────────────────────────────
  {
    id: 143,
    titulo: "Ingreso inteligente al Feedlot: manejo sanitario y adaptación — Parte 1",
    disertante: "Med. Vet. Fernando Grippaldi",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Nutrición y metabolismo",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 144,
    titulo: "Ultrasonografía de la región ventral del cuello: Ecografía normal — Parte 1",
    disertante: "Esp. Vet. Sabrina E. Vega",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Diagnóstico por imágenes",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 145,
    titulo: "Manejo reproductivo de un rodeo lechero y seguimiento de la vaca desde el preparto, parto y liberación a servicio",
    disertante: "MV. Eugenio Sosa",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Reproducción / Obstetricia",
    descripcion: "",
    imagen: "img/eugenio-sosa.jpg",
    duracion: "",
  },
  {
    id: 146,
    titulo: "Atención de la ternera recién nacida y manejo en los primeros 60 días",
    disertante: "MV. Eugenio Sosa",
    fecha: "",
    categoria: "bovinos",
    subcategoria: "Clínica / Emergencias / Manejo sanitario",
    descripcion: "",
    imagen: "img/eugenio-sosa.jpg",
    duracion: "",
  },
  {
    id: 147,
    titulo: "Manejo multimodal de la fobia a estruendos en caninos",
    disertante: "Vet. Marina Snitcofsky",
    fecha: "",
    categoria: "pequeños-animales",
    subcategoria: "Comportamiento / Etología",
    descripcion: "",
    imagen: "img/marina-snitcofsky.jpg",
    duracion: "",
  },
  // ──────────────────────────────────────────────
  // EQUINOS — ENTRADAS ADICIONALES
  // ──────────────────────────────────────────────
  {
    id: 148,
    titulo: "Anatomía aplicada de la laringe, faringe y bolsas guturales en equino",
    disertante: "Dr. Carlos Blanco",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Vías aéreas / Endoscopía / Laringe",
    descripcion: "",
    imagen: "img/carlos-blanco.png",
    duracion: "",
  },
  {
    id: 149,
    titulo: "Síndrome Bursitis Luxación Tendino Calcáneo",
    disertante: "Vet. José Adrián Iranzo",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anatomía / Biomecánica / Aparato locomotor",
    descripcion: "",
    imagen: "",
    duracion: "",
  },
  {
    id: 150,
    titulo: "Sedación en pie para equinos: ¿qué sabemos y qué podemos usar?",
    disertante: "Med. Vet. Rocío Paola Álvarez",
    fecha: "",
    categoria: "equinos",
    subcategoria: "Anestesia / Sedación / Farmacología",
    descripcion: "",
    imagen: "img/rocio-alvarez.png",
    duracion: "",
  },

];

// ============================================================
// CATEGORÍAS PRINCIPALES
// ============================================================

const CATEGORIAS = [
  { id: "todas",              nombre: "Todas",                   icono: "🔬" },
  { id: "pequeños-animales",  nombre: "Pequeños animales",       icono: "🐾" },
  { id: "bovinos",            nombre: "Bovinos",                 icono: "🐄" },
  { id: "equinos",            nombre: "Equinos",                 icono: "🐴" },
  { id: "no-convencionales",  nombre: "No convencionales",       icono: "🦜" },
];

// ============================================================
// SUBCATEGORÍAS (referencia — usá estos nombres en el campo
// "subcategoria" de cada charla para que queden consistentes)
// ============================================================
//
// Pequeños animales:
//   Neurología · Oftalmología · Enfermedades infecciosas
//   Clínica general / Emergencias · Laboratorio / Diagnóstico
//   Cardiología · Urinario / Nefrología · Nutrición clínica
//   Farmacología / Anestesia / Analgesia · Ortopedia / Rehabilitación
//   Endocrinología · Oncología / Dermatología · Imagenología
//   Cirugía · Infectología · Medicina interna · Medicina de urgencias · Oncología
//
// Bovinos:
//   Clínica / Emergencias / Manejo sanitario · Reproducción / Obstetricia
//   Producción del rodeo · Metabolismo / Nutrición / Fisiopatología
//   Enfermedades infecciosas · Nutrición y metabolismo
//
// Equinos:
//   Anatomía / Biomecánica / Aparato locomotor · Diagnóstico por imágenes
//   Anestesia / Sedación / Farmacología · Rehabilitación / Deporte / Terapias
//   Terapias complementarias · Vías aéreas / Endoscopía / Laringe
//   Reproducción · Oftalmología · Odontología
//
// No convencionales:
//   Generalidades · Pequeños mamíferos · Reptiles · Aves

// ============================================================
// RESUMEN DE GRABACIONES POR CATEGORÍA
// ============================================================
// Pequeños animales:  73 grabaciones
// Equinos:            29 grabaciones
// Bovinos:            24 grabaciones
// No convencionales:  13 grabaciones
// TOTAL:              139 grabaciones
// ============================================================
