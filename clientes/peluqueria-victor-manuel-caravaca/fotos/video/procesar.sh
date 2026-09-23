#!/usr/bin/env bash
# Procesa el vídeo de la cristalera (Kling 3.0 pro, 8 s, 16:9) para la web.
#   bash fotos/video/procesar.sh material/video/kling-2.mp4
# (el original de Kling vive en material/, fuera de git)
#
# Adaptado de taller-sanchez-carreno-caravaca/fotos/capo/procesar.sh, con dos cambios: esto es un
# bucle que no sigue al scroll, así que GOP normal (-g 48) con cuadros B; y pesos objetivo de
# 1,2 MB como mucho en escritorio (1920 × 1080) y 500 KB en móvil (720 × 900, recorte 4:5 centrado).
# Sin audio y con +faststart.
#
# El montaje del bucle (qué fotogramas se usan y por qué) está en montar.py: en el original se
# asoma una persona por la ventana del fondo y ese tramo se quita.
#
# Saca también el primer fotograma del bucle en los dos encuadres: es el póster, la imagen de
# movimiento reducido y la candidata a LCP (fotos/video/inicio.jpg e inicio-movil.jpg).
set -euo pipefail
# ffmpeg con libx264 (el de BlueStacks solo trae NVENC).
FF="${FF:-/c/Users/Eugenio/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe}"
ORIGEN="$1"
D="$(dirname "$0")"
PUB="$D/../../public/video"
TMP="$D/../../material/video/tmp"
rm -rf "$TMP"
mkdir -p "$PUB" "$TMP/f" "$TMP/bucle"

BASE="scale=1920:1080:flags=lanczos,setsar=1"
RECORTE="crop=864:1080:528:0"   # el 45 % central del 16:9: de ahí sale el móvil

# 1. Fotogramas sin pérdida, ya a 1920 × 1080.
"$FF" -hide_banner -loglevel error -y -i "$ORIGEN" -vf "$BASE" "$TMP/f/%03d.png"

# 2. El bucle, fotograma a fotograma.
python "$D/montar.py" "$TMP/f" "$TMP/bucle"

# 3. Las dos versiones para la web.
COMUN=(-an -c:v libx264 -preset slow -g 48 -bf 3 -profile:v high -pix_fmt yuv420p -movflags +faststart)
"$FF" -hide_banner -loglevel error -y -framerate 24 -i "$TMP/bucle/%03d.png" "${COMUN[@]}" -crf "${CRF_ESC:-25}" -maxrate 3M -bufsize 6M "$PUB/cristalera-1080.mp4"
"$FF" -hide_banner -loglevel error -y -framerate 24 -i "$TMP/bucle/%03d.png" -vf "$RECORTE,scale=720:900:flags=lanczos" "${COMUN[@]}" -crf "${CRF_MOVIL:-26}" -maxrate 1.2M -bufsize 2.4M "$PUB/cristalera-movil.mp4"

# 4. El primer fotograma del bucle, a tamaño completo y en su recorte de móvil.
"$FF" -hide_banner -loglevel error -y -i "$TMP/bucle/001.png" -q:v 2 "$D/inicio.jpg"
"$FF" -hide_banner -loglevel error -y -i "$TMP/bucle/001.png" -vf "$RECORTE" -q:v 2 "$D/inicio-movil.jpg"

rm -rf "$TMP"
ls -la "$PUB"/cristalera-*.mp4 "$D"/inicio*.jpg | awk '{printf "  %-52s %6d KB\n", $9, $5/1024}'
