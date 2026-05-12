import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo-im.png";

export function Footer() {
  return (
    <footer className="bg-[var(--brand-navy-deep)] text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <img src={logo} alt="IM Ingeniería" className="h-14 w-auto" />
          <p className="mt-4 text-sm leading-relaxed">
            Construcción, metalmecánica y maquinaria pesada para proyectos industriales y mineros en Colombia.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Empresa</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/nosotros" className="hover:text-white">Nosotros</Link></li>
            <li><Link to="/servicios" className="hover:text-white">Servicios</Link></li>
            <li><Link to="/proyectos" className="hover:text-white">Proyectos</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Servicios</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/servicios/$slug" params={{ slug: "construccion" }} className="hover:text-white">Construcción</Link></li>
            <li><Link to="/servicios/$slug" params={{ slug: "pisos-industriales" }} className="hover:text-white">Pisos Industriales</Link></li>
            <li><Link to="/servicios/$slug" params={{ slug: "bodegas" }} className="hover:text-white">Bodegas Industriales</Link></li>
            <li><Link to="/servicios/$slug" params={{ slug: "urbanismo" }} className="hover:text-white">Urbanismo</Link></li>
            <li><Link to="/servicios/$slug" params={{ slug: "movimiento-tierra" }} className="hover:text-white">Movimiento de Tierra</Link></li>
            <li><Link to="/servicios/$slug" params={{ slug: "alquiler-maquinaria" }} className="hover:text-white">Alquiler de Maquinaria</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-red-bright)]" /> 
              <div className="flex flex-col gap-1">
                <span>+57 311 688 4440</span>
                <span>+57 310 801 9954</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-red-bright)]" />
              <div className="flex flex-col gap-1">
                <span>comercial3@imingenieria.com</span>
                <span>proyectos@imingenieria.com</span>
              </div>
            </li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-red-bright)]" /> <span>Autopista Medellín Km 10.5,<br />Tenjo, Cundinamarca</span></li>
            <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--brand-red-bright)]" /> Lun a Vie · 7:30 am a 4:30 pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} IM Ingeniería y Minerales S.A.S. — Todos los derechos reservados.</p>
          <p>Construyendo confianza, una obra a la vez.</p>
        </div>
      </div>
    </footer>
  );
}