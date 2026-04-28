import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Users, Clock, Wrench, Building2, Layers, Warehouse, Cylinder, GitMerge, Mountain, Truck, Factory, HardHat, Quote, MapPin } from "lucide-react";
import { SiteLayout, CTASection, LocationMap } from "@/components/site/SiteLayout";
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
  { icon: Factory, name: "Metalmecánica", text: "Fabricación, rolado, corte, doblez y montaje de estructuras metálicas para industria pesada.", projects: "60+ proyectos", color: "from-[var(--brand-red)] to-[var(--brand-red-bright)]" },
  { icon: HardHat, name: "Obras Civiles", text: "Edificaciones industriales, bodegas, plantas y obras complementarias llave en mano.", projects: "80+ obras", color: "from-[var(--brand-navy)] to-[var(--brand-navy-soft)]" },
  { icon: Mountain, name: "Minería", text: "Movimiento de tierras, vías de acceso, infraestructura y maquinaria para operaciones mineras.", projects: "30+ operaciones", color: "from-[var(--brand-red)] to-[var(--brand-red-bright)]" },
  { icon: Truck, name: "Alquiler de Maquinaria", text: "Flota propia para movimiento de tierra, transporte y compactación, con operadores certificados.", projects: "Cobertura nacional", color: "from-[var(--brand-navy)] to-[var(--brand-navy-soft)]" },
];

const iconMap = { Building2, Layers, Warehouse, Cylinder, GitMerge, Mountain, Truck } as const;

const featured = [
  { tag: "Obras Civiles", title: "Bodega Logística Tenjo", place: "Tenjo, Cundinamarca", year: "2024", img: services.find(s => s.slug === "bodegas")!.image, desc: "Bodega industrial 6.500 m² con estructura metálica de gran luz." },
  { tag: "Llave en Mano", title: "Planta Concretera Sabana", place: "Cota, Cundinamarca", year: "2024", img: services.find(s => s.slug === "plantas-concreteras")!.image, desc: "Diseño, montaje y puesta en marcha 90 m³/h." },
  { tag: "Minería", title: "Movimiento de Tierras Mina Norte", place: "Boyacá, Colombia", year: "2023", img: services.find(s => s.slug === "movimiento-tierra")!.image, desc: "350.000 m³ movidos · 12 km de vías de acceso." },
  { tag: "Metalmecánica", title: "Silos Cementeros Occidente", place: "Yumbo, Valle del Cauca", year: "2023", img: services.find(s => s.slug === "silos")!.image, desc: "Tres silos metálicos de 120 ton certificados." },
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
        <img src={heroImg} alt="Obra de IM Ingeniería con maquinaria pesada" className="absolute inset-0 h-full w-full object-cover opacity-50" width={1920} height={1080} />
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
            <Link to="/contacto" className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-red)] px-7 py-4 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-transform hover:scale-[1.03] hover:bg-[var(--brand-red-bright)]">
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/proyectos" className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--brand-navy-deep)]">
              Ver proyectos
            </Link>
          </div>

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
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">Soluciones integrales en una sola empresa</h2>
            <p className="mt-4 text-lg text-muted-foreground">Desde la cimentación hasta la operación, cubrimos cada etapa con equipo técnico especializado y maquinaria propia.</p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Building2;
              return (
                <Link key={s.slug} to="/servicios/$slug" params={{ slug: s.slug }} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-[var(--brand-red)]/40 hover:shadow-[var(--shadow-card)]">
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

      {/* INDUSTRIAS — Rediseñada */}
      <section className="relative overflow-hidden bg-[var(--brand-navy-deep)] py-24 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div aria-hidden className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full opacity-25" style={{ background: "radial-gradient(circle, var(--brand-red) 0%, transparent 60%)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red-bright)]">Industrias que servimos</p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Sectores en los que trabajamos</h2>
            <p className="mt-4 text-lg text-white/70">Acompañamos a clientes industriales, constructores y operadores mineros con soluciones técnicas a la medida de cada sector.</p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((i) => (
              <article key={i.name} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all hover:-translate-y-1.5 hover:border-[var(--brand-red-bright)]/40 hover:bg-white/[0.07]">
                {/* Top accent bar */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${i.color}`} />
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${i.color} shadow-[var(--shadow-red)]`}>
                  <i.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">{i.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{i.text}</p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[var(--brand-red-bright)]">{i.projects}</span>
                  <ArrowRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Por qué elegirnos</p>
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">Sólidos en cada cimiento, confiables en cada entrega</h2>
            <p className="mt-4 text-lg text-muted-foreground">Combinamos experiencia técnica, gestión rigurosa y compromiso con la seguridad para superar las expectativas.</p>
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

      {/* PROYECTOS DESTACADOS — Rediseñada */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Proyectos destacados</p>
              <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">Obras que respaldan nuestra trayectoria</h2>
              <p className="mt-4 text-lg text-muted-foreground">Cada proyecto es una historia de planificación rigurosa, ejecución técnica y resultados medibles.</p>
            </div>
            <Link to="/proyectos" className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--brand-navy-deep)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-navy-deep)] transition-colors hover:bg-[var(--brand-navy-deep)] hover:text-white">
              Ver portafolio completo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Asymmetric grid: 1 hero + 3 small */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
            {featured.map((p, idx) => (
              <Link
                key={p.title}
                to="/proyectos"
                className={`group relative block overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-card)] ${
                  idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className={`relative w-full overflow-hidden ${idx === 0 ? "h-full min-h-[420px]" : "aspect-[4/3]"}`}>
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {/* Gradient overlay always visible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy-deep)] via-[var(--brand-navy-deep)]/40 to-transparent" />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[var(--brand-red)]/0 transition-colors duration-500 group-hover:bg-[var(--brand-red)]/15" />

                  {/* Tag */}
                  <span className="absolute left-5 top-5 rounded-full bg-[var(--brand-red)] px-3 py-1 text-xs font-semibold text-white shadow-[var(--shadow-red)]">
                    {p.tag}
                  </span>

                  {/* Content overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className={`font-extrabold text-white ${idx === 0 ? "text-2xl sm:text-3xl" : "text-lg"}`}>{p.title}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/80">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {p.place}</span>
                      <span>·</span>
                      <span>{p.year}</span>
                    </div>
                    {idx === 0 && <p className="mt-3 max-w-md text-sm text-white/85">{p.desc}</p>}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-red-bright)] group-hover:gap-2.5 transition-all">
                      Ver detalles <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
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

      {/* UBICACIÓN */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Visítanos</p>
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">Encuéntranos en la Sabana</h2>
            <p className="mt-4 text-lg text-muted-foreground">Nuestras oficinas y planta están estratégicamente ubicadas para servir proyectos en toda Colombia.</p>
          </div>
          <div className="mt-12">
            <LocationMap />
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
