import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Building2, Layers, Warehouse, Cylinder, GitMerge, Mountain, Scissors, Truck, Handshake, Compass, PencilRuler, HardHat, Rocket, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { SiteLayout, PageHero, CTASection } from "@/components/site/SiteLayout";
import { services } from "@/data/services";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios — Construcción, Metalmecánica y Maquinaria | IM Ingeniería" },
      { name: "description", content: "Cubrimos todo el ciclo del proyecto: ingeniería, construcción, metalmecánica, movimiento de tierra y alquiler de maquinaria." },
      { property: "og:title", content: "Servicios | IM Ingeniería" },
      { property: "og:description", content: "Soluciones técnicas de extremo a extremo. Una sola contraparte para resultados consistentes." },
    ],
  }),
  component: ServiciosPage,
});

const iconMap = { Building2, Layers, Warehouse, Cylinder, GitMerge, Mountain, Scissors, Truck, Handshake } as const;

const benefits = [
  { icon: CheckCircle2, title: "Una sola contraparte", text: "Coordinamos todas las disciplinas técnicas para que tú gestiones un solo interlocutor responsable." },
  { icon: HardHat, title: "Equipo técnico colegiado", text: "Ingenieros, supervisores y operadores con certificaciones vigentes y experiencia comprobable." },
  { icon: Rocket, title: "Tiempos optimizados", text: "Planificación rigurosa, prefabricación en taller y control diario para reducir tiempos de obra." },
  { icon: CheckCircle2, title: "Calidad documentada", text: "Cada entrega incluye dossier técnico, planos as-built y protocolos de pruebas." },
];

const processSteps = [
  { icon: Compass, title: "Diagnóstico", text: "Visita técnica, levantamiento de necesidades y análisis de viabilidad." },
  { icon: PencilRuler, title: "Propuesta", text: "Ingeniería conceptual, presupuesto detallado y cronograma maestro." },
  { icon: HardHat, title: "Ejecución", text: "Construcción, montaje y supervisión técnica con reportes periódicos." },
  { icon: Rocket, title: "Entrega", text: "Pruebas, puesta en marcha, dossier técnico y soporte post-entrega." },
];

const faqs = [
  { q: "¿Atienden proyectos en todo Colombia?", a: "Sí. Aunque nuestra base está en la Sabana de Bogotá, ejecutamos proyectos en todo el país, especialmente en sectores industrial, minero y vial." },
  { q: "¿En cuánto tiempo entregan una cotización?", a: "Para proyectos estándar respondemos en menos de 24 horas. Para proyectos llave en mano que requieren visita técnica, entregamos propuesta formal entre 5 y 10 días hábiles." },
  { q: "¿Manejan modalidad llave en mano?", a: "Sí. Asumimos la responsabilidad integral del proyecto: ingeniería, gestión de permisos, construcción, montaje electromecánico y puesta en marcha." },
  { q: "¿Cuentan con maquinaria propia?", a: "Sí. Disponemos de flota propia de excavadoras, retroexcavadoras, cargadores, vibrocompactadores, volquetas y motoniveladoras con mantenimiento preventivo continuo." },
  { q: "¿Cumplen protocolos de seguridad SSOMA?", a: "Es innegociable. Cada frente de obra cuenta con personal HSE certificado, inducciones diarias, EPP completo y auditorías de cumplimiento." },
];

function ServiciosPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Servicios"
        title="Soluciones técnicas"
        highlight="de extremo a extremo."
        description="Cubrimos todo el ciclo de vida del proyecto: ingeniería, construcción, metalmecánica, movimiento de tierra y alquiler de maquinaria. Una sola contraparte para resultados consistentes."
      />

      {/* Intro / Descripción general */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Visión integral</p>
              <h2 className="mt-3 text-3xl font-extrabold text-[var(--brand-navy-deep)] sm:text-4xl">
                Un solo socio para todo el ciclo de tu proyecto
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Desde la conceptualización hasta la operación, integramos las disciplinas
              clave de la construcción industrial bajo un mismo equipo. Esto elimina
              interfaces, reduce riesgos y garantiza que el proyecto avance con un
              estándar único de calidad y seguridad.
            </p>
          </div>
        </div>
      </section>

      {/* Catálogo de servicios */}
      <section className="bg-muted py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Catálogo</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[var(--brand-navy-deep)] sm:text-4xl">Nuestros servicios</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Building2;
              return (
                <article key={s.slug} className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy-deep)]/80 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-red)] text-white shadow-[var(--shadow-red)]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-[var(--brand-navy-deep)]">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                    <ul className="mt-4 space-y-1.5 text-sm">
                      {s.bullets.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-red)]" />
                          <span className="text-muted-foreground">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/servicios/$slug" params={{ slug: s.slug }} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-red)] hover:gap-2.5 transition-all">
                      Ver detalles <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Beneficios</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[var(--brand-navy-deep)] sm:text-4xl">¿Qué ganas trabajando con nosotros?</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--brand-red)]/10 text-[var(--brand-red)]">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold text-[var(--brand-navy-deep)]">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso de trabajo */}
      <section className="bg-[var(--brand-navy-deep)] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red-bright)]">Cómo trabajamos</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Nuestro proceso, paso a paso</h2>
            <p className="mt-4 text-white/70">Una metodología clara y probada que aplicamos a cada proyecto.</p>
          </div>
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
                <div className="absolute -top-4 left-6 inline-flex h-8 items-center justify-center rounded-full bg-[var(--brand-red)] px-3 text-xs font-bold text-white shadow-[var(--shadow-red)]">
                  PASO 0{i + 1}
                </div>
                <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[var(--brand-red-bright)]">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Preguntas frecuentes</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[var(--brand-navy-deep)] sm:text-4xl">Resolvemos tus dudas</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-semibold text-[var(--brand-navy-deep)]">{f.q}</span>
                    {open ? <Minus className="h-5 w-5 shrink-0 text-[var(--brand-red)]" /> : <Plus className="h-5 w-5 shrink-0 text-[var(--brand-red)]" />}
                  </button>
                  {open && (
                    <div className="border-t border-border px-6 py-5 text-sm text-muted-foreground">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
