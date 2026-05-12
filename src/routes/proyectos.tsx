import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { MapPin, Building2, ArrowUpRight, Layers as LayersIcon, Plus, Trash2, Edit2, X, Loader2 } from "lucide-react";
import { SiteLayout, PageHero, CTASection } from "@/components/site/SiteLayout";
import { EditableMedia } from "@/components/ui/EditableMedia";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos — Obras de IM Ingeniería en Colombia" },
      { name: "description", content: "Portafolio de obras civiles, metalmecánica, minería, alquiler de maquinaria y proyectos llave en mano." },
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

function ProjectModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Project>) => Promise<void>;
  initialData?: Project | null;
}) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    cat: "Obras Civiles",
    place: "",
    client: "",
    img: "https://images.unsplash.com/photo-1541888081643-eb31f9b31175?auto=format&fit=crop&q=80&w=800",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: "",
        cat: "Obras Civiles",
        place: "",
        client: "",
        img: "https://images.unsplash.com/photo-1541888081643-eb31f9b31175?auto=format&fit=crop&q=80&w=800",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[var(--brand-navy-deep)] p-6 text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold">{initialData ? "Editar Proyecto" : "Nuevo Proyecto"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Título del Proyecto</label>
            <input
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent outline-none transition-all"
              placeholder="Ej. Puente Colgante..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría</label>
            <select
              required
              value={formData.cat}
              onChange={(e) => setFormData({ ...formData, cat: e.target.value as Exclude<Cat, "Todos"> })}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent outline-none transition-all"
            >
              {filters.filter(f => f !== "Todos").map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Ubicación</label>
              <input
                required
                type="text"
                value={formData.place}
                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent outline-none transition-all"
                placeholder="Ej. Bogotá"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Cliente</label>
              <input
                required
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[var(--brand-red)] focus:border-transparent outline-none transition-all"
                placeholder="Ej. INVIAS"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[var(--brand-red)] hover:bg-[var(--brand-red-bright)] text-white font-bold rounded-xl shadow-lg shadow-red-500/30 flex items-center gap-2 disabled:opacity-70 transition-all"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ProjectSkeleton() {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-200 animate-pulse">
      <div className="absolute inset-x-5 top-5 flex items-start justify-between">
        <div className="h-6 w-24 bg-black/10 rounded-full" />
        <div className="h-9 w-9 bg-black/10 rounded-full" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="h-7 w-3/4 bg-white/20 rounded-md mb-4" />
        <div className="flex gap-4">
          <div className="h-4 w-20 bg-white/20 rounded-md" />
          <div className="h-4 w-24 bg-white/20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

function ProyectosPage() {
  const { isEditingMode } = useAuth();
  const [active, setActive] = useState<Cat>("Todos");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects.php');
      const data = await res.json();
      if(Array.isArray(data)) setProjects(data);
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
    if (!confirm("¿Estás seguro de eliminar este proyecto definitivamente?")) return;
    try {
      const res = await fetch('/api/projects.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, _method: 'DELETE' })
      });
      if (res.ok) {
        toast.success("Proyecto eliminado correctamente");
        fetchProjects();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Error al eliminar");
      }
    } catch (error) {
      toast.error("Error de conexión");
    }
  };

  const handleSaveProject = async (data: Partial<Project>) => {
    const isEditing = !!data.id;
    
    try {
      const res = await fetch('/api/projects.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _method: isEditing ? 'PUT' : 'POST' })
      });
      
      if (res.ok) {
        toast.success(isEditing ? "Proyecto actualizado" : "Proyecto creado exitosamente");
        setIsModalOpen(false);
        fetchProjects();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Error al guardar el proyecto");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor");
    }
  };

  const openNewProjectModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Proyectos"
        title="Obras que respaldan"
        highlight="nuestra palabra."
        description="Una selección de proyectos que reflejan nuestra capacidad técnica, la diversidad de soluciones que entregamos y el compromiso con cada cliente."
      />

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
      />

      <section className="border-b border-border bg-white relative z-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { v: "200+", l: "Proyectos entregados" },
            { v: "20+", l: "Años de experiencia" },
            { v: "5", l: "Líneas de servicio" },
            { v: "98%", l: "Obras a tiempo" },
          ].map((s) => (
            <div key={s.l} className="text-center sm:text-left">
              <div className="text-4xl font-black text-[var(--brand-red)] tracking-tight">{s.v}</div>
              <div className="mt-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-20 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header & Filters */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    active === f
                      ? "bg-[var(--brand-navy-deep)] text-white shadow-lg shadow-[var(--brand-navy-deep)]/20 scale-105"
                      : "border border-border/50 bg-white text-foreground hover:border-[var(--brand-red)] hover:text-[var(--brand-red)]"
                  }`}
                >
                  {f}
                  <span className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold transition-colors ${
                    active === f ? "bg-white/20 text-white" : "bg-muted text-muted-foreground group-hover:bg-red-50 group-hover:text-red-600"
                  }`}>
                    {counts[f] || 0}
                  </span>
                </button>
              ))}
            </div>

            {isEditingMode && (
              <button 
                onClick={openNewProjectModal}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg shadow-green-500/25 hover:scale-105 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" /> 
                <span>Añadir Proyecto</span>
              </button>
            )}
          </div>

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
               <>
                 <ProjectSkeleton />
                 <ProjectSkeleton />
                 <ProjectSkeleton />
               </>
            ) : filtered.map((p) => (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-3xl bg-card shadow-lg shadow-black/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Controles de edición (Admin) */}
                {isEditingMode && (
                  <div className="absolute top-4 right-4 z-30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <button 
                      onClick={(e) => { e.stopPropagation(); openEditModal(p); }}
                      className="p-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors shadow-lg"
                      title="Editar proyecto"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                      className="p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                      title="Eliminar proyecto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="relative aspect-[4/5] overflow-hidden">
                  <EditableMedia
                    mediaId={`project-img-${p.id}`}
                    fallbackUrl={p.img}
                    alt={p.title}
                    className="h-full w-full"
                    onUploadComplete={(newUrl) => {
                      handleSaveProject({ ...p, img: newUrl });
                    }}
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--brand-navy-deep)]/90 via-[var(--brand-navy-deep)]/20 to-transparent" />
                  <div className="absolute inset-0 pointer-events-none bg-[var(--brand-red)]/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-[var(--brand-red)]/30" />

                  {/* Top: Category badge */}
                  <div className="absolute inset-x-5 top-5 pointer-events-none flex items-start justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg ${catColors[p.cat] || "bg-gray-800 text-white"}`}>
                      <LayersIcon className="h-3.5 w-3.5" />
                      {p.cat}
                    </span>
                    {!isEditingMode && (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:bg-[var(--brand-red)] group-hover:border-transparent group-hover:rotate-45 group-hover:scale-110">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    )}
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 pointer-events-none p-6 text-white transform transition-transform duration-500">
                    <h3 className="text-2xl font-extrabold leading-tight mb-3 drop-shadow-md group-hover:text-[var(--brand-red-bright)] transition-colors">{p.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-white/90">
                      <span className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10"><MapPin className="h-3.5 w-3.5 text-[var(--brand-red-bright)]" /> {p.place}</span>
                      <span className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10"><Building2 className="h-3.5 w-3.5 text-[var(--brand-red-bright)]" /> {p.client}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!isLoading && filtered.length === 0 && (
            <div className="mt-12 rounded-3xl border-2 border-dashed border-border bg-white p-16 text-center shadow-sm">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <LayersIcon className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">No hay proyectos encontrados</h3>
              <p className="text-muted-foreground">Intenta seleccionando otra categoría o añade un nuevo proyecto.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
