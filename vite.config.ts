// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Slugs de servicios — deben coincidir con src/data/services.ts
const serviceSlugs = [
  "construccion",
  "plantas-concreteras",
  "bodegas",
  "silos",
  "rolado-lamina",
  "movimiento-tierra",
  "corte-doblez-lamina",
  "alquiler-maquinaria",
  "proyectos-llave-en-mano",
];

export default defineConfig({
  // Deshabilita el plugin de Cloudflare Workers (incompatible con hosting compartido)
  // para que la salida sea archivos estáticos puros.
  cloudflare: false,

  // Opciones que se pasan directamente al plugin de TanStack Start
  tanstackStart: {
    prerender: {
      enabled: true,
      // Sigue automáticamente todos los links internos encontrados en cada página
      crawlLinks: true,
      // Rutas de inicio + slugs dinámicos de servicios (que el crawler no descubre solo)
      routes: [
        "/",
        "/nosotros",
        "/servicios",
        "/proyectos",
        "/contacto",
        ...serviceSlugs.map((slug) => `/servicios/${slug}`),
      ],
    },
  },
});
