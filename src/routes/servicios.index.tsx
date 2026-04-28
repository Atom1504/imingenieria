import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Building2, Layers, Warehouse, Cylinder, GitMerge, Mountain, Scissors, Truck, Handshake } from "lucide-react";
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

function ServiciosPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Servicios"
        title="Soluciones técnicas"
        highlight="de extremo a extremo."
        description="Cubrimos todo el ciclo de vida del proyecto: ingeniería, construcción, metalmecánica, movimiento de tierra y alquiler de maquinaria. Una sola contraparte para resultados consistentes."
      />

      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {services.map((s) => {
            const Icon = iconMap[s.icon as keyof typeof iconMap] ?? Building2;
            return (
              <article key={s.slug} className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-[var(--shadow-card)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-navy-deep)] text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-[var(--brand-navy-deep)]">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.bullets.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-red)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/servicios/$slug"
                  params={{ slug: s.slug }}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-red)] hover:gap-2.5 transition-all"
                >
                  Ver detalles <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}