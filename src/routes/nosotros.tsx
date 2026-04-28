import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Award, Users, Wrench, ShieldCheck, Flag, TrendingUp, Cog, Trophy } from "lucide-react";
import { SiteLayout, PageHero, CTASection } from "@/components/site/SiteLayout";
import aboutImg from "@/assets/about-experience.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — IM Ingeniería y Minerales S.A.S." },
      { name: "description", content: "Más de 20 años entregando proyectos de construcción, metalmecánica y minería en Colombia. Conoce nuestra historia, misión y valores." },
      { property: "og:title", content: "Nosotros — IM Ingeniería" },
      { property: "og:description", content: "Construyendo confianza, una obra a la vez." },
    ],
  }),
  component: NosotrosPage,
});

const pillars = [
  { icon: Target, title: "Misión", text: "Diseñar, construir y operar proyectos de ingeniería seguros, eficientes y de alto valor para la industria, la minería y el desarrollo de infraestructura en Colombia." },
  { icon: Eye, title: "Visión", text: "Ser referente nacional en soluciones integrales de construcción, metalmecánica y maquinaria pesada, reconocidos por nuestra solidez técnica y cumplimiento." },
  { icon: Heart, title: "Valores", text: "Integridad, seguridad, calidad, compromiso y trabajo en equipo guían cada decisión y cada obra que entregamos." },
];

const milestones = [
  { icon: Flag, year: "Inicios", title: "Fundación de IM Ingeniería", text: "Nace IM Ingeniería con foco en obras civiles e industriales en la Sabana de Bogotá. Primeros contratos de obra civil con clientes industriales locales." },
  { icon: TrendingUp, year: "Crecimiento", title: "Expansión metalmecánica", text: "Se consolida la unidad de metalmecánica con servicios de rolado, corte y montaje. Inversión en taller propio y equipos de soldadura certificada." },
  { icon: Cog, year: "Consolidación", title: "Maquinaria amarilla propia", text: "Adquisición de flota de maquinaria pesada para minería y movimiento de tierras. Cobertura nacional con operadores certificados." },
  { icon: Trophy, year: "Hoy", title: "Proyectos llave en mano", text: "Más de 200 proyectos entregados, presencia regional y modelo integral que cubre desde la ingeniería hasta la puesta en marcha." },
];

function NosotrosPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Nosotros"
        title="Construyendo confianza,"
        highlight="una obra a la vez."
        description="Somos un equipo de ingenieros, técnicos y operadores comprometidos con entregar proyectos sólidos, seguros y a tiempo."
      />

      {/* Historia */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Nuestra historia</p>
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">Más de dos décadas levantando proyectos que perduran</h2>
            <div className="mt-6 space-y-4 text-base text-muted-foreground">
              <p>IM Ingeniería nació con la convicción de que la construcción podía hacerse mejor: con rigor técnico, transparencia y respeto absoluto por los plazos. Hoy somos una empresa con presencia regional, pero conservamos la atención al detalle de nuestros primeros proyectos.</p>
              <p>Cada obra que entregamos refleja nuestra filosofía: calidad sin atajos, seguridad innegociable y compromiso con el cliente del primer día al último.</p>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: Award, t: "20+ años de experiencia" },
                { icon: Users, t: "200+ obras entregadas" },
                { icon: ShieldCheck, t: "Equipo técnico colegiado" },
                { icon: Wrench, t: "Maquinaria propia" },
              ].map((i) => (
                <li key={i.t} className="flex items-center gap-2">
                  <i.icon className="h-4 w-4 text-[var(--brand-red)]" /> {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img src={aboutImg} alt="Supervisor de obra en sitio" loading="lazy" className="rounded-2xl object-cover shadow-[var(--shadow-elegant)]" />
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-[var(--brand-red)] px-6 py-5 text-white shadow-[var(--shadow-red)]">
              <div className="text-3xl font-extrabold">20 años</div>
              <div className="text-sm">de experiencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión, visión, valores */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Lo que nos define</p>
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">Misión, visión y valores</h2>
            <p className="mt-4 text-lg text-muted-foreground">Los pilares que sostienen nuestra cultura y guían cada proyecto.</p>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-navy-deep)] text-white">
                  <p.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-[var(--brand-navy-deep)]">{p.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE — Nuestro camino */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Trayectoria</p>
            <h2 className="mt-3 text-4xl font-extrabold text-[var(--brand-navy-deep)] sm:text-5xl">Nuestro camino</h2>
            <p className="mt-4 text-lg text-muted-foreground">Hitos que marcan la evolución de IM Ingeniería a lo largo de más de dos décadas.</p>
          </div>

          {/* Timeline vertical en mobile, horizontal en desktop */}
          <div className="mt-16">
            {/* Desktop horizontal */}
            <div className="relative hidden lg:block">
              {/* Línea horizontal */}
              <div className="absolute left-0 right-0 top-[68px] h-1 rounded-full bg-gradient-to-r from-[var(--brand-red)] via-[var(--brand-red-bright)] to-[var(--brand-navy-deep)]" />
              <ol className="relative grid grid-cols-4 gap-6">
                {milestones.map((m, i) => (
                  <li key={m.title} className="flex flex-col items-center text-center">
                    {/* Dot */}
                    <div className="relative z-10 flex h-[136px] flex-col items-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[var(--brand-red)] text-white shadow-[var(--shadow-red)]">
                        <m.icon className="h-6 w-6" />
                      </div>
                      <div className="mt-3 inline-flex items-center rounded-full bg-[var(--brand-navy-deep)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
                        {m.year}
                      </div>
                    </div>
                    <div className="mt-4 rounded-2xl border border-border bg-card p-5 text-left shadow-[var(--shadow-card)]">
                      <h3 className="text-base font-bold text-[var(--brand-navy-deep)]">
                        <span className="mr-2 text-[var(--brand-red)]">0{i + 1}.</span>{m.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">{m.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Mobile vertical */}
            <ol className="relative space-y-8 lg:hidden">
              <div className="absolute left-7 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-[var(--brand-red)] to-[var(--brand-navy-deep)]" />
              {milestones.map((m, i) => (
                <li key={m.title} className="relative flex gap-5">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white bg-[var(--brand-red)] text-white shadow-[var(--shadow-red)]">
                    <m.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                    <div className="inline-flex items-center rounded-full bg-[var(--brand-navy-deep)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      {m.year}
                    </div>
                    <h3 className="mt-3 text-base font-bold text-[var(--brand-navy-deep)]">
                      <span className="mr-2 text-[var(--brand-red)]">0{i + 1}.</span>{m.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
