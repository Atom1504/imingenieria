import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Users, Clock, Wrench, Building2, Layers, Warehouse, Cylinder, GitMerge, Mountain, Truck, Factory, HardHat, Quote } from "lucide-react";
import { SiteLayout, CTASection } from "@/components/site/SiteLayout";
import { services } from "@/data/services";
import heroImg from "@/assets/im-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IM Ingeniería — Construcción, Metalmecánica y Minería en Colombia" },
      { name: "description", content: "Diseñamos, construimos y operamos. Maquinaria propia, equipo técnico colegiado y compromiso real con plazos, calidad y seguridad." },
      { property: "og:title", content: "IM Ingeniería — Ingeniería sólida para proyectos que perduran" },
      { property: "og:description", content: "20+ años entregando obras civiles, plantas industriales y soluciones metalmecánicas en Colombia." },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "20+", label: "Años de experiencia" },
  { value: "200+", label: "Proyectos entregados" },
  { value: "98%", label: "Obras a tiempo" },
  { value: "24h", label: "Respuesta a cotización" },
];

const advantages = [
  { icon: ShieldCheck, title: "Seguridad innegociable", text: "Cumplimos protocolos SSOMA en cada frente, con personal certificado y auditorías permanentes." },
  { icon: Users, title: "Equipo técnico propio", text: "Ingenieros, supervisores, operadores y soldadores con amplia experiencia en proyectos exigentes." },
  { icon: Clock, title: "Plazos cumplidos", text: "Planificación rigurosa, control diario de obra y comunicación transparente con el cliente." },
  { icon: Wrench, title: "Maquinaria propia", text: "Flota de maquinaria pesada y amarilla siempre disponible, con mantenimiento preventivo continuo." },
];

const industries = [
  { icon: Factory, name: "Metalmecánica", text: "Fabricación, rolado, corte, doblez y montaje de estructuras metálicas para industria pesada." },
  { icon: HardHat, name: "Obras Civiles", text: "Edificaciones industriales, bodegas, plantas y obras complementarias llave en mano." },
  { icon: Mountain, name: "Minería", text: "Movimiento de tierras, vías de acceso, infraestructura y maquinaria para operaciones mineras." },
  { icon: Truck, name: "Alquiler de Maquinaria", text: "Flota propia para movimiento de tierra, transporte y compactación, con operadores certificados." },
];

const iconMap = { Building2, Layers, Warehouse, Cylinder, GitMerge, Mountain, Truck } as const;

const featured = [
  { tag: "Obras Civiles", title: "Bodega Logística Tenjo", place: "Tenjo, Cundinamarca · 2024", img: services.find(s => s.slug === "bodegas")!.image },
  { tag: "Llave en Mano", title: "Planta Concretera Sabana", place: "Cota, Cundinamarca · 2024", img: services.find(s => s.slug === "plantas-concreteras")!.image },
  { tag: "Minería", title: "Movimiento de Tierras — Mina Norte", place: "Boyacá, Colombia · 2023", img: services.find(s => s.slug === "movimiento-tierra")!.image },
  { tag: "Metalmecánica", title: "Silos Cementeros Occidente", place: "Yumbo, Valle del Cauca · 2023", img: services.find(s => s.slug === "silos")!.image },
];

const testimonials = [
  { quote: "Entendieron la complejidad técnica desde el primer día. Entregaron la planta antes del plazo y dentro del presupuesto.", name: "Carlos Mendoza", role: "Director de Operaciones" },
  { quote: "Un socio constructor confiable. La calidad estructural y el control de obra fueron impecables en nuestra bodega industrial.", name: "Ana Lucía Vargas", role: "Gerente de Proyectos" },
  { quote: "Profesionalismo, transparencia y resultados. Es la tercera obra que ejecutamos juntos y siempre superan expectativas.", name: "Roberto Salas", role: "Gerente General" },
];

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--brand-navy-deep)]">
        <img
          src={heroImg}
          alt="Obra de IM Ingeniería con maquinaria pesada"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-navy-deep)] via-[var(--brand-navy-deep)]/80 to-[var(--brand-navy-deep)]/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--brand-navy-deep)] to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8 lg:py-44">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-red-bright)]" />
            Construcción · Metalmecánica · Minería
          </span>
          <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Ingeniería sólida para proyectos que <span className="text-[var(--brand-red-bright)]">perduran.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            En IM Ingeniería diseñamos, construimos y operamos. Maquinaria propia, equipo técnico colegiado y compromiso real con plazos, calidad y seguridad.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-red)] px-7 py-4 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-transform hover:scale-[1.03] hover:bg-[var(--brand-red-bright)]"
            >
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/proyectos"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--brand-navy-deep)]"
            >
              Ver proyectos
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-extrabold text-[var(--brand-red-bright)] sm:text-5xl">{s.value}</div>
                <div className="mt-1 text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Nuestros servicios</p>
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">
              Soluciones integrales en una sola empresa
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Desde la cimentación hasta la operación, cubrimos cada etapa con equipo técnico especializado y maquinaria propia.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Building2;
              return (
                <Link
                  key={s.slug}
                  to="/servicios/$slug"
                  params={{ slug: s.slug }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--brand-red)]/40 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-navy-deep)] text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-[var(--brand-navy-deep)]">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-red)] group-hover:gap-2.5 transition-all">
                    Ver detalles <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/servicios" className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-navy-deep)] px-6 py-3 text-sm font-semibold text-[var(--brand-navy-deep)] transition-colors hover:bg-[var(--brand-navy-deep)] hover:text-white">
              Ver todos los servicios <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* INDUSTRIAS */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Industrias</p>
              <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">Sectores en los que trabajamos</h2>
              <p className="mt-4 text-lg text-muted-foreground">Acompañamos a clientes industriales, constructores y operadores mineros con soluciones técnicas a la medida.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {industries.map((i) => (
                <div key={i.name} className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-red)]/10 text-[var(--brand-red)]">
                    <i.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[var(--brand-navy-deep)]">{i.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{i.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Por qué elegirnos</p>
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">
              Sólidos en cada cimiento, confiables en cada entrega
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Combinamos experiencia técnica, gestión rigurosa y compromiso con la seguridad para superar las expectativas.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a) => (
              <div key={a.title} className="rounded-2xl bg-muted p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-red)] text-white">
                  <a.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-bold text-[var(--brand-navy-deep)]">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Proyectos destacados</p>
              <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">Obras que respaldan nuestra trayectoria</h2>
              <p className="mt-4 text-lg text-muted-foreground">Cada proyecto es una historia de planificación rigurosa, ejecución técnica y resultados medibles.</p>
            </div>
            <Link to="/proyectos" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-red)] hover:gap-3 transition-all">
              Ver portafolio completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <Link key={p.title} to="/proyectos" className="group overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute left-4 top-4 rounded-full bg-[var(--brand-red)] px-3 py-1 text-xs font-semibold text-white">{p.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[var(--brand-navy-deep)]">{p.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{p.place}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Testimonios</p>
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">La confianza de nuestros clientes</h2>
            <p className="mt-4 text-lg text-muted-foreground">Empresas líderes en industria, minería y construcción nos eligen una y otra vez.</p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl border border-border bg-card p-7">
                <Quote className="h-8 w-8 text-[var(--brand-red)]/30" />
                <blockquote className="mt-4 text-base text-foreground">"{t.quote}"</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-semibold text-[var(--brand-navy-deep)]">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
