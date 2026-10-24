# Hevy Fit (Bullas) — estado del trabajo

Última actualización: 22/09/2026 (lanzamiento en producción). Para retomar en otra sesión: leer este archivo, `CLAUDE.md` y `ficha.json` (sus `notas` recogen de dónde sale cada dato).

## En producción
- **https://hevyfit.com** — dominio registrado en Cloudflare (cuenta de Eugenio, Lagartijagames@gmail.com), zona activa.
- `www.hevyfit.com` redirige con 301 al dominio sin www (lo hace el propio Worker, variable `CANONICO`).
- Desplegar: `node scripts/produccion.mjs hevy-fit-bullas`. Construye con `PRODUCCION=true`, borra las páginas internas, comprueba que no queda `noindex` y que están el sitemap y el robots.txt, y sube el Worker `hevy-fit-bullas` (`clientes/hevy-fit-bullas/wrangler.jsonc`).
- Solo build: `node scripts/produccion.mjs hevy-fit-bullas --solo-build` → `dist/hevy-fit-bullas/`.
- El Worker (`scripts/worker-sitio.mjs`) solo se interpone en `/video/*`, para las peticiones parciales (Range) de los recorridos. El resto lo sirve directamente el servidor de estáticos.
- `/clasica/` (la versión antigua, de comparación interna) **no se publica**: está en `ficha.paginas_internas` y el script la borra de `dist` y la deja fuera del sitemap.
- Auditoría sobre el dominio real: Lighthouse móvil **100 / 100 / 100 / 100**, sin ningún fallo. Traza con Slow 4G y CPU 4x: **LCP 1,15 s, CLS 0**, TTFB 36 ms.

## Demo publicada
- Portada: https://webs-locales-demo.webs-locales.workers.dev/hevy-fit-bullas-k7m2qx/
- Salas: `/pilates/`, `/training/`, `/barre/`, `/fuerza/` · Social Club: `/social-club/` (antes `/eventos/`) · Versión antigua: `/clasica/`
- Desplegar: `node scripts/demo.mjs hevy-fit-bullas` (reconstruye todas las demos y sube el Worker `webs-locales-demo`).
- Construir en local: `CLIENTE=hevy-fit-bullas npm run build` → `dist/hevy-fit-bullas/`. Servir: `npx serve -l 4321 dist/hevy-fit-bullas`.

## Qué hay hecho
- Material del cliente (zip de Drive del 22/09): fotos seleccionadas por sala en `fotos/<tema>/` (convertidas de HEIC), originales y vídeos en `material/` (fuera de git). Página `/social-club/` con 14 fotos sin agrupar (faltan nombres y fechas de cada evento).
- Vídeos web en `public/video/` (H.264, 1080p y 720p, fotograma clave cada 12 imágenes para poder moverse por ellos): recorrido de Barre en luz cálida y magenta, y el recorrido del estudio de Pilates (IMG_0027, recortado a 20 s).
- Recorrido con scroll (`[data-recorrido]` en `Sala.astro`): visor `position: sticky` en una pista de 320dvh; el tiempo del vídeo sigue al scroll con un solo salto en curso por clip. En Barre, la luz magenta se funde en el último tramo.
- El Worker de las demos (`scripts/worker-demo.mjs`) atiende peticiones parciales (Range) de los vídeos: sin ellas Chrome no permite moverse por el vídeo.
- Pase de fotos con fundido en los marcos de cada sala de la portada.
- Portada como recorrido por salas: hero con el paneo de la recepción **de fondo a pantalla completa y velado** (izquierda listones/espejos/césped → derecha neón, disolvencia, 4,5 s) con el titular encima; cifras (4,9 · 157 reseñas · 4 espacios · +500 m²), bloque por sala (Pilates → Training Club → Barre → Fuerza) con fotos, tarifas y horario, reseñas de Google en carrusel, mapa con la fachada y pie.
- El velo del hero (`.velo` en `HeroPaneo.astro`) va de 90 % arriba a negro bajo el titular: deja ver la recepción y garantiza el contraste sea cual sea el fotograma. `sizes` declara el 106 % real (antes 60vw, y por eso se veían blandas) y la calidad baja a 42: la candidata de 1600 px pesa 155 kB, dentro del presupuesto del hero.
- El fondo cambia de color según la sala visible (`CambioSala.astro` + variables en `global.css`).
- Horarios en rejilla de horas por días; cada clase es un enlace a WhatsApp con mensaje prellenado. Datos en `src/lib/datos.ts`.
- Cada clase lleva un punto: **verde = grupo activo**, **rojo = grupo inactivo** (parado, se abre si hay interés; el mensaje de WhatsApp de esas celdas pide justamente abrirlo). Leyenda común en `LEYENDA`.
- Solo WhatsApp como contacto (sin botones de llamar). **«Inscribirme»** en todos los botones (antes «Reservar») → https://hevyfitbullas.es/register.
- Páginas por sala (`src/pages/[sala].astro`) con galería completa (`src/lib/fotos.ts`) y página del Social Club (`src/pages/social-club/`) con hueco para fotos y vídeos.
- Aviso legal con titular Alexandra Klicova, NIF X8625569V.
- Reseñas en carrusel horizontal con ajuste al soltar (scroll-snap) y flechas; sin JS se arrastra igual. Tarjetas de 22rem (tres a la vista en escritorio, una y pico en móvil): el relleno lateral del carril se calcula desde el mismo `max-w-6xl` del titular, así la primera reseña queda a plomo con él y las siguientes asoman. Fuera la de Aida Llamas (hablaba de los bonos), entra la de Liz Inkle (real, en inglés, con `lang="en"`).
- Fotos: carpeta nueva `fotos/training-zone/` (las dos que estaban en fuerza y son de la Training Zone; en la web va solo la frontal, dentro de Training Club). Fuera de Barre la del rincón de los sillones, una repetida y una de cada pareja casi idéntica; fuera de fuerza la repetida (`gimnasio.jpg` = `fuerza-09.jpg`).
- `public/video/pilates-clase-*.mp4` recortado de 45 s a 20 s (corte limpio desde el segundo 0, sin recodificar): el recorrido con scroll va ahora a 9,1 s de vídeo por pantalla, el mismo ritmo que Barre, y los archivos pesan la mitad.
- Auditoría última (22/09, tarde): Lighthouse móvil Accesibilidad 100 / Buenas prácticas 100 / SEO 63 (solo por el `noindex` de demo; 100 en producción). Traza con Slow 4G y CPU 4x: LCP 1,13 s, CLS 0.
- Aviso al auditar: en modo `navigation`, Lighthouse a veces marca `color-contrast` en «Dónde estamos» con un gris `#312d31`. Es el texto a medio fundido de los `reveal` con `animation-timeline: view()`, captado mientras la herramienta va haciendo scroll. Con la página quieta el texto está a opacidad 1 y el modo `snapshot` da accesibilidad 100 sin fallos.

## Pendiente / ideas acordadas
- **Analítica sin resolver.** Cloudflare Web Analytics está creado para hevyfit.com (`site_tag b841c4d2…`, token en `ficha.analitica_token`) pero no llega a medir: con `auto_install` Cloudflare no inyecta el beacon cuando el origen es un Worker, y el snippet manual falla porque el edge reserva `/cdn-cgi/rum` y responde 404 antes de que el Worker pueda reenviarlo. Se probó las dos vías y se retiró para no dejar un error en consola. Alternativas: servir la web desde Cloudflare Pages (ahí la inyección automática sí funciona, pero habría que resolver las peticiones Range de los vídeos de otra forma) o usar otra analítica sin cookies.
- **Cuadrar la ficha de Google Business con la web (§7).** Hoy no coinciden: Google dice «Hevy Fit Gym Boutique», «Av. Luis de los Reyes, 6, bajo» y sábado hasta las 14:00; la web dice «Hevy Fit», «bajos 6, 11 y 40» y sábado hasta las 13:00. Los textos de la web los pidió Eugenio, así que lo que toca es actualizar la ficha de Google.
- **Dar de alta hevyfit.com en Google Search Console** y enviar `https://hevyfit.com/sitemap-index.xml`.
- **Decidir qué pasa con hevyfit.es**, que sigue en pie con la web vieja (habla de Paracuellos del Jarama). Lo sano es redirigirlo a hevyfit.com o darlo de baja, para que no compita en Google.
- **Fotos propias de la Training Zone**: Eugenio dijo que las pasaría. Van en `fotos/training-zone/` y se suman en `src/lib/fotos.ts` (actividad `training`).
- Confirmar con Eugenio: dijo «Training Club 09:05» y la fila real es **9:20** (no hay 9:05); se ha quitado el grupo de lunes y miércoles en esa fila.
- Índice lateral de secciones: propuesto solo en escritorio, puntos con la luz de la sala actual.
- Agrupar las fotos del Social Club por evento y fecha cuando Eugenio las dé.
- Fotos y vídeos nuevos del Social Club (Eugenio los enviará): montar la galería en `/social-club/`, agrupada por evento y fecha.
- Más fotos por sala: añadirlas a `src/lib/fotos.ts`.
- Vídeos para el hero y para "encender la sala": guion en `fotos/guion-video.md`.
- Ideas propuestas y no hechas: "Hoy en Hevy Fit" (clases de hoy bajo el hero), encendido de fotos con el scroll, indicador de sala fijo, reseñas con palabras en el color de su sala, reserva directa por actividad si la app lo permite.

## Fuentes de los datos
- Google Business (nombre, teléfono, horario, coordenadas, reseñas en español via Places API v1 con `GOOGLE_MAPS_API_KEY`).
- Tarifas: carruseles de Instagram de septiembre de 2026. Acceso libre 40 €/mes y dúo 114 €/mes por persona: confirmados por Eugenio.
- La web hevyfit.es está desactualizada: no usar.
- Horarios: imágenes enviadas por Eugenio (Temporada 26/27 para Training Club; septiembre para Pilates y Barre) y los cambios de grupos activos/inactivos que dictó el 22/09 por la tarde.

## Entorno necesario en otra máquina
- Node 24, `npm install` en la raíz del repo.
- Variable `GOOGLE_MAPS_API_KEY` (solo para consultar Google Places).
- Wrangler autenticado en la cuenta de Cloudflare para desplegar.
- MCP de `.mcp.json`: chrome-devtools (capturas y Lighthouse), gmaps, astro-docs, higgsfield.

## Despliegue (24/10/2026)
- Cloudflare Builds conectado a este repo, rama `claude/project-thread-9n2u92`: cada push a esa rama construye y publica `hevy-fit-bullas` en hevyfit.com.
- Compilación: `CLIENTE=hevy-fit-bullas PRODUCCION=true npm run build`. Despliegue: `npx wrangler deploy -c clientes/hevy-fit-bullas/wrangler.jsonc`. Sin compilaciones de vista previa.
