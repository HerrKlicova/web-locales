# Corto Y Cambio (Yecla) — estado del trabajo

Lead 04. Peluquería y estética de Alberto Rico, C. de S. Ramón, 172. Última actualización:
23/09/2026 por la tarde, sesión de la nube. Para retomar: leer este archivo, `CLAUDE.md`, `ficha.json`,
`investigacion.md` y `fotos/prompts.md`.

## Dónde está

**Web terminada con sus seis fotos, sin desplegar.** Falta solo el despliegue de la demo, que
necesita el token de Cloudflare (ver abajo).

- Fotos: A-a (portada, retocada), D1 y D2 (comparador), B, C y D (servicios), aprobadas por
  Eugenio y revisadas a la vista. Todo sale de A-a, para que el fondo sea el mismo salón: D1 es
  una edición de A-a y D2 una edición de D1, compuesta para que fuera del pelo sea D1 píxel a
  píxel. Detalle en `fotos/prompts.md`. Créditos de Higgsfield: 28 de 30.
- Datos de Google **comprobados el 23/09 a las 16:30** (búsqueda de mapas de Google): nombre,
  dirección, teléfono, horario de cada día, 4,8 con 80 reseñas y coordenadas, idénticos a
  `ficha.json`. No se ha cambiado nada.

## Bloqueos

- **Despliegue**: wrangler no tiene sesión y no hay `CLOUDFLARE_API_TOKEN` ni
  `CLOUDFLARE_ACCOUNT_ID` en el entorno. Se añaden en el menú del entorno → Edit (como
  variables) y valen para la sesión siguiente; o se despliega desde el Mac con
  `node scripts/demo.mjs corto-y-cambio-yecla`.
- El MCP de chrome-devtools no arranca en la nube (busca Chrome en /opt/google/chrome y corre
  como root): capturas, Lighthouse y trazas se han hecho con Playwright y Lighthouse por
  terminal, con el Chromium de /opt/pw-browsers.
- Faltan en el repo `rotacion.md`, `clientes/peluqueria-victor-manuel-caravaca/`, la web del
  taller y el CLAUDE.md de 14 secciones (el del repo tiene 11). Tampoco están instalados
  frontend-design, impeccable, claude-seo, emil-design-eng ni review-animations: sus pasadas se
  han hecho a mano con los criterios del CLAUDE.md que hay y del encargo.
- En la nube, el `fetch` de Node no pasa por el proxy salvo con `NODE_USE_ENV_PROXY=1` (lo
  necesita `fotos/descargar.mjs`).

## Qué hay hecho

- `ficha.json` tal cual el encargo (8 reseñas literales, con sus faltas, saltos de línea y
  dobles espacios), más `valoracion`, `num_resenas` y `demo_token` (`r46mx7`).
- **Dirección: EL CAMBIO. La página es la fachada**: negro arriba (cabecera, portada,
  comparador y servicios) y piedra abajo (horario, reseñas, dudas, dónde y pie), con un solo
  cambio de material: la junta, un filete de piedra al sol de 4 px. Sin bandas alternas, sin
  nada pegado ni atado al scroll, sin rejilla de paños, sin columna fija y sin vídeo.
- **Paleta** de la foto de su fachada: fachada `#0D0505`, amarillo `#E6C00F` / `#F0C806`, placa
  `#343434`, piedra al sol `#F4DCB5` (texto sobre negro y filete de la junta), piedra a la
  sombra `#BF9F78` (secundario sobre negro). El fondo de piedra es `#DFC49D` (60 % sol, 40 %
  sombra): la piedra al sol se parecía al crema `#F1E9DF` de Salutem, así que se tira hacia la
  sombra. El amarillo solo en la línea, la C, el botón principal y la fila de hoy; nunca texto
  sobre piedra (allí los botones son negros).
- **Letra**: Bodoni Moda variable (eje de tamaño óptico: a 132 px usa el corte de trazo fino)
  solo en los titulares de la mitad negra; Albert Sans 400 y 600 para todo lo demás. No se ha
  podido mirar en `rotacion.md` si alguna ya estaba usada: en el repo no aparece ninguna de las
  dos (Argos: Fraunces + Alegreya Sans; Hevy Fit: Unbounded + Manrope; Salutem: Hanken Grotesk
  + Source Serif 4).
- **Su C de cuatro trazos** en SVG con las medidas del encargo (`src/lib/marca.ts`): cabecera,
  tirador del comparador, dibujo de la fachada en «Dónde», favicon y la imagen de WhatsApp.
- **El comparador** (`Comparador.astro`): después a la izquierda y antes a la derecha, porque
  es el gesto del barrido (la línea va a la derecha y deja atrás el cambio). Tirador: la C
  amarilla sobre un disco negro de 64 px. Arrastre con dedo o ratón, toque para saltar,
  `<input type="range">` real («Comparar antes y después», con aria-valuetext),
  `touch-action: pan-y pinch-zoom`, varias parejas con botones, «Antes»/«Después» y «Imagen de
  muestra» encima. Sin JS, las dos fotos una debajo de otra con sus etiquetas.
- **El barrido**: capa en blanco y negro que retira la línea con dos transform opuestos (nunca
  clip-path). Portada: una vez al cargar, 860 ms, ease-out cúbico; solo con JS y sin reducción
  de movimiento. Fotos de sección: atado al scroll con `animation-timeline: view()` dentro de
  `@supports`. Horario: la línea por debajo de la fila de hoy (scaleX). Servicios en
  escritorio: la línea por debajo al pasar el ratón.
- **Sin GSAP**: todo es CSS salvo el comparador, el horario, la barra de WhatsApp y el mapa:
  3,3 KB de JS en línea (1,5 KB comprimido).
- Textos con su voz (investigacion.md): «Empieza el cambio.», «Luz, movimiento y dimensión.»,
  «respetando siempre tu base natural», «fácil de mantener», «cada cabello es un mundo»,
  «observa el cambio». El dolor (mechas que no gustan, tinte demasiado oscuro) va en el
  comparador. «Transformar» no sale. Despedida «Corto y cambio.» una sola vez, en el pie.
- SEO: `<title>` «Corto Y Cambio — Peluquería y estética en Yecla», un solo h1 («Peluquería y
  estética en Yecla»), schema `HairSalon` con NAP de Google, `areaServed` Yecla, horario,
  pago, acceso en silla de ruedas, Instagram y la carta sin precios. Etiquetas og para la
  tarjeta de WhatsApp (imagen: la fachada con la C, sin fotos de muestra). `noindex` en demo.

## Medidas (con las fotos de verdad, 23/09)

- Lighthouse móvil: **Rendimiento 100, Accesibilidad 100, Buenas prácticas 100, SEO 63** (el 63
  es solo el `noindex` de la demo; en producción, 100). LCP simulado 1,9 s, CLS 0,001, TBT 0,
  194 KiB en total.
- web-vitals con CPU 4x y Slow 4G, en móvil: **LCP 1,52 s, CLS 0,002, INP 32 ms** tocando el
  comparador en cinco puntos, arrastrándolo con el dedo y moviéndolo con el teclado.
- Hero en móvil: la candidata más grande (1080×1350) pesa 63 KB en AVIF y 101 KB en WebP (tope,
  200 KB). Anchos intermedios (640 y 780) para que el móvil de 412 px a 1,75 no salte a 960.
- Comparador: con teclado se llega en 9 tabuladores; flechas, Inicio, Fin y AvPág funcionan y
  el anillo del foco se ve en el tirador. A 320 px, con eventos táctiles reales: un
  deslizamiento vertical encima del comparador hace scroll (la línea no se mueve), el
  arrastre horizontal mueve la línea sin mover la página y un toque la lleva a ese punto. Sin
  JS: las dos fotos una debajo de otra con sus etiquetas.
- Capturas a 390 y 1440 revisadas; sin desborde horizontal.

## Pendiente

1. **Desplegar la demo** (hace falta el token): `node scripts/demo.mjs corto-y-cambio-yecla` →
   `https://webs-locales-demo.webs-locales.workers.dev/corto-y-cambio-yecla-r46mx7/`.
2. Pegar la fila de abajo en `rotacion.md`.
3. Preguntas para Alberto (`investigacion.md`, al final): el horario de Fresha, precios y
   servicios de estética, prueba de peinado de novia, el premio de escaparates de 2022, el fijo
   968 75 06 56, y sus antes y después reales, permiso para la fachada y el logo en vectorial.
4. En producción: sus fotos en lugar de las de muestra (el comparador ya admite varias parejas
   en `Comparador.astro`), quitar «Imagen de muestra» y la línea del pie, y rellenar el aviso
   legal.

## Fila para rotacion.md

| Lead | Negocio | Estructura | Letra | Paleta | Elemento memorable | Vídeo |
|---|---|---|---|---|---|---|
| 04 | Corto Y Cambio (Yecla) | la fachada: negro arriba y piedra abajo con un solo cambio de material; comparador antes/después con tirador en C; barrido de blanco y negro a color; sin vídeo, sin pin, sin rejilla | Bodoni Moda (titulares de la mitad negra) + Albert Sans | fachada #0D0505, amarillo #E6C00F/#F0C806, placa #343434, piedra #DFC49D (sol #F4DCB5, sombra #BF9F78) | el comparador | no |

(Las columnas pueden no coincidir con las de `rotacion.md`, que no está en el repo: ajustarlas
al pegarla.)

## Comandos

```bash
CLIENTE=corto-y-cambio-yecla npm run build        # → dist/corto-y-cambio-yecla/
npx serve -l 4321 dist/corto-y-cambio-yecla        # servir en local
NODE_USE_ENV_PROXY=1 node clientes/corto-y-cambio-yecla/fotos/descargar.mjs   # volver a traer las fotos
node scripts/demo.mjs corto-y-cambio-yecla         # construir todas las demos y desplegar
```

## Fuentes de los datos

- Nombre, dirección, teléfono, horario, valoración y reseñas: su ficha de Google, según el
  encargo del 23/09/2026; todo menos las reseñas, comprobado en Google el mismo día.
- Frases de su Instagram: dadas en el encargo.
- Fotos: generadas con Higgsfield (`fotos/prompts.md`). Nada de su Instagram ni de Google Maps.
