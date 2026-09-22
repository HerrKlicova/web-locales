# Hevy Fit (Bullas) — estado del trabajo

Última actualización: 22/09/2026 (tarde). Para retomar en otra sesión: leer este archivo, `CLAUDE.md` y `ficha.json` (sus `notas` recogen de dónde sale cada dato).

## Demo publicada
- Portada: https://webs-locales-demo.webs-locales.workers.dev/hevy-fit-bullas-k7m2qx/
- Salas: `/pilates/`, `/training/`, `/barre/`, `/fuerza/` · Eventos: `/eventos/` · Versión antigua: `/clasica/`
- Desplegar: `node scripts/demo.mjs hevy-fit-bullas` (reconstruye todas las demos y sube el Worker `webs-locales-demo`).
- Construir en local: `CLIENTE=hevy-fit-bullas npm run build` → `dist/hevy-fit-bullas/`. Servir: `npx serve -l 4321 dist/hevy-fit-bullas`.

## Qué hay hecho
- Material del cliente (zip de Drive del 22/09): fotos seleccionadas por sala en `fotos/<tema>/` (convertidas de HEIC), originales y vídeos en `material/` (fuera de git). Página `/eventos/` con 14 fotos sin agrupar (faltan nombres y fechas de cada evento).
- Vídeos web en `public/video/` (H.264, 1080p y 720p, fotograma clave cada 12 imágenes para poder moverse por ellos): recorrido de Barre en luz cálida y magenta, y el recorrido de la sala de Pilates (IMG_0027, 45 s).
- Recorrido con scroll (`[data-recorrido]` en `Sala.astro`): visor `position: sticky` en una pista de 320dvh; el tiempo del vídeo sigue al scroll con un solo salto en curso por clip. En Barre, la luz magenta se funde en el último tramo.
- El Worker de las demos (`scripts/worker-demo.mjs`) atiende peticiones parciales (Range) de los vídeos: sin ellas Chrome no permite moverse por el vídeo.
- Pase de fotos con fundido en los marcos de cada sala de la portada.
- Portada como recorrido por salas: hero con paneo de la recepción (izquierda listones/espejos/césped → derecha neón, disolvencia, 4 s), cifras (4,9 · 157 reseñas · 4 salas · +400 m²), bloque por sala (Pilates → Training Club → Barre → Fuerza) con fotos, tarifas y horario, reseñas de Google, mapa con la fachada y pie.
- El fondo cambia de color según la sala visible (`CambioSala.astro` + variables en `global.css`).
- Horarios en rejilla de horas por días; cada clase es un enlace a WhatsApp con mensaje prellenado. Datos en `src/lib/datos.ts`.
- Solo WhatsApp como contacto (sin botones de llamar). Reservas → https://hevyfitbullas.es/register.
- Páginas por sala (`src/pages/[sala].astro`) con galería completa (`src/lib/fotos.ts`) y página de eventos (`src/pages/eventos/`) con hueco para fotos y vídeos.
- Aviso legal con titular Alexandra Klicova, NIF X8625569V.
- Auditoría última: Lighthouse móvil 99 / 100 / 100 (SEO 63 solo por el `noindex` de demo; 100 en producción), LCP 2,1 s, CLS 0.

## Pendiente / ideas acordadas
- Decidir cómo queda el recorrido en la portada: Eugenio lo ve como un freno al flujo y pidió un botón para activarlo; propuesta alternativa (22/09): vídeo en bucle en el marco de la portada y recorrido con scroll solo en las páginas de sala.
- Índice lateral de secciones: propuesto solo en escritorio, puntos con la luz de la sala actual.
- Agrupar las fotos de eventos por evento y fecha cuando Eugenio las dé.
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
