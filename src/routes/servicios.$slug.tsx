import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Building2, Layers, Warehouse, Cylinder, GitMerge, Mountain, Scissors, Truck, Handshake } from "lucide-react";
import { SiteLayout, CTASection } from "@/components/site/SiteLayout";
import { EditableMedia } from "@/components/ui/EditableMedia";
import { services, servicesBySlug } from "@/data/services";

const iconMap = { Building2, Layers, Warehouse, Cylinder, GitMerge, Mountain, Scissors, Truck, Handshake } as const;

export const Route = createFileRoute("/servicios/$slug")({
  loader: ({ params }) => {
    const service = servicesBySlug[params.slug];
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.service.title} — Servicios | IM Ingeniería` },
          { name: "description", content: loaderData.service.short },
          { property: "og:title", content: `${loaderData.service.title} | IM Ingeniería` },
          { property: "og:description", content: loaderData.service.short },
          { property: "og:image", content: loaderData.service.image },
        ]
      : [{ title: "Servicio — IM Ingeniería" }],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-[var(--brand-navy-deep)]">Servicio no encontrado</h1>
        <Link to="/servicios" className="mt-6 inline-flex items-center gap-2 text-[var(--brand-red)] font-semibold">
          Ver todos los servicios <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="text-3xl font-bold text-[var(--brand-navy-deep)]">Error</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Building2;
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--brand-navy-deep)] text-white">
        <div className="absolute inset-0 opacity-30">
          <EditableMedia mediaId={`service-hero-${service.slug}`} fallbackUrl={service.image} alt={service.title} />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--brand-navy-deep)] via-[var(--brand-navy-deep)]/85 to-[var(--brand-navy-deep)]/40" />
        <div className="relative pointer-events-none mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <Link to="/servicios" className="inline-flex pointer-events-auto items-center gap-1.5 text-sm text-white/70 hover:text-white">
            ← Volver a servicios
          </Link>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--brand-red)] shadow-[var(--shadow-red)]">
              <Icon className="h-7 w-7" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red-bright)]">Servicio</span>
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">{service.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">{service.short}</p>
        </div>
      </section>

      {/* Descripción */}
      <section className="bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Descripción</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[var(--brand-navy-deep)] sm:text-4xl">¿En qué consiste este servicio?</h2>
            <p className="mt-6 text-base text-muted-foreground sm:text-lg">{service.long}</p>

            <h3 className="mt-10 text-xl font-bold text-[var(--brand-navy-deep)]">Ventajas clave</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-red)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <EditableMedia mediaId={`service-detail-${service.slug}`} fallbackUrl={service.image} alt={service.title} className="rounded-2xl shadow-[var(--shadow-elegant)] w-full h-full" />
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Cómo trabajamos</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[var(--brand-navy-deep)] sm:text-4xl">Nuestro proceso</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {service.process.map((p, i) => (
              <div key={p.step} className="relative rounded-2xl border border-border bg-card p-7">
                <div className="text-5xl font-extrabold text-[var(--brand-red)]/20">0{i + 1}</div>
                <h3 className="mt-2 text-xl font-bold text-[var(--brand-navy-deep)]">{p.step}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[var(--brand-navy-deep)] sm:text-3xl">Otros servicios</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/servicios/$slug"
                params={{ slug: o.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <EditableMedia mediaId={`other-service-${o.slug}`} fallbackUrl={o.image} alt={o.title} className="h-full w-full transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[var(--brand-navy-deep)]">{o.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{o.short}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-red)] group-hover:gap-2.5 transition-all">
                    Ver detalles <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}