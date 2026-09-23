# Corto Y Cambio (Yecla) — estado del trabajo

Lead 04. Peluquería y estética de Alberto Rico, C. de S. Ramón, 172. Última actualización:
23/09/2026, sesión de la nube. Para retomar: leer este archivo, `CLAUDE.md`, `ficha.json`,
`investigacion.md` y `fotos/prompts.md`.

## Dónde está

**Fotos generadas, las 6**: A-a (portada), D1 y D2 (comparador) aprobadas por Eugenio; B, C y D
(servicios) hechas y pendientes de su revisión (hoja en `fotos/prompts.md`). Todo sale de A-a,
para que el fondo sea el mismo salón: D1 es una edición de A-a y D2 una edición de D1, compuesta
para que fuera del pelo sea D1 píxel a píxel. Créditos: 28 de 30.

La página está montada entera, con **huecos marcados** en lugar de las fotos (mismo tamaño que
las de verdad, así que al cambiarlas no se mueve nada). Sin desplegar.

## Bloqueos de la sesión de la nube (23/09)

- **CDN de Higgsfield bloqueado** (`d8j0ntlcm91z4.cloudfront.net`, `d2ol7oe51mr4n9.cloudfront.net`):
  las fotos se generan pero no se pueden ver ni descargar desde aquí. `fotos/descargar.mjs` las
  trae en cuanto haya acceso (rellenar `ELEGIDAS`).
- **Google**: sin `GOOGLE_MAPS_API_KEY` válida y `www.google.com` bloqueado. Horario, teléfono
  y valoración (4,8 con 80 reseñas) **no se han podido comprobar**; ficha.json va tal cual la dio
  Eugenio.
- **Despliegue**: `api.cloudflare.com` bloqueado y sin `CLOUDFLARE_API_TOKEN`.
- **El MCP de chrome-devtools no arranca** (busca Chrome en /opt/google/chrome y corre como
  root). Las capturas, Lighthouse y las trazas se han hecho con Playwright y Lighthouse por
  terminal, con el Chromium de /opt/pw-browsers.
- **Faltan en el repo**: `rotacion.md`, `clientes/peluqueria-victor-manuel-caravaca/`, la web
  del taller y el CLAUDE.md de 14 secciones (el del repo tiene 11). Tampoco están instalados
  frontend-design, impeccable, claude-seo, emil-design-eng ni review-animations: sus pasadas se
  han hecho a mano con los criterios del CLAUDE.md que hay y del encargo.

Se arregla en el menú del entorno → Edit: en Network access, esos dominios; como variables,
`GOOGLE_MAPS_API_KEY`, `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`. Vale para la sesión
siguiente.

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

## Medidas (con los huecos en lugar de las fotos)

- Lighthouse móvil: **Rendimiento 99, Accesibilidad 100, Buenas prácticas 100, SEO 63** (el
  63 es solo el `noindex` de la demo). LCP simulado 1,7 s, CLS 0,001, TBT 70 ms.
- web-vitals con CPU 4x y Slow 4G, en móvil: **LCP 636 ms, CLS 0, INP 40 ms** tocando el
  comparador en cinco puntos, arrastrándolo con el dedo y moviéndolo con el teclado.
- Comparador: con teclado se llega en 9 tabuladores; flechas, Inicio, Fin y AvPág funcionan y
  el anillo del foco se ve en el tirador. A 320 px, con eventos táctiles reales: un
  deslizamiento vertical encima del comparador hace scroll (la línea no se mueve), el
  arrastre horizontal mueve la línea sin mover la página y un toque la lleva a ese punto. Sin
  JS: las dos fotos una debajo de otra con sus etiquetas.
- **Hay que repetir LCP y el peso del hero con las fotos de verdad**: ahora el LCP es un hueco
  de 10 KB y el presupuesto del hero en móvil es de 200 KB.

## Pendiente

1. Revisar B, C y D (manos de cinco dedos, encaje, adorno, sin caras ni texto). Quedan 2
   créditos: da para repetir una.
2. Descargar las fotos (`fotos/descargar.mjs`), revisar cada una (§4: caras, manos, pelo, texto,
   45 % central) y ajustar los `alt` a lo que se vea (ahora describen el prompt).
3. Repetir capturas a 390 y 1440, Lighthouse y la traza con las fotos reales.
4. Comprobar horario, teléfono y valoración en Google. **Fresha da otro horario** (martes a
   jueves por la tarde desde las 16:00 y sábado hasta las 16:00): confirmarlo con Alberto.
5. Desplegar la demo: `node scripts/demo.mjs corto-y-cambio-yecla` → 
   `https://webs-locales-demo.webs-locales.workers.dev/corto-y-cambio-yecla-r46mx7/`.
6. Pegar la fila de abajo en `rotacion.md`.
7. Preguntas para Alberto: `investigacion.md`, al final.

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
node clientes/corto-y-cambio-yecla/fotos/descargar.mjs   # traer las fotos elegidas
node scripts/demo.mjs corto-y-cambio-yecla         # construir todas las demos y desplegar
```

## Fuentes de los datos

- Nombre, dirección, teléfono, horario, valoración y reseñas: su ficha de Google, según el
  encargo del 23/09/2026 (sin comprobar desde esta sesión).
- Frases de su Instagram: dadas en el encargo.
- Fotos: generadas con Higgsfield (`fotos/prompts.md`). Nada de su Instagram ni de Google Maps.
