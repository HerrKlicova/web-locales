# Fotos — Clínica Salutem

Generadas con Higgsfield el 22/09/2026. **No se ha usado ninguna foto de su Instagram ni de
Google Maps**: no hay permiso escrito (CLAUDE.md §6, DISEÑO §6).

Modelo pedido: `nano_banana_2`. El servidor las resolvió con `nano_banana_flash`, que
devuelve 1200 px de ancho en vez de 2k. Da de sobra para los tamaños que sirve Astro; si
hiciera falta más resolución, hay que repetir la tanda.

Estilo común de todos los prompts, para que compartan luz y paleta: luz natural de ventana a
pie de calle, luz cálida y suave, paredes color crema, roble claro, detalles verde salvia,
clínica pequeña de pueblo de España, paleta cálida apagada, sin texto, sin logos, sin rótulos.

## Las que se usan

| Archivo | Qué es |
|---|---|
| `recepcion.jpg` | Recepción vacía: mostrador de roble, toallas dobladas, helecho |
| `consulta.jpg` | Consulta vacía vista desde la puerta, con la sierra por la ventana |
| `pilates-suelo-sala.jpg` | Sala de pilates en suelo: esterillas, aros, pelotas y rulo |
| `consulta-rodilla.jpg` | Manos de la fisio trabajando una rodilla sobre la camilla |
| `ecografia.jpg` | Sonda de ecografía sobre una rodilla con gel |
| `pilates-suelo-aro.jpg` | Ejercicio en la esterilla apretando un aro entre las rodillas |

## La portada no lleva foto

Se generaron dos fotos de camilla para la portada (`hero-camilla-16x9` y `hero-camilla-4x5`,
manos del fisio sobre la zona lumbar). **Descartadas y borradas**: parecían una foto de spa
genérica y contradecían el titular. La portada la ocupa la columna de vértebras de su
logotipo, sin foto.

## Descartadas en la revisión (§6)

Hay que mirar cada imagen antes de usarla. De once generadas, cinco se han caído:

- `ecografia-hombro.jpg` — **dos fallos**: asomaba la cara de la paciente por la izquierda, y
  el ecógrafo salió con **una marca escrita en el bisel**, que es justo lo que avisa §6 de que
  la IA añade sola. Se queda la `ecografia.jpg` anterior, que está limpia.
- `detalle-toallas.jpg` — el rollo de vendaje salió con pinta de papel higiénico sobre la
  balda. En una clínica ese detalle lo canta.
- `pilates.jpg` — sala con reformer. Fuera por decisión de Eugenio: el pilates de la web es
  **en suelo, no de aparatos**.
- `pie.jpg` — correcta, pero repetía el registro de `consulta-rodilla.jpg` (manos sobre una
  extremidad). Se deja una sola.
- `consulta-vacia.jpg` — correcta, pero repetía `consulta.jpg`. Se deja la que tiene la
  sierra al fondo, que es más del sitio.

## Retoques hechos a mano

`ecografia.jpg` salió con una cara parcial, que es lo que antes delata que una foto es
generada: asomaba la barbilla y la boca de la ecografista arriba a la derecha. Recortada la
franja superior (145 px). Queda 1200×751.

Ninguna de las seis que se usan lleva caras, texto ni logos.
