import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MapPin, Building2, ArrowUpRight, Layers as LayersIcon, Plus, Trash2, Edit } from "lucide-react";
import { SiteLayout, PageHero, CTASection } from "@/components/site/SiteLayout";
import { EditableMedia } from "@/components/ui/EditableMedia";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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
  id: number;
  title: string;
  cat: Exclude<Cat, "Todos">;
  place: string;
  client: string;
  img: string;
};

const filters: Cat[] = ["Todos", "Obras Civiles", "Metalmecánica", "Minería", "Alquiler de Maquinaria", "Llave en Mano"];

const catColors: Record<Exclude<Cat, "Todos">, string> = {
  "Obras Civiles": "bg-[var(--brand-red)] text-white",
  "Metalmecánica": "bg-[var(--brand-navy-deep)] text-white",
  "Minería": "bg-amber-500 text-white",
  "Alquiler de Maquinaria": "bg-[var(--brand-blue-accent)] text-white",
  "Llave en Mano": "bg-[var(--brand-red-bright)] text-white",
};

function ProyectosPage() {
  const { isEditingMode } = useAuth();
  const [active, setActive] = useState<Cat>("Todos");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from API
  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects.php');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      toast.error("Error al cargar proyectos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filtered = active === "Todos" ? projects : projects.filter((p) => p.cat === active);

  const counts = filters.reduce<Record<string, number>>((acc, f) => {
    acc[f] = f === "Todos" ? projects.length : projects.filter((p) => p.cat === f).length;
    return acc;
  }, {});

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este proyecto?")) return;
    try {
      const res = await fetch('/api/projects.php', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        toast.success("Proyecto eliminado");
        fetchProjects();
      } else {
        toast.error("Error al eliminar");
      }
    } catch (error) {
      toast.error("Error de conexión");
    }
  };

  const handleAdd = async () => {
    const title = prompt("Título del proyecto:");
    if (!title) return;
    const cat = prompt("Categoría (Obras Civiles, Metalmecánica, Minería, Alquiler de Maquinaria, Llave en Mano):") || "Obras Civiles";
    const place = prompt("Ubicación:") || "Colombia";
    const client = prompt("Cliente:") || "Cliente Confidencial";
    const img = "https://images.unsplash.com/photo-1541888081643-eb31f9b31175?auto=format&fit=crop&q=80&w=800"; // Default image

    try {
      const res = await fetch('/api/projects.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, cat, place, client, img })
      });
      if (res.ok) {
        toast.success("Proyecto creado. Ahora puedes cambiar la imagen.");
        fetchProjects();
      } else {
        toast.error("Error al crear");
      }
    } catch (error) {
      toast.error("Error de conexión");
    }
  };

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
          <div className="flex flex-wrap gap-2 justify-between items-center">
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
                    {counts[f] || 0}
                  </span>
                </button>
              ))}
            </div>

            {isEditingMode && (
              <button 
                onClick={handleAdd}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full flex items-center gap-2 font-semibold transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" /> Añadir Proyecto
              </button>
            )}
          </div>

          {/* Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
               <div className="col-span-full py-12 text-center text-muted-foreground">Cargando proyectos...</div>
            ) : filtered.map((p) => (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1.5 hover:shadow-[var(--shadow-elegant)]"
              >
                {/* Controles de edición */}
                {isEditingMode && (
                  <div className="absolute top-4 right-4 z-30 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 p-1 rounded-full backdrop-blur-sm">
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                      title="Eliminar proyecto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Image with overlay */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <EditableMedia
                    mediaId={`project-img-${p.id}`}
                    fallbackUrl={p.img}
                    alt={p.title}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--brand-navy-deep)] via-[var(--brand-navy-deep)]/30 to-transparent" />
                  {/* Hover red accent */}
                  <div className="absolute inset-0 pointer-events-none bg-[var(--brand-red)]/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-[var(--brand-red)]/20" />

                  {/* Top: category badge + arrow */}
                  <div className="absolute inset-x-5 top-5 pointer-events-none flex items-start justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${catColors[p.cat] || "bg-gray-600 text-white"}`}>
                      <LayersIcon className="h-3 w-3" />
                      {p.cat}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-all group-hover:bg-white group-hover:text-[var(--brand-red)]">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 pointer-events-none p-6 text-white">
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

          {!isLoading && filtered.length === 0 && (
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
