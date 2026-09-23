# Registro de rotación

Una línea por web publicada. **Leer este archivo antes de decidir la dirección visual de una web nueva** (§4 del CLAUDE.md) y anotar la línea nueva al terminar.

Las reglas, en corto: no repetir dirección si el sector coincide con una de las tres últimas, y dos webs seguidas nunca comparten paleta ni pareja de tipografías, aunque sean de sectores distintos.

**Dos reglas más, añadidas el 22/09/2026 después de repetir paleta sin darme cuenta:**

1. **Antes de fijar nada, listar `clientes/*/` y comprobar que todas las webs están en esta tabla.**
   Esta tabla se rellena a mano y se queda corta. Fiarse de ella sin mirar las carpetas fue justo
   lo que falló con el taller: Clínica Salutem no estaba anotada, se comparó contra las tres
   filas que sí había y salió «ningún color repetido» cuando la web inmediatamente anterior era
   crema + verde, igual que la que se estaba haciendo.
2. **La estructura también rota.** El color y la tipografía no bastan: si el esqueleto es siempre
   cabecera fina → hero a dos columnas → pila de secciones al mismo ancho con el h2 arriba a la
   izquierda → una sección invertida → rejilla de fotos → rejilla de reseñas → mapa a dos
   columnas → pie, todas las webs se sienten iguales aunque cambien de color. La columna
   «Estructura» de abajo existe para eso y se comprueba igual que la paleta.

| # | Negocio | Sector | Municipio | Dirección | Paleta | Tipografías | Estructura |
|---|---|---|---|---|---|---|---|
| 1 | Barbería Argos (demo ficticia, muestra de estilo) | Barbería | Caravaca de la Cruz | Rótulo de escaparate: pan de oro sobre verde botella, pizarra de precios | Verde botella `#0f3d2e` + pan de oro `#c8a04a` | Display de rótulo + sans de texto | Pila de secciones a ancho fijo |
| 2 | Hevy Fit | Gimnasio / Pilates | Bullas | Marca propia real (logo y fotos del cliente), gimnasio boutique. Una luz por sala y el fondo cambia con el scroll | Negro `#0e0a10` + neón magenta `#fa01ff`; por sala, ámbar `#f0b35a`, azul `#5ad0ff` y verde `#b6f04a` | Unbounded 700 (display extendida) + Manrope | Recorrido: una sala por bloque, el fondo cambia con el scroll |
| 3 | Clínica Salutem | Fisioterapia | Caravaca de la Cruz | La columna vertebral de su logotipo como hilo. **Movimiento:** articular vértebra a vértebra (el enrollado de columna del pilates) y una respiración de 2,6 s al encender cada vértebra | Verde `#2b6034` sobre crema `#f1e9df` | Hanken Grotesk + Source Serif 4 | Columna fija a la izquierda que recorre portada y once especialidades en un solo bloque; debajo, pila de secciones con filete arriba |
| ~~—~~ | ~~Taller Sánchez Carreño (1.er intento, descartado)~~ | Taller mecánico | Caravaca de la Cruz | Placa esmaltada | ~~Verde `#2e4739` sobre hueso `#e8e3d9`~~ **repetía la 3** | Big Shoulders Display + IBM Plex Sans | ~~Pila de secciones~~ **repetía la 3** |
| ~~—~~ | ~~Taller Sánchez Carreño (2.º intento, sustituido)~~ | Taller mecánico | Caravaca de la Cruz | La orden de reparación | ~~Mesa gris, papel autocopiativo, bolígrafo y sello~~ | ~~Courier Prime + Archivo~~ | ~~Documento~~. Eugenio pidió rehacerla con el capó; guardada fuera del repo |
| 4 | Taller mecánico Sánchez Carreño | Taller mecánico | Caravaca de la Cruz | **La insignia**: los tres colores de su logotipo de Instagram (rueda roja, llave y destornillador blancos sobre negro). Sigue entrando **bajo el capó** (vídeo atado al scroll); el gesto de toda la web es **encender**: piezas del motor, testigos del cuadro, la aguja del reloj, el piloto del plano y el rótulo del pie | Negro puro `#000`, blanco `#f4f4f2`, rojo de la rueda `#d2101a`; fotos y vídeo en **blanco y negro** (LUT propia); ámbar `#f2a51a` solo en el testigo de motor | Mona Sans (instancias propias «SC Grotesk»): ancha 700 para titulares + normal 400/600 | **Escena a pantalla completa pegada** con vídeo atado al scroll; resto a sangre: panel de testigos, foto a media pantalla, **esfera de 24 h** a media pantalla, mosaico de fotos de borde a borde, filas de pregunta y reseña, **plano de calles propio** a media pantalla y el nombre de lado a lado |
| ~~—~~ | ~~Taller Sánchez Carreño (3.er intento, sustituido el 23/09/2026 por la tarde)~~ | Taller mecánico | Caravaca de la Cruz | Bajo el capó, con los colores de la nave | ~~Nave `#141517`, chapa `#ece6da`, óxido `#d9733f`, verde de pared `#3a6549`~~ | ~~Barlow Condensed 700 + Barlow~~ | La misma escena del capó |
| 3b | Clínica Salutem, **variante 3D** (misma clínica que la 3, no es una web nueva) | Fisioterapia | Caravaca de la Cruz | La columna de su logotipo hecha objeto: una columna vertebral de hueso natural sobre un halo difuminado del verde del logo, que gira (vídeo Higgsfield) y al bajar se convierte en los once puntos del logo. **Movimiento:** el giro de 4 s, la transformación vértebra a vértebra atada al scroll (GSAP), reseñas que se escriben al bajar | La de la 3, más `#21492a` de fondo en el cierre | Las de la 3 | **A sangre**: portada con titular enorme y la pieza de pie a la derecha, tramo en el que la pieza se hace logotipo, columna fija a la derecha de las especialidades (en el móvil se despliega: cada vértebra junto a su especialidad), frase a pantalla completa, mosaico de fotos de borde a borde |
| 5 | Peluquería de Caballeros Víctor Manuel | Peluquería de caballeros | Caravaca de la Cruz | **El escaparate**: su fachada vista desde la acera. Arriba, su rótulo de caja de luz (azul noche, su nombre en letra de pincel blanca); debajo, la cristalera de perfiles finos con paños de vinilo esmerilado y, detrás del cristal, el peluquero cortando a tijera (vídeo en bucle, Kling). La puerta es WhatsApp, con el cartel colgado de «abierto / cerrado» a la hora de Madrid. **Movimiento:** encender (halo del rótulo, luz de dentro, cada paño al entrar, la fila de hoy del horario) | Blanco de fachada frío `#eef2f5`, azul noche del rótulo `#1b2f44` para texto y perfiles, esmerilado `#e2e8ed`; rojo de sillón `#b3261e` solo en el «hoy» del horario | Satisfy (solo su nombre) + Chivo 400/700/800 | **Escaparate:** rejilla de paños con vídeo en bucle detrás del cristal; sin pin ni scroll atado. Toda la página es la misma rejilla (4 × N en escritorio, 2 en móvil), con travesaño entre bloques; las fotos, detrás de varios paños como la portada; plano propio de OpenStreetMap en claro (el taller tiene otro, en negro) con la peluquería marcada con su rótulo |

## Comprobación de la fila 3 (22/09/2026)

- **Sector:** taller mecánico. No aparece en las tres últimas (barbería, gimnasio). Libre.
- **Paleta:** verde taller + óxido + gris grasa sobre hueso sucio. La 1 era verde botella + pan de
  oro y la 2 negro + magenta neón. Ningún color se repite y el fondo es claro por primera vez.
- **Tipografías:** condensada de letrero + IBM Plex Sans. La 2 usaba una display **extendida**
  (Unbounded) y Manrope; una condensada es justo lo contrario, y la de texto también cambia.
- **Riesgo que hay que vigilar:** el verde se repite entre la 1 (botella, `#0f3d2e`) y la 3
  (taller, `#2e4739`), aunque no sean seguidas ni el mismo tono. La próxima web que toque verde
  se cambia de familia de color.

## Comprobación de la fila 4 (23/09/2026)

Hecha contra `clientes/*/` y no solo contra la tabla (regla 1). La web anterior es Salutem.
- **Paleta:** Salutem es crema claro con verde de texto. Esta es oscura (nave `#141517`) con chapa y
  óxido. El verde sale una sola vez, como banda de la pared del horario, y es un verde de pintura de
  pared sacado de la foto, no el color de la marca.
- **Tipografías:** Barlow Condensed + Barlow no se ha usado en ninguna fila.
- **Estructura:** Salutem es una pila de secciones al mismo ancho. Esta es una escena a pantalla
  completa pegada con vídeo atado al scroll, un cuadro de testigos a sangre y secciones partidas a
  media pantalla. Ninguna fila anterior tiene vídeo atado al scroll salvo Hevy Fit, que lo usa en
  las páginas de sala y con otra lógica (recorrido por la sala, no un objeto que se abre).

## Comprobación de la fila 4, rehecha (23/09/2026, tarde)

Eugenio pidió pasarla a los colores de su Instagram: fondo negro, blanco y rojo, «más elegante».
Hecha contra `clientes/*/`, no solo contra la tabla (regla 1).
- **La anterior en la tabla (3b, Salutem 3D):** verde `#2b6034` sobre crema, Hanken Grotesk + Source
  Serif 4. Nada en común: fondo negro, sin verde, otra familia.
- **Hevy Fit (2):** también sobre negro, pero con neón magenta y Unbounded + Manrope; no es seguida y
  aquí el acento es el rojo de su logotipo, no un neón.
- **Vigilar: Peluquería Víctor Manuel** (`clientes/peluqueria-victor-manuel-caravaca`, en obras en
  otra sesión y aún sin fila): azul marino `#1b2f44` sobre claro con un rojo ladrillo `#b3261e`,
  Chivo + Satisfy. Base, tipografías y sector distintos, pero las dos llevan un rojo. El del taller
  no se puede mover (es su marca); si la peluquería sale seguida en la tabla, que su rojo quede en
  segundo plano o cambie de familia.
- **Estructura:** la escena del capó se queda (la pidió Eugenio); lo nuevo es la esfera del horario,
  el plano propio y el feed de Instagram, que no tiene ninguna otra web.

## Comprobación de la fila 5 (23/09/2026)

Hecha contra `clientes/*/`, no solo contra la tabla (regla 1). La web anterior es el taller rehecho
(fila 4: negro, blanco y el rojo `#d2101a` de su logotipo, Mona Sans).
- **Paleta:** fondo claro y frío con azul noche, frente al negro puro del taller y al crema con verde
  de Salutem. Sin verde (la 1, Argos, es verde botella). Las dos últimas llevan un rojo: el del
  taller es su marca y no se mueve, así que el de aquí queda **en segundo plano**, como pidió la nota
  de la fila 4: solo el «hoy» del horario (una palabra) y el sillón de las fotos. Las estrellas
  van en azul y el «abierto» es un cartel colgado, no un piloto rojo (el taller usa pilotos).
- **Tipografías:** Satisfy + Chivo no se han usado en ninguna fila.
- **Sector:** la barbería Argos (fila 1) no está entre las tres últimas. Aun así no comparte nada:
  ni pan de oro, ni pizarra, ni verde, ni fondo oscuro.
- **Estructura:** nueva. Ninguna web anterior es una rejilla de paños; el taller es una escena pegada
  con vídeo atado al scroll y aquí el vídeo es un bucle que no sigue al scroll. Lo único compartido
  con el taller es la receta del plano de OpenStreetMap, dibujado aquí en claro y con otro marcador.
- **Movimiento:** las dos webs «encienden» cosas (lo pidió Eugenio en las dos). Aquí es la luz de un
  escaparate (rótulo, paños, fila de hoy), sin pilotos.
