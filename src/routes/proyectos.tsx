import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Building2, ArrowUpRight, Layers as LayersIcon } from "lucide-react";
import { SiteLayout, PageHero, CTASection } from "@/components/site/SiteLayout";
import bodegasImg from "@/assets/service-bodegas.jpg";
import concreteraImg from "@/assets/service-concretera.jpg";
import tierraImg from "@/assets/service-tierra.jpg";
import silosImg from "@/assets/service-silos.jpg";
import alquilerImg from "@/assets/service-alquiler.jpg";
import llaveImg from "@/assets/service-llave.jpg";
import construccionImg from "@/assets/service-construccion.jpg";
import roladoImg from "@/assets/service-rolado.jpg";
import corteImg from "@/assets/service-corte.jpg";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos — Obras de IM Ingeniería en Colombia" },
      { name: "description", content: "Portafolio de obras civiles, metalmecánica, minería, alquiler de maquinaria y proyectos llave en mano." },
      { property: "og:title", content: "Proyectos | IM Ingeniería" },
      { property: "og:description", content: "Obras que respaldan nuestra palabra." },
    ],
  }),
  component: ProyectosPage,
});

type Cat = "Todos" | "Obras Civiles" | "Metalmecánica" | "Minería" | "Alquiler de Maquinaria" | "Llave en Mano";

type Project = {
  title: string;
  cat: Exclude<Cat, "Todos">;
  place: string;
  client: string;
  img: string;
};

const projects: Project[] = [
  { title: "Bodega Logística Tenjo", cat: "Obras Civiles", place: "Tenjo, Cundinamarca", client: "Operador logístico industrial", img: bodegasImg },
  { title: "Planta Concretera Sabana", cat: "Llave en Mano", place: "Cota, Cundinamarca", client: "Constructora regional", img: concreteraImg },
  { title: "Movimiento de Tierras Mina Norte", cat: "Minería", place: "Boyacá, Colombia", client: "Operador minero", img: tierraImg },
  { title: "Silos Cementeros Occidente", cat: "Metalmecánica", place: "Yumbo, Valle del Cauca", client: "Industria cementera", img: silosImg },
  { title: "Flota Maquinaria Vía 4G", cat: "Alquiler de Maquinaria", place: "Cundinamarca", client: "Concesionario vial", img: alquilerImg },
  { title: "Complejo Industrial Multiplanta", cat: "Llave en Mano", place: "Sabana de Bogotá", client: "Grupo industrial nacional", img: llaveImg },
  { title: "Edificación Industrial Mosquera", cat: "Obras Civiles", place: "Mosquera, Cundinamarca", client: "Empresa manufacturera", img: construccionImg },
  { title: "Estructuras Metálicas Roladas", cat: "Metalmecánica", place: "Bogotá D.C.", client: "Proveedor industrial", img: roladoImg },
  { title: "Piezas CNC para Planta Minera", cat: "Metalmecánica", place: "Antioquia", client: "Operador minero", img: corteImg },
];

const filters: Cat[] = ["Todos", "Obras Civiles", "Metalmecánica", "Minería", "Alquiler de Maquinaria", "Llave en Mano"];

const catColors: Record<Exclude<Cat, "Todos">, string> = {
  "Obras Civiles": "bg-[var(--brand-red)] text-white",
  "Metalmecánica": "bg-[var(--brand-navy-deep)] text-white",
  "Minería": "bg-amber-500 text-white",
  "Alquiler de Maquinaria": "bg-[var(--brand-blue-accent)] text-white",
  "Llave en Mano": "bg-[var(--brand-red-bright)] text-white",
};

function ProyectosPage() {
  const [active, setActive] = useState<Cat>("Todos");
  const filtered = active === "Todos" ? projects : projects.filter((p) => p.cat === active);

  const counts = filters.reduce<Record<string, number>>((acc, f) => {
    acc[f] = f === "Todos" ? projects.length : projects.filter((p) => p.cat === f).length;
    return acc;
  }, {});

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Proyectos"
        title="Obras que respaldan"
        highlight="nuestra palabra."
        description="Una selección de proyectos que reflejan nuestra capacidad técnica, la diversidad de soluciones que entregamos y el compromiso con cada cliente."
      />

      {/* Stats bar */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { v: "200+", l: "Proyectos entregados" },
            { v: "20+", l: "Años de experiencia" },
            { v: "5", l: "Líneas de servicio" },
            { v: "98%", l: "Obras a tiempo" },
          ].map((s) => (
            <div key={s.l} className="text-center sm:text-left">
              <div className="text-3xl font-extrabold text-[var(--brand-red)]">{s.v}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filtros + Grid */}
      <section className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  active === f
                    ? "bg-[var(--brand-red)] text-white shadow-[var(--shadow-red)]"
                    : "border border-border bg-card text-foreground hover:border-[var(--brand-red)]/40 hover:-translate-y-0.5"
                }`}
              >
                {f}
                <span className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                  active === f ? "bg-white/25 text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {counts[f]}
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article
                key={p.title}
                className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1.5 hover:shadow-[var(--shadow-elegant)]"
              >
                {/* Image with overlay */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy-deep)] via-[var(--brand-navy-deep)]/30 to-transparent" />
                  {/* Hover red accent */}
                  <div className="absolute inset-0 bg-[var(--brand-red)]/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-[var(--brand-red)]/20" />

                  {/* Top: category badge + arrow */}
                  <div className="absolute inset-x-5 top-5 flex items-start justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${catColors[p.cat]}`}>
                      <LayersIcon className="h-3 w-3" />
                      {p.cat}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all group-hover:bg-white group-hover:text-[var(--brand-red)]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="text-xl font-extrabold leading-tight">{p.title}</h3>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/85">
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[var(--brand-red-bright)]" /> {p.place}</span>
                      <span className="inline-flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-[var(--brand-red-bright)]" /> {p.client}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
              No hay proyectos en esta categoría aún.
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
