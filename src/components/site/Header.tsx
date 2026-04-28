import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import logo from "@/assets/logo-im.png";
import { services } from "@/data/services";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/servicios", label: "Servicios", hasDropdown: true },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[var(--brand-navy-deep)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--brand-navy-deep)]/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="IM Ingeniería y Minerales S.A.S." className="h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/" && pathname.startsWith(item.to));
            const baseCls = `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
            }`;

            if ("hasDropdown" in item && item.hasDropdown) {
              return (
                <div key={item.to} className="relative group">
                  <Link to={item.to} className={`${baseCls} inline-flex items-center gap-1`}>
                    {item.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  {/* Dropdown */}
                  <div className="invisible absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-[var(--shadow-elegant)]">
                      <div className="grid grid-cols-2 gap-1 p-3">
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            to="/servicios/$slug"
                            params={{ slug: s.slug }}
                            className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-muted"
                          >
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--brand-red)]" />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-[var(--brand-navy-deep)] group-hover/item:text-[var(--brand-red)]">
                                {s.title}
                              </p>
                              <p className="line-clamp-1 text-xs text-muted-foreground">{s.short}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="flex items-center justify-between border-t border-border bg-muted px-5 py-3">
                        <p className="text-xs text-muted-foreground">¿No encuentras lo que buscas?</p>
                        <Link
                          to="/servicios"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-red)] hover:gap-2 transition-all"
                        >
                          Ver todos los servicios <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link key={item.to} to={item.to} className={baseCls}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-red)] px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-red)] transition-transform hover:scale-[1.03] hover:bg-[var(--brand-red-bright)]"
          >
            Solicitar cotización <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-md p-2 text-white"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[var(--brand-navy-deep)] px-4 py-4">
          <div className="flex flex-col gap-1">
            {nav.map((item) => {
              if ("hasDropdown" in item && item.hasDropdown) {
                return (
                  <div key={item.to}>
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                        <Link
                          to="/servicios"
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-2 text-xs font-semibold text-[var(--brand-red-bright)] hover:bg-white/10"
                        >
                          Ver todos los servicios
                        </Link>
                        {services.map((s) => (
                          <Link
                            key={s.slug}
                            to="/servicios/$slug"
                            params={{ slug: s.slug }}
                            onClick={() => setOpen(false)}
                            className="rounded-md px-3 py-2 text-xs text-white/70 hover:bg-white/10 hover:text-white"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/contacto"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-red)] px-5 py-3 text-sm font-semibold text-white"
            >
              Solicitar cotización <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
