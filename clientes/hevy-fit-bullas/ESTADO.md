# Hevy Fit (Bullas) — estado del trabajo

Última actualización: 22/09/2026. Para retomar en otra sesión: leer este archivo, `CLAUDE.md` y `ficha.json` (sus `notas` recogen de dónde sale cada dato).

## Demo publicada
- Portada: https://webs-locales-demo.webs-locales.workers.dev/hevy-fit-bullas-k7m2qx/
- Salas: `/pilates/`, `/training/`, `/barre/`, `/fuerza/` · Eventos: `/eventos/` · Versión antigua: `/clasica/`
- Desplegar: `node scripts/demo.mjs hevy-fit-bullas` (reconstruye todas las demos y sube el Worker `webs-locales-demo`).
- Construir en local: `CLIENTE=hevy-fit-bullas npm run build` → `dist/hevy-fit-bullas/`. Servir: `npx serve -l 4321 dist/hevy-fit-bullas`.

## Qué hay hecho
- Portada como recorrido por salas: hero con paneo de la recepción (izquierda listones/espejos/césped → derecha neón, disolvencia, 4 s), cifras (4,9 · 157 reseñas · 4 salas · +400 m²), bloque por sala (Pilates → Training Club → Barre → Fuerza) con fotos, tarifas y horario, reseñas de Google, mapa con la fachada y pie.
- El fondo cambia de color según la sala visible (`CambioSala.astro` + variables en `global.css`).
- Horarios en rejilla de horas por días; cada clase es un enlace a WhatsApp con mensaje prellenado. Datos en `src/lib/datos.ts`.
- Solo WhatsApp como contacto (sin botones de llamar). Reservas → https://hevyfitbullas.es/register.
- Páginas por sala (`src/pages/[sala].astro`) con galería completa (`src/lib/fotos.ts`) y página de eventos (`src/pages/eventos/`) con hueco para fotos y vídeos.
- Aviso legal con titular Alexandra Klicova, NIF X8625569V.
- Auditoría última: Lighthouse móvil 99 / 100 / 100 (SEO 63 solo por el `noindex` de demo; 100 en producción), LCP 2,1 s, CLS 0.

## Pendiente / ideas acordadas
- Fotos y vídeos de eventos (Eugenio los enviará): montar la galería en `/eventos/`, agrupada por evento y fecha.
- Más fotos por sala: añadirlas a `src/lib/fotos.ts`.
- Vídeos para el hero y para "encender la sala": guion en `fotos/guion-video.md`.
- Ideas propuestas y no hechas: "Hoy en Hevy Fit" (clases de hoy bajo el hero), encendido de fotos con el scroll, indicador de sala fijo, reseñas con palabras en el color de su sala, reserva directa por actividad si la app lo permite.
- Producción (§9 de CLAUDE.md): dominio del cliente, quitar `noindex`, sitemap y robots.

## Fuentes de los datos
- Google Business (nombre, teléfono, horario, coordenadas, reseñas en español via Places API v1 con `GOOGLE_MAPS_API_KEY`).
- Tarifas: carruseles de Instagram de septiembre de 2026. Acceso libre 40 €/mes y dúo 114 €/mes por pareja: confirmados por Eugenio.
- La web hevyfit.es está desactualizada: no usar.
- Horarios: imágenes enviadas por Eugenio (Temporada 26/27 para Training Club; septiembre para Pilates y Barre).

## Entorno necesario en otra máquina
- Node 24, `npm install` en la raíz del repo.
- Variable `GOOGLE_MAPS_API_KEY` (solo para consultar Google Places).
- Wrangler autenticado en la cuenta de Cloudflare para desplegar.
- MCP de `.mcp.json`: chrome-devtools (capturas y Lighthouse), gmaps, astro-docs, higgsfield.
