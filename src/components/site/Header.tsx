import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@/assets/logo-im.png";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/servicios", label: "Servicios" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
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
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
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
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
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