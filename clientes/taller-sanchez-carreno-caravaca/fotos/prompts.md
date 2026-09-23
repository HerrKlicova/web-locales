# Prompts de Higgsfield — Taller Sánchez Carreño

Modelo: `nano_banana_2`. Generadas el 22/09/2026. No hay fotos reales cedidas (§6, prioridad 2).

Todas comparten la misma luz y la misma paleta, como pide §6: **luz natural de mediodía entrando
por el portón**, sin luz artificial, y paleta apagada de **verde taller, óxido y gris grasa**.
Todas llevan al final la misma coletilla: sin personas de cara, sin texto, sin rótulos, sin logos,
sin marcas y sin matrículas legibles, fotografía realista de 35/50 mm, color natural, sin HDR.

| Archivo | Uso | Formato |
|---|---|---|
| `taller-hero.jpg` | Hero de escritorio | 16:9 |
| `taller-hero-movil.jpg` | Hero de móvil | 4:5 |
| `manos-motor.jpg` | Galería | 4:5 |
| `carro-herramienta.jpg` | Galería | 4:5 |
| `elevador.jpg` | Galería | 4:5 |
| `banco-trabajo.jpg` | Galería | 4:5 |
| `fachada.jpg` | Sección «Dónde estamos» | 16:9 |

## 1 y 2 — Nave del taller (hero, 16:9 y 4:5)
> Documentary photograph of the inside of a small independent car repair workshop in a village in
> the Murcia region of Spain. A car sits on a two-post lift in the middle of the bay. Daylight
> pours in through a wide open roller door on the left, warm midday Mediterranean light, no
> artificial lighting. Bare concrete floor with old oil stains. Green painted steel tool cabinets
> along the back wall, hand tools hanging on a pegboard, stacked tyres in a corner. The place is
> clearly decades old and used every day: chipped paint, worn surfaces, rust on the door frame.
> Muted colour palette of workshop green, rust orange and greasy grey. No people. No text, no
> signage, no logos, no brand names, no readable number plates. Realistic 35mm photography,
> natural colour, no HDR.

## 3 — Manos sobre el motor (4:5)
> Close-up documentary photograph of a mechanic's hands, grease under the fingernails, using a
> worn combination spanner on a car engine bay. Only the hands and forearms are visible, no face,
> no head in frame. Warm natural daylight from an open workshop door. […coletilla común…]

## 4 — Carro de herramienta (4:5)
> Documentary photograph of an old green steel roller tool cabinet in a village car repair
> workshop in Spain, one drawer pulled open showing well used spanners and sockets laid out, worn
> and slightly greasy, some rust. Warm natural daylight from the side. […coletilla común…]

## 5 — Coche en el elevador (4:5)
> Documentary photograph looking up at the underside of a car raised on a two-post lift in a small
> Spanish village workshop, showing the front suspension and wheel arch, everyday road grime.
> Warm natural daylight from an open roller door behind. […coletilla común…]

## 6 — Banco de trabajo (4:5)
> Documentary photograph of a workbench in a village car repair workshop in Spain: a heavy cast
> iron bench vice bolted to a scarred wooden top, a few car parts and a rag beside it, grease marks
> everywhere, decades of use. Warm natural daylight from a window to the left. […coletilla común…]

## 7 — Fachada (16:9)
> Documentary photograph of the street frontage of a small old car repair workshop on the edge of a
> town in the Murcia region of Spain: a wide metal roller door half open, plain rendered wall, a
> kerb and a dusty pavement, dry hills in the far background. Hard midday sun, deep shadow inside
> the doorway. […coletilla común…]

## Revisión (§6)
Cada imagen se mira antes de usarla: logos o marcas coladas, anatomía de las manos, composición y
que los detalles cuadren con un taller de pueblo. Lo que no pase el filtro se vuelve a generar.

## Versión en blanco y negro (23/09/2026, tarde)
La web pasó a los colores del logotipo (negro, blanco y rojo) y las fotos se usan **etalonadas en
blanco y negro**, sin volver a generar nada: `fotos/bn/` sale de estos mismos archivos con
`node fotos/bn/etalonaje.mjs` (blanco y negro «con filtro amarillo», curva en S suave y solo los rojos
puros conservan algo de color). El vídeo del capó y sus fotogramas pasan por la misma LUT con
`bash fotos/capo/procesar.sh material/capo/capo-original.mp4 --bn`. Los originales en color no se
han tocado.
