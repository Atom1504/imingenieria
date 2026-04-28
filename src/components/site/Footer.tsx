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
            <li><Link to="/servicios/construccion" className="hover:text-white">Construcción</Link></li>
            <li><Link to="/servicios/plantas-concreteras" className="hover:text-white">Plantas Concreteras</Link></li>
            <li><Link to="/servicios/bodegas" className="hover:text-white">Bodegas Industriales</Link></li>
            <li><Link to="/servicios/silos" className="hover:text-white">Silos Industriales</Link></li>
            <li><Link to="/servicios/alquiler-maquinaria" className="hover:text-white">Alquiler de Maquinaria</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-[var(--brand-red-bright)]" /> +57 311 688 4440</li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-[var(--brand-red-bright)]" /> comercial3@imingenieria.com</li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[var(--brand-red-bright)]" /> Autopista Medellín Km 10.5, Tenjo, Cundinamarca</li>
            <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 text-[var(--brand-red-bright)]" /> Lun a Vie · 7:30 a 17:30</li>
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