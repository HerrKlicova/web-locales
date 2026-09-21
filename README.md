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
  ficha.json                ← datos reales del negocio (huecos "[TELÉFONO]" si faltan)
  fotos/                    ← fotos cedidas o generadas (prompts en fotos/prompts.md)
  public/                   ← favicon y estáticos del cliente
  src/pages/index.astro     ← la página, montada con los componentes de la plantilla
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

## Capturas y auditoría

Las capturas de comprobación (390 px y 1440 px), el informe Lighthouse y la traza de rendimiento se guardan en `capturas/` (ignorado por git).
