import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SiteLayout, PageHero, LocationMap } from "@/components/site/SiteLayout";
import { services } from "@/data/services";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Solicita tu cotización | IM Ingeniería" },
      { name: "description", content: "Conversemos sobre tu próximo proyecto. Un ingeniero senior te responderá en menos de 24 horas. +57 311 688 4440" },
      { property: "og:title", content: "Contacto | IM Ingeniería" },
      { property: "og:description", content: "Solicita una cotización sin compromiso para tu próximo proyecto de construcción o ingeniería." },
    ],
  }),
  component: ContactoPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Nombre muy corto").max(100),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(7, "Teléfono inválido").max(30),
  service: z.string().min(1, "Selecciona un servicio"),
  message: z.string().trim().min(10, "Cuéntanos un poco más").max(1500),
});

function ContactoPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  };

  const inputCls = "w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[var(--brand-red)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-red)]/20";

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contacto"
        title="Conversemos sobre tu"
        highlight="próximo proyecto."
        description="Cuéntanos qué necesitas. Un ingeniero senior te responderá en menos de 24 horas con información clara y sin compromiso."
      />

      <section className="bg-muted py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
          {/* Form */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-10">
            <h2 className="text-2xl font-extrabold text-[var(--brand-navy-deep)] sm:text-3xl">Solicita tu cotización</h2>
            <p className="mt-2 text-sm text-muted-foreground">Completa el formulario y prepararemos una propuesta técnica para tu proyecto.</p>

            {sent ? (
              <div className="mt-8 flex items-start gap-4 rounded-2xl border border-[var(--brand-red)]/20 bg-[var(--brand-red)]/5 p-6">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-[var(--brand-red)]" />
                <div>
                  <p className="font-semibold text-[var(--brand-navy-deep)]">¡Solicitud enviada!</p>
                  <p className="mt-1 text-sm text-muted-foreground">Gracias por contactarnos. Un ingeniero senior te responderá en menos de 24 horas.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Nombre completo *</label>
                  <input id="name" name="name" maxLength={100} placeholder="Ej. María González" className={`mt-1.5 ${inputCls}`} />
                  {errors.name && <p className="mt-1 text-xs text-[var(--brand-red)]">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="company" className="text-sm font-medium text-foreground">Empresa</label>
                  <input id="company" name="company" maxLength={120} placeholder="Opcional" className={`mt-1.5 ${inputCls}`} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email *</label>
                  <input id="email" name="email" type="email" maxLength={255} placeholder="tu@email.com" className={`mt-1.5 ${inputCls}`} />
                  {errors.email && <p className="mt-1 text-xs text-[var(--brand-red)]">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">Teléfono *</label>
                  <input id="phone" name="phone" maxLength={30} placeholder="+57 300 000 0000" className={`mt-1.5 ${inputCls}`} />
                  {errors.phone && <p className="mt-1 text-xs text-[var(--brand-red)]">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="service" className="text-sm font-medium text-foreground">Servicio de interés *</label>
                  <select id="service" name="service" defaultValue="" className={`mt-1.5 ${inputCls}`}>
                    <option value="" disabled>Selecciona un servicio</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Otro">Otro / Asesoría</option>
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-[var(--brand-red)]">{errors.service}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Cuéntanos sobre tu proyecto *</label>
                  <textarea id="message" name="message" rows={5} maxLength={1500} placeholder="Tipo de proyecto, ubicación, plazos estimados…" className={`mt-1.5 ${inputCls}`} />
                  {errors.message && <p className="mt-1 text-xs text-[var(--brand-red)]">{errors.message}</p>}
                </div>
                <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">Al enviar aceptas nuestra política de tratamiento de datos.</p>
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-red)] px-7 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-transform hover:scale-[1.02] hover:bg-[var(--brand-red-bright)]">
                    Enviar solicitud <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-[var(--brand-navy-deep)] p-8 text-white shadow-[var(--shadow-elegant)]">
              <h3 className="text-xl font-extrabold">Información de contacto</h3>
              <p className="mt-2 text-sm text-white/70">También puedes escribirnos o llamarnos directamente.</p>
              <ul className="mt-6 space-y-5">
                {[
                  { icon: Phone, label: "Teléfono", value: "+57 311 688 4440", href: "tel:+573116884440" },
                  { icon: Mail, label: "Email", value: "comercial3@imingenieria.com", href: "mailto:comercial3@imingenieria.com" },
                  { icon: MapPin, label: "Oficina", value: "Autopista Medellín Km 10.5, Tenjo, Cundinamarca" },
                  { icon: Clock, label: "Horario", value: "Lun a Vie · 7:30 a 17:30" },
                ].map((c) => (
                  <li key={c.label} className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-red)] shadow-[var(--shadow-red)]">
                      <c.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red-bright)]">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="mt-0.5 block text-sm text-white hover:underline">{c.value}</a>
                      ) : (
                        <p className="mt-0.5 text-sm text-white">{c.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://wa.me/573116884440"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl border-2 border-dashed border-[var(--brand-red)]/40 bg-card p-6 text-center font-semibold text-[var(--brand-navy-deep)] transition-colors hover:bg-[var(--brand-red)] hover:text-white"
            >
              💬 ¿Necesitas respuesta rápida? Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* MAPA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-red)]">Cómo llegar</p>
            <h2 className="mt-3 text-3xl font-extrabold text-[var(--brand-navy-deep)] sm:text-4xl">Visita nuestras oficinas</h2>
            <p className="mt-4 text-muted-foreground">Estamos sobre la Autopista Medellín, a pocos minutos de Bogotá.</p>
          </div>
          <div className="mt-10">
            <LocationMap />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}