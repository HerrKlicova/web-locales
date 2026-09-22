# Diseño decidido — Clínica Salutem

Decidido y aprobado el 22 de septiembre de 2026 en el proyecto «Páginas web con IA».
**No reinventes nada de esto.** Está probado y visto. Lo que falta está marcado abajo.

En esta carpeta tienes `columna.html`: el prototipo real y funcionando de la sección
principal. Ábrelo en el navegador antes de escribir una línea. Es una referencia de
diseño, no código de producción: hay que portarlo a la plantilla de Astro.

---

## 1. El elemento memorable: la columna

Su logotipo es un círculo crema con dos manos, una arriba y otra abajo, sosteniendo una
columna de vértebras dibujada con puntos, que a la vez forma la S de «Salutem».

**Son once puntos exactos y la clínica tiene once especialidades.** Contados sobre el
logotipo detectando cada forma redonda por separado. No es una casualidad que se pueda
aprovechar a medias: hay uno por cada cosa que tratan.

La sección principal de la web es esa columna: fija a la izquierda, encendiéndose vértebra
a vértebra según se baja, con la especialidad a la derecha.

- Vértebra **apagada**: gris `--apagado`.
- Vértebra **ya pasada**: verde al 42 % de opacidad.
- Vértebra **activa**: verde pleno, escala 1,1 y un anillo alrededor al 50 %.

Las coordenadas están medidas sobre su logotipo real. **Úsalas tal cual, no las redibujes.**
viewBox `0 0 120 280`, en formato `cx,cy,r`:

```
74,21,8.4    50,32,10.4   35,53,12.1   29,80,11.6
36,110,14.4  60,138,20.4  90,163,14.5  97,192,11.8
90,220,12.3  69,239,10.7  46,252,8.5
```

**No dibujes las manos.** Eso es su logotipo, no un motivo que podamos extender.

El cambio de vértebra activa se hace con `IntersectionObserver` y `rootMargin:
"-42% 0px -42% 0px"`, que enciende la que está en el centro de la pantalla. Son veinte
líneas y está en `columna.html`.

## 2. Paleta, muestreada de su logotipo

| Hex | Uso |
|---|---|
| `#2B6034` | Verde del nombre y de las vértebras. El principal |
| `#4C7132` | Verde medio de las manos |
| `#7C9440` | Verde claro, punta de los dedos |
| `#F1E9DF` | Crema del fondo |
| `#3F382D` | Gris cálido del lema, para el texto |

Muestreados de una foto de su logotipo, no del vectorial. Cuando la clínica pase el
archivo original, se revisan.

**El fondo va plano.** Sin textura, sin grano, sin trama de puntos. Su badge es liso:
medido, varía un 1 % sobre su media, y lo que parece textura al ampliarlo son artefactos
del JPEG. Se probó a ponerle grano de papel y se descartó: ensucia el crema y lo tira a
gris. Como la página lleva exactamente su crema, el logotipo redondo se funde con el
fondo en vez de recortarse encima.

## 3. Tipografía

**Hanken Grotesk** 800 para titulares, **Source Serif 4** 400 para el texto corrido.
Sans arriba y serif en el cuerpo, al revés de lo habitual, para no caer en la estética
de crema con serif de display que prohíbe §4 del CLAUDE.md.

Provisional: la definitiva se decide cuando se vea el logotipo en vectorial y sepamos
con qué tipografía está hecho.

## 4. Las once especialidades

Orden propuesto, de arriba abajo de la columna:

1. Fisioterapia avanzada
2. Osteopatía
3. Traumatología
4. Ecografía
5. Pilates terapéutico
6. Hipopresivos
7. Suelo pélvico
8. Ginecología y obstetricia
9. Podología
10. Nutrición
11. Medicina estética

Las nueve primeras salen de la biografía de su Instagram; nutrición e hipopresivos, de
sus historias destacadas. Lo musculoesquelético va primero porque es su identidad, y la
medicina estética la última porque arriba del todo en una clínica de salud sienta raro.

**El orden real depende de qué les factura más y lo decide la clínica.**

## 5. Lo que falta y no puedes resolver tú

| Qué | Estado |
|---|---|
| La dirección buena | Google dice C. Junquico, 7; su Instagram y su Facebook, Avenida Carretera de Granada, 24. Usa la segunda y déjalo anotado |
| «Recuperación funcional» | Aparece en el lema de su logotipo pero no en su biografía. O es una duodécima especialidad o es el paraguas |
| Permiso para las vértebras | El motivo es de su logotipo. Falta que la clínica dé el visto bueno |
| Nombres del equipo | Solo se conoce a un fisioterapeuta, «Miguel», citado en una reseña |
| Precios | Desconocidos. No inventes ninguno y no dejes huecos `[PRECIO]` a la vista: en este sector no se publican |
| Logotipo en vectorial | Lo tienen ellos. Marca la tipografía definitiva |

## 6. Fotos

Todo Higgsfield. **No uses nada de su Instagram ni de Google Maps**: no hay permiso
escrito y §6 del CLAUDE.md lo prohíbe. Manos trabajando, camilla, ecógrafo, sala, luz
natural de bajo comercial de pueblo. Sin caras.

## 7. Tono

Divulgativo, como publican ellos: explican patologías, no venden. Frases cortas.
