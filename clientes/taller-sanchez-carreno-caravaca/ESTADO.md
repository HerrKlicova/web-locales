# Taller mecánico Sánchez Carreño (Caravaca de la Cruz) — estado del trabajo

Última actualización: 23/09/2026 (tarde). Para retomar en otra sesión: leer este archivo, `CLAUDE.md`,
`rotacion.md`, `ficha.json` (sus `notas` dicen de dónde sale cada dato) e `investigacion.md`.

**Lead 02.** La versión «insignia» está terminada, comprobada y **publicada** (23/09/2026, 16:40):
https://webs-locales-demo.webs-locales.workers.dev/taller-sanchez-carreno-caravaca-q4r8tz/

## Versión actual: la insignia (23/09/2026, tarde)

Eugenio pidió pasarla a los colores de su Instagram (@carrenomotor.1988): **fondo negro, blanco y
rojo, más elegante, a todo lo ancho y con animaciones**, manteniendo las fotos y el vídeo. Se
mantiene la escena del capó y el cuadro; cambia todo lo demás.

- **Colores:** los tres de su logotipo. Negro puro `#000`, blanco `#f4f4f2`, rojo de la rueda
  `#d2101a`. Ámbar `#f2a51a` solo en el testigo de motor (en un coche real es ámbar).
- **Fotos y vídeo en blanco y negro**, las mismas de antes etalonadas: `fotos/bn/etalonaje.mjs`
  (función + LUT en `material/bn.cube`) y `fotos/capo/procesar.sh … --bn`. Los originales en color
  siguen en `fotos/`; los vídeos en color se quitaron de `public/` y se regeneran con procesar.sh.
- **Logotipo** redibujado en vectorial desde su foto de perfil: `src/lib/logo.mjs` (lo usan la
  página, `public/favicon.svg`, `apple-touch-icon.png` y la tarjeta de WhatsApp `public/og.jpg`,
  que sale de `fotos/logo/og.html`; iconos con `node fotos/logo/iconos.mjs`).
- **Tipografía:** Mona Sans (OFL) en tres cortes propios renombrados «SC Grotesk», 18 KB cada uno:
  `src/fuentes/` (script `instancias.py` y licencia `OFL.txt`). Ancha 700 para titulares.
- **El gesto de toda la web es encender:** los puntos rojos de las piezas del motor, los testigos,
  el arco de la esfera hora a hora y su aguja, el piloto del plano y el nombre del pie.

### La página, de arriba abajo
1. **Cabecera** (`Cabecera.astro`): insignia y nombre; en escritorio, fija, con anclas, teléfono y
   «Pedir cita» (su frase de la bio), en línea sobre el capó y en rojo al salir de él.
2. **El capó** (`Capo.astro`): igual que antes, en B/N; marco vertical u horizontal según la
   **orientación** (no el ancho); con el coche pequeño solo quedan los puntos de luz.
3. **El cuadro** (`Cuadro.astro`): testigos rojos, el de motor en ámbar.
4. **Lo que hacemos** (`Trabajos.astro`): foto con la persiana que sube (solo transform).
5. **Horario** (`Horario.astro`): esfera de 24 h, tramo 7-15 encendido y aguja con la hora de
   Caravaca; «Abierto ahora / Ahora está cerrado» con piloto blanco; la cita, con su frase de la bio.
6. **El taller** (`Taller.astro`): mosaico de borde a borde en escritorio, tira en móvil.
7. **Preguntas** (`Preguntas.astro`): cada duda con la reseña que la contesta; la frase que contesta
   en blanco y el resto de la reseña en gris, entera. Cuatro preguntas, todas en castellano.
8. **Instagram** (`Instagram.astro`): su feed de verdad con el visor oficial de perfil, **al pulsar**
   (antes no se pide nada a Meta). Para producción, si da acceso a su cuenta, se puede pintar con el
   diseño de la web usando la API de Instagram (token largo + reconstrucción diaria).
9. **Dónde estamos** (`Donde.astro`): plano propio de OpenStreetMap (`mapa/plano.mjs` →
   `src/components/plano.json`; datos en `material/mapa/osm.json`), sin iframe de Google.
10. **Pie** (`Pie.astro`): el nombre de lado a lado, que se enciende; en móvil en dos líneas.

### Comprobaciones (23/09/2026, tarde, sobre la versión construida y servida con gzip)
- Lighthouse móvil: **Rendimiento 100, Accesibilidad 100, Buenas prácticas 100**; SEO 63 solo por
  el `noindex` de demo.
- Chrome real con 4G lenta y CPU ×4 (390 × 844): **LCP 0,80-0,84 s, CLS 0, INP 16-32 ms**.
  JS total 6 KB en línea; HTML 34 KB con gzip (Tailwind acotado a `src/` con `source("../")`).
- Sin scroll horizontal a 320, 360, 375, 390, 768 y 1440; horizontal 844 × 390 y zoom al 200 %
  (720 × 450) con el coche a tamaño completo. Consola limpia (el visor de Instagram, una vez
  pulsado, escribe errores suyos dentro de su iframe).
- Sin JS se lee todo; con movimiento reducido, capó abierto en foto fija y fundidos vivos; al
  recargar a media página no queda nada en blanco.
- Enlaces: sin anclas muertas; WhatsApp con tres mensajes (pedir cita, luz del cuadro, presupuesto).
- Texto (§5): cero palabras y construcciones prohibidas en el texto propio. «soluciones» solo sale
  dentro de la reseña literal de Jonathan José Diaz Jumbo; la raya larga, solo en el `<title>` (§9).
- Crítica `impeccable` (dos agentes): 24/32 antes del pulido; arreglados sus 5 problemas
  prioritarios (iconos a 360 px, capó en pantallas bajas, textos no respaldados, pareja de
  preguntas y parte baja). Copia en `.impeccable/critique/`.

### Pendiente de confirmar con el dueño (no se publica hasta entonces)
- El «1988» del nombre de su Instagram: ¿año de apertura?
- El fijo 968 703 251, el correo tallersanchezcarreno@gmail.com y la **financiación** de
  reparaciones (post de 2024: hasta 1000 € en 12 meses, mínimo 180 €).
- Coches de ocasión (destacados «OCASIÓN» y «VENDIDO» en su Instagram).
- La reseña de Santi Torralba sigue en MAYÚSCULAS, como en Google.
- Fotos reales del taller; producción (§11): dominio, quitar `noindex`, aviso legal con titular y NIF.

### Publicar
Publicada el 23/09/2026 a las 16:40 (versión del Worker `9a861de6…`), cuando la sesión de la
peluquería Víctor Manuel ya había terminado: salió también su demo, y las otras cuatro se
comprobaron idénticas a lo publicado antes de subir. Para la próxima vez:
`scripts/demo.mjs` reconstruye y publica **todas** las demos; con otras sesiones trabajando, mejor
solo la propia: `CLIENTE=taller-sanchez-carreno-caravaca DEMO=true PRODUCCION= npx astro build`
(ya hecho el 23/09 a las 16:21) y luego `npx wrangler deploy`, que sube `dist/demo` entero: antes,
comprobar que las demás carpetas de `dist/demo` son lo último publicado.

### Ronda de textos de Eugenio (23/09/2026, tarde) — sin publicar todavía
- Hero: «Profesionales del sector. De lunes a viernes, de 7:00 a 15:00.» («Profesionales» sale de
  las reseñas de Pedro Miguel y My Life).
- «Sin sorpresas al pagar» pasa a «sin sorpresas», en el remate del capó y en el cuadro.
- El cuadro: «¿Se te ha encendido un testigo?».
- Lo que hacemos: debajo de la lista, solo el enlace «Consúltanos en WhatsApp».
- Horario: solo «Sin cerrar a mediodía.»
- Fotos: el título pasa de «La nave» a «El taller» y el aviso queda en «Fotografías de muestra.»
- Preguntas: fuera la pregunta en inglés (reseña de Dominic Olds).

---

## Versión anterior: el capó en color (23/09/2026, mañana)


Eugenio pidió rehacerla **desde cero**, con Higgsfield, **a pantalla completa** y con **el capó
abriéndose al bajar del hero**. De las ideas que se le propusieron (`ideas.md`) eligió solo
**el cuadro al girar la llave**. Lo que hay más abajo en este archivo describe versiones anteriores
(la primera, descartada por calcar a Clínica Salutem, y la orden de reparación, guardada fuera del
repo en el scratchpad de la sesión: `taller-orden-reparacion/`).

**Demo:** https://webs-locales-demo.webs-locales.workers.dev/taller-sanchez-carreno-caravaca-q4r8tz/

### La página, de arriba abajo
1. **El capó** (`Capo.astro`). Escena a pantalla completa y pegada en una pista de 280svh. El
   scroll mueve el vídeo fotograma a fotograma; el titular se va; en pantallas verticales el coche
   sube al centro mientras se abre; al final se señalan filtro de aire, aceite, refrigerante y
   batería (punto ámbar y línea que se dibuja) y aparece «Abrimos, miramos y te lo explicamos».
2. **El cuadro** (`Cuadro.astro`). Seis testigos en SVG. Al llegar se encienden todos, como al dar
   el contacto, y se apagan uno a uno; queda la luz de motor en ámbar: «¿Se te ha encendido esta
   luz?», con WhatsApp.
3. **Lo que hacemos** (`Trabajos.astro`): foto a media pantalla y los tres trabajos, sin precios.
4. **Horario** (`Horario.astro`): pintado como la pared de la nave (zócalo verde y franja de óxido),
   con «7:00» y «15:00» enormes y el día de hoy marcado.
5. **La nave** (`Taller.astro`): tira de cinco fotos de borde a borde; en móvil se desliza.
6. **Lo que preguntan antes de traer el coche** (`Preguntas.astro`): cinco dudas reales contestadas
   con las cinco reseñas reales.
7. **Dónde estamos** (`Donde.astro`) y **pie** (`Pie.astro`) con el nombre a todo lo ancho.

### Cómo se hizo el vídeo
Fotogramas de `nano_banana_2` (mismo plano, capó cerrado y abierto) y **Kling 3.0 pro** entre los
dos (8,75 créditos). FLUX 3 Video falló tras 12 minutos en cola y devolvió los 45 créditos.
`fotos/capo/procesar.sh` lo lleva a 1920 × 1080, saca la versión de escritorio (4,1 MB) y un
recorte 4:5 para móvil (1,3 MB) con fotograma clave cada 4 cuadros, y los fotogramas inicial y
final. El original y los fotogramas de Higgsfield están en `material/capo/` (fuera de git).

### Decisiones que conviene no deshacer
- **El encuadre depende de la orientación, no del ancho.** Toda pantalla vertical usa el marco 4:5;
  un 16:9 cubriendo una pantalla vertical cortaba el coche en una tablet de pie.
- **El primer fotograma es un `<img>` precargado** y el vídeo se pide cuando la página ya ha pintado.
  Mientras no carga, el scroll funde la foto cerrada con la abierta: nunca se señalan piezas sobre
  un capó cerrado.
- **El estado por defecto del cuadro es el final** (solo la luz de motor). El JS lo apaga todo antes
  de que llegues y hace la secuencia una vez; si no corre, se ve bien igual.
- **Sin GSAP**: nada lo necesitaba. Todo el JS de la página son 3,5 KB en línea.
- **Movimiento reducido** (§7): sin recorrido ni secuencia del cuadro; capó abierto en foto fija.
  Los fundidos y los hover siguen vivos.

### Comprobaciones (23/09/2026)
- Texto: cero palabras y construcciones prohibidas (§5).
- Lighthouse móvil sobre la demo: Accesibilidad 100, Buenas prácticas 100, Agentic 100; SEO 66 solo
  por el `noindex` de demo.
- Traza con 4G lenta y CPU 4x: **LCP 1,99 s, CLS 0**. La foto del LCP en móvil pesa 33 KB.
- Sin scroll horizontal en 320, 390, 768 y 1440. Consola limpia. Sin anclas muertas. Un solo `h1`.
- Recargar con el scroll a mitad: el capó aparece a medio abrir, nada en blanco.

### Pendiente
- `review-animations` (paso 6 de §2) no está instalada en la sesión: el repaso del movimiento se hizo
  a mano con el checklist de Emil. `impeccable` tampoco se ha pasado todavía.
- La reseña de Santi Torralba sigue en MAYÚSCULAS, como en el original.
- Fotos reales del taller cuando las ceda (las de la nave son de muestra y la web lo dice).
- `fotos/fachada.jpg` ya no se usa en ningún sitio.

---

## Demo publicada
- https://webs-locales-demo.webs-locales.workers.dev/taller-sanchez-carreno-caravaca-q4r8tz/
- Desplegar: `node scripts/demo.mjs taller-sanchez-carreno-caravaca`.
- Construir en local: `CLIENTE=taller-sanchez-carreno-caravaca npm run build` → `dist/taller-sanchez-carreno-caravaca/`.

## Hecho

### 1. Datos reales (§10) — `ficha.json`
Ficha de Google consultada con gmaps y con la API de Places en español
(`place_id ChIJna5YNf6sZQ0Rfbld1M-BhPM`):
- **4,9 con 99 reseñas.** Teléfono y dirección confirmados.
- **Horario real: lunes a viernes de 7:00 a 15:00, sábado y domingo cerrado.** Esto zanja la
  contradicción de los directorios: el que decía L-V 7-15 acertaba; el de 9-14/16-20 con sábados
  es falso y no se usa.
- Coordenadas `38.098276, -1.866577` y `maps_url` por CID.
- **5 reseñas reales con nombre**, en su español original. Dos están recortadas (emojis y una
  frase final muy larga), ninguna reescrita.

### 2. Investigación (§3) — `investigacion.md`
Reseñas de 7 talleres de Caravaca, incluidas las de 1★ y 2★, que es donde están los dolores.
Lo que hay que retener:
- La palabra del sector es **confianza**, casi siempre con posesivo: «mi taller de confianza».
- El miedo n.º 1 es **que el presupuesto se dispare**: «me mencionaron un precio, al momento de
  pagar fue casi el doble».
- El n.º 2 es que **te cambien piezas sin saber qué falla**.
- **El diferenciador real de este taller es el horario.** Casi toda la competencia abre a las 9 y
  cierra a mediodía; este abre a las **7:00** y hace jornada continua hasta las **15:00**.
- El archivo tiene una tabla de «lo que puede decir esta web y de dónde sale». **Respetarla**: todo
  lo que se escriba tiene que salir de una reseña real o de la ficha de Google.

### 3. Dirección visual (§4) — anotada en `rotacion.md`, fila 4

**El primer intento se descartó entero.** Había quedado calcado de Clínica Salutem: fondo crema
+ verde y la misma pila de secciones. Medido, los fondos estaban a distancia 12 sobre 441 y los
verdes a 26: la misma paleta. Pasó porque Salutem no estaba anotada en `rotacion.md` y se dio la
tabla por buena sin mirar `clientes/*/`, y porque la rotación no cubría la estructura. Las dos
cosas están arregladas en `rotacion.md`, con reglas nuevas y una columna «Estructura».

Lo que hay ahora es **la orden de reparación**: la web es el impreso que te dan al dejar el
coche, en papel continuo con las bandas perforadas, encima de la mesa del taller.
- **Paleta:** mesa `#33373d` de fondo (el fondo ya no es claro), papel autocopiativo `#dbe3ea`,
  tinta de bolígrafo `#1d3a6b` para lo rellenado y `#b3241f` para el sello.
- **Tipografías:** Courier Prime, que es lo mecanografiado del impreso, y Archivo para el
  membrete y los titulares.
- **Estructura:** un documento, no secciones. Campos con etiqueta, puntos de guía y dato;
  casillas `[X]` para los trabajos; sello de goma rojo para el horario; «ejemplar para el
  cliente» en el pie.

### 4. Fotos (§6) — `fotos/`, prompts en `fotos/prompts.md`
Siete imágenes de Higgsfield, todas con la misma luz (mediodía por el portón) y la misma paleta.
No hay ninguna foto real cedida todavía.

| Archivo | Qué es |
|---|---|
| `taller-hero.jpg` (1376×768) | La nave con el coche en el elevador. **La mejor.** |
| `taller-nave.jpg` (928×1152) | Otra vista de la nave, vertical |
| `manos-motor.jpg` | Manos con la llave sobre el motor |
| `carro-herramienta.jpg` | Carro verde con el cajón de llaves abierto |
| `elevador.jpg` | El coche elevado, visto de lado |
| `banco-trabajo.jpg` | Banco con el tornillo y piezas |
| `fachada.jpg` (1376×768) | Nave de carretera con monte seco detrás |

Revisión hecha (§6). Lo que salió:
- El primer `banco-trabajo` traía la marca **RECORD** grabada y legible en el tornillo de banco.
  Regenerado prohibiendo explícitamente cualquier letra grabada. El nuevo está limpio.
- Manos revisadas: cinco dedos en las dos, anatomía correcta.
- Sin matrículas legibles ni rótulos en ninguna.
- El modelo que acabó ejecutando es `nano_banana_flash`, aunque se pidiera `nano_banana_2`.

**Cuidado con `fachada.jpg`:** no es la fachada real del taller, que está en una avenida urbana.
Va en la galería, **nunca** en «Dónde estamos» presentándola como su puerta. Ahí va el mapa solo.

### 5. La web (`src/`)
Una sola página, con el orden de §10 y una sola acción en todo el recorrido: WhatsApp o llamar.
Los bloques son los campos del impreso:
- **Membrete y cabecera de la orden:** nombre del taller, «ORDEN DE REPARACIÓN», el titular y los
  campos ENTRADA / SALIDA / VALORACIÓN, con el sello rojo «Abierto desde las 7». El gancho es el
  horario, que es lo único que de verdad distingue a este taller en Caravaca.
- **Trabajos que se realizan:** tres casillas `[X]`, sin un solo precio.
- **Adjunto · el taller:** la foto grande y cinco pequeñas, con marco de papel.
- **Observaciones de quien ya ha pasado por aquí:** cinco dudas reales de `investigacion.md`,
  contestada cada una con una reseña de Google completa y con su nombre. Resuelve a la vez el
  punto 5 y el punto 6 de §10 sin repetir las mismas frases dos veces en la página.
- **Dónde se entrega el vehículo** (mapa bajo demanda, sin foto de fachada) y **pie** con la
  letra pequeña.
- La `.hoja` de `global.css` es la pieza clave: el papel continuo, las perforaciones laterales
  caladas hasta la mesa y el rayado del papel de listado, todo con gradientes, sin imágenes.

### 6. Comprobaciones
- **Texto (§5):** cero palabras y cero construcciones prohibidas en el HTML generado. El único
  guion largo está en el `<title>`, que es el formato que pide §9.
- **Adversarial (§13):** consola limpia, sin anclas muertas, todas las imágenes con `alt`, un
  solo `h1`, jerarquía de encabezados correcta y sin scroll horizontal en 320, 390, 768 ni 1440.
  Todas las animaciones viven dentro de `@media (prefers-reduced-motion: no-preference)`.
- **Lighthouse móvil:** Accesibilidad 100, Buenas prácticas 100, Agentic 100. SEO 63 solo por el
  `noindex` de demo (100 en producción).
- **Traza con Slow 4G y CPU 4x, sobre la demo:** **LCP 829 ms, CLS 0,02.** El LCP pasó a ser el
  titular en vez de una imagen, porque la foto ya no está en la primera pantalla.

### Lo que se arregló por el camino
- Faltaba el espacio entre «¿Lo tuyo no está en la lista?» y el enlace: se leía todo pegado.
- «Hoy abrimos de 7:00–15:00» quedaba raro con el guion dentro de la frase: ahora «de 7:00 a 15:00».
- Había un `<p>` como hijo directo de un `<dl>`, que es HTML inválido y tiraba la accesibilidad a 96.
- El enlace del teléfono de la cabecera tenía dos textos (uno por breakpoint) y un lector de
  pantalla leía «686 30 94 62 Llamar».
- Con cinco preguntas, la última quedaba huérfana en la rejilla de dos columnas.
- El título repetía «Taller mecánico» dos veces.
- **LCP:** se quedaba en 2,3-2,6 s. Se arregló con tres cosas: precargar en el `<head>` la misma
  candidata que acaba pidiendo el `<picture>` (el hero pasó de `<Picture>` a `<picture>` a mano
  para poder casarlas), cortar las candidatas en 1000 px (el marco mide 358 en móvil y 448 en
  escritorio) y bajar la calidad del hero a 45. De 90 kB a 44 kB y de 2,6 s a 1,89 s.

## Lo que falta
1. **Decidir la reseña de Santi Torralba**, que está entera en MAYÚSCULAS en Google. Ahora mismo
   se muestra tal cual, en «¿Tardáis mucho?». O se deja así o se quita esa pregunta y quedan
   tres. Pasarla a minúsculas sería reescribirla, así que eso no se hace.
2. **Fotos reales del taller.** Las siete son de Higgsfield. En cuanto el cliente ceda fotos,
   se sustituyen (§6, prioridad 1) y se quita la de la fachada.
3. `impeccable`: no se ha pasado ni `critique` ni `polish` (paso 6 de §2).
4. Producción (§11), si compra: dominio, quitar `noindex`, sitemap y robots, y rellenar el aviso
   legal, que ahora lleva los huecos `[TITULAR]` y `[NIF]`.

## Decisiones tomadas que conviene no deshacer
- **Sin precios.** No hay ninguno publicado, así que la web no lleva ni uno. El bloque de
  servicios va sin columna de precio.
- **Servicios que sí se pueden nombrar**, porque salen de sus reseñas: mecánica general,
  reparación, y **pasar la ITV** (lo dice la reseña de My Life). Nada más.
- **Nada en inglés en la página.** Eugenio pidió quitar la pregunta en inglés (23/09/2026). La
  reseña de Dominic Olds sigue en la ficha, con su `texto_en`, pero no sale.
- La reseña de **Santi Torralba está en MAYÚSCULAS** en el original. Pendiente de decidir: o se
  muestra tal cual o se deja fuera. No se pasa a minúsculas, que sería reescribirla.
- Nada del Facebook (el coche abandonado hace 27 años) ni de Empresite (C.B. de hace ~7 años) se
  publica: no confirma la edad del taller.
