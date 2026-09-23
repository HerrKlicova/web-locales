# Fotos de Higgsfield — Peluquería Víctor Manuel

Se pide `nano_banana_2` a 2k, pero Higgsfield ejecuta `nano_banana_flash` (igual que en el taller).
2 créditos por imagen. Originales PNG en `material/fotos-a/` (fuera de git).

## Foto A — la cristalera (16:9, primer fotograma del vídeo)

### Ronda 1 (23/09/2026) — 4 variantes, ninguna pasa
Prompt tal cual lo dio Eugenio:
> Documentary photograph looking into a small, traditional men's hairdresser in a town in the
> Murcia region of Spain, mid-morning, taken from just inside the front window. Static camera at
> chest height, behind and slightly to the left of the barber chair. In the centre of the frame an
> adult male client sits in a classic red hydraulic barber chair, seen from behind, wearing a plain
> dark navy cutting cape: we only see the back of his head, short dark hair. The barber stands on
> the right side of the chair, side-on to the camera, framed from the shoulders down: his head is
> out of frame at the top edge. He wears a plain white short-sleeved work tunic. He is cutting
> scissors-over-comb at the back of the client's head: the black comb in his left hand lifts a
> section of hair, the scissors in his right hand (thumb and ring finger in the rings) cut the hair
> that sticks out above the comb. A few fresh clippings on the cape. Clean, recently renovated
> small shop: white walls, a plain light grey wall panel, a simple white counter, light terrazzo
> floor. Soft daylight from the street window behind the camera plus warm ceiling light, gentle
> natural contrast. The chair, the client's head and the barber's hands sit within the central 45%
> of the frame width, with calm empty wall on both sides. Shallow depth of field, background
> softly out of focus. No mirrors anywhere in frame, no reflections of people, no faces. No text,
> no signs, no posters, no logos, no brand names, no labelled bottles or products. Not a hipster
> barbershop: no tattoos, no exposed brick, no Edison bulbs. Realistic 35mm photography, natural
> colour, no HDR, no filters.

Fallos: en las cuatro se ve parte de la cara del peluquero en el borde de arriba (mentón, nariz o
un ojo). En tres, el peine va vertical y la tijera corta por debajo: no es tijera sobre peine.

### Ronda 2 — 4 variantes, ninguna pasa
Cambios sobre el prompt anterior: cámara «tilted slightly downwards»; «The top edge of the image
cuts straight across the barber's shoulders: his head, face, chin and neck are completely outside
the frame, we only see his torso and arms»; y la técnica descrita con peine horizontal, púas hacia
arriba, y tijera paralela encima.

Fallos: v0 y v1 enseñan el mentón; **v2 sale con el peluquero sin cabeza** (el cuello de la túnica
vacío); v3 no enseña cara, pero el peine está al revés (púas hacia abajo) y la tijera va a lo
largo del peine, no por encima.

### Ronda 3 — 4 variantes. Elegida la v1, recortada
Cambio sobre la ronda 2, la técnica:
> His left hand holds a black barber comb by its end, from the side: the comb is inserted into the
> hair with its teeth pointing upwards, tilted slightly away from the scalp, lifting a band of hair
> so that the hair ends poke out above the top edge of the comb. His right hand holds the scissors,
> slightly open, horizontally and just above the comb, thumb and ring finger in the two rings, the
> lower blade lying flat along the top edge of the comb and cutting the hair ends that poke out
> above it. Neither hand rests on top of the client's head.

- v0: mentón arriba y la silueta de una persona al fondo (reflejo). Fuera.
- **v1: la única con la técnica bien** (peine con las púas hacia arriba levantando el pelo, tijera
  encima cortando lo que sobresale, pulgar y anular en los ojos). Manos con cinco dedos, sin
  texto, sin marcas, sin espejos. Fallo: asoman el mentón y la comisura del peluquero en el borde
  de arriba.
- v2: estantería con botes etiquetados y una mano sobre la cabeza del cliente. Fuera.
- v3: cara del peluquero (nariz y boca). Fuera.

**Arreglo de la v1:** recorte 16:9 quitando 150 px de arriba (de 2752 × 1536 a 2464 × 1386 desde
x = 144, y = 150) y paso a 1920 × 1080. El borde de arriba queda en la túnica, con unos 80 px de
margen sobre donde estaba el mentón. Job `a864bb7c-2767-407d-b2b3-649117d42731`.
- `a-cristalera.jpg` (1920 × 1080) y `a-cristalera-movil.jpg` (864 × 1080, el 45 % central).
- Cuidado en el vídeo: si el peluquero baja la cabeza, el mentón puede volver a entrar por arriba.

Gasto de la foto A: 12 imágenes, 24 créditos.

## Fotos B, C y D (4:5, con A recortada como referencia, media `f155ae34…`)
Todas con la misma coletilla: «Same light and palette as the reference image; no faces, no
mirrors, no reflections of people; no text, no signs, no logos, no brand names, no labelled
bottles; realistic 35mm photography, natural colour, no HDR.»

- **B** `b-tijera-peine.jpg`: «Close-up still life in the same small men's hairdresser: a pair of
  plain steel barber's scissors and a black barber comb lying on the simple white counter, a few
  freshly cut short dark hair clippings next to them, soft daylight coming from the side through
  the street window. Plain unmarked scissors and comb, no engraving.» La primera salió con un
  espejo en la esquina de arriba: repetida añadiendo «Behind the counter only a plain white wall:
  no mirror, no glass, no cabinet doors.» La segunda traía una marca grabada ilegible en la hoja,
  junto al eje: borrada con un retoque local (mediana dentro de un polígono sobre la hoja).
- **C** `c-sillon.jpg`: «The same classic red hydraulic barber chair from the reference image,
  empty, seen from the side, with the plain dark navy cutting cape folded over its armrest,
  standing against a plain white wall on the light terrazzo floor of the same small men's
  hairdresser. No mirror anywhere in the frame.» A la primera.
- **D** `d-manos.jpg`: «Close-up of the barber's hands cutting scissors-over-comb at the nape of
  an adult man with short dark hair: the black barber comb, held by its end with its teeth pointing
  upwards, lifts a band of hair so the hair ends poke out above its top edge, and the plain steel
  scissors, held horizontally just above the comb with thumb and ring finger in the two rings, cut
  the hair ends that poke out above it. Only the two hands, the back of the neck and the dark navy
  cutting cape are in frame; white short sleeve of the barber's tunic at the edge.» A la primera:
  pulgar en el ojo de arriba, púas hacia arriba, tijera encima del peine.

Originales en `material/fotos-bcd/`. Exportadas a 1200 × 1490, JPEG q88.

## Vídeo — Kling 3.0 pro, 8 s, sin sonido, 16:9, A como primer y último fotograma (14 créditos)
Se rechaza el preset que sugiere la herramienta («IN THE DARK»).

### Intento 1 — no pasa
El prompt de Eugenio tal cual:
> Locked-off static camera, no camera movement, no zoom. The barber keeps cutting
> scissors-over-comb at the back of the client's head with small, calm, real movements: the comb
> lifts a section of hair, the scissors snip three or four times, a few tiny clippings fall onto
> the cape. The client stays still. The barber's head stays out of frame the whole time. Natural
> real-time speed, no slow motion. Everything else in the shop stays still. The last frame returns
> to exactly the same pose as the first frame. No faces, no mirrors, no text, no new objects
> appearing.

Fallos: entre los fotogramas 36 y 46 el peine se funde con el pelo y reaparece en otro sitio, y
entre el 40 y el 165 se asoma por la ventana del fondo un hombre con barba y la cara a la vista.

### Intento 2 — pasa con montaje
Al prompt anterior se le añade: «The black comb stays in the barber's left hand the whole time,
always the same size and shape, and the scissors keep their shape.» y «Nobody else appears: the
window in the background stays empty the whole time, no people outside, no one else in the shop.»

Revisión fotograma a fotograma (tiras de cada 2 fotogramas y de cada fotograma en las juntas):
cámara fija, la cabeza del peluquero nunca entra, tijera y peine sin cambiar de forma, técnica
bien. Pero del 94 al 160 vuelve a asomarse el hombre por la ventana. El bucle se monta con los
tramos limpios (`video/montar.py`): 3-91, fundido alineado de 4 fotogramas hacia 174-177, y
178-185; el cierre 185 → 3 es tan suave como dos fotogramas seguidos. 97 fotogramas, 4 s.
`video/procesar.sh` saca `public/video/cristalera-1080.mp4` (619 KB) y
`cristalera-movil.mp4` (720 × 900, 197 KB), y los pósteres `video/inicio.jpg` e
`inicio-movil.jpg`. Originales en `material/video/` (fuera de git).

Gasto total de la web: 60 créditos (A 24, B-C-D 8, vídeo 28).
