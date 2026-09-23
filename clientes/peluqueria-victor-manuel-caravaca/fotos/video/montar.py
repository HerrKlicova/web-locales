"""Monta el bucle de la cristalera a partir de los fotogramas de Kling (lo llama procesar.sh).

    python montar.py <carpeta con 001.png…> <carpeta de salida>

En el original (8 s, 193 fotogramas) se asoma por la ventana del fondo un hombre con la cara a la
vista entre los fotogramas 94 y 160. El bucle se hace solo con tramos limpios, elegidos midiendo
la diferencia entre fotogramas (la media entre dos seguidos es 0,47):

- Tramo A, fotogramas 3 a 91.
- Empalme 91 → 177 (diferencia 1,05): fundido de 4 fotogramas entre parejas alineadas
  (88 con 174, 89 con 175…), para que no se vea el salto ni se dupliquen las manos.
- Tramo B, fotogramas 178 a 185.
- Cierre 185 → 3: diferencia 0,75, como un paso normal entre fotogramas, sin fundido.

Quedan 97 fotogramas (4,04 s a 24 fps). El primero, el 3, es el póster.
"""
import os
import sys

import numpy as np
from PIL import Image

origen, destino = sys.argv[1], sys.argv[2]
os.makedirs(destino, exist_ok=True)


def fotograma(i: int) -> np.ndarray:
    # ffmpeg numera desde 1: el fotograma 0 es 001.png.
    return np.asarray(Image.open(os.path.join(origen, f"{i + 1:03d}.png")).convert("RGB"), dtype=np.float32)


secuencia = [fotograma(i) for i in range(3, 88)]
FUNDIDO = 4
for k in range(FUNDIDO):
    w = (k + 1) / (FUNDIDO + 1)
    secuencia.append(fotograma(88 + k) * (1 - w) + fotograma(174 + k) * w)
secuencia += [fotograma(i) for i in range(178, 186)]

for n, f in enumerate(secuencia):
    Image.fromarray(np.clip(f + 0.5, 0, 255).astype(np.uint8)).save(os.path.join(destino, f"{n + 1:03d}.png"))
print(f"  bucle: {len(secuencia)} fotogramas")
