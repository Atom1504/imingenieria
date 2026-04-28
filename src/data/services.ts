import construccion from "@/assets/service-construccion.jpg";
import concretera from "@/assets/service-concretera.jpg";
import bodegas from "@/assets/service-bodegas.jpg";
import silos from "@/assets/service-silos.jpg";
import rolado from "@/assets/service-rolado.jpg";
import tierra from "@/assets/service-tierra.jpg";
import corte from "@/assets/service-corte.jpg";
import alquiler from "@/assets/service-alquiler.jpg";
import llave from "@/assets/service-llave.jpg";

export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  image: string;
  bullets: string[];
  process: { step: string; detail: string }[];
  icon: "Building2" | "Layers" | "Warehouse" | "Cylinder" | "GitMerge" | "Mountain" | "Scissors" | "Truck" | "Handshake";
};

export const services: Service[] = [
  {
    slug: "construccion",
    title: "Construcción",
    short: "Obras civiles e industriales ejecutadas con rigor técnico, seguridad y plazos cumplidos.",
    long: "Diseñamos y construimos edificaciones industriales, comerciales y de infraestructura con un enfoque de calidad total. Nuestro equipo técnico colegiado garantiza el cumplimiento normativo, la seguridad operacional y la optimización de costos en cada etapa.",
    image: construccion,
    icon: "Building2",
    bullets: [
      "Equipo técnico colegiado y experimentado",
      "Cumplimiento estricto de cronograma y presupuesto",
      "Protocolos SSOMA en cada frente de trabajo",
      "Control de calidad documentado",
    ],
    process: [
      { step: "Planificación", detail: "Estudio técnico, presupuesto detallado y cronograma maestro." },
      { step: "Ejecución", detail: "Frente de obra con supervisión permanente y control diario." },
      { step: "Entrega", detail: "Pruebas, dossier técnico y acompañamiento post-entrega." },
    ],
  },
  {
    slug: "plantas-concreteras",
    title: "Plantas Concreteras",
    short: "Diseño, montaje y puesta en marcha de plantas dosificadoras de concreto.",
    long: "Implementamos plantas concreteras llave en mano, desde la obra civil de cimentación hasta la calibración del sistema dosificador. Soluciones para obras de gran escala con trazabilidad de mezcla y control de calidad continuo.",
    image: concretera,
    icon: "Layers",
    bullets: [
      "Dosificación precisa y trazable",
      "Reducción de mermas y desperdicios",
      "Montaje llave en mano",
      "Capacidades desde 30 hasta 120 m³/h",
    ],
    process: [
      { step: "Diseño", detail: "Layout optimizado según volumen y logística del cliente." },
      { step: "Montaje", detail: "Cimentación, estructura, silos y sistema de control." },
      { step: "Puesta en marcha", detail: "Calibración, capacitación y garantía operativa." },
    ],
  },
  {
    slug: "bodegas",
    title: "Bodegas Industriales",
    short: "Naves industriales y centros logísticos con estructura metálica de gran luz.",
    long: "Diseñamos y construimos bodegas industriales y centros de distribución con estructura metálica calculada para cargas reales, cubiertas termoacústicas y accesos optimizados para operación logística intensiva.",
    image: bodegas,
    icon: "Warehouse",
    bullets: [
      "Estructura calculada para cargas reales",
      "Cubiertas con aislamiento térmico",
      "Tiempos de montaje optimizados",
      "Muelles y patios de maniobra",
    ],
    process: [
      { step: "Ingeniería", detail: "Cálculo estructural y diseño de cubierta por requerimiento." },
      { step: "Fabricación", detail: "Prefabricación en taller para reducir tiempos en sitio." },
      { step: "Montaje", detail: "Izaje y armado con cuadrillas certificadas." },
    ],
  },
  {
    slug: "silos",
    title: "Silos Industriales",
    short: "Fabricación e instalación de silos metálicos para cemento, granos y minerales.",
    long: "Fabricamos silos verticales para almacenamiento de cemento, agregados, granos y minerales, con cálculo estructural certificado y recubrimientos anticorrosivos para condiciones industriales exigentes.",
    image: silos,
    icon: "Cylinder",
    bullets: [
      "Cálculo estructural certificado",
      "Recubrimientos anticorrosivos industriales",
      "Capacidades a la medida del proceso",
      "Sistemas de carga y descarga",
    ],
    process: [
      { step: "Diseño", detail: "Dimensionamiento según producto y caudal." },
      { step: "Fabricación", detail: "Rolado, soldadura y tratamiento superficial." },
      { step: "Instalación", detail: "Montaje en sitio y pruebas hidrostáticas." },
    ],
  },
  {
    slug: "rolado-lamina",
    title: "Rolado de Lámina",
    short: "Rolado en frío de láminas y placas para tanques, silos y estructuras curvas.",
    long: "Servicio especializado de rolado en frío de láminas en acero al carbono e inoxidable. Equipos de gran capacidad para producir piezas curvas con precisión dimensional para tanques, silos, ductos y estructuras industriales.",
    image: rolado,
    icon: "GitMerge",
    bullets: [
      "Equipos de gran capacidad",
      "Control dimensional preciso",
      "Acero al carbono e inoxidable",
      "Servicio por unidad o por lote",
    ],
    process: [
      { step: "Análisis", detail: "Verificación de espesor, radio y material." },
      { step: "Rolado", detail: "Conformado en frío con control dimensional." },
      { step: "Entrega", detail: "Inspección final y despacho." },
    ],
  },
  {
    slug: "movimiento-tierra",
    title: "Movimiento de Tierra",
    short: "Excavación, nivelación y compactación con maquinaria pesada propia.",
    long: "Ejecutamos obras de movimiento de tierras para proyectos civiles, mineros y de infraestructura: excavación masiva, nivelación, conformación de terrazas, vías de acceso y compactación con maquinaria propia y operadores certificados.",
    image: tierra,
    icon: "Mountain",
    bullets: [
      "Maquinaria pesada propia",
      "Operadores certificados",
      "Control topográfico continuo",
      "Reportes diarios de avance",
    ],
    process: [
      { step: "Topografía", detail: "Levantamiento y replanteo del terreno." },
      { step: "Excavación", detail: "Movimiento masivo con flota propia." },
      { step: "Compactación", detail: "Densidad de campo certificada." },
    ],
  },
  {
    slug: "corte-doblez-lamina",
    title: "Corte y Doblez de Lámina",
    short: "Corte láser/plasma y doblez CNC con precisión milimétrica.",
    long: "Servicio integral de corte láser, plasma y oxicorte, además de plegado CNC para piezas seriadas o únicas. Trabajamos con planos del cliente y entregamos piezas listas para montaje.",
    image: corte,
    icon: "Scissors",
    bullets: [
      "Corte láser, plasma y oxicorte",
      "Plegado CNC de alta precisión",
      "Espesores hasta 25 mm",
      "Producción serial o por proyecto",
    ],
    process: [
      { step: "Programación", detail: "Optimización de plantillas y nesting." },
      { step: "Producción", detail: "Corte y doblez con control de calidad." },
      { step: "Despacho", detail: "Marcado, embalaje y entrega." },
    ],
  },
  {
    slug: "alquiler-maquinaria",
    title: "Alquiler de Maquinaria",
    short: "Flota propia de maquinaria amarilla con operadores certificados.",
    long: "Disponemos de excavadoras, retroexcavadoras, cargadores, vibrocompactadores, volquetas y motoniveladoras para alquiler con o sin operador. Mantenimiento preventivo continuo y disponibilidad inmediata.",
    image: alquiler,
    icon: "Truck",
    bullets: [
      "Flota propia con mantenimiento preventivo",
      "Operadores certificados disponibles",
      "Modalidad por hora, día o proyecto",
      "Cobertura nacional",
    ],
    process: [
      { step: "Solicitud", detail: "Análisis de necesidad y disponibilidad." },
      { step: "Movilización", detail: "Transporte a obra con permisos vigentes." },
      { step: "Operación", detail: "Soporte técnico durante todo el alquiler." },
    ],
  },
  {
    slug: "proyectos-llave-en-mano",
    title: "Proyectos Llave en Mano",
    short: "Una sola contraparte: ingeniería, construcción, montaje y puesta en marcha.",
    long: "Asumimos la responsabilidad integral del proyecto: diseño, gestión de permisos, construcción, montaje electromecánico y puesta en marcha. Nuestro modelo llave en mano elimina interfaces y garantiza resultados consistentes.",
    image: llave,
    icon: "Handshake",
    bullets: [
      "Una sola contraparte para todo el proyecto",
      "Gestión integral de cronograma y presupuesto",
      "Coordinación de especialidades técnicas",
      "Garantía de funcionamiento operacional",
    ],
    process: [
      { step: "Conceptualización", detail: "Análisis de viabilidad técnica y económica." },
      { step: "Ejecución", detail: "Construcción y montaje integral." },
      { step: "Operación", detail: "Pruebas, entrega y soporte post-arranque." },
    ],
  },
];

export const servicesBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));