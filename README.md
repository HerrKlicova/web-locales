# Webs para negocios locales

Webs de una página para negocios de la Región de Murcia. Un solo proyecto Astro + Tailwind; cada cliente es una carpeta en `clientes/` y se construye desde la plantilla común. Las reglas de diseño, rendimiento y SEO están en `CLAUDE.md`.

## Estructura

```
plantilla/
  layouts/Layout.astro      ← <head>, fuentes, noindex de demo, schema JSON-LD
  components/               ← Hero, Precios, Horario, Galeria, Resenas, Mapa, Footer, Legal, BotonWhatsapp, Icono
  lib/ficha.ts              ← tipo Ficha y helpers (enlaces wa.me / tel:, huecos "[…]")
  lib/horario.ts            ← parseo de "Martes a viernes" y "9:30–14:00 y 17:00–20:30"
  lib/schema.ts             ← LocalBusiness / BarberShop… a partir de la ficha
  styles/global.css         ← tokens (@theme), rótulo pan de oro, pizarra, azulejo, reveals
clientes/<slug>/
  ficha.json                ← datos reales del negocio (huecos "[TELÉFONO]" si faltan) y demo_token
  fotos/                    ← fotos cedidas o generadas (prompts en fotos/prompts.md)
  public/                   ← favicon y estáticos del cliente
  src/pages/index.astro     ← la página, montada con los componentes de la plantilla
scripts/demo.mjs            ← construye y despliega las demos
wrangler.jsonc              ← Worker de estáticos que sirve las demos
```

## Comandos

La variable `CLIENTE` elige la carpeta. La salida va a `dist/<slug>/`.

```bash
CLIENTE=barberia-argos-caravaca npm run dev
```

```bash
CLIENTE=barberia-argos-caravaca npm run build
```

Producción (quita el `noindex`; el sitemap y `robots.txt` se añaden en ese momento):

```bash
CLIENTE=barberia-argos-caravaca PRODUCCION=true npm run build
```

## Demo en Cloudflare (§9)

Un solo Worker de estáticos, `webs-locales-demo` (`wrangler.jsonc`), sirve todas las demos bajo una ruta no adivinable `/<slug>-<demo_token>/`, con cabecera `X-Robots-Tag: noindex`, meta `noindex` y sin sitemap. El token de seis caracteres se guarda en `ficha.json` para que la URL no cambie entre despliegues.

```bash
node scripts/demo.mjs barberia-argos-caravaca
```

El script reconstruye todas las demos que tengan `demo_token` y las sube juntas (cada despliegue sustituye el contenido entero del Worker). Con `--solo-build` solo construye en `dist/demo/`.

Para tener las URL `demo.[MARCA].es/<slug>-<token>` del CLAUDE.md basta con añadir ese dominio al Worker desde el panel de Cloudflare; las rutas ya coinciden.

## Capturas y auditoría

Las capturas de comprobación (390 px y 1440 px), el informe Lighthouse y la traza de rendimiento se guardan en `capturas/` (ignorado por git).
