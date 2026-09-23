# Fotos — Corto Y Cambio (Yecla)

Generadas con Higgsfield el 23/09/2026. **No se ha usado ninguna foto de su Instagram ni de
Google Maps** (su fachada, su logo y la cabina de estética son fotos del propietario): no hay
permiso escrito (CLAUDE.md §4).

Modelo pedido: `nano_banana_2` a 2k. El servidor las resolvió con `nano_banana_flash`, como
pasó con Salutem; salen a 2752×1536 en 16:9.

**Tope de esta web: 30 créditos** (2 por foto). Gastados: **16** (A ×4 y D1 ×4). Quedan 14:
D2 (hasta 3 intentos = 6) y B, C y D (6) suman 12; hay margen para repetir una sola vez.

Luz y paleta comunes: pared negra mate, banda de piedra beige cálida abajo, luz cálida de
ventana por la izquierda. Es la fachada del salón: negro arriba y piedra abajo, como la web.

## Estado

Las fotos que hay ahora en esta carpeta son **huecos marcados**, del mismo tamaño que las de
verdad, para montar la página: en la sesión de la nube el CDN de Higgsfield
(`d8j0ntlcm91z4.cloudfront.net`) está bloqueado por la política de red y no se pueden
descargar ni mirar desde aquí. `descargar.mjs` las trae en cuanto haya acceso.

Hojas de contacto para elegir (las 4 variantes, con el recorte 4:5 del 45 % central marcado
en amarillo y recortado debajo):
- A: https://d2ol7oe51mr4n9.cloudfront.net/user_3JAuaMDVPdsAyTgWQOem3xzwisr/4f7fff2d-e7ae-4d1b-a737-eb11fad50d41.jpg
- D1: https://d2ol7oe51mr4n9.cloudfront.net/user_3JAuaMDVPdsAyTgWQOem3xzwisr/59f88d27-e502-4432-8b03-e1edf081eba8.jpg

## A — Portada 16:9 (4 variantes)

Prompt, tal cual:

> Documentary photograph inside a small, modern hair salon in a town in the Murcia region of
> Spain, late morning. Static camera at shoulder height, directly behind a seated adult woman:
> we only see the back of her head and shoulders, never her face. Her long, softly waved hair
> has a natural balayage: warm light-brown roots melting into sun-kissed honey-blonde lengths,
> glossy and healthy. The stylist's hands come in from the right, framed from the forearms
> down, holding a black round brush that lifts one section near the ends. Plain black cutting
> cape. Background softly out of focus: a matte black wall and, at the bottom, a band of warm
> beige natural stone. Warm window light from the left, gentle natural contrast. The head and
> hands sit within the central 45% of the frame width, with calm empty space on both sides. No
> mirrors anywhere, no reflections of people, no faces. No text, no signs, no logos, no brand
> names, no labelled bottles. Not a hipster barbershop: no tattoos, no exposed brick, no Edison
> bulbs. Realistic 35mm photography, natural colour, no HDR, no filters.

| Variante | Trabajo de Higgsfield |
|---|---|
| A-a | `218f1ce3-652b-4f7b-9e33-a31dfb9460f7` |
| A-b | `c2f6cc99-a040-48bf-b12b-02aab51f2ed5` |
| A-c | `e7a4fe9a-ce47-409c-a279-806fbb9c4c00` |
| A-d | `4675b377-dc6b-4f64-a210-d370c834b134` |

## D1 — Comparador, DESPUÉS, 16:9 (4 variantes)

> Documentary photograph inside a small, modern hair salon in a town in the Murcia region of
> Spain, late morning. Static camera at shoulder height, directly behind an adult woman seated
> in a salon chair with a low backrest that stays below the bottom of the frame: we only see
> the back of her head and shoulders, never her face. She sits upright and still, head
> straight, perfectly centred. Her long hair hangs loose down her back, straight with a soft
> wave at the ends, freshly blow-dried and brushed smooth: a luminous natural blonde with
> dimension, a slightly deeper soft golden-brown base at the roots blending seamlessly into
> lighter, sunlit blonde lengths, glossy and healthy, with clean, even ends. Plain black
> cutting cape over her shoulders. Nobody else in the frame: no stylist, no hands, no brush.
> Background softly out of focus: a matte black wall and, at the bottom, a band of warm beige
> natural stone. Warm window light from the left, gentle natural contrast. Her head, hair and
> shoulders sit within the central 45% of the frame width, with calm empty space on both
> sides. No mirrors anywhere, no reflections of people, no faces. No text, no signs, no logos,
> no brand names, no labelled bottles. Not a hipster barbershop: no tattoos, no exposed brick,
> no Edison bulbs. Realistic 35mm photography, natural colour, no HDR, no filters.

| Variante | Trabajo de Higgsfield |
|---|---|
| D1-a | `20851539-23bb-480f-90ee-ab5c1619c9da` |
| D1-b | `f196ee5f-a127-425d-862b-33c3a0ecbd07` |
| D1-c | `2c99a25e-0d40-4c48-8140-35616fa2a206` |
| D1-d | `c5738f46-ca0c-4e5a-8d94-6d9ecd478c52` |

## D2 — Comparador, ANTES (pendiente: se hace sobre la D1 elegida)

Edición de la D1 elegida, pasada como referencia (`image_references`). Como mucho 3 intentos.

> Edit this exact photograph. Keep everything identical: same framing and crop, same camera
> position, same woman, same posture and head position, same black cape, same matte black
> wall and warm beige stone band, same warm window light from the left, same image size.
> Change only the colour and condition of her hair, keeping exactly the same length,
> silhouette and position of every lock: the hair is now a flat, uniform dark brown with no
> shine and no dimension, about 3 cm of visible regrowth at the roots in a slightly different
> natural brown, and the ends a little frizzy and dry. Nothing else changes. No faces, no
> mirrors, no text, no logos. Realistic 35mm photography, natural colour, no HDR.

Comprobación de que casan: en el sandbox de Higgsfield (Pillow), diferencia píxel a píxel
entre D1 y D2 fuera del pelo (bordes, capa, pared y piedra) y búsqueda de desplazamiento. Si
casan salvo ruido, la D2 final se compone con la máscara de lo que ha cambiado (el pelo): fuera
de ella, los píxeles de D1 tal cual. Así la línea del comparador no puede enseñar un salto.

## B, C y D — Fotos de sección 4:5 (pendientes de aprobar A, D1 y D2)

Con A como referencia de estilo. Coletilla para las tres:

> same light and palette as the reference image; no faces, no mirrors, no reflections of
> people; no text, no signs, no logos, no brand names, no labelled bottles; realistic 35mm
> photography, natural colour, no HDR.

- **B** (`color-mechas.jpg`): manos de colorista con guantes negros de nitrilo aplicando
  decolorante con una paletina sobre un mechón fino apoyado en papel de aluminio, en la nuca
  de una clienta de espaldas. Solo manos, papel, pelo y capa negra.
- **C** (`novia-recogido.jpg`): recogido de novia bajo visto de espaldas, con un detalle de
  trenza y ondas sueltas, y un adorno pequeño y discreto. Sin cara, sin velo por delante.
- **D** (`mantilla.jpg`): mujer de espaldas con mantilla negra de encaje sobre peineta alta de
  carey, moño bajo, fondo oscuro. Sin cara. Si el encaje sale deforme o con motivos repetidos a
  lo bruto, se repite; si no, se quita.

## Revisión de cada foto (§4 y encargo)

- Ninguna cara, tampoco reflejada. Sin espejos.
- Manos de cinco dedos y el cepillo entero, sin fundirse con el pelo.
- Pelo creíble para una colorista: transición del balayage sin cortes ni rayas pintadas,
  brillo con su dirección, puntas sanas.
- Ni texto ni marcas.
- La acción dentro del 45 % central: de ahí sale el recorte 4:5 del móvil (Astro lo recorta al
  construir, `fit: 'cover'` centrado).

**Ninguna de las 8 está revisada todavía**: desde la sesión de la nube no se pueden ver.
