import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { SiteLayout, PageHero, CTASection } from "@/components/site/SiteLayout";
import bodegasImg from "@/assets/service-bodegas.jpg";
import concreteraImg from "@/assets/service-concretera.jpg";
import tierraImg from "@/assets/service-tierra.jpg";
import silosImg from "@/assets/service-silos.jpg";
import alquilerImg from "@/assets/service-alquiler.jpg";
import llaveImg from "@/assets/service-llave.jpg";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos — Obras de IM Ingeniería en Colombia" },
      { name: "description", content: "Una selección de proyectos en obras civiles, metalmecánica, minería, alquiler de maquinaria y proyectos llave en mano." },
      { property: "og:title", content: "Proyectos | IM Ingeniería" },
      { property: "og:description", content: "Obras que respaldan nuestra palabra. Conoce nuestro portafolio de proyectos." },
    ],
  }),
  component: ProyectosPage,
});

type Cat = "Todos" | "Obras Civiles" | "Metalmecánica" | "Minería" | "Alquiler de Maquinaria" | "Llave en Mano";

const projects: { title: string; cat: Exclude<Cat, "Todos">; place: string; year: string; img: string; desc: string; results: string[] }[] = [
  { title: "Bodega Logística Tenjo", cat: "Obras Civiles", place: "Tenjo, Cundinamarca", year: "2024", img: bodegasImg, desc: "Bodega industrial de 6.500 m² con estructura metálica de gran luz, cubierta termoacústica y 8 muelles de carga.", results: ["6.500 m² techados", "Entrega en 7 meses", "8 muelles operativos"] },
  { title: "Planta Concretera Sabana", cat: "Llave en Mano", place: "Cota, Cundinamarca", year: "2024", img: concreteraImg, desc: "Diseño, montaje y puesta en marcha de planta concretera de 90 m³/h con silos de cemento y obra civil completa.", results: ["90 m³/h de capacidad", "2 silos de 80 ton", "Llave en mano integral"] },
  { title: "Movimiento de Tierras — Mina Norte", cat: "Minería", place: "Boyacá, Colombia", year: "2023", img: tierraImg, desc: "Adecuación de vías de acceso, terrazas operativas y conformación de botaderos en operación minera de cielo abierto.", results: ["350.000 m³ movidos", "12 km de vías", "Cero accidentes en obra"] },
  { title: "Silos Cementeros Occidente", cat: "Metalmecánica", place: "Yumbo, Valle del Cauca", year: "2023", img: silosImg, desc: "Fabricación e instalación de tres silos metálicos de 120 toneladas con sistemas de carga neumática y filtros.", results: ["3 silos × 120 ton", "Instalación en 90 días", "Pruebas certificadas"] },
  { title: "Flota Maquinaria — Vía 4G", cat: "Alquiler de Maquinaria", place: "Cundinamarca", year: "2023", img: alquilerImg, desc: "Alquiler de flota de excavadoras, volquetas y vibrocompactadores para tramo de concesión vial 4G.", results: ["18 equipos en operación", "12 meses continuos", "98% disponibilidad"] },
  { title: "Complejo Industrial Multiplanta", cat: "Llave en Mano", place: "Sabana de Bogotá", year: "2022", img: llaveImg, desc: "Construcción integral de complejo industrial con bodegas, oficinas, urbanismo y obra electromecánica.", results: ["12.000 m² construidos", "Entrega llave en mano", "Operación inmediata"] },
];

const filters: Cat[] = ["Todos", "Obras Civiles", "Metalmecánica", "Minería", "Alquiler de Maquinaria", "Llave en Mano"];

function ProyectosPage() {
  const [active, setActive] = useState<Cat>("Todos");
  const filtered = active === "Todos" ? projects : projects.filter((p) => p.cat === active);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Proyectos"
        title="Obras que respaldan"
        highlight="nuestra palabra."
        description="Una selección de proyectos que reflejan nuestra capacidad técnica, la diversidad de soluciones que entregamos y el compromiso con cada cliente."
      />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  active === f
                    ? "bg-[var(--brand-red)] text-white shadow-[var(--shadow-red)]"
                    : "border border-border bg-card text-foreground hover:border-[var(--brand-red)]/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mt-12 space-y-10">
            {filtered.map((p) => (
              <article key={p.title} className="grid gap-0 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] lg:grid-cols-[1.1fr_1fr]">
                <div className="relative aspect-[4/3] lg:aspect-auto">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--brand-red)] px-3 py-1 text-xs font-semibold text-white">{p.cat}</span>
                </div>
                <div className="p-8 lg:p-10">
                  <h2 className="text-2xl font-extrabold text-[var(--brand-navy-deep)] sm:text-3xl">{p.title}</h2>
                  <div className="mt-3 flex flex-wrap gap-5 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[var(--brand-red)]" /> {p.place}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-[var(--brand-red)]" /> {p.year}</span>
                  </div>
                  <p className="mt-5 text-base text-foreground">{p.desc}</p>
                  <div className="mt-6 border-t border-border pt-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Resultados</p>
                    <ul className="mt-3 space-y-2 text-sm">
                      {p.results.map((r) => (
                        <li key={r} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--brand-red)]" /> {r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}