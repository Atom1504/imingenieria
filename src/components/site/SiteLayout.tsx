import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-navy-deep)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, var(--brand-red) 0%, transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-red-bright)]" /> {eyebrow}
        </span>
        <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
          {title}{" "}
          {highlight && <span className="text-[var(--brand-red-bright)]">{highlight}</span>}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base text-white/75 sm:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="bg-[var(--brand-navy-deep)] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 rounded-3xl border border-white/10 bg-gradient-to-br from-[var(--brand-navy)] to-[var(--brand-navy-deep)] p-10 lg:grid-cols-[1.5fr_1fr] lg:p-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red-bright)]">¿Tienes un proyecto en mente?</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Hagámoslo realidad.</h2>
            <p className="mt-4 max-w-xl text-white/70">
              Solicita una cotización sin compromiso. Te respondemos en menos de 24 horas con una propuesta técnica clara.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/80 sm:grid-cols-4">
              {["Equipo técnico colegiado", "Maquinaria propia", "Protocolos SSOMA", "Plazos cumplidos"].map(
                (i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--brand-red-bright)]" /> {i}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-red)] px-6 py-4 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-transform hover:scale-[1.02] hover:bg-[var(--brand-red-bright)]"
            >
              Solicitar cotización
            </a>
            <a
              href="tel:+573116884440"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Llamar +57 311 688 4440
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}