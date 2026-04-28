import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ArrowRight, Phone, MessageCircle, Sparkles } from "lucide-react";

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
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
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

/**
 * CTA destacado, claramente diferenciado del footer.
 * Fondo rojo brillante con patrón, formas y separación visual marcada.
 */
export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[2rem] p-8 sm:p-12 lg:p-16"
          style={{
            background:
              "linear-gradient(135deg, var(--brand-red) 0%, var(--brand-red-bright) 55%, var(--brand-navy-deep) 140%)",
          }}
        >
          {/* Decorative shapes */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-[var(--brand-navy-deep)]/40 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                ¿Tienes un proyecto en mente?
              </span>
              <h2 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                Hagámoslo realidad.
              </h2>
              <p className="mt-5 max-w-xl text-base text-white/90 sm:text-lg">
                Cuéntanos qué necesitas. Un ingeniero senior te responderá en menos de
                <strong className="font-bold"> 24 horas</strong> con una propuesta técnica clara
                y sin compromiso.
              </p>
              <ul className="mt-7 grid grid-cols-2 gap-3 text-sm text-white/95 sm:grid-cols-2">
                {[
                  "Equipo técnico colegiado",
                  "Maquinaria propia",
                  "Protocolos SSOMA",
                  "Plazos cumplidos",
                ].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-[var(--brand-red)] shadow-xl transition-transform hover:scale-[1.03]"
              >
                Solicitar cotización <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+573116884440"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 bg-transparent px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> +57 311 688 4440
              </a>
              <a
                href="https://wa.me/573116884440"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-navy-deep)] px-7 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" /> Escribir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Mapa de ubicación reutilizable: iframe Google Maps con presentación visual moderna.
 */
export function LocationMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[var(--brand-navy-deep)] px-6 py-4 text-white">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red-bright)]">
            Nuestra ubicación
          </p>
          <p className="mt-1 text-sm font-semibold">Autopista Medellín Km 10.5, Tenjo, Cundinamarca</p>
        </div>
        <a
          href="https://www.google.com/maps/place/I+Y+M+INGENIERIA+Y+MINERALES+SAS/@4.790699,-74.19351,15z"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand-red)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--brand-red-bright)]"
        >
          Cómo llegar <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
      <div className={compact ? "h-[320px]" : "h-[420px]"}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d490358.48522844707!2d-74.19351!3d4.790699!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f818ac4f3ed91%3A0xcfbf89c4b902da94!2sI%20Y%20M%20INGENIERIA%20Y%20MINERALES%20SAS!5e1!3m2!1ses-419!2sco!4v1777397313202!5m2!1ses-419!2sco"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación IM Ingeniería y Minerales SAS"
        />
      </div>
    </div>
  );
}
